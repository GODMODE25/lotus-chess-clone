# Architecture Decision Records (ADR)

## ADR 001: UI Component Library Selection
**Date**: 2026-07-14
**Status**: Accepted
**Context**: We need a modern, accessible UI library compatible with Tailwind v4 and Next.js 16.
**Decision**: Use **shadcn v4 (Radix UI)**.
**Consequences**: Provides high-quality primitives with full control over styling via Tailwind. Requires manual installation of components via CLI.

## ADR 002: Data Visualization Strategy
**Date**: 2026-07-15
**Status**: Accepted
**Context**: The "Chess Lab" aesthetic requires technical charts for Elo and Motifs.
**Decision**: Use **recharts** with custom glassmorphic styling.
**Consequences**: Allows for flexible, responsive charts. Requires a wrapper component for theme synchronization.

## ADR 003: Interactive Repertoire Carousel
**Date**: 2026-07-15
**Status**: Accepted
**Context**: The user requested a "3 rotating cards" view for openings.
**Decision**: Use **framer-motion** for animations and **react-chessboard** for snapshots.
**Consequences**: Enables fluid, hardware-accelerated transitions and interactive drag gestures. 

## ADR 004: Opening Snapshots
**Date**: 2026-07-15
**Status**: Accepted
**Context**: Visualizing the opening before clicking.
**Decision**: Render the final position of the variation by processing moves through **chess.js**.
**Consequences**: Provides immediate visual context. Requires a utility to compute FEN from move history.

## ADR 005: Live Engine Performance Monitoring
**Date**: 2026-07-15
**Status**: Accepted
**Context**: "High-Tech Lab" requires real feedback from analytical engines.
**Decision**: Extend `StockfishClient` to expose depth, nodes, and NPS via a subscription model.
**Consequences**: Global system metrics (Header/Footer) now react in real-time to active engine calculations.

## ADR 006: Unified Navigation Component Architecture
**Date**: 2026-07-15
**Status**: Accepted
**Context**: We need a consistent visual language for selection across different application paths.
**Decision**: Standardize the 3-card focus carousel for both the Library and Openings Practice hubs.
**Consequences**: Ensures a cohesive "Command Center" aesthetic and reduces component fragmentation. Navigation is handled via an `onSelect` protocol.
