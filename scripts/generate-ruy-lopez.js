const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const outputDir = path.join(__dirname, '../data/openings/white/ruy-lopez');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Helper to convert array of SAN moves to numbered PGN string
function toNumberedPgn(moves) {
  let pgn = "";
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 === 0) {
      pgn += `${Math.floor(i / 2) + 1}.${moves[i]} `;
    } else {
      pgn += `${moves[i]} `;
    }
  }
  return pgn.trim();
}

// Helper to parse SAN moves, check legality, and compute UCI + FEN
function computeChessData(moves) {
  const chess = new Chess();
  const uciMoves = [];
  const sanMoves = [];
  
  for (const move of moves) {
    const parsed = chess.move(move);
    if (!parsed) {
      throw new Error(`Illegal move: ${move} at ply ${sanMoves.length + 1}`);
    }
    sanMoves.push(parsed.san);
    uciMoves.push(parsed.from + parsed.to + (parsed.promotion ?? ''));
  }
  
  return {
    pgn: toNumberedPgn(sanMoves),
    sanMoves,
    uciMoves,
    startingFen: chess.fen(),
    moveDepth: sanMoves.length
  };
}

// 1. Beginner Tier
const beginnerLinesRaw = [
  {
    id: "ruy-lopez-beginner-morphy-main",
    parentVariation: "Morphy Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Morphy Defense Main Setup",
    aliases: ["Closed Spanish Setup"],
    eco: "C70",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7"],
    difficulty: 2,
    popularity: 5,
    prerequisites: [],
    continuationIds: ["ruy-lopez-intermediate-closed-early-d3", "ruy-lopez-advanced-closed-chigorin"],
    conceptIds: ["development", "king-safety", "piece-activity"],
    strategicIdeas: [
      "White plays Bb5 to target the c6 knight which defends the e5 pawn.",
      "By playing a6, Black challenges the bishop, forcing it to decide whether to capture (Exchange) or retreat (a4).",
      "Retreating to a4 keeps the tension while preparing to settle the bishop on b3 or c2."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Capturing on c6 immediately without positional purpose",
      "Allowing Black to trap the bishop on a4 with b5"
    ],
    explanation: "The Morphy Defense with 3...a6 is Black's most popular response. White retreats the bishop to a4, maintaining tension and development. Black follows up with Nf6 and Be7, preparing their own castling. This is the cornerstone layout for learning Closed Ruy Lopez systems.",
    reviewPriority: 5,
    estimatedStudyMinutes: 2,
    masteryXp: 10
  },
  {
    id: "ruy-lopez-beginner-exchange-main",
    parentVariation: "Exchange Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Exchange Variation Base",
    aliases: ["Ruy Lopez Exchange"],
    eco: "C68",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6"],
    difficulty: 2,
    popularity: 4,
    prerequisites: [],
    continuationIds: ["ruy-lopez-novice-exchange-d4", "ruy-lopez-novice-exchange-o-o"],
    conceptIds: ["pawn-structure", "endgame-transition", "piece-activity"],
    strategicIdeas: [
      "White exchanges the bishop for the knight to ruin Black's pawn structure.",
      "Black gets the bishop pair in return for doubled c-pawns.",
      "White aims to transition into a winning king and pawn endgame."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Believing the e5 pawn can be captured immediately (which is refuted by Qd4)",
      "Trading pieces blindly and letting Black's bishop pair dominate"
    ],
    explanation: "The Exchange Variation (4.Bxc6) immediately alters the pawn structure. White damages Black's queenside pawns in exchange for giving up the light-squared bishop. This leads to unique endgames where White's kingside pawn majority is a key asset.",
    reviewPriority: 4,
    estimatedStudyMinutes: 2,
    masteryXp: 10
  },
  {
    id: "ruy-lopez-beginner-berlin-main",
    parentVariation: "Berlin Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Berlin Defense Base",
    aliases: ["The Berlin Wall"],
    eco: "C67",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4"],
    difficulty: 2,
    popularity: 5,
    prerequisites: [],
    continuationIds: ["ruy-lopez-intermediate-berlin-lasker", "ruy-lopez-intermediate-berlin-active"],
    conceptIds: ["king-safety", "central-control", "piece-activity"],
    strategicIdeas: [
      "Black challenges White's e4 pawn directly, opting for solid piece development.",
      "White castles immediately, leaving the e4 pawn to create tactical center open files.",
      "The Berlin is notoriously solid and was used by Vladimir Kramnik to defeat Garry Kasparov."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Panicking over the loss of the e4 pawn and playing passive defense",
      "Failing to break Black's defense in the center with d4"
    ],
    explanation: "The Berlin Defense (3...Nf6) is a highly robust response. By targeting e4 immediately, Black forces White to make a choice. The main line proceeds with 4.O-O Nxe4 5.d4, leading to the famous Berlin Wall endgame.",
    reviewPriority: 5,
    estimatedStudyMinutes: 2,
    masteryXp: 10
  },
  {
    id: "ruy-lopez-beginner-steinitz-main",
    parentVariation: "Steinitz Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Steinitz Defense Base",
    aliases: ["Old Steinitz"],
    eco: "C62",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "d6", "d4", "Bd7"],
    difficulty: 1,
    popularity: 3,
    prerequisites: [],
    continuationIds: ["ruy-lopez-novice-steinitz-d4"],
    conceptIds: ["central-control", "piece-activity", "development"],
    strategicIdeas: [
      "Black defends the e5 pawn directly with d6, creating a solid but passive shield.",
      "White strikes in the center immediately with d4, taking space.",
      "Black develops the bishop to d7 to break the pin on the c6 knight."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to play d4 immediately, allowing Black to consolidate",
      "Blocking White's own f-pawn and bishop development paths"
    ],
    explanation: "The Steinitz Defense (3...d6) is solid but passive. Black prioritizes keeping the e5 strong-point at the cost of bishop activity. White gains space and development by playing an immediate 4.d4.",
    reviewPriority: 3,
    estimatedStudyMinutes: 2,
    masteryXp: 10
  },
  {
    id: "ruy-lopez-beginner-schliemann-main",
    parentVariation: "Schliemann Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Schliemann Defense Base",
    aliases: ["Jaenisch Gambit"],
    eco: "C63",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "f5", "Nc3", "fxe4", "Nxe4", "Nf6"],
    difficulty: 3,
    popularity: 3,
    prerequisites: [],
    continuationIds: ["ruy-lopez-novice-schliemann-d3"],
    conceptIds: ["king-safety", "tactics", "gambit"],
    strategicIdeas: [
      "Black plays f5 to challenge White's e4 pawn directly, aiming for open f-file play.",
      "White develops Nc3 to support e4 and control the center.",
      "Black exchanges on e4 to clear lines for potential kingside attacks."
    ],
    tacticalMotifs: ["double-attack"],
    commonMistakes: [
      "Accepting the f5 gambit carelessly, giving Black rapid kingside play",
      "Misplaying the knight recapture on e4"
    ],
    explanation: "The Schliemann Defense (3...f5) is a sharp, aggressive gambit. Black seeks immediate counterplay on the kingside by sacrificing structure. White must play accurately to neutralize Black's early initiative.",
    reviewPriority: 3,
    estimatedStudyMinutes: 3,
    masteryXp: 10
  }
];

