/**
 * Generator for the Sicilian Defense (Black) opening course.
 *
 * Produces data/openings/black/sicilian-defense/ with:
 *   - metadata.json
 *   - beginner.json, novice.json, intermediate.json, advanced.json,
 *     expert.json, master.json, legend.json
 *
 * Built with the opening-course-generator skill:
 *   - buildLine / validateAllLines / writeCourse from scripts/opening-course-lib.js
 *   - Pre-flight legality check runs before any file is written.
 *
 * Every FEN / PGN / UCI is derived from chess.js so move legality is guaranteed.
 * Theory source: standard mainline Sicilian (Najdorf, Dragon, Sveshnikov,
 * Classical, Kan, Scheveningen, Accelerated Dragon, Rossolimo, Alapin, Closed).
 */
const { validateAllLines, writeCourse, countLines } = require('./opening-course-lib.js');

const OPENING_NAME = 'Sicilian Defense';
const SLUG = 'sicilian-defense';
const SIDE = 'black';
const ECO_RANGE = 'B20-B99';

const tiers = {
    beginner: {
        lines: [
            {
                id: 'sicilian-beginner-open',
                parentVariation: OPENING_NAME,
                variationName: 'Open Sicilian (start)',
                aliases: ['Open Sicilian'],
                eco: 'B27',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White strikes the centre with 1.e4 and 3.d4.',
                    'Black answers with 1...c5, the most popular reply to 1.e4.',
                    'The Open Sicilian is the critical test of the defence.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Developing pieces too slowly'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 we reach the Open Sicilian, the sharpest and most theoretical battleground of the Sicilian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            {
                id: 'sicilian-beginner-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian',
                aliases: ['Closed Sicilian'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6'],
                prerequisites: [],
                continuationIds: ['sicilian-novice-closed'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White avoids the Open Sicilian with 2.Nc3.',
                    'Black fianchettoes with ...g6 and ...Bg7.',
                    'The play is slow and manoeuvring.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 the Closed Sicilian steers the game into a quiet, manoeuvring battle rather than the razor-sharp Open Sicilian.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
            {
                id: 'sicilian-beginner-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (2.c3)',
                aliases: ['Alapin Sicilian', '2.c3 Sicilian'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5'],
                prerequisites: [],
                continuationIds: ['sicilian-novice-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White supports d4 with 2.c3, seeking a small centre.',
                    'Black plants a knight on d5 after 3.e5 Nd5.',
                    'The structure resembles an IQP for White.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 the Alapin (2.c3) aims for a modest central edge with a pawn on e5 and a knight on d5 for Black.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
            {
                id: 'sicilian-beginner-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (3.Bb5)',
                aliases: ['Rossolimo Attack'],
                eco: 'B30',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6'],
                prerequisites: [],
                continuationIds: ['sicilian-novice-rossolimo'],
                conceptIds: ['development', 'piece-activity', 'bishop-pair'],
                strategicIdeas: [
                    'White pins the c6 knight with 3.Bb5.',
                    'Black fianchettoes with 3...g6.',
                    'White often trades on c6 to damage Black\'s structure.'
                ],
                commonMistakes: [
                    'Letting Black untangle with ...g6 and ...Bg7',
                    'Losing time with the bishop'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 the Rossolimo pins the knight and discourages ...e5, often followed by Bxc6 to inflict doubled pawns.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'sicilian-beginner-bowdler',
                parentVariation: OPENING_NAME,
                variationName: 'Bowdler Attack (2.Bc4)',
                aliases: ['Bowdler Attack'],
                eco: 'B20',
                sanMoves: ['e4', 'c5', 'Bc4', 'Nc6', 'Nf3', 'e6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'White develops the bishop early with 2.Bc4.',
                    'Black completes development with ...Nc6 and ...e6.',
                    'A simple, less critical system.'
                ],
                commonMistakes: [
                    'Wasting the bishop with early sorties',
                    'Falling behind in development'
                ],
                explanation: 'After 1.e4 c5 2.Bc4 Nc6 3.Nf3 e6 the Bowdler Attack is a gentle sideline where White develops the bishop to c4 before committing in the centre.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 100,
                difficulty: 1,
                popularity: 2,
            },
        ],
    },
    novice: {
        lines: [
            {
                id: 'sicilian-novice-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf Variation',
                aliases: ['Najdorf Sicilian'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6'],
                prerequisites: [],
                continuationIds: ['sicilian-intermediate-najdorf'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black plays 5...a6, the Najdorf, the most respected Sicilian.',
                    'The move prepares ...e5 and ...b5 counterplay.',
                    'White must find a plan against Black\'s flexible setup.'
                ],
                commonMistakes: [
                    'Allowing ...e5 with a good centre for Black',
                    'Developing passively'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 the Najdorf arises — Black keeps maximum flexibility and prepares central and queenside counterplay.',
                reviewPriority: 6,
                estimatedStudyMinutes: 7,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'sicilian-novice-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon Variation',
                aliases: ['Dragon Sicilian'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6'],
                prerequisites: [],
                continuationIds: ['sicilian-intermediate-dragon'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black fianchettoes with 5...g6 and ...Bg7.',
                    'The Dragon bishop on g7 eyes the long diagonal.',
                    'Sharp Yugoslav Attack lines follow.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 the Dragon fianchettoes the bishop, creating a powerful long-diagonal battery but a slightly exposed king.',
                reviewPriority: 6,
                estimatedStudyMinutes: 7,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'sicilian-novice-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov Variation',
                aliases: ['Sveshnikov Sicilian', 'Lasker-Pelikan'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5'],
                prerequisites: [],
                continuationIds: ['sicilian-intermediate-sveshnikov'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black grabs the centre with 5...e5.',
                    'The d5 square becomes a key outpost.',
                    'White often jumps to b5 then retreats to c3.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 the Sveshnikov concedes a d5 outpost but gains a central pawn on e5 and active piece play.',
                reviewPriority: 6,
                estimatedStudyMinutes: 7,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'sicilian-novice-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Variation',
                aliases: ['Classical Sicilian'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6'],
                prerequisites: [],
                continuationIds: ['sicilian-intermediate-classical'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black develops naturally with ...Nc6, ...Nf6, ...d6.',
                    'A solid, flexible setup.',
                    'Transposes to many mainlines.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 the Classical Sicilian develops pieces harmoniously and can transpose to the Scheveningen or Richter-Rauzer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'sicilian-novice-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan Variation (Paulsen)',
                aliases: ['Kan Sicilian', 'Paulsen Variation'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6'],
                prerequisites: [],
                continuationIds: ['sicilian-intermediate-kan'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black plays 2...e6 then 4...a6, the Kan.',
                    'Flexible piece placement behind a solid pawn front.',
                    'Often transposes to the Scheveningen.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 the Kan (Paulsen) keeps pieces flexible behind a solid e6/a6 structure, often reaching Scheveningen-type positions.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'sicilian-novice-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (exchange)',
                aliases: ['Rossolimo Exchange'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6'],
                prerequisites: ['sicilian-beginner-rossolimo'],
                continuationIds: ['sicilian-intermediate-rossolimo'],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White trades 4.Bxc6 to inflict doubled c-pawns.',
                    'Black gains the bishop pair and a half-open b-file.',
                    'White keeps a small structural edge.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 White damages Black\'s pawn structure, accepting that Black gains the bishop pair and activity.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'sicilian-novice-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (mainline)',
                aliases: ['Alapin Sicilian mainline'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6'],
                prerequisites: ['sicilian-beginner-alapin'],
                continuationIds: ['sicilian-intermediate-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a pawn centre with d4.',
                    'Black challenges with 5...d6 hitting the e5 pawn.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 the Alapin reaches a centre with pawns on d4 and e5, giving White a space edge and Black a target.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'sicilian-novice-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (open centre)',
                aliases: ['Closed Sicilian mainline'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4'],
                prerequisites: ['sicilian-beginner-closed'],
                continuationIds: ['sicilian-intermediate-closed'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White opens the centre with 4.d4.',
                    'Black recaptures and fianchettoes.',
                    'A hybrid of Closed and Open Sicilian ideas.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 the Closed Sicilian transposes to an open centre while keeping Black\'s kingside fianchetto.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
        ],
    },
    intermediate: {
        lines: [
            {
                id: 'sicilian-intermediate-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf (6.Be3 e5)',
                aliases: ['Najdorf 6.Be3'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5'],
                prerequisites: ['sicilian-novice-najdorf'],
                continuationIds: ['sicilian-advanced-najdorf'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops the bishop with 6.Be3.',
                    'Black strikes the centre with 6...e5.',
                    'A tense battle for the d5 square.'
                ],
                commonMistakes: [
                    'Allowing ...e5 with a good centre for Black',
                    'Misplacing the bishop on e3'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 Black grabs the centre, and White must find active piece play against it.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'sicilian-intermediate-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon (6.Be3 Bg7)',
                aliases: ['Dragon 6.Be3'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7'],
                prerequisites: ['sicilian-novice-dragon'],
                continuationIds: ['sicilian-advanced-dragon'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 6.Be3, eyeing the kingside.',
                    'Black completes the fianchetto with 6...Bg7.',
                    'The Yugoslav Attack (f3, Qd2, O-O-O) follows.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 the Dragon is set; White typically launches the Yugoslav Attack with f3, Qd2 and O-O-O.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'sicilian-intermediate-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov (6.Ndb5 d6)',
                aliases: ['Sveshnikov 6.Nb5'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6'],
                prerequisites: ['sicilian-novice-sveshnikov'],
                continuationIds: ['sicilian-advanced-sveshnikov'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White jumps 6.Ndb5, heading to d5 or c3.',
                    'Black supports with 6...d6.',
                    'The d5 outpost is the focal point.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6 White probes the d5 square; the knight usually retreats to c3 after ...a6 or ...Bd7.',
                reviewPriority: 6,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'sicilian-intermediate-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (6.Be2 e6)',
                aliases: ['Classical 6.Be2'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6', 'Be2', 'e6'],
                prerequisites: ['sicilian-novice-classical'],
                continuationIds: ['sicilian-advanced-classical'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 6.Be2, preparing to castle.',
                    'Black solidifies with 6...e6.',
                    'Transposes to the Scheveningen.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 6.Be2 e6 the Classical Sicilian often transposes to the Scheveningen with a solid, flexible structure.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'sicilian-intermediate-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan (6.Be2 d6)',
                aliases: ['Kan 6.Be2'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Nc3', 'Nc6', 'Be2', 'd6'],
                prerequisites: ['sicilian-novice-kan'],
                continuationIds: ['sicilian-advanced-kan'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 6.Be2, preparing to castle.',
                    'Black completes development with ...Nc6 and ...d6.',
                    'A Scheveningen-like structure results.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 5.Nc3 Nc6 6.Be2 d6 the Kan reaches a Scheveningen-style position with the bishop on e7 to come.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'sicilian-intermediate-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (development)',
                aliases: ['Rossolimo development'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6', 'd3', 'Bg7'],
                prerequisites: ['sicilian-novice-rossolimo'],
                continuationIds: ['sicilian-advanced-rossolimo'],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White develops 5.d3 after the exchange.',
                    'Black fianchettoes with 5...Bg7.',
                    'White keeps a small structural edge.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 5.d3 Bg7 White develops calmly, relying on the slightly improved pawn structure.',
                reviewPriority: 4,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'sicilian-intermediate-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (6.Nf3 e6)',
                aliases: ['Alapin 6.Nf3'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6', 'Nf3', 'e6'],
                prerequisites: ['sicilian-novice-alapin'],
                continuationIds: ['sicilian-advanced-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 6.Nf3, supporting the centre.',
                    'Black plays 6...e6, challenging e5.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 6.Nf3 e6 White keeps a space-gaining centre while Black prepares to undermine it.',
                reviewPriority: 4,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'sicilian-intermediate-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (6.Nxc6)',
                aliases: ['Closed Sicilian 6.Nxc6'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nxc6', 'bxc6'],
                prerequisites: ['sicilian-novice-closed'],
                continuationIds: ['sicilian-advanced-closed'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White trades 6.Nxc6 to damage Black\'s pawns.',
                    'Black recaptures 6...bxc6, gaining the bishop pair.',
                    'A manoeuvring middlegame follows.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 Bg7 6.Nxc6 bxc6 White trades to inflict doubled pawns, accepting Black\'s bishop pair.',
                reviewPriority: 4,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'sicilian-intermediate-scheveningen',
                parentVariation: OPENING_NAME,
                variationName: 'Scheveningen (6.Be2 Be7)',
                aliases: ['Scheveningen Variation'],
                eco: 'B80',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7'],
                prerequisites: [],
                continuationIds: ['sicilian-advanced-scheveningen'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black sets up the Scheveningen with ...e6 and ...Be7.',
                    'A solid, resilient structure.',
                    'White often plays f4 with a pawn storm.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 6.Be2 Be7 the Scheveningen is a rock-solid setup that can also arise from the Classical move order.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'sicilian-intermediate-accelerated-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Accelerated Dragon (6.Be3 Nf6)',
                aliases: ['Accelerated Dragon'],
                eco: 'B35',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'Nc3', 'Bg7', 'Be3', 'Nf6'],
                prerequisites: [],
                continuationIds: ['sicilian-advanced-accelerated-dragon'],
                conceptIds: ['fianchetto', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black fianchettoes BEFORE playing ...d6 (accelerated).',
                    'Avoids the Yugoslav Attack move order.',
                    'White often plays Bc4 to prevent ...d6.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7 6.Be3 Nf6 the Accelerated Dragon delays ...d6 to dodge the Yugoslav Attack, but allows Bc4 ideas.',
                reviewPriority: 5,
                estimatedStudyMinutes: 7,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
        ],
    },
    advanced: {
        lines: [
            {
                id: 'sicilian-advanced-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf (7.Nf3 b5)',
                aliases: ['Najdorf 7.Nf3 b5'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nf3', 'b5'],
                prerequisites: ['sicilian-intermediate-najdorf'],
                continuationIds: ['sicilian-expert-najdorf'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White reroutes 7.Nf3, avoiding ...e5 tactics.',
                    'Black expands with 7...b5 on the queenside.',
                    'A sharp, double-edged middlegame.'
                ],
                commonMistakes: [
                    'Allowing ...b4 with a strong attack',
                    'Misplacing the knight on f3'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nf3 b5 Black gains queenside space while White keeps pieces ready to strike the centre.',
                reviewPriority: 7,
                estimatedStudyMinutes: 9,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'sicilian-advanced-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon (Yugoslav Attack)',
                aliases: ['Dragon Yugoslav Attack'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O'],
                prerequisites: ['sicilian-intermediate-dragon'],
                continuationIds: ['sicilian-expert-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White builds the Yugoslav Attack with f3 and O-O-O.',
                    'Black castles short, accepting a kingside target.',
                    'A classic opposite-side attack race.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O the Dragon Yugoslav Attack begins — White storms the kingside while Black counters on the queenside.',
                reviewPriority: 7,
                estimatedStudyMinutes: 9,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'sicilian-advanced-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov (7.Bf4 Be6)',
                aliases: ['Sveshnikov 7.Bf4'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bf4', 'Be6'],
                prerequisites: ['sicilian-intermediate-sveshnikov'],
                continuationIds: ['sicilian-expert-sveshnikov'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 7.Bf4, controlling d6 and e5.',
                    'Black supports with 7...e6.',
                    'The d5 outpost remains the key square.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6 7.Bf4 Be6 White develops actively, eyeing the d5 outpost and the e5 pawn.',
                reviewPriority: 7,
                estimatedStudyMinutes: 9,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'sicilian-advanced-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Be7)',
                aliases: ['Classical 7.O-O'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6', 'Be2', 'e6', 'O-O', 'Be7'],
                prerequisites: ['sicilian-intermediate-classical'],
                continuationIds: ['sicilian-expert-classical'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White castles 7.O-O, king safe.',
                    'Black completes with 7...Be7.',
                    'A model Scheveningen structure.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 6.Be2 e6 7.O-O Be7 both sides castle into a stable Scheveningen-type middlegame.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'sicilian-advanced-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan (7.O-O Be7)',
                aliases: ['Kan 7.O-O'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Nc3', 'Nc6', 'Be2', 'd6', 'O-O', 'Be7'],
                prerequisites: ['sicilian-intermediate-kan'],
                continuationIds: ['sicilian-expert-kan'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White castles 7.O-O.',
                    'Black completes with 7...Be7.',
                    'A Scheveningen-like structure results.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 5.Nc3 Nc6 6.Be2 d6 7.O-O Be7 the Kan reaches a solid Scheveningen-style position with both sides castled.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'sicilian-advanced-scheveningen',
                parentVariation: OPENING_NAME,
                variationName: 'Scheveningen (7.O-O O-O)',
                aliases: ['Scheveningen 7.O-O O-O'],
                eco: 'B80',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O'],
                prerequisites: ['sicilian-intermediate-scheveningen'],
                continuationIds: ['sicilian-expert-scheveningen'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides castle kingside.',
                    'White prepares f4 with a central pawn storm.',
                    'A tense, balanced middlegame.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 6.Be2 Be7 7.O-O O-O the Scheveningen sees both kings safe; White often launches f4 while Black seeks counterplay.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'sicilian-advanced-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (development)',
                aliases: ['Rossolimo advanced'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6', 'd3', 'Bg7', 'Nfd2', 'Nf6'],
                prerequisites: ['sicilian-intermediate-rossolimo'],
                continuationIds: ['sicilian-expert-rossolimo'],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White plays 5.d3, a quiet setup.',
                    'Black develops 5...Bg7 and ...Nf6.',
                    'White keeps a small structural edge.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 5.d3 Bg7 6.Nfd2 Nf6 White adopts a calm set-up, relying on the improved pawn structure and piece harmony.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'sicilian-advanced-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (7.Nxe5 Nd7)',
                aliases: ['Alapin 7.Nxe5'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6', 'Nf3', 'dxe5', 'Nxe5', 'Nd7'],
                prerequisites: ['sicilian-intermediate-alapin'],
                continuationIds: ['sicilian-expert-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White wins the e5 pawn with 7.Nxe5.',
                    'Black regains it with 7...Nd7 and ...Nxe5.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 6.Nf3 dxe5 7.Nxe5 Nd7 White wins a pawn temporarily; Black recovers it with ...Nxe5, reaching a balanced game.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'sicilian-advanced-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (7.g3 Nf6)',
                aliases: ['Closed Sicilian 7.g3'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nxc6', 'bxc6', 'g3', 'Nf6'],
                prerequisites: ['sicilian-intermediate-closed'],
                continuationIds: ['sicilian-expert-closed'],
                conceptIds: ['central-control', 'development', 'fianchetto'],
                strategicIdeas: [
                    'White fianchettoes with 7.g3.',
                    'Black develops 7...Nf6.',
                    'A slow, manoeuvring battle.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 Bg7 6.Nxc6 bxc6 7.g3 Nf6 White fianchettoes the bishop, aiming for a quiet but pleasant position.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'sicilian-advanced-accelerated-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Accelerated Dragon (7.Bc4 O-O)',
                aliases: ['Accelerated Dragon 7.Bc4'],
                eco: 'B35',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'Nc3', 'Bg7', 'Be3', 'Nf6', 'Bc4', 'O-O'],
                prerequisites: ['sicilian-intermediate-accelerated-dragon'],
                continuationIds: ['sicilian-expert-accelerated-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 7.Bc4, preventing ...d6.',
                    'Black castles 7...O-O.',
                    'White may later push d5 for an edge.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7 6.Be3 Nf6 7.Bc4 O-O White\'s bishop on c4 stops ...d6 and supports a possible d5 break.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'sicilian-advanced-hyperaccelerated',
                parentVariation: OPENING_NAME,
                variationName: 'Hyperaccelerated Dragon (7.Bc4 O-O)',
                aliases: ['Hyperaccelerated Dragon'],
                eco: 'B27',
                sanMoves: ['e4', 'c5', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nc3', 'Nc6', 'Be3', 'Nf6', 'Bc4', 'O-O'],
                prerequisites: [],
                continuationIds: ['sicilian-expert-hyperaccelerated'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'Black plays 2...g6 before developing the knight.',
                    'White develops 7.Bc4, preventing ...d6.',
                    'A flexible Dragon setup.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 g6 3.d4 cxd4 4.Nxd4 Bg7 5.Nc3 Nc6 6.Be3 Nf6 7.Bc4 O-O the Hyperaccelerated Dragon reaches a Dragon setup with the knight already on c6.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'sicilian-advanced-four-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Four Knights (7.O-O Be7)',
                aliases: ['Sicilian Four Knights'],
                eco: 'B40',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'Nc6', 'Nc3', 'a6', 'Be2', 'Nf6', 'O-O', 'Be7'],
                prerequisites: [],
                continuationIds: ['sicilian-expert-four-knights'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'Both sides develop knights naturally.',
                    'White castles 7.O-O.',
                    'A solid, symmetrical development.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6 5.Nc3 a6 6.Be2 Nf6 7.O-O Be7 the Four Knights Sicilian is a calm, balanced setup with both sides castled.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 340,
                difficulty: 5,
                popularity: 2,
            },
        ],
    },
    expert: {
        lines: [
            {
                id: 'sicilian-expert-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf (8.a4 b4)',
                aliases: ['Najdorf 8.a4 b4'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nf3', 'b5', 'a4', 'b4'],
                prerequisites: ['sicilian-advanced-najdorf'],
                continuationIds: ['sicilian-master-najdorf'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White challenges 8.a4, hitting the b5 pawn.',
                    'Black advances 8...b4, gaining queenside space.',
                    'The knight on c3 must reroute.'
                ],
                commonMistakes: [
                    'Allowing ...b4 with a strong attack',
                    'Misplacing the knight on f3'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nf3 b5 8.a4 b4 the Najdorf sharpens; Black gains queenside space and the c3 knight must find a new home.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'sicilian-expert-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon (Yugoslav, 9.Qd2 Nc6)',
                aliases: ['Dragon Yugoslav 9.Qd2'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6'],
                prerequisites: ['sicilian-advanced-dragon'],
                continuationIds: ['sicilian-master-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White completes the Yugoslav with 9.Qd2.',
                    'Black develops 9...Nc6.',
                    'The attack on the kingside builds.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 the Dragon Yugoslav Attack is fully formed, with White ready to castle long and storm the king.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'sicilian-expert-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov (8.Nd4 Nxd4)',
                aliases: ['Sveshnikov 8.N5c3'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bf4', 'Be6', 'Nd4', 'Nxd4', 'Qxd4', 'a6'],
                prerequisites: ['sicilian-advanced-sveshnikov'],
                continuationIds: ['sicilian-master-sveshnikov'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White retreats 8.N5c3, keeping the d5 square.',
                    'Black develops 8...Be7.',
                    'A tense middlegame around d5.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6 7.Bf4 Be6 8.Nd4 Nxd4 9.Qxd4 a6 White keeps a knight ready for d5 while Black completes development.',
                reviewPriority: 7,
                estimatedStudyMinutes: 10,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'sicilian-expert-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.f4 O-O)',
                aliases: ['Classical 8.f4'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6', 'Be2', 'e6', 'O-O', 'Be7', 'f4', 'O-O'],
                prerequisites: ['sicilian-advanced-classical'],
                continuationIds: ['sicilian-master-classical'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 8.f4, grabbing central space.',
                    'Black castles 8...O-O.',
                    'A Richter-Rauzer style structure.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 6.Be2 e6 7.O-O Be7 8.f4 O-O White seizes space with f4 in a Scheveningen-type middlegame.',
                reviewPriority: 5,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'sicilian-expert-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan (8.f4 Nf6)',
                aliases: ['Kan 8.f4'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Nc3', 'Nc6', 'Be2', 'd6', 'O-O', 'Be7', 'f4', 'Nf6'],
                prerequisites: ['sicilian-advanced-kan'],
                continuationIds: ['sicilian-master-kan'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 8.f4, grabbing central space.',
                    'Black develops 8...Nf6.',
                    'A Scheveningen-like structure results.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 5.Nc3 Nc6 6.Be2 d6 7.O-O Be7 8.f4 Nf6 the Kan reaches a Scheveningen-style position with White pushing f4 and Black developing.',
                reviewPriority: 5,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'sicilian-expert-scheveningen',
                parentVariation: OPENING_NAME,
                variationName: 'Scheveningen (8.f4 Nc6)',
                aliases: ['Scheveningen 8.f4'],
                eco: 'B80',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O', 'f4', 'Nc6'],
                prerequisites: ['sicilian-advanced-scheveningen'],
                continuationIds: ['sicilian-master-scheveningen'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 8.f4, starting a pawn storm.',
                    'Black develops 8...Nc6.',
                    'A tense, balanced middlegame.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 6.Be2 Be7 7.O-O O-O 8.f4 Nc6 White begins the f4 pawn storm while Black completes development in the Scheveningen.',
                reviewPriority: 5,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'sicilian-expert-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (9.Re1 d6)',
                aliases: ['Rossolimo 9.Re1'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6', 'd3', 'Bg7', 'Nfd2', 'Nf6', 'O-O', 'O-O', 'Re1', 'd6'],
                prerequisites: ['sicilian-advanced-rossolimo'],
                continuationIds: ['sicilian-master-rossolimo'],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White centralises the rook with 9.Re1.',
                    'Black supports with 9...d6.',
                    'White keeps a small structural edge.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 5.d3 Bg7 6.Nfd2 Nf6 7.O-O O-O 8.Re1 d6 White improves the rook on the e-file, maintaining a slight structural plus.',
                reviewPriority: 4,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'sicilian-expert-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (8.Nxd7 Bxd7)',
                aliases: ['Alapin 8.Nxd7'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6', 'Nf3', 'dxe5', 'Nxe5', 'Nd7', 'Nxd7', 'Bxd7'],
                prerequisites: ['sicilian-advanced-alapin'],
                continuationIds: ['sicilian-master-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White trades 8.Nxd7, simplifying.',
                    'Black recaptures 8...Bxd7.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 6.Nf3 dxe5 7.Nxe5 Nd7 8.Nxd7 Bxd7 White simplifies, reaching a balanced middlegame with a modest centre.',
                reviewPriority: 4,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'sicilian-expert-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (8.Bg2 O-O)',
                aliases: ['Closed Sicilian 9.Bg2'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nxc6', 'bxc6', 'g3', 'Nf6', 'Bg2', 'O-O'],
                prerequisites: ['sicilian-advanced-closed'],
                continuationIds: ['sicilian-master-closed'],
                conceptIds: ['central-control', 'development', 'fianchetto'],
                strategicIdeas: [
                    'White completes the fianchetto with 9.Bg2.',
                    'Black castles 8...O-O after ...Nf6.',
                    'A slow, manoeuvring battle.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 Bg7 6.Nxc6 bxc6 7.g3 Nf6 8.Bg2 O-O White has a harmonious fianchetto setup in the Closed Sicilian.',
                reviewPriority: 4,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'sicilian-expert-accelerated-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Accelerated Dragon (9.Bb3 d6)',
                aliases: ['Accelerated Dragon 9.Bb3'],
                eco: 'B35',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'Nc3', 'Bg7', 'Be3', 'Nf6', 'Bc4', 'O-O', 'Bb3', 'd6'],
                prerequisites: ['sicilian-advanced-accelerated-dragon'],
                continuationIds: ['sicilian-master-accelerated-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White retreats 9.Bb3, keeping the bishop.',
                    'Black plays 9...d6, now possible.',
                    'White may push d5 for an edge.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7 6.Be3 Nf6 7.Bc4 O-O 8.Bb3 d6 White keeps the bishop on b3 and may later play d5 to fight for the centre.',
                reviewPriority: 5,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'sicilian-expert-hyperaccelerated',
                parentVariation: OPENING_NAME,
                variationName: 'Hyperaccelerated Dragon (9.Bb3 d6)',
                aliases: ['Hyperaccelerated Dragon 9.Bb3'],
                eco: 'B27',
                sanMoves: ['e4', 'c5', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nc3', 'Nc6', 'Be3', 'Nf6', 'Bc4', 'O-O', 'Bb3', 'd6'],
                prerequisites: ['sicilian-advanced-hyperaccelerated'],
                continuationIds: ['sicilian-master-accelerated-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White retreats 9.Bb3, keeping the bishop.',
                    'Black plays 9...d6, now possible.',
                    'A flexible Dragon setup.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 g6 3.d4 cxd4 4.Nxd4 Bg7 5.Nc3 Nc6 6.Be3 Nf6 7.Bc4 O-O 8.Bb3 d6 the Hyperaccelerated Dragon reaches a Dragon setup with the bishop safely on b3.',
                reviewPriority: 5,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'sicilian-expert-four-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Four Knights (8.f4 O-O)',
                aliases: ['Sicilian Four Knights 8.f4'],
                eco: 'B40',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'Nc6', 'Nc3', 'a6', 'Be2', 'Nf6', 'O-O', 'Be7', 'f4', 'O-O'],
                prerequisites: ['sicilian-advanced-four-knights'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 8.f4, grabbing central space.',
                    'Black castles 8...O-O.',
                    'A solid, symmetrical development.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 Nc6 5.Nc3 a6 6.Be2 Nf6 7.O-O Be7 8.f4 O-O the Four Knights Sicilian reaches a calm middlegame with both sides castled and White pushing f4.',
                reviewPriority: 4,
                estimatedStudyMinutes: 9,
                masteryXp: 460,
                difficulty: 6,
                popularity: 2,
            },
        ],
    },
    master: {
        lines: [
            {
                id: 'sicilian-master-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf (9.Nd5 Nxd5)',
                aliases: ['Najdorf 9.Nd5'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nf3', 'b5', 'a4', 'b4', 'Nd5', 'Nxd5'],
                prerequisites: ['sicilian-expert-najdorf'],
                continuationIds: ['sicilian-legend-najdorf'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White jumps 9.Nd5 into the centre.',
                    'Black trades 9...Nxd5, then ...exd5.',
                    'A sharp, concrete battle.'
                ],
                commonMistakes: [
                    'Allowing ...b4 with a strong attack',
                    'Misplacing the knight on f3'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nf3 b5 8.a4 b4 9.Nd5 Nxd5 the Najdorf reaches a critical position where Black recaptures and fights for the centre.',
                reviewPriority: 8,
                estimatedStudyMinutes: 11,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'sicilian-master-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon (Yugoslav, 9.O-O-O Nxd4)',
                aliases: ['Dragon Yugoslav 9.O-O-O'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6', 'O-O-O', 'Nxd4'],
                prerequisites: ['sicilian-expert-dragon'],
                continuationIds: ['sicilian-legend-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White castles long with 9.O-O-O.',
                    'Black trades 9...Nxd4, then ...Bxd4.',
                    'The attack on the kingside peaks.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.O-O-O Nxd4 the Dragon Yugoslav Attack sees White castling into the attack while Black trades on d4.',
                reviewPriority: 8,
                estimatedStudyMinutes: 11,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'sicilian-master-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov (9.Qxd4 Be7)',
                aliases: ['Sveshnikov 9.Qxd4'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bf4', 'Be6', 'Nd4', 'Nxd4', 'Qxd4', 'Be7'],
                prerequisites: ['sicilian-expert-sveshnikov'],
                continuationIds: ['sicilian-legend-sveshnikov'],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White recaptures 9.Qxd4, centralising the queen.',
                    'Black develops 9...Be7, preparing to castle.',
                    'A tense middlegame around d5.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6 7.Bf4 Be6 8.Nd4 Nxd4 9.Qxd4 Be7 the Sveshnikov reaches a rich middlegame with both sides developed.',
                reviewPriority: 7,
                estimatedStudyMinutes: 11,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'sicilian-master-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (9.Bf3 Nxd4)',
                aliases: ['Classical 9.Bf3'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6', 'Be2', 'e6', 'O-O', 'Be7', 'f4', 'O-O', 'Bf3', 'Nxd4'],
                prerequisites: ['sicilian-expert-classical'],
                continuationIds: ['sicilian-legend-classical'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White reroutes 9.Bf3, eyeing the kingside.',
                    'Black trades 9...Nxd4, then ...Bxd4.',
                    'A Richter-Rauzer style structure.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 6.Be2 e6 7.O-O Be7 8.f4 O-O 9.Bf3 Nxd4 the Classical Sicilian sees White reroute the bishop and Black trade on d4.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'sicilian-master-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan (9.Bf3 Nxd4)',
                aliases: ['Kan 9.Bf3'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Nc3', 'Nc6', 'Be2', 'd6', 'O-O', 'Be7', 'f4', 'Nf6', 'Bf3', 'Nxd4'],
                prerequisites: ['sicilian-expert-kan'],
                continuationIds: ['sicilian-legend-kan'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White reroutes 9.Bf3, eyeing the kingside.',
                    'Black trades 9...Nxd4, then ...Bxd4.',
                    'A Scheveningen-like structure results.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 5.Nc3 Nc6 6.Be2 d6 7.O-O Be7 8.f4 Nf6 9.Bf3 Nxd4 the Kan reaches a Scheveningen-style position with the bishop rerouted to f3.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'sicilian-master-scheveningen',
                parentVariation: OPENING_NAME,
                variationName: 'Scheveningen (9.Be3 Nxd4)',
                aliases: ['Scheveningen 9.Be3'],
                eco: 'B80',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O', 'f4', 'Nc6', 'Be3', 'Nxd4'],
                prerequisites: ['sicilian-expert-scheveningen'],
                continuationIds: ['sicilian-legend-scheveningen'],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White develops 9.Be3, supporting the centre.',
                    'Black trades 9...Nxd4, then ...Bxd4.',
                    'A tense, balanced middlegame.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 6.Be2 Be7 7.O-O O-O 8.f4 Nc6 9.Be3 Nxd4 the Scheveningen sees White bolster the centre and Black trade on d4.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'sicilian-master-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (9.e5 dxe5)',
                aliases: ['Rossolimo 9.e5'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6', 'd3', 'Bg7', 'Nfd2', 'Nf6', 'O-O', 'O-O', 'Re1', 'd6', 'e5', 'dxe5'],
                prerequisites: ['sicilian-expert-rossolimo'],
                continuationIds: ['sicilian-legend-rossolimo'],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White plays 9.e5, striking the centre.',
                    'Black captures 9...dxe5.',
                    'White keeps a small structural edge.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 5.d3 Bg7 6.Nfd2 Nf6 7.O-O O-O 8.Re1 d6 9.e5 dxe5 White opens the centre, relying on the improved pawn structure.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'sicilian-master-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (9.Be2 e6)',
                aliases: ['Alapin 9.Be2'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6', 'Nf3', 'dxe5', 'Nxe5', 'Nd7', 'Nxd7', 'Bxd7', 'Be2', 'e6'],
                prerequisites: ['sicilian-expert-alapin'],
                continuationIds: ['sicilian-legend-alapin'],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 9.Be2, preparing to castle.',
                    'Black supports with 9...e6.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 6.Nf3 dxe5 7.Nxe5 Nd7 8.Nxd7 Bxd7 9.Be2 e6 White develops calmly, keeping a modest centre in the Alapin.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'sicilian-master-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (9.Qd2 d6)',
                aliases: ['Closed Sicilian 9.Qd2'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nxc6', 'bxc6', 'g3', 'Nf6', 'Bg2', 'O-O', 'Qd2', 'd6'],
                prerequisites: ['sicilian-expert-closed'],
                continuationIds: ['sicilian-legend-closed'],
                conceptIds: ['central-control', 'development', 'fianchetto'],
                strategicIdeas: [
                    'White centralises with 9.Qd2.',
                    'Black supports with 9...d6.',
                    'A slow, manoeuvring battle.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 Bg7 6.Nxc6 bxc6 7.g3 Nf6 8.Bg2 O-O 9.Qd2 d6 White centralises the queen, aiming for a quiet but pleasant position.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'sicilian-master-accelerated-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Accelerated Dragon (9.f4 Nxd4)',
                aliases: ['Accelerated Dragon 9.f4'],
                eco: 'B35',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'Nc3', 'Bg7', 'Be3', 'Nf6', 'Bc4', 'O-O', 'Bb3', 'd6', 'f4', 'Nxd4'],
                prerequisites: ['sicilian-expert-accelerated-dragon'],
                continuationIds: ['sicilian-legend-accelerated-dragon'],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White plays 9.f4, grabbing central space.',
                    'Black trades 9...Nxd4, then ...Bxd4.',
                    'White may push d5 for an edge.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7 6.Be3 Nf6 7.Bc4 O-O 8.Bb3 d6 9.f4 Nxd4 the Accelerated Dragon sees White push f4 and Black trade on d4.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
        ],
    },
    legend: {
        lines: [
            {
                id: 'sicilian-legend-najdorf',
                parentVariation: OPENING_NAME,
                variationName: 'Najdorf (10.exd5 Qa5)',
                aliases: ['Najdorf 10.exd5'],
                eco: 'B90',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'a6', 'Be3', 'e5', 'Nf3', 'b5', 'a4', 'b4', 'Nd5', 'Nxd5', 'exd5', 'Qa5'],
                prerequisites: ['sicilian-master-najdorf'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White recaptures 10.exd5, opening the e-file.',
                    'Black attacks the d5 pawn with 10...Qa5.',
                    'A deep, concrete Najdorf battle.'
                ],
                commonMistakes: [
                    'Allowing ...b4 with a strong attack',
                    'Misplacing the knight on f3'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nf3 b5 8.a4 b4 9.Nd5 Nxd5 10.exd5 Qa5 the Najdorf reaches a sharp position where Black\'s queen attacks the d5 pawn and the centre is tense.',
                reviewPriority: 8,
                estimatedStudyMinutes: 13,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'sicilian-legend-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Dragon (Yugoslav, 10.Bxd4 Be6)',
                aliases: ['Dragon Yugoslav 10.Bxd4'],
                eco: 'B70',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'g6', 'Be3', 'Bg7', 'f3', 'O-O', 'Qd2', 'Nc6', 'O-O-O', 'Nxd4', 'Bxd4', 'Be6'],
                prerequisites: ['sicilian-master-dragon'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 10.Bxd4, then ...Be6 develops.',
                    'The attack on the black king peaks.',
                    'A classic opposite-side attack race.'
                ],
                commonMistakes: [
                    'Weakening the kingside with premature ...h5',
                    'Allowing White a crushing attack'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 g6 6.Be3 Bg7 7.f3 O-O 8.Qd2 Nc6 9.O-O-O Nxd4 10.Bxd4 Be6 the Dragon Yugoslav Attack is a ferocious opposite-side attack where White storms the black king.',
                reviewPriority: 8,
                estimatedStudyMinutes: 13,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'sicilian-legend-sveshnikov',
                parentVariation: OPENING_NAME,
                variationName: 'Sveshnikov (10.Be2 O-O)',
                aliases: ['Sveshnikov 10.Be2'],
                eco: 'B33',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e5', 'Ndb5', 'd6', 'Bf4', 'Be6', 'Nd4', 'Nxd4', 'Qxd4', 'Be7', 'Be2', 'O-O'],
                prerequisites: ['sicilian-master-sveshnikov'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 10.Be2, preparing to castle.',
                    'Black castles 10...O-O, king safe.',
                    'A tense middlegame around d5.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on d5',
                    'Underestimating White\'s piece activity'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e5 6.Ndb5 d6 7.Bf4 Be6 8.Nd4 Nxd4 9.Qxd4 Be7 10.Be2 O-O the Sveshnikov reaches a deeply theoretical middlegame with both sides castled.',
                reviewPriority: 7,
                estimatedStudyMinutes: 13,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'sicilian-legend-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (10.Qxd4 e5)',
                aliases: ['Classical 10.Bxd4'],
                eco: 'B58',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'd6', 'Be2', 'e6', 'O-O', 'Be7', 'f4', 'O-O', 'Bf3', 'Nxd4', 'Qxd4', 'e5'],
                prerequisites: ['sicilian-master-classical'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 10.Qxd4, then ...e5.',
                    'Black strikes the centre, freeing the bishop.',
                    'A Richter-Rauzer style structure.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 d6 6.Be2 e6 7.O-O Be7 8.f4 O-O 9.Bf3 Nxd4 10.Qxd4 e5 the Classical Sicilian sees Black free the bishop with ...e5 in a balanced middlegame.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'sicilian-legend-kan',
                parentVariation: OPENING_NAME,
                variationName: 'Kan (10.Qxd4 e5)',
                aliases: ['Kan 10.Bxd4'],
                eco: 'B41',
                sanMoves: ['e4', 'c5', 'Nf3', 'e6', 'd4', 'cxd4', 'Nxd4', 'a6', 'Nc3', 'Nc6', 'Be2', 'd6', 'O-O', 'Be7', 'f4', 'Nf6', 'Bf3', 'Nxd4', 'Qxd4', 'e5'],
                prerequisites: ['sicilian-master-kan'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 10.Qxd4, then ...e5.',
                    'Black strikes the centre, freeing the bishop.',
                    'A Scheveningen-like structure results.'
                ],
                commonMistakes: [
                    'Allowing White a strong central pawn on d4',
                    'Premature ...b5 weakening the queenside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 e6 3.d4 cxd4 4.Nxd4 a6 5.Nc3 Nc6 6.Be2 d6 7.O-O Be7 8.f4 Nf6 9.Bf3 Nxd4 10.Qxd4 e5 the Kan reaches a Scheveningen-style position with the bishop rerouted and ...e5 freeing Black.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'sicilian-legend-scheveningen',
                parentVariation: OPENING_NAME,
                variationName: 'Scheveningen (10.Bxd4 e5)',
                aliases: ['Scheveningen 10.Bxd4'],
                eco: 'B80',
                sanMoves: ['e4', 'c5', 'Nf3', 'd6', 'd4', 'cxd4', 'Nxd4', 'Nf6', 'Nc3', 'e6', 'Be2', 'Be7', 'O-O', 'O-O', 'f4', 'Nc6', 'Be3', 'Nxd4', 'Bxd4', 'e5'],
                prerequisites: ['sicilian-master-scheveningen'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 10.Bxd4, then ...e5.',
                    'Black strikes the centre, freeing the bishop.',
                    'A tense, balanced middlegame.'
                ],
                commonMistakes: [
                    'Allowing White a free central pawn on d4',
                    'Passive piece placement'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 e6 6.Be2 Be7 7.O-O O-O 8.f4 Nc6 9.Be3 Nxd4 10.Bxd4 e5 the Scheveningen sees Black free the bishop with ...e5 in a balanced middlegame.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'sicilian-legend-rossolimo',
                parentVariation: OPENING_NAME,
                variationName: 'Rossolimo (10.c3 e5)',
                aliases: ['Rossolimo 10.c3'],
                eco: 'B31',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'Bb5', 'g6', 'Bxc6', 'bxc6', 'd3', 'Bg7', 'Nfd2', 'Nf6', 'O-O', 'O-O', 'Re1', 'd6', 'd4', 'cxd4', 'c3', 'dxc3', 'Nxc3', 'e5'],
                prerequisites: ['sicilian-master-rossolimo'],
                continuationIds: [],
                conceptIds: ['bishop-pair', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White strikes the centre with 9.d4.',
                    'After 9...cxd4, 10.c3 challenges the pawn and regains material with 10...dxc3 11.Nxc3.',
                    'White keeps a harmonious position with the bishop pair and central control.'
                ],
                commonMistakes: [
                    'Letting Black consolidate the bishop pair',
                    'Underestimating Black\'s central pawns'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.Bb5 g6 4.Bxc6 bxc6 5.d3 Bg7 6.Nfd2 Nf6 7.O-O O-O 8.Re1 d6 9.d4 cxd4 10.c3 dxc3 11.Nxc3 e5 White regains the pawn and keeps a harmonious position in the Rossolimo.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'sicilian-legend-alapin',
                parentVariation: OPENING_NAME,
                variationName: 'Alapin (10.O-O Bd6)',
                aliases: ['Alapin 10.O-O'],
                eco: 'B22',
                sanMoves: ['e4', 'c5', 'c3', 'Nf6', 'e5', 'Nd5', 'd4', 'cxd4', 'cxd4', 'd6', 'Nf3', 'dxe5', 'Nxe5', 'Nd7', 'Nxd7', 'Bxd7', 'Be2', 'e6', 'O-O', 'Bd6'],
                prerequisites: ['sicilian-master-alapin'],
                continuationIds: [],
                conceptIds: ['central-control', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White castles 10.O-O, king safe.',
                    'Black develops 10...Bd6, eyeing the kingside.',
                    'An IQP-style structure can arise.'
                ],
                commonMistakes: [
                    'Allowing Black to trade and equalise',
                    'Overextending the e5 pawn'
                ],
                explanation: 'After 1.e4 c5 2.c3 Nf6 3.e5 Nd5 4.d4 cxd4 5.cxd4 d6 6.Nf3 dxe5 7.Nxe5 Nd7 8.Nxd7 Bxd7 9.Be2 e6 10.O-O Bd6 the Alapin reaches a calm middlegame with both sides castled.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'sicilian-legend-closed',
                parentVariation: OPENING_NAME,
                variationName: 'Closed Sicilian (10.b3 e5)',
                aliases: ['Closed Sicilian 10.b3'],
                eco: 'B23',
                sanMoves: ['e4', 'c5', 'Nc3', 'Nc6', 'Nf3', 'g6', 'd4', 'cxd4', 'Nxd4', 'Bg7', 'Nxc6', 'bxc6', 'g3', 'Nf6', 'Bg2', 'O-O', 'Qd2', 'd6', 'b3', 'e5'],
                prerequisites: ['sicilian-master-closed'],
                continuationIds: [],
                conceptIds: ['central-control', 'development', 'fianchetto'],
                strategicIdeas: [
                    'White plays 10.b3, completing the fianchetto setup.',
                    'Black strikes 10...e5, freeing the position.',
                    'A slow, manoeuvring battle.'
                ],
                commonMistakes: [
                    'Rushing central breaks before development',
                    'Neglecting the kingside fianchetto'
                ],
                explanation: 'After 1.e4 c5 2.Nc3 Nc6 3.Nf3 g6 4.d4 cxd4 5.Nxd4 Bg7 6.Nxc6 bxc6 7.g3 Nf6 8.Bg2 O-O 9.Qd2 d6 10.b3 e5 the Closed Sicilian reaches a harmonious setup with both sides castled and Black freeing the centre.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'sicilian-legend-accelerated-dragon',
                parentVariation: OPENING_NAME,
                variationName: 'Accelerated Dragon (10.Bxd4 e5)',
                aliases: ['Accelerated Dragon 10.Bxd4'],
                eco: 'B35',
                sanMoves: ['e4', 'c5', 'Nf3', 'Nc6', 'd4', 'cxd4', 'Nxd4', 'g6', 'Nc3', 'Bg7', 'Be3', 'Nf6', 'Bc4', 'O-O', 'Bb3', 'd6', 'f4', 'Nxd4', 'Bxd4', 'e5'],
                prerequisites: ['sicilian-master-accelerated-dragon'],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 10.Bxd4, then ...e5.',
                    'Black strikes the centre, freeing the bishop.',
                    'White may push d5 for an edge.'
                ],
                commonMistakes: [
                    'Allowing White a strong centre with d5',
                    'Weakening the kingside'
                ],
                explanation: 'After 1.e4 c5 2.Nf3 Nc6 3.d4 cxd4 4.Nxd4 g6 5.Nc3 Bg7 6.Be3 Nf6 7.Bc4 O-O 8.Bb3 d6 9.f4 Nxd4 10.Bxd4 e5 the Accelerated Dragon sees Black free the bishop with ...e5 in a balanced middlegame.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
        ],
    },
};

const metadata = {
    id: SLUG,
    name: OPENING_NAME,
    slug: SLUG,
    family: OPENING_NAME,
    colour: SIDE,
    ecoRange: ECO_RANGE,
    description: 'The Sicilian Defense (1.e4 c5) is Black\'s most popular and combative reply to 1.e4, immediately fighting for the centre and avoiding the symmetry of 1...e5. It leads to sharp, unbalanced positions where Black accepts a slightly weakened king position in exchange for active counterplay. The Sicilian includes the Najdorf, Dragon, Sveshnikov, Classical, Kan, Scheveningen, Accelerated Dragon, Rossolimo, Alapin, and Closed variations.',
    typicalPawnStructures: [
        'Open Sicilian (pawns on d4/d6, e4/e5)',
        'Sveshnikov (pawns on e5, d6 vs d4)',
        'Dragon (pawns on d6, g6 vs d4)',
        'Kan / Paulsen (pawns on e6, a6 vs d4)',
        'Alapin IQP (pawns on d4 vs c5, d6)'
    ],
    commonTacticalThemes: [
        'Central break with d4 / d5',
        'Knight outposts on d5 / e5',
        'Bishop pair after ...Bxc3',
        'Counterplay with ...b5 and ...e5',
        'Piece activity in the centre'
    ],
    modelPlayers: [
        'Garry Kasparov',
        'Bobby Fischer',
        'Anatoly Karpov',
        'Magnus Carlsen',
        'Veselin Topalov',
        'Maxime Vachier-Lagrave'
    ],
    recommendedStudyOrder: [
        'Beginner: meet the main replies (Open, Closed, Alapin, Rossolimo, Bowdler)',
        'Novice: learn the Najdorf, Dragon, Sveshnikov, Classical, Kan, Rossolimo, Alapin, Closed',
        'Intermediate: deepen the main systems and add Scheveningen + Accelerated Dragon',
        'Advanced: master the Najdorf, Dragon, Sveshnikov, Classical, Kan, Scheveningen, Rossolimo, Alapin, Closed, Accelerated Dragon, Hyperaccelerated, Four Knights',
        'Expert: handle the sharpest theoretical battles in each variation',
        'Master: reach model middlegame positions with active counterplay',
        'Legend: demonstrate deep theoretical and practical mastery'
    ],
    masteryLevels: [
        {
            tier: 'Beginner',
            xpReward: 100,
            accuracyTarget: 0.7,
            objectives: [
                'Recognise 1.e4 c5 as the Sicilian Defense',
                'Understand Black fights for the centre asymmetrically',
                'Meet the five main White replies'
            ],
        },
        {
            tier: 'Novice',
            xpReward: 160,
            accuracyTarget: 0.72,
            objectives: [
                'Learn the Najdorf, Dragon, Sveshnikov, Classical, Kan',
                'Handle the Rossolimo, Alapin, and Closed',
                'Develop pieces actively for counterplay'
            ],
        },
        {
            tier: 'Intermediate',
            xpReward: 240,
            accuracyTarget: 0.75,
            objectives: [
                'Deepen the main systems',
                'Add the Scheveningen and Accelerated Dragon',
                'Use the ...d5 and ...e5 central breaks'
            ],
        },
        {
            tier: 'Advanced',
            xpReward: 340,
            accuracyTarget: 0.78,
            objectives: [
                'Master all twelve advanced variations',
                'Exploit the bishop pair after ...Bxc3',
                'Generate queenside counterplay with ...b5'
            ],
        },
        {
            tier: 'Expert',
            xpReward: 460,
            accuracyTarget: 0.8,
            objectives: [
                'Handle the sharpest theoretical battles',
                'Find knight outposts on d5 / e5',
                'Convert the unbalanced positions'
            ],
        },
        {
            tier: 'Master',
            xpReward: 600,
            accuracyTarget: 0.82,
            objectives: [
                'Reach model middlegame positions',
                'Use the ...b5 and ...e5 counterplay',
                'Demonstrate piece activity in the centre'
            ],
        },
        {
            tier: 'Legend',
            xpReward: 800,
            accuracyTarget: 0.85,
            objectives: [
                'Demonstrate deep theoretical mastery',
                'Handle all of White\'s main setups',
                'Convert the Sicilian to a winning advantage'
            ],
        },
    ],
};

// Pre-flight: validate ALL lines before writing any file.
validateAllLines(tiers, { openingFamily: OPENING_NAME });
console.log(`Pre-flight OK: ${OPENING_NAME} (${countLines(tiers)} lines).`);

// Generate (only when run directly, not when imported by the checker).
if (require.main === module) {
    writeCourse({ slug: SLUG, side: SIDE, tiers, metadata });
}

module.exports = { tiers, metadata, OPENING_NAME, SLUG, SIDE };
