const { Chess } = require('chess.js');
const fs = require('fs');
const path = require('path');

const SLUG = 'queens-gambit';
const OPENING_ID = 'queens-gambit';
const OPENING_FAMILY = 'Queen\'s Gambit';
const COLOUR = 'white';
const ECO_RANGE = 'D06–D69';

// Helper to build a line object from SAN moves
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
    for (const move of sanMoves) {
        const result = chess.move(move);
        if (!result) {
            throw new Error(`Invalid move ${move} in line ${id}`);
        }
        uciMoves.push(result.lan ? result.lan : `${result.from}${result.to}${result.promotion || ''}`);
    }
    // Build PGN with move numbers
    const pgnMoves = [];
    for (let i = 0; i < sanMoves.length; i += 2) {
        const moveNum = i / 2 + 1;
        const white = sanMoves[i];
        const black = sanMoves[i + 1] ? ` ${sanMoves[i + 1]}` : '';
        pgnMoves.push(`${moveNum}.${white}${black}`);
    }
    const pgn = pgnMoves.join(' ');
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

// Define all lines per tier
const tiers = {
    Beginner: {
        lines: [
            buildLine({
                id: 'queens-gambit-beginner-qgd-setup',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Basic Setup',
                aliases: ['QGD Main Line'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bf4'],
                prerequisites: [],
                continuationIds: ['queens-gambit-novice-qgd-exchange'],
                conceptIds: ['development', 'central-control', 'pawn-structure'],
                strategicIdeas: [
                    'White offers a pawn with c4 to fight for the centre.',
                    'Black declines with e6, keeping a solid pawn chain.',
                    'Bf4 develops the bishop actively before committing the e-pawn.'
                ],
                commonMistakes: [
                    'Capturing on d5 too early without preparation',
                    'Developing the queen bishop to g5 before completing development'
                ],
                explanation: 'The Queen\'s Gambit Declined is the most solid response to 1.d4 d5 2.c4. Black supports the d5 pawn with e6, creating a resilient pawn structure. White develops naturally with Nc3 and Bf4, preparing to castle and later strike in the centre with e3 or cxd5.',
                reviewPriority: 5,
                estimatedStudyMinutes: 2,
                masteryXp: 10,
                difficulty: 1,
                popularity: 5,
            }),
            buildLine({
                id: 'queens-gambit-beginner-slav-setup',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Basic Setup',
                aliases: ['Slav Main Line'],
                eco: 'D10',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3'],
                prerequisites: [],
                continuationIds: ['queens-gambit-novice-slav-exchange'],
                conceptIds: ['development', 'central-control', 'pawn-structure'],
                strategicIdeas: [
                    'Black supports d5 with c6, keeping the bishop on c8 free.',
                    'The Slav is one of the most resilient defences to the Queen\'s Gambit.',
                    'White continues with Nf3, maintaining central tension.'
                ],
                commonMistakes: [
                    'Playing cxd5 too early, releasing central tension',
                    'Neglecting piece development for premature pawn pushes'
                ],
                explanation: 'The Slav Defence (2...c6) is a rock-solid response to the Queen\'s Gambit. By supporting d5 with the c-pawn, Black keeps the bishop on c8 active and avoids the passive positions sometimes seen in the QGD. White develops with Nf3, keeping options open for cxd5 or e3.',
                reviewPriority: 5,
                estimatedStudyMinutes: 2,
                masteryXp: 10,
                difficulty: 1,
                popularity: 5,
            }),
            buildLine({
                id: 'queens-gambit-beginner-accepted-setup',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Basic Setup',
                aliases: ['QGA Main Line'],
                eco: 'D20',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3'],
                prerequisites: [],
                continuationIds: ['queens-gambit-novice-qga-recovery'],
                conceptIds: ['development', 'tempo', 'gambit'],
                strategicIdeas: [
                    'Black accepts the gambit, grabbing a pawn but giving up the centre.',
                    'White plays Nf3 to recover the pawn with e3 or e4.',
                    'The QGA leads to open, tactical positions.'
                ],
                commonMistakes: [
                    'Trying to hold the extra pawn too long as Black',
                    'Recovering the pawn with the wrong piece order'
                ],
                explanation: 'In the Queen\'s Gambit Accepted, Black captures the c4 pawn. White responds with Nf3, preparing to regain the pawn with e3 or e4. The resulting positions are open and require good piece activity. This is an excellent way for beginners to learn about gambit play and central control.',
                reviewPriority: 4,
                estimatedStudyMinutes: 2,
                masteryXp: 10,
                difficulty: 1,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-beginner-tarrasch-setup',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Basic Setup',
                aliases: ['Tarrasch Main Line'],
                eco: 'D32',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5'],
                prerequisites: [],
                continuationIds: ['queens-gambit-novice-tarrasch-main'],
                conceptIds: ['central-control', 'pawn-structure', 'isolated-queens-pawn'],
                strategicIdeas: [
                    'Black challenges the centre immediately with c5.',
                    'This often leads to an isolated queen\'s pawn for one side.',
                    'White can choose between capturing or maintaining tension.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise the centre too easily',
                    'Misplacing pieces in the resulting IQP positions'
                ],
                explanation: 'The Tarrasch Defence (3...c5) is a dynamic response where Black immediately challenges White\'s centre. This often leads to isolated queen\'s pawn structures, which require active piece play. Beginners should understand the central tension and the typical plans for both sides.',
                reviewPriority: 3,
                estimatedStudyMinutes: 2,
                masteryXp: 10,
                difficulty: 1,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-beginner-albin-counter',
                parentVariation: 'Albin Counter-Gambit',
                variationName: 'Albin Counter-Gambit Setup',
                aliases: ['Albin Counter Gambit'],
                eco: 'D08',
                sanMoves: ['d4', 'd5', 'c4', 'e5'],
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'Black counter-gambits with e5, fighting for the centre immediately.',
                    'This is a sharp, aggressive try that can surprise opponents.',
                    'White should accept and consolidate the extra pawn.'
                ],
                commonMistakes: [
                    'Declining the gambit and allowing Black free development',
                    'Underestimating Black\'s central counterplay'
                ],
                explanation: 'The Albin Counter-Gambit (2...e5) is an aggressive response where Black sacrifices a pawn for rapid development and central control. While not theoretically sound at the highest level, it\'s a useful weapon to understand. White should accept the pawn and focus on consolidating.',
                reviewPriority: 2,
                estimatedStudyMinutes: 1.5,
                masteryXp: 10,
                difficulty: 1,
                popularity: 2,
            }),
        ],
    },
    Novice: {
        lines: [
            buildLine({
                id: 'queens-gambit-novice-qgd-exchange',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Exchange Variation',
                aliases: ['Exchange QGD'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5'],
                prerequisites: ['queens-gambit-beginner-qgd-setup'],
                continuationIds: ['queens-gambit-intermediate-exchange-qgd'],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'central-control'],
                strategicIdeas: [
                    'White releases tension with cxd5, leading to a symmetrical pawn structure.',
                    'Black\'s isolated d5 pawn can become a target or a strength.',
                    'The position is a classic example of IQP play.'
                ],
                commonMistakes: [
                    'Allowing Black to easily blockade the d5 pawn',
                    'Trading off the wrong pieces in IQP positions'
                ],
                explanation: 'The Exchange Variation (cxd5 exd5) leads to a symmetrical pawn structure where Black has an isolated queen\'s pawn. White aims to pressure the d5 pawn and use piece activity, while Black seeks dynamic play. This is a fundamental structure every Queen\'s Gambit player must understand.',
                reviewPriority: 5,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 5,
            }),
            buildLine({
                id: 'queens-gambit-novice-slav-exchange',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Exchange Variation',
                aliases: ['Exchange Slav'],
                eco: 'D13',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'cxd5', 'cxd5'],
                prerequisites: ['queens-gambit-beginner-slav-setup'],
                continuationIds: ['queens-gambit-intermediate-slav-main'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades on d5, leading to a symmetrical pawn structure.',
                    'Black\'s bishop pair can become a factor in open positions.',
                    'Both sides aim for piece activity and minority attacks.'
                ],
                commonMistakes: [
                    'Passive play that allows Black\'s bishop pair to dominate',
                    'Premature pawn advances that weaken the structure'
                ],
                explanation: 'The Slav Exchange Variation (cxd5 cxd5) creates a symmetrical pawn structure. Black often develops the bishop to f5 or g4, while White aims for piece activity and a minority attack on the queenside. Understanding this structure is key to mastering the Slav.',
                reviewPriority: 4,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-novice-qga-recovery',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Recovery with e3',
                aliases: ['QGA e3 Line'],
                eco: 'D24',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3'],
                prerequisites: ['queens-gambit-beginner-accepted-setup'],
                continuationIds: ['queens-gambit-intermediate-qga-main'],
                conceptIds: ['development', 'gambit', 'tempo'],
                strategicIdeas: [
                    'White prepares to recapture the c4 pawn with Bxc4.',
                    'The e3 move supports the centre and opens the bishop.',
                    'Black develops naturally with Nf6.'
                ],
                commonMistakes: [
                    'Recapturing the pawn too slowly, allowing Black to consolidate',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'After 2...dxc4, White plays 3.Nf3 and 4.e3 to regain the pawn with Bxc4. This is the most natural way to handle the QGA. The resulting positions are open and require good piece coordination. White should aim for quick development and central control.',
                reviewPriority: 4,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-novice-qgd-orthodox',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Defence',
                aliases: ['Orthodox QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7'],
                prerequisites: ['queens-gambit-beginner-qgd-setup'],
                continuationIds: ['queens-gambit-intermediate-qgd-orthodox-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White pins the f6 knight with Bg5, pressuring the d5 pawn.',
                    'Black develops solidly with Be7, preparing to castle.',
                    'This is the most classical QGD setup.'
                ],
                commonMistakes: [
                    'Releasing the pin too early without reason',
                    'Allowing Black to break with ...c5 or ...e5 too easily'
                ],
                explanation: 'The Orthodox Defence (Bg5 Be7) is the most traditional QGD setup. White pins the f6 knight to increase pressure on d5, while Black develops solidly. This position is the starting point for deep theoretical battles and is essential study for Queen\'s Gambit players.',
                reviewPriority: 5,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 5,
            }),
            buildLine({
                id: 'queens-gambit-novice-tarrasch-main',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Main Line',
                aliases: ['Tarrasch Accepted'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5'],
                prerequisites: ['queens-gambit-beginner-tarrasch-setup'],
                continuationIds: ['queens-gambit-intermediate-tarrasch-rubinstein'],
                conceptIds: ['central-control', 'isolated-queens-pawn', 'pawn-structure'],
                strategicIdeas: [
                    'After cxd5 exd5, Black has an isolated queen\'s pawn.',
                    'White can target the d5 pawn or use piece activity.',
                    'The Tarrasch leads to dynamic, unbalanced positions.'
                ],
                commonMistakes: [
                    'Passive play that lets Black\'s IQP become strong',
                    'Trading pieces that help Black\'s structure'
                ],
                explanation: 'The Tarrasch Main Line (cxd5 exd5) gives Black an isolated queen\'s pawn. White should play actively, targeting d5 and using piece activity. The Tarrasch is a double-edged weapon that requires understanding of IQP dynamics.',
                reviewPriority: 3,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-novice-cambridge-springs',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Setup',
                aliases: ['Cambridge Springs'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7'],
                prerequisites: ['queens-gambit-beginner-qgd-setup'],
                continuationIds: ['queens-gambit-intermediate-cambridge-springs-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the knight to d7, preparing ...c6 and ...Qa5.',
                    'This is a flexible setup that can transpose to many lines.',
                    'White must be careful about the ...Qa5 pin on c3.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Defence (Nbd7) is a flexible QGD setup. Black prepares ...c6 and ...Qa5, creating pressure on c3. White must handle the potential pin carefully. This variation is named after the 1904 tournament where it was popularised.',
                reviewPriority: 3,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-novice-semi-slav',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Setup',
                aliases: ['Semi-Slav Main Line'],
                eco: 'D43',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6'],
                prerequisites: ['queens-gambit-beginner-slav-setup'],
                continuationIds: ['queens-gambit-intermediate-semi-slav-botvinnik'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black combines ...c6 and ...e6, creating a solid but flexible structure.',
                    'The Semi-Slav can lead to both quiet and sharp positions.',
                    'White develops naturally with Nf3 and Nc3.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...dxc4',
                    'Premature central breaks that backfire'
                ],
                explanation: 'The Semi-Slav Defence (...c6 and ...e6) is one of the most popular modern defences. It combines the solidity of the Slav with the flexibility of the QGD. White develops with Nf3 and Nc3, preparing to meet Black\'s central breaks. This is a critical opening for any serious Queen\'s Gambit player.',
                reviewPriority: 4,
                estimatedStudyMinutes: 2,
                masteryXp: 15,
                difficulty: 2,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-novice-chicago',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Central Defence',
                aliases: ['Central QGA'],
                eco: 'D21',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'e4'],
                prerequisites: ['queens-gambit-beginner-accepted-setup'],
                continuationIds: ['queens-gambit-intermediate-qga-classical'],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'White grabs the centre immediately with e4, ignoring the c4 pawn.',
                    'This leads to a massive central pawn duo (d4+e4).',
                    'Black must find a way to challenge the centre.'
                ],
                commonMistakes: [
                    'Allowing White to consolidate the central pawns',
                    'Developing pieces passively against the central duo'
                ],
                explanation: 'The Central Defence (3.e4) is a bold try in the QGA where White ignores the c4 pawn and grabs the centre with e4. This leads to a huge central pawn mass but leaves the c4 pawn weak. Black must challenge the centre quickly with ...Nf6 and ...e5 or ...c5.',
                reviewPriority: 2,
                estimatedStudyMinutes: 1.5,
                masteryXp: 15,
                difficulty: 2,
                popularity: 2,
            }),
        ],
    },
    Intermediate: {
        lines: [
            buildLine({
                id: 'queens-gambit-intermediate-qgd-orthodox-main',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Main Line',
                aliases: ['Orthodox Main Line'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3'],
                prerequisites: ['queens-gambit-novice-qgd-orthodox'],
                continuationIds: ['queens-gambit-advanced-qgd-orthodox-lasker'],
                conceptIds: ['development', 'central-control', 'castling', 'king-safety'],
                strategicIdeas: [
                    'White completes development with e3, O-O, and Nf3.',
                    'The position is a model of harmonious piece placement.',
                    'Both sides prepare for the middlegame battle.'
                ],
                commonMistakes: [
                    'Releasing the Bg5 pin before it\'s advantageous',
                    'Making premature pawn breaks that weaken the structure'
                ],
                explanation: 'The Orthodox Main Line sees both sides complete development. White plays e3, O-O, and Nf3, while Black castles. This is a textbook position where understanding piece coordination and pawn breaks (like ...c5 or ...e5 for Black, cxd5 or e4 for White) is crucial.',
                reviewPriority: 5,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 5,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-slav-main',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Main Line',
                aliases: ['Slav Main Line'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4'],
                prerequisites: ['queens-gambit-novice-slav-exchange'],
                continuationIds: ['queens-gambit-advanced-slav-main-line'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black captures on c4, leading to the main Slav battle.',
                    'White will recover the pawn with a4 and e3/Bxc4.',
                    'The Slav Main Line is a critical test of White\'s technique.'
                ],
                commonMistakes: [
                    'Allowing Black to keep the extra pawn with ...b5',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Main Line (7...dxc4) is the most critical test. White recovers the pawn with a4 and e3/Bxc4, leading to complex middlegame positions. Understanding the typical plans (minority attack for White, central play for Black) is essential.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-qga-main',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Main Line',
                aliases: ['QGA Main Line'],
                eco: 'D27',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'Bg4'],
                prerequisites: ['queens-gambit-novice-qga-recovery'],
                continuationIds: ['queens-gambit-advanced-qga-main-line'],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the bishop to g4, pinning the f3 knight.',
                    'White continues with e3 and Bxc4 to regain the pawn.',
                    'The QGA Main Line leads to open, tactical positions.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Recapturing the pawn with the wrong piece order'
                ],
                explanation: 'The QGA Main Line (5...Bg4) sees Black pin the f3 knight. White plays e3 and Bxc4 to regain the pawn, leading to open positions. The pin on f3 is temporary, and White must handle it correctly to maintain the initiative.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-tarrasch-rubinstein',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Rubinstein Variation',
                aliases: ['Rubinstein Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6'],
                prerequisites: ['queens-gambit-novice-tarrasch-main'],
                continuationIds: ['queens-gambit-advanced-tarrasch-haakert'],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the knight to c6, supporting the d5 pawn.',
                    'The Rubinstein is a solid way to handle the IQP.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Rubinstein Variation (9...Nc6) is a solid way for Black to handle the isolated queen\'s pawn in the Tarrasch. The knight supports d5 and prepares ...Nf6. White must play actively to exploit the structural weakness.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-cambridge-springs-main',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Main Line',
                aliases: ['Cambridge Springs Main'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'Nf3', 'c6', 'e3', 'Qa5'],
                prerequisites: ['queens-gambit-novice-cambridge-springs'],
                continuationIds: ['queens-gambit-advanced-cambridge-springs-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...Qa5, pinning the c3 knight against the rook on a1.',
                    'White must break the pin with Nd2 or Bd2.',
                    'The Cambridge Springs is a sharp, tactical variation.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Main Line features the ...Qa5 pin on c3. White must break the pin with Nd2 or Bd2, leading to sharp tactical play. This variation requires precise calculation and understanding of the resulting positions.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-semi-slav-botvinnik',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Botvinnik System',
                aliases: ['Botvinnik Semi-Slav'],
                eco: 'D44',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'Bg5', 'dxc4'],
                prerequisites: ['queens-gambit-novice-semi-slav'],
                continuationIds: ['queens-gambit-advanced-semi-slav-meran'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black captures on c4, leading to the sharp Botvinnik System.',
                    'White will recover the pawn with e3 or e4.',
                    'The Botvinnik is one of the most complex openings in chess.'
                ],
                commonMistakes: [
                    'Allowing Black to consolidate the extra pawn',
                    'Misjudging the tactical complications'
                ],
                explanation: 'The Botvinnik System (9...dxc4) is the sharpest line of the Semi-Slav. White recovers the pawn with e3 or e4, leading to extremely complex positions. This variation has been the subject of countless theoretical battles and requires deep preparation.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-exchange-qgd',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'Exchange Variation Carlsbad',
                aliases: ['Carlsbad Structure'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6'],
                prerequisites: ['queens-gambit-novice-qgd-exchange'],
                continuationIds: ['queens-gambit-advanced-exchange-qgd-carlsbad'],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'minority-attack'],
                strategicIdeas: [
                    'The Carlsbad structure features pawns on c6 and d5 for Black.',
                    'White often plays a minority attack on the queenside.',
                    'This is a classic positional battle.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...c5',
                    'Misplacing pieces in the Carlsbad structure'
                ],
                explanation: 'The Exchange Variation Carlsbad structure (pawns c6/d5 for Black) is a classic positional battleground. White typically launches a minority attack with b4-b5, while Black seeks counterplay in the centre. Understanding this structure is fundamental to QGD play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-ragazin',
                parentVariation: 'Ragazin Defence',
                variationName: 'Ragazin Setup',
                aliases: ['Ragazin Defence'],
                eco: 'D38',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Bb4'],
                prerequisites: ['queens-gambit-novice-qgd-orthodox'],
                continuationIds: ['queens-gambit-advanced-ragazin-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black pins the c3 knight with Bb4, increasing pressure.',
                    'The Ragazin is a flexible, active defence.',
                    'White must decide how to handle the pin.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Ragazin Defence (7...Bb4) pins the c3 knight, creating immediate pressure. White must decide whether to maintain the pin with Bd2 or release it. This is a flexible, active defence that leads to complex middlegame positions.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-slav-marshall',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Marshall Gambit',
                aliases: ['Marshall Slav'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5'],
                prerequisites: ['queens-gambit-novice-slav-exchange'],
                continuationIds: ['queens-gambit-advanced-slav-main-line'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black develops the bishop to f5, preparing to hold the c4 pawn.',
                    'White plays a4 to prevent ...b5 and recover the pawn.',
                    'The Marshall Gambit is a sharp, tactical line.'
                ],
                commonMistakes: [
                    'Allowing Black to keep the extra pawn with ...b5',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Marshall Gambit (9...Bf5) sees Black develop the bishop actively, preparing to hold the c4 pawn. White plays a4 to prevent ...b5 and recover the pawn. This is a sharp, tactical line that requires precise play from both sides.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-intermediate-qga-classical',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Classical Line',
                aliases: ['Classical QGA'],
                eco: 'D28',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4'],
                prerequisites: ['queens-gambit-novice-qga-recovery'],
                continuationIds: ['queens-gambit-advanced-qga-main-line'],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'White recovers the pawn with Bxc4, completing development.',
                    'The Classical QGA leads to balanced, open positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'The Classical QGA (9.Bxc4) sees White recover the pawn and complete development. The resulting positions are balanced and open, requiring good piece coordination. This is a solid, reliable way to handle the QGA.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 20,
                difficulty: 3,
                popularity: 4,
            }),
        ],
    },
    Advanced: {
        lines: [
            buildLine({
                id: 'queens-gambit-advanced-qgd-orthodox-lasker',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Lasker Defence',
                aliases: ['Lasker QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4'],
                prerequisites: ['queens-gambit-intermediate-qgd-orthodox-main'],
                continuationIds: ['queens-gambit-expert-qgd-orthodox-lasker'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...h6 and ...Ne4, challenging White\'s bishop.',
                    'The Lasker is a solid, flexible defence.',
                    'White must decide whether to exchange on e7 or retreat.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Lasker Defence (...h6 and ...Ne4) is a solid, flexible way for Black to handle the Orthodox QGD. By challenging the bishop on g5, Black aims to trade pieces and relieve the pressure on d5. White must handle the ...Ne4 outpost carefully.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-advanced-slav-main-line',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Main Line',
                aliases: ['Slav Main Line'],
                eco: 'D16',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4'],
                prerequisites: ['queens-gambit-intermediate-slav-main'],
                continuationIds: ['queens-gambit-expert-slav-main-line'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White recovers the pawn with Bxc4, completing development.',
                    'The Slav Main Line leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Main Line (13.Bxc4) sees White recover the pawn and complete development. The resulting positions are complex, with both sides fighting for the initiative. Understanding the typical plans is essential for success in the Slav.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-advanced-qga-main-line',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Main Line',
                aliases: ['QGA Main Line'],
                eco: 'D27',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6'],
                prerequisites: ['queens-gambit-intermediate-qga-main'],
                continuationIds: ['queens-gambit-expert-qga-main-line'],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...c5, challenging White\'s centre immediately.',
                    'The QGA Main Line leads to open, tactical positions.',
                    'White must handle the central tension carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise the centre too easily',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'The QGA Main Line (11...c5) sees Black challenge White\'s centre immediately. White must handle the central tension carefully, often playing dxc5 or maintaining the tension. This leads to open, tactical positions requiring good piece coordination.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-advanced-tarrasch-haakert',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Haakert Variation',
                aliases: ['Haakert Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'g3'],
                prerequisites: ['queens-gambit-intermediate-tarrasch-rubinstein'],
                continuationIds: ['queens-gambit-expert-tarrasch-haakert'],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'fianchetto'],
                strategicIdeas: [
                    'White fianchettoes the bishop with g3, controlling the long diagonal.',
                    'The Haakert is a solid way to handle the IQP.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Haakert Variation (11.g3) sees White fianchetto the bishop, controlling the long diagonal. This is a solid way to handle the isolated queen\'s pawn in the Tarrasch. White aims for piece activity and pressure on d5.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-advanced-cambridge-springs-main',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Main Line',
                aliases: ['Cambridge Springs Main'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'Nf3', 'c6', 'e3', 'Qa5', 'Bd3'],
                prerequisites: ['queens-gambit-intermediate-cambridge-springs-main'],
                continuationIds: ['queens-gambit-expert-cambridge-springs-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White breaks the pin with Bd3, developing the bishop actively.',
                    'The Cambridge Springs Main Line leads to sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Main Line (13.Bd3) sees White break the pin with the bishop, developing actively. This leads to sharp tactical play where both sides fight for the initiative. Precise calculation is required.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-advanced-semi-slav-meran',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Meran Variation',
                aliases: ['Meran Semi-Slav'],
                eco: 'D46',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4', 'b5'],
                prerequisites: ['queens-gambit-intermediate-semi-slav-botvinnik'],
                continuationIds: ['queens-gambit-expert-semi-slav-meran'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...b5, gaining space on the queenside.',
                    'The Meran is a solid, flexible variation of the Semi-Slav.',
                    'White must handle the pawn sacrifice carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to consolidate the extra pawn',
                    'Misjudging the tactical complications'
                ],
                explanation: 'The Meran Variation (14...b5) is a solid, flexible line of the Semi-Slav. Black gains space on the queenside and prepares ...c5. White must handle the pawn sacrifice carefully, often returning the pawn for active piece play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-advanced-exchange-qgd-carlsbad',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'Exchange Variation Carlsbad',
                aliases: ['Carlsbad Structure'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6', 'Qc2'],
                prerequisites: ['queens-gambit-intermediate-exchange-qgd'],
                continuationIds: ['queens-gambit-expert-exchange-qgd-carlsbad'],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'minority-attack'],
                strategicIdeas: [
                    'White plays Qc2, supporting the minority attack.',
                    'The Carlsbad structure is a classic positional battle.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...c5',
                    'Misplacing pieces in the Carlsbad structure'
                ],
                explanation: 'The Exchange Variation Carlsbad (11.Qc2) sees White support the minority attack with the queen. This is a classic positional battle where White aims to undermine Black\'s queenside pawns. Understanding the Carlsbad structure is fundamental to QGD play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-advanced-ragazin-main',
                parentVariation: 'Ragazin Defence',
                variationName: 'Ragazin Main Line',
                aliases: ['Ragazin Main Line'],
                eco: 'D38',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Bb4', 'e3', 'h6', 'Bh4'],
                prerequisites: ['queens-gambit-intermediate-ragazin'],
                continuationIds: ['queens-gambit-expert-ragazin-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...h6, challenging White\'s bishop.',
                    'The Ragazin Main Line leads to complex middlegame positions.',
                    'White must handle the pin on c3 carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Ragazin Main Line (11...h6 12.Bh4) sees Black challenge the bishop, preparing ...g5. This leads to complex middlegame positions where White must handle the pin on c3 carefully. The Ragazin is a flexible, active defence.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-advanced-slav-chebanenko',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Chebanenko Variation',
                aliases: ['Chebanenko Slav', 'Schlechter Slav'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'a6'],
                prerequisites: ['queens-gambit-intermediate-slav-main'],
                continuationIds: ['queens-gambit-expert-slav-chebanenko'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black prepares ...b5, gaining space on the queenside.',
                    'The Chebanenko is a flexible, modern Slav variation.',
                    'White must handle the ...b5 break carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Chebanenko Variation (8...a6) prepares ...b5, gaining space on the queenside. This is a flexible, modern Slav variation that avoids some of the theoretical complexities of the main lines. White must handle the ...b5 break carefully.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-advanced-qga-janowski',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Janowski Variation',
                aliases: ['Janowski QGA'],
                eco: 'D29',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e4'],
                prerequisites: ['queens-gambit-intermediate-qga-classical'],
                continuationIds: ['queens-gambit-expert-qga-janowski'],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'White grabs the centre with e4, ignoring the c4 pawn.',
                    'The Janowski leads to a massive central pawn duo.',
                    'Black must challenge the centre quickly.'
                ],
                commonMistakes: [
                    'Allowing White to consolidate the central pawns',
                    'Developing pieces passively against the central duo'
                ],
                explanation: 'The Janowski Variation (9.e4) sees White grab the centre with e4, ignoring the c4 pawn. This leads to a huge central pawn mass but leaves the c4 pawn weak. Black must challenge the centre quickly with ...b5 or ...c5.',
                reviewPriority: 2,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 2,
            }),
            buildLine({
                id: 'queens-gambit-advanced-tarrasch-symmetrical',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Symmetrical Variation',
                aliases: ['Symmetrical Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'Bf4'],
                prerequisites: ['queens-gambit-intermediate-tarrasch-rubinstein'],
                continuationIds: ['queens-gambit-expert-tarrasch-symmetrical'],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops the bishop to f4, controlling the e5 square.',
                    'The Symmetrical Tarrasch leads to balanced positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Symmetrical Tarrasch (11.Bf4) sees White develop the bishop actively, controlling e5. This leads to balanced positions where both sides fight for the initiative. Understanding the IQP dynamics is key.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-advanced-qgd-orthodox-rubinstein',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Rubinstein Variation',
                aliases: ['Rubinstein QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'Ne4', 'Bxe7', 'Qxe7'],
                prerequisites: ['queens-gambit-intermediate-qgd-orthodox-main'],
                continuationIds: ['queens-gambit-expert-qgd-orthodox-rubinstein'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades the bishop on e7, relieving the pressure.',
                    'The Rubinstein is a solid, flexible variation.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Rubinstein Variation (13.Bxe7 Qxe7) sees White trade the bishop, relieving the pressure on d5. This is a solid, flexible variation where both sides aim for piece activity. The resulting positions are balanced and require good technique.',
                reviewPriority: 3,
                estimatedStudyMinutes: 3,
                masteryXp: 25,
                difficulty: 4,
                popularity: 3,
            }),
        ],
    },
    Expert: {
        lines: [
            buildLine({
                id: 'queens-gambit-expert-qgd-orthodox-lasker',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Lasker Defence',
                aliases: ['Lasker QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4', 'Bxe7', 'Qxe7', 'cxd5'],
                prerequisites: ['queens-gambit-advanced-qgd-orthodox-lasker'],
                continuationIds: ['queens-gambit-master-qgd-orthodox-lasker'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades on e7 and captures on d5, releasing tension.',
                    'The Lasker leads to simplified, balanced positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Lasker Defence (17.cxd5) sees White trade on e7 and capture on d5, releasing the central tension. This leads to simplified positions where both sides fight for the initiative. The Lasker is a reliable, flexible defence.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-expert-slav-main-line',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Main Line',
                aliases: ['Slav Main Line'],
                eco: 'D16',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4', 'O-O'],
                prerequisites: ['queens-gambit-advanced-slav-main-line'],
                continuationIds: ['queens-gambit-master-slav-main-line'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black pins the c3 knight with Bb4, increasing pressure.',
                    'The Slav Main Line leads to complex middlegame positions.',
                    'White must handle the pin carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Main Line (15...Bb4) sees Black pin the c3 knight, increasing pressure. White must handle the pin carefully, often playing Bd2 or Nd2. This leads to complex middlegame positions requiring precise play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-expert-qga-main-line',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Main Line',
                aliases: ['QGA Main Line'],
                eco: 'D27',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6', 'Qe2', 'b5', 'Bb3'],
                prerequisites: ['queens-gambit-advanced-qga-main-line'],
                continuationIds: ['queens-gambit-master-qga-main-line'],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'White retreats the bishop to b3, keeping the diagonal.',
                    'The QGA Main Line leads to open, tactical positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise the centre too easily',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'The QGA Main Line (15.Bb3) sees White retreat the bishop, keeping the diagonal. This leads to open, tactical positions where both sides fight for the initiative. Good piece coordination is essential.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-expert-tarrasch-haakert',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Haakert Variation',
                aliases: ['Haakert Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'g3', 'Nf6', 'Bg2', 'cxd4', 'Nxd4'],
                prerequisites: ['queens-gambit-advanced-tarrasch-haakert'],
                continuationIds: ['queens-gambit-master-tarrasch-haakert'],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'fianchetto'],
                strategicIdeas: [
                    'White recaptures on d4, maintaining the IQP structure.',
                    'The Haakert leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Haakert Variation (15.Nxd4) sees White recapture on d4, maintaining the IQP structure. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the IQP dynamics is key.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-expert-cambridge-springs-main',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Main Line',
                aliases: ['Cambridge Springs Main'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'Nf3', 'c6', 'e3', 'Qa5', 'Bd3', 'Bb4', 'O-O'],
                prerequisites: ['queens-gambit-advanced-cambridge-springs-main'],
                continuationIds: ['queens-gambit-master-cambridge-springs-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White castles, completing development in the Cambridge Springs.',
                    'The Cambridge Springs Main Line leads to sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Main Line (15.O-O) sees White complete development. This leads to sharp tactical play where both sides fight for the initiative. Precise calculation is required to navigate the complications.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-expert-semi-slav-meran',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Meran Variation',
                aliases: ['Meran Semi-Slav'],
                eco: 'D47',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4', 'b5', 'Bd3', 'a6', 'e4'],
                prerequisites: ['queens-gambit-advanced-semi-slav-meran'],
                continuationIds: ['queens-gambit-master-semi-slav-meran'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays e4, grabbing the centre and returning the pawn.',
                    'The Meran leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to consolidate the extra pawn',
                    'Misjudging the tactical complications'
                ],
                explanation: 'The Meran Variation (17.e4) sees White grab the centre, returning the pawn for active piece play. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the typical plans is essential.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-expert-exchange-qgd-carlsbad',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'Exchange Variation Carlsbad',
                aliases: ['Carlsbad Structure'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6', 'Qc2', 'Bf5', 'Bxf6', 'gxf6'],
                prerequisites: ['queens-gambit-advanced-exchange-qgd-carlsbad'],
                continuationIds: ['queens-gambit-master-exchange-qgd-carlsbad'],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'minority-attack'],
                strategicIdeas: [
                    'White trades the bishop on f6, damaging Black\'s kingside.',
                    'The Carlsbad structure is a classic positional battle.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...c5',
                    'Misplacing pieces in the Carlsbad structure'
                ],
                explanation: 'The Exchange Variation Carlsbad (13.Bxf6 gxf6) sees White damage Black\'s pawn structure. This is a classic positional battle where White aims to exploit the weakened kingside. Understanding the Carlsbad structure is fundamental to QGD play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-expert-ragazin-main',
                parentVariation: 'Ragazin Defence',
                variationName: 'Ragazin Main Line',
                aliases: ['Ragazin Main Line'],
                eco: 'D38',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Bb4', 'e3', 'h6', 'Bh4', 'g5', 'Bg3', 'Ne4'],
                prerequisites: ['queens-gambit-advanced-ragazin-main'],
                continuationIds: ['queens-gambit-master-ragazin-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'Black plays ...g5, gaining space on the kingside.',
                    'The Ragazin Main Line leads to sharp tactical play.',
                    'White must handle the ...Ne4 outpost carefully.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Ragazin Main Line (13...g5 14.Bg3 Ne4) sees Black gain space on the kingside. This leads to sharp tactical play where White must handle the ...Ne4 outpost carefully. The Ragazin is a flexible, active defence.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-expert-slav-chebanenko',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Chebanenko Variation',
                aliases: ['Chebanenko Slav', 'Schlechter Slav'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'a6', 'cxd5', 'cxd5', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Qb3'],
                prerequisites: ['queens-gambit-advanced-slav-chebanenko'],
                continuationIds: ['queens-gambit-master-slav-chebanenko'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White exchanges on d5 to reach a flexible central structure.',
                    'The Chebanenko move order with a6 prepares piece development.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Chebanenko Variation (8.Qb3) sees White develop with an early queen sortie, pressuring d5 and b7. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the typical plans is essential for success in the Slav.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-expert-qga-janowski',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Janowski Variation',
                aliases: ['Janowski QGA'],
                eco: 'D29',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e4', 'Bb4', 'Bd3', 'b5', 'e5'],
                prerequisites: ['queens-gambit-advanced-qga-janowski'],
                continuationIds: ['queens-gambit-master-qga-janowski'],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'White pushes e5, gaining space in the centre.',
                    'The Janowski leads to sharp, tactical positions.',
                    'Black must challenge the centre quickly.'
                ],
                commonMistakes: [
                    'Allowing White to consolidate the central pawns',
                    'Developing pieces passively against the central duo'
                ],
                explanation: 'The Janowski Variation (13.e5) sees White push the pawn, gaining space in the centre. This leads to sharp, tactical positions where Black must challenge the centre quickly. Precise play is required from both sides.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 2,
            }),
            buildLine({
                id: 'queens-gambit-expert-tarrasch-symmetrical',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Symmetrical Variation',
                aliases: ['Symmetrical Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'Bf4', 'Bf5', 'dxc5', 'Bxc5'],
                prerequisites: ['queens-gambit-advanced-tarrasch-symmetrical'],
                continuationIds: [],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White captures on c5, opening the position.',
                    'The Symmetrical Tarrasch leads to balanced positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Symmetrical Tarrasch (13.dxc5 Bxc5) sees White open the position, leading to balanced play. This is a flexible variation where both sides fight for the initiative. Understanding the IQP dynamics is key.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-expert-qgd-orthodox-rubinstein',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Rubinstein Variation',
                aliases: ['Rubinstein QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'Ne4', 'Bxe7', 'Qxe7', 'cxd5', 'exd5', 'Bd3'],
                prerequisites: ['queens-gambit-advanced-qgd-orthodox-rubinstein'],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops the bishop to d3, completing development.',
                    'The Rubinstein leads to balanced, flexible positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Rubinstein Variation (17.Bd3) sees White complete development. This leads to balanced, flexible positions where both sides fight for the initiative. The Rubinstein is a reliable, solid variation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 30,
                difficulty: 5,
                popularity: 3,
            }),
        ],
    },
    Master: {
        lines: [
            buildLine({
                id: 'queens-gambit-master-qgd-orthodox-lasker',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Lasker Defence',
                aliases: ['Lasker QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4', 'Bxe7', 'Qxe7', 'cxd5', 'exd5', 'Rc1'],
                prerequisites: ['queens-gambit-expert-qgd-orthodox-lasker'],
                continuationIds: ['queens-gambit-legend-qgd-orthodox-lasker'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Rc1, preparing the minority attack.',
                    'The Lasker leads to simplified, balanced positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Lasker Defence (19.Rc1) sees White prepare the minority attack. This leads to simplified positions where both sides fight for the initiative. The Lasker is a reliable, flexible defence that requires good technique.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-master-slav-main-line',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Main Line',
                aliases: ['Slav Main Line'],
                eco: 'D16',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4', 'O-O', 'O-O', 'Qe2'],
                prerequisites: ['queens-gambit-expert-slav-main-line'],
                continuationIds: ['queens-gambit-legend-slav-main-line'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Qe2, supporting the e3 pawn and preparing expansion.',
                    'The Slav Main Line leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Main Line (17.Qe2) sees White support the e3 pawn and prepare expansion. This leads to complex middlegame positions requiring precise play. Understanding the typical plans is essential for success in the Slav.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-master-qga-main-line',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Main Line',
                aliases: ['QGA Main Line'],
                eco: 'D27',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6', 'Qe2', 'b5', 'Bb3', 'Bb7', 'Nc3'],
                prerequisites: ['queens-gambit-expert-qga-main-line'],
                continuationIds: ['queens-gambit-legend-qga-main-line'],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'White develops the knight to c3, completing development.',
                    'The QGA Main Line leads to open, tactical positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise the centre too easily',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'The QGA Main Line (17.Nc3) sees White complete development. This leads to open, tactical positions where both sides fight for the initiative. Good piece coordination is essential.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-master-tarrasch-haakert',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Haakert Variation',
                aliases: ['Haakert Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'g3', 'Nf6', 'Bg2', 'cxd4', 'Nxd4', 'Bb4', 'O-O'],
                prerequisites: ['queens-gambit-expert-tarrasch-haakert'],
                continuationIds: ['queens-gambit-legend-tarrasch-haakert'],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'fianchetto'],
                strategicIdeas: [
                    'White castles, completing development in the Haakert.',
                    'The Haakert leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Haakert Variation (17.O-O) sees White complete development. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the IQP dynamics is key.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-master-cambridge-springs-main',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Main Line',
                aliases: ['Cambridge Springs Main'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'Nf3', 'c6', 'e3', 'Qa5', 'Bd3', 'Bb4', 'O-O', 'dxc4', 'Bxc4'],
                prerequisites: ['queens-gambit-expert-cambridge-springs-main'],
                continuationIds: ['queens-gambit-legend-cambridge-springs-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White recaptures on c4, completing development.',
                    'The Cambridge Springs Main Line leads to sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Main Line (17.Bxc4) sees White recapture the pawn, completing development. This leads to sharp tactical play where both sides fight for the initiative. Precise calculation is required.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-master-semi-slav-meran',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Meran Variation',
                aliases: ['Meran Semi-Slav'],
                eco: 'D47',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4', 'b5', 'Bd3', 'a6', 'e4', 'b4', 'Ne2'],
                prerequisites: ['queens-gambit-expert-semi-slav-meran'],
                continuationIds: ['queens-gambit-legend-semi-slav-meran'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Ne2, repositioning the knight for the kingside.',
                    'The Meran leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to consolidate the extra pawn',
                    'Misjudging the tactical complications'
                ],
                explanation: 'The Meran Variation (19.Ne2) sees White reposition the knight for kingside play. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the typical plans is essential.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-master-exchange-qgd-carlsbad',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'Exchange Variation Carlsbad',
                aliases: ['Carlsbad Structure'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6', 'Qc2', 'Bf5', 'Bxf6', 'gxf6', 'Rc1', 'Qb6', 'b3'],
                prerequisites: ['queens-gambit-expert-exchange-qgd-carlsbad'],
                continuationIds: ['queens-gambit-legend-exchange-qgd-carlsbad'],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'minority-attack'],
                strategicIdeas: [
                    'White plays b3, preparing the minority attack.',
                    'The Carlsbad structure is a classic positional battle.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...c5',
                    'Misplacing pieces in the Carlsbad structure'
                ],
                explanation: 'The Exchange Variation Carlsbad (17.b3) sees White prepare the minority attack. This is a classic positional battle where White aims to undermine Black\'s queenside pawns. Understanding the Carlsbad structure is fundamental to QGD play.',
                reviewPriority: 4,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-master-ragazin-main',
                parentVariation: 'Ragazin Defence',
                variationName: 'Ragazin Main Line',
                aliases: ['Ragazin Main Line'],
                eco: 'D38',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Bb4', 'e3', 'h6', 'Bh4', 'g5', 'Bg3', 'Ne4', 'Qc2', 'Bxc3+', 'bxc3', 'Nxg3', 'hxg3'],
                prerequisites: ['queens-gambit-expert-ragazin-main'],
                continuationIds: ['queens-gambit-legend-ragazin-main'],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White meets the knight sortie with Qc2, keeping the pin.',
                    'The Ragazin Main Line leads to sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Ragazin Main Line (10.hxg3) sees White recapture and reach a doubled-pawn structure with the bishop pair. This leads to sharp tactical play where both sides fight for the initiative. The Ragazin is a flexible, active defence.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-master-slav-chebanenko',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Chebanenko Variation',
                aliases: ['Chebanenko Slav', 'Schlechter Slav'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'a6', 'cxd5', 'cxd5', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bb5', 'e6', 'O-O'],
                prerequisites: ['queens-gambit-expert-slav-chebanenko'],
                continuationIds: ['queens-gambit-legend-slav-chebanenko'],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White develops the bishop to b5, pinning the knight on c6.',
                    'The Chebanenko leads to complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Chebanenko Variation (9.O-O) sees White castle and complete development. This leads to complex middlegame positions where both sides fight for the initiative. Understanding the typical plans is essential for success in the Slav.',
                reviewPriority: 3,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-master-qga-janowski',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Janowski Variation',
                aliases: ['Janowski QGA'],
                eco: 'D29',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e4', 'Bb4', 'Bd3', 'b5', 'e5', 'Nd5', 'O-O', 'O-O', 'Qe2'],
                prerequisites: ['queens-gambit-expert-qga-janowski'],
                continuationIds: ['queens-gambit-legend-qga-janowski'],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'White castles quickly, neutralising the Bb4 pin.',
                    'The Janowski leads to sharp, tactical positions.',
                    'Black must challenge the centre quickly.'
                ],
                commonMistakes: [
                    'Allowing White to consolidate the central pawns',
                    'Developing pieces passively against the central duo'
                ],
                explanation: 'The Janowski Variation (9.Qe2) sees White castle and develop the queen, neutralising the Bb4 pin. This leads to sharp, tactical positions where Black must challenge the centre quickly. Precise play is required from both sides.',
                reviewPriority: 2,
                estimatedStudyMinutes: 4,
                masteryXp: 40,
                difficulty: 6,
                popularity: 2,
            }),
        ],
    },
    Legend: {
        lines: [
            buildLine({
                id: 'queens-gambit-legend-qgd-orthodox-lasker',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'QGD Orthodox Lasker Defence',
                aliases: ['Lasker QGD'],
                eco: 'D30',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Be7', 'e3', 'O-O', 'Nf3', 'h6', 'Bh4', 'Ne4', 'Bxe7', 'Qxe7', 'cxd5', 'exd5', 'Rc1', 'c6', 'Bd3', 'Nxc3', 'bxc3'],
                prerequisites: ['queens-gambit-master-qgd-orthodox-lasker'],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Bd3 and captures on c3, creating a doubled pawn structure.',
                    'The Lasker leads to deeply simplified, balanced positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade the bishop pair too easily',
                    'Misjudging the ...Ne4 outpost'
                ],
                explanation: 'The Lasker Defence (23.bxc3) sees White create a doubled pawn structure after Bd3 and Nxc3. This leads to deeply simplified positions where both sides fight for the initiative. The Lasker is a reliable, flexible defence requiring deep understanding.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-legend-slav-main-line',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Main Line',
                aliases: ['Slav Main Line'],
                eco: 'D16',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'dxc4', 'a4', 'Bf5', 'e3', 'e6', 'Bxc4', 'Bb4', 'O-O', 'O-O', 'Qe2', 'Nbd7', 'Rd1', 'Re8', 'h3'],
                prerequisites: ['queens-gambit-master-slav-main-line'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays h3, preventing ...Bg4 and preparing expansion.',
                    'The Slav Main Line leads to deeply complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Slav Main Line (21.h3) sees White prevent ...Bg4 and prepare expansion. This leads to deeply complex middlegame positions requiring precise play. Understanding the typical plans is essential for mastery of the Slav.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-legend-qga-main-line',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Main Line',
                aliases: ['QGA Main Line'],
                eco: 'D27',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'e3', 'e6', 'Bxc4', 'c5', 'O-O', 'a6', 'Qe2', 'b5', 'Bb3', 'Bb7', 'Nc3', 'Nbd7', 'Rd1', 'Be7', 'dxc5'],
                prerequisites: ['queens-gambit-master-qga-main-line'],
                continuationIds: [],
                conceptIds: ['development', 'gambit', 'piece-activity'],
                strategicIdeas: [
                    'White captures on c5, opening the position.',
                    'The QGA Main Line leads to deeply open, tactical positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise the centre too easily',
                    'Developing pieces passively in open positions'
                ],
                explanation: 'The QGA Main Line (21.dxc5) sees White open the position, leading to deeply tactical play. This requires excellent piece coordination and understanding of the resulting structures. The QGA is a critical opening for any serious player.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-legend-tarrasch-haakert',
                parentVariation: 'Tarrasch Defence',
                variationName: 'Tarrasch Haakert Variation',
                aliases: ['Haakert Tarrasch'],
                eco: 'D34',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'c5', 'cxd5', 'exd5', 'Nf3', 'Nc6', 'g3', 'Nf6', 'Bg2', 'cxd4', 'Nxd4', 'Bb4', 'O-O', 'O-O', 'Nxc6', 'bxc6', 'Bg5'],
                prerequisites: ['queens-gambit-master-tarrasch-haakert'],
                continuationIds: [],
                conceptIds: ['isolated-queens-pawn', 'central-control', 'fianchetto'],
                strategicIdeas: [
                    'White captures on c6, damaging Black\'s pawn structure.',
                    'The Haakert leads to deeply complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to trade pieces and relieve the IQP pressure',
                    'Passive play that lets Black\'s IQP become strong'
                ],
                explanation: 'The Haakert Variation (21.Bg5) sees White damage Black\'s structure after Nxc6. This leads to deeply complex positions where both sides fight for the initiative. Understanding the IQP dynamics is key to mastery.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-legend-cambridge-springs-main',
                parentVariation: 'Cambridge Springs Defence',
                variationName: 'Cambridge Springs Main Line',
                aliases: ['Cambridge Springs Main'],
                eco: 'D52',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Nbd7', 'Nf3', 'c6', 'e3', 'Qa5', 'Bd3', 'Bb4', 'O-O', 'dxc4', 'Bxc4', 'Ne4', 'Qc2', 'Nxg5', 'Nxg5'],
                prerequisites: ['queens-gambit-master-cambridge-springs-main'],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White captures on g5, winning the bishop pair.',
                    'The Cambridge Springs Main Line leads to deeply sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing the ...Qa5 pin to win material',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Cambridge Springs Main Line (21.Nxg5) sees White capture on g5, winning the bishop pair. This leads to deeply sharp tactical play where both sides fight for the initiative. Precise calculation is required for mastery.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-legend-semi-slav-meran',
                parentVariation: 'Semi-Slav Defence',
                variationName: 'Semi-Slav Meran Variation',
                aliases: ['Meran Semi-Slav'],
                eco: 'D47',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e3', 'Nbd7', 'Bd3', 'dxc4', 'Bxc4', 'b5', 'Bd3', 'a6', 'e4', 'b4', 'Ne2', 'c5', 'e5', 'Nd5', 'Ng3'],
                prerequisites: ['queens-gambit-master-semi-slav-meran'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Ng3, repositioning the knight for the kingside.',
                    'The Meran leads to deeply complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to consolidate the extra pawn',
                    'Misjudging the tactical complications'
                ],
                explanation: 'The Meran Variation (23.Ng3) sees White reposition the knight for kingside play. This leads to deeply complex positions where both sides fight for the initiative. Mastery requires deep understanding of the typical plans and tactical resources.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-legend-exchange-qgd-carlsbad',
                parentVariation: 'Queen\'s Gambit Declined',
                variationName: 'Exchange Variation Carlsbad',
                aliases: ['Carlsbad Structure'],
                eco: 'D35',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'cxd5', 'exd5', 'Bg5', 'c6', 'Qc2', 'Bf5', 'Bxf6', 'gxf6', 'O-O-O', 'Nbd7', 'e3', 'Qa5', 'Kb1', 'O-O-O', 'b4'],
                prerequisites: ['queens-gambit-master-exchange-qgd-carlsbad'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'isolated-queens-pawn', 'minority-attack'],
                strategicIdeas: [
                    'White plays b4, beginning the minority attack.',
                    'The Carlsbad structure favours White\'s minority attack.',
                    'White aims for piece activity and pressure on d5.'
                ],
                commonMistakes: [
                    'Allowing Black to free the position with ...c5',
                    'Misplacing pieces in the Carlsbad structure'
                ],
                explanation: 'The Exchange Variation Carlsbad (11.b4) sees White launch the minority attack against Black\'s queenside. This is a classic positional battle where White seeks to create a passed pawn. Mastery requires deep understanding of the Carlsbad structure.',
                reviewPriority: 4,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 4,
            }),
            buildLine({
                id: 'queens-gambit-legend-ragazin-main',
                parentVariation: 'Ragazin Defence',
                variationName: 'Ragazin Main Line',
                aliases: ['Ragazin Main Line'],
                eco: 'D38',
                sanMoves: ['d4', 'd5', 'c4', 'e6', 'Nc3', 'Nf6', 'Bg5', 'Bb4', 'e3', 'h6', 'Bh4', 'g5', 'Bg3', 'Ne4', 'Qc2', 'Bxc3+', 'bxc3', 'Nxg3', 'hxg3', 'c5', 'dxc5', 'Nc6', 'Rc1'],
                prerequisites: ['queens-gambit-master-ragazin-main'],
                continuationIds: [],
                conceptIds: ['development', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White plays Rc1, pressuring the c-file and the c5 pawn.',
                    'The Ragazin Main Line leads to deeply sharp tactical play.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to win the bishop pair too easily',
                    'Releasing the Bg5 pin prematurely'
                ],
                explanation: 'The Ragazin Main Line (12.Rc1) sees White activate the rook on the half-open c-file. This leads to deeply sharp tactical play where both sides fight for the initiative. The Ragazin is a flexible, active defence requiring precise calculation.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-legend-slav-chebanenko',
                parentVariation: 'Slav Defence',
                variationName: 'Slav Chebanenko Variation',
                aliases: ['Chebanenko Slav', 'Schlechter Slav'],
                eco: 'D15',
                sanMoves: ['d4', 'd5', 'c4', 'c6', 'Nf3', 'Nf6', 'Nc3', 'a6', 'cxd5', 'cxd5', 'Bf4', 'Nc6', 'e3', 'Bf5', 'Bb5', 'e6', 'O-O', 'Bd6', 'Bxd6', 'Qxd6', 'Ne5'],
                prerequisites: ['queens-gambit-master-slav-chebanenko'],
                continuationIds: [],
                conceptIds: ['pawn-structure', 'central-control', 'piece-activity'],
                strategicIdeas: [
                    'White trades the light-squared bishops to weaken Black\'s king.',
                    'The Chebanenko leads to deeply complex middlegame positions.',
                    'Both sides aim for piece activity and central control.'
                ],
                commonMistakes: [
                    'Allowing Black to equalise too easily',
                    'Developing pieces passively in the resulting positions'
                ],
                explanation: 'The Chebanenko Variation (11.Ne5) sees White plant a knight in the centre. This leads to deeply complex middlegame positions where both sides fight for the initiative. Understanding the typical plans is essential for mastery of the Slav.',
                reviewPriority: 3,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 3,
            }),
            buildLine({
                id: 'queens-gambit-legend-qga-janowski',
                parentVariation: 'Queen\'s Gambit Accepted',
                variationName: 'QGA Janowski Variation',
                aliases: ['Janowski QGA'],
                eco: 'D29',
                sanMoves: ['d4', 'd5', 'c4', 'dxc4', 'Nf3', 'Nf6', 'Nc3', 'e6', 'e4', 'Bb4', 'Bd3', 'b5', 'e5', 'Nd5', 'O-O', 'O-O', 'Qe2', 'c5', 'a4', 'Nc6', 'Re1'],
                prerequisites: ['queens-gambit-master-qga-janowski'],
                continuationIds: [],
                conceptIds: ['gambit', 'central-control', 'initiative'],
                strategicIdeas: [
                    'White plays Re1, supporting the central pawn chain.',
                    'The Janowski leads to deeply sharp, tactical positions.',
                    'Black must challenge the centre quickly.'
                ],
                commonMistakes: [
                    'Allowing White to consolidate the central pawns',
                    'Developing pieces passively against the central duo'
                ],
                explanation: 'The Janowski Variation (11.Re1) sees White activate the rook, supporting the central pawn chain. This leads to deeply sharp, tactical positions where Black must challenge the centre quickly. Mastery requires precise calculation and understanding of the central dynamics.',
                reviewPriority: 2,
                estimatedStudyMinutes: 5,
                masteryXp: 50,
                difficulty: 7,
                popularity: 2,
            }),
        ],
    },
};

// Write tier files
const outDir = path.join(__dirname, '..', 'data', 'openings', COLOUR, SLUG);
if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
}

for (const [tier, data] of Object.entries(tiers)) {
    const fileName = `${tier.toLowerCase()}.json`;
    const filePath = path.join(outDir, fileName);
    const content = {
        openingId: OPENING_ID,
        tier,
        lines: data.lines,
    };
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    console.log(`Wrote ${filePath} with ${data.lines.length} lines`);
}

// Write metadata.json
const metadata = {
    id: OPENING_ID,
    name: "Queen's Gambit",
    slug: SLUG,
    ecoRange: ECO_RANGE,
    family: 'Queen Pawn',
    colour: COLOUR,
    popularity: 5,
    difficulty: 2,
    description: "The Queen's Gambit begins with 1.d4 d5 2.c4, where White offers a pawn to fight for the centre. It is one of the oldest and most respected openings in chess, emphasising central control, harmonious development, and strategic pawn structures. The Queen's Gambit leads to both solid positional play (Queen's Gambit Declined) and sharp tactical battles (Queen's Gambit Accepted, Semi-Slav, and Meran).",
    strategicOverview: "White's strategy revolves around central control with d4 and c4, rapid development, and piece activity. The Queen's Gambit can lead to a variety of pawn structures: the solid Queen's Gambit Declined (where Black supports d5 with e6), the resilient Slav (c6), the dynamic Tarrasch (c5), and the sharp Semi-Slav (c6+e6). Understanding the transition from the opening to a favourable middlegame requires mastery of central pawn breaks, minority attacks, isolated queen's pawn play, and proper piece coordination. The opening teaches fundamentals that transfer to many other d4 openings.",
    typicalPawnStructures: [
        "Queen's Gambit Declined (pawns d5/e6 vs d4/c4)",
        "Slav (pawns c6/d5 vs d4/c4)",
        "Exchange Variation Carlsbad (c6/d5 vs d4/c4 with open c-file)",
        "Tarrasch (isolated queen's pawn after cxd5 exd5)",
        "Semi-Slav (c6/d5/e6 complex structure)"
    ],
    commonTacticalThemes: [
        "Pin on the f6 knight (Bg5 vs QGD)",
        "Central pawn break with cxd5 or e3-e4",
        "Minority attack on the queenside (b4-b5)",
        "Isolated queen's pawn piece activity",
        "Bishop pair advantage in open positions",
        "Discovered attacks after pawn exchanges in the centre"
    ],
    modelPlayers: [
        "Queen's Gambit Declined: Anatoly Karpov, Garry Kasparov",
        "Slav Defence: Vladimir Kramnik, Viswanathan Anand",
        "Semi-Slav/Meran: Alexander Alekhine, Mikhail Botvinnik",
        "Tarrasch: Siegbert Tarrasch (historical)",
        "Modern Queen's Gambit: Magnus Carlsen, Ding Liren"
    ],
    recommendedStudyOrder: [
        "italian-game",
        "ruy-lopez",
        "queens-gambit",
        "london-system",
        "english-opening"
    ],
    baseMoves: ["d4", "d5", "c4"],
    masteryLevels: [
        {
            level: 1,
            tier: "Beginner",
            objectives: [
                "Learn the opening moves 1.d4 d5 2.c4",
                "Understand why White offers the c4 pawn",
                "Learn the basic QGD, Slav, and QGA setups"
            ],
            expectedKnowledge: "Knows the starting moves and the basic idea of the Queen's Gambit. Can play the main defensive setups (QGD, Slav, QGA) with natural development.",
            averageMoveDepth: 7,
            averageLineCount: 5,
            xpReward: 50,
            graduationRequirements: "Complete all beginner lines with fewer than 2 mistakes on average."
        },
        {
            level: 2,
            tier: "Novice",
            objectives: [
                "Learn Black's main replies: 2...e6 (QGD), 2...c6 (Slav), 2...dxc4 (QGA)",
                "Understand the difference between declined and accepted gambits",
                "Learn basic recovery of the c4 pawn"
            ],
            expectedKnowledge: "Recognises whether Black declines or accepts the gambit and understands the strategic difference. Can navigate the main lines through move 10.",
            averageMoveDepth: 9,
            averageLineCount: 8,
            xpReward: 100,
            graduationRequirements: "Complete all novice lines with an accuracy rate of 70% or higher."
        },
        {
            level: 3,
            tier: "Intermediate",
            objectives: [
                "Learn the main line QGD Orthodox with Bg5/Be7",
                "Understand central pawn tension and when to capture",
                "Study the Slav Main Line and Semi-Slav setup"
            ],
            expectedKnowledge: "Can play the main lines of the QGD, Slav, and QGA through the critical development phase. Understands piece placement in the resulting positions and recognises key pawn structures.",
            averageMoveDepth: 11,
            averageLineCount: 10,
            xpReward: 200,
            graduationRequirements: "Complete all intermediate lines with an accuracy rate of 75% or higher."
        },
        {
            level: 4,
            tier: "Advanced",
            objectives: [
                "Study the Lasker Defence and Orthodox main lines",
                "Learn the Meran Variation of the Semi-Slav",
                "Understand isolated queen's pawn dynamics in the Tarrasch"
            ],
            expectedKnowledge: "Can execute the main theoretical lines of the Queen's Gambit and knows Black's best defences. Understands the typical middlegame plans and how to handle different pawn structures.",
            averageMoveDepth: 13,
            averageLineCount: 12,
            xpReward: 350,
            graduationRequirements: "Complete all advanced lines with an accuracy rate of 80% or higher."
        },
        {
            level: 5,
            tier: "Expert",
            objectives: [
                "Study the Cambridge Springs and Ragazin variations",
                "Learn the sharp Meran and Botvinnik lines",
                "Understand pawn sacrifice compensation"
            ],
            expectedKnowledge: "Can play the Queen's Gambit in both quiet and sharp lines. Understands the strategic compensation for structural concessions and knows the key attacking plans.",
            averageMoveDepth: 15,
            averageLineCount: 12,
            xpReward: 500,
            graduationRequirements: "Complete all expert lines with an accuracy rate of 80% or higher."
        },
        {
            level: 6,
            tier: "Master",
            objectives: [
                "Study deep QGD theory with Rc1 and minority attack plans",
                "Learn modern grandmaster treatments of the Slav and Semi-Slav",
                "Study the Chebanenko and unusual Black tries"
            ],
            expectedKnowledge: "Knows the modern grandmaster approach to the Queen's Gambit with slow positional plans. Can handle unusual Black defences and understands subtle move-order nuances in the main lines.",
            averageMoveDepth: 17,
            averageLineCount: 10,
            xpReward: 750,
            graduationRequirements: "Complete all master lines with an accuracy rate of 85% or higher."
        },
        {
            level: 7,
            tier: "Legend",
            objectives: [
                "Study transpositions between Queen's Gambit and related openings",
                "Master rare sidelines and move-order subtleties",
                "Study deep theoretical endgame positions arising from the Queen's Gambit"
            ],
            expectedKnowledge: "Has comprehensive knowledge of the Queen's Gambit at the highest level. Can handle any deviation, knows transposition possibilities, and understands the resulting endgames from main line theory.",
            averageMoveDepth: 21,
            averageLineCount: 10,
            xpReward: 1000,
            graduationRequirements: "Complete all legend lines with an accuracy rate of 90% or higher."
        }
    ]
};

const metadataPath = path.join(outDir, 'metadata.json');
fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
console.log(`Wrote ${metadataPath}`);
console.log('Queen\'s Gambit course generation complete!');
