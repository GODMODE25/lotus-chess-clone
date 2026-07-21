/**
 * Generator for the English Opening (White) opening course.
 *
 * Produces data/openings/white/english-opening/ with:
 *   - metadata.json
 *   - beginner.json, novice.json, intermediate.json, advanced.json,
 *     expert.json, master.json, legend.json
 *
 * Every FEN / PGN / UCI is derived from chess.js so move legality is guaranteed.
 * Theory source: standard mainline English Opening (Chess.com / Chessable databases).
 */
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const OPENING_FAMILY = 'English Opening';
const COLOUR = 'white';
const SLUG = 'english-opening';
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

const tiers = {
    beginner: {
        tier: 'Beginner',
        lines: [
            buildLine({
                id: 'english-beginner-e5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Reversed Sicilian)',
                aliases: ['English e5 Nc3'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['english-novice-e5-fourknights'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White controls d5 with the c-pawn.',
                    'The setup mirrors a Sicilian reversed.',
                    'Knights develop before committing the centre.'
                ],
                commonMistakes: [
                    'Rushing d4 before developing pieces',
                    'Neglecting the d5 square'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 White has a flexible reversed-Sicilian setup. The English is about controlling the centre from the flank.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 5,
            }),
            buildLine({
                id: 'english-beginner-c5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric English)',
                aliases: ['English c5 Nc3'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nc3', 'Nc6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['english-novice-c5-symmetric'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Both sides mirror with ...c5.',
                    'White keeps a small space edge.',
                    'The position is balanced and calm.'
                ],
                commonMistakes: [
                    'Premature pawn breaks',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 c5 2.Nc3 Nc6 3.Nf3 White enters the symmetric English. Themes of piece activity and small advantages dominate.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 4,
            }),
            buildLine({
                id: 'english-beginner-Nf6',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Indian)',
                aliases: ['English Nf6 Nc3'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'e6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['english-novice-Nf6-e6'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black prepares ...d5 with a solid setup.',
                    'White keeps the d5 square under control.',
                    'The position is flexible.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to equalise too easily',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 e6 3.Nf3 White meets the Anglo-Indian with natural development. The English rewards patience.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 4,
            }),
            buildLine({
                id: 'english-beginner-e6',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed)',
                aliases: ['English e6 Nc3'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['english-novice-e6'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black sets up a Queen\'s-Indian-style structure.',
                    'White can later play e4 for a big centre.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Rushing e4 without preparation',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 White meets the Queen\'s-Indian-reversed setup. A central strike with e4 is a key idea.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 3,
            }),
            buildLine({
                id: 'english-beginner-f5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch)',
                aliases: ['English f5 Nc3'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['english-novice-f5'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black plays a Dutch-style fianchetto plan.',
                    'White keeps a healthy structure.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 White meets the Anglo-Dutch. The English structure is robust against the Dutch pawn front.',
                reviewPriority: 1,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 1,
                popularity: 2,
            }),
        ],
    },
    novice: {
        tier: 'Novice',
        lines: [
            buildLine({
                id: 'english-novice-e5-fourknights',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights, g3)',
                aliases: ['English e5 Four Knights'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3'],
                prerequisites: ['english-beginner-e5'],
                continuationIds: ['english-intermediate-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White fianchettoes the king\'s bishop.',
                    'The Botvinnik setup is flexible and solid.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Delaying the bishop fianchetto',
                    'Allowing ...d5 to free Black\'s game'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.g3 White adopts the Botvinnik setup. The fianchettoed bishop controls the long diagonal.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 5,
            }),
            buildLine({
                id: 'english-novice-e5-botvinnik-bb4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik, ...Bb4)',
                aliases: ['English e5 Botvinnik Bb4'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4'],
                prerequisites: ['english-beginner-e5'],
                continuationIds: ['english-intermediate-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black pins the c3 knight with ...Bb4.',
                    'White continues with Qc2 and Bg2.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 Black pins the knight. White meets it with Qc2 and Bg2, keeping a harmonious Botvinnik setup.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'english-novice-c5-symmetric',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric, Double Fianchetto)',
                aliases: ['English c5 symmetric'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'Nc6', 'g3'],
                prerequisites: ['english-beginner-c5'],
                continuationIds: ['english-intermediate-c5-hedgehog'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Both sides fianchetto the king\'s bishop.',
                    'The position is symmetric and balanced.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Premature pawn breaks',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 Nc6 4.g3 White enters the symmetric English with a double fianchetto. Themes of piece activity dominate.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'english-novice-c5-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (d4 Break)',
                aliases: ['English c5 d4'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4'],
                prerequisites: ['english-beginner-c5'],
                continuationIds: ['english-intermediate-c5-d4-e5'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White strikes in the centre with d4.',
                    'This transposes to a reversed Sicilian.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.d4 cxd4 4.Nxd4 White grabs the centre. The d4 break is a key English idea against the symmetric.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'english-novice-Nf6-e6',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...e6 (Anglo-Grünfeld-ish)',
                aliases: ['English Nf6 e6 d5'],
                eco: 'A12',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'e6', 'Nf3', 'd5', 'cxd5', 'exd5'],
                prerequisites: ['english-beginner-Nf6'],
                continuationIds: ['english-intermediate-Nf6-grunfeld'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black recaptures toward the centre with ...exd5.',
                    'White has an isolated queen\'s pawn structure.',
                    'The position is flexible.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 e6 3.Nf3 d5 4.cxd5 exd5 White gets an IQP-style structure. The English rewards piece activity here.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'english-novice-Nf6-c5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (Hedgehog Setup)',
                aliases: ['English Nf6 c5 hedgehog'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3'],
                prerequisites: ['english-beginner-Nf6'],
                continuationIds: ['english-intermediate-Nf6-c5-kid'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black sets up a Hedgehog / King\'s-Indian-reversed.',
                    'White fianchettoes the king\'s bishop.',
                    'The position is flexible.'
                ],
                commonMistakes: [
                    'Premature pawn breaks',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 White meets the Hedgehog setup. The fianchetto keeps the position under control.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'english-novice-e6',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed, d5)',
                aliases: ['English e6 d5'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5'],
                prerequisites: ['english-beginner-e6'],
                continuationIds: ['english-intermediate-e6-qid'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black recaptures with ...exd5.',
                    'White can later play e4 for a big centre.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Rushing e4 without preparation',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 White meets the Queen\'s-Indian-reversed setup. A central strike with e4 is a key idea.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'english-novice-f5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch, Solid)',
                aliases: ['English f5 solid'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3'],
                prerequisites: ['english-beginner-f5'],
                continuationIds: ['english-intermediate-f5-dutch'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black plays a Dutch-style fianchetto plan.',
                    'White fianchettoes and keeps a healthy structure.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 White meets the Anglo-Dutch with a solid fianchetto. The English structure is robust.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 2,
                popularity: 2,
            }),
        ],
    },
    intermediate: {
        tier: 'Intermediate',
        lines: [
            buildLine({
                id: 'english-intermediate-e5-botvinnik',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik System)',
                aliases: ['English e5 Botvinnik'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2'],
                prerequisites: ['english-novice-e5-fourknights'],
                continuationIds: ['english-advanced-e5-botvinnik-main'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays Qc2 to support e4 and the king\'s bishop.',
                    'The Botvinnik system is a model setup.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 White builds the Botvinnik system. The queen supports e4 and the fianchettoed bishop.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 5,
            }),
            buildLine({
                id: 'english-intermediate-e5-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights, d4)',
                aliases: ['English e5 Four Knights d4'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4'],
                prerequisites: ['english-novice-e5-fourknights'],
                continuationIds: ['english-advanced-e5-fourknights-d4'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White strikes with d4 in the Four Knights.',
                    'This opens the centre for the pieces.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Bb4 to win the bishop pair',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.d4 exd4 5.Nxd4 White opens the centre. The Four Knights with d4 is a dynamic English line.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'english-intermediate-c5-hedgehog',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Hedgehog)',
                aliases: ['English c5 hedgehog'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7'],
                prerequisites: ['english-novice-c5-symmetric'],
                continuationIds: ['english-advanced-c5-hedgehog-main'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black sets up a Hedgehog with ...b6 and ...Bb7.',
                    'White fianchettoes both bishops.',
                    'The position is flexible.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 e6 4.g3 b6 5.Bg2 Bb7 White meets the Hedgehog. The double fianchetto keeps control.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'english-intermediate-c5-d4-e5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (d4, ...e5)',
                aliases: ['English c5 d4 e5'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4', 'e5', 'Nf3'],
                prerequisites: ['english-novice-c5-d4'],
                continuationIds: ['english-advanced-c5-symmetric-d4'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black replies ...e5 to challenge the centre.',
                    'White keeps a knight on f3.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 3.d4 cxd4 4.Nxd4 e5 5.Nf3 White keeps a flexible centre. The symmetric English with d4 is a model of restraint.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'english-intermediate-Nf6-grunfeld',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Grünfeld)',
                aliases: ['English Nf6 Grünfeld'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'Nf3', 'g6', 'g3'],
                prerequisites: ['english-novice-Nf6-e6'],
                continuationIds: ['english-advanced-Nf6-grunfeld-main'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black grabs the centre with ...d5 and ...g6.',
                    'White fianchettoes the king\'s bishop.',
                    'The position is a reversed Grünfeld.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 White meets the Anglo-Grünfeld. The fianchetto keeps the long diagonal under control.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'english-intermediate-Nf6-c5-kid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (King\'s Indian Reversed)',
                aliases: ['English Nf6 c5 KID'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7'],
                prerequisites: ['english-novice-Nf6-c5'],
                continuationIds: ['english-advanced-Nf6-c5-kid-main'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black sets up a King\'s-Indian-style structure.',
                    'White fianchettoes both bishops.',
                    'The position is a reversed KID.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 g6 5.Bg2 Bg7 White meets the King\'s-Indian-reversed. The fianchetto keeps control.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'english-intermediate-e6-qid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed, e4)',
                aliases: ['English e6 e4'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'b6', 'e4'],
                prerequisites: ['english-novice-e6'],
                continuationIds: ['english-advanced-e6-qid-main'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White plays e4 for a big central pawn mass.',
                    'This is a reversed Queen\'s Indian.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Rushing e4 without piece development',
                    'Allowing ...Bb4 to pin the knight'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 b6 4.e4 White grabs a big centre. The Queen\'s-Indian-reversed setup rewards central control.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'english-intermediate-e6-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Carlsbad Structure)',
                aliases: ['English e6 Carlsbad'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4'],
                prerequisites: ['english-novice-e6'],
                continuationIds: ['english-advanced-e6-d4-main'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The d4 pawn supports a central majority.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 5.d4 White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'english-intermediate-f5-dutch',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch, Fianchetto)',
                aliases: ['English f5 fianchetto'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3', 'Be7', 'Bg2'],
                prerequisites: ['english-novice-f5'],
                continuationIds: ['english-advanced-f5-dutch-main'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black plays a Dutch-style fianchetto plan.',
                    'White fianchettoes and keeps a healthy structure.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 Be7 5.Bg2 White meets the Anglo-Dutch with a solid fianchetto. The English structure is robust.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 2,
            }),
            buildLine({
                id: 'english-intermediate-e5-a3',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (a3, Prepare e4)',
                aliases: ['English e5 a3'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'a3'],
                prerequisites: ['english-novice-e5-fourknights'],
                continuationIds: ['english-advanced-e5-reversed-sicilian-e4'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays a3 to avoid ...Bb4 and prepare e4.',
                    'This is a flexible reversed Sicilian.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Delaying e4 too long',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.a3 White prepares e4 without allowing ...Bb4. The English rewards flexibility.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 40,
                difficulty: 3,
                popularity: 2,
            }),
        ],
    },
    advanced: {
        tier: 'Advanced',
        lines: [
            buildLine({
                id: 'english-advanced-e5-botvinnik-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik Main)',
                aliases: ['English e5 Botvinnik main'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2'],
                prerequisites: ['english-intermediate-e5-botvinnik'],
                continuationIds: ['english-master-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White completes the Botvinnik setup with Bg2.',
                    'Black castles to safety.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 White has a model Botvinnik setup. The fianchettoed bishop controls the long diagonal.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 5,
            }),
            buildLine({
                id: 'english-advanced-e5-botvinnik-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik, d4)',
                aliases: ['English e5 Botvinnik d4'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2', 'd6', 'd4'],
                prerequisites: ['english-intermediate-e5-botvinnik'],
                continuationIds: ['english-master-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'central-control'],
                strategicIdeas: [
                    'White plays the central d4 break.',
                    'This opens the position for the pieces.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...exd4 to relieve the centre'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 d6 7.d4 White strikes in the centre. The Botvinnik with d4 is a model English plan.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'english-advanced-e5-fourknights-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights, d4 Nxc6)',
                aliases: ['English e5 Four Knights Nxc6'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bb4', 'Nxc6'],
                prerequisites: ['english-intermediate-e5-d4'],
                continuationIds: ['english-master-e5-fourknights'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades on c6 to damage Black\'s structure.',
                    'This opens the position for the pieces.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Bxc3 to win the bishop pair',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.d4 exd4 5.Nxd4 Bb4 6.Nxc6 White trades on c6. The Four Knights with d4 is a dynamic English line.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'english-advanced-c5-hedgehog-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Hedgehog Main)',
                aliases: ['English c5 hedgehog main'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7', 'O-O', 'Be7', 'd4'],
                prerequisites: ['english-intermediate-c5-hedgehog'],
                continuationIds: ['english-master-c5-hedgehog'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'This challenges Black\'s Hedgehog.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 e6 4.g3 b6 5.Bg2 Bb7 6.O-O Be7 7.d4 White strikes in the centre. The Hedgehog is a model of restraint.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'english-advanced-c5-symmetric-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric, d4 ...e5)',
                aliases: ['English c5 symmetric d4'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4', 'e5', 'Nf3', 'd6', 'Nc3'],
                prerequisites: ['english-intermediate-c5-d4-e5'],
                continuationIds: ['english-master-c5-symmetric'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black replies ...e5 to challenge the centre.',
                    'White keeps a knight on c3.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 3.d4 cxd4 4.Nxd4 e5 5.Nf3 d6 6.Nc3 White keeps a flexible centre. The symmetric English with d4 is a model of restraint.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'english-advanced-Nf6-grunfeld-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Grünfeld Main)',
                aliases: ['English Nf6 Grünfeld main'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'Nf3', 'g6', 'g3', 'Bg7', 'Bg2', 'O-O', 'O-O'],
                prerequisites: ['english-intermediate-Nf6-grunfeld'],
                continuationIds: ['english-master-Nf6-grunfeld'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'The position is a reversed Grünfeld.',
                    'White keeps a small space edge.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 Bg7 6.Bg2 O-O 7.O-O White has a model Anglo-Grünfeld. The fianchetto keeps control.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'english-advanced-Nf6-c5-kid-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (King\'s Indian Reversed Main)',
                aliases: ['English Nf6 c5 KID main'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'O-O', 'O-O', 'd4'],
                prerequisites: ['english-intermediate-Nf6-c5-kid'],
                continuationIds: ['english-master-Nf6-c5-kid'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'White plays the thematic d4 break.',
                    'The position is a reversed KID.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 g6 5.Bg2 Bg7 6.O-O O-O 7.d4 White strikes in the centre. The KID-reversed is a model of restraint.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'english-advanced-e6-qid-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed Main)',
                aliases: ['English e6 e4 main'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'b6', 'e4', 'Bb7', 'Bd3', 'd6', 'O-O'],
                prerequisites: ['english-intermediate-e6-qid'],
                continuationIds: ['english-master-e6-qid'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The bishop develops actively to d3.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Rushing e4 without piece development',
                    'Allowing ...Bb4 to pin the knight'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 b6 4.e4 Bb7 5.Bd3 d6 6.O-O White has a big centre. The Queen\'s-Indian-reversed setup rewards central control.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'english-advanced-e6-d4-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Carlsbad Main)',
                aliases: ['English e6 Carlsbad main'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5'],
                prerequisites: ['english-intermediate-e6-d4'],
                continuationIds: ['english-master-e6-d4'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The bishop pins on g5.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'english-advanced-f5-dutch-main',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch Main)',
                aliases: ['English f5 main'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3', 'Be7', 'Bg2', 'O-O', 'O-O'],
                prerequisites: ['english-intermediate-f5-dutch'],
                continuationIds: ['english-master-f5-dutch'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'White keeps a healthy structure.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 Be7 5.Bg2 O-O 6.O-O White meets the Anglo-Dutch with a solid fianchetto. The English structure is robust.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 2,
            }),
            buildLine({
                id: 'english-advanced-e5-reversed-sicilian-e4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (a3, e4)',
                aliases: ['English e5 a3 e4'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'a3', 'g6', 'e4'],
                prerequisites: ['english-intermediate-e5-a3'],
                continuationIds: ['english-master-e5-e4'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White plays e4 for a big centre.',
                    'The a3 move prevents ...Bb4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Delaying e4 too long',
                    'Allowing ...d5 to challenge the centre'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.a3 g6 5.e4 White grabs a big centre. The reversed Sicilian with e4 is a model of central control.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 2,
            }),
            buildLine({
                id: 'english-advanced-Nf6-e6-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...e6 (d4 Carlsbad)',
                aliases: ['English Nf6 e6 d4'],
                eco: 'A12',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'e6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5'],
                prerequisites: ['english-novice-Nf6-e6'],
                continuationIds: ['english-expert-Nf6-e6-d4-deep'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The bishop pins on g5.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 e6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 50,
                difficulty: 4,
                popularity: 2,
            }),
        ],
    },
    expert: {
        tier: 'Expert',
        lines: [
            buildLine({
                id: 'english-expert-e5-botvinnik-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik Deep)',
                aliases: ['English e5 Botvinnik deep'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2', 'd6', 'O-O', 'Re8', 'd3'],
                prerequisites: ['english-advanced-e5-botvinnik-main'],
                continuationIds: ['english-master-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White completes development with O-O and d3.',
                    'Black reroutes the rook to e8.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 d6 7.O-O Re8 8.d3 White has a model Botvinnik setup. The fianchettoed bishop controls the long diagonal.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 5,
            }),
            buildLine({
                id: 'english-expert-e5-botvinnik-na5',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik, ...Na5)',
                aliases: ['English e5 Botvinnik Na5'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2', 'd6', 'O-O', 'Na5', 'b3'],
                prerequisites: ['english-advanced-e5-botvinnik-main'],
                continuationIds: ['english-master-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black reroutes the knight to a5.',
                    'White plays b3 to support the centre.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 d6 7.O-O Na5 8.b3 White meets the ...Na5 plan. The Botvinnik setup remains harmonious.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'english-expert-e5-fourknights-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights Deep)',
                aliases: ['English e5 Four Knights deep'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bb4', 'Nxc6', 'bxc6', 'g3'],
                prerequisites: ['english-advanced-e5-fourknights-d4'],
                continuationIds: ['english-master-e5-fourknights'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades on c6 to damage Black\'s structure.',
                    'Black recaptures with the b-pawn.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Bxc3 to win the bishop pair',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.d4 exd4 5.Nxd4 Bb4 6.Nxc6 bxc6 7.g3 White has a model Four Knights structure. The English rewards piece activity here.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'english-expert-c5-hedgehog-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Hedgehog Deep)',
                aliases: ['English c5 hedgehog deep'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7', 'O-O', 'Be7', 'd4', 'cxd4', 'Nxd4'],
                prerequisites: ['english-advanced-c5-hedgehog-main'],
                continuationIds: ['english-master-c5-hedgehog'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'Black recaptures with ...cxd4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 e6 4.g3 b6 5.Bg2 Bb7 6.O-O Be7 7.d4 cxd4 8.Nxd4 White strikes in the centre. The Hedgehog is a model of restraint.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'english-expert-c5-symmetric-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric Deep)',
                aliases: ['English c5 symmetric deep'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4', 'e5', 'Nf3', 'd6', 'Nc3', 'Nc6', 'g3'],
                prerequisites: ['english-advanced-c5-symmetric-d4'],
                continuationIds: ['english-master-c5-symmetric'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black replies ...e5 to challenge the centre.',
                    'White keeps a knight on c3.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 3.d4 cxd4 4.Nxd4 e5 5.Nf3 d6 6.Nc3 Nc6 7.g3 White keeps a flexible centre. The symmetric English with d4 is a model of restraint.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'english-expert-Nf6-grunfeld-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Grünfeld Deep)',
                aliases: ['English Nf6 Grünfeld deep'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'Nf3', 'g6', 'g3', 'Bg7', 'Bg2', 'O-O', 'O-O', 'Nb6', 'b3'],
                prerequisites: ['english-advanced-Nf6-grunfeld-main'],
                continuationIds: ['english-master-Nf6-grunfeld'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black reroutes the knight to b6.',
                    'White prepares the bishop fianchetto with b3.',
                    'The position is a reversed Grünfeld.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 Bg7 6.Bg2 O-O 7.O-O Nb6 8.b3 White has a model Anglo-Grünfeld. The fianchetto keeps control.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'english-expert-Nf6-c5-kid-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (King\'s Indian Reversed Deep)',
                aliases: ['English Nf6 c5 KID deep'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'O-O', 'O-O', 'd4', 'cxd4', 'Nxd4'],
                prerequisites: ['english-advanced-Nf6-c5-kid-main'],
                continuationIds: ['english-master-Nf6-c5-kid'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'Black recaptures with ...cxd4.',
                    'The position is a reversed KID.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 g6 5.Bg2 Bg7 6.O-O O-O 7.d4 cxd4 8.Nxd4 White strikes in the centre. The KID-reversed is a model of restraint.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'english-expert-e6-qid-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed Deep)',
                aliases: ['English e6 e4 deep'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'b6', 'e4', 'Bb7', 'Bd3', 'd6', 'O-O', 'Be7', 'Re1'],
                prerequisites: ['english-advanced-e6-qid-main'],
                continuationIds: ['english-master-e6-qid'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The rook comes to e1 to support e5.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Rushing e4 without piece development',
                    'Allowing ...Bb4 to pin the knight'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 b6 4.e4 Bb7 5.Bd3 d6 6.O-O Be7 7.Re1 White has a big centre. The Queen\'s-Indian-reversed setup rewards central control.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'english-expert-e6-d4-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Carlsbad Deep)',
                aliases: ['English e6 Carlsbad deep'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5', 'O-O', 'Qb3'],
                prerequisites: ['english-advanced-e6-d4-main'],
                continuationIds: ['english-master-e6-d4'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The queen develops to b3, eyeing d5 and b7.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 O-O 7.Qb3 White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'english-expert-f5-dutch-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch Deep)',
                aliases: ['English f5 deep'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3', 'Be7', 'Bg2', 'O-O', 'O-O', 'd6', 'd4'],
                prerequisites: ['english-advanced-f5-dutch-main'],
                continuationIds: ['english-master-f5-dutch'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'White plays the thematic d4 break.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 Be7 5.Bg2 O-O 6.O-O d6 7.d4 White strikes in the centre. The Anglo-Dutch is a model of restraint.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 2,
            }),
            buildLine({
                id: 'english-expert-e5-e4-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (a3, e4 Deep)',
                aliases: ['English e5 a3 e4 deep'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'a3', 'g6', 'e4', 'Bg7', 'Be2', 'O-O', 'O-O'],
                prerequisites: ['english-advanced-e5-reversed-sicilian-e4'],
                continuationIds: ['english-master-e5-e4'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The bishop develops to e2.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Delaying e4 too long',
                    'Allowing ...d5 to challenge the centre'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.a3 g6 5.e4 Bg7 6.Be2 O-O 7.O-O White grabs a big centre. The reversed Sicilian with e4 is a model of central control.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 2,
            }),
            buildLine({
                id: 'english-expert-Nf6-e6-d4-deep',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...e6 (d4 Carlsbad Deep)',
                aliases: ['English Nf6 e6 d4 deep'],
                eco: 'A12',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'e6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5', 'O-O', 'e3', 'Nc6', 'Bd3', 'Re8', 'O-O'],
                prerequisites: ['english-advanced-Nf6-e6-d4'],
                continuationIds: ['english-master-e6-d4'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The bishop develops to d3 after e3, then White castles.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 e6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 O-O 7.e3 Nc6 8.Bd3 Re8 9.O-O White builds a Carlsbad structure and castles. The English rewards piece activity here.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 60,
                difficulty: 5,
                popularity: 2,
            }),
        ],
    },
    master: {
        tier: 'Master',
        lines: [
            buildLine({
                id: 'english-master-e5-botvinnik',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik Master)',
                aliases: ['English e5 Botvinnik master'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2', 'd6', 'O-O', 'Re8', 'd3', 'a5', 'a3'],
                prerequisites: ['english-expert-e5-botvinnik-deep'],
                continuationIds: ['english-legend-e5-botvinnik'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White completes the Botvinnik setup with a3.',
                    'Black expands with ...a5.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 d6 7.O-O Re8 8.d3 a5 9.a3 White has a model Botvinnik setup. The fianchettoed bishop controls the long diagonal.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 5,
            }),
            buildLine({
                id: 'english-master-e5-fourknights',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights Master)',
                aliases: ['English e5 Four Knights master'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bb4', 'Nxc6', 'bxc6', 'g3', 'O-O', 'Bg2', 'd6'],
                prerequisites: ['english-expert-e5-fourknights-deep'],
                continuationIds: ['english-legend-e5-fourknights'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades on c6 to damage Black\'s structure.',
                    'Black recaptures with the b-pawn.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Bxc3 to win the bishop pair',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.d4 exd4 5.Nxd4 Bb4 6.Nxc6 bxc6 7.g3 O-O 8.Bg2 d6 White has a model Four Knights structure. The English rewards piece activity here.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'english-master-c5-hedgehog',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Hedgehog Master)',
                aliases: ['English c5 hedgehog master'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7', 'O-O', 'Be7', 'd4', 'cxd4', 'Nxd4', 'O-O', 'b3'],
                prerequisites: ['english-expert-c5-hedgehog-deep'],
                continuationIds: ['english-legend-c5-hedgehog'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'Black recaptures with ...cxd4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 e6 4.g3 b6 5.Bg2 Bb7 6.O-O Be7 7.d4 cxd4 8.Nxd4 O-O 9.b3 White strikes in the centre. The Hedgehog is a model of restraint.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'english-master-c5-symmetric',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric Master)',
                aliases: ['English c5 symmetric master'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4', 'e5', 'Nf3', 'd6', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2'],
                prerequisites: ['english-expert-c5-symmetric-deep'],
                continuationIds: ['english-legend-c5-symmetric'],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black replies ...e5 to challenge the centre.',
                    'White keeps a knight on c3.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 3.d4 cxd4 4.Nxd4 e5 5.Nf3 d6 6.Nc3 Nc6 7.g3 g6 8.Bg2 White keeps a flexible centre. The symmetric English with d4 is a model of restraint.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'english-master-Nf6-grunfeld',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Grünfeld Master)',
                aliases: ['English Nf6 Grünfeld master'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'Nf3', 'g6', 'g3', 'Bg7', 'Bg2', 'O-O', 'O-O', 'Nb6', 'b3', 'c5', 'Bb2'],
                prerequisites: ['english-expert-Nf6-grunfeld-deep'],
                continuationIds: ['english-legend-Nf6-grunfeld'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black reroutes the knight to b6 and plays ...c5.',
                    'White fianchettoes the queen\'s bishop with Bb2.',
                    'The position is a reversed Grünfeld.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 Bg7 6.Bg2 O-O 7.O-O Nb6 8.b3 c5 9.Bb2 White has a model Anglo-Grünfeld. The fianchetto keeps control.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'english-master-Nf6-c5-kid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (King\'s Indian Reversed Master)',
                aliases: ['English Nf6 c5 KID master'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'O-O', 'O-O', 'd4', 'cxd4', 'Nxd4', 'd6'],
                prerequisites: ['english-expert-Nf6-c5-kid-deep'],
                continuationIds: ['english-legend-Nf6-c5-kid'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'Black recaptures with ...cxd4 and plays ...d6.',
                    'The position is a reversed KID.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 g6 5.Bg2 Bg7 6.O-O O-O 7.d4 cxd4 8.Nxd4 d6 White strikes in the centre. The KID-reversed is a model of restraint.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'english-master-e6-qid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed Master)',
                aliases: ['English e6 e4 master'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'b6', 'e4', 'Bb7', 'Bd3', 'd6', 'O-O', 'Be7', 'Re1', 'Nbd7', 'e5'],
                prerequisites: ['english-expert-e6-qid-deep'],
                continuationIds: ['english-legend-e6-qid'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The e5 break gains space.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Rushing e4 without piece development',
                    'Allowing ...Bb4 to pin the knight'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 b6 4.e4 Bb7 5.Bd3 d6 6.O-O Be7 7.Re1 Nbd7 8.e5 White grabs a big centre. The Queen\'s-Indian-reversed setup rewards central control.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'english-master-e6-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Carlsbad Master)',
                aliases: ['English e6 Carlsbad master'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5', 'O-O', 'Qb3', 'Nc6', 'e3', 'Re8', 'Bd3', 'Rb8', 'O-O'],
                prerequisites: ['english-expert-e6-d4-deep'],
                continuationIds: ['english-legend-e6-d4'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The queen develops to b3, eyeing d5 and b7.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 O-O 7.Qb3 Nc6 8.e3 Re8 9.Bd3 Rb8 10.O-O White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'english-master-f5-dutch',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch Master)',
                aliases: ['English f5 master'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3', 'Be7', 'Bg2', 'O-O', 'O-O', 'd6', 'd4', 'Qe8'],
                prerequisites: ['english-expert-f5-dutch-deep'],
                continuationIds: ['english-legend-f5-dutch'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'White plays the thematic d4 break.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 Be7 5.Bg2 O-O 6.O-O d6 7.d4 Qe8 White strikes in the centre. The Anglo-Dutch is a model of restraint.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 2,
            }),
            buildLine({
                id: 'english-master-e5-e4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (a3, e4 Master)',
                aliases: ['English e5 a3 e4 master'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'a3', 'g6', 'e4', 'Bg7', 'd3', 'O-O', 'Be2', 'd6', 'O-O'],
                prerequisites: ['english-expert-e5-e4-deep'],
                continuationIds: ['english-legend-e5-e4'],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The bishop develops to e2.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Delaying e4 too long',
                    'Allowing ...d5 to challenge the centre'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.a3 g6 5.e4 Bg7 6.d3 O-O 7.Be2 d6 8.O-O White grabs a big centre. The reversed Sicilian with e4 is a model of central control.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 70,
                difficulty: 6,
                popularity: 2,
            }),
        ],
    },
    legend: {
        tier: 'Legend',
        lines: [
            buildLine({
                id: 'english-legend-e5-botvinnik',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Botvinnik Legend)',
                aliases: ['English e5 Botvinnik legend'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'g3', 'Bb4', 'Qc2', 'O-O', 'Bg2', 'd6', 'O-O', 'Re8', 'd3', 'a5', 'a3', 'Bxc3', 'Qxc3'],
                prerequisites: ['english-master-e5-botvinnik'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures on c3 with the queen.',
                    'The Botvinnik setup remains harmonious.',
                    'The position is positional.'
                ],
                commonMistakes: [
                    'Breaking the pin awkwardly',
                    'Allowing ...Bxc3 to damage the pawn structure'
                ],
                explanation: 'After 4.g3 Bb4 5.Qc2 O-O 6.Bg2 d6 7.O-O Re8 8.d3 a5 9.a3 Bxc3 10.Qxc3 White has a model Botvinnik setup. The fianchettoed bishop controls the long diagonal.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 5,
            }),
            buildLine({
                id: 'english-legend-e5-fourknights',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (Four Knights Legend)',
                aliases: ['English e5 Four Knights legend'],
                eco: 'A29',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'd4', 'exd4', 'Nxd4', 'Bb4', 'Nxc6', 'bxc6', 'g3', 'O-O', 'Bg2', 'd6', 'O-O'],
                prerequisites: ['english-master-e5-fourknights'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White trades on c6 to damage Black\'s structure.',
                    'Black recaptures with the b-pawn.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Allowing ...Bxc3 to win the bishop pair',
                    'Developing pieces passively'
                ],
                explanation: 'After 4.d4 exd4 5.Nxd4 Bb4 6.Nxc6 bxc6 7.g3 O-O 8.Bg2 d6 9.O-O White has a model Four Knights structure. The English rewards piece activity here.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'english-legend-c5-hedgehog',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Hedgehog Legend)',
                aliases: ['English c5 hedgehog legend'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'Nc3', 'e6', 'g3', 'b6', 'Bg2', 'Bb7', 'O-O', 'Be7', 'd4', 'cxd4', 'Nxd4', 'O-O', 'b3', 'd6'],
                prerequisites: ['english-master-c5-hedgehog'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'Black recaptures with ...cxd4.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 c5 2.Nf3 Nf6 3.Nc3 e6 4.g3 b6 5.Bg2 Bb7 6.O-O Be7 7.d4 cxd4 8.Nxd4 O-O 9.b3 d6 White strikes in the centre. The Hedgehog is a model of restraint.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'english-legend-c5-symmetric',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...c5 (Symmetric Legend)',
                aliases: ['English c5 symmetric legend'],
                eco: 'A30',
                sanMoves: ['c4', 'c5', 'Nf3', 'Nf6', 'd4', 'cxd4', 'Nxd4', 'e5', 'Nf3', 'd6', 'Nc3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'O-O'],
                prerequisites: ['english-master-c5-symmetric'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black replies ...e5 to challenge the centre.',
                    'White keeps a knight on c3.',
                    'The position is balanced.'
                ],
                commonMistakes: [
                    'Allowing ...d5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 Bg7 6.Bg2 O-O 7.O-O Nb6 8.b3 c5 9.Bb2 Nc6 White keeps a flexible centre with a reversed Grünfeld structure. The English rewards restraint and piece activity.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'english-legend-Nf6-grunfeld',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 (Anglo-Grünfeld Legend)',
                aliases: ['English Nf6 Grünfeld legend'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'd5', 'cxd5', 'Nxd5', 'Nf3', 'g6', 'g3', 'Bg7', 'Bg2', 'O-O', 'O-O', 'Nb6', 'b3', 'c5', 'Bb2', 'Nc6'],
                prerequisites: ['english-master-Nf6-grunfeld'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black reroutes the knight to b6 and plays ...c5.',
                    'White fianchettoes the queen\'s bishop with Bb2.',
                    'The position is a reversed Grünfeld.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 d5 3.cxd5 Nxd5 4.Nf3 g6 5.g3 Bg7 6.Bg2 O-O 7.O-O Nb6 8.b3 c5 9.Bb2 d6 White has a model Anglo-Grünfeld. The fianchetto keeps control.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'english-legend-Nf6-c5-kid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...Nf6 2...c5 (King\'s Indian Reversed Legend)',
                aliases: ['English Nf6 c5 KID legend'],
                eco: 'A11',
                sanMoves: ['c4', 'Nf6', 'Nc3', 'c5', 'Nf3', 'Nc6', 'g3', 'g6', 'Bg2', 'Bg7', 'O-O', 'O-O', 'd4', 'cxd4', 'Nxd4', 'd6', 'Nc2'],
                prerequisites: ['english-master-Nf6-c5-kid'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White plays the thematic d4 break.',
                    'The knight retreats to c2 to reroute via e3.',
                    'The position is a reversed KID.'
                ],
                commonMistakes: [
                    'Premature d4 without preparation',
                    'Allowing ...cxd4 to free Black\'s game'
                ],
                explanation: 'After 1.c4 Nf6 2.Nc3 c5 3.Nf3 Nc6 4.g3 g6 5.Bg2 Bg7 6.O-O O-O 7.d4 cxd4 8.Nxd4 d6 9.Nc2 White strikes in the centre. The KID-reversed is a model of restraint.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'english-legend-e6-qid',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Queen\'s Indian Reversed Legend)',
                aliases: ['English e6 e4 legend'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'b6', 'e4', 'Bb7', 'Bd3', 'd6', 'O-O', 'Be7', 'Re1', 'Nbd7', 'e5', 'dxe5', 'Nxe5'],
                prerequisites: ['english-master-e6-qid'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The e5 break wins a pawn temporarily.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Rushing e4 without piece development',
                    'Allowing ...Bb4 to pin the knight'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 b6 4.e4 Bb7 5.Bd3 d6 6.O-O Be7 7.Re1 Nbd7 8.e5 dxe5 9.Nxe5 White grabs a big centre. The Queen\'s-Indian-reversed setup rewards central control.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'english-legend-e6-d4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e6 (Carlsbad Legend)',
                aliases: ['English e6 Carlsbad legend'],
                eco: 'A30',
                sanMoves: ['c4', 'e6', 'Nc3', 'Nf6', 'Nf3', 'd5', 'cxd5', 'exd5', 'd4', 'Bd6', 'Bg5', 'O-O', 'Qb3', 'Nc6', 'e3', 'Re8', 'Bd3', 'Rb8', 'O-O', 'a6', 'Rfe1'],
                prerequisites: ['english-master-e6-d4'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a Carlsbad-style pawn chain.',
                    'The queen develops to b3, eyeing d5 and b7.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...c5 to free Black\'s game',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 e6 2.Nc3 Nf6 3.Nf3 d5 4.cxd5 exd5 5.d4 Bd6 6.Bg5 O-O 7.Qb3 Nc6 8.e3 Re8 9.Bd3 Rb8 10.O-O a6 11.Rfe1 White builds a Carlsbad structure. The English rewards piece activity here.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'english-legend-f5-dutch',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...f5 (Anglo-Dutch Legend)',
                aliases: ['English f5 legend'],
                eco: 'A10',
                sanMoves: ['c4', 'f5', 'Nc3', 'Nf6', 'Nf3', 'e6', 'g3', 'Be7', 'Bg2', 'O-O', 'O-O', 'd6', 'd4', 'Qe8', 'Qd3', 'Nc6'],
                prerequisites: ['english-master-f5-dutch'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides fianchetto and castle.',
                    'White plays the thematic d4 break.',
                    'The position is solid.'
                ],
                commonMistakes: [
                    'Allowing ...e5 to gain central space',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.c4 f5 2.Nc3 Nf6 3.Nf3 e6 4.g3 Be7 5.Bg2 O-O 6.O-O d6 7.d4 Qe8 8.Qd3 Nc6 White strikes in the centre. The Anglo-Dutch is a model of restraint.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 2,
            }),
            buildLine({
                id: 'english-legend-e5-e4',
                parentVariation: 'English Opening',
                variationName: 'English vs 1...e5 (a3, e4 Legend)',
                aliases: ['English e5 a3 e4 legend'],
                eco: 'A21',
                sanMoves: ['c4', 'e5', 'Nc3', 'Nf6', 'Nf3', 'Nc6', 'a3', 'g6', 'e4', 'Bg7', 'd3', 'O-O', 'Be2', 'd6', 'O-O', 'Nd7', 'b4'],
                prerequisites: ['english-master-e5-e4'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'space-advantage'],
                strategicIdeas: [
                    'White has a big central pawn mass.',
                    'The b4 push gains queenside space.',
                    'White has a pleasant space edge.'
                ],
                commonMistakes: [
                    'Delaying e4 too long',
                    'Allowing ...d5 to challenge the centre'
                ],
                explanation: 'After 1.c4 e5 2.Nc3 Nf6 3.Nf3 Nc6 4.a3 g6 5.e4 Bg7 6.d3 O-O 7.Be2 d6 8.O-O Nd7 9.b4 White grabs a big centre. The reversed Sicilian with e4 is a model of central control.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 80,
                difficulty: 7,
                popularity: 2,
            }),
        ],
    },
};

const metadata = {
    id: SLUG,
    name: 'English Opening',
    slug: SLUG,
    family: OPENING_FAMILY,
    colour: COLOUR,
    ecoRange: 'A10-A39',
    description: 'The English Opening is a flank opening beginning with 1.c4, controlling the d5 square from the wing. It leads to rich, flexible structures including the reversed Sicilian, symmetric English, Anglo-Indian, Queen\'s-Indian-reversed, and Anglo-Dutch setups. The English rewards piece activity, restraint, and a small but lasting space edge.',
    typicalPawnStructures: [
        'Symmetric English (pawns on c4/c5, d3/d6)',
        'Botvinnik setup (pawns on c4, d3, e3, g3)',
        'Carlsbad (pawns on c4, d4 vs c6, d5)',
        'IQP-style (pawns on c4, d4 vs c5, d5 after ...exd5)',
        'Big centre (pawns on c4, d4, e4)'
    ],
    commonTacticalThemes: [
        'Fianchetto pressure on the long diagonal',
        'Central breaks with d4',
        'Knight outposts on d5/e5',
        'Bishop pair after ...Bxc3',
        'Queenside expansion with b3-b4'
    ],
    modelPlayers: [
        'Magnus Carlsen',
        'Garry Kasparov',
        'Vladimir Kramnik',
        'Mikhail Botvinnik',
        'Tigran Petrosian'
    ],
    recommendedStudyOrder: [
        'Beginner: meet each Black reply (1...e5, 1...c5, 1...Nf6, 1...e6, 1...f5)',
        'Novice: adopt the Botvinnik / double-fianchetto setups',
        'Intermediate: learn the d4 central break and e4 big centre',
        'Advanced: complete development and castle in each structure',
        'Expert: handle ...Bb4 pins, ...cxd4 recaptures, and ...Nb6 reroutes',
        'Master: convert the small space edge with accurate piece play',
        'Legend: reach model middlegame positions with a lasting advantage'
    ],
    masteryLevels: [
        {
            tier: 'Beginner',
            xpReward: 100,
            accuracyTarget: 0.7,
            objectives: [
                'Recognise the English move 1.c4',
                'Understand the d5 control idea',
                'Meet the five main Black replies'
            ],
        },
        {
            tier: 'Novice',
            xpReward: 160,
            accuracyTarget: 0.72,
            objectives: [
                'Adopt the Botvinnik setup with g3 and Bg2',
                'Play the symmetric double fianchetto',
                'Strike with d4 against 1...c5'
            ],
        },
        {
            tier: 'Intermediate',
            xpReward: 240,
            accuracyTarget: 0.75,
            objectives: [
                'Build the Botvinnik system with Qc2',
                'Handle the Hedgehog and King\'s-Indian-reversed',
                'Play e4 for a big centre vs 1...e6'
            ],
        },
        {
            tier: 'Advanced',
            xpReward: 340,
            accuracyTarget: 0.78,
            objectives: [
                'Complete development and castle in each structure',
                'Execute the thematic d4 break',
                'Meet the Anglo-Grünfeld and Anglo-Dutch'
            ],
        },
        {
            tier: 'Expert',
            xpReward: 460,
            accuracyTarget: 0.8,
            objectives: [
                'Handle ...Bb4 pins and ...cxd4 recaptures',
                'Reroute pieces after ...Nb6 / ...Na5',
                'Convert the small space edge'
            ],
        },
        {
            tier: 'Master',
            xpReward: 600,
            accuracyTarget: 0.82,
            objectives: [
                'Reach model middlegame positions',
                'Use the e5 break for space',
                'Fianchetto the queen\'s bishop with Bb2'
            ],
        },
        {
            tier: 'Legend',
            xpReward: 800,
            accuracyTarget: 0.85,
            objectives: [
                'Convert the English to a lasting advantage',
                'Handle all of Black\'s main setups',
                'Demonstrate deep structural understanding'
            ],
        },
    ],
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

console.log('English Opening course generation complete!');


