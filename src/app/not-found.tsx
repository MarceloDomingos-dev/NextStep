import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center pt-24 pb-20">
      <div className="container-ns">
        <svg aria-hidden="true" focusable="false" viewBox="0 0 72 72" className="size-16">
          <path
            d="M2 70 H 24 V 48 H 46 V 26 H 70 V 2"
            fill="none"
            stroke="#EF6C22"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className="anim-draw"
            style={{ "--len": 1 } as React.CSSProperties}
          />
        </svg>
        <h1
          className="mt-6 font-extrabold tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.1rem, 1.3rem + 3.6vw, 4rem)", lineHeight: 1.04 }}
        >
          Esta página não existe.
        </h1>
        <p className="mt-4 text-lg text-body">O endereço pode ter mudado. Escolha um caminho:</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={cn(buttonVariants({ variant: "dark", size: "pill" }))}>
            Voltar para o início
          </Link>
          <Link href="/cursos/" className={cn(buttonVariants({ variant: "outlineDark", size: "pill" }))}>
            Ver cursos
          </Link>
          <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "brand", size: "pill" }))}>
            Diagnóstico gratuito
          </Link>
        </div>
      </div>
    </section>
  );
}
