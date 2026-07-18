"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Chess, type Move, type Square } from "chess.js";
import { Chessboard } from "react-chessboard";
import { Brain, CheckCircle2, RotateCcw, Undo, Lightbulb, XCircle, Sliders, PlayCircle, Cpu, Activity, Target, Trophy, Zap } from "lucide-react";
import { getStockfishClient, type StockfishEvaluation } from "@/services/stockfish/client";
import { useBoardSettings } from "@/features/trainer/BoardSettingsContext";
import { useAuth } from "@/features/auth/AuthContext";
import { saveProgressRecord, getProgressRecord } from "@/services/db/progress";
import { calculateNextReview } from "@/services/learning/mastery";
import type { EndgameLesson } from "@/types/lotus";
import { motion, AnimatePresence } from "framer-motion";
import { playMove, playVictory, playDefeat } from "@/lib/sounds";

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
  idle: "border-white/10 bg-white/[0.02] text-slate-300",
  success: "border-primary/20 bg-primary/5 text-primary",
  error: "border-danger/20 bg-danger/5 text-danger",
  info: "border-accent/20 bg-accent/5 text-accent",
};

/** Highlight colour tokens */
const HIGHLIGHT_SELECTED = { backgroundColor: "rgba(0, 204, 204, 0.25)" };
const HIGHLIGHT_TARGET = {
  background: "radial-gradient(circle, rgba(0,204,204,0.3) 20%, transparent 20%)",
  borderRadius: "50%",
};
const HIGHLIGHT_CAPTURE = {
  background: "radial-gradient(circle, transparent 50%, rgba(0,204,204,0.3) 50%)",
};

