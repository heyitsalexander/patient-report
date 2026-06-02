"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { playUp, unlockAudio } from "@/lib/sound";

const W = 440;
const H = 956;
const SOLID: Array<[number, number]> = [
  [52, 510],
  [128, 465],
  [204, 490],
  [280, 472],
  [358, 408],
];
const TIP_UP: [number, number] = [432, 358];

const SOLID_PATH = `M ${SOLID.map((p) => p.join(" ")).join(" L ")}`;
const DASH_PATH = `M ${SOLID[SOLID.length - 1].join(" ")} L ${TIP_UP.join(" ")}`;

export default function PositiveReinforcementScreen() {
  useEffect(() => {
    unlockAudio();
    const t = window.setTimeout(() => playUp(), 950);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #B5D346 0%, #53AB31 100%)",
      }}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-x-0 top-[120px] flex flex-col items-center px-6 text-center"
      >
        <div className="text-[24px] font-semibold leading-7">Your score is on the rise</div>
        <div className="mt-2 text-[16px]">
          The treatments scheduled on <span className="font-semibold">June 10</span>
        </div>
      </motion.div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-pos" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrow-pos"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="white" />
          </marker>
        </defs>

        {/* Solid line draws in */}
        <motion.path
          d={SOLID_PATH}
          fill="none"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 0.85 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{ filter: "url(#glow-pos)" }}
        />

        {/* Solid line endpoint dots — pop in sequence */}
        {SOLID.map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={5}
            fill="white"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.25 + i * 0.18,
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}

        {/* Dashed projection — extends UP after solid line completes.
            Use opacity reveal + clip rather than pathLength so the dash gaps stay visible. */}
        <motion.g
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.1 }}
        >
          <path
            d={DASH_PATH}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="8 8"
            markerEnd="url(#arrow-pos)"
          />
        </motion.g>

        {/* Endpoint glow ring at the rising peak */}
        <motion.circle
          cx={TIP_UP[0]}
          cy={TIP_UP[1]}
          r={9}
          fill="rgba(255,255,255,0.25)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.6, 1.2, 1.6, 1.2], opacity: [0, 0.8, 0.4, 0.8, 0.4] }}
          transition={{ delay: 1.8, duration: 2.2, repeat: Infinity, repeatDelay: 0.3 }}
        />
      </svg>

      {/* Treatment chips */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        className="absolute inset-x-4 bottom-[120px] rounded-3xl border border-white/40 bg-white/5 backdrop-blur-sm"
      >
        <ChipRow num={7} label="Molar tooth-colored filling" />
        <div className="mx-4 h-px bg-white/20" />
        <ChipRow num={26} label="Tooth-colored filling" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="absolute inset-x-0 bottom-[68px] text-center text-[14px]"
      >
        Swipe up
      </motion.div>
    </div>
  );
}

function ChipRow({ num, label }: { num: number; label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/60 text-[14px] font-medium"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {num}
      </div>
      <div className="text-[16px]">{label}</div>
    </div>
  );
}
