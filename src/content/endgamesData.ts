import type { EndgameLesson } from "@/types/lotus";

export interface EndgameCategory {
  id: string;
  name: string;
  description: string;
  lessons: EndgameLesson[];
}

export const endgameCategories: EndgameCategory[] = [
  {
    id: "pawn-endgames",
    name: "Pawn Endgames",
    description: "Master the fundamentals of king activity, opposition, key squares, and pawn breakthrough mechanics.",
    lessons: [
      {
        id: "basic-opposition",
        name: "Basic Opposition",
        category: "Pawn Endgames",
        fen: "8/8/8/8/3k4/8/3K4/3P4 w - - 0 1",
        objective: "Hold the opposition and escort your pawn to promotion.",
        winningMethod: "Use the king to seize key squares in front of the pawn, forcing the enemy king to step aside.",
        commonErrors: [
          "Pushing the pawn too early without establishing the king's position.",
          "Losing opposition and allowing the enemy king to block the promotion square.",
        ],
        hints: [
          "Move your king first to gain space.",
          "Keep your king in front of the pawn when possible.",
        ],
        engineEvaluation: "+-",
        difficulty: 1,
        tags: ["king", "pawn", "opposition"],
      },
      {
        id: "key-squares",
        name: "Key Squares",
        category: "Pawn Endgames",
        fen: "8/8/8/6k1/8/8/6P1/6K1 w - - 0 1",
        objective: "Promote the g-pawn by capturing the critical entry squares.",
        winningMethod: "Advance the king to the 6th rank ahead of the pawn to guarantee promotion.",
        commonErrors: ["Pushing pawns instead of improving the king's position."],
        hints: ["Occupy the key squares f6, g6, or h6 with your king."],
        engineEvaluation: "+-",
        difficulty: 2,
        tags: ["king", "pawn", "key-squares"],
      },
    ],
  },
  {
    id: "rook-endgames",
    name: "Rook Endgames",
    description: "The most common endgames. Learn to build a bridge, defend along the third rank, and cut off the enemy king.",
    lessons: [
      {
        id: "lucena-bridge",
        name: "Lucena Position",
        category: "Rook Endgames",
        fen: "8/8/8/8/2K5/8/1P1R4/1k6 w - - 0 1",
        objective: "Promote your b-pawn by building a rook bridge to block checks.",
        winningMethod: "Cut off the black king, advance the pawn to the 7th rank, activate your rook to the 4th rank, and shield your king.",
        commonErrors: [
          "Checking the enemy king unnecessarily.",
          "Allowing the defender's king to occupy the promotion file.",
        ],
        hints: [
          "Use the rook to cut the enemy king off by at least one file.",
          "Place your rook on the 4th rank to prepare the bridge defense.",
        ],
        engineEvaluation: "+-",
        difficulty: 4,
        tags: ["rook", "promotion", "bridge"],
      },
      {
        id: "philidor-defense",
        name: "Philidor Position",
        category: "Rook Endgames",
        fen: "8/8/8/3k4/8/3K4/3P4/3Rr3 b - - 0 1",
        objective: "Hold the draw by defending along the 3rd rank and checking from behind.",
        winningMethod: "Keep your rook on the 3rd rank to stop the king's advance. Once the pawn moves, slide the rook to the 8th rank and check from the rear.",
        commonErrors: [
          "Leaving the 3rd rank too early before the pawn has advanced.",
          "Allowing the attacking king to invade and create checkmate nets.",
        ],
        hints: [
          "Only move your rook to the back rank once the pawn advances to the 6th rank.",
          "Check the king repeatedly from behind where it has no shelter.",
        ],
        engineEvaluation: "=",
        difficulty: 3,
        tags: ["rook", "defense", "draw"],
      },
      {
        id: "vancura-defense",
        name: "Vancura Position",
        category: "Rook Endgames",
        fen: "8/8/8/k7/1R6/p7/K7/3r4 w - - 0 1",
        objective: "Hold a draw against an active rook and rook-pawn.",
        winningMethod: "Place the rook on the f-file (6th rank) to harass the opponent's king from the side.",
        commonErrors: ["Getting the rook trapped in front of the pawn."],
        hints: ["Keep the rook active and check the king from the side."],
        engineEvaluation: "=",
        difficulty: 4,
        tags: ["rook", "defense", "draw"],
      },
    ],
  },
  {
    id: "queen-endgames",
    name: "Queen Endgames",
    description: "Learn to win or defend dynamic positions involving queens and advanced pawns.",
    lessons: [
      {
        id: "queen-vs-pawn-7th",
        name: "Queen vs Pawn on 7th",
        category: "Queen Endgames",
        fen: "8/8/8/8/8/8/3p1K2/3k2Q1 w - - 0 1",
        objective: "Force the enemy king in front of the pawn to bring your own king closer.",
        winningMethod: "Give checks and pins to force the king to block its own pawn, using those free turns to walk your king to the fight.",
        commonErrors: ["Stalemate traps when the king is forced to the corner."],
        hints: ["Make sure you don't allow stalemate when checking."],
        engineEvaluation: "+-",
        difficulty: 3,
        tags: ["queen", "pawn", "king"],
      },
    ],
  },
  {
    id: "minor-piece-endgames",
    name: "Minor Piece Endgames",
    description: "Master the tricky techniques required to force checkmate with minor pieces.",
    lessons: [
      {
        id: "two-bishops-mate",
        name: "Two Bishops Mate",
        category: "Minor Piece Endgames",
        fen: "k7/8/8/8/8/8/8/K3BB2 w - - 0 1",
        objective: "Checkmate the enemy king in the corner using both bishops.",
        winningMethod: "Use the king and bishops together to restrict the enemy king, drive it to the edge, and deliver mate in the corner.",
        commonErrors: [
          "Stalemating the king when it has no legal moves.",
          "Failing to coordinate the king and bishops.",
        ],
        hints: [
          "Bishops control diagonals; use them to build a cage.",
          "The king must help corner the defender.",
        ],
        engineEvaluation: "+-",
        difficulty: 3,
        tags: ["bishop", "mate", "corner"],
      },
      {
        id: "bishop-knight-mate",
        name: "Bishop + Knight Mate",
        category: "Minor Piece Endgames",
        fen: "k7/8/8/8/8/8/8/K3B1N1 w - - 0 1",
        objective: "Force checkmate with a bishop and a knight.",
        winningMethod: "Herd the enemy king into a corner of the same color as your bishop, using a W-maneuver with the knight.",
        commonErrors: [
          "Exceeding the 50-move draw limit due to disorganized maneuvers.",
          "Pushing the king to the wrong corner.",
        ],
        hints: [
          "The king can only be checkmated in a corner matching your bishop's color.",
          "Use the knight to guard squares of the opposite color.",
        ],
        engineEvaluation: "+-",
        difficulty: 5,
        tags: ["bishop", "knight", "mate"],
      },
    ],
  },
];

export function getEndgameLessonById(id: string): EndgameLesson | null {
  for (const cat of endgameCategories) {
    const lesson = cat.lessons.find((l) => l.id === id);
    if (lesson) return lesson;
  }
  return null;
}

export function getAllEndgameLessons(): EndgameLesson[] {
  return endgameCategories.flatMap((cat) => cat.lessons);
}
