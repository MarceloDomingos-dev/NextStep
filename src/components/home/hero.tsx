import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { numeros, site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { HeroParallax } from "@/components/home/hero-parallax";
import { cn } from "@/lib/utils";

const FRENTES = ["Gestão de Tráfego", "Sites e Portfólios", "Automação", "Educação"];

/** Degraus do painel: a escada da marca virando gráfico de crescimento (ilustrativo). */
const DEGRAUS = [28, 40, 52, 64, 78, 100];

function Painel() {
  const vendas = numeros.find((n) => n.legenda.includes("vendas geradas"));
  return (
    <div
      style={{ animationDelay: "var(--intro)" }}
      className="anim-scale-in relative rounded-[28px] border border-white/10 bg-ink-2/90 p-5 shadow-[0_40px_120px_-40px_rgba(239,108,34,0.55)] backdrop-blur lg:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.14em] text-white/55 uppercase">Painel de crescimento</span>
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="size-2 rounded-full bg-brand" />
        </span>
      </div>

      {vendas && (
        <p className="mt-6">
          <span className="block font-display text-[2.6rem] leading-none font-extrabold tracking-[-0.03em] lg:text-[3.4rem]">
            {vendas.prefixo}
            {vendas.valor}
            {vendas.sufixo}
          </span>
          <span className="mt-2 block text-sm text-white/65">{vendas.legenda}</span>
        </p>
      )}

      {/* Gráfico em degraus (decorativo) */}
      <div aria-hidden="true" className="mt-7 flex h-36 items-end gap-2 border-b border-white/10 lg:h-44">
        {DEGRAUS.map((h, i) => (
          <span
            key={i}
            className={cn(
              "anim-rise-bar flex-1 rounded-t-md",
              i === DEGRAUS.length - 1 ? "bg-[image:var(--grad-brand)]" : "bg-white/12",
            )}
            style={{ height: `${h}%`, animationDelay: `calc(var(--intro) + ${300 + i * 90}ms)` }}
          />
        ))}
      </div>

      <ul className="mt-5 grid grid-cols-2 gap-2 text-sm" aria-label="Frentes da Next Step">
        {FRENTES.map((f) => (
          <li key={f} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 text-white/85">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand-light" />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="on-dark relative overflow-hidden bg-ink pt-28 pb-16 text-white lg:pt-40 lg:pb-28">
      <div aria-hidden="true" className="grid-dark absolute inset-0" />
      <div aria-hidden="true" className="glow anim-glow-on absolute -top-40 right-[-10%] size-[620px] lg:size-[820px]" />

      <div className="container-ns relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p style={{ animationDelay: "var(--intro)" }} className="anim-fade-up eyebrow">
            Tráfego&nbsp;· Sites&nbsp;· Automação&nbsp;· Educação
          </p>
          <h1
            className="mt-6 font-display font-extrabold tracking-[-0.035em] lg:mt-8"
            style={{ fontSize: "clamp(2.25rem, 1.1rem + 3.9vw, 4.1rem)", lineHeight: 1.02 }}
          >
            {["Mais vendas no digital.", "Menos trabalho manual."].map((linha, i) => (
              <span key={linha} className="block overflow-hidden pb-[0.06em]">
                <span className="anim-rise" style={{ animationDelay: `calc(var(--intro) + ${i * 90}ms)` }}>
                  {linha}
                </span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="anim-rise" style={{ animationDelay: "calc(var(--intro) + 180ms)" }}>
                Uma equipe <span className="serif-accent text-brand-light">pronta para crescer.</span>
              </span>
            </span>
          </h1>
          <p
            className="anim-fade-up mt-7 max-w-[600px] text-lg leading-relaxed text-white/75 lg:mt-9 lg:text-xl"
            style={{ animationDelay: "calc(var(--intro) + 420ms)" }}
          >
            Gestão de tráfego, criação de sites e automação empresarial para PMEs que querem crescer com método, e uma
            Área de Aprendizado para formar quem faz a empresa acontecer.
          </p>
          <div
            className="anim-fade-up mt-9 flex flex-col gap-3 sm:flex-row lg:mt-10"
            style={{ animationDelay: "calc(var(--intro) + 500ms)" }}
          >
            <WhatsAppLink
              mensagem={site.mensagens.especialista}
              className={cn(buttonVariants({ variant: "brand", size: "pill" }), "group w-full gap-2 sm:w-auto")}
              ariaLabel="Falar com um especialista: abre o WhatsApp"
            >
              Falar com um especialista
              <ArrowUpRight
                aria-hidden="true"
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </WhatsAppLink>
            <Link href="/#solucoes" className={cn(buttonVariants({ variant: "outlineLight", size: "pill" }), "w-full sm:w-auto")}>
              Conhecer as soluções
            </Link>
          </div>
          <p
            className="anim-fade-up mt-8 text-sm text-white/55"
            style={{ animationDelay: "calc(var(--intro) + 580ms)" }}
          >
            {site.contato.cidade}, {site.contato.uf} · Atendemos empresas de todo o Brasil
          </p>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <HeroParallax>
            <Painel />
          </HeroParallax>
          <figcaption className="sr-only">Painel ilustrativo com as frentes da Next Step e o total de vendas geradas.</figcaption>
        </figure>
      </div>
    </section>
  );
}
