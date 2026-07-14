import React from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Brain, Clock } from "lucide-react";
import { useReviewQueue } from "@/features/dashboard/useReviewQueue";

export function ReviewQueuePanel() {
  const { queue, isLoading } = useReviewQueue();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-white/5 bg-[#101416]/40 p-6 md:p-8 backdrop-blur-sm shadow-md animate-pulse">
        <div className="h-6 w-32 bg-white/10 rounded mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 w-full bg-white/5 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  // Display top 5 items
  const displayQueue = queue.slice(0, 5);

  return (
    <div className="rounded-xl border border-white/5 bg-[#101416]/40 p-6 md:p-8 backdrop-blur-sm shadow-md">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-bold text-sky-400 uppercase tracking-[0.15em] flex items-center gap-2">
            <Brain className="size-3.5" />
            Adaptive Review Queue
          </h2>
          <h3 className="text-xl font-bold text-white mt-1">Due For Practice</h3>
        </div>
        {queue.length > 0 && (
          <span className="inline-flex items-center justify-center rounded-full bg-rose-500/20 px-2.5 py-0.5 text-xs font-bold text-rose-300">
            {queue.length} Due
          </span>
        )}
      </div>

      {queue.length === 0 ? (
        <div className="rounded-lg border border-white/5 bg-white/[0.02] p-8 text-center">
          <CheckCircle className="size-8 mx-auto text-emerald-400/50 mb-3" />
          <p className="text-sm font-medium text-slate-300">You're all caught up!</p>
          <p className="text-xs text-slate-500 mt-1">Explore the library for new lines.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayQueue.map((item) => (
            <Link
              key={item.id}
              href={item.lessonKind === "opening" ? "/practice/openings" : "/practice/endgames"}
              className="group flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-10 flex-shrink-0 items-center justify-center rounded-md border ${
                  item.lessonKind === "opening" 
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                }`}>
                  <AlertCircle className="size-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-400">{item.subtitle}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs font-medium text-rose-300 bg-rose-300/10 px-2 py-0.5 rounded-full border border-rose-300/20 flex items-center gap-1">
                  <Clock className="size-3" />
                  {item.dueLabel}
                </span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{item.rank}</span>
              </div>
            </Link>
          ))}

          {queue.length > 5 && (
            <Link
              href="/practice/openings"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-4 py-2.5 text-xs font-bold text-slate-300 hover:bg-white/[0.04] hover:text-white transition-all mt-2"
            >
              View all {queue.length} due items
              <ArrowRight className="size-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

// Simple placeholder icon since CheckCircle isn't imported from lucide above
function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
