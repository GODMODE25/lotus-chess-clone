import type { ProgressRecord, Rank } from "@/types/lotus";

/**
 * Calculates the next review date and updates mastery stats based on a SuperMemo-2 (SM-2) inspired algorithm.
 * 
 * @param currentRecord The existing progress record (or a default empty one)
 * @param performanceScore A score from 0-5 (0 = complete failure, 5 = perfect recall)
 * @returns An updated ProgressRecord with the new interval, ease factor, and next review date.
 */
export function calculateNextReview(
  currentRecord: Partial<ProgressRecord>,
  performanceScore: number
): ProgressRecord {
  // Clamp score between 0 and 5
  const score = Math.max(0, Math.min(5, performanceScore));
  
  // Default values for a new record
  let {
    completedRepetitions = 0,
    easeFactor = 2.5,
    intervalDays = 0,
    mistakeCount = 0,
  } = currentRecord;

  if (score >= 3) {
    // Correct response
    if (completedRepetitions === 0) {
      intervalDays = 1;
    } else if (completedRepetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }
    completedRepetitions += 1;
  } else {
    // Incorrect response
    completedRepetitions = 0;
    intervalDays = 1;
  }

  // Update ease factor (SM-2 formula)
  easeFactor = easeFactor + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3; // Minimum ease factor

  // Calculate new mastery percentage (0-100)
  // Higher ease factor and more repetitions = higher mastery
  let mastery = Math.min(100, (completedRepetitions * 15) + (easeFactor - 1.3) * 10);
  if (score < 3) {
    mastery = Math.max(0, mastery - 20); // Penalty for failure
  }
  mastery = Math.round(mastery);

  const now = new Date();
  const nextReviewDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000).toISOString();

  return {
    lessonId: currentRecord.lessonId ?? "",
    lessonKind: currentRecord.lessonKind ?? "opening",
    confidence: Math.round((score / 5) * 100),
    mastery,
    reviewDate: now.toISOString(),
    nextReviewDate,
    intervalDays,
    easeFactor,
    mistakeCount: mistakeCount + (score < 3 ? 1 : 0),
    averageResponseMs: currentRecord.averageResponseMs ?? 0,
    completedRepetitions,
    rank: calculateRank(mastery),
  };
}

/**
 * Maps a 0-100 mastery percentage to a Rank label.
 */
function calculateRank(mastery: number): Rank {
  if (mastery >= 100) return "Legend";
  if (mastery >= 85) return "Master";
  if (mastery >= 70) return "Expert";
  if (mastery >= 50) return "Advanced";
  if (mastery >= 30) return "Intermediate";
  if (mastery >= 15) return "Novice";
  return "Beginner";
}

/**
 * Returns a 1-5 star rating based on the rank.
 */
export function starRatingFromRank(rank: Rank): number {
  switch (rank) {
    case "Legend": return 5;
    case "Master": return 5;
    case "Expert": return 4;
    case "Advanced": return 3;
    case "Intermediate": return 2;
    case "Novice": return 1;
    case "Beginner": return 0;
    default: return 0;
  }
}
