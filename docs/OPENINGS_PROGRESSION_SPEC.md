# Openings Training Progression — Technical Specification

> **Status**: Design complete. Implementer-ready.  
> **Scope**: Rework the openings training progression to consume curated JSON data, enforce prerequisite + graduation gating, fix line naming, and add completion gamification.  
> **Constraint**: Only `.md` files may be edited in this phase. All code changes described here are for the implementer to execute after approval.

---

## 1. Data Loading Architecture

### 1.1 Mechanism

Use **static JSON imports** bundled by Next.js. Do **not** use dynamic `fetch()` or a loader — the curated files are small, validated, and should be available at build time.

Create a new module:

```
src/content/openingsCurated.ts
```

This module imports every curated tier file and the metadata file for each opening that has curated data. Initially only `italian-game` is curated, but the structure must support any opening under `data/openings/{colour}/{openingId}/`.

### 1.2 Curated Data Module Shape

```ts
// src/content/openingsCurated.ts
import beginnerData from "@/data/openings/white/italian/beginner.json";
import noviceData from "@/data/openings/white/italian/novice.json";
import intermediateData from "@/data/openings/white/italian/intermediate.json";
import advancedData from "@/data/openings/white/italian/advanced.json";
import expertData from "@/data/openings/white/italian/expert.json";
import masterData from "@/data/openings/white/italian/master.json";
import legendData from "@/data/openings/white/italian/legend.json";
import metadata from "@/data/openings/white/italian/metadata.json";

export interface CuratedLine {
  id: string;
  parentVariation: string;
  openingFamily: string;
  variationName: string;
  aliases: string[];
  eco: string;
  pgn: string;
  sanMoves: string[];
  uciMoves: string[];
  startingFen: string;
  moveDepth: number;
  difficulty: number;
  popularity: number;
  prerequisites: string[];
  continuationIds: string[];
  conceptIds: string[];
  strategicIdeas: string[];
  tacticalMotifs: string[];
  commonMistakes: string[];
  explanation: string;
  reviewPriority: number;
  estimatedStudyMinutes: number;
  masteryXp: number;
  masteryLevel: string; // "Beginner" | "Novice" | ... | "Legend"
  tierIndex: number;    // 0–6 matching metadata.masteryLevels[].level - 1
}

export interface MasteryLevelMetadata {
  level: number;
  tier: string;
  objectives: string[];
  expectedKnowledge: string;
  averageMoveDepth: number;
  averageLineCount: number;
  xpReward: number;
  graduationRequirements: string;
}

export interface OpeningCuratedMetadata {
  id: string;
  name: string;
  slug: string;
  ecoRange: string;
  family: string;
  colour: "white" | "black";
  popularity: number;
  difficulty: number;
  description: string;
  strategicOverview: string;
  typicalPawnStructures: string[];
  commonTacticalThemes: string[];
  modelPlayers: string[];
  recommendedStudyOrder: string[];
  baseMoves: string[];
  masteryLevels: MasteryLevelMetadata[];
}

export interface CuratedOpening {
  metadata: OpeningCuratedMetadata;
  lines: CuratedLine[];
}

export const curatedOpenings: Record<string, CuratedOpening> = {
  "italian-game": {
    metadata: metadata as OpeningCuratedMetadata,
    lines: [
      ...beginnerData.lines.map((l: any) => ({ ...l, masteryLevel: "Beginner", tierIndex: 0 })),
      ...noviceData.lines.map((l: any) => ({ ...l, masteryLevel: "Novice", tierIndex: 1 })),
      ...intermediateData.lines.map((l: any) => ({ ...l, masteryLevel: "Intermediate", tierIndex: 2 })),
      ...advancedData.lines.map((l: any) => ({ ...l, masteryLevel: "Advanced", tierIndex: 3 })),
      ...expertData.lines.map((l: any) => ({ ...l, masteryLevel: "Expert", tierIndex: 4 })),
      ...masterData.lines.map((l: any) => ({ ...l, masteryLevel: "Master", tierIndex: 5 })),
      ...legendData.lines.map((l: any) => ({ ...l, masteryLevel: "Legend", tierIndex: 6 })),
    ],
  },
};
```

### 1.3 Mapping to `OpeningVariation` / `RepertoireLine`

When a curated line is selected for training, map it to the existing [`OpeningVariation`](src/types/lotus.ts:53) type expected by [`OpeningTrainer`](src/features/trainer/opening-trainer.tsx:17):

