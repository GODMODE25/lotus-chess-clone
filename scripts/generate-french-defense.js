/**
 * French Defense — 7-tier opening course generator.
 * Uses the shared opening-course-lib (pre-flight legality check + writeCourse).
 * Run: node scripts/preflight-check-opening.js generate-french-defense.js
 *      node scripts/generate-french-defense.js
 */
const { validateAllLines, writeCourse, countLines } = require('./opening-course-lib.js');

const OPENING_NAME = 'French Defense';
const SLUG = 'french-defense';
const SIDE = 'black';
const ECO_RANGE = 'C00-C19';

const tiers = {
    beginner: {
        lines: [
            {
                id: 'french-beginner-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange Variation',
                aliases: ['French Exchange'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades in the centre with 3.exd5.',
                    'Black recaptures 3...exd5, opening the e-file.'
                ],
                commonMistakes: [
                    'Underestimating the open e-file for rooks',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 the centre is cleared and both sides develop quickly in the French Exchange.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'french-beginner-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance Variation',
                aliases: ['French Advance'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White grabs space with 3.e5.',
                    'Black strikes back with 3...c5.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 White builds a pawn chain while Black challenges with ...c5.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            {
                id: 'french-beginner-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch Variation',
                aliases: ['French Tarrasch'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White avoids the Winawer with 3.Nd2.',
                    'Black develops 3...Nf6.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 White keeps a solid structure in the Tarrasch Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
            {
                id: 'french-beginner-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer Setup',
                aliases: ['French Winawer'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White develops 3.Nc3.',
                    'Black pins with 3...Bb4.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 Black pins the knight in the Winawer Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            {
                id: 'french-beginner-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Setup',
                aliases: ['French Classical'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops 3.Nc3.',
                    'Black develops 3...Nf6.'
                ],
                commonMistakes: [
                    'Developing pieces passively',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 Black develops naturally in the Classical French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
        ],
    },
    novice: {
        lines: [
            {
                id: 'french-novice-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Nf3 Bd6 5.Bd3)',
                aliases: ['French Exchange development'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Nf3', 'Bd6', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops 4.Nf3 and 5.Bd3.',
                    'Black develops 4...Bd6.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Nf3 Bd6 5.Bd3 both sides develop smoothly in the Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'french-novice-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.c3 Nc6 5.Nf3)',
                aliases: ['French Advance main'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White supports the centre with 4.c3.',
                    'Black develops 4...Nc6.'
                ],
                commonMistakes: [
                    'Letting White expand with f4',
                    'Releasing the tension with ...cxd4 too early'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 White keeps a space advantage in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'french-novice-advance-qb6',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.c3 Qb6 5.Nf3)',
                aliases: ['French Advance Qb6'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Qb6', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'pawn-chain'],
                strategicIdeas: [
                    'Black pressures d4 with 4...Qb6.',
                    'White develops 5.Nf3.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Qb6 5.Nf3 Black pressures d4 while White completes development.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'french-novice-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (4.e5 Nfd7 5.Bd3)',
                aliases: ['French Tarrasch main'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5.',
                    'Black repositions 4...Nfd7.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'french-novice-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (4.e5 c5 5.a3)',
                aliases: ['Winawer a3'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White gains space with 4.e5.',
                    'Black strikes 4...c5; White challenges 5.a3.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 White questions the bishop in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'french-novice-winawer-nge2',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (4.Nge2)',
                aliases: ['Winawer Nge2'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'Nge2', 'c5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White avoids doubling pawns with 4.Nge2.',
                    'Black plays 4...c5.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...c5 break',
                    'Developing the knight passively'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.Nge2 c5 White keeps a flexible structure in the Winawer.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'french-novice-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.Bg5)',
                aliases: ['French Classical Bg5'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White pins with 4.Bg5.',
                    'Black must respond to the pin.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 White pins the f6 knight in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'french-novice-classical-exd5',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.exd5 exd5)',
                aliases: ['Classical exchange'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'exd5', 'exd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades 4.exd5.',
                    'Black recaptures 4...exd5.'
                ],
                commonMistakes: [
                    'Underestimating the open e-file',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.exd5 exd5 the centre opens in the Classical French.',
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
                id: 'french-intermediate-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Bd6 5.Nf3 Nf6)',
                aliases: ['Exchange development'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Bd3', 'Bd6', 'Nf3', 'Nf6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops 4.Bd3 and 5.Nf3.',
                    'Black mirrors with 4...Bd6 5...Nf6.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Bd3 Bd6 5.Nf3 Nf6 both sides are fully developed in the Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'french-intermediate-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (5.Nf3 Bd7 6.Bd3)',
                aliases: ['Advance development'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White develops 5.Nf3 and 6.Bd3.',
                    'Black develops 5...Bd7.'
                ],
                commonMistakes: [
                    'Letting White expand with f4',
                    'Releasing the tension with ...cxd4 too early'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Bd7 6.Bd3 White keeps a space advantage in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'french-intermediate-advance-qb6',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (5.Nf3 Bd7 6.Bd3 Qb6)',
                aliases: ['Advance Qb6 development'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Qb6', 'Nf3', 'Bd7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'Black pressures d4 with 4...Qb6.',
                    'White develops 5.Nf3 and 6.Bd3.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Qb6 5.Nf3 Bd7 6.Bd3 Black pressures d4 while White completes development.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'french-intermediate-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (5.Bd3 c5 6.c3)',
                aliases: ['Tarrasch main'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5 and develops 5.Bd3.',
                    'Black strikes 5...c5; White supports with 6.c3.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'french-intermediate-tarrasch-c5',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (3...c5 4.exd5 exd5 5.Ngf3)',
                aliases: ['Tarrasch c5'],
                eco: 'C04',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'c5', 'exd5', 'exd5', 'Ngf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'Black plays 3...c5 immediately.',
                    'White trades 4.exd5 and develops 5.Ngf3.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...cxd4 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 c5 4.exd5 exd5 5.Ngf3 White keeps a solid structure in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'french-intermediate-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (5.a3 Bxc3+)',
                aliases: ['Winawer Bxc3'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White challenges 5.a3.',
                    'Black captures 5...Bxc3+.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the doubled pawns after bxc3'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ Black takes the knight in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'french-intermediate-winawer-ba5',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (5.a3 Ba5 6.b4)',
                aliases: ['Winawer Ba5'],
                eco: 'C16',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Ba5', 'b4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White challenges 5.a3; Black retreats 5...Ba5.',
                    'White gains space with 6.b4.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped on a5',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 White gains space in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'french-intermediate-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.Bg5 dxe4 5.Nxe4)',
                aliases: ['Classical Nxe4'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 4...dxe4.',
                    'White recaptures 5.Nxe4.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 White regains the pawn in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'french-intermediate-classical-be7',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.Bg5 Be7 5.e5)',
                aliases: ['Classical Be7'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black develops 4...Be7.',
                    'White gains space with 5.e5.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.e5 White gains space in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'french-intermediate-burn',
                parentVariation: OPENING_NAME,
                variationName: 'Burn Variation (5.Nxe4 Nbd7)',
                aliases: ['Burn Nbd7'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Black develops 5...Nbd7.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 Black develops in the Burn Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
        ],
    },
    advanced: {
        lines: [
            {
                id: 'french-advanced-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (6.O-O)',
                aliases: ['Exchange castling'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Bd3', 'Bd6', 'Nf3', 'Nf6', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White develops 4.Bd3, 5.Nf3 and castles 6.O-O.',
                    'Black mirrors with 4...Bd6 5...Nf6.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Bd3 Bd6 5.Nf3 Nf6 6.O-O both sides castle into a balanced Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'french-advanced-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (6.Bd3 Be7)',
                aliases: ['Advance Be7'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Bd3', 'Be7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White develops 5.Nf3, 6.Bd3.',
                    'Black completes development with 6...Be7.'
                ],
                commonMistakes: [
                    'Letting White expand with f4',
                    'Releasing the tension with ...cxd4 too early'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Bd7 6.Bd3 Be7 White keeps a space advantage in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'french-advanced-advance-qb6',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (6.Bd3 cxd4 7.cxd4)',
                aliases: ['Advance cxd4'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Qb6', 'Nf3', 'Bd7', 'Bd3', 'cxd4', 'cxd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 6...cxd4; White recaptures 7.cxd4.',
                    'White keeps a central pawn on d4.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Qb6 5.Nf3 Bd7 6.Bd3 cxd4 7.cxd4 White keeps a central pawn in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'french-advanced-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (6.c3 Nc6)',
                aliases: ['Tarrasch Nc6'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3', 'Nc6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5 and develops 5.Bd3.',
                    'Black strikes 5...c5; White supports with 6.c3; Black develops 6...Nc6.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'french-advanced-tarrasch-c5',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (6.Bd3 Ne7 7.O-O)',
                aliases: ['Tarrasch Ne7'],
                eco: 'C04',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'c5', 'exd5', 'exd5', 'Ngf3', 'Bd6', 'Bd3', 'Ne7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'king-safety'],
                strategicIdeas: [
                    'White trades 4.exd5 and develops 5.Ngf3, 6.Bd3.',
                    'Black develops 6...Ne7; White castles 7.O-O.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...cxd4 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 c5 4.exd5 exd5 5.Ngf3 Bd6 6.Bd3 Ne7 7.O-O White castles in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'french-advanced-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (6.bxc3 Ne7)',
                aliases: ['Winawer bxc3'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White recaptures 6.bxc3, accepting doubled pawns.',
                    'Black develops 6...Ne7.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the doubled pawns after bxc3'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 White accepts doubled pawns in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'french-advanced-winawer-ba5',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (6.b4 cxb4 7.axb4 Bb6)',
                aliases: ['Winawer b4'],
                eco: 'C16',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Ba5', 'b4', 'cxb4', 'axb4', 'Bb6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White gains space with 6.b4; Black captures 6...cxb4.',
                    'White recaptures 7.cxb4, gaining the bishop pair.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped on a5',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 cxb4 7.axb4 Bb6 Black retreats the bishop in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'french-advanced-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Nxe4 Bd7)',
                aliases: ['Classical Bd7'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Bd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Black develops 5...Bd7.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Bd7 Black develops in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'french-advanced-classical-be7',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Nf3 O-O 6.Bd3 c5 7.O-O)',
                aliases: ['Classical both castle'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'Nf3', 'O-O', 'Bd3', 'c5', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White develops 5.Nf3, 6.Bd3 and castles 7.O-O.',
                    'Black castles 5...O-O and plays 6...c5.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.Nf3 O-O 6.Bd3 c5 7.O-O both sides castle in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'french-advanced-burn',
                parentVariation: OPENING_NAME,
                variationName: 'Burn (6.Bd3 Be7 7.Nf3)',
                aliases: ['Burn main'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Bd3', 'Be7', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'White develops 6.Bd3, 7.Nf3; Black develops 5...Nbd7, 6...Be7.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Bd3 Be7 7.Nf3 White develops in the Burn Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'french-advanced-maccutcheon',
                parentVariation: OPENING_NAME,
                variationName: 'MacCutcheon (4.Bg5 Bb4)',
                aliases: ['MacCutcheon'],
                eco: 'C12',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Bb4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black counter-pins with 4...Bb4.',
                    'White must decide how to meet the pin.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Mis-handling the double pin'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Bb4 Black counter-pins in the MacCutcheon Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'french-advanced-fort-knox',
                parentVariation: OPENING_NAME,
                variationName: 'Fort Knox (3...Bd7 4.Nf3 Nf6 5.Bd3 c5)',
                aliases: ['Fort Knox'],
                eco: 'C10',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bd7', 'Nf3', 'Nf6', 'Bd3', 'c5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['king-safety', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black develops 3...Bd7 (Fort Knox).',
                    'White develops 4.Nf3, 5.Bd3; Black plays 5...c5.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e5',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bd7 4.Nf3 Nf6 5.Bd3 c5 Black develops solidly in the Fort Knox French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
        ],
    },
    expert: {
        lines: [
            {
                id: 'french-expert-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (6.O-O O-O)',
                aliases: ['Exchange both castle'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Bd3', 'Bd6', 'Nf3', 'Nf6', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Both sides develop and castle by move 6.',
                    'The open e-file becomes the main battleground.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Bd3 Bd6 5.Nf3 Nf6 6.O-O O-O both sides castle in the Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'french-expert-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (7.cxd4 Qb6 8.Qd2)',
                aliases: ['Advance Qb6 line'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Bd3', 'cxd4', 'cxd4', 'Qb6', 'Qd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 6...cxd4; White recaptures 7.cxd4.',
                    'Black pressures d4 with 7...Qb6; White defends 8.Qd2.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Bd7 6.Bd3 cxd4 7.cxd4 Qb6 8.Qd2 White defends d4 in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'french-expert-advance-main',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (7.cxd4 Bd7 8.Nbd2)',
                aliases: ['Advance main line'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'Be2', 'cxd4', 'cxd4', 'Bd7', 'Nbd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'White develops 6.Be2; Black captures 6...cxd4.',
                    'White recaptures 7.cxd4 and develops 8.Nbd2.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.Be2 cxd4 7.cxd4 Bd7 8.Nbd2 White completes development in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'french-expert-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (7.Ne2 cxd4 8.cxd4)',
                aliases: ['Tarrasch main line'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3', 'Nc6', 'Ne2', 'cxd4', 'cxd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5 and develops 5.Bd3, 7.Ne2.',
                    'Black strikes 5...c5; after 7...cxd4 White recaptures 8.cxd4.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 cxd4 8.cxd4 White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'french-expert-tarrasch-c5',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (7.O-O O-O)',
                aliases: ['Tarrasch both castle'],
                eco: 'C04',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'c5', 'exd5', 'exd5', 'Ngf3', 'Bd6', 'Bd3', 'Ne7', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'king-safety'],
                strategicIdeas: [
                    'White trades 4.exd5 and develops 5.Ngf3, 6.Bd3.',
                    'Both sides castle by move 7.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...cxd4 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 c5 4.exd5 exd5 5.Ngf3 Bd6 6.Bd3 Ne7 7.O-O O-O both sides castle in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'french-expert-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (7.Nf3 Bd7 8.Bd3)',
                aliases: ['Winawer main line'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Nf3', 'Bd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White recaptures 6.bxc3, accepting doubled pawns.',
                    'White develops 7.Nf3, 8.Bd3; Black develops 7...Ne7, 8...Bd7.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the doubled pawns after bxc3'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 7.Nf3 Bd7 8.Bd3 White develops in the Winawer main line.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'french-expert-winawer-ba5',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (7.axb4 Bb6 8.Nf3)',
                aliases: ['Winawer Ba5 line'],
                eco: 'C16',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Ba5', 'b4', 'cxb4', 'axb4', 'Bb6', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White gains space with 6.b4; Black captures 6...cxb4.',
                    'White recaptures 7.cxb4 and wins the bishop pair with 8.Nxc3.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped on a5',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 cxb4 7.axb4 Bb6 8.Nf3 White develops in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'french-expert-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (6.Nf3 Bc6 7.Bd3)',
                aliases: ['Classical Bc6'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Bd7', 'Nf3', 'Bc6', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'White develops 6.Nf3, 7.Bd3; Black develops 6...Bc6.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Bd7 6.Nf3 Bc6 7.Bd3 White develops in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'french-expert-classical-rubinstein',
                parentVariation: OPENING_NAME,
                variationName: 'Rubinstein (6.Nf3 Be7 7.Bd3)',
                aliases: ['Rubinstein variation'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Nf3', 'Be7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Black retreats 5...Nd7; White develops 6.Nf3, 7.Bd3.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Nf3 Be7 7.Bd3 White develops in the Rubinstein Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'french-expert-burn',
                parentVariation: OPENING_NAME,
                variationName: 'Burn (7.Nf3 O-O 8.O-O)',
                aliases: ['Burn both castle'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Bd3', 'Be7', 'Nf3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle by move 8.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Bd3 Be7 7.Nf3 O-O 8.O-O both sides castle in the Burn Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'french-expert-maccutcheon',
                parentVariation: OPENING_NAME,
                variationName: 'MacCutcheon (5.e5 h6)',
                aliases: ['MacCutcheon e5 h6'],
                eco: 'C12',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Bb4', 'e5', 'h6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'Black counter-pins with 4...Bb4.',
                    'White gains space with 5.e5; Black challenges 5...h6.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Mis-handling the double pin'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Bb4 5.e5 h6 Black challenges the bishop in the MacCutcheon.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'french-expert-steinitz',
                parentVariation: OPENING_NAME,
                variationName: 'Steinitz (5.e5 O-O 6.Bd3 c5)',
                aliases: ['Steinitz variation'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e5', 'O-O', 'Bd3', 'c5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Black develops 4...Be7 and castles 5...O-O.',
                    'White gains space with 5.e5 and develops 6.Bd3; Black plays 6...c5.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.e5 O-O 6.Bd3 c5 Black castles and strikes in the Steinitz Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
        ],
    },
    master: {
        lines: [
            {
                id: 'french-master-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (7.Re1 Bd7 8.c4)',
                aliases: ['Exchange Re1'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Bd3', 'Bd6', 'Nf3', 'Nf6', 'O-O', 'O-O', 'Re1', 'Re8', 'c4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'rook-activity'],
                strategicIdeas: [
                    'Both sides castle and White plays 7.Re1.',
                    'White expands 8.c4, taking space.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Bd3 Bd6 5.Nf3 Nf6 6.O-O O-O 7.Re1 Re8 8.c4 White takes space in the Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'french-master-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (8.Qd2 Be7 9.O-O)',
                aliases: ['Advance Qd2 line'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Bd3', 'cxd4', 'cxd4', 'Qb6', 'Qd2', 'Be7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'Black captures 6...cxd4; White recaptures 7.cxd4.',
                    'White defends 8.Qd2 and develops 9.Nbd2; Black develops 8...Ne7.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Bd7 6.Bd3 cxd4 7.cxd4 Qb6 8.Qd2 Be7 9.O-O White castles in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'french-master-advance-qb6',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (8.Nbd2 Be7 9.O-O O-O)',
                aliases: ['Advance Nbd2 line'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'Be2', 'cxd4', 'cxd4', 'Bd7', 'Nbd2', 'Be7', 'O-O', 'Nf6', 'Re1', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'king-safety'],
                strategicIdeas: [
                    'White develops 6.Be2; Black captures 6...cxd4.',
                    'White recaptures 7.cxd4, develops 8.Nbd2, 9.O-O; Black castles 9...O-O.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.Be2 cxd4 7.cxd4 Bd7 8.Nbd2 Be7 9.O-O Nf6 10.Re1 O-O both sides castle in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'french-master-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (8.cxd4 Nb6 9.Qb3)',
                aliases: ['Tarrasch Nb6 line'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3', 'Nc6', 'Ne2', 'cxd4', 'cxd4', 'Nb6', 'Qb3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5 and develops 5.Bd3, 7.Ne2.',
                    'After 7...cxd4 White recaptures 8.cxd4; Black repositions 8...Nb6; White plays 9.Qb3.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 cxd4 8.cxd4 Nb6 9.Qb3 White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'french-master-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (8.Bd3 O-O 9.O-O)',
                aliases: ['Winawer both castle'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Nf3', 'Bd7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 6.bxc3, accepting doubled pawns.',
                    'Both sides develop and castle by move 9.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the doubled pawns after bxc3'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 7.Nf3 Bd7 8.Bd3 O-O 9.O-O both sides castle in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'french-master-winawer-ba5',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (8.Nf3 Ne7 9.Bd3)',
                aliases: ['Winawer Ba5 line master'],
                eco: 'C16',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Ba5', 'b4', 'cxb4', 'axb4', 'Bb6', 'Nf3', 'Ne7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White gains space with 6.b4; Black captures 6...cxb4.',
                    'White recaptures 7.cxb4 and wins the bishop pair; Black develops 8...Ne7, 9.Nf3.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped on a5',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 cxb4 7.axb4 Bb6 8.Nf3 Ne7 9.Bd3 White develops in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'french-master-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.Bd3 O-O 8.O-O)',
                aliases: ['Classical both castle master'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Bd7', 'Nf3', 'Be7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle by move 8.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Bd7 6.Nf3 Be7 7.Bd3 O-O 8.O-O both sides castle in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'french-master-classical-rubinstein',
                parentVariation: OPENING_NAME,
                variationName: 'Rubinstein (7.Bd3 O-O 8.O-O)',
                aliases: ['Rubinstein both castle'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Nf3', 'Be7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle by move 8.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Nf3 Be7 7.Bd3 O-O 8.O-O both sides castle in the Rubinstein Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'french-master-burn',
                parentVariation: OPENING_NAME,
                variationName: 'Burn (7.Bd3 O-O 8.O-O)',
                aliases: ['Burn both castle master'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Bd3', 'Be7', 'Nf3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle by move 8.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Bd3 Be7 7.Nf3 O-O 8.O-O both sides castle in the Burn Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'french-master-steinitz',
                parentVariation: OPENING_NAME,
                variationName: 'Steinitz (7.Nf3 Nc6 8.O-O)',
                aliases: ['Steinitz both castle'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e5', 'O-O', 'Bd3', 'c5', 'Nf3', 'Nc6', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Black develops 4...Be7 and castles 5...O-O.',
                    'White gains space with 5.e5, develops 6.Bd3, 7.Nf3 and castles 8.O-O.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.e5 O-O 6.Bd3 c5 7.Nf3 Nc6 8.O-O both sides castle in the Steinitz Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 13,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
        ],
    },
    legend: {
        lines: [
            {
                id: 'french-legend-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (8.c4 Re8 9.Qc2)',
                aliases: ['Exchange c4 line'],
                eco: 'C01',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'exd5', 'exd5', 'Bd3', 'Bd6', 'Nf3', 'Nf6', 'O-O', 'O-O', 'Re1', 'Re8', 'c4', 'c6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'rook-activity'],
                strategicIdeas: [
                    'Both sides castle and White plays 7.Re1, 8.c4.',
                    'White takes space on the queenside.'
                ],
                commonMistakes: [
                    'Delaying castling',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.exd5 exd5 4.Bd3 Bd6 5.Nf3 Nf6 6.O-O O-O 7.Re1 Re8 8.c4 c6 White takes space in the Exchange French.',
                reviewPriority: 4,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'french-legend-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (8.Qd2 Be7 9.O-O O-O)',
                aliases: ['Advance full development'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Bd7', 'Bd3', 'cxd4', 'cxd4', 'Qb6', 'Qd2', 'Be7', 'O-O', 'Nf6', 'Re1', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'king-safety'],
                strategicIdeas: [
                    'Black captures 6...cxd4; White recaptures 7.cxd4.',
                    'Both sides complete development and castle by move 10.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Bd7 6.Bd3 cxd4 7.cxd4 Qb6 8.Qd2 Be7 9.O-O Nf6 10.Re1 O-O both sides castle in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'french-legend-advance-qb6',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (9.O-O Nf6 10.O-O Re1)',
                aliases: ['Advance both castle legend'],
                eco: 'C02',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'e5', 'c5', 'c3', 'Nc6', 'Nf3', 'Qb6', 'Be2', 'cxd4', 'cxd4', 'Bd7', 'Nbd2', 'Be7', 'O-O', 'Nf6', 'Re1', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'king-safety'],
                strategicIdeas: [
                    'White develops 6.Be2; Black captures 6...cxd4.',
                    'Both sides castle and White plays 10.Re1.'
                ],
                commonMistakes: [
                    'Allowing Black to win the d4 pawn',
                    'Underestimating the queen sortie'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.e5 c5 4.c3 Nc6 5.Nf3 Qb6 6.Be2 cxd4 7.cxd4 Bd7 8.Nbd2 Be7 9.O-O Nf6 10.Re1 O-O both sides castle in the Advance French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'french-legend-tarrasch',
                parentVariation: OPENING_NAME,
                variationName: 'Tarrasch (9.Qb3 Qd7 10.O-O)',
                aliases: ['Tarrasch Qb3 line'],
                eco: 'C03',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nd2', 'Nf6', 'e5', 'Nfd7', 'Bd3', 'c5', 'c3', 'Nc6', 'Ne2', 'cxd4', 'cxd4', 'Nb6', 'Qb3', 'Qd7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White gains space with 4.e5 and develops 5.Bd3, 7.Ne2.',
                    'After 8.cxd4 White plays 9.Qb3; Black defends 9...Qd7; White castles 10.O-O.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...c5 break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.Bd3 c5 6.c3 Nc6 7.Ne2 cxd4 8.cxd4 Nb6 9.Qb3 Qd7 10.O-O White builds a space advantage in the Tarrasch.',
                reviewPriority: 4,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'french-legend-winawer',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (9.O-O Re8 10.Qc2)',
                aliases: ['Winawer full development'],
                eco: 'C15',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Bxc3+', 'bxc3', 'Ne7', 'Nf3', 'Bd7', 'Bd3', 'O-O', 'O-O', 'Re8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 6.bxc3, accepting doubled pawns.',
                    'Both sides castle and White plays 9.Re1.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair',
                    'Ignoring the doubled pawns after bxc3'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Bxc3+ 6.bxc3 Ne7 7.Nf3 Bd7 8.Bd3 O-O 9.O-O Re8 White develops fully in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'french-legend-winawer-ba5',
                parentVariation: OPENING_NAME,
                variationName: 'Winawer (9.Bd3 O-O 10.O-O)',
                aliases: ['Winawer Ba5 line legend'],
                eco: 'C16',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Bb4', 'e5', 'c5', 'a3', 'Ba5', 'b4', 'cxb4', 'axb4', 'Bb6', 'Nf3', 'Ne7', 'Bd3', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'bishop-pair', 'weak-squares'],
                strategicIdeas: [
                    'White gains space with 6.b4; Black captures 6...cxb4.',
                    'White recaptures 7.cxb4 and wins the bishop pair; both develop and castle.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped on a5',
                    'Ignoring the ...c5 pawn break'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Bb4 4.e5 c5 5.a3 Ba5 6.b4 cxb4 7.axb4 Bb6 8.Nf3 Ne7 9.Bd3 O-O 10.O-O both sides castle in the Winawer.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'french-legend-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.O-O Re8 9.Qc2)',
                aliases: ['Classical full development'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Bd7', 'Nf3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Re8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle; White plays 9.Re1.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Bd7 6.Nf3 Be7 7.Bd3 O-O 8.O-O Re8 White develops fully in the Classical French.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'french-legend-classical-rubinstein',
                parentVariation: OPENING_NAME,
                variationName: 'Rubinstein (8.O-O Re8 9.Qc2)',
                aliases: ['Rubinstein full development'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Nf3', 'Be7', 'Bd3', 'O-O', 'O-O', 'Re8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle; White plays 9.Re1.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Nf3 Be7 7.Bd3 O-O 8.O-O Re8 White develops fully in the Rubinstein Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'french-legend-burn',
                parentVariation: OPENING_NAME,
                variationName: 'Burn (8.O-O Re8 9.Qc2)',
                aliases: ['Burn full development'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'dxe4', 'Nxe4', 'Nbd7', 'Bd3', 'Be7', 'Nf3', 'O-O', 'O-O', 'Re8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'Black captures 4...dxe4; White recaptures 5.Nxe4.',
                    'Both sides develop and castle; White plays 9.Re1.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 dxe4 5.Nxe4 Nbd7 6.Bd3 Be7 7.Nf3 O-O 8.O-O Re8 White develops fully in the Burn Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'french-legend-steinitz',
                parentVariation: OPENING_NAME,
                variationName: 'Steinitz (8.O-O Re8 9.Qc2)',
                aliases: ['Steinitz full development'],
                eco: 'C11',
                sanMoves: ['e4', 'e6', 'd4', 'd5', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e5', 'O-O', 'Bd3', 'c5', 'Nf3', 'Nc6', 'O-O', 'Re8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'Black develops 4...Be7 and castles 5...O-O.',
                    'Both sides develop and castle; White plays 9.Re1.'
                ],
                commonMistakes: [
                    'Allowing the bishop to be trapped',
                    'Neglecting the e4 pawn'
                ],
                explanation: 'After 1.e4 e6 2.d4 d5 3.Nc3 Nf6 4.Bg5 Be7 5.e5 O-O 6.Bd3 c5 7.Nf3 Nc6 8.O-O Re8 White develops fully in the Steinitz Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 15,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
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
    description: 'The French Defense is a solid, resilient reply to 1.e4 defined by 1...e6 and 2...d5, where Black accepts a somewhat cramped but structurally sound position. It leads to rich pawn structures (the Advance, Winawer and Tarrasch complexes) and rewards deep strategic understanding over early tactics.',
    typicalPawnStructures: [
        'Advance: White pawns on d4/e5 with a pawn chain; Black on c5/d5.',
        'Winawer: White often gets doubled c-pawns after ...Bxc3.',
        'Exchange: symmetrical pawns after 3.exd5 exd5 with an open e-file.',
        'Tarrasch: White keeps a space-gaining structure but the c1 bishop is blocked by the d2 knight.'
    ],
    commonTacticalThemes: [
        'The ...c5 pawn break to challenge White\'s centre.',
        'Sacrifices on the kingside in the Winawer (e.g. ...Bxc3+ followed by ...Qg5/Qh4 ideas).',
        'The ...b6/...Ba6 maneuver to trade the light-squared bishop against White\'s bishop pair.',
        'Kingside pawn storms in opposite-side castling lines.'
    ],
    modelPlayers: ['Akiba Rubinstein', 'Aron Nimzowitsch', 'Viktor Korchnoi', 'Alexander Morozevich', 'Vassily Ivanchuk'],
    recommendedStudyOrder: [
        'Exchange Variation (simplest, symmetrical)',
        'Advance Variation (space and structure)',
        'Tarrasch Variation (solid but passive)',
        'Classical Variation (flexible development)',
        'Winawer Variation (sharp, doubled pawns)',
        'Burn / MacCutcheon / Steinitz (theoretical mainlines)',
        'Deep master/legend mainlines with castling and central tension'
    ],
    masteryLevels: [
        { tier: 'Beginner', xpReward: 100, accuracyTarget: 0.7, objectives: ['Recognise 1...e6 2...d5', 'Know the main variations by name', 'Play the first 3 moves confidently'] },
        { tier: 'Novice', xpReward: 160, accuracyTarget: 0.72, objectives: ['Develop pieces after 1.e4 e6 2.d4 d5', 'Handle the Exchange and Advance', 'Avoid early blunders'] },
        { tier: 'Intermediate', xpReward: 240, accuracyTarget: 0.75, objectives: ['Play Winawer and Classical lines', 'Understand the ...c5 break', 'Recapture correctly'] },
        { tier: 'Advanced', xpReward: 340, accuracyTarget: 0.78, objectives: ['Castle safely in French structures', 'Handle doubled pawns in the Winawer', 'Trade pieces to relieve the cramp'] },
        { tier: 'Expert', xpReward: 460, accuracyTarget: 0.8, objectives: ['Execute the main theoretical lines', 'Manage the bishop pair', 'Convert small structural edges'] },
        { tier: 'Master', xpReward: 600, accuracyTarget: 0.82, objectives: ['Play master-tier mainlines with castling', 'Exploit White\'s space', 'Handle opposite-side castling attacks'] },
        { tier: 'Legend', xpReward: 800, accuracyTarget: 0.85, objectives: ['Master the deepest French theory', 'Navigate the most theoretical Winawer/Classical lines', 'Convert the French endgame'] },
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