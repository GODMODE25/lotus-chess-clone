#!/usr/bin/env node
/**
 * Validates an intermediate opening tree JSON (pre-export).
 * Usage: node .cursor/skills/build-opening-tree/scripts/validate-tree.js path/to/tree.json
 */
const fs = require('fs');
const path = require('path');
const { Chess } = require('chess.js');

const treePath = process.argv[2];
if (!treePath) {
  console.error('Usage: node validate-tree.js <tree.json>');
  process.exit(1);
}

let errors = 0;
function fail(msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${msg}`);
  errors++;
}
function pass(msg) {
  console.log(`\x1b[32m[PASS]\x1b[0m ${msg}`);
}

let tree;
try {
  tree = JSON.parse(fs.readFileSync(path.resolve(treePath), 'utf8'));
} catch (e) {
  console.error(`Failed to read tree: ${e.message}`);
  process.exit(1);
}

const { nodes = {}, branches = [], lines = [], baseMoves = [] } = tree;
const nodeIds = new Set(Object.keys(nodes));
const lineIds = new Set(lines.map((l) => l.id));

// Replay helper
function replaySan(sanMoves) {
  const chess = new Chess();
  for (let i = 0; i < sanMoves.length; i++) {
    try {
      chess.move(sanMoves[i]);
    } catch (e) {
      throw new Error(`illegal move at ${i + 1} (${sanMoves[i]}): ${e.message}`);
    }
  }
  return chess.fen();
}

// Validate nodes
for (const [id, node] of Object.entries(nodes)) {
  if (node.parentId && !nodeIds.has(node.parentId) && node.parentId !== 'root') {
    fail(`Node ${id} references missing parent ${node.parentId}`);
  }
  for (const cid of node.childIds || []) {
    if (!nodeIds.has(cid)) fail(`Node ${id} references missing child ${cid}`);
  }
  try {
    const fen = replaySan(node.sanMoves || []);
    if (node.fen && node.fen.split(' ')[0] !== fen.split(' ')[0]) {
      fail(`Node ${id} FEN mismatch`);
    }
  } catch (e) {
    fail(`Node ${id}: ${e.message}`);
  }
}
pass(`Validated ${nodeIds.size} nodes`);

// Validate branches
for (const branch of branches) {
  if (!nodeIds.has(branch.splitNodeId)) {
    fail(`Branch "${branch.name}" references missing splitNodeId ${branch.splitNodeId}`);
  }
  for (const lid of branch.lineIds || []) {
    if (!lineIds.has(lid)) fail(`Branch "${branch.name}" references missing line ${lid}`);
  }
}
pass(`Validated ${branches.length} branches`);

// Validate lines
for (const line of lines) {
  if (lineIds.size !== lines.length && lineIds.has(line.id)) {
    // duplicate check handled below
  }
  if (nodeIds.size && line.nodeId && !nodeIds.has(line.nodeId)) {
    fail(`Line ${line.id} references missing node ${line.nodeId}`);
  }
  if (baseMoves.length) {
    const prefix = baseMoves.every((m, i) => line.sanMoves[i] === m);
    if (!prefix) fail(`Line ${line.id} does not start with baseMoves`);
  }
  try {
    const fen = replaySan(line.sanMoves);
    if (line.fen && line.fen.split(' ')[0] !== fen.split(' ')[0]) {
      fail(`Line ${line.id} FEN mismatch`);
    }
  } catch (e) {
    fail(`Line ${line.id}: ${e.message}`);
  }
  for (const pid of line.prerequisites || []) {
    if (!lineIds.has(pid)) fail(`Line ${line.id} prerequisite missing: ${pid}`);
  }
  for (const cid of line.continuationIds || []) {
    if (!lineIds.has(cid)) fail(`Line ${line.id} continuation missing: ${cid}`);
  }
}

const seen = new Set();
for (const line of lines) {
  if (seen.has(line.id)) fail(`Duplicate line ID: ${line.id}`);
  seen.add(line.id);
}
pass(`Validated ${lines.length} lines`);

// Acyclic prerequisites
const visiting = new Set();
const visited = new Set();
function dfs(id) {
  if (visited.has(id)) return;
  if (visiting.has(id)) {
    fail(`Circular prerequisite chain involving ${id}`);
    return;
  }
  visiting.add(id);
  const line = lines.find((l) => l.id === id);
  for (const pid of line?.prerequisites || []) dfs(pid);
  visiting.delete(id);
  visited.add(id);
}
lines.forEach((l) => dfs(l.id));

console.log('\n--- TREE VALIDATION SUMMARY ---');
if (errors === 0) {
  console.log('\x1b[32mTree validation passed.\x1b[0m');
  process.exit(0);
}
console.error(`\x1b[31mTree validation failed with ${errors} error(s).\x1b[0m`);
process.exit(1);
