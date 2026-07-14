# Lotus Chess

Lotus Chess is a modern web application for studying chess openings and endgames through interactive practice, mastery ranks, and spaced repetition.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Firebase
- chess.js
- react-chessboard
- Stockfish WASM worker

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run test
npm run build
```

## Firebase

Add the following public environment variables when cloud sync is enabled:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```
