import type { Metadata } from "next";
import Link from "next/link";
import { marketing, comoFunciona } from "@/content/servicos";
import { numeros, site } from "@/content/site";
import { PageHero } from "@/components/site/page-hero";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { ComoFunciona } from "@/components/home/como-funciona";
import { Provas } from "@/components/home/provas";
import { CtaFinal } from "@/components/site/cta-final";
import { Reveal } from "@/components/site/motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Marketing que vende",
  description:
    "Estratégia, tráfego pago, redes sociais, branding e páginas de venda, medidos em clientes e não em curtidas.",
  alternates: { canonical: "/marketing/" },
  openGraph: { url: "/marketing/", title: "Marketing que vende · Next Step" },
};

export default function MarketingPage() {
  const provaNumeros = numeros.filter((n) => n.visivel).slice(0, 2);
  return (
    <>
      <PageHero trilha="Marketing" eyebrow={marketing.eyebrow} titulo={marketing.titulo} subtitulo={marketing.subtitulo}>
        <WhatsAppLink
          mensagem={site.mensagens.marketing}
          className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full sm:w-auto")}
          ariaLabel="Diagnóstico de marketing: abre o WhatsApp"
        >
          Diagnóstico de marketing
        </WhatsAppLink>
        <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "outlineDark", size: "pill" }), "w-full sm:w-auto")}>
          Fazer o diagnóstico gratuito
        </Link>
      </PageHero>

      {/* A dor */}
      <section className="section bg-mist">
        <div className="container-ns">
          <h2 className="h-section">Isso parece com a sua empresa?</h2>
          <ul className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-5">
            {marketing.dores.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 0.07} className="rounded-3xl border border-line bg-white p-6 text-xl leading-snug font-bold lg:p-9 lg:text-2xl">
                {d}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Entregas */}
      <section className="section">
        <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-4">
            <h2 className="h-section">O que entregamos</h2>
            <p className="mt-4 text-lg text-body">{marketing.resultado}</p>
          </div>
          <ul className="border-t border-ink lg:col-span-7 lg:col-start-6">
            {marketing.entregas.map((e) => (
              <li key={e.titulo} className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <strong className="text-xl">{e.titulo}</strong>
                <span className="text-base text-subtle sm:text-right">{e.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prova */}
      <section className="section bg-mist">
        <div className="container-ns grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <h2 className="h-section">Vendas reais, feitas no digital</h2>
            <dl className="mt-6 flex flex-col gap-5">
              {provaNumeros.map((n) => (
                <div key={n.legenda} className="flex flex-col-reverse">
                  <dt className="text-subtle">{n.legenda}</dt>
                  <dd className="text-4xl font-extrabold lg:text-5xl">
                    {n.prefixo}
                    {n.valor}
                    {n.sufixo}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Provas />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-ns">
          <h2 className="h-section">Como funciona</h2>
          <ComoFunciona passos={comoFunciona} />
        </div>
      </section>

      <CtaFinal titulo={marketing.ctaFinal} mensagem={site.mensagens.marketing} rotuloWhats="Diagnóstico de marketing" />
    </>
  );
}
