"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { perguntas } from "@/content/quiz";
import { cn } from "@/lib/utils";

/**
 * Prévia do diagnóstico na home: a primeira pergunta, com as 4 opções.
 * Clicar numa opção abre /diagnostico com ela já marcada.
 */
export function PreviaDiagnostico() {
  const p = perguntas[0];
  const [foco, setFoco] = useState<string | null>(null);
  const total = perguntas.length;

  return (
    <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] lg:p-10">
      <div className="flex justify-between text-sm text-subtle">
        <span>Pergunta 1 de {total}</span>
        <span aria-hidden="true">{foco ? "14%" : "0%"}</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#ededed]" aria-hidden="true">
        <div
          className="h-full w-full origin-left rounded-full bg-[image:var(--grad-brand)] transition-transform duration-500 ease-[var(--ease-step)]"
          style={{ transform: `scaleX(${foco ? 1 / total : 0.02})` }}
        />
      </div>
      <h3 className="mt-6 text-xl leading-snug font-bold lg:text-[1.375rem]">{p.titulo}</h3>
      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {p.opcoes!.map((o) => (
          <li key={o.valor}>
            <Link
              href={`/diagnostico/?r=${o.valor}`}
              onMouseEnter={() => setFoco(o.valor)}
              onMouseLeave={() => setFoco(null)}
              onFocus={() => setFoco(o.valor)}
              onBlur={() => setFoco(null)}
              className={cn(
                "flex min-h-16 items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-[0.9375rem] transition-colors duration-200 active:bg-brand-tint",
                foco === o.valor ? "border-brand bg-brand-tint font-semibold" : "border-line bg-white",
              )}
            >
              {o.label}
              <Check
                aria-hidden="true"
                strokeWidth={3}
                className={cn("size-4 shrink-0 text-brand transition-opacity", foco === o.valor ? "opacity-100" : "opacity-0")}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
