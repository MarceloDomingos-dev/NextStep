"use client";

import { useState } from "react";
import { provas } from "@/content/site";
import { Picture } from "@/components/site/picture";
import { ClipReveal } from "@/components/site/motion";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const nomeBase = (src: string) => src.split("/").pop()!;

/** Placas reais de vendas, com ampliação em lightbox acessível. */
export function Provas() {
  const [aberta, setAberta] = useState<number | null>(null);
  const foto = aberta === null ? null : provas[aberta];

  return (
    <>
      <div className={cn("grid gap-3 lg:gap-6", provas.length > 1 ? "grid-cols-2" : "mx-auto max-w-sm lg:mx-0")}>
        {provas.map((p, i) => (
          <figure key={p.src}>
            <ClipReveal delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setAberta(i)}
                aria-label={`Ampliar foto: ${p.legenda}`}
                className="group block w-full cursor-zoom-in overflow-hidden rounded-3xl border border-line bg-white"
              >
                <Picture
                  nome={nomeBase(p.src)}
                  larguras={[360, 600, 900]}
                  sizes={provas.length > 1 ? "(min-width: 1024px) 290px, 45vw" : "(min-width: 640px) 384px, 92vw"}
                  alt={p.alt}
                  width={p.largura}
                  height={p.altura}
                  imgClassName="block h-[300px] w-full object-cover transition-transform duration-500 ease-[var(--ease-step)] group-hover:scale-[1.03] sm:h-[320px] lg:h-[380px]"
                />
              </button>
            </ClipReveal>
            <figcaption className="mt-3 text-[0.9375rem] font-bold lg:text-base">{p.legenda}</figcaption>
          </figure>
        ))}
      </div>

      <Dialog open={aberta !== null} onOpenChange={(o) => !o && setAberta(null)}>
        <DialogContent className="max-h-[92dvh] w-auto max-w-[min(92vw,560px)] rounded-3xl bg-white p-3 sm:max-w-[560px]">
          <DialogTitle className="sr-only">{foto?.legenda ?? "Foto"}</DialogTitle>
          <DialogDescription className="sr-only">
            Foto {(aberta ?? 0) + 1} de {provas.length}
          </DialogDescription>
          {foto && (
            <Picture
              nome={nomeBase(foto.src)}
              larguras={[600, 900]}
              sizes="(min-width: 640px) 540px, 90vw"
              alt={foto.alt}
              width={foto.largura}
              height={foto.altura}
              imgClassName="block max-h-[80dvh] w-auto rounded-2xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
