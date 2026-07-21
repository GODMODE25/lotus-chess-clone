---
name: chess-trainer-builder
description: Guide the creation, validation, and enhancement of a browser-based interactive chess opening trainer modeled after Lotus Chess, with spaced repetition, rank progression, and local engine analysis.
---

# Chess Trainer Builder Skill

This skill governs the development and maintenance of the browser-based chess opening trainer app (OE Chess Lab), including curriculum design, interactive training states, spaced repetition algorithms, and local Stockfish integration.

---

## 1. Directory & File Structures

Ensure the project adheres to the following directory layout:

```text
/data
  ├── concepts.json                  # Shared strategic & tactical concepts
  ├── traps.json                     # Shared chess opening traps database
  └── openings/
      └── <side>/                    # 'white' or 'black'
          └── <opening_name>/
              ├── metadata.json      # Course info, ratings, rank goals
              ├── beginner.json      # Level 1 lines
              ├── novice.json        # Level 2 lines
              ├── intermediate.json  # Level 3 lines
              ├── advanced.json      # Level 4 lines
              ├── expert.json        # Level 5 lines
              ├── master.json        # Level 6 lines
              └── legend.json        # Level 7 lines
/schemas
  ├── opening.schema.json
  ├── variation.schema.json
  ├── concept.schema.json
  └── trap.schema.json
/scripts
  └── validate-curriculum.js         # Curriculum verification script
/tests
  └── curriculum.test.ts             # Vitest test suite
```

---

## 2. JSON Curriculum Specifications

### Opening Metadata Schema (`opening.schema.json`)
Every opening must specify its basic attributes and mastery graduation target:
- `id`: Unique string ID.
- `name`: Descriptive name (e.g. "Italian Game").
- `eco`: Standard ECO code.
- `side`: `"white"` or `"black"`.
- `difficulty`: 1 to 10 rating.
- `graduationAccuracy`: Target accuracy percentage (e.g., 75) required to progress.

### Variation Lines Schema (`variation.schema.json`)
Each variation in a tier file must have:
- `id`: Unique variation string.
- `name`: Variation name (e.g., "Giuoco Piano").
- `movesSan`: Array of SAN moves.
- `movesUci`: Array of corresponding UCI moves.
- `endingFen`: Valid target ending FEN of the line.
- `prerequisites`: IDs of lines that must be completed first.

---

## 3. Interactive Web Training Engine Rules

When modifying or implementing the trainer component (e.g. `opening-trainer.tsx`):

1. **Hiding Future Moves**: Ensure the user cannot see upcoming moves. Slice the rendered move list using `movesSan.slice(0, currentPly + 1)`.
2. **Move Prompt**: For the active move (`index === currentPly`), display a `?` symbol in the HUD/moves section to represent the hidden move.
3. **Opposition Play**: Once the user makes the correct move, animate it, automatically play the opponent's reply, and increment `currentPly` by 2.
4. **Incorrect Move**: Play a mistake sound, highlight the square red, display the correct move briefly, and mark the card as "Wrong" in the spaced repetition queue.
5. **No Explanations**: Do not display wordy annotations or positional guides *during* the drill; keep the interface zero-distraction.

---

## 4. Spaced Repetition System (SRS)

Use an SM-2 or FSRS implementation using LocalStorage (for guest session tracking) or Cloud Firestore (for authenticated users):
- **Card Fields**: `id`, `openingId`, `variationId`, `fen`, `expectedMove`, `easeFactor`, `intervalDays`, `dueDatetime`, `streak`, `mistakeCount`.
- **Review Strategy**: Mix due reviews with new lines up to the daily study limits.

---

## 5. Gamified Progression & Ranks

Implement progression boundaries based on the 7-tier mastery model:
- **Beginner**: Target depth 6–8 plies.
- **Novice**: Target depth 8–10 plies.
- **Intermediate**: Target depth 10–12 plies.
- **Advanced**: Target depth 12–14 plies.
- **Expert**: Target depth 14–16 plies.
- **Master**: Target depth 16–18 plies.
- **Legend**: Target depth 18–22+ plies.

### Progression Metrics
- **Daily Objectives**: Target $X$ new cards and $Y$ reviews daily.
- **Streaks**: Track consecutive active study days.
- **XP System**: Award study XP based on plies learned and accuracy levels achieved.

---

## 6. Stats & Performance Feedback

Aggregate performance markers locally or in Firestore:
- **Per Repertoire Stats**: Total active lines, mastered card counts, accuracy rates, and current max depth.
- **Global Overview**: Cumulative accuracy percentage, total coordinates trained, current overall rank badge, and streak counts.

---

## 7. UX & Interface Design Requirements

Maintain a premium, minimalist, dark-themed interface:
- **Drill Screen**: A large, centered board, basic prompt banner ("Make the move you learned"), and secondary buttons for "Analysis" and "Quit".
- **Dashboard**: Simple, interactive stats grid, study progression cards, review queues, and activity heatmaps.

