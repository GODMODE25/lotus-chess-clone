"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Crown, Mail, Lock, User, Sparkles, AlertCircle } from "lucide-react";

export default function AuthPage() {
  const {
    user,
    loading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signInAsGuest
  } = useAuth();

  const router = useRouter();

  const [mode, setMode] = useState<"signin" | "signup" | "guest">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guestName, setGuestName] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    setSubmitLoading(true);

    try {
      if (mode === "signin") {
        if (!email || !password) throw new Error("Email and password are required");
        await signInWithEmail(email, password);
      } else if (mode === "signup") {
        if (!email || !password) throw new Error("Email and password are required");
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        await signUpWithEmail(email, password);
      } else {
        if (!guestName.trim()) throw new Error("Guest nickname is required");
        signInAsGuest(guestName);
      }
    } catch (err: any) {
      setLocalError(err.message || "An authentication error occurred.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    setSubmitLoading(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setLocalError(err.message || "Google sign-in was cancelled or failed.");
      setSubmitLoading(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07100d] text-emerald-300">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-emerald-300 border-t-transparent" />
          <p className="text-sm font-medium tracking-wide">Syncing session...</p>
        </div>
      </div>
    );
  }

  const activeError = localError || error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#07100d] px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[350px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 size-[350px] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 z-10">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-xl bg-emerald-400 text-slate-950 shadow-xl shadow-emerald-400/20 mb-4">
            <Crown className="size-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white">OE Chess</h2>
          <p className="mt-2 text-sm text-slate-400">Master openings and endgames through spaced study</p>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#0b120f]/60 p-6 sm:p-8 backdrop-blur-md shadow-2xl shadow-black/40 space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-white/5 p-1 rounded-lg bg-white/[0.02]" role="tablist">
            {(["signin", "signup", "guest"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setMode(tab);
                  setLocalError(null);
                }}
                className={`flex-1 text-center py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  mode === tab
                    ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                role="tab"
                aria-selected={mode === tab}
              >
                {tab === "signin" ? "Sign In" : tab === "signup" ? "Sign Up" : "Guest Mode"}
              </button>
            ))}
          </div>

          {activeError && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-300 text-xs leading-relaxed animate-shake">
              <AlertCircle className="size-4 shrink-0 text-rose-400" />
              <span>{activeError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode !== "guest" ? (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400" htmlFor="email-input">Email Address</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Mail className="size-4" />
                    </span>
                    <input
                      id="email-input"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="block w-full rounded-lg border border-white/10 bg-slate-950/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-400" htmlFor="password-input">Password</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                      <Lock className="size-4" />
                    </span>
                    <input
                      id="password-input"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full rounded-lg border border-white/10 bg-slate-950/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-400" htmlFor="guest-input">Guest Nickname</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    <User className="size-4" />
                  </span>
                  <input
                    id="guest-input"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="ChessScholar"
                    className="block w-full rounded-lg border border-white/10 bg-slate-950/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitLoading}
              className="flex w-full justify-center items-center gap-2 rounded-lg bg-emerald-400 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-400/10 hover:bg-emerald-300 hover:shadow-emerald-400/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {submitLoading ? (
                <span className="size-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
              ) : mode === "signin" ? (
                "Sign In"
              ) : mode === "signup" ? (
                "Create Account"
              ) : (
                "Enter Practice Arena"
              )}
            </button>
          </form>

          {mode !== "guest" && (
            <>
              <div className="relative flex items-center my-4">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-slate-500 text-[10px] uppercase font-bold tracking-widest">or</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <button
                onClick={handleGoogleSignIn}
                disabled={submitLoading}
                className="flex w-full justify-center items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] py-2.5 text-xs font-bold text-white transition-all disabled:opacity-50"
              >
                <svg className="size-4 mr-1.5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.49c0,-0.61 -0.06,-1.2 -0.16,-1.89z" fill="#4285F4" />
                    <path d="M12,20.7c2.35,0 4.32,-0.78 5.76,-2.12l-3.3,-2.58c-0.91,0.61 -2.08,0.97 -3.36,0.97c-2.58,0 -4.77,-1.75 -5.55,-4.1H2.1v2.66c1.47,2.92 4.49,4.92 8.01,4.92z" fill="#34A853" />
                    <path d="M6.45,12.87c-0.2,-0.61 -0.31,-1.26 -0.31,-1.92s0.11,-1.31 0.31,-1.92V6.37H2.1C1.43,7.7 1.05,9.2 1.05,10.8s0.38,3.1 1.05,4.43l3.3,-2.66c-0.2,-0.61 -0.3,-1.25 -0.3,-1.92z" fill="#FBBC05" />
                    <path d="M12,5.2c1.28,0 2.43,0.44 3.34,1.3l2.5,-2.5C16.32,2.62 14.35,1.8 12,1.8c-3.52,0 -6.54,2 -8.01,4.92l3.35,2.66c0.78,-2.35 2.97,-4.18 5.55,-4.18z" fill="#EA4335" />
                  </g>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <div className="text-[10px] text-center text-slate-500 leading-relaxed pt-2 flex items-center justify-center gap-1.5">
            <Sparkles className="size-3 text-emerald-400" />
            <span>Secure Firebase connection. No credit card required.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
