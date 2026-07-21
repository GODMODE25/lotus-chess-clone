---
name: opening-course-generator
description: Scaffold and validate 7-tier chess opening courses (Beginner→Legend JSON) for the lotus-chess-clone curriculum, using a shared generator library with a pre-flight legality checker and a pitfalls checklist. Use when adding a new opening (white or black) to data/openings per ROADMAP.md.
---

# Opening Course Generator Skill

This skill standardises how a new opening course is authored for the curriculum. It removes the copy-paste boilerplate that previously lived in every `scripts/generate-*.js` file and adds an automated **pre-flight legality check** that catches illegal move sequences *before* any JSON is written.

---

## 1. When to use this skill

- Adding any new opening from [`ROADMAP.md`](ROADMAP.md) (Phases 1–4, white or black).
- Regenerating an opening after fixing theory.
- Validating an opening generator's move lists without writing files.

Do NOT use this for: editing the front-end (`src/content/openingsCurated.ts`), schema changes (`schemas/`), or concept/trap data (`data/concepts.json`, `data/traps.json`).

---

## 2. Architecture (reuse, don't reimplement)

All generators share one library: [`scripts/opening-course-lib.js`](scripts/opening-course-lib.js).

| Export | Purpose |
|--------|---------|
| `buildLine({...})` | Convert a raw line definition (with `sanMoves`) into the stored variation object (FEN/PGN/UCI derived from chess.js). |
| `validateAllLines(tiers, opts)` | **Pre-flight legality check.** Validates every line's `sanMoves` with chess.js and throws with ALL errors (tier, line id, failing ply, FEN, sample legal moves). |
| `writeCourse({slug, side, tiers, metadata})` | Write the 7 tier JSON files + `metadata.json`, each wrapped with the top-level `openingId`. |
| `countLines(tiers)` | Count total lines (for logging). |

Supporting files:
- [`scripts/generate-opening-template.js`](scripts/generate-opening-template.js) — copy this to `scripts/generate-<slug>.js` and fill the TODOs.
- [`scripts/preflight-check-opening.js`](scripts/preflight-check-opening.js) — standalone checker: `node scripts/preflight-check-opening.js scripts/generate-<slug>.js`.

The generator template defines `tiers` as **raw line objects** (no `buildLine` wrapping). `validateAllLines` checks them; `writeCourse` maps each through `buildLine`. This lets the standalone checker `require()` a generator without triggering file writes (the write is guarded by `if (require.main === module)`).

---

## 3. Workflow

1. **Scaffold:** `cp scripts/generate-opening-template.js scripts/generate-<slug>.js`
2. **Configure constants:** `OPENING_NAME`, `SLUG`, `SIDE` (`'white'`/`'black'`), `ECO_RANGE`.
3. **Author theory:** Fill `tiers.beginner` … `tiers.legend` with real, legal SAN move lists. Target line counts: 5 / 8 / 10 / 12 / 12 / 10 / 10 (67 total). Depths per tier: Beginner 6–8 plies, Novice 8–10, Intermediate 10–12, Advanced 12–14, Expert 14–16, Master 16–18, Legend 18–22+.
4. **Author metadata:** `description`, `typicalPawnStructures`, `commonTacticalThemes`, `modelPlayers`, `recommendedStudyOrder`, and 7 `masteryLevels` (each with `xpReward`, `accuracyTarget`, `objectives`).
5. **Pre-flight check:** `node scripts/preflight-check-opening.js scripts/generate-<slug>.js` — fix every reported illegal move (see §5).
6. **Generate:** `node scripts/generate-<slug>.js`
7. **Validate dataset:** `node scripts/validate-curriculum.js` — must print `ALL TESTS PASSED SUCCESSFULLY`.
8. **Update [`ROADMAP.md`](ROADMAP.md):** mark the opening `[x]`, expand the "Handoff to Next Agent" section (created/modified files, architectural decisions, blockers, remaining work, completion %), per the roadmap-requirement rule.

