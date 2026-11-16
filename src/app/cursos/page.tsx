import type { Metadata } from "next";
import { absoluta } from "@/lib/asset";
import { Catalogo } from "@/components/cursos/catalogo";
import { CtaFinal } from "@/components/site/cta-final";
import { Trilha } from "@/components/site/trilha";

export const metadata: Metadata = {
  title: "Área de Aprendizado: cursos e programas",
  description:
    "Programas práticos de empreendedorismo, administração, liderança e vendas. Online, in company ou em imersão online, com certificado.",
  alternates: { canonical: absoluta("/cursos/") },
  openGraph: { url: absoluta("/cursos/"), title: "Área de Aprendizado · Next Step" },
};

export default function CursosPage() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-ink pt-24 pb-14 text-white lg:pt-32 lg:pb-20">
        <div aria-hidden="true" className="grid-dark absolute inset-0" />
        <div aria-hidden="true" className="glow absolute -top-40 -right-40 size-[560px]" />
        <div className="container-ns relative">
          <Trilha escuro itens={[{ label: "Área de Aprendizado" }]} />
          <p className="eyebrow mt-8">Área de Aprendizado</p>
          <h1
            className="mt-4 max-w-4xl font-display font-extrabold tracking-[-0.035em]"
            style={{ fontSize: "clamp(2.1rem, 1.3rem + 3.6vw, 4.25rem)", lineHeight: 1.03 }}
          >
            Conhecimento prático para quem constrói negócios <span className="serif-accent text-brand-light">de verdade.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 lg:text-xl">
            Escolha o programa, veja a ementa e fale com a gente no WhatsApp para se inscrever. Online, in company ou em
            imersão online, sempre com certificado.
          </p>
        </div>
      </section>
      <section className="section bg-bone">
        <div className="container-ns">
          <Catalogo />
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
