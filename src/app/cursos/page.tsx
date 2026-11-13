import type { Metadata } from "next";
import { Catalogo } from "@/components/cursos/catalogo";
import { CtaFinal } from "@/components/site/cta-final";
import { Trilha } from "@/components/site/trilha";

export const metadata: Metadata = {
  title: "Cursos para equipes e líderes",
  description:
    "Liderança, vendas, atendimento, produtividade, comunicação e KPIs. Online, presencial ou in company em BH.",
  alternates: { canonical: "/cursos/" },
  openGraph: { url: "/cursos/", title: "Cursos para equipes e líderes · Next Step" },
};

export default function CursosPage() {
  return (
    <>
      <section className="bg-mist pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container-ns">
          <Trilha itens={[{ label: "Cursos" }]} />
          <h1
            className="mt-8 max-w-3xl font-extrabold tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.1rem, 1.3rem + 3.6vw, 4rem)", lineHeight: 1.04 }}
          >
            Cursos para equipes e líderes
          </h1>
          <p className="mt-5 mb-10 max-w-2xl text-lg text-body lg:text-xl">
            Seis cursos práticos, online, presencial ou in company. Escolha o curso e fale com a gente no WhatsApp.
          </p>
          <Catalogo />
        </div>
      </section>
      <CtaFinal />
    </>
  );
}
