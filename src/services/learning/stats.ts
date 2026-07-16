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

export function calculateEloHistory(records: ProgressRecord[]) {
  const sorted = [...records].sort((a, b) => 
    new Date(a.reviewDate).getTime() - new Date(b.reviewDate).getTime()
  );

  let currentElo = 1200;
  const history = sorted.map((r, i) => {
    // XP based ELO growth simulation
    const growth = (r.completedRepetitions * 2) + (r.mastery > 70 ? 10 : 0);
    currentElo += growth;
    return {
      date: new Date(r.reviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      elo: currentElo
    };
  });

  // If too few points, pad with starting values for visual consistency
  if (history.length < 5) {
    const padded = Array.from({ length: 5 - history.length }).map((_, i) => ({
      date: `Cycle: ${i+1}`,
      elo: 1200 + (i * 20)
    }));
    return [...padded, ...history];
  }

  return history.slice(-30); // Last 30 points
}

export function calculateMotifStats(records: ProgressRecord[]) {
  const motifs = {
    Pins: 0,
    Forks: 0,
    Skewers: 0,
    Endgame: 0,
    Double: 0,
    Discovered: 0
  };

  records.forEach(r => {
    const weight = r.mastery / 100;
    if (r.lessonKind === 'endgame') motifs.Endgame += weight;
    
    // Simulate motif distribution based on lesson ID hash for stability
    const hash = r.lessonId.length;
    if (hash % 6 === 0) motifs.Pins += weight;
    if (hash % 6 === 1) motifs.Forks += weight;
    if (hash % 6 === 2) motifs.Skewers += weight;
    if (hash % 6 === 3) motifs.Double += weight;
    if (hash % 6 === 4) motifs.Discovered += weight;
  });

  // Normalize to 100 max
  const max = Math.max(...Object.values(motifs), 5);
  return Object.entries(motifs).map(([name, value]) => ({
    motif: name,
    value: Math.round((value / max) * 100)
  }));
}
