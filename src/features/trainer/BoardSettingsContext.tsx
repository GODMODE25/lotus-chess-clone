"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface BoardSettings {
  highlightValidMoves: boolean;
  showNotation: boolean;
  clickToMove: boolean;
}

interface BoardSettingsContextType extends BoardSettings {
  setHighlightValidMoves: (val: boolean) => void;
  setShowNotation: (val: boolean) => void;
  setClickToMove: (val: boolean) => void;
  toggleHighlightValidMoves: () => void;
  toggleShowNotation: () => void;
  toggleClickToMove: () => void;
}

const BoardSettingsContext = createContext<BoardSettingsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "oe_board_settings";

const defaultSettings: BoardSettings = {
  highlightValidMoves: true,
  showNotation: true,
  clickToMove: true,
};

export function BoardSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<BoardSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.error("Failed to load board settings:", e);
    }
    setMounted(true);
  }, []);

  // Save to localStorage when settings change
  const updateSetting = <K extends keyof BoardSettings>(key: K, value: BoardSettings[K]) => {
    setSettings((prev) => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save board settings:", e);
      }
      return updated;
    });
  };

  const setHighlightValidMoves = (val: boolean) => updateSetting("highlightValidMoves", val);
  const setShowNotation = (val: boolean) => updateSetting("showNotation", val);
  const setClickToMove = (val: boolean) => updateSetting("clickToMove", val);

  const toggleHighlightValidMoves = () => updateSetting("highlightValidMoves", !settings.highlightValidMoves);
  const toggleShowNotation = () => updateSetting("showNotation", !settings.showNotation);
  const toggleClickToMove = () => updateSetting("clickToMove", !settings.clickToMove);

  return (
    <BoardSettingsContext.Provider
      value={{
        ...settings,
        setHighlightValidMoves,
        setShowNotation,
        setClickToMove,
        toggleHighlightValidMoves,
        toggleShowNotation,
        toggleClickToMove,
      }}
    >
      {children}
    </BoardSettingsContext.Provider>
  );
}

export function useBoardSettings() {
  const context = useContext(BoardSettingsContext);
  if (context === undefined) {
    throw new Error("useBoardSettings must be used within a BoardSettingsProvider");
  }
  return context;
}
