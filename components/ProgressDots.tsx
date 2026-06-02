"use client";

import { motion } from "motion/react";

type Props = {
  total: number;
  current: number;
  tint?: "light" | "dark";
};

/**
 * Instagram-Stories style page indicator. The active dot stretches into a pill.
 */
export default function ProgressDots({ total, current, tint = "light" }: Props) {
  const baseColor = tint === "light" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.25)";
  const activeColor = tint === "light" ? "#ffffff" : "#111111";

  return (
    <div className="flex items-center justify-center gap-[10px]">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === current;
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: isActive ? 32 : 8,
              backgroundColor: isActive ? activeColor : baseColor,
            }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ height: 8, borderRadius: 999 }}
          />
        );
      })}
    </div>
  );
}