```ts
function curatedLineToOpeningVariation(
  line: CuratedLine,
  repertoireName: string,
  side: "white" | "black"
): OpeningVariation {
  return {
    id: line.id,
    opening: repertoireName,
    variation: line.variationName,
    category: side === "white" ? "White" : ("Black vs e4" as const),
    side,
    eco: line.eco,
    difficulty: line.difficulty,
    overview: line.explanation,
    keyIdeas: line.strategicIdeas,
    movesSan: line.sanMoves,
    pgn: line.pgn,
    concepts: line.conceptIds,
    commonMistakes: line.commonMistakes,
    tacticalMotifs: line.tacticalMotifs,
    modelGames: [],
    isCustom: false,
    parentId: line.parentVariation,
    // New optional fields added to OpeningVariation (see §2)
    prerequisites: line.prerequisites,
    continuationIds: line.continuationIds,
    masteryLevel: line.masteryLevel,
    aliases: line.aliases,
    uciMoves: line.uciMoves,
    startingFen: line.startingFen,
    moveDepth: line.moveDepth,
    popularity: line.popularity,
    reviewPriority: line.reviewPriority,
    estimatedStudyMinutes: line.estimatedStudyMinutes,
    masteryXp: line.masteryXp,
  };
}
```

### 1.4 Fallback for Non-Curated Openings

Openings without curated data (e.g., `ruy-lopez`, `sicilian-defense`) must **continue to work** without breaking existing users.

In [`src/content/openingsData.ts`](src/content/openingsData.ts), modify [`getRepertoireById()`](src/content/openingsData.ts:315):

1. Check `curatedOpenings[id]` first.
2. If curated data exists, return a `Repertoire` whose `lines` are derived from the curated `CuratedLine[]` (mapped to `RepertoireLine` with real names).
3. If no curated data exists, fall back to the existing `generateRepertoireLines()` synthetic generation.

For the synthetic fallback, **improve naming** so it is not just "Line #N":

```ts
// In generateRepertoireLines(), replace the levelName block (lines 126–133)
const tierNames = ["Beginner", "Novice", "Intermediate", "Advanced", "Expert", "Master", "Legend"];
const tierIndex = Math.min(6, Math.floor(i / 25)); // 0–6
const tierName = tierNames[tierIndex];
const lineName = `${openingName} ${tierName} Variation ${(i % 25) + 1}`;
```

Where `openingName` is derived from the `raw` repertoire object's `name` field (e.g., `"Ruy Lopez"`). This keeps names sensible even for synthetic data.

---

## 2. Type System Changes

### 2.1 Updated `OpeningVariation` (`src/types/lotus.ts`)

Add the following optional fields to [`OpeningVariation`](src/types/lotus.ts:53):

```ts
export interface OpeningVariation {
  id: string;
  opening: string;
  variation: string;
  category: "White" | "Black vs e4" | "Black vs d4";
  side: StudySide;
  eco: string;
  difficulty: number;
  overview: string;
  keyIdeas: string[];
  movesSan: string[];
  pgn: string;
  concepts: string[];
  commonMistakes: string[];
  tacticalMotifs: string[];
  modelGames: string[];
  isCustom?: boolean;
  parentId?: string;
  // --- NEW FIELDS ---
  prerequisites?: string[];
  continuationIds?: string[];
  masteryLevel?: string;
  aliases?: string[];
  uciMoves?: string[];
  startingFen?: string;
  moveDepth?: number;
  popularity?: number;
  reviewPriority?: number;
  estimatedStudyMinutes?: number;
  masteryXp?: number;
}
```

### 2.2 Updated `RepertoireLine` (`src/content/openingsData.ts`)

Update [`RepertoireLine`](src/content/openingsData.ts:3) to carry progression metadata:

```ts
export interface RepertoireLine {
  id: string;
  name: string;
  movesSan: string[];
  difficulty: number;
  // --- NEW FIELDS ---
  prerequisites?: string[];
  continuationIds?: string[];
  masteryLevel?: string;
  parentVariation?: string;
  variationName?: string;
  aliases?: string[];
  uciMoves?: string[];
  startingFen?: string;
  moveDepth?: number;
  popularity?: number;
  reviewPriority?: number;
  estimatedStudyMinutes?: number;
  masteryXp?: number;
  strategicIdeas?: string[];
  conceptIds?: string[];
  explanation?: string;
}
```

