import { describe, it, expect } from "vitest";
import { calculateStreak, getRankFromXp, calculateDashboardSnapshot } from "./stats";
import type { ProgressRecord } from "@/types/lotus";

describe("calculateStreak", () => {
  it("returns 0 for empty records", () => {
    expect(calculateStreak([])).toBe(0);
  });

  it("returns 0 if last review was more than 1 day ago", () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const records: ProgressRecord[] = [
      {
        lessonId: "1",
        lessonKind: "opening",
        confidence: 80,
        mastery: 50,
        reviewDate: threeDaysAgo.toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 0,
        averageResponseMs: 1000,
        completedRepetitions: 1,
        rank: "Beginner",
      },
    ];
    expect(calculateStreak(records)).toBe(0);
  });

  it("returns 1 if studied today", () => {
    const today = new Date();
    const records: ProgressRecord[] = [
      {
        lessonId: "1",
        lessonKind: "opening",
        confidence: 80,
        mastery: 50,
        reviewDate: today.toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 0,
        averageResponseMs: 1000,
        completedRepetitions: 1,
        rank: "Beginner",
      },
    ];
    expect(calculateStreak(records)).toBe(1);
  });

  it("returns 2 if studied today and yesterday", () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const records: ProgressRecord[] = [
      {
        lessonId: "1",
        lessonKind: "opening",
        confidence: 80,
        mastery: 50,
        reviewDate: today.toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 0,
        averageResponseMs: 1000,
        completedRepetitions: 1,
        rank: "Beginner",
      },
      {
        lessonId: "2",
        lessonKind: "endgame",
        confidence: 90,
        mastery: 60,
        reviewDate: yesterday.toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 0,
        averageResponseMs: 1000,
        completedRepetitions: 1,
        rank: "Beginner",
      },
    ];
    expect(calculateStreak(records)).toBe(2);
  });
});

describe("getRankFromXp", () => {
  it("determines correct Rank based on XP thresholds", () => {
    expect(getRankFromXp(500)).toBe("Beginner");
    expect(getRankFromXp(1500)).toBe("Novice");
    expect(getRankFromXp(4500)).toBe("Intermediate");
    expect(getRankFromXp(8000)).toBe("Advanced");
    expect(getRankFromXp(12000)).toBe("Expert");
    expect(getRankFromXp(18000)).toBe("Master");
    expect(getRankFromXp(30000)).toBe("Legend");
  });
});

describe("calculateDashboardSnapshot", () => {
  it("calculates accuracy, XP, and mastered counts correctly", () => {
    const records: ProgressRecord[] = [
      {
        lessonId: "op-1",
        lessonKind: "opening",
        confidence: 100,
        mastery: 80, // mastered
        reviewDate: new Date().toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 2,
        averageResponseMs: 1000,
        completedRepetitions: 5,
        rank: "Intermediate",
      },
      {
        lessonId: "eg-1",
        lessonKind: "endgame",
        confidence: 50,
        mastery: 30, // not mastered
        reviewDate: new Date().toISOString(),
        nextReviewDate: "",
        intervalDays: 1,
        easeFactor: 2.5,
        mistakeCount: 3,
        averageResponseMs: 1000,
        completedRepetitions: 5,
        rank: "Novice",
      },
    ];

    const snapshot = calculateDashboardSnapshot(records, 20);

    expect(snapshot.openingsMastered).toBe(1);
    expect(snapshot.endgamesMastered).toBe(0);
    expect(snapshot.lessonsCompleted).toBe(2);
    
    // totalRepetitions = 10
    // totalMistakes = 5
    // accuracy = 100 - (5 / 10) * 15 = 100 - 7.5 = 92.5 => rounded to 93
    expect(snapshot.accuracy).toBe(93);

    // XP = 10 repetitions * 100 + 1 mastered * 500 = 1000 + 500 = 1500
    expect(snapshot.xp).toBe(1500);

    // Rank should be Novice for 1500 XP
    expect(snapshot.currentRank).toBe("Novice");
  });
});
