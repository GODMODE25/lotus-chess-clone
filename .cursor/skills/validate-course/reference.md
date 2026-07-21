# Validate Course — Reference

## Error catalog

| Message pattern | Check | Typical fix |
|-----------------|-------|-------------|
| `Duplicate line ID` / `Duplicate node ID` | duplicate IDs | Rename; IDs are global kebab-case |
| `prerequisite missing` / `continuation missing` | broken references | Add target line or remove stale ID |
| `references non-existent concept` | broken references | Add concept to `data/concepts.json` or fix typo |
| `references missing parent` / `missing child` | broken references | Repair tree links or delete orphan |
| `illegal move` / `Invalid move` | invalid SAN | Fix move order, castling (`O-O`), promotion |
| `FEN mismatch` | invalid FEN | Recompute FEN from replayed `sanMoves` |
| `PGN load failed` / `PGN SAN mismatch` | invalid PGN | Regenerate numbered PGN from `sanMoves` |
| `Orphan node` | orphan nodes | Connect to `root` via `childIds` or remove |
| `Orphan line` | orphan nodes | Add `continuationIds` from parent or set `prerequisites: []` for entry |

## PGN regeneration

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

## FEN recomputation

```javascript
const { Chess } = require('chess.js');
function fenAfterSan(sanMoves) {
  const chess = new Chess();
  sanMoves.forEach((m) => chess.move(m));
  return chess.fen();
}
```

Use `startingFen` (tier JSON) or `fen` (tree JSON). Compare `split(' ')[0]` only.

## Orphan definitions

**Tree:** BFS from `root` following `childIds`. Any node in `nodes` not visited is an orphan.

**Opening lines:** BFS from entry lines (`prerequisites.length === 0`) following `continuationIds`. Lines not visited are orphans unless they are intentional dead-end leaves with no continuations expected.

## Validation order (recommended)

1. Tree JSON (if used) — catch structural issues early
2. Opening directory — tier files for one repertoire
3. `node scripts/validate-curriculum.js` — full dataset + traps/concepts
4. `npx vitest run tests/curriculum.test.ts` — CI parity

## Schema sources

- [schemas/variation.schema.json](../../../schemas/variation.schema.json)
- [schemas/opening.schema.json](../../../schemas/opening.schema.json)
- [docs/DATA_MODEL.md](../../../docs/DATA_MODEL.md)
