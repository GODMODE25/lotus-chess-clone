import type { ProgressRecord } from "@/types/lotus";
import type {
  CuratedLine,
  OpeningCuratedMetadata,
  MasteryLevelMetadata,
} from "@/content/openingsCurated";

export interface LineUnlockState {
  isUnlocked: boolean;
  reason?: string; // e.g. "Complete 'Giuoco Pianissimo Main Setup' first"
}

export interface LevelUnlockState {
  isUnlocked: boolean;
  isGraduated: boolean;
  graduationAccuracy: number;
  completedCount: number;
  totalCount: number;
  reason?: string; // e.g. "Graduate Beginner tier first (accuracy: 65%, required: 70%)"
}

export interface GraduationResult {
  isGraduated: boolean;
  tierAccuracy: number;
  completedCount: number;
  totalCount: number;
  meetsAccuracyThreshold: boolean;
  meetsMistakeThreshold: boolean;
}

export interface NextLineResult {
  line: CuratedLine | null;
  reason: string;
}

/** A line is "completed" when mastery >= 70 and it has been practiced at least once. */
export function isLineCompleted(
  lineId: string,
  progressMap: Map<string, ProgressRecord>
): boolean {
  const record = progressMap.get(lineId);
  if (!record) return false;
  return record.mastery >= 70 && record.completedRepetitions >= 1;
}

/** Build a lookup map of lineId -> ProgressRecord from an array. */
export function buildProgressMap(records: ProgressRecord[]): Map<string, ProgressRecord> {
  const map = new Map<string, ProgressRecord>();
  for (const record of records) {
    map.set(record.lessonId, record);
  }
  return map;
}

/**
 * Per-line accuracy, matching the formula in stats.ts.
 * Returns 0 when the line has never been practiced.
 */
export function lineAccuracy(record: ProgressRecord): number {
  if (record.completedRepetitions <= 0) return 0;
  return Math.max(50, Math.round(100 - (record.mistakeCount / record.completedRepetitions) * 15));
}

/**
 * Returns whether a line is unlocked for the user.
 * A line is unlocked if all its prerequisites (line IDs) are completed.
 */
export function isLineUnlocked(
  line: CuratedLine,
  allLines: CuratedLine[],
  progressMap: Map<string, ProgressRecord>
): LineUnlockState {
  const prereqs = line.prerequisites ?? [];
  for (const prereqId of prereqs) {
    if (!isLineCompleted(prereqId, progressMap)) {
      const prereq = allLines.find((l) => l.id === prereqId);
      const prereqName = prereq ? getLineDisplayName(prereq) : prereqId;
      return {
        isUnlocked: false,
        reason: `Complete "${prereqName}" first`,
      };
    }
  }
  return { isUnlocked: true };
}

/**
 * Parse the free-text graduationRequirements string into structured thresholds.
 */
function parseGraduationRequirements(meta: MasteryLevelMetadata): {
  minAccuracy: number;
  maxAvgMistakes: number;
} {
  const text = meta.graduationRequirements.toLowerCase();
  let minAccuracy = 0;
  let maxAvgMistakes = Infinity;

  const accuracyMatch = text.match(/(\d+)\s*%/);
  if (accuracyMatch) {
    minAccuracy = parseInt(accuracyMatch[1], 10);
  }

  const mistakeMatch = text.match(/fewer than\s*(\d+)\s*mistakes/);
  if (mistakeMatch) {
    maxAvgMistakes = parseInt(mistakeMatch[1], 10);
  }

  return { minAccuracy, maxAvgMistakes };
}

/**
 * Computes graduation status for a tier.
 */
export function getLevelGraduation(
  tierIndex: number,
  lines: CuratedLine[],
  progressMap: Map<string, ProgressRecord>,
  metadata: OpeningCuratedMetadata
): GraduationResult {
  const tierLines = lines.filter((l) => l.tierIndex === tierIndex);
  const totalCount = tierLines.length;

  const completedLines = tierLines.filter((l) => isLineCompleted(l.id, progressMap));
  const completedCount = completedLines.length;

  // Tier accuracy = average of lineAccuracy across all lines in the tier that have a record.
  const linesWithRecords = tierLines.filter((l) => progressMap.has(l.id));
  const tierAccuracy =
    linesWithRecords.length === 0
      ? 0
      : Math.round(
          linesWithRecords.reduce((sum, l) => {
            const rec = progressMap.get(l.id)!;
            return sum + lineAccuracy(rec);
          }, 0) / linesWithRecords.length
        );

  // Tier average mistakes = sum(mistakeCount) / totalLinesInTier.
  const totalMistakes = tierLines.reduce((sum, l) => {
    const rec = progressMap.get(l.id);
    return sum + (rec ? rec.mistakeCount : 0);
  }, 0);
  const avgMistakes = totalCount === 0 ? 0 : totalMistakes / totalCount;

  const { minAccuracy, maxAvgMistakes } = parseGraduationRequirements(
    metadata.masteryLevels[tierIndex]
  );

  const meetsAccuracyThreshold = tierAccuracy >= minAccuracy;
  const meetsMistakeThreshold = avgMistakes < maxAvgMistakes;

  const isGraduated =
    completedCount === totalCount &&
    totalCount > 0 &&
    meetsAccuracyThreshold &&
    meetsMistakeThreshold;

  return {
    isGraduated,
    tierAccuracy,
    completedCount,
    totalCount,
    meetsAccuracyThreshold,
    meetsMistakeThreshold,
  };
}

