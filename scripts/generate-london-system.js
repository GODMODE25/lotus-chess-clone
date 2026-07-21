/**
 * Generator for the London System (White) opening course.
 *
 * Produces data/openings/white/london-system/ with:
 *   - metadata.json
 *   - beginner.json, novice.json, intermediate.json, advanced.json,
 *     expert.json, master.json, legend.json
 *
 * Every FEN / PGN / UCI is derived from chess.js so move legality is guaranteed.
 * Theory source: standard mainline London System (Chess.com / Chessable databases).
 */
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const OPENING_FAMILY = 'London System';
const COLOUR = 'white';
const SLUG = 'london-system';
const OUT_DIR = path.join(__dirname, '..', 'data', 'openings', 'white', SLUG);

const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

function buildLine({
    id,
    parentVariation,
    variationName,
    aliases = [],
    eco,
    sanMoves,
    prerequisites = [],
    continuationIds = [],
    conceptIds,
    strategicIdeas,
    tacticalMotifs = [],
    commonMistakes,
    explanation,
    reviewPriority,
    estimatedStudyMinutes,
    masteryXp,
    difficulty,
    popularity,
}) {
    const chess = new Chess();
    const uciMoves = [];
    const sanPlayed = [];
    for (const move of sanMoves) {
        const result = chess.move(move);
        if (!result) {
            throw new Error(`Invalid move "${move}" in line ${id}`);
        }
        uciMoves.push(`${result.from}${result.to}${result.promotion || ''}`);
        sanPlayed.push(result.san);
    }

    // Build a clean PGN string with move numbers.
    let pgn = '';
    let moveNum = 1;
    for (let i = 0; i < sanPlayed.length; i++) {
        if (i % 2 === 0) pgn += `${moveNum}. `;
        pgn += `${sanPlayed[i]} `;
        if (i % 2 === 1) moveNum++;
    }
    pgn = pgn.trim();

    return {
        id,
        parentVariation,
        openingFamily: OPENING_FAMILY,
        variationName,
        aliases,
        eco,
        pgn,
        sanMoves,
        uciMoves,
        startingFen: chess.fen(),
        moveDepth: sanMoves.length,
        difficulty,
        popularity,
        prerequisites,
        continuationIds,
        conceptIds,
        strategicIdeas,
        tacticalMotifs,
        commonMistakes,
        explanation,
        reviewPriority,
        estimatedStudyMinutes,
        masteryXp,
    };
}

