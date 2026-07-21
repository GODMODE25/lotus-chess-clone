/**
 * Shared library for generating 7-tier opening courses.
 *
 * Used by scripts/generate-*.js generators (and the opening-course-generator skill).
 * It centralises the boilerplate that was previously copy-pasted into every
 * generator, and adds a PRE-FLIGHT LEGALITY CHECK that validates every line's
 * move list with chess.js BEFORE any file is written.
 *
 * Exports:
 *   - buildLine({...})        : convert a raw line definition into a full variation object
 *   - validateAllLines(tiers) : pre-flight legality check (throws with ALL errors)
 *   - writeCourse({...})      : write the 7 tier JSON files + metadata.json
 *
 * Every FEN / PGN / UCI is derived from chess.js so move legality is guaranteed.
 */
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

/**
 * Convert a raw line definition (with a `sanMoves` array) into the full
 * variation object stored in the tier JSON files.
 */
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
        openingFamily: parentVariation,
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

/**
 * PRE-FLIGHT LEGALITY CHECK.
 *
 * Validates every line's `sanMoves` array with chess.js and collects ALL errors
 * (not just the first) with helpful context (tier, line id, failing ply, FEN
 * before the move, and a sample of legal moves). Throws an Error listing every
 * problem if any are found, so the generator can fix them in one pass instead of
 * discovering them one at a time at write time.
 *
 * Call this BEFORE writeCourse so no files are written when a line is illegal.
 */
function validateAllLines(tiers, { openingFamily = 'Opening' } = {}) {
    const errors = [];
    for (const [tierName, tierData] of Object.entries(tiers)) {
        const lines = tierData.lines || [];
        for (const line of lines) {
            const chess = new Chess();
            const san = line.sanMoves || [];
            for (let i = 0; i < san.length; i++) {
                const before = chess.fen();
                const side = i % 2 === 0 ? 'White' : 'Black';
                try {
                    const res = chess.move(san[i]);
                    if (!res) {
                        errors.push(
                            `  [${tierName}] ${line.id}: illegal ${side} move "${san[i]}" at ply ${i + 1}\n` +
                            `      FEN before move: ${before}\n` +
                            `      legal moves: ${chess.moves().slice(0, 14).join(', ')}${chess.moves().length > 14 ? ' …' : ''}`
                        );
                        break; // stop at first illegal move in this line
                    }
                } catch (e) {
                    errors.push(
                        `  [${tierName}] ${line.id}: illegal ${side} move "${san[i]}" at ply ${i + 1}\n` +
                        `      FEN before move: ${before}\n` +
                        `      legal moves: ${chess.moves().slice(0, 14).join(', ')}${chess.moves().length > 14 ? ' …' : ''}`
                    );
                    break; // stop at first illegal move in this line
                }
            }
        }
    }
    if (errors.length) {
        throw new Error(
            `PRE-FLIGHT LEGALITY CHECK FAILED (${errors.length} line(s)) for ${openingFamily}:\n` +
            errors.join('\n')
        );
    }
}

/**
 * Write the 7 tier JSON files plus metadata.json for an opening course.
 * Each tier file is wrapped with the top-level `openingId` field, and every
 * line is built via buildLine (which also re-validates legality as a safety net).
 */
function writeCourse({ slug, side, tiers, metadata, baseDir }) {
    const OUT_DIR = baseDir
        ? path.join(baseDir, 'openings', side, slug)
        : path.join(__dirname, '..', 'data', 'openings', side, slug);
    fs.mkdirSync(OUT_DIR, { recursive: true });

    for (const [key, tierData] of Object.entries(tiers)) {
        const builtLines = tierData.lines.map(buildLine);
        const out = { openingId: slug, lines: builtLines };
        const filePath = path.join(OUT_DIR, `${key}.json`);
        fs.writeFileSync(filePath, JSON.stringify(out, null, 2) + '\n', 'utf8');
        console.log(`Wrote ${filePath} with ${builtLines.length} lines`);
    }

    fs.writeFileSync(
        path.join(OUT_DIR, 'metadata.json'),
        JSON.stringify(metadata, null, 2) + '\n',
        'utf8'
    );
    console.log(`Wrote ${path.join(OUT_DIR, 'metadata.json')}`);
    console.log(`${metadata.name} course generation complete!`);
}

function countLines(tiers) {
    return Object.values(tiers).reduce((sum, t) => sum + (t.lines ? t.lines.length : 0), 0);
}

module.exports = { buildLine, validateAllLines, writeCourse, countLines };