// 2. Novice Tier
const noviceLinesRaw = [
  {
    id: "ruy-lopez-novice-exchange-d4",
    parentVariation: "Exchange Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Exchange Variation with 5.d4",
    aliases: [],
    eco: "C68",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "d4", "exd4", "Qxd4", "Qxd4", "Nxd4"],
    difficulty: 2,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-exchange-main"],
    continuationIds: [],
    conceptIds: ["endgame-transition", "pawn-structure"],
    strategicIdeas: [
      "White exchanges queens to reach a simplified endgame where Black's doubled c-pawns are easier to target.",
      "White has a potential protected passed pawn on the kingside.",
      "Black relies on the bishop pair to maintain equality."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Letting Black's bishops coordinate and seize control of open files",
      "Pushing kingside pawns too quickly, creating weaknesses"
    ],
    explanation: "The 5.d4 line in the Exchange Variation leads directly to a simplified endgame. By trading queens, White highlights Black's structural weaknesses. White wants to play a long-term strategic game, using their kingside majority.",
    reviewPriority: 4,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-exchange-o-o",
    parentVariation: "Exchange Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Exchange Variation with 5.O-O",
    aliases: [],
    eco: "C69",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "f6", "d4", "exd4", "Nxd4", "c5"],
    difficulty: 2,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-exchange-main"],
    continuationIds: [],
    conceptIds: ["king-safety", "pawn-structure", "piece-activity"],
    strategicIdeas: [
      "White castles first to keep more pieces on the board before playing d4.",
      "Black plays f6 to secure the e5 pawn and block White's minor pieces.",
      "White uses the knight on d4 to control central squares."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to support the d4 pawn break correctly",
      "Allowing Black's light-squared bishop to locate a strong diagonal on g4"
    ],
    explanation: "5.O-O is the main line of the Exchange Variation. White delays d4 to complete king safety, prompting Black to defend e5 with 5...f6. The resulting positions are more complex than the immediate d4 queenless lines.",
    reviewPriority: 4,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-steinitz-d4",
    parentVariation: "Steinitz Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Steinitz Defense Main Line",
    aliases: [],
    eco: "C62",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "d6", "d4", "Bd7", "Nc3", "Nf6", "O-O", "Be7"],
    difficulty: 2,
    popularity: 3,
    prerequisites: ["ruy-lopez-beginner-steinitz-main"],
    continuationIds: [],
    conceptIds: ["central-control", "development", "king-safety"],
    strategicIdeas: [
      "White supports d4 with Nc3, establishing central space dominance.",
      "Black defends solidly and prepares castling.",
      "The position remains closed, favoring White's space advantage."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Exchanging on e5 too early, releasing tension",
      "Letting Black break out of the passive setup via a clean d5 push"
    ],
    explanation: "The Steinitz main line shows classic development. White coordinates Nc3 and O-O, maintaining central tension. Black develops quietly with Nf6 and Be7. White retains a persistent space advantage.",
    reviewPriority: 3,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-schliemann-d3",
    parentVariation: "Schliemann Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Schliemann Defense Quiet 4.d3",
    aliases: [],
    eco: "C63",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "f5", "d3", "fxe4", "dxe4", "Nf6", "O-O", "d6"],
    difficulty: 3,
    popularity: 3,
    prerequisites: ["ruy-lopez-beginner-schliemann-main"],
    continuationIds: ["ruy-lopez-legend-schliemann-dyckhoff"],
    conceptIds: ["central-control", "piece-activity", "king-safety"],
    strategicIdeas: [
      "White plays d3 to keep the center solid and quiet, avoiding sharp lines.",
      "White castles and prepares to target Black's weak kingside structure.",
      "Black plays d6 to consolidate their center pawn block."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Playing too aggressively on the kingside as White before securing development",
      "Overlooking pins on the a4-e8 diagonal"
    ],
    explanation: "By playing 4.d3, White declines the sharpest gambit lines, aiming for a solid positional advantage. The center remains stable, and White relies on superior pawn structure and development to create plans.",
    reviewPriority: 3,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-classical-main",
    parentVariation: "Classical Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Classical Variation Base",
    aliases: ["Cordel Defense"],
    eco: "C64",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Bc5", "c3", "Nf6", "d4", "Bb6"],
    difficulty: 2,
    popularity: 4,
    prerequisites: [],
    continuationIds: [],
    conceptIds: ["central-control", "piece-activity", "development"],
    strategicIdeas: [
      "Black develops the bishop actively to c5, mimicking Italian lines.",
      "White uses c3 and d4 to build a strong pawn center.",
      "Black retreats the bishop to b6 to maintain the diagonal's safety."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to support the center with c3",
      "Allowing Black to get a free d5 counter-strike"
    ],
    explanation: "The Classical Variation (3...Bc5) is an active defense. White responds with the classic c3-d4 center expansion, seizing space. Black retreats to b6, keeping pressure on the e3 and d4 squares.",
    reviewPriority: 3,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-cozio-main",
    parentVariation: "Cozio Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Cozio Defense Setup",
    aliases: [],
    eco: "C60",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nge7", "Nc3", "g6", "d4", "exd4", "Nxd4", "Bg7"],
    difficulty: 2,
    popularity: 2,
    prerequisites: [],
    continuationIds: [],
    conceptIds: ["development", "fianchetto", "piece-activity"],
    strategicIdeas: [
      "Black plays Nge7 to support the c6 knight and prepare a g6-Bg7 fianchetto.",
      "White coordinates Nc3 and d4 to seize central space.",
      "Black's king bishop gets a strong diagonal on g7."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Playing too passively as White, allowing Black to equalize easily",
      "Overlooking central knight exchanges"
    ],
    explanation: "The Cozio Defense (3...Nge7) aims to avoid standard pins. Black accepts a slightly cramped position to develop the other knight. White gains early center activity by playing d4 and developing Nc3.",
    reviewPriority: 2,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  },
  {
    id: "ruy-lopez-novice-smyslov-main",
    parentVariation: "Smyslov Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Smyslov Variation Setup",
    aliases: ["Fianchetto Defense"],
    eco: "C60",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "g6", "d4", "exd4", "c3", "a6", "Ba4", "Bg7"],
    difficulty: 2,
    popularity: 3,
    prerequisites: [],
    continuationIds: [],
    conceptIds: ["fianchetto", "gambit", "central-control"],
    strategicIdeas: [
      "Black plays g6 to fianchetto the bishop without moving the e7 knight.",
      "White challenges the center immediately with d4 and c3.",
      "Black secures the dark squares on the kingside."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Refusing the c3 gambit as White, allowing Black to consolidate their pawn",
      "Misplacing the bishop on a4"
    ],
    explanation: "The Smyslov Defense (3...g6) creates a solid kingside shield. White counters with 4.d4, aiming to open the center before Black develops. The c3 gambit offers White strong piece activity.",
    reviewPriority: 3,
    estimatedStudyMinutes: 3,
    masteryXp: 20
  }
];

