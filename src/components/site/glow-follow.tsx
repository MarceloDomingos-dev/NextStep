"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Brilho laranja sutil que acompanha o cursor (só em telas com mouse). */
export function GlowFollow({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <span
        aria-hidden="true"
        className="glow absolute top-0 left-0 size-[280px] transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: "translate(calc(var(--mx, 420px) - 140px), calc(var(--my, 20px) - 140px))" }}
      />
      {children}
    </div>
  );
}
