import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OE Chess | Opening and Endgame Trainer",
  description: "A modern chess study app for interactive opening and endgame practice with adaptive review.",
  openGraph: {
    title: "OE Chess | Opening and Endgame Trainer",
    description: "Interactive chess learning with spaced repetition, mastery ranks, and browser engine analysis.",
    type: "website",
  },
  icons: {
    icon: "/favicon.png?v=3",
  },
};

import { AuthProvider } from "@/features/auth/AuthContext";
import { BoardSettingsProvider } from "@/features/trainer/BoardSettingsContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col w-full max-w-[100vw] overflow-x-hidden">
        <AuthProvider>
          <BoardSettingsProvider>
            {children}
          </BoardSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
