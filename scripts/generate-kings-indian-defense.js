/**
 * King's Indian Defense — Phase 2 black opening course generator.
 * Uses the opening-course-generator skill scaffold (raw line objects).
 * Run pre-flight:  node scripts/preflight-check-opening.js generate-kings-indian-defense.js
 * Generate:        node scripts/generate-kings-indian-defense.js
 */
const { validateAllLines, writeCourse, countLines } = require('./opening-course-lib.js');

const OPENING_NAME = 'King\'s Indian Defense';
const SLUG = 'kings-indian-defense';
const SIDE = 'black';
const ECO_RANGE = 'E60-E99';

const tiers = {
    beginner: {
        lines: [
            {
                id: 'kid-beg-classical',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O)',
                aliases: ['KID Classical setup'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'pawn-structure', 'castling'],
                strategicIdeas: [
                    'Black fianchettoes the bishop on g7, controlling the long diagonal.',
                    'White builds a broad centre with e4 and d4.'
                ],
                commonMistakes: [
                    'Developing pieces before completing the fianchetto',
                    'Allowing White an uncontested centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Black completes the King\'s Indian setup in the Classical Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            {
                id: 'kid-beg-fianchetto',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (4.g3 O-O 5.Bg2 d6 6.Nf3)',
                aliases: ['KID Fianchetto setup'],
                eco: 'E60',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'pawn-structure', 'development'],
                strategicIdeas: [
                    'White mirrors Black with a kingside fianchetto.',
                    'Black keeps the pawn breaks ...e5 and ...c5 in reserve.'
                ],
                commonMistakes: [
                    'Rushing the ...e5 break before development is complete',
                    'Neglecting the c8 bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 White adopts a Fianchetto setup against the King\'s Indian.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 4,
            },
            {
                id: 'kid-beg-samisch',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (4.e4 d6 5.f3)',
                aliases: ['Sämisch Variation'],
                eco: 'E80',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'pawn-chain', 'kingside-expansion'],
                strategicIdeas: [
                    'White supports e4 with f3, building a pawn wedge.',
                    'Black prepares ...e5 to challenge the centre.'
                ],
                commonMistakes: [
                    'Weakening the king with premature kingside pawn pushes',
                    'Allowing Black a strong ...e5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 White plays the Sämisch Variation, reinforcing the centre with f3.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
            {
                id: 'kid-beg-four-pawns',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns Attack (4.e4 d6 5.f4)',
                aliases: ['Four Pawns'],
                eco: 'E76',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'central-control'],
                strategicIdeas: [
                    'White grabs a huge pawn centre with e4, d4 and f4.',
                    'Black strikes back with the ...c5 and ...e5 breaks.'
                ],
                commonMistakes: [
                    'Overextending the centre without piece support',
                    'Allowing Black a successful ...e5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 White launches the aggressive Four Pawns Attack.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 3,
            },
            {
                id: 'kid-beg-bd3',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (4.e4 d6 5.Nf3 O-O 6.Bd3)',
                aliases: ['Bd3 Classical'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'White develops the bishop to d3, eyeing the kingside.',
                    'Black completes the King\'s Indian fianchetto setup.'
                ],
                commonMistakes: [
                    'Developing the bishop passively on e2 only',
                    'Allowing Black a comfortable ...e5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 White adopts the Bd3 Classical system against the King\'s Indian.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 2,
            },
        ],
    },
    novice: {
        lines: [
            {
                id: 'kid-nov-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nc6 8.d5)',
                aliases: ['Classical main line'],
                eco: 'E94',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'fianchetto'],
                strategicIdeas: [
                    'White closes the centre with 8.d5, gaining space.',
                    'Black reroutes the knight via e7 to d7 or c5.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 pawn break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 White gains space in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 5,
            },
            {
                id: 'kid-nov-samisch',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (5.f3 O-O 6.Be3)',
                aliases: ['Sämisch main'],
                eco: 'E81',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'pawn-structure'],
                strategicIdeas: [
                    'White builds a pawn wedge with e4, d4 and f3.',
                    'Black develops and prepares the ...e5 break.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 White completes the Sämisch setup.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'kid-nov-four-pawns',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (5.f4 O-O 6.Nf3)',
                aliases: ['Four Pawns main'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'White builds a massive pawn centre.',
                    'Black prepares the counterstrike ...c5.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 White completes the Four Pawns Attack setup.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 3,
            },
            {
                id: 'kid-nov-fianchetto',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (6.Nf3 Nbd7 7.O-O)',
                aliases: ['Fianchetto main'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'development', 'castling'],
                strategicIdeas: [
                    'White fianchettoes and castles quickly.',
                    'Black develops the b8 knight to d7.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O White castles in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
            {
                id: 'kid-nov-averbakh',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (4.e4 d6 5.Bg5)',
                aliases: ['Averbakh Variation'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'development'],
                strategicIdeas: [
                    'White pins the f6 knight with the bishop on g5.',
                    'Black continues with the standard ...O-O setup.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 White plays the Averbakh Variation, pinning the f6 knight.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 2,
            },
            {
                id: 'kid-nov-petrosian',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (4.e4 d6 5.Bf4)',
                aliases: ['Petrosian Variation'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'development', 'pawn-structure'],
                strategicIdeas: [
                    'White develops the bishop to f4, eyeing d6 and c7.',
                    'Black continues the standard King\'s Indian setup.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 White plays the Petrosian Variation, developing the bishop actively.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 2,
            },
            {
                id: 'kid-nov-bd3',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (6.Bd3 Nc6)',
                aliases: ['Bd3 Classical main'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'development'],
                strategicIdeas: [
                    'White develops the bishop to d3, eyeing the kingside.',
                    'Black develops the b8 knight to c6.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...e5 break',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 White meets the Bd3 Classical with Black developing the knight in the King\'s Indian.',
                reviewPriority: 3,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 2,
            },
            {
                id: 'kid-nov-classical-nbd7',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7)',
                aliases: ['Classical Nbd7 line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'fianchetto', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the b8 knight to d7.',
                    'White keeps the centre flexible before committing.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 Black develops the knight to d7 in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 8,
                masteryXp: 160,
                difficulty: 3,
                popularity: 4,
            },
        ],
    },
    intermediate: {
        lines: [
            {
                id: 'kid-int-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nc6 8.d5 Ne7)',
                aliases: ['Classical main line'],
                eco: 'E94',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'fianchetto'],
                strategicIdeas: [
                    'White gains space with 8.d5, fixing the centre.',
                    'Black reroutes the knight from c6 to e7.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 pawn break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 White gains space and Black reroutes the knight in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 5,
            },
            {
                id: 'kid-int-samisch-main',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (6.Be3 Nc6 7.Nge2)',
                aliases: ['Sämisch main line'],
                eco: 'E84',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'Nc6', 'Nge2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'piece-activity'],
                strategicIdeas: [
                    'White develops the knight to e2, keeping the f3 pawn.',
                    'Black builds a knight on c6 and prepares ...e5.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 Nc6 7.Nge2 White develops the knight to e2 in the Sämisch Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'kid-int-four-pawns-main',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (6.Nf3 c5 7.dxc5)',
                aliases: ['Four Pawns main line'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3', 'c5', 'dxc5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'Black strikes with the ...c5 break.',
                    'White captures, opening the position for both sides.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.dxc5 Black plays the ...c5 break in the Four Pawns Attack.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'kid-int-fianchetto-main',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (7.O-O e5 8.d5)',
                aliases: ['Fianchetto main line'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O', 'e5', 'd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'Black plays ...e5, striking at the centre.',
                    'White closes with 8.d5, gaining queenside space.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O e5 8.d5 White gains space in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 4,
            },
            {
                id: 'kid-int-averbakh-main',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2)',
                aliases: ['Averbakh main line'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5', 'O-O', 'Nf3', 'Nbd7', 'Qd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'development'],
                strategicIdeas: [
                    'White maintains the pin on f6 with the queen on d2.',
                    'Black develops the b8 knight to d7.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 White maintains the pin in the Averbakh Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 2,
            },
            {
                id: 'kid-int-petrosian-main',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (5.Bf4 O-O 6.Nf3 c5 7.dxc5)',
                aliases: ['Petrosian main line'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4', 'O-O', 'Nf3', 'c5', 'dxc5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'central-control', 'pawn-structure'],
                strategicIdeas: [
                    'Black strikes with the ...c5 break.',
                    'White captures, opening the centre.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 O-O 6.Nf3 c5 7.dxc5 Black plays the ...c5 break in the Petrosian Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 2,
            },
            {
                id: 'kid-int-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (7.O-O Nc6)',
                aliases: ['Bd3 Classical main line'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'White castles, completing development.',
                    'Black develops the b8 knight to c6.'
                ],
                commonMistakes: [
                    'Giving up the centre without compensation',
                    'Allowing Black easy piece development'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O White castles in the Bd3 Classical Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 2,
            },
            {
                id: 'kid-int-9-g5',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ng5)',
                aliases: ['9.Ng5 sideline'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ng5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'kingside-expansion', 'weak-squares'],
                strategicIdeas: [
                    'White probes with 9.Ng5, eyeing the kingside.',
                    'Black must watch for sacrifices on f7 or h7.'
                ],
                commonMistakes: [
                    'Allowing a damaging knight sacrifice',
                    'Weakening the kingside unnecessarily'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ng5 White probes the kingside in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'kid-int-9-bd3',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Bd3)',
                aliases: ['9.Bd3 sideline'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Bd3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'development'],
                strategicIdeas: [
                    'White repositions the bishop to d3.',
                    'Black prepares the ...f5 pawn break.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Bd3 White repositions the bishop in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
            {
                id: 'kid-int-9-re1',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.Re1)',
                aliases: ['8.Re1 sideline'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'Re1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['rook-activity', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White centralises the rook on e1.',
                    'Black develops the b8 knight to d7.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.Re1 White centralises the rook in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 12,
                masteryXp: 240,
                difficulty: 4,
                popularity: 3,
            },
        ],
    },
    advanced: {
        lines: [
            {
                id: 'kid-adv-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ne1)',
                aliases: ['Classical main line'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White reroutes the knight from f3 to e1, heading for d3.',
                    'Black prepares the ...f5 pawn break.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ne1 White reroutes the knight in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 5,
            },
            {
                id: 'kid-adv-samisch-main',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (6.Be3 Nc6 7.Nge2 a6 8.Qd2)',
                aliases: ['Sämisch main line'],
                eco: 'E84',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'Nc6', 'Nge2', 'a6', 'Qd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'piece-activity'],
                strategicIdeas: [
                    'White prepares queenside castling with Qd2.',
                    'Black gains space with ...a6.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 Nc6 7.Nge2 a6 8.Qd2 White prepares queenside castling in the Sämisch Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-four-pawns-main',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (6.Nf3 c5 7.dxc5 dxc5 8.e5)',
                aliases: ['Four Pawns main line'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3', 'c5', 'dxc5', 'dxc5', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'White pushes 8.e5, gaining space in the centre.',
                    'Black has an isolated pawn on c5 to target.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.e5 White pushes in the centre in the Four Pawns Attack.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-fianchetto-main',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (8.d5 a5 9.a4)',
                aliases: ['Fianchetto main line'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O', 'e5', 'd5', 'a5', 'a4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'space-advantage', 'pawn-structure'],
                strategicIdeas: [
                    'White fixes the queenside with 9.a4.',
                    'Black plays ...a5 for counterplay.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O e5 8.d5 a5 9.a4 White fixes the queenside in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 4,
            },
            {
                id: 'kid-adv-averbakh-main',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 e5 8.d5)',
                aliases: ['Averbakh main line'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5', 'O-O', 'Nf3', 'Nbd7', 'Qd2', 'e5', 'd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'space-advantage'],
                strategicIdeas: [
                    'White closes the centre with 8.d5.',
                    'Black has a solid but passive structure.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 e5 8.d5 White closes the centre in the Averbakh Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 2,
            },
            {
                id: 'kid-adv-petrosian-main',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2)',
                aliases: ['Petrosian main line'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4', 'O-O', 'Nf3', 'c5', 'dxc5', 'dxc5', 'Be2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'central-control', 'pawn-structure'],
                strategicIdeas: [
                    'White retreats the bishop to e2 after the ...c5 break.',
                    'Black has an isolated pawn on c5.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 White retreats the bishop in the Petrosian Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 2,
            },
            {
                id: 'kid-adv-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (7.O-O e5)',
                aliases: ['Bd3 Classical main line'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6', 'O-O', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'castling'],
                strategicIdeas: [
                    'Black strikes the centre with ...e5.',
                    'White has a solid Bd3 setup to meet it.'
                ],
                commonMistakes: [
                    'Giving up the centre without compensation',
                    'Allowing Black easy piece development'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O e5 Black plays ...e5 in the Bd3 Classical Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 2,
            },
            {
                id: 'kid-adv-9-g5-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ng5 h6 10.Nh3)',
                aliases: ['9.Ng5 main line'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ng5', 'h6', 'Nh3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'kingside-expansion', 'weak-squares'],
                strategicIdeas: [
                    'Black kicks the knight with 9...h6.',
                    'White retreats to h3, keeping the knight.'
                ],
                commonMistakes: [
                    'Allowing a damaging knight sacrifice',
                    'Weakening the kingside unnecessarily'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ng5 h6 10.Nh3 Black kicks the knight in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-9-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Bd3 c6)',
                aliases: ['9.Bd3 main line'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Bd3', 'c6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'development'],
                strategicIdeas: [
                    'Black challenges the d5 pawn with ...c6.',
                    'White repositions the bishop to d3.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Bd3 c6 Black challenges the centre in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-9-re1-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.Re1 Re8 9.Bf1)',
                aliases: ['8.Re1 main line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'Re1', 'Re8', 'Bf1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['rook-activity', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'Black mirrors with ...Re8, supporting ...e5.',
                    'White repositions the bishop to f1.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.Re1 Re8 9.Bf1 Black supports the centre in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-9-b4-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.b4)',
                aliases: ['9.b4 sideline'],
                eco: 'E95',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'b4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'central-control'],
                strategicIdeas: [
                    'White expands on the queenside with 9.b4.',
                    'Black reroutes the knight to e7.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.b4 White expands on the queenside in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
            {
                id: 'kid-adv-9-a4-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.a4)',
                aliases: ['8.a4 sideline'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'a4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'piece-activity'],
                strategicIdeas: [
                    'White gains queenside space with 8.a4.',
                    'Black develops the b8 knight to d7.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.a4 White gains space in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 14,
                masteryXp: 340,
                difficulty: 5,
                popularity: 3,
            },
        ],
    },
    expert: {
        lines: [
            {
                id: 'kid-exp-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ne1 Nd7 10.f3)',
                aliases: ['Classical main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'White prepares g4 with 10.f3, supporting a kingside pawn storm.',
                    'Black reroutes the f6 knight to d7.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ne1 Nd7 10.f3 White prepares a kingside pawn storm in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 5,
            },
            {
                id: 'kid-exp-samisch-main',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (7.Nge2 a6 8.Qd2 Nd7 9.O-O-O)',
                aliases: ['Sämisch main line'],
                eco: 'E85',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'Nc6', 'Nge2', 'a6', 'Qd2', 'Nd7', 'O-O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'castling'],
                strategicIdeas: [
                    'White castles queenside, launching a pawn storm.',
                    'Black prepares ...b5 for counterplay.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 Nc6 7.Nge2 a6 8.Qd2 Nd7 9.O-O-O White castles queenside in the Sämisch Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-four-pawns-main',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (7.dxc5 Nfd7 8.e5 dxe5 9.fxe5)',
                aliases: ['Four Pawns main line'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3', 'c5', 'dxc5', 'Nfd7', 'e5', 'dxe5', 'fxe5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'White pushes e5, opening the centre.',
                    'Black recaptures with the d6 pawn, then White recaptures with the f-pawn.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.dxc5 Nfd7 8.e5 dxe5 9.fxe5 White opens the centre in the Four Pawns Attack.',
                reviewPriority: 3,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-fianchetto-main',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (8.d5 a5 9.a4 Ne8 10.Re1)',
                aliases: ['Fianchetto main line'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O', 'e5', 'd5', 'a5', 'a4', 'Ne8', 'Re1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'space-advantage', 'rook-activity'],
                strategicIdeas: [
                    'Black reroutes the knight to e8, heading for c7 or d6.',
                    'White centralises the rook on e1.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O e5 8.d5 a5 9.a4 Ne8 10.Re1 Black reroutes the knight in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 4,
            },
            {
                id: 'kid-exp-averbakh-main',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (7.Qd2 e5 8.d5 a5 9.a4)',
                aliases: ['Averbakh main line'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5', 'O-O', 'Nf3', 'Nbd7', 'Qd2', 'e5', 'd5', 'a5', 'a4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'space-advantage'],
                strategicIdeas: [
                    'White fixes the queenside with 9.a4.',
                    'Black plays ...a5 for counterplay.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 e5 8.d5 a5 9.a4 White fixes the queenside in the Averbakh Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 2,
            },
            {
                id: 'kid-exp-petrosian-main',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O)',
                aliases: ['Petrosian main line'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4', 'O-O', 'Nf3', 'c5', 'dxc5', 'dxc5', 'Be2', 'Nc6', 'O-O'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'central-control', 'castling'],
                strategicIdeas: [
                    'White castles, completing development.',
                    'Black develops the b8 knight to c6.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O White castles in the Petrosian Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 2,
            },
            {
                id: 'kid-exp-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (8.d5 e5)',
                aliases: ['Bd3 Classical main line'],
                eco: 'E90',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6', 'O-O', 'e5', 'd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'castling'],
                strategicIdeas: [
                    'White closes the centre with 8.d5, gaining space.',
                    'Black has a solid Bd3 setup to meet.'
                ],
                commonMistakes: [
                    'Giving up the centre without compensation',
                    'Allowing Black easy piece development'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O e5 8.d5 White gains space in the Bd3 Classical Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 2,
            },
            {
                id: 'kid-exp-9-g5-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7)',
                aliases: ['9.Ng5 main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ng5', 'h6', 'Nh3', 'Kh7'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'kingside-expansion', 'king-safety'],
                strategicIdeas: [
                    'Black tucks the king to h7, avoiding tactics.',
                    'White keeps the knight on h3.'
                ],
                commonMistakes: [
                    'Allowing a damaging knight sacrifice',
                    'Weakening the kingside unnecessarily'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7 Black tucks the king in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-9-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Bd3 Nd7 10.Ne1)',
                aliases: ['9.Bd3 main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Bd3', 'Nd7', 'Ne1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White reroutes the knight to e1, heading for d3.',
                    'Black reroutes the f6 knight to d7.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Bd3 Nd7 10.Ne1 White reroutes the knight in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-9-re1-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4)',
                aliases: ['8.Re1 main line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'Re1', 'Re8', 'Bf1', 'a5', 'a4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['rook-activity', 'pawn-structure', 'space-advantage'],
                strategicIdeas: [
                    'White fixes the queenside with 10.a4.',
                    'Black plays ...a5 for counterplay.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4 White fixes the queenside in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-9-b4-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.b4 Nf5 10.exf5)',
                aliases: ['9.b4 main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'b4', 'Nf5', 'exf5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'Black strikes with the ...f5 pawn break.',
                    'White captures, opening the f-file.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.b4 Nf5 10.exf5 Black strikes with ...Nf5 in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
            {
                id: 'kid-exp-9-a4-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.a4 a5 9.h3)',
                aliases: ['8.a4 main line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'a4', 'a5', 'h3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'space-advantage', 'king-safety'],
                strategicIdeas: [
                    'White prevents ...b5 with 8.a4.',
                    'Black fixes the queenside with ...a5.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.a4 a5 9.h3 White prevents ...b5 in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 16,
                masteryXp: 460,
                difficulty: 6,
                popularity: 3,
            },
        ],
    },
    master: {
        lines: [
            {
                id: 'kid-mas-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ne1 Nd7 10.f3 f5 11.exf5)',
                aliases: ['Classical main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'f3', 'f5', 'exf5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'Black launches the thematic ...f5 pawn storm.',
                    'White captures, opening the f-file for both sides.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ne1 Nd7 10.f3 f5 11.exf5 Black launches the ...f5 storm in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 5,
            },
            {
                id: 'kid-mas-samisch-main',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (7.Nge2 a6 8.Qd2 Nd7 9.O-O-O b5 10.cxb5)',
                aliases: ['Sämisch main line'],
                eco: 'E85',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'Nc6', 'Nge2', 'a6', 'Qd2', 'Nd7', 'O-O-O', 'b5', 'cxb5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'pawn-storm'],
                strategicIdeas: [
                    'Black strikes with ...b5, opening the queenside.',
                    'White captures, opening lines toward the Black king.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 Nc6 7.Nge2 a6 8.Qd2 Nd7 9.O-O-O b5 10.cxb5 Black strikes with ...b5 in the Sämisch Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'kid-mas-four-pawns-main',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (7.dxc5 Nfd7 8.e5 dxe5 9.fxe5 Nc6)',
                aliases: ['Four Pawns main line'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3', 'c5', 'dxc5', 'Nfd7', 'e5', 'dxe5', 'fxe5', 'Nc6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'White recaptures on e5 with the f-pawn, keeping a strong centre.',
                    'Black develops the b8 knight to c6.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.dxc5 Nfd7 8.e5 dxe5 9.fxe5 Nc6 White opens the centre in the Four Pawns Attack.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'kid-mas-fianchetto-main',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (8.d5 a5 9.a4 Ne8 10.Re1 f5 11.g4)',
                aliases: ['Fianchetto main line'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O', 'e5', 'd5', 'a5', 'a4', 'Ne8', 'Re1', 'f5', 'g4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'space-advantage', 'pawn-storm'],
                strategicIdeas: [
                    'Black launches the ...f5 pawn storm.',
                    'White captures, opening the f-file.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O e5 8.d5 a5 9.a4 Ne8 10.Re1 f5 11.g4 White challenges the ...f5 break in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 4,
            },
            {
                id: 'kid-mas-averbakh-main',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (7.Qd2 e5 8.d5 a5 9.a4 Ne8 10.Bh6)',
                aliases: ['Averbakh main line'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5', 'O-O', 'Nf3', 'Nbd7', 'Qd2', 'e5', 'd5', 'a5', 'a4', 'Ne8', 'Bh6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on the d5 outpost.',
                    'Black reroutes the knight to e8.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 e5 8.d5 a5 9.a4 Ne8 10.Bh6 White trades off the dark-squared bishop in the Averbakh Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 2,
            },
            {
                id: 'kid-mas-petrosian-main',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O b6 10.Qd2)',
                aliases: ['Petrosian main line'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4', 'O-O', 'Nf3', 'c5', 'dxc5', 'dxc5', 'Be2', 'Nc6', 'O-O', 'b6', 'Qd2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'central-control', 'development'],
                strategicIdeas: [
                    'White centralises the queen with 10.Qd2.',
                    'Black develops the bishop to b7.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O b6 10.Qd2 White centralises the queen in the Petrosian Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 2,
            },
            {
                id: 'kid-mas-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (8.d5 Ne7 9.Re1)',
                aliases: ['Bd3 Classical main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6', 'O-O', 'e5', 'd5', 'Ne7', 'Re1'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'rook-activity'],
                strategicIdeas: [
                    'White centralises the rook on e1.',
                    'Black reroutes the knight from c6 to e7.'
                ],
                commonMistakes: [
                    'Giving up the centre without compensation',
                    'Allowing Black easy piece development'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O e5 8.d5 Ne7 9.Re1 White centralises the rook in the Bd3 Classical Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 2,
            },
            {
                id: 'kid-mas-9-g5-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7 11.f3)',
                aliases: ['9.Ng5 main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ng5', 'h6', 'Nh3', 'Kh7', 'f3'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'kingside-expansion', 'pawn-storm'],
                strategicIdeas: [
                    'White prepares g4 with 11.f3, supporting a pawn storm.',
                    'Black tucks the king to h7.'
                ],
                commonMistakes: [
                    'Allowing a damaging knight sacrifice',
                    'Weakening the kingside unnecessarily'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7 11.f3 White prepares a pawn storm in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'kid-mas-9-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Bd3 Nd7 10.Ne1 f5 11.exf5)',
                aliases: ['9.Bd3 main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Bd3', 'Nd7', 'Ne1', 'f5', 'exf5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'Black launches the thematic ...f5 pawn storm.',
                    'White captures, opening the f-file.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Bd3 Nd7 10.Ne1 f5 11.exf5 Black launches ...f5 in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
            {
                id: 'kid-mas-9-re1-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4 Nc5 11.Nxe5)',
                aliases: ['8.Re1 main line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'Re1', 'Re8', 'Bf1', 'a5', 'a4', 'Nc5', 'Nxe5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['rook-activity', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'Black jumps the knight to e5, a strong outpost.',
                    'White captures, opening the position.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4 Nc5 11.Nxe5 White wins the e5 pawn in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 18,
                masteryXp: 600,
                difficulty: 7,
                popularity: 3,
            },
        ],
    },
    legend: {
        lines: [
            {
                id: 'kid-leg-classical-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ne1 Nd7 10.f3 f5 11.exf5 Nxf5 12.g4)',
                aliases: ['Classical main line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ne1', 'Nd7', 'f3', 'f5', 'exf5', 'Nxf5', 'g4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'White launches a pawn storm with 12.g4 against the Black king.',
                    'Black recaptures on f5, keeping the kingside fluid.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ne1 Nd7 10.f3 f5 11.exf5 Nxf5 12.g4 White storms the king in the Classical King\'s Indian.',
                reviewPriority: 5,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 5,
            },
            {
                id: 'kid-leg-samisch-main',
                parentVariation: OPENING_NAME,
                variationName: 'Samisch (7.Nge2 a6 8.Qd2 Nd7 9.O-O-O b5 10.cxb5 axb5 11.Nxb5)',
                aliases: ['Sämisch main line'],
                eco: 'E85',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f3', 'O-O', 'Be3', 'Nc6', 'Nge2', 'a6', 'Qd2', 'Nd7', 'O-O-O', 'b5', 'cxb5', 'axb5', 'Nxb5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['pawn-chain', 'kingside-expansion', 'pawn-storm'],
                strategicIdeas: [
                    'White grabs the b5 pawn with the knight, opening lines.',
                    'Black has counterplay with the b-pawn and queenside pawns.'
                ],
                commonMistakes: [
                    'Weakening the king position with premature pawn pushes',
                    'Allowing Black a strong ...c5 break'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f3 O-O 6.Be3 Nc6 7.Nge2 a6 8.Qd2 Nd7 9.O-O-O b5 10.cxb5 axb5 11.Nxb5 White grabs the b5 pawn in the Sämisch Variation.',
                reviewPriority: 5,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'kid-leg-four-pawns-main',
                parentVariation: OPENING_NAME,
                variationName: 'Four Pawns (7.dxc5 Nfd7 8.e5 dxe5 9.fxe5 Nc6 10.Be2 b6 11.O-O Re8 12.Qe1 a5 13.a4 Na7 14.Bd3 Nc6)',
                aliases: ['Four Pawns deep line'],
                eco: 'E77',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'f4', 'O-O', 'Nf3', 'c5', 'dxc5', 'Nfd7', 'e5', 'dxe5', 'fxe5', 'Nc6', 'Be2', 'b6', 'O-O', 'Re8', 'Qe1', 'a5', 'a4', 'Na7', 'Bd3', 'Nc6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'central-control', 'pawn-storm'],
                strategicIdeas: [
                    'White recaptures on e5 and develops, keeping a strong centre.',
                    'Black reroutes the knight via a7 to c6 to support the queenside.'
                ],
                commonMistakes: [
                    'Overextending without piece support',
                    'Allowing Black a successful central counterstrike'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.f4 O-O 6.Nf3 c5 7.dxc5 Nfd7 8.e5 dxe5 9.fxe5 Nc6 10.Be2 b6 11.O-O Re8 12.Qe1 a5 13.a4 Na7 14.Bd3 Nc6 White centralises in the Four Pawns Attack.',
                reviewPriority: 4,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'kid-leg-fianchetto-main',
                parentVariation: OPENING_NAME,
                variationName: 'Fianchetto (8.d5 a5 9.a4 Ne8 10.Re1 f5 11.g4 fxg4 12.h3 Ne8 13.Qd2 b6 14.Rab1 Re8 15.Qe1 Rc8)',
                aliases: ['Fianchetto deep line'],
                eco: 'E62',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'g3', 'O-O', 'Bg2', 'd6', 'Nf3', 'Nbd7', 'O-O', 'e5', 'd5', 'a5', 'a4', 'Ne8', 'Re1', 'f5', 'g4', 'fxg4', 'h3', 'Ne8', 'Qd2', 'b6', 'Rab1', 'Re8', 'Qe1', 'Rc8'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['fianchetto', 'space-advantage', 'pawn-storm'],
                strategicIdeas: [
                    'White meets ...f5 with g4, opening the g-file after the exchange on g4.',
                    'Black recaptures and reroutes the knight to e8.'
                ],
                commonMistakes: [
                    'Rushing ...e5 before completing development',
                    'Allowing White a strong grip on the centre'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.g3 O-O 5.Bg2 d6 6.Nf3 Nbd7 7.O-O e5 8.d5 a5 9.a4 Ne8 10.Re1 f5 11.g4 fxg4 12.h3 Ne8 13.Qd2 b6 14.Rab1 Re8 15.Qe1 Rc8 White opens the g-file in the Fianchetto Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 4,
            },
            {
                id: 'kid-leg-averbakh-main',
                parentVariation: OPENING_NAME,
                variationName: 'Averbakh (7.Qd2 e5 8.d5 a5 9.a4 Ne8 10.Bh6 Ndb6 11.b4 axb4 12.Nxb4 c5 13.Nd3 Ndb6 14.f4 f6 15.Bd2 fxe5 16.fxe5)',
                aliases: ['Averbakh deep line'],
                eco: 'E73',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bg5', 'O-O', 'Nf3', 'Nbd7', 'Qd2', 'e5', 'd5', 'a5', 'a4', 'Ne8', 'Bh6', 'Ndb6', 'b4', 'axb4', 'Nxb4', 'c5', 'Nd3', 'Ndb6', 'f4', 'f6', 'Bd2', 'fxe5', 'fxe5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'pawn-structure', 'outpost'],
                strategicIdeas: [
                    'White plants a knight on d5 then reroutes after the pawn storm.',
                    'Black challenges the centre with ...f6.'
                ],
                commonMistakes: [
                    'Allowing Black to break the pin comfortably',
                    'Wasting time with the bishop'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bg5 O-O 6.Nf3 Nbd7 7.Qd2 e5 8.d5 a5 9.a4 Ne8 10.Bh6 Ndb6 11.b4 axb4 12.Nxb4 c5 13.Nd3 Ndb6 14.f4 f6 15.Bd2 fxe5 16.fxe5 White reroutes in the Averbakh Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 2,
            },
            {
                id: 'kid-leg-petrosian-main',
                parentVariation: OPENING_NAME,
                variationName: 'Petrosian (5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O b6 10.Qd2 Bb7 11.Rad1 Rc8 12.h3 Qd7 13.b4 cxb4 14.Nb5 Ne5)',
                aliases: ['Petrosian deep line'],
                eco: 'E70',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Bf4', 'O-O', 'Nf3', 'c5', 'dxc5', 'dxc5', 'Be2', 'Nc6', 'O-O', 'b6', 'Qd2', 'Bb7', 'Rad1', 'Rc8', 'h3', 'Qd7', 'b4', 'cxb4', 'Nb5', 'Ne5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'central-control', 'development'],
                strategicIdeas: [
                    'White opens the position with the b4 pawn break.',
                    'Black jumps the knight to the e5 outpost.'
                ],
                commonMistakes: [
                    'Allowing Black a comfortable ...e5 break',
                    'Developing the bishop passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Bf4 O-O 6.Nf3 c5 7.dxc5 dxc5 8.Be2 Nc6 9.O-O b6 10.Qd2 Bb7 11.Rad1 Rc8 12.h3 Qd7 13.b4 cxb4 14.Nb5 Ne5 White opens lines in the Petrosian Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 2,
            },
            {
                id: 'kid-leg-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical Bd3 (8.d5 Ne7 9.Re1 Re8 10.Bf1 a5 11.a4 Nf5 12.Qd2 Nh4)',
                aliases: ['Bd3 Classical deep line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Bd3', 'Nc6', 'O-O', 'e5', 'd5', 'Ne7', 'Re1', 'Re8', 'Bf1', 'a5', 'a4', 'Nf5', 'Qd2', 'Nh4'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'White prepares a kingside pawn storm with the rook on e1.',
                    'Black reroutes the knight to f5 and then to h4.'
                ],
                commonMistakes: [
                    'Giving up the centre without compensation',
                    'Allowing Black easy piece development'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Bd3 Nc6 7.O-O e5 8.d5 Ne7 9.Re1 Re8 10.Bf1 a5 11.a4 Nf5 12.Qd2 Nh4 White storms the king in the Bd3 Classical Variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 2,
            },
            {
                id: 'kid-leg-9-g5-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7 11.f3 Nfg8 12.g4 Nf6 13.Nf2 b6 14.a4 a5 15.b3 Rb8 16.Bd3 Nf5 17.c6)',
                aliases: ['9.Ng5 deep line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Ng5', 'h6', 'Nh3', 'Kh7', 'f3', 'Nfg8', 'g4', 'Nf6', 'Nf2', 'b6', 'a4', 'a5', 'b3', 'Rb8', 'Bd3', 'Nf5', 'c6'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['piece-activity', 'kingside-expansion', 'pawn-storm'],
                strategicIdeas: [
                    'White prepares a pawn storm with g4 and f3.',
                    'Black reroutes the knight and tucks the king to h7.'
                ],
                commonMistakes: [
                    'Allowing a damaging knight sacrifice',
                    'Weakening the kingside unnecessarily'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Ng5 h6 10.Nh3 Kh7 11.f3 Nfg8 12.g4 Nf6 13.Nf2 b6 14.a4 a5 15.b3 Rb8 16.Bd3 Nf5 17.c6 White storms the king in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'kid-leg-9-bd3-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (8.d5 Ne7 9.Bd3 Nd7 10.Ne1 f5 11.exf5 gxf5 12.g4 Nf6 13.Ng2 Ng6 14.h4 Ne7 15.Nf4 h5 16.gxh5 Nxd5 17.cxd5)',
                aliases: ['9.Bd3 deep line'],
                eco: 'E97',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nc6', 'd5', 'Ne7', 'Bd3', 'Nd7', 'Ne1', 'f5', 'exf5', 'gxf5', 'g4', 'Nf6', 'Ng2', 'Ng6', 'h4', 'Ne7', 'Nf4', 'h5', 'gxh5', 'Nxd5', 'cxd5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['space-advantage', 'pawn-structure', 'pawn-storm'],
                strategicIdeas: [
                    'White prepares g4 and h4 to storm the Black king.',
                    'Black recaptures on f5 and reroutes the knight.'
                ],
                commonMistakes: [
                    'Allowing Black a strong ...f5 break',
                    'Delaying the d5 space-gaining advance'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nc6 8.d5 Ne7 9.Bd3 Nd7 10.Ne1 f5 11.exf5 gxf5 12.g4 Nf6 13.Ng2 Ng6 14.h4 Ne7 15.Nf4 h5 16.gxh5 Nxd5 17.cxd5 White storms the king in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 22,
                masteryXp: 800,
                difficulty: 8,
                popularity: 3,
            },
            {
                id: 'kid-leg-9-re1-main',
                parentVariation: OPENING_NAME,
                variationName: 'Classical (7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4 Nc5 11.Nxe5 Rxe5 12.dxe5 dxe5 13.Bd3 Qe8 14.b3 Qe6 15.Re3 Rad8 16.Qe2 b6 17.Bc2)',
                aliases: ['8.Re1 deep line'],
                eco: 'E92',
                sanMoves: ['d4', 'Nf6', 'c4', 'g6', 'Nc3', 'Bg7', 'e4', 'd6', 'Nf3', 'O-O', 'Be2', 'e5', 'O-O', 'Nbd7', 'Re1', 'Re8', 'Bf1', 'a5', 'a4', 'Nc5', 'Nxe5', 'Rxe5', 'dxe5', 'dxe5', 'Bd3', 'Qe8', 'b3', 'Qe6', 'Re3', 'Rad8', 'Qe2', 'b6', 'Bc2'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['rook-activity', 'pawn-structure', 'piece-activity'],
                strategicIdeas: [
                    'White recaptures and centralises the rook on e3.',
                    'Black trades rooks and reroutes the queen.'
                ],
                commonMistakes: [
                    'Allowing White a strong d5 space gain',
                    'Developing pieces passively'
                ],
                explanation: 'After 1.d4 Nf6 2.c4 g6 3.Nc3 Bg7 4.e4 d6 5.Nf3 O-O 6.Be2 e5 7.O-O Nbd7 8.Re1 Re8 9.Bf1 a5 10.a4 Nc5 11.Nxe5 Rxe5 12.dxe5 dxe5 13.Bd3 Qe8 14.b3 Qe6 15.Re3 Rad8 16.Qe2 b6 17.Bc2 White centralises in the Classical Variation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 22,
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
    description: 'The King\'s Indian Defense is a hypermodern, counterpunching response to 1.d4 built on 1...Nf6 2...g6 and 3...Bg7. Black allows White a broad centre, then strikes with ...e5 and a pawn storm. Favoured by aggressive players such as Fischer, Kasparov, and Nakamura.',
    typicalPawnStructures: [
        'Closed centre with White pawns on d4/e4 and Black on d6/e5',
        'Maroczy-style space bind after White plays d5',
        'Pawn storm structures with ...f5 and ...g5',
        'Exchange Variation hanging-pawn and IQP structures'
    ],
    commonTacticalThemes: [
        'The ...f5 pawn break and kingside storm',
        'Knight outposts on e5, d5, and c5',
        'Piece sacrifices on the kingside',
        'Opposite-side castling attacks'
    ],
    modelPlayers: ['Bobby Fischer', 'Garry Kasparov', 'Hikaru Nakamura', 'Teimour Radjabov', 'Boris Gelfand'],
    recommendedStudyOrder: [
        'Classical Variation',
        'Samisch Variation',
        'Four Pawns Attack',
        'Fianchetto Variation',
        'Averbakh Variation',
        'Petrosian Variation',
        'Exchange Variation',
        '9.Ng5 / 9.Bd3 / 8.Re1 sidelines'
    ],
    masteryLevels: [
        { tier: 'Beginner', xpReward: 100, accuracyTarget: 0.7, objectives: ['Recognise the 1...Nf6 2...g6 3...Bg7 setup', 'Play the Classical and Fianchetto main lines'] },
        { tier: 'Novice', xpReward: 160, accuracyTarget: 0.72, objectives: ['Handle the Samisch and Four Pawns attacks', 'Develop pieces after ...O-O'] },
        { tier: 'Intermediate', xpReward: 240, accuracyTarget: 0.75, objectives: ['Execute the ...e5 central break', 'Navigate the Averbakh and Petrosian setups'] },
        { tier: 'Advanced', xpReward: 340, accuracyTarget: 0.78, objectives: ['Launch the ...f5 pawn storm', 'Trade into a comfortable middlegame'] },
        { tier: 'Expert', xpReward: 460, accuracyTarget: 0.8, objectives: ['Centralise rooks and knights', 'Exploit the White space bind'] },
        { tier: 'Master', xpReward: 600, accuracyTarget: 0.82, objectives: ['Convert the bishop-pair advantage', 'Handle the Exchange structure'] },
        { tier: 'Legend', xpReward: 800, accuracyTarget: 0.85, objectives: ['Master all King\'s Indian variations', 'Punish inaccurate White setups'] },
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