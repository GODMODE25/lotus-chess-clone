import type { Metadata } from "next";
import "@fontsource/teko/400.css";
import "@fontsource/teko/500.css";
import "@fontsource/teko/600.css";
import "@fontsource/teko/700.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/source-sans-3/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "OE Chess | Precision Training",
  description: "A premium high-tech chess laboratory for mastering openings and endgames.",
  icons: {
    icon: "/favicon.png",
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
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        <AuthProvider>
          <BoardSettingsProvider>
            {children}
          </BoardSettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
