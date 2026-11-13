"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Parallax leve (máx. 20px) na foto do hero. Só transform. */
export function HeroParallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 20]);
  if (reduce) return <div ref={ref}>{children}</div>;
  return (
    <m.div ref={ref} style={{ y }} className="relative">
      {children}
    </m.div>
  );
}
