"use client";

import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { useEffect, useState } from "react";
import { playScoreRise, unlockAudio } from "@/lib/sound";

const START_SCORE = 58;
const END_SCORE = 70;

const HIGH_TOP = "#FFA15D";
const HIGH_BOTTOM = "#CD2331";
const MOD_TOP = "#FFBF68";
const MOD_BOTTOM = "#FB982A";

// Dial geometry — arc spans 270° centered on top (gap at the bottom)
const SIZE = 200;
const STROKE = 14;
const R = (SIZE - STROKE) / 2;
const CX = SIZE / 2;
const CY = SIZE / 2;
const START_ANGLE = -135; // degrees, 0 = top, clockwise positive
const END_ANGLE = 135;
const SWEEP = END_ANGLE - START_ANGLE; // 270

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function arcPath(startA: number, endA: number) {
  const s = polar(startA, R);
  const e = polar(endA, R);
  const large = endA - startA > 180 ? 1 : 0;
  return `M ${s.x} ${s.y} A ${R} ${R} 0 ${large} 1 ${e.x} ${e.y}`;
}

const TRACK_PATH = arcPath(START_ANGLE, END_ANGLE);

export default function OralScoreScreen() {
  const score = useMotionValue(START_SCORE);
  const [displayScore, setDisplayScore] = useState(START_SCORE);

  // 0 (empty) → 1 (full) along the 270° arc
  const fillFraction = useTransform(score, (s) => Math.max(0, Math.min(1, s / 100)));
  // strokeDasharray needs `${visible} ${hidden}` with pathLength="1"
  const dashArray = useTransform(fillFraction, (f) => `${f} 1`);

  const tipAngle = useTransform(score, (s) => START_ANGLE + (s / 100) * SWEEP);
  const tipX = useTransform(tipAngle, (a) => polar(a, R).x);
  const tipY = useTransform(tipAngle, (a) => polar(a, R).y);

  // Color crossfade: 58 → 67 red, then ramp to orange by 70
  const colorProgress = useTransform(score, [START_SCORE, END_SCORE], [0, 1]);
  const bgTop = useTransform(colorProgress, [0, 1], [HIGH_TOP, MOD_TOP]);
  const bgBottom = useTransform(colorProgress, [0, 1], [HIGH_BOTTOM, MOD_BOTTOM]);
  const background = useTransform(
    [bgTop, bgBottom],
    ([t, b]) => `linear-gradient(180deg, ${t} 0%, ${b} 100%)`,
  );

  const riskLabel = useTransform(score, (s) => (s < 67 ? "High risk" : "Moderate risk"));
  const [riskText, setRiskText] = useState("High risk");
  useMotionValueEvent(score, "change", (v) => setDisplayScore(Math.round(v)));
  useMotionValueEvent(riskLabel, "change", (v) => setRiskText(v));

  useEffect(() => {
    unlockAudio();
    const t = window.setTimeout(() => {
      playScoreRise();
      animate(score, END_SCORE, {
        duration: 1.8,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1],
      });
    }, 400);
    return () => window.clearTimeout(t);
  }, [score]);

  return (
    <motion.div
      style={{ background }}
      className="relative flex h-full w-full flex-col items-center px-6 pt-[80px] pb-[120px] text-white"
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        <div className="text-[24px] font-semibold leading-7">Your Oral Score</div>
        <div className="mt-1 text-[16px] font-medium">May 23, 2026</div>
      </motion.div>

      <div className="mt-[100px] flex flex-1 items-center justify-center">
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 overflow-visible">
            <path
              d={TRACK_PATH}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={STROKE}
              strokeLinecap="round"
            />
            <motion.path
              d={TRACK_PATH}
              pathLength={1}
              fill="none"
              stroke="white"
              strokeWidth={STROKE}
              strokeLinecap="round"
              style={{ strokeDasharray: dashArray }}
            />
            <motion.circle
              r={7}
              fill="#FDAE4E"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={3}
              style={{ cx: tipX, cy: tipY }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <motion.div
              key={displayScore}
              initial={{ scale: 1.06, opacity: 0.75 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.12 }}
              className="text-[64px] font-light leading-none"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {displayScore}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="mt-3 text-[14px] font-medium"
            >
              {riskText}
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.5 }}
        className="mb-8 w-full max-w-[408px] rounded-3xl border border-white/40 px-4 py-3"
      >
        <div className="flex items-center gap-3">
          <DeltaPill value={12} direction="up" />
          <p className="text-[16px] leading-snug">
            Your dental health is improving, filling two cavities helped increase your score
            since your last visit
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2.4, duration: 0.6 }}
        className="text-[14px]"
      >
        Swipe up
      </motion.div>
    </motion.div>
  );
}

function DeltaPill({ value, direction }: { value: number; direction: "up" | "down" }) {
  const isUp = direction === "up";
  return (
    <div className="flex h-[66px] w-[32px] shrink-0 flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/20 text-white">
      <div className="text-[12px] leading-none">{isUp ? "↑" : "↓"}</div>
      <div
        className="mt-1 text-[16px] font-medium leading-none"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </div>
    </div>
  );
}
