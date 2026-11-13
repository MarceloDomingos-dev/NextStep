"use client";

import { LazyMotion, domAnimation, m, useReducedMotion, useInView, animate } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "article" | "figure";
};

/** Entra "subindo um degrau" ao aparecer na tela, uma vez. Desligado com reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = m[as];
  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/** Revela com clip-path (esquerda→direita ou baixo→cima). */
export function ClipReveal({
  children,
  className,
  direcao = "cima",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  direcao?: "cima" | "direita";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const inicio = direcao === "cima" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  return (
    <m.div
      className={className}
      initial={{ clipPath: inicio }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </m.div>
  );
}

/** Contador animado ao entrar na tela. */
export function Counter({ valor, prefixo = "", sufixo = "" }: { valor: number; prefixo?: string; sufixo?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [atual, setAtual] = useState(valor);

  // Zera antes de o visitante chegar à faixa (o HTML estático mostra o valor final).
  useEffect(() => {
    if (reduce || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setAtual(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, valor, {
      duration: 1.2,
      ease: EASE,
      onUpdate: (v) => setAtual(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, valor]);

  return (
    <span ref={ref}>
      <span className="sr-only">{`${prefixo}${valor}${sufixo}`.trim()}</span>
      <span aria-hidden="true">
        {prefixo}
        {atual}
        {sufixo}
      </span>
    </span>
  );
}
