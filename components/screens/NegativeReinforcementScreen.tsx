"use client";

import { motion } from "motion/react";
import { useEffect } from "react";
import { playDown, unlockAudio } from "@/lib/sound";

const W = 440;
const H = 956;
const SOLID: Array<[number, number]> = [
  [52, 510],
  [128, 465],
  [204, 490],
  [280, 472],
  [358, 408],
];
const PEAK: [number, number] = [414, 380]; // small rise after solid
const TIP_DOWN: [number, number] = [432, 462]; // then drops down

const SOLID_PATH = `M ${SOLID.map((p) => p.join(" ")).join(" L ")}`;
const DASH_UP_PATH = `M ${SOLID[SOLID.length - 1].join(" ")} L ${PEAK.join(" ")}`;
const DASH_DOWN_PATH = `M ${PEAK.join(" ")} L ${TIP_DOWN.join(" ")}`;

export default function NegativeReinforcementScreen() {
  useEffect(() => {
    unlockAudio();
    const t = window.setTimeout(() => playDown(), 1200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden text-white"
      style={{
        background: "linear-gradient(180deg, #FFA15D 0%, #CD2331 100%)",
      }}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-x-0 top-[120px] flex flex-col items-center px-6 text-center"
      >
        <div className="text-[24px] font-semibold leading-7">Protect your oral health</div>
        <div className="mt-2 text-[16px]">Delaying these treatments will lower your score</div>
      </motion.div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-neg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrow-neg"
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
          style={{ filter: "url(#glow-neg)" }}
        />

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
            }}
          />
        ))}

        {/* Brief rise (dashed) */}
        <motion.g
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.45, ease: "easeOut", delay: 1.1 }}
        >
          <path
            d={DASH_UP_PATH}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="8 8"
          />
        </motion.g>

        {/* Peak marker — empty ring */}
        <motion.circle
          cx={PEAK[0]}
          cy={PEAK[1]}
          r={5}
          fill="transparent"
          stroke="white"
          strokeWidth={2}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        />

        {/* Then the score drops */}
        <motion.g
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.7, ease: [0.55, 0.1, 0.8, 0.6], delay: 1.55 }}
        >
          <path
            d={DASH_DOWN_PATH}
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray="8 8"
            markerEnd="url(#arrow-neg)"
          />
        </motion.g>
      </svg>

      {/* Accept button — floating over content */}
      <motion.button
        type="button"
        data-no-tap
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        className="absolute inset-x-0 mx-auto bottom-[120px] block w-fit rounded-full bg-white px-12 py-3 text-[16px] font-semibold text-[#CD2331] shadow-lg z-20"
      >
        Accept
      </motion.button>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.45 }}
        className="absolute inset-x-4 bottom-[200px] space-y-2"
      >
        <RiskRow num={10} title="Teeth treatment" body="The cavity may continue deeper into the tooth and require root canal treatment" />
        <RiskRow num={6} title="Gums and jawbone" body="Ongoing bone loss may lead to gum recession and tooth mobility" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 3.0, duration: 0.6 }}
        className="absolute inset-x-0 bottom-[68px] text-center text-[14px]"
      >
        Swipe up
      </motion.div>
    </div>
  );
}

function RiskRow({ num, title, body }: { num: number; title: string; body: string }) {
  return (
    <div className="flex items-stretch gap-3 rounded-3xl border border-white/30 bg-white/5 p-3">
      <div
        className="flex w-8 shrink-0 flex-col items-center justify-center rounded-2xl border border-white/30 bg-white/15 py-2 text-center"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <div className="text-[12px] leading-none">↓</div>
        <div className="mt-1 text-[16px] font-medium leading-none">{num}</div>
      </div>
      <div className="flex flex-col">
        <div className="text-[15px] font-semibold leading-5">{title}</div>
        <div className="mt-1 text-[14px] leading-snug">{body}</div>
      </div>
    </div>
  );
}
