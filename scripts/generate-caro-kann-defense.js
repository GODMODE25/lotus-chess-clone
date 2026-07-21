/**
 * Caro-Kann Defense — 7-tier opening course generator.
 * Uses the shared opening-course-lib (pre-flight legality check + writeCourse).
 * Run: node scripts/preflight-check-opening.js generate-caro-kann-defense.js
 *      node scripts/generate-caro-kann-defense.js
 */
const { validateAllLines, writeCourse, countLines } = require('./opening-course-lib.js');

const OPENING_NAME = 'Caro-Kann Defense';
const SLUG = 'caro-kann-defense';
const SIDE = 'black';
const ECO_RANGE = 'B10-B19';

const tiers = {
    beginner: {
        lines: [
            {
                id: 'caro-beginner-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange Variation',
                aliases: ['Caro-Kann Exchange'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades in the centre with 3.exd5.',
                    'Black recaptures 3...cxd5, reaching a symmetric pawn structure.'
                ],
                commonMistakes: [
                    'Underestimating White\'s lead in development',
                    'Allowing an isolated queen pawn after later exchanges'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 the centre is symmetric and both sides develop quickly in the Caro-Kann Exchange.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'caro-beginner-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance Variation',
                aliases: ['Caro-Kann Advance'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White grabs space with 3.e5.',
                    'Black prepares the ...c5 break to challenge the centre.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 White builds a space-gaining pawn chain in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            {
                id: 'caro-beginner-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Variation',
                aliases: ['Caro-Kann Classical'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White develops 3.Nc3.',
                    'Black captures 3...dxe4 and White recaptures 4.Nxe4.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...Bf5 development',
                    'Neglecting the e4 outpost square'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Black has freed the centre in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'caro-beginner-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov-Botvinnik Setup',
                aliases: ['Panov Attack'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'isolated-queens-pawn'],
                strategicIdeas: [
                    'White plays 3.exd5 cxd5 4.c4, building an IQP centre.',
                    'Black must develop pieces actively against the isolated pawn.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 White sets up the Panov-Botvinnik isolated queen pawn centre.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'caro-beginner-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy Variation',
                aliases: ['Caro-Kann Fantasy'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White supports e4 with 3.f3, keeping a broad centre.',
                    'Black can strike with 3...dxe4 to open lines.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 White shores up e4 in the aggressive Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
        ],
    },
    novice: {
        lines: [
            {
                id: 'caro-novice-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3)',
                aliases: ['Exchange development'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops 4.Bd3 and 5.c3, supporting the centre.',
                    'Black develops 4...Nc6.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 both sides develop smoothly in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'caro-novice-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2)',
                aliases: ['Advance main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'bishop-pair'],
                strategicIdeas: [
                    'White develops 4.Nf3 and 5.Be2.',
                    'Black develops 4...Bf5 and supports with 5...e6.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 both sides develop naturally in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'caro-novice-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.Nxe4 Bf5 5.Ng3)',
                aliases: ['Classical main'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'bishop-pair'],
                strategicIdeas: [
                    'White recaptures 4.Nxe4 and reroutes 5.Ng3.',
                    'Black develops 4...Bf5, hitting the e4 knight.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 White avoids the bishop trade in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'caro-novice-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3)',
                aliases: ['Panov development'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White builds the IQP with 4.c4 and 5.Nc3.',
                    'Black develops 4...Nf6, pressuring d5.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 White completes the Panov-Botvinnik centre.',
                reviewPriority: 5,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'caro-novice-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 4.fxe4, keeping a broad centre.',
                    'Black strikes back with 4...e5 to free the position.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 White keeps a central pawn duo in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'caro-novice-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights Variation',
                aliases: ['Caro-Kann Two Knights'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'White recaptures 4.Nxe4.',
                    'Black develops 4...Nd7, the Two Knights setup.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 Black chooses the flexible Two Knights setup.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'caro-novice-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov Variation',
                aliases: ['Caro-Kann Karpov'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White avoids the exchange of knights with 3.Nd2.',
                    'Black recaptures 4...Nd7, heading for a solid structure.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 White keeps pieces on in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 6,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'caro-novice-hillbilly',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.c3)',
                aliases: ['Hillbilly Attack'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'c3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White grabs space with 3.e5 and supports with 4.c3.',
                    'Black challenges immediately with 3...c5.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.c3 White supports the advanced centre in the Hillbilly line.',
                reviewPriority: 3,
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
                id: 'caro-inter-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3 Nf6 6.Bf4)',
                aliases: ['Exchange development'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops both bishops with 4.Bd3 and 6.Bf4.',
                    'Black develops 4...Nc6 and 5...Nf6.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 White develops harmoniously in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'caro-inter-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O)',
                aliases: ['Advance castling'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White castles kingside with 6.O-O.',
                    'Black develops 4...Bf5, 5...e6 and strikes with 5...c5.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O White castles safely in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'caro-inter-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7)',
                aliases: ['Classical main'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'Nf3', 'Nd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'bishop-pair'],
                strategicIdeas: [
                    'White reroutes 5.Ng3 and develops 6.Nf3.',
                    'Black plays 5...Bg6 and 6...Nd7, keeping the bishop pair.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7 Black keeps the bishop pair in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'caro-inter-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5)',
                aliases: ['Panov exchange'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'g6', 'cxd5', 'Nxd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White trades 6.cxd5 to open lines against the IQP.',
                    'Black recaptures 6...Nxd5, centralising the knight.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 White opens the position in the Panov Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'caro-inter-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Qxd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 6.Qxd4, keeping a central pawn.',
                    'Black frees the position with 4...e5 and 5...exd4.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 White keeps a central pawn in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'caro-inter-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bc4)',
                aliases: ['Two Knights main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bc4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 5.Ng5 and 6.Bc4, attacking f7.',
                    'Black develops 5...Ngf6, defending the kingside.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bc4 White pressures f7 in the Two Knights Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'caro-inter-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov (5.Ng5 Ngf6 6.Bd3)',
                aliases: ['Karpov main'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White develops 6.Bd3, eyeing the kingside.',
                    'Black develops 5...Ngf6, keeping a solid structure.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 White develops calmly in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'caro-inter-advance-short',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.dxc5 Bxc5 5.Nf3)',
                aliases: ['Advance Short'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'dxc5', 'e6', 'Be3', 'Bxc5', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White captures 4.dxc5, opening the position.',
                    'Black recaptures 4...Bxc5, developing the bishop.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.dxc5 Bxc5 5.Nf3 White opens lines in the Advance Caro-Kann Short Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'caro-inter-bronstein',
                parentVariation: OPENING_NAME,
                variationName: 'Bronstein-Larsen (6.Nxf7 Kxf7)',
                aliases: ['Bronstein-Larsen trap'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Nxf7', 'Kxf7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'pawn-structure', 'king-safety'],
                strategicIdeas: [
                    'White sacrifices 6.Nxf7, the Bronstein-Larsen trap.',
                    'Black accepts with 6...Kxf7, exposing the king.'
                ],
                commonMistakes: [
                    'Accepting the sacrifice without counting the compensation',
                    'Allowing White a strong attack after ...Kxf7'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Nxf7 Kxf7 White springs the Bronstein-Larsen trap.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'caro-inter-botvinnik',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 Nc6 6.Nf3)',
                aliases: ['Botvinnik setup'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'Nc6', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White completes development with 5.Nc3 and 6.Nf3.',
                    'Black develops 4...Nf6 and 5...Nc6 against the IQP.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 Nc6 6.Nf3 White develops fully in the Botvinnik Panov setup.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
        ],
    },
    advanced: {
        lines: [
            {
                id: 'caro-adv-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6)',
                aliases: ['Exchange trade'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4', 'e6', 'Nf3', 'Bd6', 'Bxd6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades bishops with 7.Bxd6.',
                    'Black develops 6...Bd6, offering the trade.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 White trades light-squared bishops in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'caro-adv-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3)',
                aliases: ['Advance main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White supports the centre with 7.c3.',
                    'Black develops 6...Nc6 and pressures d4.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 White reinforces the centre in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'caro-adv-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3)',
                aliases: ['Classical h4'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'Nf3', 'Nd7', 'h4', 'h6', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'White plays 7.h4, the aggressive Classical plan.',
                    'Black develops 6...Nd7 and meets 7...h6.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 White launches the h4 plan in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'caro-adv-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4)',
                aliases: ['Panov development'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'g6', 'cxd5', 'Nxd5', 'Bc4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White develops 7.Bc4, pressuring d5.',
                    'Black recaptures 6...Nxd5, centralising the knight.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 White develops actively in the Panov Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'caro-adv-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Qxd4', 'Nf6', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White develops 7.Bd3, completing development.',
                    'Black develops 6...Nf6, attacking the queen.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 White develops in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'caro-adv-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bc4 e6 7.Qe2)',
                aliases: ['Two Knights main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bc4', 'e6', 'Qe2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 7.Qe2, supporting e4.',
                    'Black plays 6...e6, solidifying the centre.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 White supports e4 in the Two Knights Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'caro-adv-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3)',
                aliases: ['Karpov main'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'piece-activity'],
                strategicIdeas: [
                    'White develops 7.N1f3, the d2 knight to f3.',
                    'Black plays 6...e6, preparing to develop.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 White develops the d2 knight in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'caro-adv-advance-main',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.dxc5 Bxc5 5.Nf3 Ne7 6.b4 Bb6 7.c4)',
                aliases: ['Advance main line'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'dxc5', 'e6', 'Nf3', 'Bxc5', 'b4', 'Bb6', 'c4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'central-control'],
                strategicIdeas: [
                    'White gains space with 6.b4 and 7.c4.',
                    'Black retreats 6...Bb6, keeping the bishop.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.dxc5 Bxc5 5.Nf3 Ne7 6.b4 Bb6 7.c4 White expands on the queenside in the Advance Caro-Kann.',
                reviewPriority: 3,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'caro-adv-bronstein',
                parentVariation: OPENING_NAME,
                variationName: 'Bronstein-Larsen (6.Nxf7 Kxf7 7.Ne2)',
                aliases: ['Bronstein-Larsen trap'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Nxf7', 'Kxf7', 'Ne2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'pawn-structure', 'king-safety'],
                strategicIdeas: [
                    'White continues 7.Ne2, rerouting the knight.',
                    'Black king is exposed after 6...Kxf7.'
                ],
                commonMistakes: [
                    'Accepting the sacrifice without counting the compensation',
                    'Allowing White a strong attack after ...Kxf7'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Nxf7 Kxf7 7.Ne2 White reroutes the knight in the Bronstein-Larsen trap.',
                reviewPriority: 4,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'caro-adv-botvinnik',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5)',
                aliases: ['Botvinnik setup'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'Nc6', 'Nf3', 'Bg4', 'cxd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White captures 7.cxd5, opening lines.',
                    'Black pins with 6...Bg4 against the IQP.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 White opens lines in the Botvinnik Panov setup.',
                reviewPriority: 5,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'caro-adv-short',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 Qc7)',
                aliases: ['Advance Short'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3', 'Qc7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White supports the centre with 7.c3.',
                    'Black develops 6...Nc6 and 7...Qc7.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 Qc7 Black completes development in the Advance Caro-Kann.',
                reviewPriority: 3,
                estimatedStudyMinutes: 10,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'caro-adv-nimzo',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3)',
                aliases: ['Two Knights Bd3'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'pawn-structure'],
                strategicIdeas: [
                    'White develops 6.Bd3 and 7.N1f3.',
                    'Black plays 6...e6, solidifying the centre.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 White develops in the Two Knights Variation.',
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
                id: 'caro-exp-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2)',
                aliases: ['Exchange trade'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4', 'e6', 'Nf3', 'Bd6', 'Bxd6', 'Qxd6', 'Nbd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops 8.Nd2, completing the setup.',
                    'Black recaptures 7...Qxd6 after the bishop trade.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2 White completes development in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'caro-exp-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4)',
                aliases: ['Advance main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3', 'cxd4', 'cxd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White recaptures 8.cxd4, keeping a pawn chain.',
                    'Black releases tension with 7...cxd4.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4 White keeps a pawn chain in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'caro-exp-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3)',
                aliases: ['Classical h4'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'Nf3', 'Nd7', 'h4', 'h6', 'Bd3', 'Bxd3', 'Qxd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'king-safety'],
                strategicIdeas: [
                    'White recaptures 9.Qxd3, keeping the queen central.',
                    'Black trades 8...Bxd3 to relieve the pressure.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3 White recaptures in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'caro-exp-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3)',
                aliases: ['Panov development'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'g6', 'cxd5', 'Nxd5', 'Bc4', 'Nb6', 'Bb3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White retreats 8.Bb3, keeping the bishop.',
                    'Black plays 7...Nb6, hitting the bishop.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3 White keeps the bishop in the Panov Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'caro-exp-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nc6 8.Qd2)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Qxd4', 'Nf6', 'Bd3', 'Nbd7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'king-safety'],
                strategicIdeas: [
                    'White retreats 8.Qd2, keeping the queen safe.',
                    'Black develops 7...Nc6, hitting the queen.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nc6 8.Qd2 White retreats the queen in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'caro-exp-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.O-O)',
                aliases: ['Two Knights main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bc4', 'e6', 'Qe2', 'Be7', 'Bd3', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White castles 8.O-O, completing development.',
                    'Black develops 7...Be7, preparing to castle.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.O-O White castles in the Two Knights Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'caro-exp-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O)',
                aliases: ['Karpov main'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3', 'Bd6', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'castling'],
                strategicIdeas: [
                    'White castles 8.O-O, completing development.',
                    'Black develops 7...Bd6, preparing to castle.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O White castles in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'caro-exp-advance-main',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3)',
                aliases: ['Advance main line'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'dxc5', 'e6', 'Nf3', 'Bxc5', 'b4', 'Bb6', 'c4', 'Nf6', 'Be2', 'O-O', 'Nc3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White develops 8.Nc3, completing the setup.',
                    'Black castles 7...O-O, king safe on g8.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3 White castles in the Advance Caro-Kann main line.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'caro-exp-bronstein',
                parentVariation: OPENING_NAME,
                variationName: 'Bronstein-Larsen (6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5)',
                aliases: ['Bronstein-Larsen trap'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Nxf7', 'Kxf7', 'Ne2', 'e5', 'dxe5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'pawn-structure', 'king-safety'],
                strategicIdeas: [
                    'White captures 8.dxe5, opening the centre.',
                    'Black king is exposed after 6...Kxf7.'
                ],
                commonMistakes: [
                    'Accepting the sacrifice without counting the compensation',
                    'Allowing White a strong attack after ...Kxf7'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5 White opens the centre in the Bronstein-Larsen trap.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'caro-exp-botvinnik',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4)',
                aliases: ['Botvinnik setup'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'Nc6', 'Nf3', 'Bg4', 'cxd5', 'Nxd5', 'Qa4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White plays 8.Qa4, pinning the knight on d5.',
                    'Black recaptures 7...Nxd5 after the pawn trade.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4 White pins the d5 knight in the Botvinnik Panov setup.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'caro-exp-short',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 Qc7 8.Re1)',
                aliases: ['Advance Short'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3', 'Qc7', 'Re1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'rook-activity'],
                strategicIdeas: [
                    'White plays 8.Re1, activating the rook.',
                    'Black develops 6...Nc6 and 7...Qc7.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 Qc7 8.Re1 White activates the rook in the Advance Caro-Kann.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'caro-exp-nimzo',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O)',
                aliases: ['Two Knights Bd3'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3', 'Bd6', 'O-O', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White castles 8.O-O, then Black castles 8...O-O.',
                    'Both sides complete development in the Two Knights Variation.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O both sides castle in the Two Knights Variation.',
                reviewPriority: 4,
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
                id: 'caro-mas-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2 O-O 9.Nc4)',
                aliases: ['Exchange trade'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4', 'e6', 'Nf3', 'Bd6', 'Bxd6', 'Qxd6', 'Nbd2', 'O-O', 'Nc4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'White reroutes 9.Nc4, heading for d6 or e5.',
                    'Black castles 8...O-O, king safe on g8.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2 O-O 9.Nc4 White reroutes the knight in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'caro-mas-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4 Nge7 9.Nc3)',
                aliases: ['Advance main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3', 'cxd4', 'cxd4', 'Nge7', 'Nc3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White develops 9.Nc3, completing the setup.',
                    'Black reroutes 8...Nge7, heading for f5.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4 Nge7 9.Nc3 White completes development in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'caro-mas-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3 Qc7 10.O-O)',
                aliases: ['Classical h4'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'Nf3', 'Nd7', 'h4', 'h6', 'Bd3', 'Bxd3', 'Qxd3', 'Qc7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White castles 10.O-O, completing development.',
                    'Black plays 9...Qc7, supporting the kingside.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3 Qc7 10.O-O White castles in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'caro-mas-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3 Bg7 9.Nf3)',
                aliases: ['Panov development'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'g6', 'cxd5', 'Nxd5', 'Bc4', 'Nb6', 'Bb3', 'Bg7', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'fianchetto'],
                strategicIdeas: [
                    'White develops 9.Nf3, completing the setup.',
                    'Black fianchettoes 8...Bg7, pressuring the long diagonal.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3 Bg7 9.Nf3 Black fianchettoes in the Panov Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'caro-mas-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nbd7 8.O-O Bc5 9.Rfe1)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Qxd4', 'Nf6', 'Bd3', 'Nbd7', 'O-O', 'Bc5', 'Rfe1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'White plays 9.Rfe1, centralising the rook after castling.',
                    'Black develops 8...Bc5, hitting the queen.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nbd7 8.O-O Bc5 9.Rfe1 White centralises the rook in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'caro-mas-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.Bd3 O-O 9.N1f3 h6 10.O-O Re8 11.Rfe1)',
                aliases: ['Two Knights main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bc4', 'e6', 'Qe2', 'Be7', 'Bd3', 'O-O', 'N1f3', 'h6', 'O-O', 'Re8', 'Rfe1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White plays 11.Rfe1, centralising the rook.',
                    'Both sides castle in the Two Knights Variation.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.Bd3 O-O 9.N1f3 h6 10.O-O Re8 11.Rfe1 White centralises the rook in the Two Knights Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'caro-mas-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O 9.Re1)',
                aliases: ['Karpov main'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3', 'Bd6', 'O-O', 'O-O', 'Re1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'castling'],
                strategicIdeas: [
                    'White plays 9.Re1, activating the rook.',
                    'Both sides castle in the Karpov Variation.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O 9.Re1 White activates the rook in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'caro-mas-advance-main',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3 Nbc6 9.Bb2)',
                aliases: ['Advance main line'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'dxc5', 'e6', 'Nf3', 'Bxc5', 'b4', 'Bb6', 'c4', 'Nf6', 'Be2', 'O-O', 'Nc3', 'Nbc6', 'Bb2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White develops 9.Bb2, fianchettoing the bishop.',
                    'Black develops 8...Nbc6, hitting the centre.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3 Nbc6 9.Bb2 White fianchettoes in the Advance Caro-Kann main line.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'caro-mas-bronstein',
                parentVariation: OPENING_NAME,
                variationName: 'Bronstein-Larsen (6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5 Nxe5 9.Nd4)',
                aliases: ['Bronstein-Larsen trap'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Nxf7', 'Kxf7', 'Ne2', 'e5', 'dxe5', 'Nxe5', 'Nd4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'pawn-structure', 'king-safety'],
                strategicIdeas: [
                    'White centralises 9.Nd4, heading for f5 or e6.',
                    'Black king is exposed after 6...Kxf7.'
                ],
                commonMistakes: [
                    'Accepting the sacrifice without counting the compensation',
                    'Allowing White a strong attack after ...Kxf7'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5 Nxe5 9.Nd4 White centralises the knight in the Bronstein-Larsen trap.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'caro-mas-botvinnik',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4 Bxf3 9.gxf3)',
                aliases: ['Botvinnik setup'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'Nc6', 'Nf3', 'Bg4', 'cxd5', 'Nxd5', 'Qa4', 'Bxf3', 'gxf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White recaptures 9.gxf3, doubling pawns but opening the g-file.',
                    'Black trades 8...Bxf3 to relieve the pin.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4 Bxf3 9.gxf3 White recaptures in the Botvinnik Panov setup.',
                reviewPriority: 5,
                estimatedStudyMinutes: 14,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
        ],
    },
    legend: {
        lines: [
            {
                id: 'caro-leg-exchange',
                parentVariation: OPENING_NAME,
                variationName: 'Exchange (4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2 O-O 9.Nc4 e5 10.dxe5 Ncxe5 11.Nfxe5 Qxe5)',
                aliases: ['Exchange endgame'],
                eco: 'B13',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'Bd3', 'Nc6', 'c3', 'Nf6', 'Bf4', 'e6', 'Nf3', 'Bd6', 'Bxd6', 'Qxd6', 'Nbd2', 'O-O', 'Nc4', 'e5', 'dxe5', 'Ncxe5', 'Nfxe5', 'Qxe5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'endgame-transition'],
                strategicIdeas: [
                    'White trades into an endgame with 10.dxe5 and 11.Nxe5.',
                    'Black recaptures 10...Nxe5 and 11...Qxe5.'
                ],
                commonMistakes: [
                    'Delaying development of the c1 bishop',
                    'Allowing White a lead in development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.Bd3 Nc6 5.c3 Nf6 6.Bf4 Bd6 7.Bxd6 Qxd6 8.Nd2 O-O 9.Nc4 e5 10.dxe5 Ncxe5 11.Nfxe5 Qxe5 White trades into an endgame in the Exchange Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'caro-leg-advance',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4 Nge7 9.Nc3 Nf5 10.Bd3 Bxd3 11.Qxd3)',
                aliases: ['Advance main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'Bf5', 'Nf3', 'e6', 'Be2', 'c5', 'O-O', 'Nc6', 'c3', 'cxd4', 'cxd4', 'Nge7', 'Nc3', 'Ng6', 'Bd3', 'Bxd3', 'Qxd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'White recaptures 11.Qxd3, keeping the queen central.',
                    'Black trades 10...Bxd3 to relieve the pressure.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop behind the e-pawn',
                    'Allowing White a space advantage on the kingside'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 Bf5 4.Nf3 e6 5.Be2 c5 6.O-O Nc6 7.c3 cxd4 8.cxd4 Nge7 9.Nc3 Nf5 10.Bd3 Bxd3 11.Qxd3 White recaptures in the Advance Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'caro-leg-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3 Qc7 10.O-O O-O 11.Re1)',
                aliases: ['Classical h4'],
                eco: 'B18',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Bf5', 'Ng3', 'Bg6', 'Nf3', 'Nd7', 'h4', 'h6', 'Bd3', 'Bxd3', 'Qxd3', 'Ngf6', 'O-O', 'e6', 'Re1', 'Be7', 'Qe2', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White plays 11.Re1, activating the rook.',
                    'Both sides castle in the Classical Caro-Kann.'
                ],
                commonMistakes: [
                    'Allowing Black to trade off the light-squared bishop',
                    'Misplacing the knight after ...Bf5'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Bf5 5.Ng3 Bg6 6.Nf3 Nd7 7.h4 h6 8.Bd3 Bxd3 9.Qxd3 Qc7 10.O-O O-O 11.Re1 White activates the rook in the Classical Caro-Kann.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'caro-leg-panov',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3 Bg7 9.Nf3 O-O 10.O-O Nc6 11.Be3)',
                aliases: ['Panov development'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'g6', 'cxd5', 'Nxd5', 'Bc4', 'Nb6', 'Bb3', 'Bg7', 'Nf3', 'O-O', 'O-O', 'Nc6', 'Be3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'fianchetto'],
                strategicIdeas: [
                    'White develops 11.Be3, completing the setup.',
                    'Both sides castle in the Panov Caro-Kann.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 g6 6.cxd5 Nxd5 7.Bc4 Nb6 8.Bb3 Bg7 9.Nf3 O-O 10.O-O Nc6 11.Be3 White completes development in the Panov Caro-Kann.',
                reviewPriority: 5,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'caro-leg-fantasy',
                parentVariation: OPENING_NAME,
                variationName: 'Fantasy (3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nbd7 8.O-O Bc5 9.Rfe1)',
                aliases: ['Fantasy main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'f3', 'dxe4', 'fxe4', 'e5', 'Nf3', 'exd4', 'Qxd4', 'Nf6', 'Bd3', 'Nbd7', 'O-O', 'Bc5', 'Rfe1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'White plays 9.Rfe1, centralising the rook.',
                    'Both sides castle in the Fantasy Variation.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature f-pawn pushes',
                    'Allowing Black to win the e4 pawn cleanly'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.f3 dxe4 4.fxe4 e5 5.Nf3 exd4 6.Qxd4 Nf6 7.Bd3 Nbd7 8.O-O Bc5 9.Rfe1 White centralises the rook in the Fantasy Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'caro-leg-two-knights',
                parentVariation: OPENING_NAME,
                variationName: 'Two Knights (5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.N1f3 O-O 9.O-O Nb6 10.Bb3 a5 11.a4)',
                aliases: ['Two Knights main'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bc4', 'e6', 'Qe2', 'Be7', 'N1f3', 'O-O', 'O-O', 'Nb6', 'Bb3', 'a5', 'a4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['development', 'piece-activity', 'castling'],
                strategicIdeas: [
                    'White fixes the queenside with 11.a4.',
                    'Black plays 10...Nb6 and 11...a5 for counterplay.'
                ],
                commonMistakes: [
                    'Allowing White a strong knight on e4',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bc4 e6 7.Qe2 Be7 8.N1f3 O-O 9.O-O Nb6 10.Bb3 a5 11.a4 White fixes the queenside in the Two Knights Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'caro-leg-karpov',
                parentVariation: OPENING_NAME,
                variationName: 'Karpov (5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O 9.Re1 Qc7 10.c3 c5 11.dxc5)',
                aliases: ['Karpov main'],
                eco: 'B17',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nd2', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Bd3', 'e6', 'N1f3', 'Bd6', 'O-O', 'O-O', 'Re1', 'Qc7', 'c3', 'c5', 'dxc5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'development', 'castling'],
                strategicIdeas: [
                    'White captures 11.dxc5, opening the position.',
                    'Black plays 10...c5, striking in the centre.'
                ],
                commonMistakes: [
                    'Blocking the c1 bishop with the d2 knight',
                    'Allowing Black a comfortable ...Bf5 development'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nd2 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Bd3 e6 7.N1f3 Bd6 8.O-O O-O 9.Re1 Qc7 10.c3 c5 11.dxc5 White opens the centre in the Karpov Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'caro-leg-advance-main',
                parentVariation: OPENING_NAME,
                variationName: 'Advance (3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3 Nbc6 9.Bb2 a5 10.b5 Na7 11.Na4)',
                aliases: ['Advance main line'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'e5', 'c5', 'dxc5', 'e6', 'Nf3', 'Bxc5', 'b4', 'Bb6', 'c4', 'Nf6', 'Be2', 'O-O', 'Nc3', 'Nbc6', 'Bb2', 'a5', 'b5', 'Na7', 'Na4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'castling'],
                strategicIdeas: [
                    'White reroutes 11.Na4, heading for c5.',
                    'Black plays 9...a5 and 10...Na7 for counterplay.'
                ],
                commonMistakes: [
                    'Letting White build a crushing pawn chain',
                    'Releasing the central tension too early'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.e5 c5 4.dxc5 Bxc5 5.Nf3 Nf6 6.b4 Bb6 7.c4 Be2 O-O 8.Nc3 Nbc6 9.Bb2 a5 10.b5 Na7 11.Na4 White reroutes the knight in the Advance Caro-Kann main line.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'caro-leg-bronstein',
                parentVariation: OPENING_NAME,
                variationName: 'Bronstein-Larsen (6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5 Nxe5 9.Nd4 Bc5 10.Nb3 Bb6 11.f4)',
                aliases: ['Bronstein-Larsen trap'],
                eco: 'B12',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'Nc3', 'dxe4', 'Nxe4', 'Nd7', 'Ng5', 'Ngf6', 'Nxf7', 'Kxf7', 'Ne2', 'e5', 'dxe5', 'Nxe5', 'Nd4', 'Bc5', 'Nb3', 'Bb6', 'f4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['tactics', 'pawn-structure', 'king-safety'],
                strategicIdeas: [
                    'White plays 11.f4, opening lines against the exposed king.',
                    'Black king is exposed after 6...Kxf7.'
                ],
                commonMistakes: [
                    'Accepting the sacrifice without counting the compensation',
                    'Allowing White a strong attack after ...Kxf7'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4 Nd7 5.Ng5 Ngf6 6.Nxf7 Kxf7 7.Ne2 e5 8.dxe5 Nxe5 9.Nd4 Bc5 10.Nb3 Bb6 11.f4 White opens lines in the Bronstein-Larsen trap.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'caro-leg-botvinnik',
                parentVariation: OPENING_NAME,
                variationName: 'Panov (4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4 Bxf3 9.gxf3 e5 10.Bc4 Nb6 11.Bb3)',
                aliases: ['Botvinnik setup'],
                eco: 'B14',
                sanMoves: ['e4', 'c6', 'd4', 'd5', 'exd5', 'cxd5', 'c4', 'Nf6', 'Nc3', 'Nc6', 'Nf3', 'Bg4', 'cxd5', 'Nxd5', 'Qa4', 'Bxf3', 'gxf3', 'e5', 'Bc4', 'Nb6', 'Bb3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White retreats 11.Bb3, keeping the bishop.',
                    'Black plays 9...e5, freeing the position.'
                ],
                commonMistakes: [
                    'Allowing White a strong pawn-centre bind',
                    'Passive piece placement around the IQP'
                ],
                explanation: 'After 1.e4 c6 2.d4 d5 3.exd5 cxd5 4.c4 Nf6 5.Nc3 Nc6 6.Nf3 Bg4 7.cxd5 Nxd5 8.Qa4 Bxf3 9.gxf3 e5 10.Bc4 Nb6 11.Bb3 White retreats the bishop in the Botvinnik Panov setup.',
                reviewPriority: 5,
                estimatedStudyMinutes: 18,
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
    description: 'The Caro-Kann Defense is a solid, resilient response to 1.e4 built on the moves 1...c6 and 2...d5. It yields a healthy pawn structure and easy piece development, and is favoured by strategic players such as Karpov and Capablanca.',
    typicalPawnStructures: [
        'Symmetric centre after ...cxd5',
        'Pawn chain c6-d5 with ...e6',
        'Isolated queen pawn in the Panov-Botvinnik Attack',
        'Closed centre in the Advance Variation'
    ],
    commonTacticalThemes: [
        'Minor-piece activity on the light squares',
        'The ...Bf5 / ...Bg6 bishop manoeuvre',
        'Knight outposts on e4 / d5',
        'The Bronstein-Larsen trap with Nxf7'
    ],
    modelPlayers: ['Anatoly Karpov', 'José Raúl Capablanca', 'Viktor Korchnoi', 'Peter Leko', 'Ding Liren'],
    recommendedStudyOrder: [
        'Exchange Variation',
        'Advance Variation',
        'Classical Variation',
        'Panov-Botvinnik Attack',
        'Two Knights Variation',
        'Karpov Variation',
        'Fantasy Variation',
        'Bronstein-Larsen Attack'
    ],
    masteryLevels: [
        { tier: 'Beginner', xpReward: 100, accuracyTarget: 0.7, objectives: ['Recognise the 1...c6 2...d5 setup', 'Play the Exchange and Advance main lines'] },
        { tier: 'Novice', xpReward: 160, accuracyTarget: 0.72, objectives: ['Develop pieces after 3.exd5 cxd5', 'Handle the Panov IQP centre'] },
        { tier: 'Intermediate', xpReward: 240, accuracyTarget: 0.75, objectives: ['Execute the Classical ...Bf5 plan', 'Avoid the Bronstein-Larsen trap'] },
        { tier: 'Advanced', xpReward: 340, accuracyTarget: 0.78, objectives: ['Navigate the Two Knights and Karpov setups', 'Trade into a comfortable endgame'] },
        { tier: 'Expert', xpReward: 460, accuracyTarget: 0.8, objectives: ['Castle and centralise rooks', 'Exploit the Panov isolated pawn'] },
        { tier: 'Master', xpReward: 600, accuracyTarget: 0.82, objectives: ['Convert the bishop-pair advantage', 'Handle the Advance space bind'] },
        { tier: 'Legend', xpReward: 800, accuracyTarget: 0.85, objectives: ['Master all Caro-Kann variations', 'Punish inaccurate White setups'] },
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