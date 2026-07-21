#!/usr/bin/env node
/**
 * Validates opening course data for duplicate IDs, broken references,
 * invalid SAN/FEN/PGN, and orphan nodes.
 *
 * Usage:
 *   node validate-course.js opening <dir>     # one repertoire (tier JSON)
 *   node validate-course.js tree <tree.json>  # pre-export variation tree
 *   node validate-course.js curriculum        # all openings under data/openings
 */
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const DATA_DIR = path.join(__dirname, '../../../../data');
const TIERS = ['beginner', 'novice', 'intermediate', 'advanced', 'expert', 'master', 'legend'];

let errors = 0;

function fail(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

function piecePlacement(fen) {
  return fen.split(' ')[0];
}

function replaySan(sanMoves) {
  const chess = new Chess();
  for (let i = 0; i < sanMoves.length; i++) {
    try {
      chess.move(sanMoves[i]);
    } catch (e) {
      throw new Error(`illegal move at ${i + 1} (${sanMoves[i]}): ${e.message}`);
    }
  }
  return chess;
}

function validateSanAndFen(label, sanMoves, expectedFen) {
  let chess;
  try {
    chess = replaySan(sanMoves);
  } catch (e) {
    fail(`${label}: invalid SAN — ${e.message}`);
    return;
  }
  if (expectedFen) {
    const calculated = chess.fen();
    if (piecePlacement(expectedFen) !== piecePlacement(calculated)) {
      fail(
        `${label}: invalid FEN — expected ${expectedFen}, calculated ${calculated}`
      );
    }
  }
}

function extractSanFromPgn(pgn) {
  const cleaned = pgn
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\d+\.\.\./g, ' ')
    .replace(/\d+\./g, ' ')
    .trim();
  return cleaned.split(/\s+/).filter(Boolean);
}

function validatePgn(label, pgn, sanMoves) {
  if (!pgn) return;
  const fromPgn = extractSanFromPgn(pgn);
  if (fromPgn.length !== sanMoves.length) {
    fail(
      `${label}: invalid PGN — move count ${fromPgn.length}, sanMoves ${sanMoves.length}`
    );
    return;
  }
  for (let i = 0; i < sanMoves.length; i++) {
    if (fromPgn[i] !== sanMoves[i]) {
      fail(
        `${label}: invalid PGN — move ${i + 1} PGN="${fromPgn[i]}" sanMoves="${sanMoves[i]}"`
      );
      return;
    }
  }
  // Confirm extracted moves are legal SAN
  try {
    replaySan(fromPgn);
  } catch (e) {
    fail(`${label}: invalid PGN — ${e.message}`);
  }
}

function loadConceptIds() {
  const conceptPath = path.join(DATA_DIR, 'concepts.json');
  if (!fs.existsSync(conceptPath)) return new Set();
  const data = JSON.parse(fs.readFileSync(conceptPath, 'utf8'));
  return new Set((data.concepts || []).map((c) => c.id));
}

function collectLinesFromOpening(dir) {
  const lines = [];
  const metadataPath = path.join(dir, 'metadata.json');
  if (!fs.existsSync(metadataPath)) {
    fail(`Missing metadata.json in ${dir}`);
    return lines;
  }
  for (const tier of TIERS) {
    const filePath = path.join(dir, `${tier}.json`);
    if (!fs.existsSync(filePath)) {
      fail(`Missing tier file: ${filePath}`);
      continue;
    }
    const tierData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    tierData.lines.forEach((line) => lines.push({ line, filePath }));
  }
  return lines;
}

function validateLineSet(entries, conceptIds, label) {
  const lineIds = new Set();
  const allIds = new Set();

  for (const { line, filePath } of entries) {
    if (lineIds.has(line.id)) {
      fail(`Duplicate line ID: ${line.id} in ${filePath}`);
    }
    lineIds.add(line.id);
    allIds.add(line.id);
  }

  for (const { line, filePath } of entries) {
    const tag = `Line ${line.id} (${path.basename(filePath)})`;
    validateSanAndFen(tag, line.sanMoves || [], line.startingFen || line.fen);
    validatePgn(tag, line.pgn, line.sanMoves || []);

    for (const cid of line.conceptIds || []) {
      if (conceptIds.size && !conceptIds.has(cid)) {
        fail(`${tag}: broken reference — concept "${cid}" does not exist`);
      }
    }
    for (const pid of line.prerequisites || []) {
      if (!allIds.has(pid)) {
        fail(`${tag}: broken reference — prerequisite "${pid}" does not exist`);
      }
    }
    for (const cid of line.continuationIds || []) {
      if (!allIds.has(cid)) {
        fail(`${tag}: broken reference — continuation "${cid}" does not exist`);
      }
    }
  }

  // Orphan lines: unreachable from entry lines in the prereq/continuation graph
  const lineById = new Map(entries.map(({ line }) => [line.id, line]));
  const neighbors = new Map();
  function link(a, b) {
    if (!neighbors.has(a)) neighbors.set(a, new Set());
    if (!neighbors.has(b)) neighbors.set(b, new Set());
    neighbors.get(a).add(b);
    neighbors.get(b).add(a);
  }
  for (const { line } of entries) {
    for (const cid of line.continuationIds || []) link(line.id, cid);
    for (const pid of line.prerequisites || []) link(line.id, pid);
  }
  const entryIds = entries
    .filter(({ line }) => !(line.prerequisites || []).length)
    .map(({ line }) => line.id);
  const visited = new Set();
  const queue = [...entryIds];
  while (queue.length) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    for (const next of neighbors.get(id) || []) queue.push(next);
  }
  for (const { line } of entries) {
    if (!visited.has(line.id)) {
      fail(`Orphan line: ${line.id} — not reachable from entry lines`);
    }
  }

  pass(`${label}: ${entries.length} lines — IDs, SAN, FEN, PGN, references, orphans`);
}

