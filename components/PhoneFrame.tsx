"use client";

import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Centers the 440×956 patient-report canvas on the screen with a soft
 * device-style bezel. On small screens we let the canvas fill the viewport
 * for a true Instagram-Stories feel.
 */
export default function PhoneFrame({ children }: Props) {
  return (
    <div className="flex min-h-dvh w-full items-center justify-center bg-black p-0 sm:p-6">
      <div
        className="relative h-dvh w-full overflow-hidden bg-black shadow-[0_50px_120px_-20px_rgba(0,0,0,0.6)] sm:h-[956px] sm:w-[440px] sm:rounded-[56px] sm:ring-[10px] sm:ring-neutral-900"
        style={{ contain: "layout paint" }}
      >
        {children}
      </div>
    </div>
  );
}
