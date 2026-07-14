"use client";

import React, { useState, useCallback } from "react";
import {
  ShieldCheck,
  Upload,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  X,
  BookOpen,
  Target,
} from "lucide-react";
import { Chess } from "chess.js";
import { useAuth } from "@/features/auth/AuthContext";
import type { OpeningVariation, EndgameLesson } from "@/types/lotus";

/** Minimal ECO lookup from first few moves. Extend as needed. */
function guessEcoCode(pgn: string): string {
  const moves = pgn.toLowerCase();
  if (moves.includes("1. e4 e5 2. nf3 nc6 3. bc4")) return "C50";
  if (moves.includes("1. e4 c5")) return "B20";
  if (moves.includes("1. e4 e5 2. nf3 nc6 3. bb5")) return "C60";
  if (moves.includes("1. d4 nf6 2. c4 g6")) return "E60";
  if (moves.includes("1. d4 d5 2. c4")) return "D30";
  if (moves.includes("1. d4 nf6 2. nf3 d5 3. bf4")) return "D02";
  if (moves.includes("1. e4 e6")) return "C00";
  if (moves.includes("1. e4 e5")) return "C20";
  if (moves.includes("1. d4 d5")) return "D00";
  if (moves.includes("1. d4")) return "A45";
  if (moves.includes("1. e4")) return "B00";
  if (moves.includes("1. c4")) return "A10";
  if (moves.includes("1. nf3")) return "A04";
  return "A00";
}

type ImportMode = "opening" | "endgame";

