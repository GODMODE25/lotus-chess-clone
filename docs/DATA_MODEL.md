# Opening Curriculum Database Schema & Data Model

This document outlines the architecture, schemas, and metadata structure for the modular JSON curriculum database implemented in the application.

---

## 1. Schema Specifications

The curriculum is structured into four main components, each validated by a corresponding JSON schema:

1. **Opening Metadata (`schemas/opening.schema.json`)**: Contains opening-wide metadata, popularity/difficulty ratings, strategic overviews, model players, and mastery requirements.
2. **Variation / Repertoire Lines (`schemas/variation.schema.json`)**: Contains training lines grouped by mastery tier, defining correct SAN/UCI move paths, ending FEN, and strategic explanations.
3. **Concepts (`schemas/concept.schema.json`)**: A database of shared chess concepts (e.g., Development, IQP, Fianchetto) referenced by lines.
4. **Traps (`schemas/trap.schema.json`)**: A database of typical mistakes, traps, and refutations arising in these openings.

---

## 2. Directory Structure

```text
/data
  ├── concepts.json                  # Shared strategic & tactical concepts
  ├── traps.json                     # Shared chess opening traps database
  └── openings/
      └── white/
          └── italian/
              ├── metadata.json      # Top-level Italian Game metadata
              ├── beginner.json      # Tier 1 curriculum lines
              ├── novice.json        # Tier 2 curriculum lines
              ├── intermediate.json  # Tier 3 curriculum lines
              ├── advanced.json      # Tier 4 curriculum lines
              ├── expert.json        # Tier 5 curriculum lines
              ├── master.json        # Tier 6 curriculum lines
              └── legend.json        # Tier 7 curriculum lines
```

---

## 3. Mastery Levels Definition

The curriculum uses a 7-tier mastery model:

| Level | Tier | Target Depth | Average Line Count | Focus / Objectives |
| :---: | :--- | :---: | :---: | :--- |
| 1 | **Beginner** | 6–8 plies | 5 | Foundational starting moves, basic development motifs. |
| 2 | **Novice** | 8–10 plies | 8 | Main response recognition, basic central breaks. |
| 3 | **Intermediate** | 10–12 plies | 10 | Primary variations, handling basic pawn tension. |
| 4 | **Advanced** | 12–14 plies | 12 | Sharp complications (gambits, counterattacks). |
| 5 | **Expert** | 14–16 plies | 12 | Dynamic pawn sacrifices, strategic compensation. |
| 6 | **Master** | 16–18 plies | 10 | Slow positional maneuvering, modern grandmaster lines. |
| 7 | **Legend** | 18–22+ plies | 10 | Endgames, rare sidelines, transpositions. |

---

## 4. Spaced Repetition Integration

Curriculum lines integrate directly with the application's spaced repetition system:
- **`reviewPriority`**: 1 (low review frequency) to 5 (critical lines).
- **`estimatedStudyMinutes`**: Estimated time investment to study/master.
- **`prerequisites`**: A list of line IDs that must be completed before starting a line.
- **`continuationIds`**: Direct links to deeper lines to facilitate progression.
