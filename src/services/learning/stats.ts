import type { ProgressRecord, DashboardSnapshot, Rank } from "@/types/lotus";

export function calculateStreak(records: ProgressRecord[]): number {
  if (records.length === 0) return 0;
  
  const dates = new Set<string>();
  records.forEach((r) => {
    if (r.reviewDate) {
      try {
        dates.add(new Date(r.reviewDate).toDateString());
      } catch (e) {
        // ignore invalid dates
      }
    }
  });

  let streak = 0;
  let checkDate = new Date();
  
  // Verify if they studied today or yesterday. If neither, streak is broken (0).
  const todayStr = checkDate.toDateString();
  checkDate.setDate(checkDate.getDate() - 1);
  const yesterdayStr = checkDate.toDateString();
  
  if (!dates.has(todayStr) && !dates.has(yesterdayStr)) {
    return 0;
  }
  
  // Go backwards day by day to count consecutive days
  checkDate = new Date(); // start today
  let safetyCount = 0;
  while (safetyCount < 365) {
    if (dates.has(checkDate.toDateString())) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
    safetyCount++;
  }
  
  return streak;
}

export function getRankFromXp(xp: number): Rank {
  if (xp >= 25000) return "Legend";
  if (xp >= 15000) return "Master";
  if (xp >= 10000) return "Expert";
  if (xp >= 6000) return "Advanced";
  if (xp >= 3000) return "Intermediate";
  if (xp >= 1000) return "Novice";
  return "Beginner";
}

export function calculateDashboardSnapshot(
  records: ProgressRecord[],
  dailyGoalMinutes = 20
): DashboardSnapshot {
  const openingsMastered = records.filter(
    (r) => r.lessonKind === "opening" && r.mastery >= 70
  ).length;

  const endgamesMastered = records.filter(
    (r) => r.lessonKind === "endgame" && r.mastery >= 70
  ).length;

  const lessonsCompleted = records.filter((r) => r.completedRepetitions > 0).length;

  let totalRepetitions = 0;
  let totalMistakes = 0;
  records.forEach((r) => {
    totalRepetitions += r.completedRepetitions || 0;
    totalMistakes += r.mistakeCount || 0;
  });

  // 1.5 minutes per repetition completed
  const studiedMinutes = Math.min(
    dailyGoalMinutes + 10,
    Math.round(totalRepetitions * 1.5)
  );

  const streakDays = calculateStreak(records);

  // XP: 100 per completed repetition, plus 500 per mastered lesson
  const masteredCount = openingsMastered + endgamesMastered;
  const xp = totalRepetitions * 100 + masteredCount * 500;

  // Accuracy: based on mistakes vs repetitions
  const baseAccuracy = totalRepetitions > 0
    ? 100 - (totalMistakes / totalRepetitions) * 15
    : 100;
  const accuracy = Math.max(50, Math.min(100, Math.round(baseAccuracy)));

  // Progress towards Legend rank (capped at 100%)
  const legendProgress = Math.min(100, Math.round((xp / 25000) * 100));

  const currentRank = getRankFromXp(xp);

  return {
    goalMinutes: dailyGoalMinutes,
    studiedMinutes,
    streakDays,
    openingsMastered,
    endgamesMastered,
    lessonsCompleted,
    accuracy,
    xp,
    legendProgress,
    currentRank,
  };
}