export function EndgameTrainer({ lesson }: EndgameTrainerProps) {
  const [fen, setFen] = useState(lesson.fen);
  const game = useMemo(() => new Chess(fen), [fen]);
  
  const [status, setStatus] = useState<GameStatus>("playing");
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>({
    tone: "idle",
    title: "SIMULATION_INITIATED",
    detail: lesson.objective,
  });
  
  const [isEngineThinking, setIsEngineThinking] = useState(false);
  const [isHinting, setIsHinting] = useState(false);
  const [hintMove, setHintMove] = useState<string | null>(null);
  
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [showSettingsPopup, setShowSettingsPopup] = useState(false);

  const { user } = useAuth();
  const { highlightValidMoves, showNotation, fullBoardNotation, clickToMove, toggleHighlightValidMoves, toggleShowNotation, toggleFullBoardNotation, toggleClickToMove } = useBoardSettings();

  const initialSide = useMemo(() => new Chess(lesson.fen).turn(), [lesson.fen]);
  const userSideStr = initialSide === "w" ? "white" : "black";
  const isUserTurn = game.turn() === initialSide && status === "playing";

  useEffect(() => {
    if (status !== "playing") return;

    if (game.isCheckmate()) {
      if (game.turn() !== initialSide) {
        setStatus("won");
        setFeedback({ tone: "success", title: "OBJECTIVE_SECURED", detail: "Endgame protocol successfully executed." });
        playVictory();
        saveProgress(true);
      } else {
        setStatus("lost");
        setFeedback({ tone: "error", title: "SYSTEM_BREACHED", detail: "Terminal position reached by opponent." });
        playDefeat();
        saveProgress(false);
      }
    } else if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
      setStatus("drawn");
      setFeedback({ tone: "error", title: "SYNC_STALLED", detail: "Neutral parity reached. Drill failure logged." });
      playDefeat();
      saveProgress(false);
    }
  }, [game, fen, status, initialSide]);

  useEffect(() => {
    if (status !== "playing" || isUserTurn || isEngineThinking) return;

    const playEngineMove = async () => {
      setIsEngineThinking(true);
      setFeedback({ tone: "idle", title: "ENGINE_SYNCHRONIZING...", detail: "Awaiting calculation cycle." });
      
      try {
        const client = getStockfishClient();
        const result = await client.analyzeFen(game.fen(), 15);
        
        if (result.bestMove) {
          const move = game.move(result.bestMove);
          setFen(game.fen());
          setFeedback({
            tone: "idle",
            title: `ENGINE_VECTOR: ${move.san}`,
            detail: "User input required.",
          });
        }
      } catch (err) {
        console.error("Engine play error:", err);
        setFeedback({ tone: "error", title: "LINK_ERROR", detail: "Engine stream interrupted." });
      } finally {
        setIsEngineThinking(false);
      }
    };

    const delay = setTimeout(playEngineMove, 600);
    return () => clearTimeout(delay);
  }, [isUserTurn, status, fen, game, isEngineThinking]);

  const saveProgress = (won: boolean) => {
    if (!user) return;
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
        setFeedback({ tone: "error", title: "INPUT_REJECTED", detail: "Illegal vector input." });
        return false;
      }
      setFen(trial.fen());
      setSelectedSquare(null);
      setHintMove(null);
      playMove();
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
      if (!success) setSelectedSquare(null);
      return;
    }
    if (piece && piece.pieceType.startsWith(userPrefix)) setSelectedSquare(sq);
  };

  const squareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (hintMove) {
      const from = hintMove.substring(0, 2);
      const to = hintMove.substring(2, 4);
      styles[from] = { backgroundColor: "rgba(189, 0, 255, 0.4)" };
      styles[to] = { backgroundColor: "rgba(189, 0, 255, 0.4)" };
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
        setFeedback({ tone: "info", title: "SUGGESTED_PROTOCOL", detail: "Neural analysis recommends this path." });
      }
    } catch (error) {
      setFeedback({ tone: "error", title: "HINT_UNAVAILABLE", detail: "Analytical cores occupied." });
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
    setFeedback({ tone: "idle", title: "RE_CALIBRATING...", detail: lesson.objective });
  };

  const handleUndo = () => {
    const trial = new Chess(fen);
    const history = trial.history();
    if (history.length === 0) return;

    // If it's the player's turn, the engine just moved — undo both engine and player moves
    if (trial.turn() === initialSide) {
      trial.undo();
      trial.undo();
    } else {
      trial.undo();
    }

    setFen(trial.fen());
    setStatus("playing");
    setSelectedSquare(null);
    setHintMove(null);
    setIsEngineThinking(false);
  };

  return (
    <section className="glass-card p-6 md:p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-primary">
            <Trophy className="size-4" />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">Endgame_Drill_Node</span>
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tighter">
            {lesson.name}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowSettingsPopup(!showSettingsPopup)}
              className="size-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-primary transition-all"
            >
              <Sliders className="size-4" />
            </motion.button>
            <AnimatePresence>
              {showSettingsPopup && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-12 z-20 w-64 glass-card bg-black/90 p-5 shadow-neon-strong"
                >
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Node_Configs</p>
                  <div className="space-y-4">
                    {[
                      { label: "Click_to_Move", active: clickToMove, toggle: toggleClickToMove },
                      { label: "Highlight_Vectors", active: highlightValidMoves, toggle: toggleHighlightValidMoves },
                      { label: "Data_Notation", active: showNotation, toggle: toggleShowNotation },
                      { label: "Full_Board_Notation", active: fullBoardNotation, toggle: toggleFullBoardNotation },
                    ].map((cfg) => (
                      <div key={cfg.label} className="flex items-center justify-between group cursor-pointer" onClick={cfg.toggle}>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-200 transition-colors">{cfg.label}</span>
                        <div className={`w-8 h-4 rounded-full border border-white/10 transition-colors relative ${cfg.active ? "bg-primary/20" : "bg-white/5"}`}>
                          <motion.div 
                            animate={{ x: cfg.active ? 16 : 2 }}
                            className={`absolute top-0.5 size-2.5 rounded-full ${cfg.active ? "bg-primary shadow-neon" : "bg-slate-700"}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={resetLesson}
            className="size-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all"
          >
            <RotateCcw className="size-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleUndo}
            disabled={game.history().length === 0 || status !== "playing"}
            className="size-10 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-slate-400 hover:text-white transition-all disabled:opacity-50"
          >
            <Undo className="size-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleGetHint}
            disabled={!isUserTurn || isHinting}
            className="h-10 px-5 flex items-center gap-3 rounded-lg border border-accent/20 bg-accent/10 text-[10px] font-bold tracking-[0.2em] text-accent uppercase hover:bg-accent/20 transition-all disabled:opacity-50 group"
          >
            <Lightbulb className="size-4 group-hover:scale-110 transition-transform" />
            {isHinting ? "PROCESSING..." : "GET_HINT"}
          </motion.button>
        </div>
      </div>

      <div className="grid gap-10 xl:grid-cols-[minmax(300px,640px)_1fr]">
        <div className="w-full max-w-[640px] justify-self-center xl:justify-self-start relative">
          <div className="aspect-square overflow-hidden rounded-2xl border border-white/10 bg-cyber-glass shadow-2xl relative">
            <Chessboard
              options={{
                id: "lotus-endgame-trainer",
                position: fen,
                boardOrientation: userSideStr,
                animationDurationInMs: 0,
                showAnimations: false,
                showNotation: showNotation,
                darkSquareStyle: { backgroundColor: "#15151b" },
                lightSquareStyle: { backgroundColor: "#1e1e26" },
                boardStyle: { width: "100%", height: "100%" },
                squareStyles: squareStyles,
                canDragPiece: ({ piece }) => piece.pieceType.startsWith(initialSide),
                onPieceDrop: handlePieceDrop,
                onSquareClick: handleSquareClick,
              }}
            />
            {fullBoardNotation && (
              <FullBoardNotationOverlay orientation={userSideStr} />
            )}
          </div>
          
          <AnimatePresence>
            {status !== "playing" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center rounded-2xl bg-black/80 backdrop-blur-md border border-white/10"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="text-center p-8 space-y-6"
                >
                  <div className={`mx-auto flex size-20 items-center justify-center rounded-2xl border ${status === "won" ? "bg-primary/10 border-primary/20 text-primary shadow-neon" : "bg-danger/10 border-danger/20 text-danger"}`}>
                    {status === "won" ? <CheckCircle2 className="size-10" /> : <XCircle className="size-10" />}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-4xl font-heading tracking-widest text-white">
                      {status === "won" ? "SYNCHRONIZED" : status === "lost" ? "LINK_TERMINATED" : "PARITY_REACHED"}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      {status === "won" ? "Drill successfully committed to neural vault." : "Optimization failed. Calibration recommended."}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetLesson}
                    className="inline-flex items-center gap-3 rounded-xl bg-white text-background px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-slate-200 transition-colors"
                  >
                    <RotateCcw className="size-4" />
                    BOOT_RETRY_CYCLE
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6 flex flex-col h-full">
          <div className={`rounded-xl border-l-4 p-6 flex flex-col justify-between min-h-[120px] transition-all duration-500 ${feedbackStyles[feedback.tone]}`}>
            <div className="space-y-1">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="size-4" />
                <h4 className="font-heading text-2xl tracking-[0.2em]">{feedback.title}</h4>
              </div>
              <p className="text-sm font-medium tracking-tight leading-relaxed opacity-80">{feedback.detail}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-500 mb-2">
                <Activity className="size-3" />
                <span className="text-[8px] font-bold uppercase tracking-widest">Node_Status</span>
              </div>
              <p className="text-xl font-heading text-white">{status === "playing" ? (isUserTurn ? "ACTIVE" : "CALCULATING") : status.toUpperCase()}</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 space-y-1 text-center">
              <div className="flex items-center justify-center gap-2 text-accent mb-2">
                <Zap className="size-3" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">Hint_Usage</span>
              </div>
              <p className="text-xl font-heading text-white">{hintsUsed}</p>
            </div>
          </div>

          <div className="bg-black/20 border border-white/5 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                <Target className="size-3" />
                Mission_Parameters
              </h3>
              <p className="text-sm font-medium text-slate-300 leading-relaxed">{lesson.objective}</p>
            </div>
            
            <div className="h-px w-full bg-white/5" />
            
            <div>
              <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                <Activity className="size-3" />
                Optimal_Protocol
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed italic">{lesson.winningMethod}</p>
            </div>
            
            {lesson.commonErrors.length > 0 && (
              <div className="bg-danger/5 border border-danger/10 rounded-lg p-4">
                <h3 className="text-[10px] font-bold text-danger uppercase tracking-[0.3em] mb-2">Warning: Known_Vulnerabilities</h3>
                <ul className="space-y-2">
                  {lesson.commonErrors.map((err, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                      <div className="size-1 bg-danger/40 rounded-full mt-1.5 shrink-0" />
                      {err}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="bg-black/20 border border-white/5 rounded-xl p-6 flex-1">
             <div className="flex items-center gap-2 text-slate-500 mb-6">
               <PlayCircle className="size-4 text-primary" />
               <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Sequence_Log</span>
             </div>
             <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto scrollbar-hidden">
                {game.history().length > 0 ? (
                  game.history().map((san, i) => (
                    <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5 bg-black/40 text-slate-300">
                      <span className="text-[8px] font-mono opacity-40">{Math.floor(i / 2) + 1}{i % 2 === 0 ? "w" : "b"}</span>
                      <span className="font-mono text-sm font-bold tracking-tight">{san}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Awaiting_Initial_Vector...</span>
                )}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Renders a subtle coordinate label on every square, respecting board orientation. */
function FullBoardNotationOverlay({ orientation }: { orientation: "white" | "black" }) {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"];

  const rankOrder = orientation === "white" ? [...ranks].reverse() : [...ranks];
  const fileOrder = orientation === "white" ? files : [...files].reverse();

  const cells: string[] = [];
  for (const rank of rankOrder) {
    for (const file of fileOrder) {
      cells.push(`${file}${rank}`);
    }
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid grid-cols-8 grid-rows-8">
      {cells.map((coord) => (
        <div key={coord} className="relative">
          <span className="absolute left-1 top-0.5 text-[9px] font-mono leading-none text-white/30 select-none">
            {coord}
          </span>
        </div>
      ))}
    </div>
  );
}
