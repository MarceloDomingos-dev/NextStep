"use client";

import { useState } from "react";
import { cursos, type Modalidade } from "@/content/cursos";
import { CourseCard, InCompanyCard } from "@/components/site/course-card";
import { cn } from "@/lib/utils";

const FILTROS: ("Todos" | Modalidade)[] = ["Todos", "Online", "Presencial", "In company"];

export function Catalogo() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");
  const lista = filtro === "Todos" ? cursos : cursos.filter((c) => c.modalidades.includes(filtro));

  return (
    <>
      <div role="group" aria-label="Filtrar por modalidade" className="flex flex-wrap gap-2">
        {FILTROS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filtro === f}
            onClick={() => setFiltro(f)}
            className={cn(
              "h-11 rounded-full border px-5 text-[0.9375rem] font-semibold transition-colors active:scale-[0.98]",
              filtro === f ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {lista.length} {lista.length === 1 ? "curso" : "cursos"} em {filtro}
      </p>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-5">
        {lista.map((c) => (
          <li key={c.slug}>
            <CourseCard curso={c} />
          </li>
        ))}
        <li className={cn(lista.length % 3 === 0 && "lg:col-span-3", lista.length % 2 === 0 && "sm:max-lg:col-span-2")}>
          <InCompanyCard />
        </li>
      </ul>
    </>
  );
}
