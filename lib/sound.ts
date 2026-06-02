"use client";

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") {
    void ctx.resume();
  }
  return ctx;
}

export function unlockAudio() {
  getCtx();
}

type ToneOpts = {
  freq: number;
  duration: number;
  delay?: number;
  type?: OscillatorType;
  gain?: number;
};

function tone({ freq, duration, delay = 0, type = "sine", gain = 0.15 }: ToneOpts) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

function sweep({
  start,
  end,
  duration,
  delay = 0,
  type = "sine",
  gain = 0.18,
}: {
  start: number;
  end: number;
  duration: number;
  delay?: number;
  type?: OscillatorType;
  gain?: number;
}) {
  const c = getCtx();
  if (!c) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(start, t0);
  osc.frequency.exponentialRampToValueAtTime(end, t0 + duration);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.04);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g).connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}

/** Bright ascending arpeggio — C5 E5 G5 C6 */
export function playUp() {
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((f, i) => tone({ freq: f, duration: 0.25, delay: i * 0.09, type: "triangle", gain: 0.12 }));
  sweep({ start: 400, end: 1400, duration: 0.45, delay: 0, type: "sine", gain: 0.05 });
}

/** Darker descending arpeggio — C5 Ab4 F4 C4 */
export function playDown() {
  const notes = [523.25, 415.3, 349.23, 261.63];
  notes.forEach((f, i) => tone({ freq: f, duration: 0.28, delay: i * 0.1, type: "triangle", gain: 0.12 }));
  sweep({ start: 700, end: 200, duration: 0.5, delay: 0, type: "sine", gain: 0.05 });
}

/** Soft tick for swipe navigation */
export function playTick() {
  tone({ freq: 880, duration: 0.06, type: "sine", gain: 0.05 });
}

/** Score-rising chime — used during oral score climb */
export function playScoreRise() {
  sweep({ start: 300, end: 1000, duration: 1.4, type: "sine", gain: 0.06 });
  const notes = [523.25, 587.33, 659.25, 783.99];
  notes.forEach((f, i) =>
    tone({ freq: f, duration: 0.22, delay: 0.2 + i * 0.22, type: "triangle", gain: 0.08 }),
  );
}
