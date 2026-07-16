"use client";

import React, { useEffect, useState } from "react";
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
  Shield,
  Zap,
  Hexagon,
  Cpu
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSystemStatus } from "@/features/dashboard/useSystemStatus";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const systemStatus = useSystemStatus();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

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
    { name: "Library", href: "/library", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: UserCircle },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-body grid-dots selection:bg-primary/30 selection:text-primary">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 scanline opacity-30 pointer-events-none" />
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/dashboard" className="flex items-center gap-4 group">
                <div className="flex size-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 text-primary shadow-neon group-hover:border-primary/50 transition-all duration-500">
                  <Hexagon className="size-5 fill-primary/10" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-heading font-bold tracking-tight text-white block leading-none uppercase">
                    OE <span className="text-primary">Chess Lab</span>
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  </div>
                </div>
              </Link>

              
            </div>

            <div className="flex items-center gap-6">
              {/* Desktop Nav */}
              <nav className="hidden xl:flex items-center gap-1" aria-label="Desktop navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative flex items-center gap-2.5 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${
                        active
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

              <div className="flex items-center gap-4 border-l border-white/5 pl-6">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-heading font-medium text-white">{user.displayName || "Grandmaster Alpha"}</p>
                  <p className="text-[10px] font-mono text-white/40">ID: {user.uid.slice(0, 8).toUpperCase()}-OE-CH</p>
                </div>
                <div className="relative group">
                  <div className="size-12 rounded-full border-2 border-white/10 group-hover:border-primary/50 transition-all overflow-hidden bg-white/5 shadow-inner">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || "Avatar"} className="size-full object-cover" />
                    ) : (
                      <div className="size-full flex items-center justify-center text-white/20">
                        <User className="size-6" />
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full bg-primary border-2 border-background shadow-neon" />
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
                        className={`flex items-center justify-between p-4 rounded-xl transition-all border ${
                          active
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
            <div className="space-y-3">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Engine Power</p>
              <div className="flex items-center gap-3">
                <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5 p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    className="h-full bg-primary shadow-neon" 
                  />
                </div>
                <span className="text-xs font-mono text-primary font-bold">85%</span>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Accuracy</p>
              <p className="text-2xl font-heading font-bold text-white tracking-tight">98.2<span className="text-xs text-white/30 ml-1 font-mono">%</span></p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Puzzles Solved</p>
              <p className="text-2xl font-heading font-bold text-white tracking-tight">14,209</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Engine Nodes</p>
              <p className="text-2xl font-heading font-bold text-accent tracking-tight">{systemStatus.nodes}</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Session Time</p>
              <p className="text-2xl font-heading font-bold text-white tracking-tight">04:22:15</p>
            </div>

            <div className="flex items-center justify-end">
              <button className="px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-heading font-bold tracking-widest uppercase hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white">
                System Reboot
              </button>
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
