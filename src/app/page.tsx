import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Quote } from "lucide-react";
import { clientes, depoimentos, numeros, site } from "@/content/site";
import { cursos } from "@/content/cursos";
import { comoFunciona, diferenciais, solucoes } from "@/content/servicos";
import { faq } from "@/content/faq";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Provas } from "@/components/home/provas";
import { CourseCard, InCompanyCard } from "@/components/site/course-card";
import { FaqList } from "@/components/site/faq-list";
import { CtaFinal } from "@/components/site/cta-final";
import { GlowFollow } from "@/components/site/glow-follow";
import { Counter, Reveal } from "@/components/site/motion";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { JsonLd, faqLd } from "@/components/site/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/utils";

/** Cabeçalho padrão de seção: rótulo, título (com destaque em serifa) e apoio. */
function Cabecalho({
  rotulo,
  titulo,
  destaque,
  apoio,
  escuro = false,
  className,
}: {
  rotulo: string;
  titulo: string;
  destaque?: string;
  apoio?: string;
  escuro?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("eyebrow", escuro && "on-dark")}>{rotulo}</p>
      <h2 className="h-section mt-4">
        {titulo}
        {destaque && (
          <>
            {" "}
            <span className={cn("serif-accent", escuro ? "text-brand-light" : "text-brand-text")}>{destaque}</span>
          </>
        )}
      </h2>
      {apoio && <p className={cn("mt-5 text-lg leading-relaxed", escuro ? "text-white/70" : "text-body")}>{apoio}</p>}
    </div>
  );
}