### 2.3 New `CuratedLine` & Metadata Types (`src/content/openingsCurated.ts`)

As defined in §1.2. These are the raw shapes imported directly from JSON.

### 2.4 New `ProgressionHelpers` Types (`src/services/learning/progression.ts`)

```ts
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
```

---

## 3. Line Naming Fix

### 3.1 Trainer Header

In [`opening-trainer.tsx`](src/features/trainer/opening-trainer.tsx:410), the header currently renders:

```tsx
{lesson.opening}: <span className="text-white/40">{lesson.variation}</span>
```

For curated data, `lesson.variation` is the real `variationName` (e.g., `"Giuoco Pianissimo Main Setup"`). For synthetic data, it remains the generated name. **No change needed** in the trainer header — the fix is upstream in how `activeLesson` is built in the page.

### 3.2 `[id]/page.tsx` Line List

In [`src/app/(dashboard)/practice/openings/[id]/page.tsx`](src/app/(dashboard)/practice/openings/[id]/page.tsx:214), the line name currently renders `{line.name}`. For curated data, `line.name` must be set to the real `variationName` (or `parentVariation + " — " + variationName` if `parentVariation` differs). For synthetic data, keep the improved `"${openingName} ${tierName} Variation ${n}"` naming from §1.4.

### 3.3 Review Queue Duplication Fix

In [`src/features/dashboard/useReviewQueue.ts`](src/features/dashboard/useReviewQueue.ts:83), the generic "Line #N" naming block (lines 83–90) is duplicated from [`openingsData.ts`](src/content/openingsData.ts:126). **Remove the duplication**:

1. Delete lines 83–90 in `useReviewQueue.ts`.
2. Import a shared `getLineDisplayName(lineId: string, allLines: CuratedLine[]): string` helper from `src/services/learning/progression.ts`.
3. If the `lessonId` matches a curated line ID, return its `variationName`.
4. If it matches the old synthetic pattern (`/^([a-z-]+)-line-(\d+)$/`), return the improved synthetic name from §1.4.
5. Otherwise fall back to `"Line #N"`.

---

## 4. Gating Rules & Progression Helpers

### 4.1 "Line Completed" Definition

A line is **completed** when its `ProgressRecord` satisfies **all** of:

- `mastery >= 70` (matches the existing threshold in [`[id]/page.tsx`](src/app/(dashboard)/practice/openings/[id]/page.tsx:74) and [`stats.ts`](src/services/learning/stats.ts:59))
- `completedRepetitions >= 1` (the line has been practiced at least once)

### 4.2 Tier Graduation Definition

A tier is **graduated** when **all** of the following are true:

1. **All lines in the tier are completed** (`mastery >= 70` and `completedRepetitions >= 1`).
2. **Tier accuracy threshold met**: The average per-line accuracy across all lines in the tier meets or exceeds the threshold parsed from `metadata.masteryLevels[N].graduationRequirements`.
3. **Mistake threshold met** (if specified): The average `mistakeCount` per line is below the parsed limit.

#### Parsing `graduationRequirements` Strings

The curated `metadata.json` contains free-text strings. Parse them into structured thresholds:

| Tier | Raw String | Parsed Thresholds |
|------|-----------|-------------------|
| Beginner | "Complete all beginner lines with fewer than 2 mistakes on average." | `minAccuracy: 0`, `maxAvgMistakes: 2` |
| Novice | "Complete all novice lines with an accuracy rate of 70% or higher." | `minAccuracy: 70`, `maxAvgMistakes: Infinity` |
| Intermediate | "Complete all intermediate lines with an accuracy rate of 75% or higher." | `minAccuracy: 75`, `maxAvgMistakes: Infinity` |
| Advanced | "Complete all advanced lines with an accuracy rate of 80% or higher." | `minAccuracy: 80`, `maxAvgMistakes: Infinity` |
| Expert | "Complete all expert lines with an accuracy rate of 80% or higher." | `minAccuracy: 80`, `maxAvgMistakes: Infinity` |
| Master | "Complete all master lines with an accuracy rate of 85% or higher." | `minAccuracy: 85`, `maxAvgMistakes: Infinity` |
| Legend | "Complete all legend lines with an accuracy rate of 90% or higher." | `minAccuracy: 90`, `maxAvgMistakes: Infinity` |

**Accuracy computation per line** (matches [`stats.ts`](src/services/learning/stats.ts:89) formula):

