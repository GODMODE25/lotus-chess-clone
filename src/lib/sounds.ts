/**
 * Lightweight, dependency-free sound system using the Web Audio API.
 *
 * All tones are synthesized programmatically (no binary audio assets required).
 * The enabled flag is read from the same localStorage source of truth used by
 * BoardSettingsContext (key "oe_board_settings", field "soundEnabled"), so the
 * settings toggle and these helpers stay in sync. When no React context is
 * available (e.g. events fired outside the tree), the value is read directly
 * from localStorage.
 */

const BOARD_SETTINGS_KEY = "oe_board_settings";

export type SoundEvent =
  | "move"
  | "correct"
  | "incorrect"
  | "error"
  | "complete"
  | "victory"
  | "defeat";

// Lazily-created singleton AudioContext (guarded for SSR / non-browser envs).
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (audioContext) return audioContext;
  try {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    audioContext = new Ctor();
  } catch {
    audioContext = null;
  }
  return audioContext;
}

/** Read the enabled flag from the shared board-settings localStorage source. */
export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const saved = window.localStorage.getItem(BOARD_SETTINGS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as { soundEnabled?: boolean };
      if (typeof parsed.soundEnabled === "boolean") return parsed.soundEnabled;
    }
  } catch {
    /* ignore malformed storage */
  }
  return true; // default matches BoardSettingsContext default
}

/** Persist the enabled flag into the shared board-settings localStorage source. */
export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    let current: Record<string, unknown> = {};
    const saved = window.localStorage.getItem(BOARD_SETTINGS_KEY);
    if (saved) current = JSON.parse(saved) as Record<string, unknown>;
    current.soundEnabled = enabled;
    window.localStorage.setItem(BOARD_SETTINGS_KEY, JSON.stringify(current));
  } catch {
    /* ignore storage failures */
  }
}

interface ToneSpec {
  freq: number;
  type?: OscillatorType;
  start: number; // seconds offset from now
  duration: number; // seconds
  gain?: number; // peak gain (0..1)
}

function playTones(tones: ToneSpec[]): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Browsers suspend AudioContext until a user gesture; resume if needed.
  if (ctx.state === "suspended") {
    void ctx.resume();
  }

  const now = ctx.currentTime;
  for (const tone of tones) {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const peak = tone.gain ?? 0.18;
    const startAt = now + tone.start;
    const endAt = startAt + tone.duration;

    osc.type = tone.type ?? "sine";
    osc.frequency.setValueAtTime(tone.freq, startAt);

    // Simple attack/decay envelope to avoid clicks.
    gainNode.gain.setValueAtTime(0.0001, startAt);
    gainNode.gain.exponentialRampToValueAtTime(peak, startAt + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endAt);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(startAt);
    osc.stop(endAt + 0.02);
  }
}

const SOUND_RECIPES: Record<SoundEvent, ToneSpec[]> = {
  // Soft click / blip
  move: [{ freq: 320, type: "triangle", start: 0, duration: 0.08, gain: 0.12 }],
  // Pleasant rising tone
  correct: [
    { freq: 523.25, type: "sine", start: 0, duration: 0.12, gain: 0.16 },
    { freq: 783.99, type: "sine", start: 0.09, duration: 0.16, gain: 0.16 },
  ],
  // Low buzz (illegal / deviation)
  incorrect: [{ freq: 140, type: "sawtooth", start: 0, duration: 0.22, gain: 0.14 }],
  error: [{ freq: 120, type: "square", start: 0, duration: 0.24, gain: 0.12 }],
  // Short ascending arpeggio (line complete / victory)
  complete: [
    { freq: 523.25, type: "sine", start: 0, duration: 0.12, gain: 0.16 },
    { freq: 659.25, type: "sine", start: 0.1, duration: 0.12, gain: 0.16 },
    { freq: 783.99, type: "sine", start: 0.2, duration: 0.18, gain: 0.16 },
  ],
  victory: [
    { freq: 523.25, type: "triangle", start: 0, duration: 0.12, gain: 0.18 },
    { freq: 659.25, type: "triangle", start: 0.1, duration: 0.12, gain: 0.18 },
    { freq: 783.99, type: "triangle", start: 0.2, duration: 0.12, gain: 0.18 },
    { freq: 1046.5, type: "triangle", start: 0.3, duration: 0.24, gain: 0.18 },
  ],
  // Descending tone (defeat)
  defeat: [
    { freq: 440, type: "sawtooth", start: 0, duration: 0.16, gain: 0.14 },
    { freq: 349.23, type: "sawtooth", start: 0.14, duration: 0.16, gain: 0.14 },
    { freq: 261.63, type: "sawtooth", start: 0.28, duration: 0.26, gain: 0.14 },
  ],
};

/** Play a named sound event. No-op when sound is disabled or unsupported. */
export function playSound(event: SoundEvent): void {
  if (!isSoundEnabled()) return;
  const recipe = SOUND_RECIPES[event];
  if (!recipe) return;
  try {
    playTones(recipe);
  } catch {
    /* audio failures should never break gameplay */
  }
}

// Convenience aliases matching the requested event names.
export const playMove = () => playSound("move");
export const playCorrect = () => playSound("correct");
export const playIncorrect = () => playSound("incorrect");
export const playError = () => playSound("error");
export const playComplete = () => playSound("complete");
export const playVictory = () => playSound("victory");
export const playDefeat = () => playSound("defeat");
