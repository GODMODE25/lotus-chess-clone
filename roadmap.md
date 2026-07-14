# OE Chess Project Roadmap

This roadmap tracks all tasks and subtasks required to build the production-ready chess study web application. Use this file as a living document to check off tasks as they are completed.

---

## 📊 Overall Progress
- **Total Tasks:** 67
- **Completed:** 58
- **Remaining:** 9
- **Progress:** ~87% Complete

---

## 🗺️ Milestones & Tasks

### 1. Project Initialization & Setup
- [x] Create Next.js project structure with TypeScript
- [x] Configure Tailwind CSS (v4)
- [x] Install core chess libraries (`chess.js`, `react-chessboard`)
- [x] Set up Stockfish WASM files in public assets (`/public/stockfish`)
- [x] Define TypeScript interfaces for domain entities (`src/types/lotus.ts`)
- [x] Create base mock content data (`src/content/lotus.ts`)
- [x] Set up developer environment configurations
- [x] Establish linting and coding guidelines
- [x] Integrate `vitest` for automated testing
- [x] Rebrand "Lotus Chess" to "OE Chess" throughout the application (titles, copy, storage keys)

---

### 2. Firebase Configuration & Setup
- [x] Initialize Firebase App with the user-provided config literal in `src/firebase/client.ts`
  ```javascript
  const firebaseConfig = {
    apiKey: "AIzaSyCi8l8-VZzvMxxzoQ0rQ6micA7w-zJb3w4",
    authDomain: "oe-chess.firebaseapp.com",
    projectId: "oe-chess",
    storageBucket: "oe-chess.firebasestorage.app",
    messagingSenderId: "515596357247",
    appId: "1:515596357247:web:4319589eb4a916868db94a",
    measurementId: "G-4HRSMQD134"
  };
  ```
- [x] Configure Firebase Auth, Firestore, and Storage services
- [x] Implement local-fallback mode if Firebase credentials fail or run offline
- [ ] Set up basic Firestore schema collections (`users/`, `progress/`, `openingProgress/`, `endgameProgress/`)
- [ ] Define Firestore Security Rules for user data privacy

---

### 3. Authentication & User Sessions
- [x] Create dedicated authentication route/page (`/auth`)
- [x] Implement Auth Context (`AuthContext`) to manage user states globally
- [x] Design high-fidelity, modern sign-in / sign-up layouts (Email/Password & Google Sign-In)
- [x] Implement a "Guest / Local Demo" mode that bypasses auth and saves progress in LocalStorage
- [x] Build route guards to redirect unauthenticated users to `/auth` from private pages
- [x] Create profile layout with user details (avatar, name, registration date)

---

### 4. Dedicated Pages & Next.js Routing
*Requirement: All sections must reside on their own dedicated pages instead of anchor links on a single page.*
- [x] Create Dashboard Route (`/` or `/dashboard`)
- [x] Create Library Route (`/library`) for browsing openings and endgames
- [x] Separate openings and endgames practice/trainer into two distinct sections/routes: `/practice/openings` and `/practice/endgames`
- [x] Create Settings Route (`/settings`) for chessboard custom options and profile configurations
- [x] Change navigation panel from sidebar to top horizontal navbar
- [ ] Optimize transitions/animations during route changes

---

### 5. Premium UI Spacing & Standout Aesthetics
*Requirement: Properly space containers/divs from each other and content from container edges. Optimize for a premium visual feel.*
- [x] Define uniform spacing standards in `globals.css` (e.g., standard margins, gutters, container padding)
- [x] Apply elegant dark-mode styling with glassmorphism panels (`backdrop-blur`, subtle borders)
- [x] Implement Outfit/Inter typography across all components
- [x] Add smooth micro-animations on interactive elements (hover scales, transition eases)
- [x] Build beautiful card states with custom gradients and ambient drop shadows
- [x] Ensure full responsiveness and accessibility (A11y/ARIA) across mobile, tablet, and desktop viewports

---

### 6. Chessboard Settings & Interactivity
*Requirement: Add toggles for valid move highlights, notations on squares, and click-to-move input.*
- [x] Create a Settings context or store for user chessboard preferences
- [x] **Click-to-Move Interface:**
  - [x] Implement square selection state when a piece is clicked
  - [x] Generate moves lists for the clicked piece using `chess.js`
  - [x] Allow moving by clicking a destination square
- [x] **Move Highlighting:**
  - [x] Toggle highlight valid moves when a piece is clicked
  - [x] Render custom highlight indicators on destination squares (e.g., dot or border pulse)
- [x] **Coordinate Board Notation:**
  - [x] Toggle displaying files/ranks notation directly inside/on the corner of each board square
- [x] Add a quick-access settings popup overlay directly next to the board

---

### 7. Opening Trainer Page & Repertoire Leveling
- [x] Create openings database and leveling generator (`src/content/openingsData.ts`)
- [x] Build dual-row landing page (`/practice/openings/page.tsx`) with top row (10 White openings) and bottom row (10 Black openings)
- [x] Implement dynamic repertoire dashboard page (`/practice/openings/[id]/page.tsx`)
- [x] Load up to 850 lines per repertoire split across 7 mastery levels (Beginner, Novice, etc.)
- [x] Support practicing individual lines with the theory trainer and automatic deviation detection
- [x] Connect Opening Trainer to Firestore database to persist progress and calculate real dashboard stats (removing mock data)
- [x] Save metrics per variation (completed repetitions, mistake counts, accuracy score)
- [x] Add "Variations" subsection in openings view containing all user-generated/saved variations

---

### 8. Endgame Trainer Page & Categorized Hub
- [x] Create categorized endgame landing page (`/practice/endgames/page.tsx`) based on "chess endgame training"
- [x] Build dynamic endgame training route (`/practice/endgames/[id]/page.tsx`) to run Stockfish engine opponent
- [x] Implement a **Hint System** (querying Stockfish for the best move in the current FEN)
- [x] Code endgame success/failure verification rules (e.g. Checkmate reached, draw agreed, or turn limit exceeded)

---

### 9. Spaced Repetition (SRM) & Adaptive Review Queue
- [x] Implement review logic using SuperMemo-2 or confidence-based calculation (`src/services/learning/mastery.ts`)
- [x] Query Firestore for "Due now" variations and endgames based on next review dates
- [x] Design a "Review Queue" panel on the dashboard with daily review reminders
- [x] Automatically advance mastery ranks (Beginner -> Novice -> ... -> Legend) based on success rate

---

### 10. Search & Filter System
- [x] Design search bar UI on `/library`
- [x] Implement real-time client-side search for openings/endgames
- [x] Add filtering chips (by ECO, Side, Difficulty, Category)
- [x] Allow searching by tactical motifs or concepts (e.g., "f7 pressure", "opposition")

---

### 11. Admin Content & Curation Tools
- [ ] Create administrative route/view (`/admin`) guarded by admin permissions
- [ ] Implement form to import PGN strings or FEN setups
- [ ] Auto-parse PGN into move lists, variation names, and ECO codes using `chess.js`
- [ ] Save newly curated openings and endgames straight to Firebase Firestore

---

### 12. Testing, Polish & Deployment
- [x] Write unit tests for core helpers in `src/services/learning/mastery.ts`
- [ ] Validate Stockfish worker performance in production builds
- [ ] Conduct layout verification on mobile devices
- [x] Fix any React hook dependency warnings and Next.js compile errors
- [ ] Deploy the web app (Vercel / Firebase Hosting)