```ts
function lineAccuracy(record: ProgressRecord): number {
  if (record.completedRepetitions <= 0) return 0;
  return Math.max(50, Math.round(100 - (record.mistakeCount / record.completedRepetitions) * 15));
}
```

**Tier accuracy** = average of `lineAccuracy()` across all lines in the tier that have a `ProgressRecord`. Lines with no record contribute `0` to the average (they are not completed, so the tier cannot be graduated anyway).

**Tier average mistakes** = `sum(mistakeCount) / totalLinesInTier`.

### 4.3 Progression Helper Module

Create [`src/services/learning/progression.ts`](src/services/learning/progression.ts):

```ts
import type { ProgressRecord } from "@/types/lotus";
import type { CuratedLine, CuratedOpening, MasteryLevelMetadata } from "@/content/openingsCurated";

/**
 * Returns whether a line is unlocked for the user.
 * A line is unlocked if all its prerequisites (line IDs) are completed.
 */
export function isLineUnlocked(
  line: CuratedLine,
  allLines: CuratedLine[],
  progressById: Map<string, ProgressRecord>
): LineUnlockState;

/**
 * Returns whether a mastery tier is unlocked.
 * Tier N is locked until tier N-1 is graduated.
 * Tier 0 (Beginner) is always unlocked.
 */
export function isLevelUnlocked(
  tierIndex: number,
  metadata: OpeningCuratedMetadata,
  progressById: Map<string, ProgressRecord>,
  allLines: CuratedLine[]
): LevelUnlockState;

/**
 * Computes graduation status for a tier.
 */
export function getLevelGraduation(
  tierIndex: number,
  lines: CuratedLine[],
  progressById: Map<string, ProgressRecord>,
  metadata: OpeningCuratedMetadata
): GraduationResult;

/**
 * Returns the next recommended line to study after completing `currentLineId`.
 * Priority: continuationIds first, then first unlocked line in next tier, then first unlocked line in same tier.
 */
export function getNextLine(
  currentLineId: string,
  allLines: CuratedLine[],
  progressById: Map<string, ProgressRecord>,
  metadata: OpeningCuratedMetadata
): NextLineResult;

/**
 * Returns the display name for a line.
 */
export function getLineDisplayName(line: CuratedLine): string;

/**
 * Builds a lookup map of lineId -> ProgressRecord from an array.
 */
export function buildProgressMap(records: ProgressRecord[]): Map<string, ProgressRecord>;
```

#### Implementation Notes for Helpers

- **`isLineUnlocked`**: Check `line.prerequisites.every(prereqId => isLineCompleted(prereqId, progressById))`. If locked, return `{ isUnlocked: false, reason: \`Complete "${getLineDisplayName(allLines.find(l => l.id === prereqId))}" first\` }`.
- **`isLevelUnlocked`**: If `tierIndex === 0` return `{ isUnlocked: true, isGraduated: false, ... }`. Otherwise check `getLevelGraduation(tierIndex - 1, ...)` — if graduated, unlock; else return reason from previous tier's graduation status.
- **`getLevelGraduation`**: Filter lines by `line.tierIndex === tierIndex`. Count completed lines. Compute tier accuracy and average mistakes. Compare against `metadata.masteryLevels[tierIndex]`.
- **`getNextLine`**: 
  1. If `currentLine` has `continuationIds`, find the first continuation that is unlocked.
  2. Else find the first unlocked line in `tierIndex + 1`.
  3. Else find the first unlocked line in the same tier that is not `currentLineId`.
  4. Else return `null` with reason "All lines completed or locked".
- **`getLineDisplayName`**: Return `line.variationName` if `line.parentVariation` is empty or equals `line.variationName`; otherwise return `"${line.parentVariation} — ${line.variationName}"`.

---

## 5. Trainer Completion Gamification

### 5.1 UX Specification

When a line is completed (`isLineComplete` is true in [`opening-trainer.tsx`](src/features/trainer/opening-trainer.tsx:257)), show a **framer-motion overlay/card** with:

- **Success message**: "Line Complete — {variationName}"
- **Stats**: XP earned (`masteryXp`), mastery % (from `calculateNextReview` result), mistakes count
- **CTAs**:
  - **"Next Line"** — primary action. Calls `onNextLine()` prop. Disabled if no next line is unlocked, with tooltip explaining why.
  - **"Replay"** — secondary action. Calls `onReplay()` prop (resets the trainer).
  - **"Back to Levels"** — tertiary action. Calls `onBackToLevels()` prop (navigates to the levels panel).