---

## 4. Field & concept rules

- `id` must be unique across the whole course; use the pattern `<slug>-<tier>-<variant>` (e.g. `sicilian-novice-najdorf`).
- `continuationIds` / `prerequisites` must reference IDs that **exist** as line `id`s in the same course (watch `-deep` / `-e6-d4` suffixes).
- `conceptIds` must be valid entries from [`data/concepts.json`](data/concepts.json) (29 concepts). Common valid ones: `central-control`, `development`, `pawn-structure`, `space-advantage`, `fianchetto`, `king-safety`, `piece-activity`, `bishop-pair`. `'queens'` is NOT valid.
- `explanation` prose must describe the ACTUAL `sanMoves` (correct move numbers and piece moves) — never copy an explanation from a different line.
- `sanMoves` must alternate White/Black and start with White's move (even for a black-side opening like the Sicilian: `['e4','c5', …]`).

---

## 5. Pitfalls checklist (illegal-move bug classes)

The pre-flight checker catches these automatically, but author them correctly the first time:

1. **Castling before bishop development.** White `O-O` requires the f1 bishop to have moved (e.g. `e3` then `Bd3`, or `Bc4`/`Bg5`/`Be2`). If the f1 bishop is still home (e2 pawn present, bishop on f1), white cannot castle. Fix: insert `e3` + `Bd3` (or other development) before `O-O`.
2. **Black already castled.** If black castled earlier, a later `O-O` attributed to black is illegal (no castling rights). Ensure only one `O-O` per side; the second `O-O` in a sequence is the OTHER side's move — insert a black move between white's development and white's castling.
3. **Ambiguous rook moves.** After castling, both rooks may reach a square (e.g. `Re1` ambiguous between a1 and f1). Disambiguate: `Rfe1` / `Rae1`.
4. **Moving a traded-off pawn.** If a pawn was captured (e.g. `cxd5` then `exd5` removes black's d-pawn), a later `d6`/`d5` for that pawn is illegal. Verify the pawn still exists on its file.
5. **Bishop blocked by its own pawn.** `Bd3`/`Bc4`/`Be2` needs a clear path. After `Bg5` (c1→g5) the f1 bishop is still blocked by the e2 pawn — `Bd3` is illegal until `e3` is played.
6. **Knight to an occupied square.** `Nde2` fails if the e2 pawn is still present. Use `Nc2`/`Nb3`/`Nf3`, or play `e3`/`e4` first.
7. **Move parity / turn order.** SAN arrays must alternate colours. A sequence ending with two same-colour moves is illegal. Confirm the last move's colour matches the expected side.
8. **Dangling `continuationIds` / `prerequisites`.** Every referenced ID must exist as a line `id`.
9. **Invalid `conceptIds`.** Only use IDs present in `data/concepts.json`.
10. **Mismatched `explanation` vs moves.** Prose must match the actual `sanMoves`.

---

## 6. Definition of Done (per project rules)

- [ ] All JSON validates (`node scripts/validate-curriculum.js` → ALL TESTS PASSED).
- [ ] Every line has a unique `id`.
- [ ] Documentation updated ([`ROADMAP.md`](ROADMAP.md)).
- [ ] Tests pass (note: `npx vitest run` is broken in this environment — `validate-curriculum.js` is the authoritative check).
- [ ] Roadmap updated (completion %, handoff).
- [ ] No placeholder content remains (no `TODO`, no fabricated theory).

---

## 7. Notes

- This skill supersedes the `create-opening-course` / `build-opening-tree` skills referenced in [`ROADMAP.md`](ROADMAP.md) §4, which were not yet implemented.
- Existing generators (`generate-english-opening.js`, `generate-london-system.js`, `generate-queens-gambit.js`, etc.) still inline their own `buildLine`/write loop; new openings should use this library instead. Do not retro-fit them unless asked.
