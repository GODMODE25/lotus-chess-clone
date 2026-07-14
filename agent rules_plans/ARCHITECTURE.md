# Architecture

## Stack

-   Next.js
-   TypeScript
-   Tailwind
-   shadcn/ui
-   Firebase Auth
-   Firestore
-   Firebase Storage
-   react-chessboard
-   chess.js
-   Stockfish WASM in Web Worker

## Folder Structure

/app /components /features /auth /openings /endgames /trainer /dashboard
/lib /firebase /hooks /types /public/data

## Firestore

users/ profiles/ preferences/ progress/ openingProgress/
endgameProgress/ studyHistory/ dailyReviews/ achievements/

## Static Assets

JSON, PGN and FEN files stored with the application.

## Engine Flow

User Move -\> chess.js validates -\> Stockfish evaluates -\> UI feedback
-\> Firestore updates progress.
