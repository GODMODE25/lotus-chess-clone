# Build Opening Tree — Reference

## Tree object schema

```typescript
interface OpeningTree {
  openingSlug: string;
  baseMoves: string[];
  nodes: Record<string, TreeNode>;
  branches: TreeBranch[];
  lines: TreeLine[];
}

interface TreeNode {
  id: string;
  sanMoves: string[];
  uciMoves: string[];
  fen: string;
  ply: number;
  parentId: string | null;
  childIds: string[];
  lineIds: string[];
  isBase?: boolean;
}

interface TreeBranch {
  name: string;           // → parentVariation in exported JSON
  splitNodeId: string;    // node where paths diverge
  trunkMoves: string[];   // shared prefix including split move
  lineIds: string[];
}

interface TreeLine {
  id: string;
  nodeId: string;         // terminal node for this drill path
  parentVariation: string;
  variationName: string;
  sanMoves: string[];
  uciMoves: string[];
  fen: string;
  pgn: string;
  moveDepth: number;
  prerequisites: string[];
  continuationIds: string[];
  tier?: string;          // assigned during create-opening-course
}
```

## Node ID pattern

```
{slug}-n-{ply}-{lastSanKebab}
```

| sanMoves ending | Node ID |
|-----------------|---------|
| `[]` | `root` |
| `["e4"]` | `italian-n-1-e4` |
| `["e4","e5","Nf3"]` | `italian-n-3-nf3` |

Rules:

- Kebab-case the last SAN move (`O-O` → `o-o`, `Nf3` → `nf3`).
- IDs must be unique across the tree; include slug prefix for global safety.

## Line ID pattern

```
{slug}-{tier-kebab}-{branch-kebab}-{line-kebab}
```

Examples from Italian Game:

| Line | ID |
|------|-----|
| Giuoco Pianissimo main | `italian-beginner-giuoco-pianissimo-main` |
| Two Knights entry | `italian-beginner-two-knights-main` |

## Branch inference heuristics

When branch names are not supplied, infer from the first diverging move after `baseMoves`:

| Divergence (White repertoire) | Suggested branch name |
|--------------------------------|----------------------|
| `...Bc5` after Bc4 | Giuoco Pianissimo / Giuoco Piano |
| `...Nf6` after Bc4 | Two Knights Defense |
| `...Be7` after Bc4 | Classical Defense |
| `...d6` after Italian setup | Hungarian / Quiet d6 |
| `4.c3` instead of `4.d3` | Giuoco Piano c3 System |
| `4.d4` | Giuoco Piano Open Centre |

Confirm names against ECO and source theory before export.

## PGN helpers

### Numbered PGN from SAN array

```javascript
function toNumberedPgn(sanMoves) {
  let out = '';
  for (let i = 0; i < sanMoves.length; i++) {
    const isWhite = i % 2 === 0;
    if (isWhite) out += `${Math.floor(i / 2) + 1}.`;
    else if (i === 1) out += '1...';
    out += sanMoves[i];
    if (i < sanMoves.length - 1) out += ' ';
  }
  return out.trim();
}
```

### Extract paths from branched PGN

1. Parse mainline moves sequentially.
2. At each `(`, snapshot current position and parse sub-variation until `)`.
3. Append sub-path to results; resume mainline after `)`.
4. Flatten nested parentheses recursively.

## Merge algorithm (trie)

```
for each parsed path:
  walk from root
  for each move in path:
    find or create child node for this move
    advance pointer
  mark terminal node with lineId
```

Shared prefixes become single nodes automatically. Branch points emerge where a node gains multiple children.

## Parent / continuation wiring

**Within tier, same branch:**

```
Line A (depth 8) ──continuation──▶ Line B (depth 10)
Line B.prerequisites = [Line A.id]
```

**Cross-tier, same branch:**

```
italian-beginner-*-main ──continuation──▶ italian-novice-*-entry
novice.prerequisites = [beginner.id]
```

**Rules:**

- A line's `sanMoves` must extend its prerequisite's `sanMoves` (strict prefix).
- Continuation target must be strictly deeper (`moveDepth` greater).
- Beginner entry lines: `prerequisites: []`.

## Validation errors (common)

| Error | Fix |
|-------|-----|
| FEN mismatch | Recompute with `chess.js`; check castling/en passant |
| Missing continuation target | Add line or remove stale ID |
| Branch with one child | Not a branch point — merge into parent branch |
| Line doesn't start with baseMoves | Trim or extend path to match metadata trunk |
| Circular prerequisites | Break cycle; prerequisites must be acyclic DAG |

## Italian Game reference tree

```
root
└── e4-e5-Nf3-Nc6-Bc4 (baseMoves)
    ├── Bc5 → Giuoco Pianissimo
    │   ├── d3-Nf6-O-O-d6
    │   └── d3-Nf6-Nc3
    ├── Nf6 → Two Knights
    │   └── (Fried Liver branches in higher tiers)
    └── Be7 → Classical Defense
```

See full line data: [data/openings/white/italian/beginner.json](data/openings/white/italian/beginner.json)
