---
name: validate-course
description: Validates opening course JSON for duplicate IDs, broken references, invalid SAN/FEN/PGN, and orphan nodes. Use when validating a repertoire, tier files, variation tree, curriculum dataset, or when the user mentions validate course, curriculum integrity, or opening JSON checks.
---

# Validate Course

Run validation after authoring or editing opening data. Fix every error before export or merge.

## Quick start

**Exported repertoire** (`data/openings/{colour}/{slug}/`):

```bash
node .cursor/skills/validate-course/scripts/validate-course.js opening data/openings/white/italian
```

**Pre-export variation tree** (from [build-opening-tree](../build-opening-tree/SKILL.md)):

```bash
node .cursor/skills/validate-course/scripts/validate-course.js tree path/to/tree.json
```

**Full curriculum** (all openings + shared data):

```bash
node .cursor/skills/validate-course/scripts/validate-course.js curriculum
node scripts/validate-curriculum.js
npx vitest run tests/curriculum.test.ts
```

Exit code `0` = all checks passed. Non-zero = fix errors and re-run.

## Checks

| Check | What it catches | Applies to |
|-------|-----------------|------------|
| **Duplicate IDs** | Same line or node ID used twice | tree, opening, curriculum |
| **Broken references** | Missing `prerequisites`, `continuationIds`, `conceptIds`, parent/child/node links | tree, opening, curriculum |
| **Invalid SAN** | Illegal move in `sanMoves` (chess.js replay) | tree, opening, curriculum |
| **Invalid FEN** | `startingFen` / `fen` piece placement ≠ position after replay | tree, opening, curriculum |
| **Invalid PGN** | `pgn` fails to load or SAN sequence ≠ `sanMoves` | opening, curriculum |
| **Orphan nodes** | Tree nodes unreachable from `root`; opening lines unreachable in continuation graph | tree, opening |

Compare piece placement only (FEN field 1); ignore castling/en-passant/halfmove fields when they differ cosmetically.

## Workflow

Copy this checklist:

```
Task Progress:
- [ ] Step 1: Run validate-course on target
- [ ] Step 2: Fix errors (see reference.md)
- [ ] Step 3: Re-run until exit 0
- [ ] Step 4: Run full curriculum + vitest before merge
```

### Step 1: Run validate-course

Pick the narrowest scope that covers your edits:

- Edited one tier file → validate the opening directory.
- Edited tree before export → validate the tree JSON.
- Touched shared concepts/traps or multiple openings → validate curriculum.

### Step 2: Fix errors

Use [reference.md](reference.md) for error patterns and fixes. Common fixes:

- **FEN mismatch** — recompute with chess.js after replaying `sanMoves`.
- **Invalid PGN** — regenerate with numbered PGN helper in [build-opening-tree/reference.md](../build-opening-tree/reference.md).
- **Broken reference** — add the missing line/node or remove the stale ID.
- **Orphan node** — wire `childIds` / `parentId` or delete unused nodes.
- **Orphan line** — link via `continuationIds` / `prerequisites` or mark as entry line (`prerequisites: []`).

### Step 3: Re-run

Repeat until the script exits `0`. Do not hand off failing data.

### Step 4: Full gate (before PR / repertoire completion)

```bash
node scripts/validate-curriculum.js
npx vitest run tests/curriculum.test.ts
```

Update [ROADMAP.md](ROADMAP.md) when a repertoire passes.

## Pairing with other skills

| Stage | Skill |
|-------|-------|
| Build tree from PGN | [build-opening-tree](../build-opening-tree/SKILL.md) |
| Export tier JSON | [create-opening-course](../create-opening-course/SKILL.md) |
| Validate | **validate-course** (this skill) |

## Additional resources

- Error catalog and fix table: [reference.md](reference.md)
