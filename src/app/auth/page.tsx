"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Sparkles, AlertCircle, Cpu, Shield, Activity, Hexagon, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

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

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const runAuthAction = async () => {
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
      setLocalError(err?.message || "An authentication error occurred.");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await runAuthAction();
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    try {
      await signInWithGoogle();
    } catch {
      // Error surfaced via AuthContext `error`; nothing else to do here.
    }
  };

  if (loading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-primary grid-dots">
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
              borderColor: ["#00f0ff", "#bd00ff", "#00f0ff"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="size-16 rounded-full border-2 border-primary border-t-transparent shadow-neon"
          />
          <div className="flex flex-col items-center text-center">
            <p className="font-heading text-2xl tracking-[0.3em] text-white uppercase">Initializing</p>
            <p className="text-[10px] font-mono font-bold tracking-[0.5em] text-primary/50 uppercase mt-1">Quantum Link Secure</p>
          </div>
        </div>
      </div>
    );
  }

  const activeError = localError || error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative overflow-hidden grid-dots selection:bg-primary/30 selection:text-primary">
      {/* Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] size-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-5%] size-[800px] rounded-full bg-accent/5 blur-[150px]" />
        
        {/* Animated Scanning Line */}
        <div className="absolute inset-0 scanline opacity-30 z-0" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div 
            whileHover={{ rotate: 90 }}
            className="flex size-20 items-center justify-center rounded-2xl bg-white/5 border border-primary/30 text-primary shadow-neon mb-6 transition-all duration-500"
          >
            <Hexagon className="size-10 fill-primary/10" />
          </motion.div>
          <h1 className="text-6xl font-heading font-bold tracking-tighter mb-2 text-white leading-none uppercase">
            OE <span className="text-primary">Chess Lab</span>
          </h1>
          <div className="flex items-center gap-3 text-slate-500">
            <div className="h-px w-8 bg-white/5" />
            <p className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-white/30">Strategic Analysis Platform</p>
            <div className="h-px w-8 bg-white/5" />
          </div>
        </div>

        <div className="glass-panel rounded-3xl p-1 shadow-2xl overflow-hidden corner-accent corner-tl corner-tr corner-bl corner-br">
          <div className="bg-black/80 p-6 sm:p-10 rounded-[28px] relative overflow-hidden">
            <div className="absolute inset-0 grid-dots opacity-10 pointer-events-none" />

            {/* Mode Switcher */}
            <div className="flex gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5 mb-10">
              {(["signin", "signup", "guest"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-mono font-bold uppercase tracking-widest transition-all relative overflow-hidden group ${
                    mode === tab ? "text-background" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  <span className="relative z-10">
                    {tab === "signin" ? "AUTH_LINK" : tab === "signup" ? "NEW_NODE" : "SIM_BOOT"}
                  </span>
                  {mode === tab && (
                    <motion.div layoutId="activeTab" className="absolute inset-0 bg-primary shadow-neon" />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {mode !== "guest" ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                          <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Credentials_ID</label>
                          <span className="text-[8px] font-mono text-primary/40 uppercase">Awaiting_Input</span>
                        </div>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-colors" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="OPERATOR@FACULTY.NET"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-white/10 font-mono tracking-tight text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-end px-1">
                          <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Encryption_Key</label>
                          <Lock className="size-3 text-white/10" />
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-colors" />
                          <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-white/10 text-white"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-end px-1">
                        <label className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/30">Temporary_ID</label>
                        <Activity className="size-3 text-primary/40 animate-pulse" />
                      </div>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-white/20 group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="UNIDENTIFIED_USER"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-white/10 font-mono text-white"
                        />
                      </div>
                    </div>
                  )}

                  {activeError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col gap-3 text-rose-400 text-[10px] font-mono font-bold bg-rose-400/5 border border-rose-400/20 p-4 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="size-4 shrink-0 mt-0.5" />
                        <span className="leading-relaxed tracking-wider uppercase">{activeError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={runAuthAction}
                        disabled={submitLoading}
                        className="self-start flex items-center gap-2 rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-[9px] uppercase tracking-widest text-rose-200 hover:bg-rose-400/20 transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={cn("size-3", submitLoading && "animate-spin")} />
                        Retry
                      </button>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="w-full py-5 bg-primary text-background font-heading text-2xl tracking-[0.2em] uppercase hover:bg-primary/90 hover:shadow-neon-strong transition-all disabled:opacity-50 relative overflow-hidden group rounded-xl"
                  >
                    <div className="absolute inset-0 scanline opacity-20 pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {submitLoading ? (
                        <>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="size-4 rounded-full border-2 border-background border-t-transparent"
                          />
                          Synchronizing
                        </>
                      ) : (
                        mode === "signin" ? "Establish Link" : mode === "signup" ? "Initialize Data" : "Boot Simulation"
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500 skew-x-12" />
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>

            {mode !== "guest" && (
              <div className="mt-10 space-y-6">
                <div className="relative flex items-center">
                  <div className="flex-grow h-px bg-white/5"></div>
                  <span className="mx-4 text-[8px] font-mono font-black text-white/20 tracking-[0.4em] uppercase">Alternative_Verify</span>
                  <div className="flex-grow h-px bg-white/5"></div>
                </div>

                <button
                  onClick={handleGoogleSignIn}
                  className="w-full py-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] text-[9px] font-mono font-bold tracking-[0.2em] flex items-center justify-center gap-3 transition-all group text-white/50 hover:text-white/80"
                >
                  <svg className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor" opacity="0.8"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="currentColor" opacity="0.6"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor" opacity="0.4"/>
                  </svg>
                  GOOGLE_SECURE_VAULT
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-primary/10 border-t border-primary/20 p-2 flex justify-between items-center px-6">
            <div className="flex gap-6">
              <span className="text-[8px] font-mono text-primary/60 uppercase tracking-widest font-bold">SYS_V4.0.2</span>
              <span className="text-[8px] font-mono text-primary/60 uppercase tracking-widest font-bold">LOC: CORE_SERVER</span>
            </div>
            <div className="flex gap-2 items-center">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="size-1 rounded-full bg-primary shadow-neon" 
              />
              <span className="text-[8px] font-mono text-primary tracking-widest uppercase font-bold">Secure_Feed</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3 text-white/10">
            <Shield className="size-3" />
            <span className="text-[8px] font-mono font-bold tracking-[0.5em] uppercase">Quantum_Encrypted_Link</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
