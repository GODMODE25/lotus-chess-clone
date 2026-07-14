"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, type Move, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Brain, CheckCircle2, RotateCcw, Search, XCircle, Sliders } from "lucide-react";
import { getStockfishClient, type StockfishEvaluation } from "@/services/stockfish/client";
import { useBoardSettings } from "@/features/trainer/BoardSettingsContext";
import { useAuth } from "@/features/auth/AuthContext";
import { saveProgressRecord, getProgressRecord, saveCustomVariation } from "@/services/db/progress";
import { calculateNextReview } from "@/services/learning/mastery";
import type { OpeningVariation } from "@/types/lotus";

interface OpeningTrainerProps {
  lesson: OpeningVariation;
}

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
  info: "border-amber-300/20 bg-amber-300/10 text-amber-100",
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

export function OpeningTrainer({ lesson }: OpeningTrainerProps) {
  const [currentPly, setCurrentPly] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    tone: "idle",
    title: "Ready",
    detail: lesson.pgn,
  });
  const [analysis, setAnalysis] = useState<StockfishEvaluation | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  // Custom Variation States
  const [fen, setFen] = useState(new Chess().fen());
  const [playedMoves, setPlayedMoves] = useState<string[]>([]);
  const [isDeviated, setIsDeviated] = useState(false);
  const [customVariationName, setCustomVariationName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const [isEngineThinking, setIsEngineThinking] = useState(false);

  const { user } = useAuth();
  const { highlightValidMoves, showNotation, clickToMove, toggleHighlightValidMoves, toggleShowNotation, toggleClickToMove } = useBoardSettings();

  const game = useMemo(() => new Chess(fen), [fen]);
  const expectedSan = lesson.movesSan[currentPly] ?? null;
  const isFinished = currentPly >= lesson.movesSan.length;
  const trainerTurn = game.turn() === "w" ? "white" : "black";
  const isUserTurn = isDeviated
    ? trainerTurn === lesson.side && !game.isGameOver()
    : trainerTurn === lesson.side && !isFinished;

  // Reset logic when variation changes
  const resetLesson = useCallback(() => {
    setCurrentPly(0);
    setMistakes(0);
    setAnalysis(null);
    setSelectedSquare(null);
    setIsDeviated(false);
    setPlayedMoves([]);
    setCustomVariationName("");
    setIsSaveSuccess(false);
    setIsEngineThinking(false);
    setFen(new Chess().fen());
    setFeedback({
      tone: "idle",
      title: "Ready",
      detail: lesson.pgn,
    });
  }, [lesson]);

  useEffect(() => {
    resetLesson();
  }, [lesson.id, resetLesson]);

  // Checkmate / Draw detection in deviated mode
  useEffect(() => {
    if (!isDeviated) return;
    if (game.isCheckmate()) {
      const winner = game.turn() === (lesson.side === "white" ? "b" : "w") ? "User" : "Engine";
      setFeedback({
        tone: "success",
        title: "Checkmate!",
        detail: winner === "User" ? "You checkmated the engine!" : "The engine checkmated you.",
      });
    } else if (game.isGameOver()) {
      setFeedback({
        tone: "info",
        title: "Game Over",
        detail: "The game ended in a draw or stalemate.",
      });
    }
  }, [isDeviated, fen, game, lesson.side]);

  // Auto-play opponent's moves (Theory Mode)
  useEffect(() => {
    if (isDeviated || isFinished || isUserTurn) {
      return;
    }

    const reply = window.setTimeout(() => {
      const replySan = lesson.movesSan[currentPly];
      const trial = new Chess(game.fen());
      try {
        const move = trial.move(replySan);
        setFen(trial.fen());
        setPlayedMoves((prev) => [...prev, move.san]);
        setCurrentPly((ply) => ply + 1);
        setSelectedSquare(null);
        setFeedback({
          tone: "idle",
          title: `Theory reply: ${replySan}`,
          detail: "The line is still on track.",
        });
      } catch (err) {
        console.error("Theory play error:", err);
      }
    }, 550);

    return () => window.clearTimeout(reply);
  }, [currentPly, isFinished, isUserTurn, lesson.movesSan, isDeviated, game]);

  // Engine auto-reply (Deviated/Custom Mode)
  useEffect(() => {
    if (!isDeviated || isUserTurn || game.isGameOver() || isEngineThinking) {
      return;
    }

    const playEngineMove = async () => {
      setIsEngineThinking(true);
      setFeedback({
        tone: "idle",
        title: "Engine is thinking...",
        detail: "Stockfish is calculating the best theoretical reply.",
      });

      try {
        const client = getStockfishClient();
        // Depth 12 is fast and solid for openings continuations
        const result = await client.analyzeFen(game.fen(), 12);

        if (result.bestMove) {
          const trial = new Chess(game.fen());
          const move = trial.move(result.bestMove);
          setFen(trial.fen());
          setPlayedMoves((prev) => [...prev, move.san]);
          setFeedback({
            tone: "idle",
            title: `Engine played ${move.san}`,
            detail: "Your turn. Continue exploring this variation.",
          });
        }
      } catch (err) {
        console.error("Engine calculation failed:", err);
        setFeedback({
          tone: "error",
          title: "Engine Offline",
          detail: "Stockfish was unable to respond. You can still make moves.",
        });
      } finally {
        setIsEngineThinking(false);
      }
    };

    const reply = window.setTimeout(playEngineMove, 600);
    return () => window.clearTimeout(reply);
  }, [isDeviated, isUserTurn, game, isEngineThinking]);

  /** Validate and execute a move from source to target. Shared by drag-drop and click-to-move. */
  const executeMove = useCallback(
    (sourceSquare: string, targetSquare: string): boolean => {
      if (game.isGameOver()) return false;

      const trial = new Chess(game.fen());
      let playedMove: Move | null = null;
      try {
        playedMove = trial.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
      } catch {
        return false;
      }

      if (!playedMove) {
        setFeedback({
          tone: "error",
          title: "Illegal move",
          detail: "chess.js rejected that move in this position.",
        });
        return false;
      }

      // If we are already deviated, just play it
      if (isDeviated) {
        setFen(trial.fen());
        setPlayedMoves((prev) => [...prev, playedMove!.san]);
        setFeedback({
          tone: "success",
          title: `Played ${playedMove.san}`,
          detail: "Wait for engine reply.",
        });
        setSelectedSquare(null);
        return true;
      }

      // In theory mode, check if the move matches theory
      if (!expectedSan) {
        // End of theory line -> trigger deviation/continuation
        setIsDeviated(true);
        setFen(trial.fen());
        setPlayedMoves((prev) => [...prev, playedMove!.san]);
        setFeedback({
          tone: "success",
          title: `Played ${playedMove.san} (re repertoire end)`,
          detail: "You reached the end of the standard theory line. Engine has taken over.",
        });
        setSelectedSquare(null);
        return true;
      }

      const expectedMove = expectedMoveFromPosition(game.fen(), expectedSan);
      const isCorrect =
        expectedMove?.from === playedMove.from &&
        expectedMove.to === playedMove.to &&
        (expectedMove.promotion ?? "") === (playedMove.promotion ?? "");

      if (!isCorrect) {
        // User strayed! Show deviation banner and allow the move
        setIsDeviated(true);
        setFen(trial.fen());
        setPlayedMoves((prev) => [...prev, playedMove!.san]);
        setFeedback({
          tone: "info",
          title: `Strayed with ${playedMove.san}`,
          detail: "You deviated from standard repertoire. Save this variation or continue playing.",
        });
        setSelectedSquare(null);
        return true;
      }

      // Correct theory move
      const nextPly = currentPly + 1;
      const isLineComplete = nextPly >= lesson.movesSan.length;

      setFen(trial.fen());
      setPlayedMoves((prev) => [...prev, playedMove!.san]);
      setCurrentPly(nextPly);
      setAnalysis(null);
      setSelectedSquare(null);

      if (isLineComplete && user) {
        // Evaluate score out of 5 based on mistakes
        const score = mistakes === 0 ? 5 : mistakes === 1 ? 4 : mistakes <= 3 ? 3 : 2;
        
        getProgressRecord(user.uid, user.isGuest ?? false, lesson.id)
          .then((previousRecord) => {
             const record = calculateNextReview(
               previousRecord || { lessonId: lesson.id, lessonKind: "opening" },
               score
             );
             return saveProgressRecord(user.uid, user.isGuest ?? false, record);
          })
          .catch(console.error);
      }

      setFeedback({
        tone: "success",
        title: `${playedMove.san} is correct`,
        detail: isLineComplete ? "Line complete. Progress saved." : "Continue the line.",
      });

      return true;
    },
    [game, expectedSan, currentPly, lesson.movesSan.length, isDeviated, user, lesson.id, mistakes],
  );

  const handleSaveCustomVariation = async () => {
    if (!user) return;
    if (!customVariationName.trim()) {
      setFeedback({
        tone: "error",
        title: "Name Required",
        detail: "Please type a name for your custom variation.",
      });
      return;
    }

    setIsSaving(true);
    try {
      const customVar: OpeningVariation = {
        id: `custom_${Date.now()}`,
        opening: lesson.opening,
        variation: customVariationName.trim(),
        category: lesson.category,
        side: lesson.side,
        eco: lesson.eco || "N/A",
        difficulty: 3,
        overview: `Custom variation starting from ${lesson.opening} line.`,
        keyIdeas: ["User saved variation line"],
        movesSan: playedMoves,
        pgn: playedMoves.join(" "),
        concepts: [],
        commonMistakes: [],
        tacticalMotifs: [],
        modelGames: [],
        isCustom: true,
        parentId: lesson.id,
      };

      await saveCustomVariation(user.uid, user.isGuest ?? false, customVar);
      setIsSaveSuccess(true);
      setFeedback({
        tone: "success",
        title: "Variation Saved",
        detail: `Saved "${customVariationName}" successfully.`,
      });
    } catch (err) {
      console.error(err);
      setFeedback({
        tone: "error",
        title: "Save Failed",
        detail: "Failed to persist your variation.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  /** Drag-and-drop handler */
  const handlePieceDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    setSelectedSquare(null);
    return executeMove(sourceSquare, targetSquare);
  };

  /** Click-to-move handler */
  const handleSquareClick = ({ square, piece }: { square: string; piece: { pieceType: string } | null }) => {
    if (!clickToMove || !isUserTurn) return;

    const sq = square as Square;
    const userPrefix = lesson.side === "white" ? "w" : "b";

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

  /** Build per-square highlight styles */
  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};

    if (!selectedSquare || !highlightValidMoves || !clickToMove) return styles;

    styles[selectedSquare] = HIGHLIGHT_SELECTED;

    const validMoves = game.moves({ square: selectedSquare, verbose: true });
    for (const move of validMoves) {
      const targetPiece = game.get(move.to as Square);
      styles[move.to] = targetPiece ? HIGHLIGHT_CAPTURE : HIGHLIGHT_TARGET;
    }

    return styles;
  }, [selectedSquare, highlightValidMoves, clickToMove, game]);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const result = await getStockfishClient().analyzeFen(game.fen(), 10);
      setAnalysis(result);
    } catch (error) {
      setFeedback({
        tone: "error",
        title: "Analysis unavailable",
        detail: error instanceof Error ? error.message : "Stockfish could not analyze this position.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section aria-labelledby="trainer-heading" className="rounded-xl border border-white/10 bg-white/[0.045] p-5 lg:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">Practice openings</p>
          <h2 id="trainer-heading" className="text-xl font-semibold text-white">
            {lesson.opening}: {lesson.variation} {lesson.isCustom && <span className="ml-2 text-xs rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 font-bold uppercase">Custom</span>}
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
            aria-label="Reset lesson"
            className="inline-flex size-10 items-center justify-center rounded-md border border-white/10 text-slate-200 transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          >
            <RotateCcw aria-hidden="true" className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            aria-label="Analyze current position"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-sky-300/20 bg-sky-300/10 px-3 text-sm font-medium text-sky-100 transition hover:border-sky-300/40 hover:bg-sky-300/15 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-wait disabled:opacity-70"
          >
            <Search aria-hidden="true" className="size-4" />
            {isAnalyzing ? "Analyzing" : "Analyze"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(280px,520px)_1fr]">
        <div className="w-full max-w-[520px] justify-self-center xl:justify-self-start">
          <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-950 shadow-lg shadow-black/30">
            <Chessboard
              options={{
                id: "oe-opening-trainer",
                position: fen,
                boardOrientation: lesson.side,
                animationDurationInMs: 180,
                allowDrawingArrows: true,
                showNotation: showNotation,
                darkSquareStyle: { backgroundColor: "#446653" },
                lightSquareStyle: { backgroundColor: "#dbe7cf" },
                boardStyle: { width: "100%", height: "100%" },
                squareStyles: squareStyles,
                canDragPiece: ({ piece }) => piece.pieceType.startsWith(lesson.side === "white" ? "w" : "b"),
                onPieceDrop: handlePieceDrop,
                onSquareClick: handleSquareClick,
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className={`rounded-xl border p-4 ${feedbackStyles[feedback.tone]}`} role="status">
            <div className="mb-1 flex items-center gap-2">
              {feedback.tone === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-5" />
              ) : feedback.tone === "error" ? (
                <XCircle aria-hidden="true" className="size-5" />
              ) : (
                <Brain aria-hidden="true" className="size-5" />
              )}
              <p className="font-semibold">{feedback.title}</p>
            </div>
            <p className="text-sm opacity-90">{feedback.detail}</p>
          </div>

          {/* Deviation / Custom save variation block */}
          {isDeviated && (
            <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 animate-slide-up flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Save Custom Variation</h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  You strayed from repertoire. You can save this line as a custom variation.
                </p>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                {isSaving ? (
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    <div className="size-3 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
                    Saving
                  </div>
                ) : isSaveSuccess ? (
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    <CheckCircle2 className="size-3.5" />
                    Saved!
                  </div>
                ) : (
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <input
                      type="text"
                      value={customVariationName}
                      onChange={(e) => setCustomVariationName(e.target.value)}
                      placeholder="e.g. My Custom Line"
                      className="rounded border border-white/10 bg-slate-950/80 px-2 py-1 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 w-full sm:w-36"
                    />
                    <button
                      onClick={handleSaveCustomVariation}
                      className="rounded bg-amber-400/10 hover:bg-amber-400/20 text-amber-300 border border-amber-400/20 px-2.5 py-1 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Moves</p>
              <p className="font-mono text-lg text-white">
                {isDeviated ? playedMoves.length : `${Math.min(currentPly, lesson.movesSan.length)}/${lesson.movesSan.length}`}
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Side</p>
              <p className="font-mono text-lg capitalize text-white">{trainerTurn}</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Misses</p>
              <p className="font-mono text-lg text-white">{mistakes}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">
              {isDeviated ? "Custom Variation Path" : "Theory Line"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isDeviated ? playedMoves : lesson.movesSan).map((move, index) => (
                <span
                  key={`${move}-${index}`}
                  className={`rounded-md border px-2.5 py-1.5 font-mono text-xs transition-colors ${
                    isDeviated || index < currentPly
                      ? "border-emerald-300/25 bg-emerald-300/10 text-emerald-100"
                      : index === currentPly
                        ? "border-sky-300/25 bg-sky-300/10 text-sky-100"
                        : "border-white/10 text-slate-400"
                  }`}
                >
                  {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ` : ""}
                  {move}
                </span>
              ))}
              {isDeviated && !game.isGameOver() && (
                <span className="rounded-md border border-dashed border-amber-400/20 bg-amber-400/5 px-2.5 py-1.5 font-mono text-xs text-amber-300 animate-pulse">
                  + Engine reply
                </span>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-3 text-sm font-semibold text-white">Stockfish Analysis</h3>
            {analysis ? (
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  Best move: <span className="font-mono text-white">{analysis.bestMove ?? "..."}</span>
                </p>
                <p>
                  Eval: <span className="font-mono text-white">{formatEvaluation(analysis)}</span>
                </p>
                <p className="break-words">
                  PV: <span className="font-mono text-slate-200">{analysis.principalVariation.join(" ") || "..."}</span>
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">Depth 10 engine check is ready for this position.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function expectedMoveFromPosition(fen: string, san: string): Move | null {
  try {
    const game = new Chess(fen);
    return game.move(san);
  } catch {
    return null;
  }
}

function formatEvaluation(analysis: StockfishEvaluation): string {
  if (analysis.mate !== null) {
    return `M${analysis.mate}`;
  }

  if (analysis.centipawns !== null) {
    return `${(analysis.centipawns / 100).toFixed(2)}`;
  }

  return "pending";
}
