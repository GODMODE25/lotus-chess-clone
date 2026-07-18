import { describe, it, expect } from "vitest";
import type { ProgressRecord } from "@/types/lotus";
import type { CuratedLine, OpeningCuratedMetadata } from "@/content/openingsCurated";
import {
  isLineUnlocked,
  isLevelUnlocked,
  getLevelGraduation,
  getNextLine,
  getLineDisplayName,
  lineAccuracy,
  isLineCompleted,
  buildProgressMap,
} from "./progression";

function makeLine(overrides: Partial<CuratedLine> & Pick<CuratedLine, "id">): CuratedLine {
  return {
    parentVariation: "",
    openingFamily: "Italian Game",
    variationName: overrides.id,
    aliases: [],
    eco: "C50",
    pgn: "",
    sanMoves: [],
    uciMoves: [],
    startingFen: "",
    moveDepth: 0,
    difficulty: 1,
    popularity: 1,
    prerequisites: [],
    continuationIds: [],
    conceptIds: [],
    strategicIdeas: [],
    tacticalMotifs: [],
    commonMistakes: [],
    explanation: "",
    reviewPriority: 1,
    estimatedStudyMinutes: 1,
    masteryXp: 10,
    masteryLevel: "Beginner",
    tierIndex: 0,
    ...overrides,
  };
}

function makeRecord(overrides: Partial<ProgressRecord> & Pick<ProgressRecord, "lessonId">): ProgressRecord {
  return {
    lessonKind: "opening",
    confidence: 100,
    mastery: 100,
    reviewDate: "",
    nextReviewDate: "",
    intervalDays: 1,
    easeFactor: 2.5,
    mistakeCount: 0,
    averageResponseMs: 0,
    completedRepetitions: 1,
    rank: "Beginner",
    ...overrides,
  };
}

const metadata: OpeningCuratedMetadata = {
  id: "italian-game",
  name: "Italian Game",
  slug: "italian-game",
  ecoRange: "C50",
  family: "King Pawn",
  colour: "white",
  popularity: 5,
  difficulty: 2,
  description: "",
  strategicOverview: "",
  typicalPawnStructures: [],
  commonTacticalThemes: [],
  modelPlayers: [],
  recommendedStudyOrder: [],
  baseMoves: [],
  masteryLevels: [
    {
      level: 1,
      tier: "Beginner",
      objectives: [],
      expectedKnowledge: "",
      averageMoveDepth: 8,
      averageLineCount: 2,
      xpReward: 50,
      graduationRequirements: "Complete all beginner lines with fewer than 2 mistakes on average.",
    },
    {
      level: 2,
      tier: "Novice",
      objectives: [],
      expectedKnowledge: "",
      averageMoveDepth: 10,
      averageLineCount: 1,
      xpReward: 100,
      graduationRequirements: "Complete all novice lines with an accuracy rate of 70% or higher.",
    },
  ],
};

describe("isLineUnlocked", () => {
  it("unlocks when prerequisites are satisfied", () => {
    const prereq = makeLine({ id: "prereq", tierIndex: 0 });
    const line = makeLine({ id: "line", prerequisites: ["prereq"], tierIndex: 0 });
    const progressMap = buildProgressMap([makeRecord({ lessonId: "prereq", mastery: 80 })]);

    const result = isLineUnlocked(line, [prereq, line], progressMap);
    expect(result.isUnlocked).toBe(true);
  });

  it("locks with correct reason when prerequisites are unsatisfied", () => {
    const prereq = makeLine({ id: "prereq", variationName: "Main Setup", tierIndex: 0 });
    const line = makeLine({ id: "line", prerequisites: ["prereq"], tierIndex: 0 });
    const progressMap = buildProgressMap([]);

    const result = isLineUnlocked(line, [prereq, line], progressMap);
    expect(result.isUnlocked).toBe(false);
    expect(result.reason).toBe('Complete "Main Setup" first');
  });

  it("unlocks a line with no prerequisites", () => {
    const line = makeLine({ id: "line", prerequisites: [], tierIndex: 0 });
    const result = isLineUnlocked(line, [line], buildProgressMap([]));
    expect(result.isUnlocked).toBe(true);
  });
});

describe("isLevelUnlocked", () => {
  it("always unlocks tier 0", () => {
    const lines = [makeLine({ id: "a", tierIndex: 0 }), makeLine({ id: "b", tierIndex: 1 })];
    const result = isLevelUnlocked(0, metadata, buildProgressMap([]), lines);
    expect(result.isUnlocked).toBe(true);
    expect(result.isGraduated).toBe(false);
  });

  it("locks tier N when tier N-1 is not graduated", () => {
    const lines = [makeLine({ id: "a", tierIndex: 0 }), makeLine({ id: "b", tierIndex: 1 })];
    const result = isLevelUnlocked(1, metadata, buildProgressMap([]), lines);
    expect(result.isUnlocked).toBe(false);
    expect(result.reason).toContain("Graduate Beginner tier first");
  });

  it("unlocks tier N when tier N-1 is graduated", () => {
    const lines = [
      makeLine({ id: "a", tierIndex: 0 }),
      makeLine({ id: "b", tierIndex: 0 }),
      makeLine({ id: "c", tierIndex: 1 }),
    ];
    // Both beginner lines completed with 0 mistakes => graduated (accuracy 100 >= 0, avg mistakes 0 < 2)
    const progressMap = buildProgressMap([
      makeRecord({ lessonId: "a", mastery: 80 }),
      makeRecord({ lessonId: "b", mastery: 80 }),
    ]);
    const result = isLevelUnlocked(1, metadata, progressMap, lines);
    expect(result.isUnlocked).toBe(true);
  });
});

