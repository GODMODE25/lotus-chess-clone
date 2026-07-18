const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const DATA_DIR = path.join(__dirname, '../data');
const SCHEMAS_DIR = path.join(__dirname, '../schemas');

console.log('--- CURRICULUM INTEGRITY VALIDATION ---');

let errorsCount = 0;
const lineIds = new Set();
const conceptIds = new Set();
const trapIds = new Set();

function logError(message) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${message}`);
  errorsCount++;
}

function logSuccess(message) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${message}`);
}

// 1. Load Schemas
let openingSchema, variationSchema, conceptSchema, trapSchema;
try {
  openingSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'opening.schema.json'), 'utf8'));
  variationSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'variation.schema.json'), 'utf8'));
  conceptSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'concept.schema.json'), 'utf8'));
  trapSchema = JSON.parse(fs.readFileSync(path.join(SCHEMAS_DIR, 'trap.schema.json'), 'utf8'));
  logSuccess('Loaded all JSON schemas successfully.');
} catch (err) {
  logError(`Failed to load schemas: ${err.message}`);
  process.exit(1);
}

// 2. Validate Concepts
let conceptsData;
try {
  conceptsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'concepts.json'), 'utf8'));
  if (!Array.isArray(conceptsData.concepts)) {
    logError('concepts.json format invalid: expected a "concepts" array.');
  } else {
    conceptsData.concepts.forEach(c => {
      if (conceptIds.has(c.id)) {
        logError(`Duplicate concept ID: ${c.id}`);
      }
      conceptIds.add(c.id);
    });
    logSuccess(`Validated concepts.json. Found ${conceptIds.size} concepts.`);
  }
} catch (err) {
  logError(`Failed to read/parse concepts.json: ${err.message}`);
}

// 3. Validate Traps
let trapsData;
try {
  trapsData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'traps.json'), 'utf8'));
  if (!Array.isArray(trapsData.traps)) {
    logError('traps.json format invalid: expected a "traps" array.');
  } else {
    trapsData.traps.forEach(t => {
      if (trapIds.has(t.id)) {
        logError(`Duplicate trap ID: ${t.id}`);
      }
      trapIds.add(t.id);
      
      // Verify moves
      const chess = new Chess();
      t.sanMoves.forEach((move, i) => {
        try {
          chess.move(move);
        } catch (e) {
          logError(`Invalid move in trap ${t.id} at step ${i + 1} (${move}): ${e.message}`);
        }
      });
      
      const lastFen = chess.fen();
      if (t.resultingFen && t.resultingFen.split(' ')[0] !== lastFen.split(' ')[0]) {
        logError(`Trap ${t.id} FEN mismatch.\n  Expected: ${t.resultingFen}\n  Calculated: ${lastFen}`);
      }
    });
    logSuccess(`Validated traps.json. Found ${trapIds.size} traps.`);
  }
} catch (err) {
  logError(`Failed to read/parse traps.json: ${err.message}`);
}

// 4. Validate Openings Directory
const openingsRoot = path.join(DATA_DIR, 'openings');
const referencedContinuationIds = new Set();
const referencedPrereqIds = new Set();

function validateOpeningDirectory(dir) {
  const metadataPath = path.join(dir, 'metadata.json');
  if (!fs.existsSync(metadataPath)) return;

  let metadata;
  try {
    metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    logSuccess(`Validated metadata for opening: ${metadata.name}`);
  } catch (err) {
    logError(`Failed to read/parse metadata at ${metadataPath}: ${err.message}`);
    return;
  }

  const tiers = ['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master', 'legend'];
  tiers.forEach(tier => {
    const filePath = path.join(dir, `${tier}.json`);
    if (!fs.existsSync(filePath)) {
      logError(`Missing tier file: ${filePath}`);
      return;
    }

    try {
      const tierData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      if (tierData.openingId !== metadata.id) {
        logError(`Opening ID mismatch in ${filePath}. Expected ${metadata.id}, found ${tierData.openingId}`);
      }
      
      tierData.lines.forEach(line => {
        if (lineIds.has(line.id)) {
          logError(`Duplicate line ID: ${line.id} in ${filePath}`);
        }
        lineIds.add(line.id);

        // Verify PGN/SAN moves legality
        const chess = new Chess();
        line.sanMoves.forEach((move, i) => {
          try {
            chess.move(move);
          } catch (e) {
            logError(`Invalid move in line ${line.id} at index ${i} (${move}): ${e.message}`);
          }
        });

        // Verify FEN matches
        const finalFen = chess.fen();
        if (line.startingFen && line.startingFen.split(' ')[0] !== finalFen.split(' ')[0]) {
          logError(`Line ${line.id} FEN mismatch.\n  Expected: ${line.startingFen}\n  Calculated: ${finalFen}`);
        }

        // Verify Concept references
        line.conceptIds.forEach(cid => {
          if (!conceptIds.has(cid)) {
            logError(`Line ${line.id} references non-existent concept: ${cid}`);
          }
        });

        // Store references for cross-validation
        if (line.continuationIds) {
          line.continuationIds.forEach(id => referencedContinuationIds.add(id));
        }
        if (line.prerequisites) {
          line.prerequisites.forEach(id => referencedPrereqIds.add(id));
        }
      });
      logSuccess(`Validated tier: ${tierData.tier} (${tierData.lines.length} lines)`);
    } catch (err) {
      logError(`Failed to read/parse tier file ${filePath}: ${err.message}`);
    }
  });
}

function traverseDirectory(currentPath) {
  const files = fs.readdirSync(currentPath);
  files.forEach(file => {
    const fullPath = path.join(currentPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (fs.existsSync(path.join(fullPath, 'metadata.json'))) {
        validateOpeningDirectory(fullPath);
      } else {
        traverseDirectory(fullPath);
      }
    }
  });
}

if (fs.existsSync(openingsRoot)) {
  traverseDirectory(openingsRoot);
} else {
  logError(`Openings root directory not found: ${openingsRoot}`);
}

// 5. Cross-validate references
referencedContinuationIds.forEach(id => {
  if (!lineIds.has(id)) {
    logError(`Referenced continuation ID does not exist: ${id}`);
  }
});

referencedPrereqIds.forEach(id => {
  if (!lineIds.has(id)) {
    logError(`Referenced prerequisite ID does not exist: ${id}`);
  }
});

console.log('\n--- VALIDATION SUMMARY ---');
if (errorsCount === 0) {
  console.log('\x1b[32mALL TESTS PASSED SUCCESSFULLY! Clean curriculum dataset.\x1b[0m');
  process.exit(0);
} else {
  console.error(`\x1b[31mVALIDATION FAILED with ${errorsCount} errors.\x1b[0m`);
  process.exit(1);
}
