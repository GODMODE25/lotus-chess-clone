# Lotus Chess

A modern web application for studying chess openings and endgames through interactive practice, mastery ranks, and spaced repetition.

## Features

- **Interactive Practice**: Engage with chess openings and endgames through hands-on exercises
- **Mastery Ranks**: Track your progress with spaced repetition and mastery levels
- **Stockfish Integration**: Analyze positions using the powerful Stockfish chess engine (WASM worker)
- **Firebase Backend**: Real-time data synchronization and user progress tracking
- **Learning Library**: Access curated chess resources and educational content
- **Trainer Modules**: Endgame and opening trainers with customizable settings

## Architecture

Built with:
- Next.js App Router for efficient routing
- React components for modular UI
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Firebase for backend services
- chess.js and react-chessboard for chess logic

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Run Development Server**:
   ```bash
   npm run dev
   ```
3. **Access Application**:
   Open `http://localhost:3000` in your browser

## Usage

### For Beginners
- Start with the learning library to understand basic concepts
- Practice simple openings and endgames
- Use the trainer modules for guided sessions

### For Advanced Users
- Analyze complex positions with Stockfish
- Track progress through mastery ranks
- Contribute to the learning library

## Firebase Setup (for developers)
Add these environment variables when deploying:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

## Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m 'Add new feature'`) 
4. Push to branch (`git push origin feature/your-feature`)
5. Open a pull request