// Combine all lines
const beginnerCurriculum = {
  openingId: "ruy-lopez",
  tier: "Beginner",
  lines: beginnerLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

const noviceCurriculum = {
  openingId: "ruy-lopez",
  tier: "Novice",
  lines: noviceLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// 3. Intermediate Tier
const intermediateLinesRaw = [
  {
    id: "ruy-lopez-intermediate-berlin-lasker",
    parentVariation: "Berlin Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Berlin Wall Lasker Variation",
    aliases: ["Berlin Wall Endgame"],
    eco: "C67",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6", "dxe5", "Nf5", "Qxd8+", "Kxd8"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-berlin-main"],
    continuationIds: ["ruy-lopez-legend-berlin-lasker-deep"],
    conceptIds: ["endgame-transition", "king-safety", "pawn-structure"],
    strategicIdeas: [
      "White exchanges queens to exploit Black's uncasted king.",
      "Black retains the bishop pair as compensation for a compromised structure.",
      "White's kingside pawn majority is easier to create than Black's double c-pawns."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Allowing Black's light-squared bishop to dominate open lines",
      "Advancing kingside pawns too early, exposing White's own king"
    ],
    explanation: "This is the classic Berlin Wall endgame. White trades queens on d8 to disable Black's castling rights. White has a long-term pawn majority structure, while Black relies on the defensive power of the bishop pair.",
    reviewPriority: 5,
    estimatedStudyMinutes: 4,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-berlin-active",
    parentVariation: "Berlin Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Berlin Defense Active 5...Be7",
    aliases: ["Rio de Janeiro Variation"],
    eco: "C67",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Be7", "Qe2", "Nd6", "Bxc6", "bxc6", "dxe5", "Nb7"],
    difficulty: 3,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-berlin-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "development", "central-control"],
    strategicIdeas: [
      "Black develops actively with Be7, avoiding the queenless endgame.",
      "White targets the e5 extension with Qe2 and d4.",
      "Black retreats the knight to b7 to support the c5 central break."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to put pressure on the e5 square with the queen",
      "Overlooking the b7 knight maneuver"
    ],
    explanation: "The 5...Be7 variation avoids the endgame, keeping queens on the board. White regains the pawn with Qe2 and maintains central control. Black relocates the knight to b7 to target a counterattack on the queenside.",
    reviewPriority: 4,
    estimatedStudyMinutes: 3,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-berlin-4-d3",
    parentVariation: "Berlin Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Anti-Berlin with 4.d3",
    aliases: [],
    eco: "C65",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "d3", "Bc5", "Bxc6", "dxc6", "O-O", "Nd7"],
    difficulty: 2,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-berlin-main"],
    continuationIds: [],
    conceptIds: ["central-control", "development", "pawn-structure"],
    strategicIdeas: [
      "White plays 4.d3 to bypass the sharp Berlin Wall endgame entirely.",
      "White exchanges on c6 to damage Black's queenside pawns.",
      "Black relocates the knight to d7 to defend the e5 pawn."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to secure the e4 pawn when Black attacks it",
      "Overlooking the Nd7 defense maneuver"
    ],
    explanation: "The 4.d3 variation is a highly popular Anti-Berlin weapon. White keeps the game positional, bypassing deep endgame theory. By exchanging on c6 and castling, White targets a steady, risk-free advantage.",
    reviewPriority: 5,
    estimatedStudyMinutes: 3,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-arkhangelsk-main",
    parentVariation: "Arkhangelsk Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Arkhangelsk Defense Main Line",
    aliases: [],
    eco: "C78",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "b5", "Bb3", "Bb7", "Re1", "Bc5", "c3", "d6", "d4", "Bb6"],
    difficulty: 3,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["fianchetto", "piece-activity", "central-control"],
    strategicIdeas: [
      "Black fianchettos the bishop to b7, putting strong pressure on White's e4 pawn.",
      "White uses c3 and d4 to build a pawn center and block the b7 bishop.",
      "Black develops Bc5 actively to target the f2 square."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to play c3 to neutralize Black's double bishops",
      "Overlooking the tactical pressure on e4"
    ],
    explanation: "In the Arkhangelsk Variation, Black develops both bishops actively (Bb7 and Bc5) to pressure White's center. White builds a solid c3-d4 pawn shield to counter Black's active piece play.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-neo-arkhangelsk",
    parentVariation: "Neo-Arkhangelsk Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Neo-Arkhangelsk Defense",
    aliases: [],
    eco: "C78",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "b5", "Bb3", "Bc5", "a4", "Rb8", "c3", "d6", "d4", "Bb6"],
    difficulty: 3,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "central-control", "open-files"],
    strategicIdeas: [
      "Black develops Bc5 immediately before Bb7 to keep options flexible.",
      "White counters with 7.a4 to challenge Black's queenside pawns.",
      "Black plays Rb8 to secure the b-pawn and keep the file."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Allowing Black to establish a strong knight outpost on d5",
      "Allowing the a-file structure to dissolve poorly"
    ],
    explanation: "The Neo-Arkhangelsk delays Bb7, preferring immediate Bc5. White challenges Black's structure early with 7.a4. Black uses the b-file to maintain queenside balance.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-open-main",
    parentVariation: "Open Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Open Spanish Main Line",
    aliases: ["Tarrasch Variation"],
    eco: "C80",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Nxe4", "d4", "b5", "Bb3", "d5", "dxe5", "Be6", "c3", "Be7"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: ["ruy-lopez-advanced-open-dilworth", "ruy-lopez-advanced-open-9-c3"],
    conceptIds: ["piece-activity", "central-control", "development"],
    strategicIdeas: [
      "Black captures the e4 pawn to open lines and get active piece play.",
      "White plays d4 to break open the center and target the e4 knight.",
      "Black supports their center with b5 and d5, anchoring the knight."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Playing too passively as White, allowing Black to consolidate their extra space",
      "Failing to support the d4 pawn break"
    ],
    explanation: "The Open Spanish is dynamic. Black accepts a slightly loose pawn structure to activate their pieces. White must challenge Black's center immediately, aiming to exploit the e4 knight's position.",
    reviewPriority: 5,
    estimatedStudyMinutes: 4,
    masteryXp: 30
  },
  {
    id: "ruy-lopez-intermediate-closed-early-d3",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Closed Spanish Early 6.d3",
    aliases: [],
    eco: "C77",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "d3", "b5", "Bb3", "d6", "a4", "Bd7"],
    difficulty: 2,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["central-control", "development", "piece-activity"],
    strategicIdeas: [
      "White plays 6.d3 to keep the center solid and avoid deep closed theory.",
      "White uses a4 to challenge Black's queenside space.",
      "Black develops Bd7 to secure their b5 pawn and prepare castling."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Playing too quickly on the queenside, weakening White's own pawns",
      "Overlooking the light-squared bishop's safety"
    ],
    explanation: "The 6.d3 variation is a solid, positional approach. White bypasses the sharpest main lines of the Closed Spanish. White focuses on slow development and queenside pressure using the a4 pawn push.",
    reviewPriority: 4,
    estimatedStudyMinutes: 3,
    masteryXp: 30
  }
];

