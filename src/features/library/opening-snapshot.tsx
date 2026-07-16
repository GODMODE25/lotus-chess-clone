"use client";

import { useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { getFinalFen } from "@/lib/chess-utils";

interface OpeningSnapshotProps {
  moves: string[];
  side?: "white" | "black";
}

/**
 * Renders a high-tech, read-only snapshot of the final variation position.
 */
export function OpeningSnapshot({ moves, side = "white" }: OpeningSnapshotProps) {
  const finalFen = useMemo(() => getFinalFen(moves), [moves]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-white/5 bg-[#050507] group-hover:border-cyan-500/30 transition-all duration-500 shadow-inner">
      <Chessboard
        options={{
          position: finalFen,
          boardOrientation: side,
          darkSquareStyle: { backgroundColor: "#0a0a0f" },
          lightSquareStyle: { backgroundColor: "#15151b" },
          boardStyle: { borderRadius: "4px" },
        }}
      />
      {/* Technical overlay for the "Lab" aesthetic */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-cyan-500/5 via-transparent to-purple-500/5" />
      <div className="absolute inset-0 border border-white/5 rounded-lg" />
    </div>
  );
}
