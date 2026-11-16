import type { ReactNode } from "react";
import { Trilha } from "@/components/site/trilha";

/** Topo das páginas internas: trilha, rótulo, título, subtítulo e botões. */
export function PageHero({
  trilha,
  eyebrow,
  titulo,
  subtitulo,
  children,
}: {
  trilha: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-ink pt-24 pb-14 text-white lg:pt-32 lg:pb-24">
      <div aria-hidden="true" className="grid-dark absolute inset-0" />
      <div aria-hidden="true" className="glow absolute -top-40 -right-40 size-[560px]" />
      <div className="container-ns relative">
        <Trilha escuro itens={[{ label: trilha }]} />
        <p className="eyebrow mt-8">{eyebrow}</p>
        <h1
          className="mt-4 max-w-4xl font-display font-extrabold tracking-[-0.035em]"
          style={{ fontSize: "clamp(2.1rem, 1.2rem + 4vw, 4.25rem)", lineHeight: 1.03 }}
        >
          {titulo}
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-white/75 lg:mt-7 lg:text-[1.375rem]">{subtitulo}</p>
        {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
      </div>
    </section>
  );
}
