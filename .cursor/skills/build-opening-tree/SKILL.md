---
name: build-opening-tree
description: Parses PGN move sequences into a variation tree with nodes, branches, parent links, and cross-reference validation. Use when converting PGN to a tree, building variation branches, wiring prerequisites and continuations, or preparing lines before create-opening-course export.
---

# Build Opening Tree

Convert curated PGN into a validated variation tree before tier JSON export. Pair with [create-opening-course](../create-opening-course/SKILL.md) for full repertoire authoring.

## Input

| Field | Example |
|-------|---------|
| PGN | `1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.d3 Nf6 5.O-O d6` |
| Opening slug | `italian-game` |
| Base moves | Shared trunk prefix, e.g. `["e4","e5","Nf3","Nc6","Bc4"]` |
| Branch names | Map divergence points to `parentVariation` labels |

Accept PGN as:

- **Single-line** numbered SAN string (most common)
- **Array of lines** — each element is one complete PGN or `sanMoves[]`
- **Branched PGN** — extract every `( ... )` variation path into separate move lists first

## Output

An **opening tree** object:

```json
{
  "openingSlug": "italian-game",
  "baseMoves": ["e4", "e5", "Nf3", "Nc6", "Bc4"],
  "nodes": {},
  "branches": [],
  "lines": []
}
```

Shape details: [reference.md](reference.md)

Downstream use: assign tiers, teaching fields, and ECO codes → export via create-opening-course.

## Hard Rules

- Every node has a unique ID.
- Every FEN is valid and computed with `chess.js` — never hand-written.
- Every PGN is valid SAN with move numbers in exported lines.
- Branches share a trunk; splits occur only where move sequences diverge.
- Every `prerequisites` and `continuationIds` entry resolves to a line ID in the same tree.
- No fabricated moves — PGN must come from source theory.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Parse PGN
- [ ] Step 2: Generate nodes
- [ ] Step 3: Generate branches
- [ ] Step 4: Compute parents
- [ ] Step 5: Validate references
```

### Step 1: Parse PGN

1. Normalize input to a list of move paths (`sanMoves[]` per line).
2. Strip comments, NAGs, and result tokens (`1-0`, `*`, etc.).
3. Parse each path with `chess.js`:

```javascript
const { Chess } = require('chess.js');

function parseLine(sanMoves) {
  const chess = new Chess();
  const uciMoves = [];
  for (const san of sanMoves) {
    const move = chess.move(san);
    if (!move) throw new Error(`Illegal move: ${san}`);
    uciMoves.push(move.from + move.to + (move.promotion ?? ''));
  }
  return {
    sanMoves: [...sanMoves],
    uciMoves,
    fen: chess.fen(),
    ply: sanMoves.length,
    pgn: toNumberedPgn(sanMoves),
  };
}
```

4. For branched PGN, split on `( ... )` groups and replay each path from the branch point.
5. Reject duplicate paths (identical `sanMoves`).

### Step 2: Generate nodes

1. Merge all parsed paths into a trie keyed by move prefix.
2. Assign each position a node ID: `root` for start; otherwise `{slug}-n-{ply}-{lastSanKebab}` (e.g. `italian-n-10-o-o`).
3. Store per node:

```javascript
{
  id, sanMoves, uciMoves, fen, ply,
  parentId,       // null for root
  childIds: [],   // next-move nodes
  lineIds: []     // drill lines ending here
}
```

4. Identify **base trunk**: longest shared prefix matching `baseMoves`. Mark trunk nodes `isBase: true`.

### Step 3: Generate branches

1. Find every node where `childIds.length > 1` — these are branch points.
2. Group child subtrees under a **branch name** (`parentVariation`):
   - Use provided branch map when available.
   - Otherwise infer from first diverging move (e.g. `...Bc5` → "Giuoco Pianissimo", `...Nf6` → "Two Knights").
3. Record branches:

```javascript
{
  name: "Giuoco Pianissimo",
  splitNodeId: "italian-n-6-bc4",
  trunkMoves: ["e4","e5","Nf3","Nc6","Bc4","Bc5"],
  lineIds: ["italian-beginner-giuoco-pianissimo-main", "..."]
}
```

4. Every line ending node must belong to exactly one branch.

### Step 4: Compute parents

Wire tree relationships at two levels:

**Node parents** (already set in Step 2): each node's `parentId` points to the position before its last move.

**Line parents** (progression graph):

1. Assign each line a kebab ID: `{slug}-{tier}-{branch-kebab}-{line-kebab}`.
2. **Prerequisites** — same branch, earlier depth or earlier tier:
   - Shorter line in branch → prerequisite for longer line in same tier.
   - Deepest line in tier N → prerequisite for entry line in tier N+1 of same branch.
3. **ContinuationIds** — inverse of prerequisites within a branch chain:
   - Line A ends at ply 10 → continues to line B starting with A's moves + deeper moves.
4. Cross-branch links are rare; prefer staying inside `parentVariation`.

Example (Italian Game):

```
italian-beginner-giuoco-pianissimo-main
  continuationIds: ["italian-novice-pianissimo-c3"]
  prerequisites: []
```

### Step 5: Validate references

Run checks before handing off to create-opening-course:

```bash
node .cursor/skills/build-opening-tree/scripts/validate-tree.js path/to/tree.json
```

Manual checklist:

- [ ] Every `sanMoves` sequence is legal (`chess.js` replay)
- [ ] Every `fen` matches replayed position (piece placement)
- [ ] No duplicate node or line IDs
- [ ] Every branch `splitNodeId` exists in `nodes`
- [ ] Every line's `sanMoves` starts with `baseMoves`
- [ ] Every ID in `prerequisites` / `continuationIds` exists in `lines`
- [ ] No circular prerequisite chains
- [ ] Full curriculum pass: `node scripts/validate-curriculum.js`

## Quick Example

Input PGN paths:

```
1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.d3 Nf6 5.O-O d6
1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.d3 Nf6 5.Nc3
1.e4 e5 2.Nf3 Nc6 3.Bc4 Nf6
```

Tree result:

- Trunk nodes through `...Bc4`
- Branch at move 6: `Bc5` → Giuoco Pianissimo (2 lines), `Nf6` → Two Knights (1 line)
- Line IDs wired with continuations across depths

Reference tree: [data/openings/white/italian/](data/openings/white/italian/)

## Additional Resources

- Tree schema, ID patterns, branch inference: [reference.md](reference.md)
- Full export workflow: [create-opening-course](../create-opening-course/SKILL.md)
- Data model: [docs/DATA_MODEL.md](docs/DATA_MODEL.md)
