import { Chess } from "chess.js";

/**
 * Calculates the final FEN string for a given opening variation.
 * @param moves - Array of moves in SAN format.
 * @returns The final FEN string after all moves are played.
 */
export function getFinalFen(moves: string[]): string {
  const game = new Chess();
  
  for (const move of moves) {
    try {
      game.move(move);
    } catch (e) {
      // If a move fails, we return the FEN reached so far
      console.warn(`ChessUtils: Invalid move sequence detected. Move "${move}" failed.`, e);
      break;
    }
  }
  
  return game.fen();
}
