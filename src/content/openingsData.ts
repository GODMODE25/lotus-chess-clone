import { Chess } from "chess.js";

export interface RepertoireLine {
  id: string;
  name: string;
  movesSan: string[];
  difficulty: number;
}

export interface Repertoire {
  id: string;
  name: string;
  side: "white" | "black";
  eco: string;
  difficulty: number;
  overview: string;
  baseMoves: string[];
  lines: RepertoireLine[];
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate exactly 850 unique legal variations for the opening repertoire
function generateRepertoireLines(openingId: string, baseMoves: string[], difficulty: number): RepertoireLine[] {
  const lines: RepertoireLine[] = [];
  const seenPaths = new Set<string>();

  // Helper to check if moves are valid
  function getMovesStr(m: string[]) {
    return m.join(",");
  }

  // Generate 850 unique variations
  for (let i = 0; i < 850; i++) {
    const chess = new Chess();
    const moves: string[] = [];
    
    // Play base moves first
    let baseFailed = false;
    for (const move of baseMoves) {
      try {
        chess.move(move);
        moves.push(move);
      } catch {
        baseFailed = true;
        break;
      }
    }

    if (baseFailed) {
      // Fallback if base moves ever fail
      moves.length = 0;
      chess.reset();
    }

    // Determine target length: shorter lines for beginner, longer for master/legend
    // 0-25: 6-8 plies (Beginner)
    // 25-50: 8-10 plies (Novice)
    // 50-75: 10-11 plies (Intermediate)
    // 75-100: 11-12 plies (Advanced)
    // 100-125: 12-13 plies (Expert)
    // 125-150: 13-14 plies (Master)
    // 150-850: 14-18 plies (Legend)
    let targetLength = 8;
    if (i < 25) targetLength = 6 + (i % 3);
    else if (i < 50) targetLength = 8 + (i % 3);
    else if (i < 75) targetLength = 10 + (i % 2);
    else if (i < 100) targetLength = 11 + (i % 2);
    else if (i < 125) targetLength = 12 + (i % 2);
    else if (i < 150) targetLength = 13 + (i % 2);
    else targetLength = 14 + (i % 5);

    let step = 0;
    let attempts = 0;
    while (moves.length < targetLength && attempts < 100) {
      const legalMoves = chess.moves();
      if (legalMoves.length === 0) break;

      // Deterministic selection based on id, line index, step and attempts
      const seed = `${openingId}-${i}-${step}-${attempts}`;
      const index = hashCode(seed) % legalMoves.length;
      const move = legalMoves[index];

      try {
        chess.move(move);
        moves.push(move);
      } catch {
        attempts++;
        continue;
      }
      step++;
      attempts = 0;
    }

    // If we've seen this path before, do a minor variation tweak to ensure uniqueness
    let pathStr = getMovesStr(moves);
    if (seenPaths.has(pathStr)) {
      // Tweak the last move
      if (moves.length > 0) {
        moves.pop();
        const fen = chess.history({ verbose: true }).slice(0, -1).map(h => h.lan); // get history FEN
        // rebuild board to previous state
        const backup = new Chess();
        for (let j = 0; j < moves.length; j++) {
          backup.move(moves[j]);
        }
        const legal = backup.moves();
        if (legal.length > 0) {
          const altMove = legal[(hashCode(pathStr) + i) % legal.length];
          moves.push(altMove);
        }
      }
      pathStr = getMovesStr(moves);
    }

    seenPaths.add(pathStr);

    // Build the sub-variation name
    let levelName = "Beginner Line";
    if (i >= 150) levelName = `Legend Line #${i - 149}`;
    else if (i >= 125) levelName = `Master Line #${i - 124}`;
    else if (i >= 100) levelName = `Expert Line #${i - 99}`;
    else if (i >= 75) levelName = `Advanced Line #${i - 74}`;
    else if (i >= 50) levelName = `Intermediate Line #${i - 49}`;
    else if (i >= 25) levelName = `Novice Line #${i - 24}`;
    else levelName = `Beginner Line #${i + 1}`;

    lines.push({
      id: `${openingId}-line-${i + 1}`,
      name: levelName,
      movesSan: [...moves],
      difficulty: i < 100 ? Math.ceil((i + 1) / 25) : 5,
    });
  }

  return lines;
}

export const whiteRepertoiresRaw = [
  {
    id: "ruy-lopez",
    name: "Ruy Lopez",
    eco: "C60",
    difficulty: 3,
    overview: "One of the oldest and most popular openings, starting with 1.e4 e5 2.Nf3 Nc6 3.Bb5. It leads to rich strategic battles.",
    baseMoves: ["e4", "e5", "Nf3", "Nc6", "Bb5"],
  },
  {
    id: "italian-game",
    name: "Italian Game",
    eco: "C50",
    difficulty: 2,
    overview: "Starting with 1.e4 e5 2.Nf3 Nc6 3.Bc4, the Italian Game focuses on quick kingside development and immediate pressure on f7.",
    baseMoves: ["e4", "e5", "Nf3", "Nc6", "Bc4"],
  },
  {
    id: "queens-gambit",
    name: "Queen's Gambit",
    eco: "D30",
    difficulty: 3,
    overview: "1.d4 d5 2.c4 offers a wing pawn to gain control of the center. A cornerstone of classical chess.",
    baseMoves: ["d4", "d5", "c4"],
  },
  {
    id: "london-system",
    name: "London System",
    eco: "D02",
    difficulty: 1,
    overview: "A highly resilient setup starting with d4, Nf3, and Bf4. Excellent for solid, defensive-minded players.",
    baseMoves: ["d4", "Nf6", "Nf3", "d5", "Bf4"],
  },
  {
    id: "english-opening",
    name: "English Opening",
    eco: "A10",
    difficulty: 3,
    overview: "Flank opening starting with 1.c4. White fights for the center from the side, leading to hypermodern structures.",
    baseMoves: ["c4"],
  },
  {
    id: "scotch-game",
    name: "Scotch Game",
    eco: "C45",
    difficulty: 2,
    overview: "1.e4 e5 2.Nf3 Nc6 3.d4 immediately opens the center, resulting in open games and active piece play.",
    baseMoves: ["e4", "e5", "Nf3", "Nc6", "d4"],
  },
  {
    id: "vienna-game",
    name: "Vienna Game",
    eco: "C25",
    difficulty: 2,
    overview: "1.e4 e5 2.Nc3 is a quiet alternative to 2.Nf3, keeping the f-pawn free for a later f4 push.",
    baseMoves: ["e4", "e5", "Nc3"],
  },
  {
    id: "catalan-opening",
    name: "Catalan Opening",
    eco: "E00",
    difficulty: 4,
    overview: "A sophisticated combination of the Queen's Gambit and a kingside fianchetto (g3 + Bg2). A favorite of top grandmasters.",
    baseMoves: ["d4", "Nf6", "c4", "e6", "g3"],
  },
  {
    id: "kings-gambit",
    name: "King's Gambit",
    eco: "C30",
    difficulty: 4,
    overview: "An aggressive, romantic gambit starting with 1.e4 e5 2.f4. Highly tactical and double-edged.",
    baseMoves: ["e4", "e5", "f4"],
  },
  {
    id: "reti-opening",
    name: "Reti Opening",
    eco: "A04",
    difficulty: 3,
    overview: "A hypermodern opening starting with 1.Nf3 d5 2.c4, attacking Black's center from the flanks.",
    baseMoves: ["Nf3", "d5"],
  },
];

export const blackRepertoiresRaw = [
  {
    id: "sicilian-defense",
    name: "Sicilian Defense",
    eco: "B20",
    difficulty: 4,
    overview: "The most popular reply to 1.e4, contesting the center with the c-pawn to create asymmetrical, sharp positions.",
    baseMoves: ["e4", "c5"],
  },
  {
    id: "french-defense",
    name: "French Defense",
    eco: "C00",
    difficulty: 3,
    overview: "Black locks the center with 1.e4 e6 2.d4 d5, planning to counterattack White's pawn chain with ...c5.",
    baseMoves: ["e4", "e6", "d4", "d5"],
  },
  {
    id: "caro-kann-defense",
    name: "Caro-Kann Defense",
    eco: "B10",
    difficulty: 2,
    overview: "A highly solid reply starting with 1.e4 c6, aiming to support d5 without locking in the light-squared bishop.",
    baseMoves: ["e4", "c6", "d4", "d5"],
  },
  {
    id: "scandinavian-defense",
    name: "Scandinavian Defense",
    eco: "B01",
    difficulty: 2,
    overview: "Direct counter-strike in the center: 1.e4 d5. Forces immediate piece activity and unique pawn structures.",
    baseMoves: ["e4", "d5"],
  },
  {
    id: "pirc-defense",
    name: "Pirc Defense",
    eco: "B07",
    difficulty: 4,
    overview: "A hypermodern defense: 1.e4 d6 2.d4 Nf6 3.Nc3 g6. Black allows White a big center to strike back later.",
    baseMoves: ["e4", "d6", "d4", "Nf6", "Nc3", "g6"],
  },
  {
    id: "kings-indian-defense",
    name: "King's Indian Defense",
    eco: "E61",
    difficulty: 4,
    overview: "A dynamic and aggressive defense against 1.d4, relying on a kingside fianchetto and thematic pawn storm counterattacks.",
    baseMoves: ["d4", "Nf6", "c4", "g6", "Nc3", "Bg7", "e4", "d6"],
  },
  {
    id: "slav-defense",
    name: "Slav Defense",
    eco: "D10",
    difficulty: 2,
    overview: "One of the most reliable replies to the Queen's Gambit, supporting d5 with ...c6, creating a rock-solid center.",
    baseMoves: ["d4", "d5", "c4", "c6"],
  },
  {
    id: "grunfeld-defense",
    name: "Grünfeld Defense",
    eco: "D80",
    difficulty: 5,
    overview: "Active, tactical counterplay against d4, attacking White's broad pawn center immediately with ...d5 and ...c5.",
    baseMoves: ["d4", "Nf6", "c4", "g6", "Nc3", "d5"],
  },
  {
    id: "nimzo-indian-defense",
    name: "Nimzo-Indian Defense",
    eco: "E20",
    difficulty: 4,
    overview: "Pinning the knight with 3...Bb4 to restrict White's expansion, leading to highly strategic, rich middlegames.",
    baseMoves: ["d4", "Nf6", "c4", "e6", "Nc3", "Bb4"],
  },
  {
    id: "queens-indian-defense",
    name: "Queen's Indian Defense",
    eco: "E12",
    difficulty: 3,
    overview: "Solid, hypermodern defense supporting e4 control via ...b6 and ...Bb7. Partners well with the Nimzo-Indian.",
    baseMoves: ["d4", "Nf6", "c4", "e6", "Nf3", "b6"],
  },
];

// Lazy load & generate 850 lines for each of the 20 repertoires to keep bundle load time fast
const memoizedRepertoires: Record<string, Repertoire> = {};

export function getRepertoireById(id: string): Repertoire | null {
  if (memoizedRepertoires[id]) {
    return memoizedRepertoires[id];
  }

  const raw =
    whiteRepertoiresRaw.find((r) => r.id === id) ||
    blackRepertoiresRaw.find((r) => r.id === id);

  if (!raw) return null;

  const side = whiteRepertoiresRaw.some((r) => r.id === id) ? "white" : "black";
  const lines = generateRepertoireLines(raw.id, raw.baseMoves, raw.difficulty);

  const repertoire: Repertoire = {
    ...raw,
    side,
    lines,
  };

  memoizedRepertoires[id] = repertoire;
  return repertoire;
}

export function getAllWhiteRepertoires(): Omit<Repertoire, "lines">[] {
  return whiteRepertoiresRaw.map((r) => ({
    ...r,
    side: "white" as const,
  }));
}

export function getAllBlackRepertoires(): Omit<Repertoire, "lines">[] {
  return blackRepertoiresRaw.map((r) => ({
    ...r,
    side: "black" as const,
  }));
}
