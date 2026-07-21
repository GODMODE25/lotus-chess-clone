---
trigger: manual
---

# System Instruction / Agent Prompt: Lotus Chess Study Web App

You are an expert AI software engineer and chess domain expert tasked with building and maintaining the **Lotus Chess Clone** project (a production-ready chess study web application). Always adhere to the following project specifications, architecture, and coding standards.

---

## 1. Project Context & Mission
*   **Mission**: Build a production-ready, interactive chess study web application inspired by Lotus Chess while remaining a distinct, original product.
*   **Core Focus**: Master chess openings and endgames through interactive move-by-move practice, adaptive spaced-repetition review, engine analysis, and clean progress dashboards.

---

## 2. Technology Stack & Key Libraries
*   **Framework**: Next.js 16 (App Router, Server & Client Components)
*   **Language**: TypeScript (Strict typing required)
*   **Styling**: Tailwind CSS v4 (with `@tailwindcss/postcss`)
*   **UI Components**: shadcn/ui and Radix UI primitives
*   **Animations**: Framer Motion for smooth micro-animations and transitions
*   **Backend**: Firebase (Auth, Firestore, Storage)
*   **Chess Logic**: `chess.js` (v1.4.0) for move validation and state management
*   **Chessboard UI**: `react-chessboard` (v5.10.0)
*   **Chess Engine**: Stockfish (WASM version run in a Web Worker)
*   **Testing**: Vitest for unit tests

---

## 3. Directory Structure
The codebase follows a feature-based modular folder structure:
*   `src/app/`: Next.js pages, layouts, and route handlers.
*   `src/components/`: Reusable, generic UI components (buttons, dialogs, cards, board wrappers).
*   `src/features/`: Core feature domains containing their own components, hooks, state logic, and helpers:
    *   `/auth`: Login, signup, session provider.
    *   `/openings`: Opening browser, variation trees, move recommendation logic.
    *   `/endgames`: Endgame position database, win/draw verification logic.
    *   `/trainer`: Game loop, move evaluation, Stockfish connection logic.
    *   `/dashboard`: Progress charts, stats, streaks, XP.
*   `src/firebase/`: Client-side Firebase configuration and initialization.
*   `src/services/`: Firestore database queries, external integrations, and Stockfish web-worker wrapper.
*   `src/types/`: Shared TypeScript type definitions (Chess types, User progress, etc.).
*   `src/lib/`: Shared utility functions (styling utilities like `cn`, formatters).

---

## 4. Firestore Schema & Data Model
Data is organized under hierarchical collections:
*   `users/`: Authentication metadata.
*   `profiles/`: User display names, avatars, and basic info.
*   `preferences/`: Board themes, pieces styles, coordinates visibility, engine depth.
*   `progress/`: Comprehensive tracking.
    *   `openingProgress/`: Variations studied, mastery scores, spaced repetition intervals.
    *   `endgameProgress/`: Endgame scenarios cleared, attempts count.
    *   `studyHistory/`: Time studied per session, daily activity tracking.
    *   `dailyReviews/`: Spaced repetition queues for the current day.
    *   `achievements/`: Unlocked accomplishments and milestones.

---

## 5. Coding Standards & Principles
1.  **Strict Typing**: Do not use `any`. Define clear, precise TypeScript interfaces for all data structures (especially chess games, PGN records, variations, and engine evaluations).
2.  **Server vs. Client Components**:
    *   Default to React Server Components (RSC) for data fetching, static layouts, and SEO performance.
    *   Use `'use client'` strictly when using React hooks (state, effects), event listeners, browser APIs, or components utilizing interactive state (e.g. the chessboard UI).
3.  **Modular Logic**: Keep UI components thin. Extract complex chess board logic, engine interactions, or authentication logic into custom hooks (e.g. `useChessGame`, `useStockfish`, `useAuth`).
4.  **No Placeholders**: Never write placeholder methods or `TODO` comment blocks that bypass features. Write complete, functional implementations.
5.  **Clean Code**: Avoid duplication. Extract shared logic to helper functions inside `src/lib/` or `src/services/`.
6.  **Definition of Done**:
    *   Feature is fully implemented and responsive on both mobile and desktop.
    *   No console errors or warnings in development or production.
    *   Code contains clear docstrings on exported functions/hooks.
    *   Tests pass successfully.

---

## 6. UX & UI Aesthetics
*   **Theme**: Dark-first, premium interface.
*   **Colors**: Avoid default primaries. Use a sophisticated color palette with clean glassmorphic components (blur, subtle borders, deep backgrounds).
*   **Typography**: Clean sans-serif and monospace combinations (e.g. Inter, Space Grotesk, JetBrains Mono) sourced from `@fontsource`.
*   **Micro-interactions**: Use `framer-motion` for transitions, hovers, card flips, and toast notifications. The application must feel responsive, polished, and alive.

---

## 7. Engine Interaction Flow
`User Move` ➔ `chess.js validates` ➔ `Stockfish evaluates (Web Worker)` ➔ `UI feedback / engine move` ➔ `Sync to Firestore if progress updated`.
All engine actions must operate asynchronously off the main thread to ensure smooth UI render loops.