### 5.2 Trainer Props & Callbacks

Update [`OpeningTrainerProps`](src/features/trainer/opening-trainer.tsx:17):

```ts
interface OpeningTrainerProps {
  lesson: OpeningVariation;
  // --- NEW PROPS ---
  isLineUnlocked?: boolean;
  onLineComplete?: (result: { masteryXp: number; mistakes: number; score: number }) => void;
  onNextLine?: () => void;
  onReplay?: () => void;
  onBackToLevels?: () => void;
  hasNextLine?: boolean;
  nextLineLockReason?: string;
}
```

### 5.3 Wiring in `opening-trainer.tsx`

1. Add `isLineComplete` state (already computed at line 257 as `nextPly >= lesson.movesSan.length`).
2. When `isLineComplete` becomes true and `onLineComplete` is provided, call it with the result.
3. Render the completion overlay using `AnimatePresence` + `motion.div` (framer-motion is already imported at line 14).
4. The overlay should appear **after** the "Line complete. Progress saved." feedback message, or replace the feedback area temporarily.

### 5.4 Wiring in `[id]/page.tsx`

The page must compute and pass the new props:

```ts
const activeLesson: OpeningVariation | null = selectedLine ? { ... } : null;

const lineUnlockState = useMemo(() => {
  if (!selectedLine || !repertoire) return null;
  return isLineUnlocked(selectedLine, repertoire.lines, progressMap);
}, [selectedLine, repertoire, progressMap]);

const nextLineResult = useMemo(() => {
  if (!selectedLine || !repertoire) return null;
  return getNextLine(selectedLine.id, repertoire.lines, progressMap, curatedMetadata);
}, [selectedLine, repertoire, progressMap, curatedMetadata]);

// Pass to trainer:
<OpeningTrainer
  lesson={activeLesson}
  isLineUnlocked={lineUnlockState?.isUnlocked ?? true}
  onLineComplete={(result) => { /* save progress, refresh state */ }}
  onNextLine={() => {
    if (nextLineResult?.line) {
      setSelectedLine(mapCuratedLineToRepertoireLine(nextLineResult.line));
    }
  }}
  onReplay={() => {/* handled by trainer internal reset */}}
  onBackToLevels={() => {/* no-op or scroll to levels panel */}}
  hasNextLine={nextLineResult?.line !== null}
  nextLineLockReason={nextLineResult?.reason}
/>
```

---

## 6. Training Levels Panel Restructure

### 6.1 Panel Layout (`[id]/page.tsx`)

Replace the current level tabs + line list (lines 170–230) with:

#### Level Tabs

Each tab shows:
- Tier name (e.g., "Beginner")
- Lock icon (`<Lock className="size-3" />`) if tier is locked
- Unlock requirement text below: "Graduate {previousTier} first" or "{accuracy}% accuracy required"
- Disabled state: `opacity-50 cursor-not-allowed` with no click handler

```tsx
{LEVEL_TABS.map((tab) => {
  const unlockState = isLevelUnlocked(tab.tierIndex, metadata, progressMap, repertoire.lines);
  const isActive = activeLevel === tab.value && unlockState.isUnlocked;
  return (
    <button
      key={tab.value}
      disabled={!unlockState.isUnlocked}
      onClick={() => {
        if (!unlockState.isUnlocked) return;
        setActiveLevel(tab.value);
        const lvlLines = getLinesForLevel(repertoire.lines, tab.value);
        if (lvlLines.length > 0) setSelectedLine(lvlLines[0]);
      }}
      title={!unlockState.isUnlocked ? unlockState.reason : undefined}
      className={...}
    >
      <p className="text-xs font-bold leading-none">{tab.label}</p>
      {unlockState.isGraduated && <Trophy className="size-3 text-amber-400" />}
      {!unlockState.isUnlocked && <Lock className="size-3 text-slate-500" />}
      <p className="text-[9px] text-slate-500 mt-1">
        {unlockState.isUnlocked ? tab.range : unlockState.reason}
      </p>
    </button>
  );
})}
```

#### Line Rows

Each row shows:
- **Real name**: `getLineDisplayName(line)` — e.g., "Giuoco Pianissimo — Giuoco Pianissimo Main Setup"
- **State icon**:
  - Completed: `<ShieldCheck className="size-3.5 text-emerald-400" />` (mastery >= 70)
  - Locked: `<Lock className="size-3 text-slate-600" />` (prerequisites not met)
  - Available: `<Circle className="size-3 text-primary/50" />` (unlocked, not completed)
