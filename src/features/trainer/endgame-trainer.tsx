"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, type Move, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Brain, CheckCircle2, RotateCcw, Lightbulb, XCircle, Sliders, PlayCircle } from "lucide-react";
import { getStockfishClient, type StockfishEvaluation } from "@/services/stockfish/client";
import { useBoardSettings } from "@/features/trainer/BoardSettingsContext";
import { useAuth } from "@/features/auth/AuthContext";
import { saveProgressRecord, getProgressRecord } from "@/services/db/progress";
import { calculateNextReview } from "@/services/learning/mastery";
import type { EndgameLesson } from "@/types/lotus";

interface EndgameTrainerProps {
  lesson: EndgameLesson;
}

type GameStatus = "playing" | "won" | "drawn" | "lost";
type FeedbackTone = "idle" | "success" | "error" | "info";

interface Feedback {
  tone: FeedbackTone;
  title: string;
  detail: string;
}

const feedbackStyles: Record<FeedbackTone, string> = {
  idle: "border-slate-500/20 bg-slate-500/10 text-slate-200",
  success: "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
  error: "border-rose-300/20 bg-rose-300/10 text-rose-100",
  info: "border-sky-300/20 bg-sky-300/10 text-sky-100",
};

/** Highlight colour tokens */
const HIGHLIGHT_SELECTED = { backgroundColor: "rgba(52, 211, 153, 0.35)" };
const HIGHLIGHT_TARGET = {
  background: "radial-gradient(circle, rgba(52,211,153,0.45) 20%, transparent 20%)",
  borderRadius: "50%",
};
const HIGHLIGHT_CAPTURE = {
  background: "radial-gradient(circle, transparent 50%, rgba(52,211,153,0.45) 50%)",
};

