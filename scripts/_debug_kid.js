const { Chess } = require('chess.js');
const { tiers } = require('./generate-kings-indian-defense.js');

function checkLine(line) {
    const chess = new Chess();
    for (let i = 0; i < line.sanMoves.length; i++) {
        const mv = line.sanMoves[i];
        const before = chess.fen();
        try {
            chess.move(mv);
        } catch (e) {
            return { ok: false, ply: i + 1, move: mv, fen: before, legal: chess.moves() };
        }
    }
    return { ok: true, lastFen: chess.fen() };
}

let bad = 0;
for (const tier of Object.keys(tiers)) {
    for (const line of tiers[tier].lines) {
        const r = checkLine(line);
        if (!r.ok) {
            bad++;
            console.log(`[${tier}] ${line.id}: illegal "${r.move}" at ply ${r.ply}`);
            console.log(`   FEN: ${r.fen}`);
            console.log(`   legal: ${r.legal.slice(0, 30).join(', ')}`);
        }
    }
}
console.log(bad === 0 ? 'ALL LEGAL' : `${bad} illegal lines`);