/**
 * Returns whether a mastery tier is unlocked.
 * Tier N is locked until tier N-1 is graduated.
 * Tier 0 (Beginner) is always unlocked.
 */
export function isLevelUnlocked(
  tierIndex: number,
  metadata: OpeningCuratedMetadata,
  progressMap: Map<string, ProgressRecord>,
  allLines: CuratedLine[]
): LevelUnlockState {
  if (tierIndex === 0) {
    return {
      isUnlocked: true,
      isGraduated: false,
      graduationAccuracy: 0,
      completedCount: 0,
      totalCount: allLines.filter((l) => l.tierIndex === 0).length,
    };
  }

  const prevGraduation = getLevelGraduation(tierIndex - 1, allLines, progressMap, metadata);
  const prevTier = metadata.masteryLevels[tierIndex - 1];
  const prevTierName = prevTier ? prevTier.tier : `Tier ${tierIndex - 1}`;

  if (prevGraduation.isGraduated) {
    return {
      isUnlocked: true,
      isGraduated: false,
      graduationAccuracy: prevGraduation.tierAccuracy,
      completedCount: prevGraduation.completedCount,
      totalCount: prevGraduation.totalCount,
    };
  }

  const { minAccuracy } = parseGraduationRequirements(prevTier);
  return {
    isUnlocked: false,
    isGraduated: false,
    graduationAccuracy: prevGraduation.tierAccuracy,
    completedCount: prevGraduation.completedCount,
    totalCount: prevGraduation.totalCount,
    reason: `Graduate ${prevTierName} tier first (accuracy: ${prevGraduation.tierAccuracy}%, required: ${minAccuracy}%)`,
  };
}

/**
 * Returns the next recommended line to study after completing `currentLineId`.
 * Priority: continuationIds first, then first unlocked line in next tier,
 * then first unlocked line in same tier.
 */
export function getNextLine(
  currentLineId: string,
  allLines: CuratedLine[],
  progressMap: Map<string, ProgressRecord>,
  metadata: OpeningCuratedMetadata
): NextLineResult {
  const currentLine = allLines.find((l) => l.id === currentLineId);
  if (!currentLine) {
    return { line: null, reason: "Current line not found" };
  }

  // 1. continuationIds first
  const continuationIds = currentLine.continuationIds ?? [];
  for (const contId of continuationIds) {
    const cont = allLines.find((l) => l.id === contId);
    if (cont && isLineUnlocked(cont, allLines, progressMap).isUnlocked) {
      return { line: cont, reason: "Continuation of current line" };
    }
  }

  // 2. first unlocked line in next tier
  const nextTier = currentLine.tierIndex + 1;
  if (nextTier < metadata.masteryLevels.length) {
    const nextTierLines = allLines
      .filter((l) => l.tierIndex === nextTier)
      .sort((a, b) => a.id.localeCompare(b.id));
    for (const l of nextTierLines) {
      if (isLineUnlocked(l, allLines, progressMap).isUnlocked) {
        return { line: l, reason: `Next tier: ${metadata.masteryLevels[nextTier].tier}` };
      }
    }
  }

  // 3. first unlocked line in same tier (excluding current)
  const sameTierLines = allLines
    .filter((l) => l.tierIndex === currentLine.tierIndex && l.id !== currentLineId)
    .sort((a, b) => a.id.localeCompare(b.id));
  for (const l of sameTierLines) {
    if (isLineUnlocked(l, allLines, progressMap).isUnlocked) {
      return { line: l, reason: "Another line in the same tier" };
    }
  }

  return { line: null, reason: "All lines completed or locked" };
}

/**
 * Returns the display name for a line.
 * If parentVariation is empty or equals variationName, return variationName.
 * Otherwise return "parentVariation — variationName".
 */
export function getLineDisplayName(line: CuratedLine): string {
  if (!line.parentVariation || line.parentVariation === line.variationName) {
    return line.variationName;
  }
  return `${line.parentVariation} — ${line.variationName}`;
}
