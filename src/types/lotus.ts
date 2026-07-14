export type Rank =
  | "Beginner"
  | "Novice"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | "Master"
  | "Legend";

export type LessonKind = "opening" | "endgame";
export type StudySide = "white" | "black";

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  boardColors: "lotus" | "classic" | "forest";
  pieceSet: "cburnett" | "neo" | "merida";
  animationSpeedMs: number;
  soundEnabled: boolean;
  preferredSide: StudySide;
  dailyGoalMinutes: number;
}

export interface UserStatistics {
  totalStudyMinutes: number;
  totalSessions: number;
  accuracy: number;
  streakDays: number;
  xp: number;
  currentRank: Rank;
}

export interface ProgressRecord {
  lessonId: string;
  lessonKind: LessonKind;
  confidence: number;
  mastery: number;
  reviewDate: string;
  nextReviewDate: string;
  intervalDays: number;
  easeFactor: number;
  mistakeCount: number;
  averageResponseMs: number;
  completedRepetitions: number;
  rank: Rank;
}

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
}

export interface EndgameLesson {
  id: string;
  name: string;
  category: string;
  fen: string;
  objective: string;
  winningMethod: string;
  commonErrors: string[];
  hints: string[];
  engineEvaluation: string;
  difficulty: number;
  tags: string[];
}

export interface DashboardSnapshot {
  goalMinutes: number;
  studiedMinutes: number;
  streakDays: number;
  openingsMastered: number;
  endgamesMastered: number;
  lessonsCompleted: number;
  accuracy: number;
  xp: number;
  legendProgress: number;
  currentRank: Rank;
}

export interface ReviewItem {
  id: string;
  title: string;
  subtitle: string;
  lessonKind: LessonKind;
  rank: Rank;
  confidence: number;
  dueLabel: string;
}