export function EndgameTrainer({ lesson }: EndgameTrainerProps) {
  // Use a state for the FEN to force game updates
  const [fen, setFen] = useState(lesson.fen);
  const game = useMemo(() => new Chess(fen), [fen]);
  
  const [status, setStatus] = useState<GameStatus>("playing");
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    tone: "idle",
    title: "Ready",
    detail: lesson.objective,
  });
  
  const [isEngineThinking, setIsEngineThinking] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const [hintMove, setHintMove] = useState<string | null>(null);
  
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const { user } = useAuth();
  const { highlightValidMoves, showNotation, clickToMove, toggleHighlightValidMoves, toggleShowNotation, toggleClickToMove } = useBoardSettings();

  // The user's side is the side to move in the initial FEN
  const initialSide = useMemo(() => new Chess(lesson.fen).turn(), [lesson.fen]);
  const userSideStr = initialSide === "w" ? "white" : "black";
  const isUserTurn = game.turn() === initialSide && status === "playing";

  // Check for game over
  useEffect(() => {
    if (status !== "playing") return;

    if (game.isCheckmate()) {
      if (game.turn() !== initialSide) {
        // Opponent is checkmated
        setStatus("won");
        setFeedback({ tone: "success", title: "Checkmate!", detail: "You have won the endgame." });
        saveProgress(true);
      } else {
        // User is checkmated
        setStatus("lost");
        setFeedback({ tone: "error", title: "Checkmate", detail: "You lost the endgame." });
        saveProgress(false);
      }
    } else if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
      setStatus("drawn");
      setFeedback({ tone: "error", title: "Draw", detail: "The endgame ended in a draw, which is a failure for this drill." });
      saveProgress(false);
    }
  }, [game, fen, status, initialSide]);

  // Engine's turn
  useEffect(() => {
    if (status !== "playing" || isUserTurn || isEngineThinking) return;

    const playEngineMove = async () => {
      setIsEngineThinking(true);
      setFeedback({ tone: "idle", title: "Engine is thinking...", detail: "Wait for the opponent." });
      
      try {
        const client = getStockfishClient();
        // Depth 15 is strong for endgames and fast in WASM
        const result = await client.analyzeFen(game.fen(), 15);
        
        if (result.bestMove) {
          const move = game.move(result.bestMove);
          setFen(game.fen());
          setFeedback({
            tone: "idle",
            title: `Engine played ${move.san}`,
            detail: "Your turn.",
          });
        }
      } catch (err) {
        console.error("Engine play error:", err);
        setFeedback({ tone: "error", title: "Engine Error", detail: "Could not fetch engine move." });
      } finally {
        setIsEngineThinking(false);
      }
    };

    playEngineMove();
  }, [isUserTurn, status, fen, game, isEngineThinking]);

  const saveProgress = (won: boolean) => {
    if (!user) return;
    
    // Calculate a performance score (0-5)
    // - Base score 5 for a win without hints or mistakes
    // - Lose 1 point for every mistake, 0.5 for every hint
    // - 0 if lost or drawn
    let score = won ? 5 : 0;
    if (won) {
      score -= mistakes;
      score -= (hintsUsed * 0.5);
      score = Math.max(1, Math.round(score));
    }
    
    getProgressRecord(user.uid, user.isGuest ?? false, lesson.id)
      .then((previousRecord) => {
         const record = calculateNextReview(
           previousRecord || { lessonId: lesson.id, lessonKind: "endgame" },
           score
         );
         // Override mistake count for endgame specific logic
         record.mistakeCount = (previousRecord?.mistakeCount ?? 0) + mistakes + (won ? 0 : 1);
         return saveProgressRecord(user.uid, user.isGuest ?? false, record);
      })
      .catch(console.error);
  };

  const executeMove = useCallback(
    (sourceSquare: string, targetSquare: string): boolean => {
      if (!isUserTurn) return false;

      const trial = new Chess(fen);
      let playedMove: Move | null = null;
      
      try {
        playedMove = trial.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      } catch {
        return false;
      }

      if (!playedMove) {
        setFeedback({ tone: "error", title: "Illegal move", detail: "You cannot move there." });
        return false;
      }

      setFen(trial.fen());
      setSelectedSquare(null);
      setHintMove(null);
      return true;
    },
    [fen, isUserTurn],
  );

  const handlePieceDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    setSelectedSquare(null);
    return executeMove(sourceSquare, targetSquare);
  };

  const handleSquareClick = ({ square, piece }: { square: string; piece: { pieceType: string } | null }) => {
    if (!clickToMove || !isUserTurn) return;

    const sq = square as Square;
    const userPrefix = initialSide;

    if (selectedSquare) {
      if (selectedSquare === sq) {
        setSelectedSquare(null);
        return;
      }
      if (piece && piece.pieceType.startsWith(userPrefix)) {
        setSelectedSquare(sq);
        return;
      }
      const success = executeMove(selectedSquare, sq);
      if (!success) {
        setSelectedSquare(null);
      }
      return;
    }

    if (piece && piece.pieceType.startsWith(userPrefix)) {
      setSelectedSquare(sq);
    }
  };

  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    // Hint highlighting
    if (hintMove) {
      const from = hintMove.substring(0, 2);
      const to = hintMove.substring(2, 4);
      styles[from] = { backgroundColor: "rgba(14, 165, 233, 0.4)" }; // sky-500
      styles[to] = { backgroundColor: "rgba(14, 165, 233, 0.4)" };
    }

    if (!selectedSquare || !highlightValidMoves || !clickToMove) return styles;

    styles[selectedSquare] = { ...styles[selectedSquare], ...HIGHLIGHT_SELECTED };

    const validMoves = game.moves({ square: selectedSquare, verbose: true });
    for (const move of validMoves) {
      const targetPiece = game.get(move.to as Square);
      styles[move.to] = targetPiece 
        ? { ...styles[move.to], ...HIGHLIGHT_CAPTURE }
        : { ...styles[move.to], ...HIGHLIGHT_TARGET };
    }

    return styles;
  }, [selectedSquare, highlightValidMoves, clickToMove, game, hintMove]);

  const handleGetHint = async () => {
    if (!isUserTurn) return;
    setIsHinting(true);
    
    try {
      const result = await getStockfishClient().analyzeFen(game.fen(), 12);
      if (result.bestMove) {
        setHintMove(result.bestMove);
        setHintsUsed(h => h + 1);
        setFeedback({ tone: "info", title: "Hint provided", detail: "Stockfish recommends this move." });
      }
    } catch (error) {
      setFeedback({ tone: "error", title: "Hint unavailable", detail: "Engine couldn't calculate a hint." });
    } finally {
      setIsHinting(false);
    }
  };

  const resetLesson = () => {
    setFen(lesson.fen);
    setStatus("playing");
    setMistakes(0);
    setHintsUsed(0);
    setHintMove(null);
    setSelectedSquare(null);
    setIsEngineThinking(false);
    setFeedback({ tone: "idle", title: "Ready", detail: lesson.objective });
  };

  return (
    <section aria-labelledby="endgame-heading" className="rounded-xl border border-white/10 bg-white/[0.045] p-5 lg:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">Endgame Drill</p>
          <h2 id="endgame-heading" className="text-xl font-semibold text-white">
            {lesson.name}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Settings Popup Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettingsPopup(!showSettingsPopup)}
              aria-label="Board settings"
              className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-slate-200 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <Sliders aria-hidden="true" className="size-4" />
            </button>

            {showSettingsPopup && (
              <div className="absolute right-0 top-12 z-20 w-64 rounded-xl border border-white/10 bg-[#0c1610]/95 p-4 shadow-xl backdrop-blur-md animate-fade-in">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-emerald-300">Board Settings</p>
                <div className="space-y-3">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Click-to-Move</span>
                    <button
                      onClick={toggleClickToMove}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${clickToMove ? "bg-emerald-400" : "bg-slate-600"}`}
                      role="switch"
                      aria-checked={clickToMove}
                    >
                      <span className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform ${clickToMove ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Highlight Valid Moves</span>
                    <button
                      onClick={toggleHighlightValidMoves}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${highlightValidMoves ? "bg-emerald-400" : "bg-slate-600"}`}
                      role="switch"
                      aria-checked={highlightValidMoves}
                    >
                      <span className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform ${highlightValidMoves ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </label>
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-xs text-slate-300 group-hover:text-white transition-colors">Board Notation</span>
                    <button
                      onClick={toggleShowNotation}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${showNotation ? "bg-emerald-400" : "bg-slate-600"}`}
                      role="switch"
                      aria-checked={showNotation}
                    >
                      <span className={`inline-block size-3.5 rounded-full bg-white shadow-sm transition-transform ${showNotation ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </label>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={resetLesson}
            aria-label="Reset drill"
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-slate-200 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleGetHint}
            disabled={!isUserTurn || isHinting}
            aria-label="Get a hint"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-amber-300/20 bg-amber-300/10 px-3 text-sm font-medium text-amber-200 transition hover:border-amber-300/40 hover:bg-amber-300/15 focus:outline-none focus:ring-2 focus:ring-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Lightbulb aria-hidden="true" className="size-4" />
            {isHinting ? "Thinking..." : "Hint"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(280px,520px)_1fr]">
        <div className="w-full max-w-[520px] justify-self-center xl:justify-self-start relative">
          <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-lg shadow-black/30">
            <Chessboard
              options={{
                id: "lotus-endgame-trainer",
                position: fen,
                boardOrientation: userSideStr,
                animationDurationInMs: 180,
                allowDrawingArrows: true,
                showNotation: showNotation,
                darkSquareStyle: { backgroundColor: "#446653" },
                lightSquareStyle: { backgroundColor: "#dbe7cf" },
                boardStyle: { width: "100%", height: "100%" },
                squareStyles: squareStyles,
                canDragPiece: ({ piece }) => piece.pieceType.startsWith(initialSide),
                onPieceDrop: handlePieceDrop,
                onSquareClick: handleSquareClick,
              }}
            />
          </div>
          
          {/* Overlay when not playing */}
          {status !== "playing" && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-sm animate-fade-in">
              <div className="text-center p-6 space-y-4">
                <div className={`mx-auto flex size-16 items-center justify-center rounded-full ${status === "won" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                  {status === "won" ? <CheckCircle2 className="size-8" /> : <XCircle className="size-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {status === "won" ? "Checkmate!" : status === "lost" ? "You lost." : "Draw."}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {status === "won" ? "You successfully completed the drill." : "Try again and learn from your mistakes."}
                  </p>
                </div>
                <button
                  onClick={resetLesson}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
                >
                  <RotateCcw className="size-4" />
                  Retry Drill
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl border p-4 ${feedbackStyles[feedback.tone]}`} role="status">
            <div className="mb-1 flex items-center gap-2">
              {feedback.tone === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-5" />
              ) : feedback.tone === "error" ? (
                <XCircle aria-hidden="true" className="size-5" />
              ) : feedback.tone === "info" ? (
                <Lightbulb aria-hidden="true" className="size-5" />
              ) : (
                <Brain aria-hidden="true" className="size-5" />
              )}
              <p className="font-semibold">{feedback.title}</p>
            </div>
            <p className="text-sm opacity-90">{feedback.detail}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Status</p>
              <p className="font-mono text-lg capitalize text-white">
                {status === "playing" ? (isUserTurn ? "Your turn" : "Engine thinking") : status}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Hints</p>
              <p className="font-mono text-lg text-white">{hintsUsed}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 space-y-4">
            <div>
              <h3 className="mb-1 text-sm font-semibold text-white">Objective</h3>
              <p className="text-sm text-slate-300">{lesson.objective}</p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-semibold text-white">Winning Method</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{lesson.winningMethod}</p>
            </div>
            
            {lesson.commonErrors.length > 0 && (
              <div>
                <h3 className="mb-2 text-xs uppercase tracking-wider font-semibold text-amber-300/80">Common Pitfalls</h3>
                <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                  {lesson.commonErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
             <div className="flex items-center gap-2 text-slate-300">
               <PlayCircle className="size-5 text-emerald-400" />
               <span className="text-sm font-medium text-white">Move History</span>
             </div>
             <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {game.history().length > 0 ? (
                  game.history().map((san, i) => (
                    <span key={i} className="font-mono text-slate-300 bg-black/30 px-2 py-1 rounded">
                      {i % 2 === 0 ? `${Math.floor(i / 2) + 1}. ` : ""}
                      {san}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic">No moves played yet.</span>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