export default function Home() {
  const visiveis = numeros.filter((n) => n.visivel);
  const vitrine = [...cursos].sort((a, b) => Number(!!b.destaque) - Number(!!a.destaque)).slice(0, 3);

  return (
    <>
      <Intro />
      <Hero />

      {/* 3. Autoridade / prova social */}
      <section aria-labelledby="autoridade-titulo" className="section bg-white">
        <div className="container-ns">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-5">
              <p className="eyebrow">Prova social</p>
              <h2 id="autoridade-titulo" className="h-section mt-4">
                Números que a gente <span className="serif-accent text-brand-text">assina embaixo.</span>
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-body lg:col-span-6 lg:col-start-7">
              Resultado medido em venda, não em curtida. Esses são os números que já entregamos para empresas que
              decidiram dar o próximo passo com a gente.
            </p>
          </div>

          {visiveis.length > 0 && (
            <dl className="mt-12 grid border-t border-ink sm:grid-cols-3 lg:mt-16">
              {visiveis.map((n, i) => (
                <Reveal
                  key={n.legenda}
                  delay={i * 0.08}
                  className={cn(
                    "flex flex-col-reverse gap-2 border-b border-line py-8 sm:border-b-0 sm:py-10",
                    i > 0 && "sm:border-l sm:pl-8 lg:pl-10",
                  )}
                >
                  <dt className="text-base text-subtle">{n.legenda}</dt>
                  <dd className="font-display text-[3.25rem] leading-none font-extrabold tracking-[-0.04em] tabular-nums lg:text-[4.5rem]">
                    <Counter valor={n.valor} prefixo={n.prefixo} sufixo={n.sufixo} />
                  </dd>
                </Reveal>
              ))}
            </dl>
          )}

          {clientes.length > 0 && (
            <div className="mt-12 border-t border-line pt-10">
              <p className="text-center text-sm font-semibold tracking-[0.14em] text-subtle uppercase">
                Empresas que confiam na Next Step
              </p>
              <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
                {clientes.map((c) => (
                  <li key={c.nome}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(c.src)}
                      alt={c.nome}
                      loading="lazy"
                      className="h-9 w-auto opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 4. Soluções */}
      <section id="solucoes" className="section on-dark relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="grid-dark absolute inset-0 opacity-60" />
        <div className="container-ns relative">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Cabecalho
              escuro
              rotulo="Nossas soluções"
              titulo="Três frentes, um objetivo:"
              destaque="sua empresa vendendo mais com menos esforço."
            />
            <Link
              href="/diagnostico/"
              className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-white/80 hover:text-white"
            >
              Não sabe por onde começar? Faça o diagnóstico
              <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5">
            {solucoes.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 0.08}>
                <GlowFollow className="group h-full rounded-3xl border border-white/10 bg-ink-2 transition-[border-color,transform] duration-300 ease-[var(--ease-step)] hover:-translate-y-1 hover:border-brand/70">
                  <article className="relative flex h-full flex-col p-7 lg:p-9">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-brand-light">0{i + 1}</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-6 text-white/30 transition-[color,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand-light"
                      />
                    </div>
                    <h3 className="mt-8 font-display text-[1.75rem] leading-[1.08] font-extrabold tracking-[-0.02em] lg:text-[2rem]">
                      {s.nome}
                    </h3>
                    <p className="mt-6 text-xs font-bold tracking-[0.14em] text-white/45 uppercase">O problema</p>
                    <p className="mt-2 text-lg font-semibold text-white">{s.problema}</p>
                    <p className="mt-4 leading-relaxed text-white/70">{s.solucao}</p>
                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-6 text-[0.9375rem] text-white/85">
                      {s.entregas.map((e) => (
                        <li key={e} className="flex items-center gap-2.5">
                          <Check aria-hidden="true" className="size-4 shrink-0 text-brand-light" />
                          {e}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-8">
                      <WhatsAppLink
                        mensagem={s.mensagem}
                        className={cn(buttonVariants({ variant: "brand", size: "pillMd" }))}
                        ariaLabel={`Falar sobre ${s.nome}: abre o WhatsApp`}
                      >
                        Falar com especialista
                      </WhatsAppLink>
                      {s.href && (
                        <Link href={s.href} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-brand-light">
                          {s.cta}
                        </Link>
                      )}
                    </div>
                  </article>
                </GlowFollow>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Área de Aprendizado */}
      <section id="aprendizado" className="section bg-bone">
        <div className="container-ns">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <Cabecalho
              rotulo="Área de Aprendizado"
              titulo="Conhecimento prático para quem constrói negócios"
              destaque="de verdade."
              apoio="Programas diretos ao ponto, criados por quem vive o dia a dia de empresa. Para você começar, para o seu time evoluir e para a sua empresa crescer, online ou in company."
            />
            <Link
              href="/cursos/"
              className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }), "hidden shrink-0 sm:inline-flex")}
            >
              Ver todos os programas
            </Link>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
            {vitrine.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.07}>
                <CourseCard curso={c} />
              </Reveal>
            ))}
          </ul>

          <Reveal className="mt-4 lg:mt-5">
            <InCompanyCard horizontal />
          </Reveal>

          <Link href="/cursos/" className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }), "mt-6 w-full sm:hidden")}>
            Ver todos os programas
          </Link>
        </div>
      </section>

      {/* 6. Sobre + Metodologia */}
      <section id="sobre" className="section on-dark relative overflow-hidden bg-ink text-white">
        <div aria-hidden="true" className="glow absolute -bottom-60 -left-40 size-[640px] opacity-70" />
        <div className="container-ns relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <Cabecalho
                escuro
                rotulo="Sobre nós"
                titulo="Nascemos em BH para levar pequenas e médias empresas ao"
                destaque="próximo passo."
              />
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
                A Next Step une marketing, tecnologia e educação em um só parceiro. A gente cuida de trazer o cliente,
                organizar o processo e preparar o time, para a empresa crescer sem depender de sorte.
              </p>
            </div>
            <ul className="flex flex-col gap-3 lg:col-span-5 lg:col-start-8">
              {diferenciais.map((d, i) => (
                <Reveal as="li" key={d.titulo} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-ink-2 p-6">
                  <h3 className="font-display text-lg font-bold">{d.titulo}</h3>
                  <p className="mt-1.5 text-white/65">{d.texto}</p>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="mt-20 border-t border-white/10 pt-14 lg:mt-28 lg:pt-20">
            <Cabecalho escuro rotulo="Metodologia" titulo="O Método Next Step:" destaque="do diagnóstico ao resultado." />
            <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-0">
              {comoFunciona.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.titulo}
                  delay={i * 0.08}
                  className={cn("relative rounded-2xl border border-white/10 p-6 lg:rounded-none lg:border-0 lg:border-l lg:p-0 lg:pr-8 lg:pl-8", i === 0 && "lg:border-l-0 lg:pl-0")}
                >
                  {/* Degrau: cada passo começa um pouco mais alto, como a escada da marca */}
                  <div className="lg:pt-[var(--sobe)]" style={{ "--sobe": `${(3 - i) * 28}px` } as React.CSSProperties}>
                    <span className="font-display text-5xl font-extrabold text-brand-light/90">0{i + 1}</span>
                    <h3 className="mt-4 font-display text-xl font-bold">{p.titulo}</h3>
                    <p className="mt-2 text-white/65">{p.texto}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 7. Cases e depoimentos */}
      <section id="resultados" className="section bg-white">
        <div className="container-ns grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Cabecalho
              rotulo="Cases e resultados"
              titulo="Resultados reais,"
              destaque="sem maquiagem."
              apoio="Mostramos só o que dá para comprovar. Esta placa marca R$ 1 milhão em vendas feitas no digital com estratégias da Next Step."
            />
            <ul className="mt-8 flex flex-col gap-3">
              {visiveis.map((n) => (
                <li key={n.legenda} className="flex items-baseline gap-4 border-b border-line pb-3">
                  <strong className="font-display text-2xl font-extrabold whitespace-nowrap">
                    {n.prefixo}
                    {n.valor}
                    {n.sufixo}
                  </strong>
                  <span className="text-body">{n.legenda}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Provas />
          </div>
        </div>

        {depoimentos.length > 0 && (
          <div className="container-ns mt-16 lg:mt-24">
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {depoimentos.map((d, i) => (
                <Reveal as="li" key={d.nome} delay={(i % 3) * 0.07} className="flex flex-col rounded-2xl border border-line bg-bone p-7">
                  <Quote aria-hidden="true" className="size-7 text-brand" />
                  <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{d.texto}”</blockquote>
                  <p className="mt-6 border-t border-line pt-4">
                    <strong className="block">{d.nome}</strong>
                    <span className="text-sm text-subtle">
                      {d.cargo}, {d.empresa} · {d.tipo}
                    </span>
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* FAQ */}
      <section className="section bg-bone">
        <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <p className="eyebrow">Dúvidas</p>
            <h2 className="h-section mt-4">Perguntas frequentes</h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqList itens={faq} />
          </div>
        </div>
      </section>

      <CtaFinal
        titulo="Qual é o próximo passo da sua empresa?"
        mensagem={site.mensagens.especialista}
        rotuloWhats="Falar com um especialista"
        secundario={{ label: "Quero meu diagnóstico gratuito", href: "/diagnostico/" }}
      />
      <JsonLd data={faqLd(faq)} />
    </>
  );
}
