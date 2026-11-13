"use client";

import { m, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Passo = { titulo: string; texto: string };

/** Fração do caminho em que a linha chega a cada círculo (desktop). */
const CHEGADA = [0, 0.27, 0.53, 0.79];

/**
 * Quatro passos sobre a linha laranja em degrau.
 * A linha se preenche conforme a página rola e cada círculo passa de contorno a preenchido.
 */
export function ComoFunciona({ passos }: { passos: Passo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  // A linha só avança: não "desdesenha" quando a pessoa rola de volta para cima.
  const progresso = useMotionValue(0);
  const [ate, setAte] = useState(reduce ? 1 : 0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce || v <= progresso.get()) return;
    progresso.set(v);
    setAte(v);
  });

  const aceso = (i: number) => reduce || ate >= CHEGADA[i] + 0.02 || i === 0;

  return (
    <div ref={ref} className="relative mt-10 lg:mt-16">
      {/* Desktop: escada subindo para a direita */}
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1240 140"
        preserveAspectRatio="none"
        className="pointer-events-none absolute top-0 left-0 hidden h-[140px] w-full lg:block"
      >
        <path d="M22 130 H 332 V 94 H 642 V 58 H 952 V 22 H 1240" fill="none" stroke="#E5E5E5" strokeWidth={3} vectorEffect="non-scaling-stroke" />
        <m.path
          d="M22 130 H 332 V 94 H 642 V 58 H 952 V 22 H 1240"
          fill="none"
          stroke="#EF6C22"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : progresso }}
        />
      </svg>

      {/* Mobile: linha vertical */}
      <div aria-hidden="true" className="absolute top-5 bottom-10 left-5 w-0.5 -translate-x-1/2 bg-line lg:hidden">
        <m.div className="h-full w-full origin-top bg-brand" style={{ scaleY: reduce ? 1 : progresso }} />
      </div>

      <ol className="relative grid gap-8 lg:grid-cols-4 lg:items-start lg:gap-0">
        {passos.map((p, i) => (
          <li
            key={p.titulo}
            className="flex gap-4 lg:block lg:pr-8"
            style={{ ["--topo" as string]: `${108 - i * 36}px` }}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brand font-extrabold transition-colors duration-500 lg:mt-[var(--topo)] lg:size-11",
                aceso(i) ? "bg-[image:var(--grad-brand)] text-ink" : "bg-white text-brand-text",
              )}
            >
              {i + 1}
            </span>
            <div className="lg:mt-5">
              <h3 className="text-xl font-bold lg:text-[1.4375rem]">{p.titulo}</h3>
              <p className="mt-1 text-base text-[#444]">{p.texto}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
