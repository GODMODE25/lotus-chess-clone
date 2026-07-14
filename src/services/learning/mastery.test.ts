import { describe, it, expect } from "vitest";
import { calculateNextReview, starRatingFromRank } from "./mastery";
import type { Rank } from "@/types/lotus";

describe("calculateNextReview", () => {
  it("returns an interval of 1 day for a brand-new record with a correct answer", () => {
    const result = calculateNextReview({}, 4);
    expect(result.intervalDays).toBe(1);
    expect(result.completedRepetitions).toBe(1);
  });

  it("returns an interval of 6 days after the second correct review", () => {
    const first = calculateNextReview({}, 4);
    const second = calculateNextReview(first, 4);
    expect(second.intervalDays).toBe(6);
    expect(second.completedRepetitions).toBe(2);
  });

  it("multiplies interval by ease factor on subsequent correct reviews", () => {
    let record = calculateNextReview({}, 5);
    record = calculateNextReview(record, 5);
    const third = calculateNextReview(record, 5);
    // third interval = round(6 * ease factor)
    expect(third.intervalDays).toBeGreaterThanOrEqual(14);
    expect(third.completedRepetitions).toBe(3);
  });

  it("resets repetitions and interval on incorrect answer (score < 3)", () => {
    let record = calculateNextReview({}, 5);
    record = calculateNextReview(record, 5);
    const failed = calculateNextReview(record, 2);
    expect(failed.completedRepetitions).toBe(0);
    expect(failed.intervalDays).toBe(1);
  });

  it("increments mistake count only on incorrect answers", () => {
    const correct = calculateNextReview({}, 4);
    expect(correct.mistakeCount).toBe(0);

    const incorrect = calculateNextReview({}, 1);
    expect(incorrect.mistakeCount).toBe(1);
  });

  it("never drops ease factor below 1.3", () => {
    let record = calculateNextReview({}, 0);
    for (let i = 0; i < 20; i++) {
      record = calculateNextReview(record, 0);
    }
    expect(record.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("clamps performance score to 0-5", () => {
    const resultHigh = calculateNextReview({}, 10);
    expect(resultHigh.confidence).toBe(100); // 5/5 * 100

    const resultLow = calculateNextReview({}, -3);
    expect(resultLow.confidence).toBe(0); // 0/5 * 100
  });

  it("calculates a valid nextReviewDate in ISO format", () => {
    const result = calculateNextReview({}, 3);
    expect(result.nextReviewDate).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    const nextDate = new Date(result.nextReviewDate);
    expect(nextDate.getTime()).toBeGreaterThan(Date.now());
  });

  it("assigns appropriate ranks based on mastery", () => {
    // Perfect first attempt should produce low mastery
    const first = calculateNextReview({}, 5);
    expect(["Beginner", "Novice", "Intermediate"]).toContain(first.rank);

    // Build up mastery through multiple perfect reviews
    let record = calculateNextReview({}, 5);
    for (let i = 0; i < 8; i++) {
      record = calculateNextReview(record, 5);
    }
    // After 9 perfect reviews, mastery should be high
    expect(["Expert", "Master", "Legend"]).toContain(record.rank);
  });

  it("preserves lessonId and lessonKind from the input record", () => {
    const result = calculateNextReview(
      { lessonId: "test-123", lessonKind: "endgame" },
      4
    );
    expect(result.lessonId).toBe("test-123");
    expect(result.lessonKind).toBe("endgame");
  });
});

describe("starRatingFromRank", () => {
  it("maps Legend to 5 stars", () => {
    expect(starRatingFromRank("Legend")).toBe(5);
  });

  it("maps Master to 5 stars", () => {
    expect(starRatingFromRank("Master")).toBe(5);
  });

  it("maps Expert to 4 stars", () => {
    expect(starRatingFromRank("Expert")).toBe(4);
  });

  it("maps Advanced to 3 stars", () => {
    expect(starRatingFromRank("Advanced")).toBe(3);
  });

  it("maps Intermediate to 2 stars", () => {
    expect(starRatingFromRank("Intermediate")).toBe(2);
  });

  it("maps Novice to 1 star", () => {
    expect(starRatingFromRank("Novice")).toBe(1);
  });

  it("maps Beginner to 0 stars", () => {
    expect(starRatingFromRank("Beginner")).toBe(0);
  });

  it("returns 0 for unknown ranks", () => {
    expect(starRatingFromRank("FakeRank" as Rank)).toBe(0);
  });
});