// ---------------------------------------------------------------------------
// Tier definitions
// ---------------------------------------------------------------------------
const tiers = {
    beginner: {
        tier: 'Beginner',
        lines: [
            buildLine({
                id: 'london-beginner-setup',
                parentVariation: 'London System',
                variationName: 'London System Setup',
                aliases: ['London Setup'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3'],
                prerequisites: [],
                continuationIds: ['london-novice-classical'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White builds the solid London pawn structure with Bf4.',
                    'The bishop on f4 is safe and supports a future e3-e4 break.',
                    'Development is straightforward and low-risk.'
                ],
                commonMistakes: [
                    'Moving the same piece twice in the opening',
                    'Neglecting king safety by delaying castling'
                ],
                explanation: 'The London System begins with 1.d4 d5 2.Nf3 Nf6 3.Bf4, a rock-solid setup. White aims for steady development and a safe king. This is an ideal first opening to learn.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 5,
            }),
            buildLine({
                id: 'london-beginner-vs-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6',
                aliases: ['London e6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3'],
                prerequisites: [],
                continuationIds: ['london-novice-vs-e6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black supports the d5 pawn with ...e6.',
                    'White continues with the standard London setup.',
                    'The position remains calm and positional.'
                ],
                commonMistakes: [
                    'Rushing the c4 break before completing development',
                    'Placing the bishop where it can be hit by ...Bb4+'
                ],
                explanation: 'After 3...e6 White plays 4.e3, completing the core London structure. Black has few active tries and the game stays positional.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 4,
            }),
            buildLine({
                id: 'london-beginner-vs-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6',
                aliases: ['London c6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3'],
                prerequisites: [],
                continuationIds: ['london-novice-vs-c6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black prepares ...Bf5 and a solid Slav-like setup.',
                    'White keeps the standard London development.',
                    'The structure is symmetrical and easy to handle.'
                ],
                commonMistakes: [
                    'Allowing ...Bxf4 to damage the bishop pair prematurely',
                    'Forgetting to develop the queenside knight'
                ],
                explanation: 'After 3...c6 White plays 4.e3. Black often follows with ...Bf5. The London handles this setup comfortably.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 3,
            }),
            buildLine({
                id: 'london-beginner-vs-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6',
                aliases: ['London g6', 'London KID-style'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3'],
                prerequisites: [],
                continuationIds: ['london-novice-vs-g6'],
                conceptIds: ['pawn-structure', 'development', 'fianchetto'],
                strategicIdeas: [
                    'Black fianchettoes with ...g6 and ...Bg7.',
                    'White meets it with the normal London setup.',
                    'The bishop on f4 eyes the c7 square.'
                ],
                commonMistakes: [
                    'Castling into a kingside pawn storm too early',
                    'Underestimating Black\'s piece activity from the fianchetto'
                ],
                explanation: 'After 3...g6 White plays 4.e3, ready to meet ...Bg7 with Bd3. The London is flexible against King\'s-Indian-style setups.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 3,
            }),
            buildLine({
                id: 'london-beginner-vs-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5',
                aliases: ['London Bf5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3'],
                prerequisites: [],
                continuationIds: ['london-novice-vs-Bf5'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black develops the bishop actively to f5.',
                    'White continues with e3 and Bd3.',
                    'The bishops may be traded on d3.'
                ],
                commonMistakes: [
                    'Giving up the bishop pair without a plan',
                    'Developing the queen too early'
                ],
                explanation: 'After 3...Bf5 White plays 4.e3. The bishop on f5 can be challenged by Bd3, leading to early piece trades.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 4,
            }),
        ],
    },

    novice: {
        tier: 'Novice',
        lines: [
            buildLine({
                id: 'london-novice-classical',
                parentVariation: 'London System',
                variationName: 'London Classical vs 3...c5',
                aliases: ['London c5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3'],
                prerequisites: ['london-beginner-setup'],
                continuationIds: ['london-intermediate-main-c5'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White completes the setup with Bd3.',
                    'The bishop on d3 supports a future e4 break.',
                    'Development proceeds smoothly.'
                ],
                commonMistakes: [
                    'Playing c4 too early and weakening d4',
                    'Blocking the f4 bishop with a premature e4'
                ],
                explanation: 'The Classical London vs 3...c5 continues 4.e3 Nc6 5.Bd3. White has a clear, repeatable development scheme.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 5,
            }),
            buildLine({
                id: 'london-novice-vs-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Bd6 line)',
                aliases: ['London e6 Bd6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6'],
                prerequisites: ['london-beginner-vs-e6'],
                continuationIds: ['london-intermediate-vs-e6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black challenges the f4 bishop with ...Bd6.',
                    'White trades bishops, simplifying the position.',
                    'The bishop pair is conceded but the structure is solid.'
                ],
                commonMistakes: [
                    'Recapturing with the queen when the bishop is fine',
                    'Allowing ...Bxf4 to double White\'s pawns'
                ],
                explanation: 'After 4.e3 Bd6 White trades with 5.Bxd6. This is a common, harmless line where White keeps a small space edge.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'london-novice-vs-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Bf5 line)',
                aliases: ['London c6 Bf5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3'],
                prerequisites: ['london-beginner-vs-c6'],
                continuationIds: ['london-intermediate-vs-c6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black develops the bishop to f5.',
                    'White challenges it with Bd3.',
                    'A trade on d3 is likely.'
                ],
                commonMistakes: [
                    'Developing the knight to a passive square',
                    'Missing the ...Bxd3 queen recapture'
                ],
                explanation: 'After 4.e3 Bf5 White plays 5.Bd3, offering a trade. The resulting positions are easy to play for White.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'london-novice-vs-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (Bg7 line)',
                aliases: ['London g6 Bg7'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3'],
                prerequisites: ['london-beginner-vs-g6'],
                continuationIds: ['london-intermediate-vs-g6'],
                conceptIds: ['pawn-structure', 'development', 'fianchetto'],
                strategicIdeas: [
                    'Black fianchettoes the bishop on g7.',
                    'White develops Bd3, controlling the b1-h7 diagonal.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...Ne4 to plant a knight in the centre',
                    'Castling kingside into a future pawn storm'
                ],
                explanation: 'After 4.e3 Bg7 White plays 5.Bd3. Both sides complete development calmly.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'london-novice-vs-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (e6 line)',
                aliases: ['London Bf5 e6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3'],
                prerequisites: ['london-beginner-vs-Bf5'],
                continuationIds: ['london-intermediate-vs-Bf5'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black supports the centre with ...e6.',
                    'White challenges the f5 bishop with Bd3.',
                    'A trade on d3 simplifies.'
                ],
                commonMistakes: [
                    'Keeping bishops on when a trade favours Black',
                    'Developing pieces to passive squares'
                ],
                explanation: 'After 4.e3 e6 White plays 5.Bd3, offering to trade the light-squared bishops.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'london-novice-vs-Nc6',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6',
                aliases: ['London Nc6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3'],
                prerequisites: [],
                continuationIds: ['london-intermediate-vs-Nc6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the knight to c6.',
                    'White continues the standard setup.',
                    'The position is symmetrical and safe.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Developing the queen before minor pieces'
                ],
                explanation: 'After 3...Nc6 White plays 4.e3 Bf5 5.Bd3, reaching a typical London structure.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'london-novice-vs-Be7',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7 line)',
                aliases: ['London e6 Be7'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3'],
                prerequisites: ['london-beginner-vs-e6'],
                continuationIds: ['london-intermediate-vs-Be7'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the bishop to e7.',
                    'White plays Bd3, keeping the bishop.',
                    'The setup is solid for both sides.'
                ],
                commonMistakes: [
                    'Trading the good f4 bishop unnecessarily',
                    'Delaying castling'
                ],
                explanation: 'After 4.e3 Be7 White plays 5.Bd3. This is a flexible, robust line for both colours.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'london-novice-vs-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6 line)',
                aliases: ['London c5 Qb6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3'],
                prerequisites: ['london-beginner-setup'],
                continuationIds: ['london-intermediate-vs-c5-Qb6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'Black\'s queen eyes b2 and d4 from b6.',
                    'White develops the knight to c3, defending d5 and b5.',
                    'The queen sortie is easily met.'
                ],
                commonMistakes: [
                    'Allowing ...Qxb2 to win a pawn',
                    'Developing the bishop to a square hit by the queen'
                ],
                explanation: 'After 4.e3 Qb6 White plays 5.Nc3, defending against ...Qxb2. The London handles the early queen sortie comfortably.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 25,
                difficulty: 2,
                popularity: 4,
            }),
        ],
    },

    intermediate: {
        tier: 'Intermediate',
        lines: [
            buildLine({
                id: 'london-intermediate-main-c5',
                parentVariation: 'London System',
                variationName: 'London Main vs 3...c5 (Bg4 line)',
                aliases: ['London c5 Bg4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2'],
                prerequisites: ['london-novice-classical'],
                continuationIds: ['london-advanced-c5-main'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black pins the f3 knight with ...Bg4.',
                    'White develops Nbd2, keeping the structure intact.',
                    'The position is balanced and positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly with h3 too early',
                    'Allowing ...Bxf3 to damage the pawn structure'
                ],
                explanation: 'The Main London vs 3...c5 continues 5.Bd3 Bg4 6.Nbd2. White calmly completes development and prepares to castle.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 5,
            }),
            buildLine({
                id: 'london-intermediate-vs-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Bd6 trade)',
                aliases: ['London e6 Bd6 trade'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6', 'Qxd6', 'Nbd2'],
                prerequisites: ['london-novice-vs-e6'],
                continuationIds: ['london-advanced-e6-main'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades the bishops and develops the knight.',
                    'The queen on d6 is slightly exposed.',
                    'White has a small space edge.'
                ],
                commonMistakes: [
                    'Developing the knight to d2 before trading bishops',
                    'Underestimating Black\'s central control'
                ],
                explanation: 'After 5.Bxd6 Qxd6 6.Nbd2 White has a clean position. The early trade simplifies and White keeps a tiny initiative.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'london-intermediate-vs-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Bf5 trade)',
                aliases: ['London c6 Bf5 trade'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3', 'Bxd3', 'Qxd3'],
                prerequisites: ['london-novice-vs-c6'],
                continuationIds: ['london-advanced-c6-main'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'The light-squared bishops are traded.',
                    'White\'s queen sits actively on d3.',
                    'The structure is symmetrical and safe.'
                ],
                commonMistakes: [
                    'Recapturing with the pawn instead of the queen',
                    'Developing pieces passively'
                ],
                explanation: 'After 5.Bd3 Bxd3 6.Qxd3 White has an active queen and a comfortable position. The London is at its simplest here.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'london-intermediate-vs-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (castling line)',
                aliases: ['London g6 castling'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: ['london-novice-vs-g6'],
                continuationIds: ['london-advanced-g6-main'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'Both sides castle kingside.',
                    'White has a solid, safe structure.',
                    'The middlegame is calm.'
                ],
                commonMistakes: [
                    'Launching a premature kingside attack',
                    'Neglecting the c4 break for activity'
                ],
                explanation: 'After 5.Bd3 O-O 6.O-O both kings are safe. White can later choose between c4 and a queenside expansion.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'london-intermediate-vs-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (trade line)',
                aliases: ['London Bf5 trade'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3', 'Bxd3', 'Qxd3'],
                prerequisites: ['london-novice-vs-Bf5'],
                continuationIds: ['london-advanced-Bf5-main'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'The light-squared bishops are traded.',
                    'White\'s queen is active on d3.',
                    'The position is easy to play.'
                ],
                commonMistakes: [
                    'Keeping the bishop when a trade is favourable',
                    'Developing the knight to a passive square'
                ],
                explanation: 'After 5.Bd3 Bxd3 6.Qxd3 White enjoys a harmonious position with the bishop pair gone but a clear plan.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'london-intermediate-vs-Nc6',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6 (Bf5 line)',
                aliases: ['London Nc6 Bf5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3', 'e6', 'O-O'],
                prerequisites: ['london-novice-vs-Nc6'],
                continuationIds: ['london-advanced-Nc6-main'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White challenges the f5 bishop and castles.',
                    'The structure is solid and balanced.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing ...Bxd3 to disrupt the queen'
                ],
                explanation: 'After 5.Bd3 e6 6.O-O White is fully developed and safe. The London is at its most reliable here.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'london-intermediate-vs-Be7',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7 castling)',
                aliases: ['London e6 Be7 castling'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: ['london-novice-vs-Be7'],
                continuationIds: ['london-advanced-Be7-main'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'Both sides castle kingside.',
                    'White keeps the bishop on d3.',
                    'The middlegame is positional.'
                ],
                commonMistakes: [
                    'Trading the good bishop unnecessarily',
                    'Rushing the c4 break'
                ],
                explanation: 'After 5.Bd3 O-O 6.O-O both kings are safe. White can later expand with c4 or prepare the e4 break.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'london-intermediate-vs-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6 Nc6)',
                aliases: ['London c5 Qb6 Nc6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3', 'Nc6', 'Bd3'],
                prerequisites: ['london-novice-vs-c5-Qb6'],
                continuationIds: ['london-advanced-c5-Qb6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White completes development with Bd3.',
                    'The queen on b6 is slightly offside.',
                    'White has a comfortable setup.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to gain space',
                    'Developing the bishop to a passive square'
                ],
                explanation: 'After 5.Nc3 Nc6 6.Bd3 White is well developed. The early queen sortie by Black is harmless.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'london-intermediate-vs-c5-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (e6 line)',
                aliases: ['London c5 e6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'e6', 'Bd3', 'Nc6', 'Nbd2'],
                prerequisites: ['london-novice-classical'],
                continuationIds: ['london-advanced-c5-e6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black supports the centre with ...e6.',
                    'White develops naturally with Nbd2.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Developing the queen too early'
                ],
                explanation: 'After 5.Bd3 Nc6 6.Nbd2 White has a clean London setup against the ...c5/...e6 complex.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'london-intermediate-vs-b6',
                parentVariation: 'London System',
                variationName: 'London vs 3...b6 (Queenside Fianchetto)',
                aliases: ['London b6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'b6', 'e3', 'Bb7', 'Bd3', 'c5', 'c3'],
                prerequisites: [],
                continuationIds: ['london-advanced-b6'],
                conceptIds: ['pawn-structure', 'development', 'fianchetto'],
                strategicIdeas: [
                    'Black fianchettoes the queen bishop.',
                    'White supports the centre with c3.',
                    'The position is solid for both sides.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to gain queenside space',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.e3 Bb7 5.Bd3 c5 6.c3 White supports d4 and prepares Nbd2. The London handles the fianchetto comfortably.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 3,
                popularity: 3,
            }),
        ],
    },

    advanced: {
        tier: 'Advanced',
        lines: [
            buildLine({
                id: 'london-advanced-c5-main',
                parentVariation: 'London System',
                variationName: 'London Main vs 3...c5 (full development)',
                aliases: ['London c5 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'e6', 'O-O'],
                prerequisites: ['london-intermediate-main-c5'],
                continuationIds: ['london-expert-c5'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White castles and completes development.',
                    'The pin on f3 is harmless after Nbd2.',
                    'White has a stable, safe position.'
                ],
                commonMistakes: [
                    'Breaking the pin with h3 and weakening the kingside',
                    'Allowing ...c4 to gain space'
                ],
                explanation: 'After 6.Nbd2 e6 7.O-O White is fully developed. The London main line vs 3...c5 is a model of solid opening play.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 5,
            }),
            buildLine({
                id: 'london-advanced-e6-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Bd6 trade, castling)',
                aliases: ['London e6 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6', 'Qxd6', 'Bd3', 'O-O', 'Nbd2', 'Nbd7', 'O-O'],
                prerequisites: ['london-intermediate-vs-e6'],
                continuationIds: ['london-expert-e6'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'Both sides castle kingside.',
                    'White has a small space edge.',
                    'The position is calm and positional.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Underestimating Black\'s central control'
                ],
                explanation: 'After 6.Bd3 O-O 7.Nbd2 Nbd7 8.O-O White is fully developed with a tiny initiative. The early bishop trade favours the side with more space.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'london-advanced-c6-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Bf5 trade, Nbd7)',
                aliases: ['London c6 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3', 'Bxd3', 'Qxd3', 'Nbd7', 'O-O'],
                prerequisites: ['london-intermediate-vs-c6'],
                continuationIds: ['london-expert-c6'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White castles after the bishop trade.',
                    'The queen is active on d3.',
                    'The structure is symmetrical and safe.'
                ],
                commonMistakes: [
                    'Developing the knight to a passive square',
                    'Allowing ...Ne4 to plant a knight'
                ],
                explanation: 'After 6.Qxd3 Nbd7 7.O-O White is comfortably developed. The London vs the Slav setup is among its easiest lines.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-g6-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (c5 / c3 plan)',
                aliases: ['London g6 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3', 'O-O', 'O-O', 'c5', 'c3'],
                prerequisites: ['london-intermediate-vs-g6'],
                continuationIds: ['london-expert-g6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White supports the centre with c3.',
                    'The structure is solid and flexible.',
                    'White can later aim for c4 or e4.'
                ],
                commonMistakes: [
                    'Launching a premature kingside attack',
                    'Neglecting the queenside'
                ],
                explanation: 'After 6.O-O c5 7.c3 White supports d4 and keeps a flexible structure. The London vs the King\'s-Indian-style setup is reliable.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-Bf5-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (trade, Bd6)',
                aliases: ['London Bf5 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3', 'Bxd3', 'Qxd3', 'Bd6', 'O-O'],
                prerequisites: ['london-intermediate-vs-Bf5'],
                continuationIds: ['london-expert-Bf5'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White castles after the bishop trade.',
                    'The queen is active on d3.',
                    'The position is easy to play.'
                ],
                commonMistakes: [
                    'Keeping the bishop when a trade is favourable',
                    'Developing pieces passively'
                ],
                explanation: 'After 6.Qxd3 Bd6 7.O-O White is fully developed. The London vs the early ...Bf5 is simple and safe.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'london-advanced-Nc6-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6 (Bd6 / Nbd2)',
                aliases: ['London Nc6 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3', 'e6', 'O-O', 'Bd6', 'Nbd2'],
                prerequisites: ['london-intermediate-vs-Nc6'],
                continuationIds: ['london-expert-Nc6'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White develops the knight to d2.',
                    'The structure is solid and balanced.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing ...Bxf3 to damage the structure'
                ],
                explanation: 'After 6.O-O Bd6 7.Nbd2 White is fully developed. The London vs 3...Nc6 is a robust, low-risk line.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-Be7-main',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7, Ne5)',
                aliases: ['London e6 Be7 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Nbd7', 'Ne5'],
                prerequisites: ['london-intermediate-vs-Be7'],
                continuationIds: ['london-expert-Be7'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on the strong e5 outpost.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 6.O-O Nbd7 7.Ne5 White seizes the e5 outpost. This is a typical London plan that gives White a small but lasting edge.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6, c4 line)',
                aliases: ['London c5 Qb6 c4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3', 'Nc6', 'Bd3', 'c4', 'Bf5'],
                prerequisites: ['london-intermediate-vs-c5-Qb6'],
                continuationIds: ['london-expert-c5-Qb6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'Black gains space with ...c4.',
                    'White\'s bishop reroutes to f5.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to cramp the position',
                    'Developing the bishop to a passive square'
                ],
                explanation: 'After 6.Bd3 c4 7.Bf5 White reroutes the bishop actively. The London handles the space-gaining ...c4 comfortably.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'london-advanced-c5-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (e6, Bd6)',
                aliases: ['London c5 e6 Bd6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'e6', 'Bd3', 'Nc6', 'Nbd2', 'Bd6', 'O-O'],
                prerequisites: ['london-intermediate-vs-c5-e6'],
                continuationIds: ['london-expert-c5-e6'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White castles after full development.',
                    'The structure is solid and balanced.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Developing the queen too early'
                ],
                explanation: 'After 7.Nbd2 Bd6 8.O-O White is fully developed. The London vs the ...c5/...e6 complex is a model of solid play.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'london-advanced-b6',
                parentVariation: 'London System',
                variationName: 'London vs 3...b6 (c3 / Nbd2)',
                aliases: ['London b6 main'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'b6', 'e3', 'Bb7', 'Bd3', 'c5', 'c3', 'Nc6', 'Nbd2'],
                prerequisites: ['london-intermediate-vs-b6'],
                continuationIds: ['london-expert-b6'],
                conceptIds: ['pawn-structure', 'development', 'fianchetto'],
                strategicIdeas: [
                    'White develops the knight to d2.',
                    'The centre is supported by c3.',
                    'The position is solid for both sides.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to gain queenside space',
                    'Developing pieces passively'
                ],
                explanation: 'After 6.c3 Nc6 7.Nbd2 White is well developed against the queenside fianchetto. The London is reliable here.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-vs-Bg4',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bg4 (e6 line)',
                aliases: ['London Bg4 e6'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bg4', 'e3', 'e6', 'Bd3', 'Bd6', 'Nbd2', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: ['london-expert-vs-Bg4'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White meets the pin with natural development.',
                    'Both sides castle kingside.',
                    'The position is calm.'
                ],
                commonMistakes: [
                    'Breaking the pin with h3 too early',
                    'Allowing ...Bxf3 to damage the structure'
                ],
                explanation: 'After 5.Bd3 Bd6 6.Nbd2 O-O 7.O-O White is fully developed. The London vs the early ...Bg4 is straightforward.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'london-advanced-vs-Ne4',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Ne4 line)',
                aliases: ['London c5 Ne4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'Ne4', 'O-O'],
                prerequisites: ['london-intermediate-main-c5'],
                continuationIds: ['london-expert-vs-Ne4'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black plants a knight on e4.',
                    'White castles, keeping the structure intact.',
                    'The knight on e4 is well placed but can be challenged.'
                ],
                commonMistakes: [
                    'Allowing ...Nxd2 to relieve the tension prematurely',
                    'Breaking the pin awkwardly'
                ],
                explanation: 'After 7.Ne4 (Black) 8.O-O White castles safely. The knight on e4 is a strong piece but White can later challenge it with f3 or trade.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 35,
                difficulty: 4,
                popularity: 4,
            }),
        ],
    },

    expert: {
        tier: 'Expert',
        lines: [
            buildLine({
                id: 'london-expert-c5',
                parentVariation: 'London System',
                variationName: 'London Main vs 3...c5 (Ne5 plan)',
                aliases: ['London c5 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'e6', 'O-O', 'Bd6', 'Ne5'],
                prerequisites: ['london-advanced-c5-main'],
                continuationIds: ['london-master-c5'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on the e5 outpost.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 8...Bd6 9.Ne5 White seizes the e5 outpost. This is a key London plan giving White a small but lasting edge.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 5,
            }),
            buildLine({
                id: 'london-expert-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (c5 / c3 plan)',
                aliases: ['London e6 c5 c3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6', 'Qxd6', 'Bd3', 'O-O', 'Nbd2', 'Nbd7', 'O-O', 'c5', 'c3'],
                prerequisites: ['london-advanced-e6-main'],
                continuationIds: ['london-master-e6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White supports the centre with c3.',
                    'The structure is solid and flexible.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Underestimating Black\'s central control'
                ],
                explanation: 'After 8.O-O c5 9.c3 White supports d4 and keeps a flexible structure. The London vs the ...e6 setup rewards patient play.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'london-expert-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Ne5 plan)',
                aliases: ['London c6 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3', 'Bxd3', 'Qxd3', 'Nbd7', 'O-O', 'h6', 'Ne5'],
                prerequisites: ['london-advanced-c6-main'],
                continuationIds: ['london-master-c6'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is supported and active.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Developing pieces passively'
                ],
                explanation: 'After 8...h6 9.Ne5 White seizes the e5 outpost. The London vs the Slav setup is comfortable with this plan.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (Qb6 / Qb3 plan)',
                aliases: ['London g6 Qb3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3', 'O-O', 'O-O', 'c5', 'c3', 'Qb6', 'Qb3'],
                prerequisites: ['london-advanced-g6-main'],
                continuationIds: ['london-master-g6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White\'s queen goes to b3, eyeing b7 and d5.',
                    'The structure is solid and flexible.',
                    'White keeps a small initiative.'
                ],
                commonMistakes: [
                    'Launching a premature kingside attack',
                    'Neglecting the queenside'
                ],
                explanation: 'After 7.c3 Qb6 8.Qb3 White targets b7 and d5. The London vs the King\'s-Indian-style setup is reliable with this plan.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (Ne5 plan)',
                aliases: ['London Bf5 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3', 'Bxd3', 'Qxd3', 'Bd6', 'O-O', 'O-O', 'Ne5'],
                prerequisites: ['london-advanced-Bf5-main'],
                continuationIds: ['london-master-Bf5'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 8...Bd6 9.Ne5 White seizes the e5 outpost. The London vs the early ...Bf5 is simple and gives White a small edge.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'london-expert-Nc6',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6 (Ne5 plan)',
                aliases: ['London Nc6 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3', 'e6', 'O-O', 'Bd6', 'Nbd2', 'O-O', 'Ne5'],
                prerequisites: ['london-advanced-Nc6-main'],
                continuationIds: ['london-master-Nc6'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is supported and active.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Delaying castling'
                ],
                explanation: 'After 8...Bd6 9.Ne5 White seizes the e5 outpost. The London vs 3...Nc6 is robust with this plan.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-Be7',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7, Nxd7)',
                aliases: ['London e6 Be7 Nxd7'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Nbd7', 'Ne5', 'Bd6', 'Nxd7'],
                prerequisites: ['london-advanced-Be7-main'],
                continuationIds: ['london-master-Be7'],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades the e5 knight for the d7 knight.',
                    'This relieves Black\'s only active piece.',
                    'White keeps a small edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost first',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 8...Bd6 9.Nxd7 White trades off Black\'s well-placed knight. This is a typical London simplification giving White a tiny edge.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6, Bg7 line)',
                aliases: ['London c5 Qb6 Bg7'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3', 'Nc6', 'Bd3', 'c4', 'Bf5', 'g6', 'Bg3'],
                prerequisites: ['london-advanced-c5-Qb6'],
                continuationIds: ['london-master-c5-Qb6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'White\'s bishop retreats to g3.',
                    'The position is balanced.',
                    'White keeps a flexible structure.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to cramp the position',
                    'Developing the bishop to a passive square'
                ],
                explanation: 'After 8...g6 9.Bg3 White keeps the bishop. The London vs the space-gaining ...c4 is comfortable.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'london-expert-c5-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (e6, Ne5 plan)',
                aliases: ['London c5 e6 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'e6', 'Bd3', 'Nc6', 'Nbd2', 'Bd6', 'O-O', 'O-O', 'Ne5'],
                prerequisites: ['london-advanced-c5-e6'],
                continuationIds: ['london-master-c5-e6'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Rushing the c4 break'
                ],
                explanation: 'After 8...Bd6 9.Ne5 White seizes the e5 outpost. The London vs the ...c5/...e6 complex is a model of solid play.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'london-expert-b6',
                parentVariation: 'London System',
                variationName: 'London vs 3...b6 (Ne5 plan)',
                aliases: ['London b6 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'b6', 'e3', 'Bb7', 'Bd3', 'c5', 'c3', 'Nc6', 'Nbd2', 'e6', 'Ne5'],
                prerequisites: ['london-advanced-b6'],
                continuationIds: ['london-master-b6'],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is supported and active.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Developing pieces passively'
                ],
                explanation: 'After 7...e6 8.Ne5 White seizes the e5 outpost. The London vs the queenside fianchetto is reliable with this plan.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-vs-Bg4',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bg4 (Ne5 plan)',
                aliases: ['London Bg4 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bg4', 'e3', 'e6', 'Bd3', 'Bd6', 'Nbd2', 'O-O', 'O-O', 'Nbd7', 'Ne5'],
                prerequisites: ['london-advanced-vs-Bg4'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Breaking the pin with h3 too early'
                ],
                explanation: 'After 8...Nbd7 9.Ne5 White seizes the e5 outpost. The London vs the early ...Bg4 is straightforward with this plan.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'london-expert-vs-Ne4',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Ne4, Bxf3 line)',
                aliases: ['London c5 Ne4 Bxf3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'Ne4', 'O-O', 'Bxf3', 'Qxf3'],
                prerequisites: ['london-advanced-vs-Ne4'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black trades the bishop for the f3 knight.',
                    'White recaptures with the queen.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...Nxd2 to relieve the tension prematurely',
                    'Breaking the pin awkwardly'
                ],
                explanation: 'After 8...Bxf3 9.Qxf3 White recaptures with the queen. The London vs the ...Ne4 line is safe after the trade.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 5,
                popularity: 4,
            }),
        ],
    },

    master: {
        tier: 'Master',
        lines: [
            buildLine({
                id: 'london-master-c5',
                parentVariation: 'London System',
                variationName: 'London Main vs 3...c5 (c4 break)',
                aliases: ['London c5 c4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'e6', 'O-O', 'Bd6', 'Ne5', 'O-O', 'c4'],
                prerequisites: ['london-expert-c5'],
                continuationIds: ['london-legend-c5'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White plays the thematic c4 break.',
                    'This challenges Black\'s centre.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...dxc4 to win a pawn',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 9...O-O 10.c4 White strikes in the centre. The c4 break is a key London plan that opens the position for White\'s pieces.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 5,
            }),
            buildLine({
                id: 'london-master-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (c5 / Rac8 / Qe2)',
                aliases: ['London e6 Qe2'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6', 'Qxd6', 'Bd3', 'O-O', 'Nbd2', 'Nbd7', 'O-O', 'c5', 'c3', 'Qc7', 'Qe2'],
                prerequisites: ['london-expert-e6'],
                continuationIds: ['london-legend-e6'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White centralises the queen on e2.',
                    'Black centralises the queen on c7.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Underestimating Black\'s central control'
                ],
                explanation: 'After 9...Qc7 10.Qe2 White improves the queen. The London vs the ...e6 setup rewards patient, accurate play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'london-master-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Nxe5 / Bxe5)',
                aliases: ['London c6 Bxe5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3', 'Bxd3', 'Qxd3', 'Nbd7', 'O-O', 'h6', 'Ne5', 'Nxe5', 'Bxe5'],
                prerequisites: ['london-expert-c6'],
                continuationIds: ['london-legend-c6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black trades the e5 knight.',
                    'White recaptures with the bishop, gaining the bishop pair.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Developing pieces passively'
                ],
                explanation: 'After 10...Nxe5 11.Bxe5 White wins the bishop pair. The London vs the Slav setup is comfortable with this structure.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'london-master-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (c4 / Bxc4 line)',
                aliases: ['London g6 Bxc4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3', 'O-O', 'O-O', 'c5', 'c3', 'Qb6', 'Qb3', 'c4', 'Bxc4'],
                prerequisites: ['london-expert-g6'],
                continuationIds: ['london-legend-g6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black gains space with ...c4.',
                    'White captures the pawn with the bishop.',
                    'White has won a pawn but must be careful.'
                ],
                commonMistakes: [
                    'Allowing ...b5 to support the c4 pawn',
                    'Neglecting the queenside'
                ],
                explanation: 'After 11...c4 12.Bxc4 White wins the pawn. The London vs the King\'s-Indian-style setup requires accurate play after the capture.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'london-master-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (Ne5 / Nbd7 / f4)',
                aliases: ['London Bf5 f4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3', 'Bxd3', 'Qxd3', 'Bd6', 'O-O', 'O-O', 'Ne5', 'Nbd7', 'Bg3', 'Re8', 'f4'],
                prerequisites: ['london-expert-Bf5'],
                continuationIds: ['london-legend-Bf5'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White plays the thematic f4 pawn break.',
                    'This gains space on the kingside.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Weakening the king with premature pawn moves'
                ],
                explanation: 'After 8...Nbd7 9.Bg3 Re8 10.f4 White gains space with the f4 break. The London vs the early ...Bf5 is simple and gives White a small edge.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'london-master-Nc6',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6 (Nxe5 / Bxe5)',
                aliases: ['London Nc6 Bxe5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3', 'e6', 'O-O', 'Bd6', 'Nbd2', 'O-O', 'Ne5', 'Nxe5', 'Bxe5'],
                prerequisites: ['london-expert-Nc6'],
                continuationIds: ['london-legend-Nc6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black trades the e5 knight.',
                    'White recaptures with the bishop, gaining the bishop pair.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Delaying castling'
                ],
                explanation: 'After 10...Nxe5 11.Bxe5 White wins the bishop pair. The London vs 3...Nc6 is robust with this plan.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'london-master-Be7',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7, c4 break)',
                aliases: ['London e6 Be7 c4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Nbd7', 'Ne5', 'Bd6', 'Nxd7', 'Qxd7', 'c4'],
                prerequisites: ['london-expert-Be7'],
                continuationIds: ['london-legend-Be7'],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White plays the thematic c4 break.',
                    'This challenges Black\'s centre.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...dxc4 to win a pawn',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 11...Qxd7 12.c4 White strikes in the centre. The London vs the ...e6/...Be7 setup rewards the c4 break.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'london-master-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6, Bg7 / O-O)',
                aliases: ['London c5 Qb6 O-O'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3', 'Nc6', 'Bd3', 'c4', 'Bf5', 'g6', 'Bg3', 'Bg7', 'O-O'],
                prerequisites: ['london-expert-c5-Qb6'],
                continuationIds: ['london-legend-c5-Qb6'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'Both sides complete development and castle.',
                    'The position is balanced.',
                    'White keeps a flexible structure.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to cramp the position',
                    'Developing the bishop to a passive square'
                ],
                explanation: 'After 11...Bg7 12.O-O White is fully developed. The London vs the space-gaining ...c4 is comfortable.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'london-master-c5-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (e6, Nxe5 / Bxe5)',
                aliases: ['London c5 e6 Bxe5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'e6', 'Bd3', 'Nc6', 'Nbd2', 'Bd6', 'O-O', 'O-O', 'Ne5', 'Nxe5', 'Bxe5'],
                prerequisites: ['london-expert-c5-e6'],
                continuationIds: ['london-legend-c5-e6'],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black trades the e5 knight.',
                    'White recaptures with the bishop, gaining the bishop pair.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Rushing the c4 break'
                ],
                explanation: 'After 10...Nxe5 11.Bxe5 White wins the bishop pair. The London vs the ...c5/...e6 complex is a model of solid play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'london-master-b6',
                parentVariation: 'London System',
                variationName: 'London vs 3...b6 (Ne5 / O-O)',
                aliases: ['London b6 O-O'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'b6', 'e3', 'Bb7', 'Bd3', 'c5', 'c3', 'Nc6', 'Nbd2', 'e6', 'Ne5', 'Be7', 'O-O', 'O-O'],
                prerequisites: ['london-expert-b6'],
                continuationIds: ['london-legend-b6'],
                conceptIds: ['pawn-structure', 'development', 'castling', 'king-safety'],
                strategicIdeas: [
                    'Both sides castle kingside.',
                    'White has a pleasant space edge.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Developing pieces passively'
                ],
                explanation: 'After 8...Be7 9.O-O O-O White is fully developed. The London vs the queenside fianchetto is reliable with this plan.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 6,
                popularity: 3,
            }),
        ],
    },

    legend: {
        tier: 'Legend',
        lines: [
            buildLine({
                id: 'london-legend-c5',
                parentVariation: 'London System',
                variationName: 'London Main vs 3...c5 (c4 / dxc4 / Bxc4)',
                aliases: ['London c5 Bxc4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Nc6', 'Bd3', 'Bg4', 'Nbd2', 'e6', 'O-O', 'Bd6', 'Ne5', 'O-O', 'c4', 'dxc4', 'Bxc4'],
                prerequisites: ['london-master-c5'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'White wins the pawn back with Bxc4.',
                    'The bishop is active on c4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...b5 to trap the bishop',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 11...dxc4 12.Bxc4 White regains the pawn with an active bishop. The London main line vs 3...c5 is a model of the c4 break.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 5,
            }),
            buildLine({
                id: 'london-legend-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Rfd1 / deep middlegame)',
                aliases: ['London e6 Rfd1'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Bd6', 'Bxd6', 'Qxd6', 'Bd3', 'O-O', 'Nbd2', 'Nbd7', 'O-O', 'c5', 'c3', 'Qc7', 'Qe2', 'Rfd8', 'Rfd1'],
                prerequisites: ['london-master-e6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'rook-activity'],
                strategicIdeas: [
                    'White brings the rook to d1, controlling the open file.',
                    'The position is positional and maneuvering.',
                    'White keeps a small edge.'
                ],
                commonMistakes: [
                    'Rushing the c4 break',
                    'Underestimating Black\'s central control'
                ],
                explanation: 'After 10...Rfd8 11.Rfd1 White centralises the rook. The London vs the ...e6 setup rewards patient, accurate maneuvering.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'london-legend-c6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c6 (Bxe5 / Nd7 / Bg3)',
                aliases: ['London c6 Bg3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c6', 'e3', 'Bf5', 'Bd3', 'Bxd3', 'Qxd3', 'Nbd7', 'O-O', 'h6', 'Ne5', 'Nxe5', 'Bxe5', 'Nd7', 'Bg3'],
                prerequisites: ['london-master-c6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'White retreats the bishop to g3.',
                    'The bishop pair is a long-term asset.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Developing pieces passively'
                ],
                explanation: 'After 12...Nd7 13.Bg3 White keeps the bishop pair. The London vs the Slav setup is comfortable with this structure.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'london-legend-g6',
                parentVariation: 'London System',
                variationName: 'London vs 3...g6 (Bxc4 / Nc6 / Bd3)',
                aliases: ['London g6 Bd3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'g6', 'e3', 'Bg7', 'Bd3', 'O-O', 'O-O', 'c5', 'c3', 'Qb6', 'Qb3', 'c4', 'Bxc4', 'Nc6', 'Bd3'],
                prerequisites: ['london-master-g6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'White retreats the bishop to d3.',
                    'The extra pawn must be consolidated.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...b5 to support the c4 pawn',
                    'Neglecting the queenside'
                ],
                explanation: 'After 13...Nc6 14.Bd3 White consolidates the extra pawn. The London vs the King\'s-Indian-style setup requires accurate play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'london-legend-Bf5',
                parentVariation: 'London System',
                variationName: 'London vs 3...Bf5 (f4 / c5 / c3)',
                aliases: ['London Bf5 c3'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Bf5', 'e3', 'e6', 'Bd3', 'Bxd3', 'Qxd3', 'Bd6', 'O-O', 'O-O', 'Ne5', 'Nbd7', 'Bg3', 'Re8', 'f4', 'c5', 'c3'],
                prerequisites: ['london-master-Bf5'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White supports the centre with c3.',
                    'The f4 break has gained space.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Weakening the king with premature pawn moves'
                ],
                explanation: 'After 10...c5 11.c3 White supports the centre. The London vs the early ...Bf5 is simple and gives White a small edge.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'london-legend-Nc6',
                parentVariation: 'London System',
                variationName: 'London vs 3...Nc6 (Bxe5 / Bxe5 / Bxe5)',
                aliases: ['London Nc6 Bxe5 final'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bd3', 'e6', 'O-O', 'Bd6', 'Nbd2', 'O-O', 'Ne5', 'Nxe5', 'Bxe5', 'Bxe5', 'dxe5'],
                prerequisites: ['london-master-Nc6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black trades the bishop for the e5 knight.',
                    'White recaptures with the pawn, keeping the bishop pair.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Delaying castling'
                ],
                explanation: 'After 12...Bxe5 13.dxe5 White keeps the bishop pair and a small space edge. The London vs 3...Nc6 is robust.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'london-legend-Be7',
                parentVariation: 'London System',
                variationName: 'London vs 3...e6 (Be7, c4 / dxc4 / Bxc4)',
                aliases: ['London e6 Be7 Bxc4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'e6', 'e3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Nbd7', 'Ne5', 'Bd6', 'Nxd7', 'Qxd7', 'c4', 'dxc4', 'Bxc4'],
                prerequisites: ['london-master-Be7'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'White wins the pawn back with Bxc4.',
                    'The bishop is active on c4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...b5 to trap the bishop',
                    'Trading the good bishop unnecessarily'
                ],
                explanation: 'After 12...dxc4 13.Bxc4 White regains the pawn with an active bishop. The London vs the ...e6/...Be7 setup rewards the c4 break.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'london-legend-c5-Qb6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (Qb6, Ne5 plan)',
                aliases: ['London c5 Qb6 Ne5'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'Qb6', 'Nc3', 'Nc6', 'Bd3', 'c4', 'Bf5', 'g6', 'Bg3', 'Bg7', 'O-O', 'O-O', 'Ne5'],
                prerequisites: ['london-master-c5-Qb6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on e5.',
                    'The knight is hard to dislodge.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...c4 to cramp the position',
                    'Developing the bishop to a passive square'
                ],
                explanation: 'After 13...Ne5 White seizes the e5 outpost. The London vs the space-gaining ...c4 is comfortable with this plan.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'london-legend-c5-e6',
                parentVariation: 'London System',
                variationName: 'London vs 3...c5 (e6, Bxe5 / Bxe5)',
                aliases: ['London c5 e6 Bxe5 final'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'c5', 'e3', 'e6', 'Bd3', 'Nc6', 'Nbd2', 'Bd6', 'O-O', 'O-O', 'Ne5', 'Nxe5', 'Bxe5', 'Bxe5', 'dxe5'],
                prerequisites: ['london-master-c5-e6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'bishop-pair'],
                strategicIdeas: [
                    'Black trades the bishop for the e5 knight.',
                    'White recaptures with the pawn, keeping the bishop pair.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...f6 to challenge the bishop',
                    'Rushing the c4 break'
                ],
                explanation: 'After 12...Bxe5 13.dxe5 White keeps the bishop pair and a small space edge. The London vs the ...c5/...e6 complex is a model of solid play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'london-legend-b6',
                parentVariation: 'London System',
                variationName: 'London vs 3...b6 (Ne5 / Rc8 / a4)',
                aliases: ['London b6 a4'],
                eco: 'D02',
                sanMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4', 'b6', 'e3', 'Bb7', 'Bd3', 'c5', 'c3', 'Nc6', 'Nbd2', 'e6', 'Ne5', 'Be7', 'O-O', 'O-O', 'a4', 'Rc8'],
                prerequisites: ['london-master-b6'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White gains queenside space with a4.',
                    'The knight on e5 is a strong outpost.',
                    'White has a pleasant edge.'
                ],
                commonMistakes: [
                    'Allowing ...Nxe5 to relieve the outpost',
                    'Developing pieces passively'
                ],
                explanation: 'After 10.a4 Rc8 White gains space on the queenside. The London vs the queenside fianchetto is reliable with this plan.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 60,
                difficulty: 7,
                popularity: 3,
            }),
        ],
    },
};

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
const metadata = {
    id: 'london-system',
    name: 'London System',
    slug: SLUG,
    ecoRange: 'D02',
    family: OPENING_FAMILY,
    colour: COLOUR,
    popularity: 4,
    difficulty: 2,
    description:
        'The London System is a solid, low-risk opening for White built on the moves 1.d4, 2.Nf3, 3.Bf4, followed by e3, Bd3, Nbd2 and castling. It can be played against almost any Black setup, making it an ideal repertoire choice for systematic, memorisation-first training.',
    strategicOverview:
        'White aims for a stable pawn structure (pawns on d4 and e3) with the bishop on f4 and the bishop on d3. The setup is flexible: White can later choose between the c4 break, the e4 break, or planting a knight on the e5 outpost. Because the same moves work against many Black replies, the London is easy to learn and hard to punish.',
    typicalPawnStructures: [
        'd4 + e3 pawn chain with c3 support',
        'Symmetrical Slav-style structures after ...c6',
        'IQP-style tension after the c4 break',
        'Closed centre with a knight on e5'
    ],
    commonTacticalThemes: [
        'Knight outpost on e5',
        'Bishop pair after early light-squared trades',
        'The c4 central break',
        'The f4 kingside space gain'
    ],
    modelPlayers: ['Magnus Carlsen', 'Gata Kamsky', 'Nigel Short', 'David Howell'],
    recommendedStudyOrder: [
        'Beginner: learn the core setup (Bf4, e3, Bd3).',
        'Novice: meet the common Black replies (...c5, ...e6, ...c6, ...g6, ...Bf5).',
        'Intermediate: complete development and castle.',
        'Advanced: introduce the e5 outpost and c4 break.',
        'Expert: handle the early queen sortie ...Qb6 and the ...Ne4 ideas.',
        'Master: execute the c4 break and win the bishop pair.',
        'Legend: navigate the deep middlegame with rook activity and space.'
    ],
    baseMoves: ['d4', 'd5', 'Nf3', 'Nf6', 'Bf4'],
    masteryLevels: [
        {
            level: 1,
            tier: 'Beginner',
            objectives: ['Memorise the core London setup (d4, Nf3, Bf4, e3).', 'Recognise the main Black replies.'],
            expectedKnowledge: 'Basic piece development and the purpose of the London bishop on f4.',
            averageMoveDepth: 7,
            averageLineCount: 5,
            xpReward: 100,
            graduationRequirements: '75% accuracy across all Beginner lines in review.'
        },
        {
            level: 2,
            tier: 'Novice',
            objectives: ['Develop Bd3 against each Black setup.', 'Handle the early ...Qb6 sortie.'],
            expectedKnowledge: 'The role of Bd3 and the bishop trade on d3.',
            averageMoveDepth: 9,
            averageLineCount: 8,
            xpReward: 160,
            graduationRequirements: '78% accuracy across all Novice lines in review.'
        },
        {
            level: 3,
            tier: 'Intermediate',
            objectives: ['Complete development and castle in every line.', 'Support the centre with c3.'],
            expectedKnowledge: 'Castling safety and the c3/d4 support structure.',
            averageMoveDepth: 11,
            averageLineCount: 10,
            xpReward: 240,
            graduationRequirements: '80% accuracy across all Intermediate lines in review.'
        },
        {
            level: 4,
            tier: 'Advanced',
            objectives: ['Introduce the e5 outpost and c4 break ideas.', 'Handle ...Bg4 pins and ...Ne4.'],
            expectedKnowledge: 'Outpost play on e5 and the c4 central break.',
            averageMoveDepth: 13,
            averageLineCount: 12,
            xpReward: 340,
            graduationRequirements: '82% accuracy across all Advanced lines in review.'
        },
        {
            level: 5,
            tier: 'Expert',
            objectives: ['Seize the e5 outpost consistently.', 'Meet the ...Qb6 and ...Ne4 lines accurately.'],
            expectedKnowledge: 'Deep understanding of the e5 outpost and piece trades.',
            averageMoveDepth: 15,
            averageLineCount: 12,
            xpReward: 460,
            graduationRequirements: '84% accuracy across all Expert lines in review.'
        },
        {
            level: 6,
            tier: 'Master',
            objectives: ['Execute the c4 break and win the bishop pair.', 'Convert the small space edge.'],
            expectedKnowledge: 'The c4 break timing and bishop-pair conversion.',
            averageMoveDepth: 17,
            averageLineCount: 10,
            xpReward: 600,
            graduationRequirements: '86% accuracy across all Master lines in review.'
        },
        {
            level: 7,
            tier: 'Legend',
            objectives: ['Navigate the deep middlegame with rook activity and space.', 'Consolidate extra pawns accurately.'],
            expectedKnowledge: 'Full mastery of London plans across all Black setups.',
            averageMoveDepth: 19,
            averageLineCount: 10,
            xpReward: 800,
            graduationRequirements: '88% accuracy across all Legend lines in review.'
        }
    ]
};

// ---------------------------------------------------------------------------
// Write tier files
// ---------------------------------------------------------------------------
fs.mkdirSync(OUT_DIR, { recursive: true });

for (const [key, tierData] of Object.entries(tiers)) {
    const filePath = path.join(OUT_DIR, `${key}.json`);
    const out = { openingId: SLUG, ...tierData };
    fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + '\n', 'utf8');
    console.log(`Wrote ${filePath} with ${out.lines.length} lines`);
}

fs.writeFileSync(
    path.join(OUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2) + '\n',
    'utf8'
);
console.log(`Wrote ${path.join(OUT_DIR, 'metadata.json')}`);

console.log('London System course generation complete!');
