"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Mini antes/depois do card de Automação.
 * Desktop: os dois lados aparecem; o "Depois" acende em um ciclo lento (pausa no hover).
 * Mobile: vira um alternador Antes | Depois.
 * Com "reduzir movimento", fica parado no "Depois".
 */
export function AntesDepois({ antes, depois }: { antes: string; depois: string }) {
  const [lado, setLado] = useState<"antes" | "depois">("depois");
  const [pausado, setPausado] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    if (pausado || manual) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setLado((l) => (l === "depois" ? "antes" : "depois")), lado === "depois" ? 2800 : 1200);
    return () => clearTimeout(t);
  }, [lado, pausado, manual]);

  const escolher = (l: "antes" | "depois") => {
    setManual(true);
    setLado(l);
  };
  const ativo = lado === "depois";

  return (
    <div onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      <div role="group" aria-label="Comparar antes e depois" className="mb-2.5 grid grid-cols-2 rounded-full bg-ink-line p-1 sm:hidden">
        {(["antes", "depois"] as const).map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={lado === l}
            onClick={() => escolher(l)}
            className={cn(
              "h-11 rounded-full text-sm capitalize transition-colors",
              lado === l ? "bg-white font-bold text-ink" : "text-[#bdbdbd]",
            )}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-3 text-[0.9375rem] sm:grid-cols-2">
        <div
          className={cn(
            "rounded-2xl border border-dashed border-[#404040] p-[18px] text-[#a3a3a3] transition-opacity duration-500",
            lado === "antes" ? "block" : "hidden sm:block",
            ativo && "sm:opacity-60",
          )}
        >
          <strong className="block text-[#d4d4d4]">Antes (ilustrativo)</strong>
          <span className={cn("transition-all duration-500", ativo && "line-through decoration-[#737373]")}>{antes}</span>
        </div>
        <div
          className={cn(
            "rounded-2xl p-[18px] transition-colors duration-500",
            lado === "depois" ? "block" : "hidden sm:block",
            ativo ? "bg-white text-ink" : "bg-ink-line text-[#d4d4d4]",
          )}
        >
          <strong className="flex items-center gap-1.5">
            <Check
              aria-hidden="true"
              strokeWidth={3}
              className={cn("size-4 text-brand transition-[opacity,transform] duration-500", ativo ? "scale-100 opacity-100" : "scale-50 opacity-0")}
            />
            Depois
          </strong>
          {depois}
        </div>
      </div>
    </div>
  );
}
