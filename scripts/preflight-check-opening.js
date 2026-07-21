/**
 * Standalone PRE-FLIGHT LEGALITY CHECKER for an opening generator.
 *
 * Validates every line's `sanMoves` array (via opening-course-lib.js) WITHOUT
 * writing any files. Useful for a quick legality pass before a full generate,
 * and as the explicit "pre-flight legality checker" tool of the
 * opening-course-generator skill.
 *
 * Usage:
 *   node scripts/preflight-check-opening.js scripts/generate-<slug>.js
 *
 * Exit code 0 = all lines legal; 1 = at least one illegal move (details printed).
 */
const path = require('path');
const { validateAllLines, countLines } = require('./opening-course-lib.js');

const target = process.argv[2];
if (!target) {
    console.error('Usage: node scripts/preflight-check-opening.js scripts/generate-<slug>.js');
    process.exit(2);
}

const abs = path.resolve(__dirname, target);
const gen = require(abs);

try {
    validateAllLines(gen.tiers, { openingFamily: gen.OPENING_NAME });
    console.log(`PRE-FLIGHT OK: ${gen.OPENING_NAME} (${countLines(gen.tiers)} lines across 7 tiers).`);
    process.exit(0);
} catch (e) {
    console.error(e.message);
    process.exit(1);
}
