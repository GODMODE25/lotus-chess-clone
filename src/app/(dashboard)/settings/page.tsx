"use client";

import React from "react";
import { Settings, Eye, Sliders, ToggleLeft, ToggleRight, Sparkles } from "lucide-react";
import { useBoardSettings } from "@/features/trainer/BoardSettingsContext";
import { useAuth } from "@/features/auth/AuthContext";

export default function SettingsPage() {
  const {
    highlightValidMoves,
    showNotation,
    fullBoardNotation,
    clickToMove,
    soundEnabled,
    toggleHighlightValidMoves,
    toggleShowNotation,
    toggleFullBoardNotation,
    toggleClickToMove,
    toggleSound
  } = useBoardSettings();

  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="space-y-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/20">
          <Settings className="size-3.5" />
          Settings Panel
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Preferences & Customization
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl">
          Personalize your chessboard study settings, profile data, and UI preferences. Changes are persisted locally.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Board Settings Card */}
        <div className="rounded-xl border border-white/5 bg-[#0b1713]/40 p-6 md:p-8 backdrop-blur-sm shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
              <Sliders className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Chessboard Customization</h2>
              <p className="text-xs text-slate-400">Configure board rendering and interaction inputs.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            {/* Click to Move */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Click-to-Move input</p>
                <p className="text-xs text-slate-400 max-w-[240px] mt-0.5">
                  Allows clicking squares to select and move pieces, in addition to dragging.
                </p>
              </div>
              <button
                onClick={toggleClickToMove}
                className="focus:outline-none"
                aria-label={clickToMove ? "Disable click to move" : "Enable click to move"}
              >
                {clickToMove ? (
                  <ToggleRight className="size-10 text-emerald-400" />
                ) : (
                  <ToggleLeft className="size-10 text-slate-500" />
                )}
              </button>
            </div>

            {/* Highlight Moves */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Highlight Valid Moves</p>
                <p className="text-xs text-slate-400 max-w-[240px] mt-0.5">
                  Displays dots or hints on all valid destination squares when a piece is clicked.
                </p>
              </div>
              <button
                onClick={toggleHighlightValidMoves}
                className="focus:outline-none"
                aria-label={highlightValidMoves ? "Disable highlight valid moves" : "Enable highlight valid moves"}
              >
                {highlightValidMoves ? (
                  <ToggleRight className="size-10 text-emerald-400" />
                ) : (
                  <ToggleLeft className="size-10 text-slate-500" />
                )}
              </button>
            </div>

            {/* Coordinates/Notation */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Show Board Notation</p>
                <p className="text-xs text-slate-400 max-w-[240px] mt-0.5">
                  Displays file coordinates (a-h) and rank numbers (1-8) along the edges of the board.
                </p>
              </div>
              <button
                onClick={toggleShowNotation}
                className="focus:outline-none"
                aria-label={showNotation ? "Hide board notation" : "Show board notation"}
              >
                {showNotation ? (
                  <ToggleRight className="size-10 text-emerald-400" />
                ) : (
                  <ToggleLeft className="size-10 text-slate-500" />
                )}
              </button>
            </div>

            {/* Full Board Notation */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Full Board Notation</p>
                <p className="text-xs text-slate-400 max-w-[240px] mt-0.5">
                  Displays the coordinate (e.g. e4) on every square, not just the board edges.
                </p>
              </div>
              <button
                onClick={toggleFullBoardNotation}
                className="focus:outline-none"
                aria-label={fullBoardNotation ? "Disable full board notation" : "Enable full board notation"}
              >
                {fullBoardNotation ? (
                  <ToggleRight className="size-10 text-emerald-400" />
                ) : (
                  <ToggleLeft className="size-10 text-slate-500" />
                )}
              </button>
            </div>

            {/* Sound Effects */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <div>
                <p className="text-sm font-semibold text-white">Sound Effects</p>
                <p className="text-xs text-slate-400 max-w-[240px] mt-0.5">
                  Plays synthesized tones for moves, correct answers, and game outcomes.
                </p>
              </div>
              <button
                onClick={toggleSound}
                className="focus:outline-none"
                aria-label={soundEnabled ? "Disable sound effects" : "Enable sound effects"}
              >
                {soundEnabled ? (
                  <ToggleRight className="size-10 text-emerald-400" />
                ) : (
                  <ToggleLeft className="size-10 text-slate-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Profile/System Settings Card */}
        <div className="rounded-xl border border-white/5 bg-[#101416]/40 p-6 md:p-8 backdrop-blur-sm shadow-md space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-amber-400/10 text-amber-300 border border-amber-300/20">
              <Eye className="size-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white">Profile Overview</h2>
              <p className="text-xs text-slate-400">View logged-in profile configuration status.</p>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Username</span>
                <span className="text-white font-semibold">{user?.displayName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Authentication</span>
                <span className="text-white font-semibold">
                  {user?.isGuest ? "Local Guest Session" : "Firebase Authenticated"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">User UID</span>
                <span className="text-xs text-slate-400 font-mono select-all truncate max-w-[180px]">
                  {user?.uid}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-amber-500/10 bg-amber-500/5 text-xs text-amber-200/90 leading-relaxed flex gap-2">
              <Sparkles className="size-5 shrink-0 text-amber-300" />
              <span>
                Spaced repetition review schedules and user statistics are automatically synced. When using a Local Guest session, your studies are cached in localStorage.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
