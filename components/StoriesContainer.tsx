"use client";

import {
  AnimatePresence,
  motion,
  type PanInfo,
} from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProgressDots from "./ProgressDots";
import { SCREENS, TOTAL_SECTIONS } from "@/lib/screens";
import { playTick, unlockAudio } from "@/lib/sound";

const SWIPE_VELOCITY = 350;
const SWIPE_DISTANCE = 60;

export default function StoriesContainer() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const wheelLock = useRef(false);

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      const clamped = Math.max(0, Math.min(SCREENS.length - 1, next));
      if (clamped === index) return;
      unlockAudio();
      playTick();
      setDirection(dir);
      setIndex(clamped);
    },
    [index],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (wheelLock.current) return;
      const dy = e.deltaY;
      if (Math.abs(dy) < 12) return;
      wheelLock.current = true;
      window.setTimeout(() => {
        wheelLock.current = false;
      }, 550);
      if (dy > 0) next();
      else prev();
    },
    [next, prev],
  );

  const onDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      if (offset.y < -SWIPE_DISTANCE || velocity.y < -SWIPE_VELOCITY) {
        next();
      } else if (offset.y > SWIPE_DISTANCE || velocity.y > SWIPE_VELOCITY) {
        prev();
      }
    },
    [next, prev],
  );

  const current = SCREENS[index];
  const Screen = current.Component;

  return (
    <div
      className="relative h-full w-full select-none overflow-hidden"
      onWheel={onWheel}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest("button, a, [data-no-tap]")) return;
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        const y = e.clientY - rect.top;
        if (y > rect.height * 0.5) next();
        else prev();
      }}
    >
      <AnimatePresence initial={false} mode="popLayout" custom={direction}>
        <motion.div
          key={current.id}
          custom={direction}
          initial={(d: number) => ({ y: d > 0 ? "100%" : "-100%" })}
          animate={{ y: "0%" }}
          exit={(d: number) => ({ y: d > 0 ? "-100%" : "100%" })}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.4}
          onDragEnd={onDragEnd}
          className="absolute inset-0"
        >
          <Screen />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-x-0 bottom-[28px] z-40 flex justify-center">
        <ProgressDots total={TOTAL_SECTIONS} current={current.section} tint={current.tint} />
      </div>
    </div>
  );
}