const intermediateCurriculum = {
  openingId: "ruy-lopez",
  tier: "Intermediate",
  lines: intermediateLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// 4. Advanced Tier
const advancedLinesRaw = [
  {
    id: "ruy-lopez-advanced-closed-chigorin",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Closed Spanish Chigorin Variation",
    aliases: [],
    eco: "C97",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Na5", "Bc2", "c5", "d4", "Qc7"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: ["ruy-lopez-master-chigorin-12-nd7"],
    conceptIds: ["central-control", "pawn-chain", "piece-activity"],
    strategicIdeas: [
      "Black plays Na5 to relocate the knight and prepare the c5 pawn push.",
      "White retreats the bishop to c2, maintaining its safety and attacking potential.",
      "White pushes d4 to challenge Black's central control."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Letting Black's knight establish a strong outpost on c4",
      "Exchanging pawns on c5 too early"
    ],
    explanation: "The Chigorin is the classic Closed Spanish main line. Black relocates the knight to a5 to challenge the bishop and free the c-pawn. White retreats the bishop to c2 and strikes in the center with d4, leading to a maneuvering battle.",
    reviewPriority: 5,
    estimatedStudyMinutes: 5,
    masteryXp: 40
  },
  {
    id: "ruy-lopez-advanced-closed-breyer",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Closed Spanish Breyer Variation",
    aliases: [],
    eco: "C95",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7", "Nbd2", "Bb7"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: ["ruy-lopez-master-breyer-12-re1"],
    conceptIds: ["piece-activity", "pawn-chain", "development"],
    strategicIdeas: [
      "Black relocates the knight to b8, aiming to redeploy it to d7 for a more flexible defense.",
      "White develops the knight to d2 and f1 to prepare a kingside transfer.",
      "Black puts pressure on e4 with the b7 bishop."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Allowing Black to equalize development cleanly",
      "Overlooking Black's light-squared bishop activity"
    ],
    explanation: "The Breyer Variation (9...Nb8) is a highly logical maneuvering system. Black redeploys the knight to d7 to free the c-pawn and support e5. White counters with the classic Spanish knight maneuver (Nb1-d2-f1-g3).",
    reviewPriority: 5,
    estimatedStudyMinutes: 5,
    masteryXp: 40
  },
  {
    id: "ruy-lopez-advanced-closed-zaitsev",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Closed Spanish Zaitsev Variation",
    aliases: [],
    eco: "C92",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Bb7", "d4", "Re8"],
    difficulty: 4,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: ["ruy-lopez-master-zaitsev-12-d5"],
    conceptIds: ["piece-activity", "central-control", "development"],
    strategicIdeas: [
      "Black plays Bb7 and Re8 to target White's e4 pawn directly.",
      "White must defend e4 while maintaining central tension.",
      "This line is highly theoretical and requires precise move orders."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to react to the pressure on e4 correctly",
      "Misplaying the bishop retreat paths"
    ],
    explanation: "The Zaitsev Variation is one of the most active systems in the Closed Spanish. Black fianchettos the bishop to b7 and coordinates Re8 to target e4. This leads to sharp, concrete tactical play in the center.",
    reviewPriority: 5,
    estimatedStudyMinutes: 5,
    masteryXp: 40
  },
  {
    id: "ruy-lopez-advanced-closed-karpov",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Closed Spanish Karpov Variation",
    aliases: [],
    eco: "C92",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nd7", "d4", "Bf6"],
    difficulty: 3,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "development", "central-control"],
    strategicIdeas: [
      "Black plays Nd7 and Bf6 to create a very solid defensive barrier in the center.",
      "White tries to open lines and exploit the slightly cramped Black layout.",
      "Black's structure is extremely resilient."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Trying to attack Black's solid shield too aggressively, creating weaknesses",
      "Neglecting the d4-e5 tension"
    ],
    explanation: "Named after Anatoly Karpov, this variation features 9...Nd7 and 10...Bf6. Black creates a rock-solid center, making it difficult for White to find clear entry points. White must play patient, positional chess to build pressure.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 40
  },
  {
    id: "ruy-lopez-advanced-open-dilworth",
    parentVariation: "Open Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Open Spanish Dilworth Variation",
    aliases: ["Dilworth Attack"],
    eco: "C82",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Nxe4", "d4", "b5", "Bb3", "d5", "dxe5", "Be6", "c3", "Be7", "Bc2", "O-O", "Qe2", "f5"],
    difficulty: 4,
    popularity: 3,
    prerequisites: ["ruy-lopez-intermediate-open-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "gambit", "tactics"],
    strategicIdeas: [
      "White coordinates Qe2 to target the e4 knight and prepare a central break.",
      "Black plays f5 to support the knight and gain space on the kingside.",
      "White retreats the bishop to c2 to clear the way for central actions."
    ],
    tacticalMotifs: ["pin"],
    commonMistakes: [
      "Allowing Black's f-pawn to roll forward unchecked",
      "Overlooking the tactical pressure on the e5 square"
    ],
    explanation: "The Dilworth Variation is a sharp line in the Open Spanish. White plays 11.Qe2 to pressure the knight. Black responds with 11...f5, leading to highly complex middlegames with dynamic chances for both sides.",
    reviewPriority: 3,
    estimatedStudyMinutes: 4,
    masteryXp: 40
  },
  {
    id: "ruy-lopez-advanced-open-9-c3",
    parentVariation: "Open Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Open Spanish 9.c3 Main Line",
    aliases: [],
    eco: "C82",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Nxe4", "d4", "b5", "Bb3", "d5", "dxe5", "Be6", "c3", "Bc5", "Nbd2", "O-O", "Bc2", "Bf5"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-intermediate-open-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "central-control", "development"],
    strategicIdeas: [
      "White plays Nbd2 to challenge the e4 knight directly.",
      "Black plays Bf5 to support the knight and maintain the strong point.",
      "White retreats the bishop to c2 to prepare central expansion."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Exchanging on e4 at the wrong moment, freeing Black's light-squared bishop",
      "Overlooking tactical pin refutations on the c-file"
    ],
    explanation: "This is the classic main line of the Open Spanish. White plays 9.c3 and 10.Nbd2 to challenge Black's central knight. Black defends actively with Bf5, leading to rich, strategic positions.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 40
  }
];

const advancedCurriculum = {
  openingId: "ruy-lopez",
  tier: "Advanced",
  lines: advancedLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// 5. Expert Tier
const expertLinesRaw = [
  {
    id: "ruy-lopez-expert-marshall-main",
    parentVariation: "Marshall Attack",
    openingFamily: "Ruy Lopez",
    variationName: "Marshall Attack Main Setup",
    aliases: ["Marshall Gambit"],
    eco: "C89",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "c3", "d5", "exd5", "Nxd5", "Nxe5", "Nxe5", "Rxe5", "c6"],
    difficulty: 4,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: ["ruy-lopez-expert-marshall-d3"],
    conceptIds: ["gambit", "tactics", "piece-activity"],
    strategicIdeas: [
      "Black sacrifices a pawn with 8...d5 to gain a strong kingside initiative.",
      "White must defend carefully against Black's active piece coordination.",
      "White retains the extra pawn as long-term compensation if they survive the attack."
    ],
    tacticalMotifs: ["double-attack"],
    commonMistakes: [
      "Failing to identify kingside mate threats",
      "Returning the pawn at the wrong moment"
    ],
    explanation: "The Marshall Attack is one of the most feared weapons against the Ruy Lopez. Black sacrifices a pawn for rapid development and attacking chances on the kingside. White must accept the challenge and play highly accurate defense.",
    reviewPriority: 5,
    estimatedStudyMinutes: 5,
    masteryXp: 50
  },
  {
    id: "ruy-lopez-expert-marshall-d3",
    parentVariation: "Marshall Attack",
    openingFamily: "Ruy Lopez",
    variationName: "Marshall Attack 12.d3 Line",
    aliases: [],
    eco: "C89",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "c3", "d5", "exd5", "Nxd5", "Nxe5", "Nxe5", "Rxe5", "c6", "d3", "Bd6", "Re1", "Bf5"],
    difficulty: 4,
    popularity: 5,
    prerequisites: ["ruy-lopez-expert-marshall-main"],
    continuationIds: [],
    conceptIds: ["gambit", "tactics", "king-safety"],
    strategicIdeas: [
      "White plays d3 to keep the center solid and restrict Black's dark-squared bishop.",
      "Black develops Bf5 actively to target the d3 pawn.",
      "White must prepare to consolidate their kingside defense."
    ],
    tacticalMotifs: ["pin"],
    commonMistakes: [
      "Failing to support the d3 pawn with Nd2",
      "Overlooking the threat of Bf5-g4"
    ],
    explanation: "The 12.d3 variation is a highly theoretical defensive line for White in the Marshall. White limits Black's bishop activity and seeks to develop minor pieces safely. Precise play is required to maintain the pawn advantage.",
    reviewPriority: 5,
    estimatedStudyMinutes: 5,
    masteryXp: 50
  },
  {
    id: "ruy-lopez-expert-anti-marshall-8-a4",
    parentVariation: "Anti-Marshall",
    openingFamily: "Ruy Lopez",
    variationName: "Anti-Marshall with 8.a4",
    aliases: [],
    eco: "C88",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "a4", "Bb7", "d3", "d6"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["piece-activity", "central-control", "open-files"],
    strategicIdeas: [
      "White plays 8.a4 to bypass the Marshall Attack completely.",
      "White challenges Black's queenside pawns early.",
      "Black plays Bb7 to maintain the active diagonal."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to react to Black's b4 push",
      "Allowing Black's light-squared bishop to dominate the long diagonal"
    ],
    explanation: "The Anti-Marshall with 8.a4 is a highly popular positional choice. White bypasses the deep gambit lines of the Marshall, keeping the game in strategic territory. The focus shifts to queenside pawn tension and center control.",
    reviewPriority: 5,
    estimatedStudyMinutes: 4,
    masteryXp: 50
  },
  {
    id: "ruy-lopez-expert-anti-marshall-8-h3",
    parentVariation: "Anti-Marshall",
    openingFamily: "Ruy Lopez",
    variationName: "Anti-Marshall with 8.h3",
    aliases: [],
    eco: "C88",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "h3", "Bb7", "d3", "d6"],
    difficulty: 3,
    popularity: 5,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["central-control", "development", "king-safety"],
    strategicIdeas: [
      "White plays 8.h3 to prevent Bg4 pins and bypass the Marshall.",
      "White keeps options open for central breaks.",
      "Black develops Bb7 to target the e4 square."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Overlooking the tactical e4 pressure",
      "Playing too passively, allowing Black to take the initiative"
    ],
    explanation: "8.h3 is another solid Anti-Marshall weapon. White prevents kingside pins and bypasses the main Marshall gambits. The resulting positions are maneuvering battles where White retains a slight edge.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 50
  },
  {
    id: "ruy-lopez-expert-anti-marshall-8-d4",
    parentVariation: "Anti-Marshall",
    openingFamily: "Ruy Lopez",
    variationName: "Anti-Marshall with 8.d4",
    aliases: [],
    eco: "C88",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "O-O", "d4", "d6", "c3", "Bg4"],
    difficulty: 3,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["central-control", "piece-activity", "development"],
    strategicIdeas: [
      "White strikes immediately in the center with 8.d4.",
      "Black plays Bg4 to pin the f3 knight and pressure the center.",
      "White maintains the center with c3."
    ],
    tacticalMotifs: ["pin"],
    commonMistakes: [
      "Exchanging on e5 at the wrong moment, releasing the pressure",
      "Overlooking the pins on the d-file"
    ],
    explanation: "The 8.d4 Anti-Marshall is direct. White challenges the center immediately. Black pin-attacks with Bg4 to target White's d4 pawn. This leads to heavy, strategic middlegames where White maintains a space advantage.",
    reviewPriority: 4,
    estimatedStudyMinutes: 4,
    masteryXp: 50
  }
];

