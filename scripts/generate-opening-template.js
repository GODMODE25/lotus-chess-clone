/**
 * TEMPLATE — copy to scripts/generate-<slug>.js and fill in the TODOs.
 *
 * This is the scaffold used by the `opening-course-generator` skill. It removes
 * the boilerplate (buildLine / write loop / metadata shape) so you only supply
 * the chess theory. The shared library (scripts/opening-course-lib.js) does the
 * rest, including a PRE-FLIGHT LEGALITY CHECK that validates every line before
 * any file is written.
 *
 * Usage:
 *   1. Copy:  cp scripts/generate-opening-template.js scripts/generate-<slug>.js
 *   2. Set OPENING_NAME, SLUG, SIDE, ECO_RANGE.
 *   3. Fill the `tiers` object with real theory (sanMoves MUST be legal SAN,
 *      alternating White/Black, starting with White's first move).
 *   4. Fill the `metadata` object.
 *   5. Pre-flight check only:  node scripts/preflight-check-opening.js scripts/generate-<slug>.js
 *   6. Generate:               node scripts/generate-<slug>.js
 *   7. Validate dataset:       node scripts/validate-curriculum.js
 *
 * NOTE: do NOT run this template directly — it throws until the TODOs are
 * replaced (see the guard below).
 */
const { validateAllLines, writeCourse, countLines } = require('./opening-course-lib.js');

const OPENING_NAME = 'TODO Opening Name';   // e.g. 'Sicilian Defense'
const SLUG = 'TODO-slug';                    // e.g. 'sicilian-defense'
const SIDE = 'black';                        // 'white' or 'black'
const ECO_RANGE = 'TODO';                    // e.g. 'B20-B99'

// ---------------------------------------------------------------------------
// Tiers — fill with real theory. Each line is a raw object; buildLine (in the
// library) converts it to the stored variation object. Keep sanMoves legal SAN.
// ---------------------------------------------------------------------------
const tiers = {
    beginner: {
        lines: [
            {
                id: 'TODO-beginner-1',
                parentVariation: OPENING_NAME,
                variationName: 'TODO',
                aliases: [],
                eco: 'TODO',
                sanMoves: ['e4', 'c5'],   // TODO: legal SAN only
                prerequisites: [],
                continuationIds: [],
                conceptIds: ['central-control'],
                strategicIdeas: ['TODO'],
                commonMistakes: ['TODO'],
                explanation: 'TODO',
                reviewPriority: 5,
                estimatedStudyMinutes: 5,
                masteryXp: 100,
                difficulty: 2,
                popularity: 5,
            },
            // ... more beginner lines (target: 5)
        ],
    },
    novice: {
        lines: [
            // ... novice lines (target: 8)
        ],
    },
    intermediate: {
        lines: [
            // ... intermediate lines (target: 10)
        ],
    },
    advanced: {
        lines: [
            // ... advanced lines (target: 12)
        ],
    },
    expert: {
        lines: [
            // ... expert lines (target: 12)
        ],
    },
    master: {
        lines: [
            // ... master lines (target: 10)
        ],
    },
    legend: {
        lines: [
            // ... legend lines (target: 10)
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
    description: 'TODO',
    typicalPawnStructures: ['TODO'],
    commonTacticalThemes: ['TODO'],
    modelPlayers: ['TODO'],
    recommendedStudyOrder: ['TODO'],
    masteryLevels: [
        { tier: 'Beginner', xpReward: 100, accuracyTarget: 0.7, objectives: ['TODO'] },
        { tier: 'Novice', xpReward: 160, accuracyTarget: 0.72, objectives: ['TODO'] },
        { tier: 'Intermediate', xpReward: 240, accuracyTarget: 0.75, objectives: ['TODO'] },
        { tier: 'Advanced', xpReward: 340, accuracyTarget: 0.78, objectives: ['TODO'] },
        { tier: 'Expert', xpReward: 460, accuracyTarget: 0.8, objectives: ['TODO'] },
        { tier: 'Master', xpReward: 600, accuracyTarget: 0.82, objectives: ['TODO'] },
        { tier: 'Legend', xpReward: 800, accuracyTarget: 0.85, objectives: ['TODO'] },
    ],
};

// Guard: prevent accidental execution of an unconfigured template.
if (SLUG.includes('TODO') || OPENING_NAME.includes('TODO')) {
    throw new Error(
        'Template not configured. Set OPENING_NAME, SLUG, SIDE, ECO_RANGE and fill ' +
        'tiers/metadata in scripts/generate-<slug>.js before running.'
    );
}

// Pre-flight: validate ALL lines before writing any file.
validateAllLines(tiers, { openingFamily: OPENING_NAME });
console.log(`Pre-flight OK: ${OPENING_NAME} (${countLines(tiers)} lines).`);

// Generate (only when run directly, not when imported by the checker).
if (require.main === module) {
    writeCourse({ slug: SLUG, side: SIDE, tiers, metadata });
}

module.exports = { tiers, metadata, OPENING_NAME, SLUG, SIDE };
