"use client";

import { motion } from "motion/react";
import Image from "next/image";

export default function GumBoneScreen() {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative h-full w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 100%)",
      }}
    >
      <Image
        src="/designs/07-gum-bone.png"
        alt="Gum and bone findings"
        fill
        priority
        sizes="(min-width: 640px) 440px, 100vw"
        className="pointer-events-none object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-[#F1F1F1] via-[#F1F1F1]/95 to-transparent" />
    </motion.div>
  );
}
