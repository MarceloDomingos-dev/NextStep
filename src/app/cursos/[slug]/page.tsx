import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { cursos, faqCurso, getCurso } from "@/content/cursos";
import { site } from "@/content/site";
import { Trilha } from "@/components/site/trilha";
import { InscreverCurso, WhatsAppLink } from "@/components/site/whatsapp";
import { CourseCard } from "@/components/site/course-card";
import { FaqList } from "@/components/site/faq-list";
import { Reveal } from "@/components/site/motion";
import { JsonLd, faqLd } from "@/components/site/json-ld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cursos.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) return {};
  const description = `${curso.promessa} ${curso.modalidades.join(", ")}, com certificado.`;
  return {
    title: `${curso.nome} (${curso.carga}h)`,
    description,
    alternates: { canonical: `/cursos/${curso.slug}/` },
    openGraph: { url: `/cursos/${curso.slug}/`, title: `${curso.nome} · Next Step`, description },
  };
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-3 text-body">
      {itens.map((t) => (
        <li key={t} className="flex gap-3">
          <Check aria-hidden="true" strokeWidth={3} className="mt-1.5 size-4 shrink-0 text-brand" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export default async function CursoPage({ params }: Props) {
  const { slug } = await params;
  const curso = getCurso(slug);
  if (!curso) notFound();

  const outros = cursos.filter((c) => c.slug !== curso.slug).slice(0, 3);
  const formato = curso.modalidades.join(" ou ");

  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-14 lg:pt-32 lg:pb-24">
        <div className="container-ns">
          <Trilha itens={[{ label: "Cursos", href: "/cursos/" }, { label: curso.nome }]} />
          <div className="mt-6 grid items-start gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2" aria-label="Modalidades">
                {curso.modalidades.map((m) => (
                  <li key={m} className="chip text-sm">
                    {m}
                  </li>
                ))}
              </ul>
              <h1
                className="mt-5 font-extrabold tracking-[-0.035em]"
                style={{ fontSize: "clamp(2.1rem, 1.2rem + 4vw, 4.25rem)", lineHeight: 1.03 }}
              >
                {curso.nome}
              </h1>
              <p className="mt-5 max-w-[620px] text-lg text-body lg:mt-7 lg:text-[1.375rem]">{curso.promessa}</p>
            </div>
            <aside
              aria-label="Informações do curso"
              className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] lg:col-span-4 lg:col-start-9 lg:p-9"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[image:var(--grad-brand)]" />
              <dl className="grid grid-cols-3 gap-3">
                <div>
                  <dt className="text-sm text-subtle">Carga</dt>
                  <dd className="mt-1 text-2xl font-extrabold">{curso.carga}h</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-sm text-subtle">Formato</dt>
                  <dd className="mt-1 font-bold">{formato}</dd>
                </div>
                <div className="col-span-3">
                  <dt className="text-sm text-subtle">Certificado</dt>
                  <dd className="mt-1 font-bold">Digital, enviado por e-mail</dd>
                </div>
              </dl>
              <InscreverCurso curso={curso} variante="brand" tamanho="pill" className="mt-7" />
              <p className="mt-3 text-center text-sm text-subtle">Abre o WhatsApp com o nome do curso.</p>
            </aside>
          </div>
        </div>
      </section>

      {/* Para quem é + O que vai aprender */}
      <section className="section bg-mist">
        <div className="container-ns grid gap-3 lg:grid-cols-2 lg:gap-5">
          <Reveal className="rounded-3xl border border-line bg-white p-6 lg:p-11">
            <h2 className="text-2xl font-extrabold lg:text-[2rem]">Para quem é</h2>
            <Lista itens={curso.paraQuem} />
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-line bg-white p-6 lg:p-11">
            <h2 className="text-2xl font-extrabold lg:text-[2rem]">O que você vai aprender</h2>
            <Lista itens={curso.aprender} />
          </Reveal>
        </div>
      </section>

      {/* Conteúdo programático: só aparece depois de confirmado em src/content/cursos.ts */}
      {curso.modulosConfirmados && (
        <section className="section">
          <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
            <h2 className="h-section lg:col-span-4">Conteúdo programático</h2>
            <div className="lg:col-span-7 lg:col-start-6">
              <FaqList itens={curso.modulos.map((m, i) => ({ p: `${i + 1}. ${m.titulo}`, r: m.descricao ?? "" }))} />
            </div>
          </div>
        </section>
      )}

      {/* Valores e turmas */}
      <section className={cn("pb-16 lg:pb-24", curso.modulosConfirmados ? "" : "pt-16 lg:pt-24")}>
        <div className="container-ns">
          <Reveal className="relative overflow-hidden rounded-[28px] bg-ink p-7 text-white lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-14">
            <span aria-hidden="true" className="glow absolute -top-40 -right-24 size-[420px] lg:size-[520px]" />
            <div className="relative">
              <h2 className="text-[1.6rem] leading-[1.1] font-extrabold lg:text-[2.625rem]">Valores e turmas: fale com a gente</h2>
              <p className="mt-3 max-w-[600px] text-[#d4d4d4] lg:text-lg">
                O valor depende da modalidade e do tamanho da turma. No WhatsApp você recebe as próximas datas e a proposta.
              </p>
            </div>
            <WhatsAppLink
              mensagem={`Olá! Vim pelo site e quero saber valores e próximas turmas do curso ${curso.nome}.`}
              className={cn(buttonVariants({ variant: "brand", size: "pill" }), "relative mt-6 w-full shrink-0 lg:mt-0 lg:w-auto")}
              ariaLabel="Consultar no WhatsApp: abre o WhatsApp"
              evento="clique_whatsapp_curso"
              params={{ curso: curso.nome, modalidade: "valores" }}
            >
              Consultar no WhatsApp
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>

      {/* Dúvidas */}
      <section className="pb-16 lg:pb-24">
        <div className="container-ns grid gap-8 lg:grid-cols-12 lg:gap-6">
          <h2 className="h-section lg:col-span-4">Dúvidas sobre o curso</h2>
          <div className="lg:col-span-7 lg:col-start-6">
            <FaqList itens={faqCurso} abertoInicial={null} />
          </div>
        </div>
      </section>

      {/* Outros cursos */}
      <section className="section bg-mist">
        <div className="container-ns">
          <h2 className="h-section">Outros cursos</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {outros.map((c) => (
              <li key={c.slug}>
                <CourseCard curso={c} comBotao={false} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA fixo no mobile */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
        <InscreverCurso curso={curso} variante="brand" tamanho="pillMd" />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: curso.nome,
          description: curso.promessa,
          url: `${site.siteUrl}/cursos/${curso.slug}/`,
          inLanguage: "pt-BR",
          provider: { "@type": "Organization", name: site.nome, sameAs: `${site.siteUrl}/` },
          timeRequired: `PT${curso.carga}H`,
          hasCourseInstance: curso.modalidades.map((m) => ({
            "@type": "CourseInstance",
            courseMode: m === "Online" ? "Online" : "In company",
            courseWorkload: `PT${curso.carga}H`,
          })),
        }}
      />
      <JsonLd data={faqLd(faqCurso)} />
    </>
  );
}
