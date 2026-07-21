# Create Opening Course — Reference

## metadata.json fields

| Field | Notes |
|-------|-------|
| `id`, `slug` | Kebab-case, identical (e.g. `ruy-lopez`) |
| `ecoRange` | En-dash range: `C60–C99` (schema pattern) |
| `family` | `King Pawn`, `Queen Pawn`, `Flank`, etc. |
| `colour` | `white` or `black` |
| `popularity`, `difficulty` | Integer 1–5 |
| `description` | ≥20 chars, opening intro |
| `strategicOverview` | ≥20 chars, study-depth overview |
| `typicalPawnStructures` | ≥1 named structures |
| `commonTacticalThemes` | ≥1 themes |
| `modelPlayers` | GM associations (optional strings) |
| `recommendedStudyOrder` | Array of opening `id` strings |
| `baseMoves` | SAN trunk shared by all lines (e.g. `["e4","e5","Nf3","Nc6","Bc4"]`) |
| `masteryLevels` | Exactly 7 entries, levels 1–7 |

### masteryLevels entry template

```json
{
  "level": 1,
  "tier": "Beginner",
  "objectives": ["...", "...", "..."],
  "expectedKnowledge": "What the student can do after graduating this tier.",
  "averageMoveDepth": 8,
  "averageLineCount": 5,
  "xpReward": 50,
  "graduationRequirements": "Complete all beginner lines with fewer than 2 mistakes on average."
}
```

### Graduation requirement strings (match Italian Game)

| Tier | graduationRequirements |
|------|------------------------|
| Beginner | Complete all beginner lines with fewer than 2 mistakes on average. |
| Novice | Complete all novice lines with an accuracy rate of 70% or higher. |
| Intermediate | Complete all intermediate lines with an accuracy rate of 75% or higher. |
| Advanced | Complete all advanced lines with an accuracy rate of 80% or higher. |
| Expert | Complete all expert lines with an accuracy rate of 80% or higher. |
| Master | Complete all master lines with an accuracy rate of 85% or higher. |
| Legend | Complete all legend lines with an accuracy rate of 90% or higher. |

### Tier XP rewards (metadata)

| Tier | xpReward |
|------|----------|
| Beginner | 50 |
| Novice | 100 |
| Intermediate | 200 |
| Advanced | 350 |
| Expert | 500 |
| Master | 750 |
| Legend | 1000 |

## Per-line masteryXp defaults

| Tier | masteryXp per line |
|------|-------------------|
| Beginner | 10 |
| Novice | 20 |
| Intermediate | 40 |
| Advanced | 60 |
| Expert | 80 |
| Master | 100 |
| Legend | 120 |

## Line ID convention

Pattern: `{opening-slug}-{tier-kebab}-{descriptive-kebab}`

Examples from Italian Game:

- `italian-beginner-giuoco-pianissimo-main`
- `italian-novice-pianissimo-c3`
- `italian-advanced-fried-liver-main`

IDs must be globally unique across all openings and tiers.

## Concept IDs (existing)

Read [data/concepts.json](data/concepts.json) before authoring. Common IDs:

`development`, `central-control`, `castling`, `king-safety`, `piece-activity`, `open-files`, `semi-open-file`, `weak-squares`, `outpost`, `pawn-structure`, `isolated-queens-pawn`, `fianchetto`, `bishop-pair`, `pin`, `fork`, `discovered-attack`, `sacrifice`, `compensation`, `tempo`

Add new concepts to `concepts.json` only when no existing ID fits.

## Progression wiring

- **Beginner** lines: empty or minimal `prerequisites`; link forward via `continuationIds`.
- **Cross-tier**: end of Beginner line → first Novice line in same branch.
- **Within tier**: later lines may require earlier lines in that tier.
- Every ID in `prerequisites` and `continuationIds` must exist in the final export.

## Directory slug mapping

| Opening | colour | slug | folder |
|---------|--------|------|--------|
| Italian Game | white | italian-game | `data/openings/white/italian/` |
| Ruy Lopez | white | ruy-lopez | `data/openings/white/ruy-lopez/` |

Folder name may differ from slug (e.g. `italian` vs `italian-game`); `metadata.id` is authoritative.

## Post-export checklist

- [ ] All 8 JSON files present
- [ ] `node scripts/validate-curriculum.js` exits 0
- [ ] `npx vitest run tests/curriculum.test.ts` passes
- [ ] ROADMAP.md updated with completion and handoff notes
- [ ] (If app-visible) `src/content/openingsCurated.ts` imports added
