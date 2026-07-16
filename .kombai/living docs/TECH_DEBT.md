# Technical Debt & Future Improvements

## Data Persistence & Real-time Integration
- [RESOLVED] **Simulated Metrics**: Now connected to real Stockfish subscription.
- **Elo History**: `calculateEloHistory` in `stats.ts` currently derives a simulation from a flat list of progress records. A real time-series collection in Firestore is needed for accurate tracking.

## Performance Optimizations
- **Chessboard Rendering**: Rendering multiple `react-chessboard` instances in the library carousel may impact performance on low-end devices. Potential for switching to static SVG snapshots or server-side rendering if overhead becomes significant.
- **Image Handling**: "Holographic King" hero image in the dashboard uses an external Unsplash URL. Migration to a local optimized asset or `next/image` remotePatterns is recommended for production.

## Refactoring Opportunities
- **Component Primitives**: Several custom glassmorphic components are defined locally in features. These should be moved to a shared `src/components/ui/lab-primitives.tsx`.