- **Mastery %**: e.g., "85%" if record exists, else "—"
- **Prerequisite hint**: If locked, show "Requires: {prereqName}" in muted text
- **Non-clickable** when locked: `cursor-not-allowed opacity-60` with no `onClick`

```tsx
{currentLevelLines.map((line) => {
  const record = progressById.get(line.id);
  const isCompleted = record ? record.mastery >= 70 && record.completedRepetitions >= 1 : false;
  const unlockState = isLineUnlocked(line, repertoire.lines, progressById);
  const isLocked = !unlockState.isUnlocked;

  return (
    <div
      key={line.id}
      onClick={() => { if (!isLocked) setSelectedLine(line); }}
      className={cn(
        "w-full text-left p-3 rounded-lg border transition-all flex justify-between items-center",
        isLocked && "opacity-60 cursor-not-allowed",
        !isLocked && "hover:border-white/10 hover:bg-white/[0.02] cursor-pointer",
        selectedLine?.id === line.id && "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
      )}
    >
      <div className="space-y-0.5 max-w-[220px]">
        <div className="flex items-center gap-1.5">
          <h3 className="text-xs font-bold text-white truncate">{getLineDisplayName(line)}</h3>
          {isCompleted && <ShieldCheck className="size-3.5 text-emerald-400 shrink-0" />}
          {isLocked && <Lock className="size-3 text-slate-600 shrink-0" />}
        </div>
        {isLocked && line.prerequisites.length > 0 && (
          <p className="text-[10px] text-slate-500 font-mono">
            Requires: {getLineDisplayName(allLines.find(l => l.id === line.prerequisites[0])!)}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end gap-1 text-[9px] shrink-0">
        <span className="text-slate-500 font-medium">
          {record ? `${record.mastery}%` : "—"}
        </span>
        <span className="text-amber-300">{"★".repeat(line.difficulty)}</span>
      </div>
    </div>
  );
})}
```

### 6.2 State & Props Flow

The `[id]/page.tsx` must:

1. Load `curatedOpenings[id]` (or fallback metadata for synthetic openings).
2. Build `progressMap` via `buildProgressMap(records)`.
3. Compute `LEVEL_TABS` dynamically from `metadata.masteryLevels` instead of hardcoded ranges.
4. Pass `repertoire.lines`, `progressMap`, and `metadata` to the progression helpers.
5. Pass `isLineUnlocked`, `hasNextLine`, `nextLineLockReason` to `OpeningTrainer`.

---

## 7. Migration & Back-Compat

### 7.1 Existing Progress Records

Existing `ProgressRecord` entries use `lessonId` values like `italian-game-line-1` (synthetic IDs). Curated data uses IDs like `italian-beginner-giuoco-pianissimo-main`.

**These are different IDs.** Old progress records will **not** automatically map to new curated lines. This is acceptable because:

- The curated data replaces synthetic data for `italian-game`.
- Users re-studying the Italian Game will start fresh on curated lines, which is the intended behavior (the old 850 synthetic lines are being retired for this opening).
- Progress records for other openings (e.g., `ruy-lopez-line-15`) remain untouched because those openings still use synthetic generation.

### 7.2 Review Queue

The review queue in [`useReviewQueue.ts`](src/features/dashboard/useReviewQueue.ts) must handle both ID formats:

- Curated IDs: `italian-beginner-giuoco-pianissimo-main` → look up in `curatedOpenings`
- Synthetic IDs: `italian-game-line-1` → use the improved synthetic naming from §1.4
- Custom IDs: `custom_*` → existing logic unchanged

### 7.3 Guests & Non-Curated Openings

- Guests using `localStorage` progress: no migration needed. Their old synthetic records remain keyed by old IDs.
- Openings without curated data: continue synthetic generation with improved naming. No gating is applied to synthetic lines (they remain fully unlocked) until curated data is added for that opening.

---

## 8. Implementation Task Breakdown

Execute in this order. Each item is a concrete edit.

### Phase A: Types & Data Layer