const expertCurriculum = {
  openingId: "ruy-lopez",
  tier: "Expert",
  lines: expertLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// 6. Master Tier
const masterLinesRaw = [
  {
    id: "ruy-lopez-master-chigorin-12-nd7",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Chigorin Variation 12...Nd7 Line",
    aliases: [],
    eco: "C97",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Na5", "Bc2", "c5", "d4", "Qc7", "Nbd2", "Nd7", "d5", "c4"],
    difficulty: 4,
    popularity: 4,
    prerequisites: ["ruy-lopez-advanced-closed-chigorin"],
    continuationIds: [],
    conceptIds: ["pawn-chain", "piece-activity", "development"],
    strategicIdeas: [
      "Black relocates the knight to d7 to free the c-pawn and prepare a queenside storm.",
      "White closes the center with d5 to restrict Black's space.",
      "Black plays c4 to gain queenside space."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to react to Black's queenside space gains",
      "Letting White's kingside attack run unchecked"
    ],
    explanation: "This deep Chigorin line features 12...Nd7. White closes the center with 13.d5, setting up a classic pawn chain structure. The game resolves into a battle where White attacks on the kingside and Black seeks counterplay on the queenside.",
    reviewPriority: 4,
    estimatedStudyMinutes: 5,
    masteryXp: 60
  },
  {
    id: "ruy-lopez-master-breyer-12-re1",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Breyer Variation Deep 12...Re8 Line",
    aliases: [],
    eco: "C95",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Nb8", "d4", "Nbd7", "Nbd2", "Bb7", "Bc2", "Re8", "Nf1", "Bf8", "Ng3", "g6"],
    difficulty: 4,
    popularity: 5,
    prerequisites: ["ruy-lopez-advanced-closed-breyer"],
    continuationIds: [],
    conceptIds: ["piece-activity", "pawn-chain", "king-safety"],
    strategicIdeas: [
      "Black coordinates Re8 and Bf8 to create a solid kingside defense.",
      "White completes the knight relocation to g3 to target the kingside.",
      "Black plays g6 to secure the h7/f7 squares."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to organize the knight maneuver correctly",
      "Creating weaknesses in the kingside pawn structure"
    ],
    explanation: "This is the deep main line of the Breyer. White coordinates Bc2 and Nf1-g3, preparing a kingside attack. Black coordinates Re8 and Bf8 to establish a highly resilient defensive setup, looking for central breaks.",
    reviewPriority: 5,
    estimatedStudyMinutes: 6,
    masteryXp: 60
  },
  {
    id: "ruy-lopez-master-zaitsev-12-d5",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Zaitsev Variation Deep 12.a4 Line",
    aliases: [],
    eco: "C92",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "h3", "Bb7", "d4", "Re8", "Nbd2", "Bf8", "a4", "h6", "Bc2", "exd4", "cxd4", "Nb4", "Bb1", "c5"],
    difficulty: 5,
    popularity: 5,
    prerequisites: ["ruy-lopez-advanced-closed-zaitsev"],
    continuationIds: [],
    conceptIds: ["piece-activity", "central-control", "open-files"],
    strategicIdeas: [
      "White plays a4 to challenge Black's queenside space.",
      "Black exchanges on d4 and plays Nb4 to target White's e4/d4 positions.",
      "White retreats the bishop to b1 to keep it active."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Failing to support the d4 pawn break correctly",
      "Allowing Black's knight to dominate the b4 outpost"
    ],
    explanation: "The deep Zaitsev main line is extremely complex. White plays a4 to challenge the queenside. Black counters with exd4 and Nb4, attacking the e4 pawn. White must keep their bishops safe and organize a slow kingside attack.",
    reviewPriority: 5,
    estimatedStudyMinutes: 6,
    masteryXp: 60
  },
  {
    id: "ruy-lopez-master-geller-closed",
    parentVariation: "Closed Spanish",
    openingFamily: "Ruy Lopez",
    variationName: "Geller Variation with 9.d4 Bg4",
    aliases: [],
    eco: "C88",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Ba4", "Nf6", "O-O", "Be7", "Re1", "b5", "Bb3", "d6", "c3", "O-O", "d4", "Bg4", "d5", "Na5", "Bc2", "c6"],
    difficulty: 4,
    popularity: 4,
    prerequisites: ["ruy-lopez-beginner-morphy-main"],
    continuationIds: [],
    conceptIds: ["pin", "central-control", "piece-activity"],
    strategicIdeas: [
      "White plays d4 immediately, challenging Black to pin the knight with Bg4.",
      "White closes the center with d5 to restrict Black's knight.",
      "Black plays c6 to break White's central pawn chain."
    ],
    tacticalMotifs: ["pin"],
    commonMistakes: [
      "Failing to secure the d5 pawn with c4",
      "Overlooking tactical pins on the kingside"
    ],
    explanation: "In the Geller Variation, White strikes early with 9.d4. Black responds with 9...Bg4, pinning the knight. White closes the center with 10.d5 and retreats the bishop to c2. Black must counter with 11...c6 to challenge White's space.",
    reviewPriority: 4,
    estimatedStudyMinutes: 5,
    masteryXp: 60
  }
];

