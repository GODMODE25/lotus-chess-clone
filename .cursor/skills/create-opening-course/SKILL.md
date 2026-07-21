---
name: create-opening-course
description: Creates curated opening course JSON (metadata.json and seven mastery tier files) from opening name, ECO, and source theory. Use when building a new repertoire, expanding the curriculum database, authoring beginner through legend tier lines, or when the user mentions create opening course, metadata.json, or mastery JSON files.
---

# Create Opening Course

Build one complete opening repertoire at a time. Output must pass `node scripts/validate-curriculum.js` and `npx vitest run tests/curriculum.test.ts`.

## Input

| Field | Example |
|-------|---------|
| Opening name | Ruy Lopez |
| ECO | C60–C99 |
| Source theory | Named book, database, or annotated PGN the agent may cite |

Also confirm **colour** (`white` or `black`) and **slug** (kebab-case, e.g. `ruy-lopez`) before exporting.

## Output

```
data/openings/{colour}/{slug}/
├── metadata.json
├── beginner.json
├── novice.json
├── intermediate.json
├── advanced.json
├── expert.json
├── master.json
└── legend.json
```

Reference implementation: [data/openings/white/italian/](data/openings/white/italian/)

## Hard Rules

- Every opening has an ECO code (range in metadata, per-line code in tier files).
- Every node has a unique kebab-case ID across the entire dataset.
- Every FEN is valid and matches the position after `sanMoves` (piece placement only).
- Every PGN is valid SAN notation with move numbers.
- Every line belongs to exactly one mastery tier.
- No placeholder content. No fabricated chess theory — moves must come from the source theory or well-established mainline practice.
- Opening data is static JSON; do not mix user progress fields.
- Use only `conceptIds` that exist in [data/concepts.json](data/concepts.json). Add new concepts there first if needed.
- Complete **one repertoire fully** before starting the next.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Research theory
- [ ] Step 2: Select main line
- [ ] Step 3: Select practical sidelines
- [ ] Step 4: Build variation tree
- [ ] Step 5: Generate FENs
- [ ] Step 6: Validate
- [ ] Step 7: Export JSON
```

### Step 1: Research theory

1. Read the provided source theory. Cross-check critical branches with a second reputable source when possible.
2. Record: main tabiya, critical deviations, typical pawn structures, tactical themes, and model players.
3. Map ECO subcodes to variations (e.g. C50 = Giuoco Pianissimo quiet lines).
4. Read [docs/DATA_MODEL.md](docs/DATA_MODEL.md) and [ROADMAP.md](ROADMAP.md) for tier depth targets and expansion order.

### Step 2: Select main line

Choose the **primary repertoire move order** for the student's colour:

- Must match `baseMoves` in metadata (the shared trunk all lines extend from).
- Prefer practical, sound lines over engine-only sidelines at lower tiers.
- Assign the deepest main-line continuations to Intermediate → Master tiers.

### Step 3: Select practical sidelines

For each tier, pick lines Black (or White) actually plays in practice:

| Tier | Target depth | ~Line count | Focus |
|------|-------------|-------------|-------|
| Beginner | 6–8 plies | 5 | Foundational moves, basic development |
| Novice | 8–10 plies | 8 | Main replies, basic central breaks |
| Intermediate | 10–12 plies | 10 | Primary variations, pawn tension |
| Advanced | 12–14 plies | 12 | Sharp complications, gambits |
| Expert | 14–16 plies | 12 | Sacrifices, compensation |
| Master | 16–18 plies | 10 | GM lines, slow plans |
| Legend | 18–22+ plies | 10 | Rare sidelines, transpositions |

### Step 4: Build variation tree

1. Sketch a tree from `baseMoves` outward. Each **line** = one drill path from start position to a stopping point.
2. Assign IDs: `{slug}-{tier-kebab}-{variation-kebab}` (e.g. `ruy-lopez-novice-morphy-defense-main`).
3. Set `parentVariation` (branch name) and `variationName` (specific line label).
4. Wire `prerequisites` and `continuationIds` so progression flows Beginner → Legend.
5. Set `reviewPriority` (1–5), `estimatedStudyMinutes`, and tier-appropriate `masteryXp` (see [reference.md](reference.md)).

### Step 5: Generate FENs

Use `chess.js` — never hand-write FENs:

```javascript
const { Chess } = require('chess.js');
const chess = new Chess();
sanMoves.forEach(m => chess.move(m));
const startingFen = chess.fen(); // position AFTER all moves
```

For each line also produce:

- `pgn` — numbered SAN string (e.g. `1.e4 e5 2.Nf3`)
- `sanMoves` — array of SAN half-moves
- `uciMoves` — parallel UCI array (`e2e4`, …)
- `moveDepth` — `sanMoves.length`

### Step 6: Validate

Run in order; fix all errors before export:

```bash
node scripts/validate-curriculum.js
npx vitest run tests/curriculum.test.ts
```

Checks include: schema shape, duplicate IDs, legal moves, FEN match, valid `conceptIds`, and resolved `prerequisites` / `continuationIds`.

### Step 7: Export JSON

1. Write `metadata.json` — opening-wide fields + all seven `masteryLevels` entries (objectives, graduation requirements, xp rewards). Mirror [schemas/opening.schema.json](schemas/opening.schema.json).
2. Write one `{tier}.json` per mastery level — `{ openingId, tier, lines[] }`. Mirror [schemas/variation.schema.json](schemas/variation.schema.json).
3. Update [ROADMAP.md](ROADMAP.md): mark opening complete, list files, note blockers, update handoff section.
4. When wiring into the app, register imports in `src/content/openingsCurated.ts` (follow Italian Game pattern).

## Line authoring template

Each line needs teaching content, not just moves:

```json
{
  "id": "{slug}-beginner-main-setup",
  "parentVariation": "Giuoco Pianissimo",
  "openingFamily": "Italian Game",
  "variationName": "Giuoco Pianissimo Main Setup",
  "aliases": [],
  "eco": "C50",
  "pgn": "1.e4 e5 2.Nf3 Nc6 3.Bc4 Bc5 4.d3 Nf6 5.O-O d6",
  "sanMoves": ["e4", "e5", "Nf3", "Nc6", "Bc4", "Bc5", "d3", "Nf6", "O-O", "d6"],
  "uciMoves": ["e2e4", "e7e5", "g1f3", "b8c6", "f1c4", "f8c5", "d2d3", "g8f6", "e1g1", "d7d6"],
  "startingFen": "<from chess.js>",
  "moveDepth": 10,
  "difficulty": 1,
  "popularity": 5,
  "prerequisites": [],
  "continuationIds": ["{slug}-novice-..."],
  "conceptIds": ["development", "central-control"],
  "strategicIdeas": ["..."],
  "tacticalMotifs": [],
  "commonMistakes": ["..."],
  "explanation": "Minimum 20 characters of accurate teaching prose.",
  "reviewPriority": 5,
  "estimatedStudyMinutes": 2,
  "masteryXp": 10
}
```

## Additional resources

- Tier XP defaults, graduation strings, and metadata field guide: [reference.md](reference.md)
- Schemas: [schemas/opening.schema.json](schemas/opening.schema.json), [schemas/variation.schema.json](schemas/variation.schema.json)
