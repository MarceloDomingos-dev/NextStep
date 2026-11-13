import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { numeros, site } from "@/content/site";
import { cursos } from "@/content/cursos";
import { automacao, comoFunciona, marketing } from "@/content/servicos";
import { faq } from "@/content/faq";
import { Hero } from "@/components/home/hero";
import { AntesDepois } from "@/components/home/antes-depois";
import { ComoFunciona } from "@/components/home/como-funciona";
import { Provas } from "@/components/home/provas";
import { PreviaDiagnostico } from "@/components/home/previa-diagnostico";
import { CourseCard, InCompanyCard } from "@/components/site/course-card";
import { FaqList } from "@/components/site/faq-list";
import { CtaFinal } from "@/components/site/cta-final";
import { GlowFollow } from "@/components/site/glow-follow";
import { ClipReveal, Counter, Reveal } from "@/components/site/motion";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { JsonLd, faqLd } from "@/components/site/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Seta() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="absolute top-6 right-6 size-6 -translate-x-1 translate-y-1 text-brand opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-step)] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100"
    />
  );
}

export default function Home() {
  const visiveis = numeros.filter((n) => n.visivel);
  const cursosHome = cursos.slice(0, 5);

  return (
    <>
      <Hero />

      {/* Faixa de números */}
      {visiveis.length > 0 && (
        <section aria-label="Resultados em números" className="border-y border-line">
          <dl
            className={cn(
              "container-ns grid",
              visiveis.length === 1 ? "justify-center text-center" : "grid-cols-3 text-center sm:text-left",
            )}
          >
            {visiveis.map((n, i) => (
              <div key={n.legenda} className={cn("flex flex-col-reverse px-1 py-5 lg:py-9", i > 0 && "border-l border-line sm:pl-6 lg:pl-10")}>
                <dt className="text-xs text-subtle sm:text-sm lg:text-base">{n.legenda}</dt>
                <dd className="text-[1.375rem] leading-tight font-extrabold tabular-nums sm:text-3xl lg:text-[2.75rem]">
                  <Counter valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* O que você precisa agora? */}
      <section className="section">
        <div className="container-ns">
          <h2 className="h-section">O que você precisa agora?</h2>
          <div className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-12 lg:grid-rows-[250px_250px] lg:gap-5">
            <Reveal className="lg:col-span-7 lg:row-span-2">
              <Link
                href="/cursos/"
                className="group relative flex h-full min-h-[260px] flex-col justify-between rounded-3xl border border-line bg-mist p-6 transition-[transform,border-color] duration-300 ease-[var(--ease-step)] hover:-translate-y-1 hover:border-brand active:border-brand lg:p-11"
              >
                <Seta />
                <span className="eyebrow">Cursos</span>
                <span>
                  <strong className="block text-[1.6rem] leading-[1.08] font-extrabold tracking-[-0.02em] lg:text-[2.75rem]">
                    Capacitar minha equipe
                  </strong>
                  <span className="mt-3 block max-w-[480px] text-base text-body lg:mt-4 lg:text-lg">
                    Liderança, vendas, atendimento, produtividade, comunicação e indicadores. Online, presencial ou in
                    company.
                  </span>
                  <span className="mt-5 inline-block border-b-2 border-brand font-bold lg:mt-7">Ver os {cursos.length} cursos</span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.07} className="lg:col-span-5">
              <Link
                href="/marketing/"
                className="group relative flex h-full min-h-[150px] flex-col justify-between gap-6 rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,border-color] duration-300 ease-[var(--ease-step)] hover:-translate-y-1 hover:border-brand active:border-brand lg:p-9"
              >
                <Seta />
                <span className="eyebrow">Marketing</span>
                <span>
                  <strong className="block text-[1.35rem] leading-tight font-extrabold lg:text-3xl">Vender mais</strong>
                  <span className="mt-2 block text-base text-body">Tráfego pago, redes e páginas de venda medidos em clientes.</span>
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.14} className="lg:col-span-5">
              <GlowFollow className="h-full rounded-3xl bg-ink">
                <Link
                  href="/automacao/"
                  className="group relative flex h-full min-h-[150px] flex-col justify-between gap-6 rounded-3xl border border-transparent p-6 text-white transition-[transform,border-color] duration-300 ease-[var(--ease-step)] hover:border-brand active:border-brand lg:p-9"
                >
                  <Seta />
                  <span className="text-[0.9375rem] font-bold text-brand-light">Automação</span>
                  <span>
                    <strong className="block text-[1.35rem] leading-tight font-extrabold lg:text-3xl">
                      Parar de perder tempo com tarefa manual
                    </strong>
                    <span className="mt-2 block text-base text-[#d4d4d4]">WhatsApp, integrações, CRM e relatórios automáticos.</span>
                  </span>
                </Link>
              </GlowFollow>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="section bg-mist">
        <div className="container-ns">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Cursos</p>
              <h2 className="h-section mt-2">Cursos para equipes e líderes</h2>
            </div>
            <Link href="/cursos/" className="hidden shrink-0 border-b-2 border-brand pb-0.5 font-bold sm:inline-block">
              Ver catálogo
            </Link>
          </div>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {cursosHome.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={(i % 3) * 0.07}>
                <CourseCard curso={c} />
              </Reveal>
            ))}
            <li>
              <ClipReveal direcao="direita" className="h-full">
                <InCompanyCard />
              </ClipReveal>
            </li>
          </ul>
          <Link href="/cursos/" className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }), "mt-4 w-full sm:hidden")}>
            Ver os {cursos.length} cursos
          </Link>
        </div>
      </section>

      {/* Marketing + Automação */}
      <section className="section bg-ink text-white">
        <div className="container-ns grid gap-3 lg:grid-cols-2 lg:gap-5">
          <Reveal as="article" className="flex flex-col rounded-3xl border border-ink-line bg-ink-2 p-6 lg:p-12">
            <div id="marketing" className="scroll-mt-28">
              <p className="text-[0.9375rem] font-bold text-brand-light">Marketing</p>
              <h2 className="mt-3 text-[1.6rem] leading-[1.12] font-extrabold lg:text-[2.375rem]">{marketing.resumoHome.titulo}</h2>
              <p className="mt-4 text-[#d4d4d4] lg:mt-5">{marketing.resumoHome.texto}</p>
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
              <WhatsAppLink
                mensagem={site.mensagens.marketing}
                className={cn(buttonVariants({ variant: "outlineLight", size: "pillMd" }), "w-full sm:w-auto")}
                ariaLabel="Diagnóstico de marketing: abre o WhatsApp"
              >
                {marketing.resumoHome.botao}
              </WhatsAppLink>
              <Link href="/marketing/" className="inline-flex min-h-12 items-center justify-center px-2 font-semibold underline underline-offset-4">
                Ver o que entregamos
              </Link>
            </div>
          </Reveal>
          <Reveal as="article" delay={0.08} className="flex flex-col rounded-3xl border border-ink-line bg-ink-2 p-6 lg:p-12">
            <div id="automacao" className="scroll-mt-28">
              <p className="text-[0.9375rem] font-bold text-brand-light">Automação</p>
              <h2 className="mt-3 text-[1.6rem] leading-[1.12] font-extrabold lg:text-[2.375rem]">{automacao.resumoHome.titulo}</h2>
            </div>
            <div className="mt-6">
              <AntesDepois antes={automacao.resumoHome.antes} depois={automacao.resumoHome.depois} />
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
              <WhatsAppLink
                mensagem={site.mensagens.automacao}
                className={cn(buttonVariants({ variant: "outlineLight", size: "pillMd" }), "w-full sm:w-auto")}
                ariaLabel="Mapear tarefas manuais: abre o WhatsApp"
              >
                {automacao.resumoHome.botao}
              </WhatsAppLink>
              <Link href="/automacao/" className="inline-flex min-h-12 items-center justify-center px-2 font-semibold underline underline-offset-4">
                Ver exemplos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Como funciona */}
      <section className="section">
        <div className="container-ns">
          <h2 className="h-section">Como funciona</h2>
          <ComoFunciona passos={comoFunciona} />
        </div>
      </section>

      {/* Resultados */}
      <section id="resultados" className="section bg-mist">
        <div className="container-ns grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 className="h-section">Resultados que dá para ver</h2>
            <p className="mt-4 text-lg text-body lg:mt-6">
              Mostramos só o que é verificável. Estas placas marcam vendas reais feitas no digital.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Provas />
          </div>
        </div>
      </section>

      {/* Diagnóstico */}
      <section className="section">
        <div className="container-ns grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 className="h-section">Diagnóstico gratuito em 2 minutos</h2>
            <p className="mt-4 text-lg text-body lg:mt-5">
              Sete perguntas para descobrir se o que trava é equipe, vendas ou processos.
            </p>
            <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "brand", size: "pill" }), "mt-7 w-full sm:w-auto")}>
              Começar o diagnóstico
            </Link>
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <PreviaDiagnostico />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-line">
        <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 className="h-section lg:col-span-4">Perguntas frequentes</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqList itens={faq} />
          </div>
        </div>
      </section>

      <CtaFinal />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