interface ParseResult {
  success: boolean;
  error?: string;
  opening?: Partial<OpeningVariation>;
  endgame?: Partial<EndgameLesson>;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [mode, setMode] = useState<ImportMode>("opening");
  const [pgnInput, setPgnInput] = useState("");
  const [fenInput, setFenInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [variationInput, setVariationInput] = useState("");
  const [overviewInput, setOverviewInput] = useState("");
  const [sideInput, setSideInput] = useState<"white" | "black">("white");
  const [difficultyInput, setDifficultyInput] = useState(2);
  const [parseResult, setParseResult] = useState<ParseResult | null>(null);
  const [savedItems, setSavedItems] = useState<Array<{ name: string; type: ImportMode }>>([]);

  /** Parse PGN into an OpeningVariation candidate */
  const parsePGN = useCallback(() => {
    if (!pgnInput.trim()) {
      setParseResult({ success: false, error: "PGN input is empty." });
      return;
    }

    try {
      const chess = new Chess();
      chess.loadPgn(pgnInput.trim());

      const history = chess.history();
      if (history.length === 0) {
        setParseResult({ success: false, error: "No valid moves found in the PGN." });
        return;
      }

      const cleanPgn = chess.pgn();
      const eco = guessEcoCode(cleanPgn);

      // Determine side from first move
      const firstMove = history[0];
      const detectedSide: "white" | "black" =
        firstMove.startsWith("e4") || firstMove.startsWith("d4") || firstMove.startsWith("c4") || firstMove.startsWith("Nf3")
          ? "white"
          : "black";

      const category: "White" | "Black vs e4" | "Black vs d4" =
        detectedSide === "white"
          ? "White"
          : history[0] && cleanPgn.includes("1. e4")
          ? "Black vs e4"
          : "Black vs d4";

      const opening: Partial<OpeningVariation> = {
        id: `import-${Date.now()}`,
        opening: nameInput || "Imported Opening",
        variation: variationInput || "Main Line",
        category,
        side: sideInput || detectedSide,
        eco,
        difficulty: difficultyInput,
        overview: overviewInput || `Imported from PGN: ${cleanPgn.slice(0, 60)}...`,
        keyIdeas: [],
        movesSan: history,
        pgn: cleanPgn,
        concepts: [],
        commonMistakes: [],
        tacticalMotifs: [],
        modelGames: [],
      };

      setParseResult({ success: true, opening });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid PGN format.";
      setParseResult({ success: false, error: msg });
    }
  }, [pgnInput, nameInput, variationInput, overviewInput, sideInput, difficultyInput]);

  /** Parse FEN into an EndgameLesson candidate */
  const parseFEN = useCallback(() => {
    if (!fenInput.trim()) {
      setParseResult({ success: false, error: "FEN input is empty." });
      return;
    }

    try {
      const chess = new Chess(fenInput.trim());
      // If constructor didn't throw, FEN is valid
      const turn = chess.turn() === "w" ? "White" : "Black";

      const endgame: Partial<EndgameLesson> = {
        id: `endgame-import-${Date.now()}`,
        name: nameInput || "Imported Endgame",
        category: variationInput || "General",
        fen: fenInput.trim(),
        objective: overviewInput || `${turn} to play and win.`,
        winningMethod: "",
        commonErrors: [],
        hints: [],
        engineEvaluation: "",
        difficulty: difficultyInput,
        tags: [],
      };

      setParseResult({ success: true, endgame });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid FEN string.";
      setParseResult({ success: false, error: msg });
    }
  }, [fenInput, nameInput, variationInput, overviewInput, difficultyInput]);

  /** Save to local list (would write to Firestore in production) */
  const handleSave = () => {
    if (!parseResult?.success) return;

    const itemName =
      mode === "opening"
        ? parseResult.opening?.opening || "Opening"
        : parseResult.endgame?.name || "Endgame";

    setSavedItems((prev) => [...prev, { name: itemName, type: mode }]);
    setParseResult(null);
    setPgnInput("");
    setFenInput("");
    setNameInput("");
    setVariationInput("");
    setOverviewInput("");
  };

  const resetForm = () => {
    setParseResult(null);
    setPgnInput("");
    setFenInput("");
    setNameInput("");
    setVariationInput("");
    setOverviewInput("");
    setDifficultyInput(2);
    setSideInput("white");
  };

  // Simple admin guard — in production, check a Firestore admin flag
  const isAdmin = !!user;

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="text-center space-y-3">
          <ShieldCheck className="size-12 text-rose-400 mx-auto" />
          <h2 className="text-lg font-bold text-white">Access Denied</h2>
          <p className="text-sm text-slate-400">You do not have admin permissions.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-400/20">
          <ShieldCheck className="size-3.5" />
          Admin Tools
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Content Curation
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl font-normal leading-relaxed">
          Import opening PGN strings or endgame FEN positions. Auto-parse into structured lesson data ready for Firestore.
        </p>
      </section>

      {/* Mode Switcher */}
      <div className="flex gap-2">
        {(["opening", "endgame"] as ImportMode[]).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); resetForm(); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
              mode === m
                ? "bg-emerald-400/10 border-emerald-400/30 text-emerald-300"
                : "bg-white/[0.01] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.03]"
            }`}
          >
            {m === "opening" ? <BookOpen className="size-3.5" /> : <Target className="size-3.5" />}
            {m === "opening" ? "Import Opening (PGN)" : "Import Endgame (FEN)"}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Input Form Card */}
        <div className="rounded-xl border border-white/5 bg-[#0b120f]/60 p-5 sm:p-6 backdrop-blur-md space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Upload className="size-4 text-emerald-400" />
            {mode === "opening" ? "PGN Import" : "FEN Import"}
          </h2>

          {/* Name */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {mode === "opening" ? "Opening Name" : "Endgame Name"}
            </label>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={mode === "opening" ? "e.g. Sicilian Defense" : "e.g. Lucena Position"}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition"
            />
          </div>

          {/* Variation / Category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {mode === "opening" ? "Variation Name" : "Category"}
            </label>
            <input
              type="text"
              value={variationInput}
              onChange={(e) => setVariationInput(e.target.value)}
              placeholder={mode === "opening" ? "e.g. Najdorf Structure" : "e.g. Rook Endgames"}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition"
            />
          </div>

          {/* Overview / Objective */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {mode === "opening" ? "Overview" : "Objective"}
            </label>
            <textarea
              value={overviewInput}
              onChange={(e) => setOverviewInput(e.target.value)}
              rows={2}
              placeholder={mode === "opening" ? "Brief overview of the opening..." : "Describe the objective..."}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Side (opening only) */}
            {mode === "opening" && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Side
                </label>
                <select
                  value={sideInput}
                  onChange={(e) => setSideInput(e.target.value as "white" | "black")}
                  className="w-full rounded-lg border border-white/10 bg-[#0b120f] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40 transition"
                >
                  <option value="white">White</option>
                  <option value="black">Black</option>
                </select>
              </div>
            )}

            {/* Difficulty */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Difficulty (1–5)
              </label>
              <select
                value={difficultyInput}
                onChange={(e) => setDifficultyInput(Number(e.target.value))}
                className="w-full rounded-lg border border-white/10 bg-[#0b120f] px-3 py-2.5 text-sm text-white outline-none focus:border-emerald-400/40 transition"
              >
                {[1, 2, 3, 4, 5].map((d) => (
                  <option key={d} value={d}>
                    {"★".repeat(d)} ({d})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PGN or FEN Input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {mode === "opening" ? "PGN String" : "FEN String"}
            </label>
            <textarea
              value={mode === "opening" ? pgnInput : fenInput}
              onChange={(e) =>
                mode === "opening" ? setPgnInput(e.target.value) : setFenInput(e.target.value)
              }
              rows={4}
              placeholder={
                mode === "opening"
                  ? "1. e4 e5 2. Nf3 Nc6 3. Bc4 Bc5 4. c3 Nf6 5. d4"
                  : "8/8/8/8/2K5/8/1P1R4/1k6 w - - 0 1"
              }
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white font-mono placeholder-slate-500 outline-none focus:border-emerald-400/40 focus:ring-1 focus:ring-emerald-400/30 transition resize-none"
            />
          </div>

          {/* Parse Button */}
          <button
            onClick={mode === "opening" ? parsePGN : parseFEN}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-md shadow-emerald-400/10 hover:bg-emerald-300 hover:shadow-emerald-400/20 transition-all"
          >
            <FileText className="size-4" />
            Parse {mode === "opening" ? "PGN" : "FEN"}
          </button>
        </div>

        {/* Result Preview Card */}
        <div className="rounded-xl border border-white/5 bg-[#101416]/40 p-5 sm:p-6 backdrop-blur-sm shadow-md space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="size-4 text-sky-400" />
            Parse Result
          </h2>

          {!parseResult ? (
            <div className="py-16 text-center text-xs text-slate-500 border border-dashed border-white/5 rounded-lg">
              <Upload className="size-6 mx-auto mb-2 text-slate-600" />
              Enter a {mode === "opening" ? "PGN" : "FEN"} string and click Parse to preview the result.
            </div>
          ) : !parseResult.success ? (
            <div className="rounded-lg border border-rose-400/20 bg-rose-400/5 p-4 flex items-start gap-3">
              <AlertTriangle className="size-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-rose-300">Parse Failed</p>
                <p className="text-xs text-rose-200/70 mt-1">{parseResult.error}</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 flex items-start gap-3">
                <CheckCircle className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-emerald-300">Parse Successful</p>
                  <p className="text-xs text-emerald-200/70 mt-1">
                    {mode === "opening"
                      ? `${parseResult.opening?.movesSan?.length} moves extracted · ECO: ${parseResult.opening?.eco}`
                      : `Valid FEN loaded for "${parseResult.endgame?.name}"`}
                  </p>
                </div>
              </div>

              {/* Preview Data */}
              <div className="rounded-lg bg-white/[0.02] border border-white/5 p-4 space-y-2 text-xs">
                {mode === "opening" && parseResult.opening && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Opening</span>
                      <span className="text-white font-semibold">{parseResult.opening.opening}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Variation</span>
                      <span className="text-white font-semibold">{parseResult.opening.variation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">ECO Code</span>
                      <span className="text-white font-mono">{parseResult.opening.eco}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Side</span>
                      <span className="text-white capitalize">{parseResult.opening.side}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Moves</span>
                      <span className="text-white">{parseResult.opening.movesSan?.length} ply</span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block mb-1">PGN</span>
                      <code className="text-[10px] text-emerald-300 font-mono leading-relaxed break-all">
                        {parseResult.opening.pgn}
                      </code>
                    </div>
                  </>
                )}
                {mode === "endgame" && parseResult.endgame && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name</span>
                      <span className="text-white font-semibold">{parseResult.endgame.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category</span>
                      <span className="text-white">{parseResult.endgame.category}</span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-slate-400 block mb-1">FEN</span>
                      <code className="text-[10px] text-emerald-300 font-mono leading-relaxed break-all">
                        {parseResult.endgame.fen}
                      </code>
                    </div>
                  </>
                )}
              </div>

              {/* Save Button */}
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-sky-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-md shadow-sky-400/10 hover:bg-sky-300 transition-all"
              >
                <Plus className="size-4" />
                Save to Collection
              </button>
            </div>
          )}

          {/* Saved items log */}
          {savedItems.length > 0 && (
            <div className="pt-3 border-t border-white/5 space-y-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Saved This Session ({savedItems.length})
              </h3>
              {savedItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-white/[0.02] border border-white/5 px-3 py-2 text-xs"
                >
                  <span className="text-white font-medium">{item.name}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-white/10 uppercase tracking-wider text-emerald-400">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
