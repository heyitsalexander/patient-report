"use client";

import { motion } from "motion/react";

export default function AppointmentScreen() {
  return (
    <div
      className="relative h-full w-full overflow-hidden px-6 pt-[100px] pb-[120px] text-white"
      style={{
        background: "linear-gradient(180deg, #A880FF 0%, #5100FE 100%)",
      }}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center text-[24px] font-semibold"
      >
        Your next visit
      </motion.div>

      <CalendarCard />

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="absolute inset-x-4 bottom-[210px] rounded-3xl border border-white/40 bg-white/5 backdrop-blur-sm"
      >
        <RowPriced num={7} label="Molar tooth-colored filling" price="$200" />
        <div className="mx-4 h-px bg-white/20" />
        <RowPriced num={26} label="Tooth-colored filling" price="$50" />
      </motion.div>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute inset-x-4 bottom-[90px] grid grid-cols-2 gap-3"
      >
        <ActionCard title="High-risk areas still need attention!" cta="View" solid />
        <ActionCard title="See your last visit summary" cta="View" />
      </motion.div>
    </div>
  );
}

function CalendarCard() {
  return (
    <div className="relative mx-auto mt-12 h-[200px] w-[260px]">
      {/* Layered shadow cards */}
      <motion.div
        initial={{ rotate: -8, opacity: 0, y: 8 }}
        animate={{ rotate: -4, opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-[28px] border border-white/30 bg-white/5 backdrop-blur-sm"
      />
      <motion.div
        initial={{ rotate: 8, opacity: 0, y: 8 }}
        animate={{ rotate: 4, opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-[28px] border border-white/30 bg-white/5 backdrop-blur-sm"
      />
      {/* Foreground card */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 rounded-[28px] border border-white/40 bg-white/10 px-6 backdrop-blur-md"
      >
        {/* Calendar hangers */}
        <div className="absolute left-1/2 top-[-12px] flex -translate-x-1/2 gap-12">
          <div className="h-6 w-[14px] rounded-full bg-white" />
          <div className="h-6 w-[14px] rounded-full bg-white" />
        </div>
        <div className="flex h-full flex-col items-center justify-center">
          <div className="text-[16px]">Friday, June</div>
          <div className="text-[88px] font-light leading-none" style={{ fontVariantNumeric: "tabular-nums" }}>
            10
          </div>
          <div className="text-[18px] font-semibold">10:30 AM</div>
        </div>
      </motion.div>
    </div>
  );
}

function RowPriced({ num, label, price }: { num: number; label: string; price: string }) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/60 text-[14px] font-medium">
        {num}
      </div>
      <div className="flex-1 text-[16px]">{label}</div>
      <div className="text-[16px]" style={{ fontVariantNumeric: "tabular-nums" }}>
        {price}
      </div>
    </div>
  );
}

function ActionCard({ title, cta, solid }: { title: string; cta: string; solid?: boolean }) {
  return (
    <div className="rounded-3xl border border-white/40 p-3">
      <div className="text-[14px] font-semibold leading-snug">{title}</div>
      <button
        type="button"
        data-no-tap
        className={
          "mt-3 w-full rounded-full py-2 text-[14px] font-semibold transition-colors " +
          (solid ? "bg-white text-[#5100FE]" : "border border-white text-white")
        }
      >
        {cta}
      </button>
    </div>
  );
}
