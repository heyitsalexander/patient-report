"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function TeethScreen() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #E3E3E3 100%)",
      }}
    >
      <Image
        src="/designs/05-teeth-a.png"
        alt="Teeth findings"
        fill
        priority
        sizes="(min-width: 640px) 440px, 100vw"
        className="pointer-events-none object-cover"
      />
      {/* Mask the original page indicator + swipe text so our overlay dots are the only ones */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-[#E3E3E3] via-[#E3E3E3]/95 to-transparent" />
    </motion.div>
  );
}