- [ ] **A1** — Create [`src/content/openingsCurated.ts`](src/content/openingsCurated.ts) with `CuratedLine`, `MasteryLevelMetadata`, `OpeningCuratedMetadata`, `CuratedOpening` interfaces and the `curatedOpenings` map importing all 8 Italian Game JSON files.
- [ ] **A2** — Update [`src/types/lotus.ts`](src/types/lotus.ts) `OpeningVariation` interface: add optional fields `prerequisites`, `continuationIds`, `masteryLevel`, `aliases`, `uciMoves`, `startingFen`, `moveDepth`, `popularity`, `reviewPriority`, `estimatedStudyMinutes`, `masteryXp`.
- [ ] **A3** — Update [`src/content/openingsData.ts`](src/content/openingsData.ts) `RepertoireLine` interface: add the same optional fields as A2 plus `parentVariation`, `variationName`, `strategicIdeas`, `conceptIds`, `explanation`.
- [ ] **A4** — Modify [`getRepertoireById()`](src/content/openingsData.ts:315) in `openingsData.ts` to check `curatedOpenings[id]` first. If found, map `CuratedLine[]` → `RepertoireLine[]` using real `variationName` for `name`. If not found, fall back to `generateRepertoireLines()` with improved naming.
- [ ] **A5** — Modify `generateRepertoireLines()` naming block (lines 126–133) to use `"${openingName} ${tierName} Variation ${n}"` instead of `"${tierName} Line #${n}"`.

### Phase B: Progression Helpers

- [ ] **B1** — Create [`src/services/learning/progression.ts`](src/services/learning/progression.ts) with interfaces `LineUnlockState`, `LevelUnlockState`, `GraduationResult`, `NextLineResult` and functions:
  - `buildProgressMap(records: ProgressRecord[]): Map<string, ProgressRecord>`
  - `isLineCompleted(lineId, progressMap): boolean`
  - `isLineUnlocked(line, allLines, progressMap): LineUnlockState`
  - `lineAccuracy(record): number`
  - `getLevelGraduation(tierIndex, lines, progressMap, metadata): GraduationResult`
  - `isLevelUnlocked(tierIndex, metadata, progressMap, allLines): LevelUnlockState`
  - `getNextLine(currentLineId, allLines, progressMap, metadata): NextLineResult`
  - `getLineDisplayName(line): string`
- [ ] **B2** — Create [`src/services/learning/progression.test.ts`](src/services/learning/progression.test.ts) with unit tests covering:
  - `isLineUnlocked` with satisfied prerequisites → unlocked
  - `isLineUnlocked` with unsatisfied prerequisites → locked with correct reason
  - `isLevelUnlocked` for tier 0 → always unlocked
  - `isLevelUnlocked` for tier N when tier N-1 is not graduated → locked
  - `isLevelUnlocked` for tier N when tier N-1 is graduated → unlocked
  - `getLevelGraduation` with all lines completed and accuracy >= threshold → graduated
  - `getLevelGraduation` with one line incomplete → not graduated
  - `getLevelGraduation` with accuracy below threshold → not graduated
  - `getNextLine` following `continuationIds`
  - `getNextLine` falling back to next tier
  - `getNextLine` returning null when nothing unlocked
  - `getLineDisplayName` with and without `parentVariation`
  - `lineAccuracy` formula correctness

### Phase C: Trainer & Page Wiring

- [ ] **C1** — Update [`OpeningTrainerProps`](src/features/trainer/opening-trainer.tsx:17) in `opening-trainer.tsx` to add `isLineUnlocked`, `onLineComplete`, `onNextLine`, `onReplay`, `onBackToLevels`, `hasNextLine`, `nextLineLockReason`.
- [ ] **C2** — Add completion overlay in `opening-trainer.tsx` using `AnimatePresence` + `motion.div`. Render when `isLineComplete` is true. Show XP, mastery, mistakes, and CTAs. Disable "Next Line" when `!hasNextLine` and show `nextLineLockReason` as tooltip.
- [ ] **C3** — Update [`src/app/(dashboard)/practice/openings/[id]/page.tsx`](src/app/(dashboard)/practice/openings/[id]/page.tsx):
  - Import `curatedOpenings`, `isLineUnlocked`, `isLevelUnlocked`, `getLevelGraduation`, `getNextLine`, `getLineDisplayName`, `buildProgressMap` from the new modules.
  - Replace hardcoded `LEVEL_TABS` with dynamic tabs derived from `metadata.masteryLevels`.
  - Replace `getLinesForLevel()` slice logic with tier-index-based filtering: `lines.filter(l => l.masteryLevel === tab.value)` (or `l.tierIndex === tab.tierIndex`).
  - Build `progressMap` from loaded `progressRecords`.
  - Compute `lineUnlockState` and `nextLineResult` via `useMemo`.
  - Pass new props to `OpeningTrainer`.
  - Restyle level tabs to show lock state and graduation trophy.
  - Restyle line rows to show real names, lock icons, mastery %, and prerequisite hints.
