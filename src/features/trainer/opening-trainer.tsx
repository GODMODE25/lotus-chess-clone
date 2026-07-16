"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, type Move, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Brain, CheckCircle2, RotateCcw, Search, XCircle, Sliders, Activity, Cpu } from "lucide-react";
import { getStockfishClient, type StockfishEvaluation } from "@/services/stockfish/client";
import { useBoardSettings } from "@/features/trainer/BoardSettingsContext";
import { useAuth } from "@/features/auth/AuthContext";
import { saveProgressRecord, getProgressRecord, saveCustomVariation } from "@/services/db/progress";
import { calculateNextReview } from "@/services/learning/mastery";
import type { OpeningVariation } from "@/types/lotus";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningTrainerProps {
  lesson: OpeningVariation;
}

type FeedbackTone = "idle" | "success" | "error" | "info";

interface Feedback {
  tone: FeedbackTone;
  title: string;
  detail: string;
}

/** Highlight colour tokens */
const HIGHLIGHT_SELECTED = { backgroundColor: "rgba(0, 240, 255, 0.2)" };
const HIGHLIGHT_TARGET = {
  background: "radial-gradient(circle, rgba(0,240,255,0.3) 20%, transparent 20%)",
  borderRadius: "50%",
};
const HIGHLIGHT_CAPTURE = {
  background: "radial-gradient(circle, transparent 50%, rgba(0,240,255,0.3) 50%)",
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

      if (!expectedSan) {
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
        setMistakes(m => m + 1);
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

      const nextPly = currentPly + 1;
      const isLineComplete = nextPly >= lesson.movesSan.length;

      setFen(trial.fen());
      setPlayedMoves((prev) => [...prev, playedMove!.san]);
      setCurrentPly(nextPly);
      setAnalysis(null);
      setSelectedSquare(null);

      if (isLineComplete && user) {
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

  const handlePieceDrop = ({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) => {
    if (!targetSquare) return false;
    setSelectedSquare(null);
    return executeMove(sourceSquare, targetSquare);
  };

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
      if (!success) setSelectedSquare(null);
      return;
    }
    if (piece && piece.pieceType.startsWith(userPrefix)) {
      setSelectedSquare(sq);
    }
  };

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
    <section aria-labelledby="trainer-heading" className="glass-panel rounded-3xl p-8 lg:p-10 corner-accent corner-tl corner-tr corner-bl corner-br scanline shadow-2xl">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono tracking-widest uppercase mb-2">
            <Brain className="size-3" />
            Practice Mode: Openings
          </div>
          <h2 id="trainer-heading" className="text-3xl font-heading font-bold text-white uppercase tracking-tight">
            {lesson.opening}: <span className="text-white/40">{lesson.variation}</span>
            {lesson.isCustom && <span className="ml-3 text-[10px] rounded bg-accent/20 text-accent border border-accent/30 px-2 py-0.5 font-bold uppercase font-mono">Custom_Node</span>}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSettingsPopup(!showSettingsPopup)}
              className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            >
              <Sliders className="size-5" />
            </button>
            <AnimatePresence>
              {showSettingsPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-white/10 bg-cyber-glass p-6 shadow-2xl backdrop-blur-2xl"
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">System Parameters</p>
                  <div className="space-y-4">
                    {[
                      { label: "Click-to-Move", active: clickToMove, toggle: toggleClickToMove },
                      { label: "Highlight Targets", active: highlightValidMoves, toggle: toggleHighlightValidMoves },
                      { label: "Board Notation", active: showNotation, toggle: toggleShowNotation }
                    ].map(setting => (
                      <button 
                        key={setting.label}
                        onClick={setting.toggle}
                        className="flex w-full items-center justify-between group"
                      >
                        <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors">{setting.label}</span>
                        <div className={cn(
                          "w-10 h-5 rounded-full relative transition-colors p-1",
                          setting.active ? "bg-primary" : "bg-white/10"
                        )}>
                          <div className={cn(
                            "size-3 rounded-full bg-white transition-transform",
                            setting.active ? "translate-x-5" : "translate-x-0"
                          )} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={resetLesson}
            className="inline-flex size-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
          >
            <RotateCcw className="size-5" />
          </button>
          
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="inline-flex h-12 items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 text-sm font-heading font-bold text-primary tracking-widest uppercase transition hover:border-primary/40 hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary disabled:cursor-wait disabled:opacity-50 shadow-neon"
          >
            <Search className="size-4" />
            {isAnalyzing ? "Processing" : "Analyze"}
          </button>
        </div>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(300px,600px)_1fr]">
        <div className="w-full max-w-[600px] justify-self-center xl:justify-self-start">
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl relative">
            <div className="absolute inset-0 grid-dots opacity-20 pointer-events-none" />
            <Chessboard
              options={{
                id: "oe-opening-trainer",
                position: fen,
                boardOrientation: lesson.side,
                animationDurationInMs: 200,
                allowDrawingArrows: true,
                showNotation: showNotation,
                darkSquareStyle: { backgroundColor: "#15151b" },
                lightSquareStyle: { backgroundColor: "#2d2d3a" },
                boardStyle: { width: "100%", height: "100%" },
                squareStyles: squareStyles,
                canDragPiece: ({ piece }) => piece.pieceType.startsWith(lesson.side === "white" ? "w" : "b"),
                onPieceDrop: handlePieceDrop,
                onSquareClick: handleSquareClick,
              }}
            />
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className={cn(
            "rounded-2xl border p-6 transition-all duration-500 relative overflow-hidden",
            feedback.tone === 'success' ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-100" :
            feedback.tone === 'error' ? "border-rose-500/20 bg-rose-500/5 text-rose-100" :
            "border-white/10 bg-white/5 text-white/70"
          )} role="status">
            {feedback.tone === 'idle' && <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />}
            <div className="mb-2 flex items-center gap-3">
              {feedback.tone === "success" ? (
                <CheckCircle2 aria-hidden="true" className="size-5 text-emerald-400" />
              ) : feedback.tone === "error" ? (
                <XCircle aria-hidden="true" className="size-5 text-rose-400" />
              ) : (
                <Activity aria-hidden="true" className="size-5 text-primary/70" />
              )}
              <p className="font-heading font-bold text-xl uppercase tracking-wider">{feedback.title}</p>
            </div>
            <p className="text-sm font-body opacity-80 leading-relaxed">{feedback.detail}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Cycle_Ply", value: isDeviated ? playedMoves.length : `${Math.min(currentPly, lesson.movesSan.length)}/${lesson.movesSan.length}` },
              { label: "Operator_Side", value: trainerTurn },
              { label: "Error_Count", value: mistakes }
            ].map(stat => (
              <div key={stat.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30 mb-1">{stat.label}</p>
                <p className="font-heading text-2xl text-white uppercase">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="flex-grow glass-panel rounded-2xl p-6 border-white/5 bg-white/[0.01]">
            <h3 className="mb-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-white/40">
              {isDeviated ? "Custom_Node_Sequence" : "Standard_Theoretical_Line"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isDeviated ? playedMoves : lesson.movesSan).map((move, index) => (
                <span
                  key={`${move}-${index}`}
                  className={cn(
                    "rounded-md border px-3 py-2 font-mono text-[10px] transition-all duration-300",
                    isDeviated || index < currentPly
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : index === currentPly
                        ? "border-primary/40 bg-primary/10 text-primary shadow-neon"
                        : "border-white/5 text-white/20"
                  )}
                >
                  {index % 2 === 0 ? `${Math.floor(index / 2) + 1}. ` : ""}
                  {move}
                </span>
              ))}
              {isDeviated && !game.isGameOver() && (
                <span className="rounded-md border border-dashed border-primary/20 bg-primary/5 px-3 py-2 font-mono text-[10px] text-primary/60 animate-pulse uppercase">
                  + Engine_Calc
                </span>
              )}
            </div>
          </div>

          {analysis && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="glass-panel rounded-2xl p-6 border-primary/10 bg-primary/[0.02]"
            >
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="size-3.5 text-primary" />
                <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-primary">Engine_Evaluation</h3>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-white/40 uppercase tracking-widest font-mono text-[9px]">Best_Line</span>
                  <span className="font-mono text-primary font-bold">{analysis.bestMove || "---"}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-white/40 uppercase tracking-widest font-mono text-[9px]">Score_Cp</span>
                  <span className="font-mono text-white">{formatEvaluation(analysis)}</span>
                </div>
                <p className="text-[10px] font-mono text-white/60 leading-relaxed break-all uppercase tracking-tight">
                  PV: {analysis.principalVariation.join(" ")}
                </p>
              </div>
            </motion.div>
          )}
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
  if (analysis.mate !== null) return `M${analysis.mate}`;
  if (analysis.centipawns !== null) return `${(analysis.centipawns / 100).toFixed(2)}`;
  return "CALC";
}
