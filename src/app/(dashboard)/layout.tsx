"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  Crown,
  LayoutDashboard,
  Swords,
  BookOpen,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  User,
  Flame,
  UserCircle
} from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOutUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07100d] text-emerald-300">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-emerald-300 border-t-transparent" />
          <p className="text-sm font-medium tracking-wide">Syncing session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Openings", href: "/practice/openings", icon: Swords },
    { name: "Endgames", href: "/practice/endgames", icon: Flame },
    { name: "Library", href: "/library", icon: BookOpen },
    { name: "Profile", href: "/profile", icon: UserCircle },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07100d] text-slate-100 font-sans">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 w-full border-b border-white/5 bg-[#0b120f]/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Brand logo */}
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-md bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20">
                  <Crown className="size-4.5" />
                </div>
                <div>
                  <span className="text-base font-bold tracking-tight text-white block leading-none">OE Chess</span>
                  <span className="text-[9px] text-emerald-400/80 font-medium">Study Engine</span>
                </div>
              </Link>

              {/* Desktop Nav Items */}
              <nav className="hidden md:flex items-center gap-1.5" aria-label="Desktop navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                        active
                          ? "bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 shadow-inner"
                          : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <Icon className="size-3.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Right: User Profile & Logout (Desktop) */}
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex size-7 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                  <User className="size-3.5" />
                </div>
                <div className="max-w-[120px] overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate leading-none mb-0.5">{user.displayName}</p>
                  <p className="text-[9px] text-slate-500 truncate leading-none">
                    {user.isGuest ? "Guest" : user.email}
                  </p>
                </div>
              </div>

              <button
                onClick={() => signOutUser()}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-transparent transition-colors"
              >
                <LogOut className="size-3.5" />
                Sign Out
              </button>
            </div>

            {/* Mobile Header Menu Toggle Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex size-9 items-center justify-center rounded-md border border-white/10 text-slate-300 hover:bg-white/5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-25 bg-[#07100d] px-4 py-6 md:hidden animate-fade-in">
          <nav className="space-y-2" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? "bg-emerald-400/15 text-emerald-300 border border-emerald-400/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="size-5" />
                  {item.name}
                </Link>
              );
            })}

            <hr className="border-white/5 my-4" />

            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 mb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300">
                <User className="size-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{user.displayName}</p>
                <p className="text-xs text-slate-400 truncate">
                  {user.isGuest ? "Guest Account" : user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOutUser();
              }}
              className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-rose-400 hover:bg-rose-500/10"
            >
              <LogOut className="size-5" />
              Sign Out
            </button>
          </nav>
        </div>
      )}

      {/* Main Content Pane */}
      <main className="flex-1 px-4 py-6 md:px-8 md:py-8 max-w-7xl w-full mx-auto space-y-8">
        <div key={pathname} className="animate-page-enter">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-[#090f0c] px-4 py-5 text-center text-xs text-slate-500 md:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-2 max-w-7xl mx-auto w-full">
          <span>OE Chess study portal &copy; 2026</span>
          <span className="flex items-center justify-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Connected: {user.isGuest ? "Offline Demo Mode" : "Firebase Cloud Sync"}
          </span>
        </div>
      </footer>
    </div>
  );
}
