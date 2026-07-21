import { describe, it, expect } from "vitest";
import { curatedOpenings } from "@/content/openingsCurated";
import {
  isLineUnlocked,
  isLevelUnlocked,
  getLevelGraduation,
  getNextLine,
  buildProgressMap,
} from "@/services/learning/progression";
import { calculateNextReview } from "@/services/learning/mastery";
import { calculateDashboardSnapshot } from "@/services/learning/stats";
import type { ProgressRecord } from "@/types/lotus";

function makeCompletedRecord(lessonId: string): ProgressRecord {
  return {
    lessonId,
    lessonKind: "opening",
    confidence: 100,
    mastery: 80,
    reviewDate: new Date().toISOString(),
    nextReviewDate: new Date().toISOString(),
    intervalDays: 1,
    easeFactor: 2.5,
    mistakeCount: 0,
    averageResponseMs: 1500,
    completedRepetitions: 1,
    rank: "Expert",
  };
}

describe("Curriculum Progression Integration Tests", () => {
  const openings = ["italian-game", "ruy-lopez"];

  for (const openingId of openings) {
    describe(`Opening: ${openingId}`, () => {
      const opening = curatedOpenings[openingId];
      if (!opening) {
        throw new Error(`Curated opening not found: ${openingId}`);
      }

      const { metadata, lines } = opening;

      it("should have loaded lines and metadata correctly", () => {
        expect(metadata).toBeDefined();
        expect(lines.length).toBeGreaterThan(0);
      });

      it("Rule 1: Prerequisite Unlocking - locks dependent lines until prerequisites are met", () => {
        // Find a line that has prerequisites
        const dependentLine = lines.find((l) => l.prerequisites && l.prerequisites.length > 0);
        if (dependentLine) {
          const prereqId = dependentLine.prerequisites[0];
          
          // Case A: No progress at all -> dependent line must be locked
          let progressMap = buildProgressMap([]);
          let state = isLineUnlocked(dependentLine, lines, progressMap);
          expect(state.isUnlocked).toBe(false);
          expect(state.reason).toContain("first");

          // Case B: Prerequisite is not fully completed (completedRepetitions = 0)
          const incompleteRecord = makeCompletedRecord(prereqId);
          incompleteRecord.completedRepetitions = 0;
          progressMap = buildProgressMap([incompleteRecord]);
          state = isLineUnlocked(dependentLine, lines, progressMap);
          expect(state.isUnlocked).toBe(false);

          // Case C: Prerequisite is fully completed
          const completeRecord = makeCompletedRecord(prereqId);
          progressMap = buildProgressMap([completeRecord]);
          state = isLineUnlocked(dependentLine, lines, progressMap);
          expect(state.isUnlocked).toBe(true);
        }
      });

      it("Rule 2: Graduation Requirements & Tier Lockings", () => {
        // Tier 0 should always be unlocked
        let tier0State = isLevelUnlocked(0, metadata, buildProgressMap([]), lines);
        expect(tier0State.isUnlocked).toBe(true);

        // Tier 1 should be locked initially
        let tier1State = isLevelUnlocked(1, metadata, buildProgressMap([]), lines);
        expect(tier1State.isUnlocked).toBe(false);
        expect(tier1State.reason).toContain("Graduate");

        // Graduate Tier 0 by completing all of its lines with perfect accuracy
        const tier0Lines = lines.filter((l) => l.tierIndex === 0);
        const progressRecords = tier0Lines.map((l) => makeCompletedRecord(l.id));
        let progressMap = buildProgressMap(progressRecords);

        // Tier 0 should now be graduated
        const graduation = getLevelGraduation(0, lines, progressMap, metadata);
        expect(graduation.isGraduated).toBe(true);

        // Tier 1 should now unlock
        tier1State = isLevelUnlocked(1, metadata, progressMap, lines);
        expect(tier1State.isUnlocked).toBe(true);
      });

      it("Rule 3: Mastery XP rewards & dashboard reflection", () => {
        // Complete the first line of the opening
        const firstLine = lines[0];
        const initialRecord = calculateNextReview({}, 5); // perfect score (5)
        initialRecord.lessonId = firstLine.id;

        // Verify mastery points awarded
        expect(initialRecord.mastery).toBeGreaterThan(0);

        // Verify XP is tracked in dashboard snapshot
        const snapshot = calculateDashboardSnapshot([initialRecord]);
        expect(snapshot.xp).toBeGreaterThan(0);
        expect(snapshot.lessonsCompleted).toBe(1);
      });

      it("Rule 4: Navigation Flow (getNextLine)", () => {
        // If we complete the first line, it should route us to the next unlocked line
        const firstLine = lines[0];
        const progressMap = buildProgressMap([makeCompletedRecord(firstLine.id)]);
        const nextResult = getNextLine(firstLine.id, lines, progressMap, metadata);
        
        expect(nextResult.line).not.toBeNull();
        expect(nextResult.reason).toBeDefined();
      });
    });
  }

  it("Cross-opening isolation: Progress in Italian Game does not unlock Ruy Lopez lines", () => {
    const italian = curatedOpenings["italian-game"]!;
    const ruy = curatedOpenings["ruy-lopez"]!;

    // Find a dependent Ruy Lopez line
    const dependentRuyLine = ruy.lines.find((l) => l.prerequisites && l.prerequisites.length > 0);
    if (dependentRuyLine) {
      const prereqId = dependentRuyLine.prerequisites[0];
      // Make a completion record matching the Ruy Lopez prerequisite, but store it
      const progressMap = buildProgressMap([makeCompletedRecord(prereqId)]);
      
      // Dependent Ruy Lopez line should unlock with its own progress map
      expect(isLineUnlocked(dependentRuyLine, ruy.lines, progressMap).isUnlocked).toBe(true);

      // But if we only have progress on Italian Game lines, Ruy Lopez should remain locked
      const italianRecords = italian.lines.map((l) => makeCompletedRecord(l.id));
      const italianProgressMap = buildProgressMap(italianRecords);
      expect(isLineUnlocked(dependentRuyLine, ruy.lines, italianProgressMap).isUnlocked).toBe(false);
    }
  });
});
