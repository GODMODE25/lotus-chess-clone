"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Swords,
  BookOpen,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  User,
  Flame,
  UserCircle,
  Activity,
  ChevronRight,
  Hexagon
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSystemStatus } from "@/features/dashboard/useSystemStatus";
import { getProgressRecords } from "@/services/db/progress";
import { calculateDashboardSnapshot } from "@/services/learning/stats";
import type { DashboardSnapshot } from "@/types/lotus";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);
  const systemStatus = useSystemStatus();
  const [snapshot, setSnapshot] = useState<DashboardSnapshot | null>(null);
  const [snapshotLoading, setSnapshotLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    const currentUser = user;
    async function loadStats() {
      try {
        const records = await getProgressRecords(currentUser.uid, currentUser.isGuest ?? false);
        const snap = calculateDashboardSnapshot(records);
        setSnapshot(snap);
      } catch (err) {
        console.error("Failed to load footer stats:", err);
      } finally {
        setSnapshotLoading(false);
      }
    }
    loadStats();
  }, [user]);

  if (loading || !user) {
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
          <div className="flex flex-col items-center">
            <p className="font-heading text-2xl tracking-[0.3em] text-white uppercase">Initializing</p>
            <p className="text-[10px] font-mono font-bold tracking-[0.5em] text-primary/50 uppercase mt-1">Quantum Link Secure</p>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Terminal", href: "/dashboard", icon: LayoutDashboard },
    { name: "Openings", href: "/practice/openings", icon: Swords },
    { name: "Endgames", href: "/practice/endgames", icon: Flame },
    { name: "Profile", href: "/profile", icon: UserCircle },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body grid-dots selection:bg-primary/30 selection:text-primary">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl relative">
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-20 items-center justify-between relative">
            <div className="flex items-center gap-12">
              <Link href="/dashboard" className="flex items-center gap-4 group">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary shadow-neon group-hover:border-primary/50 transition-all duration-500 flex-shrink-0">
                  <Hexagon className="size-5 fill-primary/10" />
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-2xl font-heading font-bold tracking-tight text-white uppercase leading-none">
                    OE <span className="text-primary">Chess Lab</span>
                  </span>
                  <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)] flex-shrink-0" />
                </div>
              </Link>
            </div>

            {/* Desktop Nav - Centered */}
            <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-1" aria-label="Desktop navigation">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative flex items-center gap-2.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${active
                      ? "text-primary"
                      : "text-slate-500 hover:text-slate-200"
                      }`}
                  >
                    <Icon className={`size-3.5 transition-transform ${active ? "scale-110" : "group-hover:scale-110"}`} />
                    {item.name}
                    {active && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute -bottom-[20px] left-2 right-2 h-0.5 bg-primary shadow-neon"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-heading font-medium text-white">{user.displayName || "Grandmaster Alpha"}</p>
                  <p className="text-[10px] font-mono text-white/40">ID: {user.uid.slice(0, 8).toUpperCase()}-OE-CH</p>
                </div>
                <div className="relative">
                  <button
                    ref={avatarButtonRef}
                    type="button"
                    onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                    aria-haspopup="menu"
                    aria-expanded={avatarMenuOpen}
                    aria-label="Account menu"
                    className="relative block size-12 rounded-full border-2 border-white/10 hover:border-primary/50 transition-all overflow-hidden bg-white/5 shadow-inner focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "Avatar"} className="size-full object-cover" />
                    ) : (
                      <div className="size-full flex items-center justify-center text-white/20">
                        <User className="size-6" />
                      </div>
                    )}
                  </button>
                  {/* Green "online" status dot — kept outside the button so it is not clipped by overflow-hidden, and placed top-right so it stays visible at the top of the page */}
                  <div className="absolute -bottom-0.5 -right-0.5 size-3.0 rounded-full bg-primary border-2 border-background shadow-neon z-10" />

                  <AnimatePresence>
                    {avatarMenuOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-[100]"
                          onClick={() => setAvatarMenuOpen(false)}
                          aria-hidden="true"
                        />
                        <motion.div
                          initial={{ opacity: 0, y: -8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -8, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          role="menu"
                          style={
                            avatarButtonRef.current
                              ? {
                                position: "fixed",
                                top: avatarButtonRef.current.getBoundingClientRect().bottom + 4,
                                right: window.innerWidth - avatarButtonRef.current.getBoundingClientRect().right,
                              }
                              : undefined
                          }
                          className="z-[101] w-48 rounded-xl border border-white/10 bg-cyber-glass p-2 shadow-2xl backdrop-blur-2xl"
                        >
                          <Link
                            href="/profile"
                            role="menuitem"
                            onClick={() => setAvatarMenuOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                          >
                            <UserCircle className="size-4 text-primary" />
                            Profile
                          </Link>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setAvatarMenuOpen(false);
                              signOutUser();
                            }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10"
                          >
                            <LogOut className="size-4" />
                            Logout
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex xl:hidden size-10 items-center justify-center rounded-lg border border-white/10 text-slate-300 hover:bg-white/5 active:scale-95 transition-all"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-cyber-glass backdrop-blur-2xl border-l border-white/5 xl:hidden"
            >
              <div className="flex flex-col h-full p-8 pt-20">
                <div className="flex items-center justify-between mb-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono font-bold text-primary/50 uppercase tracking-[0.4em]">Nodes</p>
                    <div className="h-px w-24 bg-primary/30 shadow-neon" />
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-500">
                    <X className="size-6" />
                  </button>
                </div>

                <nav className="space-y-3">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-xl transition-all border ${active
                          ? "bg-primary text-background border-primary shadow-neon"
                          : "text-slate-400 border-white/5 hover:bg-white/5 hover:text-white"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <Icon className="size-5" />
                          <span className="font-heading text-2xl tracking-widest uppercase">{item.name}</span>
                        </div>
                        <ChevronRight className={`size-5 opacity-50 ${active ? "text-background" : ""}`} />
                      </Link>
                    );
                  })}
                </nav>

                <div className="mt-auto space-y-6 pt-10 border-t border-white/5">
                  <div className="flex items-center gap-4 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    <div className="size-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-slate-400 shadow-inner">
                      <UserCircle className="size-6" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-white font-bold tracking-tight truncate">{user.displayName || "Grandmaster Alpha"}</p>
                      <p className="text-[9px] font-mono text-slate-500 font-bold uppercase tracking-widest truncate">{user.isGuest ? "GUEST_SIM" : "OPERATOR_SYNC"}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => signOutUser()}
                    className="w-full py-4 rounded-xl border border-rose-500/20 bg-rose-500/5 text-rose-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                  >
                    <LogOut className="size-4" />
                    Terminate Session
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {children}
      </main>

      {/* Footer / System Status Bar */}
      <footer className="mt-auto border-t border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden">
        <div className="absolute inset-0 scanline opacity-10 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto py-10 px-4 sm:px-8 relative z-10">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Legend Progress (replaces Engine Power) */}
            <div className="space-y-1.5 min-w-[110px]">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">Legend Progress</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${snapshotLoading ? 0 : snapshot?.legendProgress ?? 0}%` }}
                    className="h-full bg-primary/80"
                  />
                </div>
                <span className="text-[11px] font-mono text-primary/80 font-bold w-8 text-right">
                  {snapshotLoading ? "--" : `${snapshot?.legendProgress ?? 0}%`}
                </span>
              </div>
            </div>

            {/* Accuracy */}
            <div className="space-y-1 min-w-[70px] text-center">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">Accuracy</p>
              <p className="text-sm font-heading font-bold text-white/90 tracking-tight">
                {snapshotLoading ? "--" : <>{snapshot?.accuracy ?? 0}<span className="text-[10px] text-white/30 ml-0.5 font-mono">%</span></>}
              </p>
            </div>

            {/* Lessons Completed (replaces Puzzles Solved) */}
            <div className="space-y-1 min-w-[90px] text-center">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">Lessons Done</p>
              <p className="text-sm font-heading font-bold text-white/90 tracking-tight">
                {snapshotLoading ? "--" : (snapshot?.lessonsCompleted ?? 0).toLocaleString()}
              </p>
            </div>

            {/* Engine Nodes - real via useSystemStatus */}
            <div className="space-y-1 min-w-[90px] text-center">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">Engine Nodes</p>
              <p className="text-sm font-heading font-bold text-accent/80 tracking-tight">{systemStatus.nodes}</p>
            </div>

            {/* Study Time (replaces Session Time) */}
            <div className="space-y-1 min-w-[80px] text-center">
              <p className="text-[9px] font-mono text-white/30 uppercase tracking-[0.15em]">Study Time</p>
              <p className="text-sm font-heading font-bold text-white/90 tracking-tight">
                {snapshotLoading ? "--" : `${snapshot?.studiedMinutes ?? 0} min`}
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em]">OE_LAB_v4.0.2</span>
              <div className="h-4 w-px bg-white/10" />
              <div className="flex items-center gap-2 text-primary/60">
                <Activity className="size-3" />
                <span className="text-[9px] font-mono uppercase tracking-widest animate-pulse font-bold">Neural_Sync_Active</span>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="size-1.5 rounded-full bg-primary shadow-neon"
                />
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-bold">
                  {user.isGuest ? "Local_Simulation" : "Verified_Cloud_Stream"}
                </span>
              </div>
              <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em] font-bold">&copy; 2026_RESEARCH_FACULTY</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