const masterCurriculum = {
  openingId: "ruy-lopez",
  tier: "Master",
  lines: masterLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// 7. Legend Tier
const legendLinesRaw = [
  {
    id: "ruy-lopez-legend-schliemann-dyckhoff",
    parentVariation: "Schliemann Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Schliemann Defense Dyckhoff Variation",
    aliases: [],
    eco: "C63",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "f5", "d3", "fxe4", "dxe4", "Nf6", "O-O", "Bc5", "Bxc6", "bxc6", "Nxe5", "O-O", "Bg5", "Qe8", "Bxf6", "Rxf6", "Nd3", "Bd4"],
    difficulty: 5,
    popularity: 3,
    prerequisites: ["ruy-lopez-novice-schliemann-d3"],
    continuationIds: [],
    conceptIds: ["gambit", "tactics", "piece-activity"],
    strategicIdeas: [
      "White captures on c6 to double Black's c-pawns.",
      "White wins the e5 pawn, but Black gains the bishop pair and open files.",
      "Black plays Bd4 to maintain a strong central presence."
    ],
    tacticalMotifs: ["double-attack"],
    commonMistakes: [
      "Failing to defend against Black's active rook play on the f-file",
      "Overlooking the tactical pressure on the e4 pawn"
    ],
    explanation: "The Dyckhoff is a deep, concrete line in the Schliemann. White accepts the challenge, winning a pawn but giving up the bishop pair. Black coordinates Bd4 and Rf6 to build an aggressive kingside counter-strike.",
    reviewPriority: 3,
    estimatedStudyMinutes: 5,
    masteryXp: 80
  },
  {
    id: "ruy-lopez-legend-berlin-lasker-deep",
    parentVariation: "Berlin Defense",
    openingFamily: "Ruy Lopez",
    variationName: "Berlin Wall Deep Theoretical Main Line",
    aliases: [],
    eco: "C67",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "Nf6", "O-O", "Nxe4", "d4", "Nd6", "Bxc6", "dxc6", "dxe5", "Nf5", "Qxd8+", "Kxd8", "Nc3", "Ke8", "h3", "h5", "Bf4", "Be7", "Rad1", "Be6"],
    difficulty: 5,
    popularity: 5,
    prerequisites: ["ruy-lopez-intermediate-berlin-lasker"],
    continuationIds: [],
    conceptIds: ["endgame-transition", "king-safety", "pawn-structure"],
    strategicIdeas: [
      "White coordinates Bf4 and Rad1 to build pressure on the d-file.",
      "Black plays Be6 to support their pawn structure.",
      "White uses h3 and g4 to gain space on the kingside."
    ],
    tacticalMotifs: [],
    commonMistakes: [
      "Allowing Black's bishop pair to coordinate on open diagonals",
      "Advancing kingside pawns too aggressively, creating weaknesses"
    ],
    explanation: "This is the absolute main line of the Berlin Wall endgame. White coordinates Nc3, Ke8, h3, h5, and Bf4. The position requires deep positional understanding of king safety, bishop pair mobility, and pawn endgames.",
    reviewPriority: 5,
    estimatedStudyMinutes: 6,
    masteryXp: 80
  },
  {
    id: "ruy-lopez-legend-exchange-alapin",
    parentVariation: "Exchange Variation",
    openingFamily: "Ruy Lopez",
    variationName: "Exchange Variation Alapin Gambit",
    aliases: [],
    eco: "C69",
    moves: ["e4", "e5", "Nf3", "Nc6", "Bb5", "a6", "Bxc6", "dxc6", "O-O", "Qd6", "Na3", "b5", "c3", "f6", "d4", "Bg4"],
    difficulty: 4,
    popularity: 3,
    prerequisites: ["ruy-lopez-beginner-exchange-main"],
    continuationIds: [],
    conceptIds: ["gambit", "pin", "piece-activity"],
    strategicIdeas: [
      "Black plays Qd6 to support the e5 pawn and prepare queenside castling.",
      "White plays Na3 and c3 to challenge Black's queenside space.",
      "Black pins the knight with Bg4."
    ],
    tacticalMotifs: ["pin"],
    commonMistakes: [
      "Failing to support the center with c3",
      "Overlooking the tactical counter-strikes on the d-file"
    ],
    explanation: "In this Alapin line of the Exchange Variation, Black plays 5...Qd6. White responds with 6.Na3 to relocate the knight, and 7.c3 to build a center. Black coordinates Bg4 and f6 to pressure White's d4 pawn.",
    reviewPriority: 4,
    estimatedStudyMinutes: 5,
    masteryXp: 80
  }
];

const legendCurriculum = {
  openingId: "ruy-lopez",
  tier: "Legend",
  lines: legendLinesRaw.map(line => {
    const data = computeChessData(line.moves);
    delete line.moves;
    return { ...line, ...data };
  })
};

// Write out files
fs.writeFileSync(path.join(outputDir, 'beginner.json'), JSON.stringify(beginnerCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'novice.json'), JSON.stringify(noviceCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'intermediate.json'), JSON.stringify(intermediateCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'advanced.json'), JSON.stringify(advancedCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'expert.json'), JSON.stringify(expertCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'master.json'), JSON.stringify(masterCurriculum, null, 2));
fs.writeFileSync(path.join(outputDir, 'legend.json'), JSON.stringify(legendCurriculum, null, 2));

console.log("Ruy Lopez curriculum successfully generated!");