- [ ] **C4** — Update [`src/app/(dashboard)/practice/openings/page.tsx`](src/app/(dashboard)/practice/openings/page.tsx) if needed to reflect curated data availability (e.g., show "Curated" badge for Italian Game).

### Phase D: Review Queue & Polish

- [ ] **D1** — Fix [`src/features/dashboard/useReviewQueue.ts`](src/features/dashboard/useReviewQueue.ts):
  - Remove duplicated generic naming block (lines 83–90).
  - Import `getLineDisplayName` and `curatedOpenings`.
  - For curated IDs, return `variationName` as subtitle.
  - For synthetic IDs, return improved synthetic name.
- [ ] **D2** — Verify [`src/services/learning/mastery.ts`](src/services/learning/mastery.ts) `calculateNextReview` still works with the new `OpeningVariation` fields (it only uses `ProgressRecord`, so no change needed).
- [ ] **D3** — Verify [`src/services/learning/stats.ts`](src/services/learning/stats.ts) `calculateDashboardSnapshot` still works (it uses `ProgressRecord[]`, no change needed).

### Phase E: Validation

- [ ] **E1** — Run `node scripts/validate-curriculum.js` to ensure all curated JSON passes schema validation.
- [ ] **E2** — Run `npx vitest run` to confirm all existing tests pass and new `progression.test.ts` passes.
- [ ] **E3** — Manual smoke test: open `/practice/openings/italian-game`, verify Beginner tab is unlocked, lines show real names, completing a line unlocks the next, graduating Beginner unlocks Novice.

---

## 9. Open Questions for Implementer

1. **Should synthetic openings ever get gating?** Spec says no — only openings with curated data get gating. If the team later wants gating for synthetic data, add a `hasCuratedData` flag to `Repertoire` and check it in the progression helpers.
2. **Should old synthetic progress records for `italian-game` be preserved?** They are preserved in Firestore/localStorage but will not match new curated line IDs. If users want to reset, they must clear progress for `italian-game` lines. Consider adding a "Reset Italian Game Progress" admin action later.
3. **Should `masteryXp` from curated data replace the existing XP formula?** The spec preserves the existing `calculateNextReview` mastery/interval logic. `masteryXp` is awarded as a bonus on line completion (add to the gamification overlay). The dashboard XP formula in `stats.ts` remains unchanged.

---

## Appendix A: Key File Reference

| File | Role |
|------|------|
| [`data/openings/white/italian/*.json`](data/openings/white/italian/) | Curated line data + metadata |
| [`schemas/opening.schema.json`](schemas/opening.schema.json) | Metadata schema |
| [`schemas/variation.schema.json`](schemas/variation.schema.json) | Line schema |
| [`src/content/openingsCurated.ts`](src/content/openingsCurated.ts) | **NEW** — curated data loader |
| [`src/content/openingsData.ts`](src/content/openingsData.ts) | **MODIFY** — repertoire factory + synthetic fallback |
| [`src/types/lotus.ts`](src/types/lotus.ts) | **MODIFY** — `OpeningVariation` fields |
| [`src/services/learning/progression.ts`](src/services/learning/progression.ts) | **NEW** — gating helpers |
| [`src/services/learning/progression.test.ts`](src/services/learning/progression.test.ts) | **NEW** — unit tests |
| [`src/features/trainer/opening-trainer.tsx`](src/features/trainer/opening-trainer.tsx) | **MODIFY** — completion overlay + new props |
| [`src/app/(dashboard)/practice/openings/[id]/page.tsx`](src/app/(dashboard)/practice/openings/[id]/page.tsx) | **MODIFY** — levels panel + trainer wiring |
| [`src/app/(dashboard)/practice/openings/page.tsx`](src/app/(dashboard)/practice/openings/page.tsx) | **MODIFY** — curated badge |
| [`src/features/dashboard/useReviewQueue.ts`](src/features/dashboard/useReviewQueue.ts) | **MODIFY** — fix naming duplication |
| [`src/services/learning/mastery.ts`](src/services/learning/mastery.ts) | No change |
| [`src/services/learning/stats.ts`](src/services/learning/stats.ts) | No change |
| [`src/services/db/progress.ts`](src/services/db/progress.ts) | No change |