describe("getLevelGraduation", () => {
  it("graduates when all lines completed and accuracy >= threshold", () => {
    const lines = [makeLine({ id: "a", tierIndex: 0 }), makeLine({ id: "b", tierIndex: 0 })];
    const progressMap = buildProgressMap([
      makeRecord({ lessonId: "a", mastery: 80, mistakeCount: 0, completedRepetitions: 1 }),
      makeRecord({ lessonId: "b", mastery: 80, mistakeCount: 0, completedRepetitions: 1 }),
    ]);
    const result = getLevelGraduation(0, lines, progressMap, metadata);
    expect(result.isGraduated).toBe(true);
    expect(result.completedCount).toBe(2);
    expect(result.totalCount).toBe(2);
  });

  it("does not graduate when one line is incomplete", () => {
    const lines = [makeLine({ id: "a", tierIndex: 0 }), makeLine({ id: "b", tierIndex: 0 })];
    const progressMap = buildProgressMap([
      makeRecord({ lessonId: "a", mastery: 80 }),
      // b has no record => incomplete
    ]);
    const result = getLevelGraduation(0, lines, progressMap, metadata);
    expect(result.isGraduated).toBe(false);
    expect(result.completedCount).toBe(1);
  });

  it("does not graduate when accuracy is below threshold", () => {
    // Novice tier requires 70% accuracy
    const lines = [makeLine({ id: "a", tierIndex: 1 }), makeLine({ id: "b", tierIndex: 1 })];
    // 10 mistakes over 1 repetition => accuracy = max(50, 100 - 10*15) = 50 (< 70)
    const progressMap = buildProgressMap([
      makeRecord({ lessonId: "a", mastery: 80, mistakeCount: 10, completedRepetitions: 1 }),
      makeRecord({ lessonId: "b", mastery: 80, mistakeCount: 10, completedRepetitions: 1 }),
    ]);
    const result = getLevelGraduation(1, lines, progressMap, metadata);
    expect(result.isGraduated).toBe(false);
    expect(result.meetsAccuracyThreshold).toBe(false);
  });
});

describe("getNextLine", () => {
  it("follows continuationIds when the continuation is unlocked", () => {
    const current = makeLine({
      id: "current",
      tierIndex: 0,
      continuationIds: ["next"],
    });
    const next = makeLine({ id: "next", tierIndex: 1 });
    const lines = [current, next];
    const progressMap = buildProgressMap([]); // next has no prereqs => unlocked
    const result = getNextLine("current", lines, progressMap, metadata);
    expect(result.line?.id).toBe("next");
  });

  it("falls back to next tier when no continuation is unlocked", () => {
    const current = makeLine({ id: "current", tierIndex: 0, continuationIds: [] });
    const next = makeLine({ id: "next", tierIndex: 1 });
    const lines = [current, next];
    const progressMap = buildProgressMap([]);
    const result = getNextLine("current", lines, progressMap, metadata);
    expect(result.line?.id).toBe("next");
  });

  it("returns null when nothing is unlocked", () => {
    const current = makeLine({ id: "current", tierIndex: 1, continuationIds: [] });
    const lines = [current];
    const progressMap = buildProgressMap([]);
    const result = getNextLine("current", lines, progressMap, metadata);
    expect(result.line).toBeNull();
    expect(result.reason).toBe("All lines completed or locked");
  });
});

describe("getLineDisplayName", () => {
  it("returns variationName when there is no parentVariation", () => {
    const line = makeLine({ id: "x", variationName: "Main Setup", parentVariation: "" });
    expect(getLineDisplayName(line)).toBe("Main Setup");
  });

  it("returns variationName when parentVariation equals variationName", () => {
    const line = makeLine({ id: "x", variationName: "Main Setup", parentVariation: "Main Setup" });
    expect(getLineDisplayName(line)).toBe("Main Setup");
  });

  it("combines parentVariation and variationName otherwise", () => {
    const line = makeLine({
      id: "x",
      variationName: "Main Setup",
      parentVariation: "Giuoco Pianissimo",
    });
    expect(getLineDisplayName(line)).toBe("Giuoco Pianissimo — Main Setup");
  });
});

describe("lineAccuracy", () => {
  it("returns 0 when never practiced", () => {
    const rec = makeRecord({ lessonId: "x", completedRepetitions: 0, mistakeCount: 0 });
    expect(lineAccuracy(rec)).toBe(0);
  });

  it("computes accuracy with the stats formula", () => {
    // 2 mistakes over 1 repetition => 100 - 2*15 = 70
    const rec = makeRecord({ lessonId: "x", completedRepetitions: 1, mistakeCount: 2 });
    expect(lineAccuracy(rec)).toBe(70);
  });

  it("never drops below 50", () => {
    // 10 mistakes over 1 repetition => 100 - 150 = -50 => clamped to 50
    const rec = makeRecord({ lessonId: "x", completedRepetitions: 1, mistakeCount: 10 });
    expect(lineAccuracy(rec)).toBe(50);
  });
});

describe("isLineCompleted", () => {
  it("is true when mastery >= 70 and completedRepetitions >= 1", () => {
    const progressMap = buildProgressMap([makeRecord({ lessonId: "a", mastery: 70, completedRepetitions: 1 })]);
    expect(isLineCompleted("a", progressMap)).toBe(true);
  });

  it("is false when mastery < 70", () => {
    const progressMap = buildProgressMap([makeRecord({ lessonId: "a", mastery: 60, completedRepetitions: 1 })]);
    expect(isLineCompleted("a", progressMap)).toBe(false);
  });

  it("is false when never practiced", () => {
    const progressMap = buildProgressMap([makeRecord({ lessonId: "a", mastery: 90, completedRepetitions: 0 })]);
    expect(isLineCompleted("a", progressMap)).toBe(false);
  });
});
