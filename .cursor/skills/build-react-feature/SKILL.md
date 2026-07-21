---
name: build-react-feature
description: Builds Next.js React features with components, hooks, Vitest tests, and documentation following Lotus Chess architecture. Use when adding UI features, creating components or hooks, wiring pages, writing frontend tests, or when the user mentions build react feature, new screen, dashboard panel, library UI, or trainer UI.
---

# Build React Feature

Ship a complete feature slice: UI components, hooks, tests, and docs. Keep pages thin; put behavior in `services/` and presentation in `features/`.

## Input

| Field | Example |
|-------|---------|
| Feature name | Review queue panel, repertoire filter |
| Domain | `library`, `dashboard`, `trainer`, `auth` |
| Route (if new page) | `/library`, `/practice/openings/[id]` |
| Data sources | Static content, Firebase progress, learning services |

Confirm whether the feature reads **static content**, **user progress**, or **both** before wiring data.

## Output

```
src/features/{domain}/
├── {feature-name}.tsx        # Presentational or container component
├── use{Feature}.ts             # Data/state hook (if needed)
└── {feature-name}.test.ts    # Tests for hook logic or extracted pure helpers

src/app/(dashboard)/{route}/page.tsx   # Thin page shell (when adding a route)
```

Update [ROADMAP.md](ROADMAP.md) when the feature completes a roadmap item.

## Hard Rules

- **Layer separation**: Pages compose; `features/` render; `services/` compute; `content/` and `data/` stay static.
- **Firebase stores user data only** — never embed progress or SRS fields in static JSON.
- **UI stays independent from SRS** — drill/trainer screens stay minimal; no move explanations during drills.
- **Chess logic** uses `chess.js` via `src/lib/chess-utils.ts`; do not duplicate move validation in components.
- **Stockfish** lives in `src/services/stockfish/` — never inline engine calls inside drill UI.
- **One learning objective per screen** — split crowded flows into focused components.
- **Progress bars per opening are mandatory** where repertoire progress is shown.
- Minimize scope: match existing naming, Tailwind tokens, and file layout before inventing abstractions.

## Workflow

Copy this checklist and track progress:

```
Task Progress:
- [ ] Step 1: Scope the feature
- [ ] Step 2: Define types
- [ ] Step 3: Implement services/helpers
- [ ] Step 4: Build hook
- [ ] Step 5: Build components
- [ ] Step 6: Wire page/route
- [ ] Step 7: Write tests
- [ ] Step 8: Validate and document
```

### Step 1: Scope the feature

1. Read neighboring files in `src/features/{domain}/` and the target page under `src/app/`.
2. List props, loading/error/empty states, and which data is static vs user-specific.
3. Decide: new component only, hook + component, or new route.

### Step 2: Define types

1. Add shared types to [src/types/lotus.ts](src/types/lotus.ts) when reused across features.
2. Keep component-only props as `interface {Name}Props` in the component file.
3. Import types with `import type { ... }`.

### Step 3: Implement services/helpers

1. Put deterministic logic in `src/services/{area}/` (e.g. `learning/`, `db/`).
2. Extract mappers, filters, and calculators from components — components should not own business rules.
3. Reuse existing helpers (`progression.ts`, `stats.ts`, `progress.ts`) before adding new ones.

### Step 4: Build hook

Create `use{Feature}.ts` in the feature folder when the component needs async data, auth, or shared state.

```typescript
export function useReviewQueue() {
  const { user, loading } = useAuth();
  const [queue, setQueue] = useState<ReviewItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => { /* fetch + map */ }, [user, loading]);

  useEffect(() => { refresh(); }, [refresh]);

  return { queue, isLoading, refresh };
}
```

Hook conventions:
- Return `{ data, isLoading, refresh }` (or domain-specific names).
- Guard on `useAuth()` loading and missing `user`.
- Keep pure mapping in private functions at the bottom of the hook file.

### Step 5: Build components

Reference: [src/features/library/opening-card.tsx](src/features/library/opening-card.tsx), [src/features/dashboard/ReviewQueuePanel.tsx](src/features/dashboard/ReviewQueuePanel.tsx)

1. Add `"use client"` when using hooks, events, or browser APIs.
2. Named export: `export function FeatureName(...)`.
3. Filename: kebab-case (`opening-card.tsx`); PascalCase only when matching an existing file in the folder.
4. Styling: Tailwind + existing tokens (`glass-panel`, `corner-accent`, `font-space`, `font-mono`). Use `cn()` from [src/lib/utils.ts](src/lib/utils.ts) for conditional classes.
5. Icons: `lucide-react`. Motion: `framer-motion` only when interaction benefits (carousels, layout transitions).
6. Handle all four states: **loading** (skeleton), **empty**, **error** (log + friendly fallback), **success**.

### Step 6: Wire page/route

Pages stay thin — header copy + one feature component.

Reference: [src/app/(dashboard)/library/page.tsx](src/app/(dashboard)/library/page.tsx)

```tsx
"use client";

import { FeaturePanel } from "@/features/{domain}/{feature-name}";

export default function FeaturePage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-2">{/* page title + description */}</section>
      <FeaturePanel />
    </div>
  );
}
```

Register navigation links in [src/app/(dashboard)/layout.tsx](src/app/(dashboard)/layout.tsx) when adding a top-level route.

### Step 7: Write tests

Reference: [src/services/learning/progression.test.ts](src/services/learning/progression.test.ts)

1. **Prefer testing pure logic** in `services/` — co-locate as `{name}.test.ts`.
2. For hook-heavy UI, extract mappers/selectors into testable functions rather than mounting React trees (project uses Vitest `node` environment; no RTL yet).
3. Use factory helpers (`makeRecord`, `makeLine`) for readable fixtures.
4. Run: `npx vitest run src/path/to/feature.test.ts`

Add component tests only when the team introduces `@testing-library/react` — do not add new test dependencies without approval.

### Step 8: Validate and document

1. Lint: `npm run lint`
2. Tests: `npm run test` (or targeted vitest path)
3. Manual smoke: page loads, auth gate works, empty and populated states render
4. Update [ROADMAP.md](ROADMAP.md):
   - Mark completed checkboxes
   - Record created/modified files
   - Add **Handoff to Next Agent** section

Component JSDoc: one line on exported components when purpose is non-obvious. No inline move commentary on drill screens.

## Definition of Done

- [ ] Types defined; no `any` without justification
- [ ] Static content and user progress are not mixed
- [ ] Component handles loading, empty, error, and success states
- [ ] Business logic lives in `services/`, not JSX
- [ ] Tests cover new pure logic; `vitest run` passes
- [ ] `npm run lint` passes
- [ ] ROADMAP.md updated if the feature maps to roadmap work

## Additional Resources

- File layout, naming, and UI tokens: [reference.md](reference.md)