function validateOpeningDir(dir) {
  console.log(`\n--- OPENING: ${dir} ---`);
  const conceptIds = loadConceptIds();
  const entries = collectLinesFromOpening(dir);
  if (!entries.length) return;
  validateLineSet(entries, conceptIds, path.basename(dir));
}

function validateTree(treePath) {
  console.log(`\n--- TREE: ${treePath} ---`);
  const tree = JSON.parse(fs.readFileSync(path.resolve(treePath), 'utf8'));
  const { nodes = {}, branches = [], lines = [] } = tree;
  const nodeIds = new Set(Object.keys(nodes));
  const lineIds = new Set(lines.map((l) => l.id));

  // Duplicate IDs
  const seenLineIds = new Set();
  for (const line of lines) {
    if (seenLineIds.has(line.id)) {
      fail(`Duplicate line ID: ${line.id}`);
    }
    seenLineIds.add(line.id);
  }
  pass(`Duplicate ID scan: ${nodeIds.size} nodes, ${lines.length} lines`);

  // Broken references + SAN/FEN/PGN on nodes
  for (const [id, node] of Object.entries(nodes)) {
    const tag = `Node ${id}`;
    if (node.parentId && node.parentId !== 'root' && !nodeIds.has(node.parentId)) {
      fail(`${tag}: broken reference — parent "${node.parentId}" missing`);
    }
    for (const cid of node.childIds || []) {
      if (!nodeIds.has(cid)) {
        fail(`${tag}: broken reference — child "${cid}" missing`);
      }
    }
    validateSanAndFen(tag, node.sanMoves || [], node.fen);
  }

  for (const branch of branches) {
    if (!nodeIds.has(branch.splitNodeId)) {
      fail(`Branch "${branch.name}": broken reference — splitNodeId "${branch.splitNodeId}" missing`);
    }
    for (const lid of branch.lineIds || []) {
      if (!lineIds.has(lid)) {
        fail(`Branch "${branch.name}": broken reference — line "${lid}" missing`);
      }
    }
  }

  for (const line of lines) {
    const tag = `Line ${line.id}`;
    if (line.nodeId && !nodeIds.has(line.nodeId)) {
      fail(`${tag}: broken reference — node "${line.nodeId}" missing`);
    }
    validateSanAndFen(tag, line.sanMoves || [], line.fen);
    validatePgn(tag, line.pgn, line.sanMoves || []);
    for (const pid of line.prerequisites || []) {
      if (!lineIds.has(pid)) {
        fail(`${tag}: broken reference — prerequisite "${pid}" missing`);
      }
    }
    for (const cid of line.continuationIds || []) {
      if (!lineIds.has(cid)) {
        fail(`${tag}: broken reference — continuation "${cid}" missing`);
      }
    }
  }

  // Orphan nodes: unreachable from root
  const rootId = nodeIds.has('root') ? 'root' : Object.keys(nodes)[0];
  const visited = new Set();
  const queue = [rootId];
  while (queue.length) {
    const id = queue.shift();
    if (visited.has(id)) continue;
    visited.add(id);
    const node = nodes[id];
    if (!node) continue;
    for (const cid of node.childIds || []) {
      queue.push(cid);
    }
  }
  for (const id of nodeIds) {
    if (!visited.has(id)) {
      fail(`Orphan node: ${id} — unreachable from ${rootId}`);
    }
  }
  pass(`Orphan node scan: ${visited.size}/${nodeIds.size} nodes reachable`);
}

function traverseOpenings(root, callback) {
  if (!fs.existsSync(root)) {
    fail(`Openings root not found: ${root}`);
    return;
  }
  const entries = fs.readdirSync(root);
  for (const entry of entries) {
    const full = path.join(root, entry);
    if (!fs.statSync(full).isDirectory()) continue;
    if (fs.existsSync(path.join(full, 'metadata.json'))) {
      callback(full);
    } else {
      traverseOpenings(full, callback);
    }
  }
}

function main() {
  const mode = process.argv[2];
  const target = process.argv[3];

  if (!mode || !['opening', 'tree', 'curriculum'].includes(mode)) {
    console.error('Usage:');
    console.error('  node validate-course.js opening <dir>');
    console.error('  node validate-course.js tree <tree.json>');
    console.error('  node validate-course.js curriculum');
    process.exit(1);
  }

  console.log('--- VALIDATE COURSE ---');

  if (mode === 'opening') {
    if (!target) {
      console.error('Provide opening directory path.');
      process.exit(1);
    }
    validateOpeningDir(path.resolve(target));
  } else if (mode === 'tree') {
    if (!target) {
      console.error('Provide tree.json path.');
      process.exit(1);
    }
    validateTree(target);
  } else if (mode === 'curriculum') {
    const globalLineIds = new Set();
    traverseOpenings(path.join(DATA_DIR, 'openings'), (dir) => {
      const entries = collectLinesFromOpening(dir);
      for (const { line, filePath } of entries) {
        if (globalLineIds.has(line.id)) {
          fail(`Duplicate line ID (global): ${line.id} in ${filePath}`);
        }
        globalLineIds.add(line.id);
      }
      validateOpeningDir(dir);
    });
  }

  console.log('\n--- VALIDATION SUMMARY ---');
  if (errors === 0) {
    console.log('\x1b[32mAll checks passed.\x1b[0m');
    process.exit(0);
  }
  console.error(`\x1b[31mValidation failed with ${errors} error(s).\x1b[0m`);
  process.exit(1);
}

main();
