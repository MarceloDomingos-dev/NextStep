import type { Metadata } from "next";
import { absoluta } from "@/lib/asset";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { automacao } from "@/content/servicos";
import { site } from "@/content/site";
import { PageHero } from "@/components/site/page-hero";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { ComoFunciona } from "@/components/home/como-funciona";
import { CtaFinal } from "@/components/site/cta-final";
import { Reveal } from "@/components/site/motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Automação de processos",
  description:
    "Automação de WhatsApp, integrações, CRM e relatórios automáticos. Menos retrabalho, menos erro, mais horas livres.",
  alternates: { canonical: absoluta("/automacao/") },
  openGraph: { url: absoluta("/automacao/"), title: "Automação de processos · Next Step" },
};

export default function AutomacaoPage() {
  return (
    <>
      <PageHero trilha="Automação" eyebrow={automacao.eyebrow} titulo={automacao.titulo} subtitulo={automacao.subtitulo}>
        <WhatsAppLink
          mensagem={site.mensagens.automacao}
          className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full sm:w-auto")}
          ariaLabel="Mapear tarefas manuais: abre o WhatsApp"
        >
          Mapear tarefas manuais
        </WhatsAppLink>
        <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "outlineDark", size: "pill" }), "w-full sm:w-auto")}>
          Fazer o diagnóstico gratuito
        </Link>
      </PageHero>

      {/* A dor */}
      <section className="section bg-mist">
        <div className="container-ns">
          <h2 className="h-section">Onde o tempo da equipe vai embora</h2>
          <ul className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {automacao.dores.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 0.07} className="rounded-3xl border border-line bg-white p-6 text-xl leading-snug font-bold lg:p-9 lg:text-2xl">
                {d}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Antes e depois */}
      <section className="section bg-ink text-white">
        <div className="container-ns">
          <h2 className="h-section">Antes e depois</h2>
          <p className="mt-3 text-[#bdbdbd]">Exemplos ilustrativos de tarefas que costumamos automatizar.</p>
          <ul className="mt-8 flex flex-col gap-3 lg:mt-12 lg:gap-5">
            {automacao.antesDepois.map((par, i) => (
              <Reveal
                as="li"
                key={par.antes}
                delay={i * 0.07}
                className="grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr] lg:gap-5"
              >
                <div className="rounded-3xl border border-dashed border-[#404040] p-6 lg:p-8">
                  <strong className="block text-sm font-semibold text-[#a3a3a3]">Antes</strong>
                  <p className="mt-2 text-lg text-[#d4d4d4]">{par.antes}</p>
                </div>
                <ArrowRight aria-hidden="true" className="mx-auto size-6 rotate-90 self-center text-brand lg:rotate-0" />
                <div className="rounded-3xl bg-white p-6 text-ink lg:p-8">
                  <strong className="flex items-center gap-1.5 text-sm font-semibold text-brand-text">
                    <Check aria-hidden="true" strokeWidth={3} className="size-4" />
                    Depois
                  </strong>
                  <p className="mt-2 text-lg font-semibold">{par.depois}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* O que automatizamos */}
      <section className="section">
        <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 className="h-section lg:col-span-4">O que automatizamos</h2>
          <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
            {automacao.solucoes.map((s) => (
              <li key={s} className="border-b border-line py-5 text-xl font-bold">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-ns">
          <h2 className="h-section">Como funciona</h2>
          <ComoFunciona passos={automacao.passos} />
        </div>
      </section>

      <CtaFinal titulo={automacao.ctaFinal} mensagem={site.mensagens.automacao} rotuloWhats="Mapear tarefas manuais" />
    </>
  );
}
