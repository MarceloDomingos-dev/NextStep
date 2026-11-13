import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Picture } from "@/components/site/picture";
import { HeroParallax } from "@/components/home/hero-parallax";
import { cn } from "@/lib/utils";

/** Quebras controladas: nenhuma palavra fica sozinha em uma linha. */
const LINHAS = ["Equipe preparada,", "marketing que vende", "e processos que", "rodam sozinhos."];

/**
 * A escada laranja sob o título. Tudo é medido em "em" do próprio h1
 * (1 linha = 1.2em = 120 unidades), então acompanha o tamanho da fonte.
 */
function Escada({ degrau, largura, className }: { degrau: number; largura: number; className: string }) {
  const y = (i: number) => 120 * (i + 1) + 2;
  const d = `M0 ${y(0)} H ${degrau} V ${y(1)} H ${2 * degrau} V ${y(2)} H ${3 * degrau} V ${y(3)} H ${largura}`;
  const altura = y(3) + 4;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${largura} ${altura}`}
      className={cn("pointer-events-none absolute top-0 left-0 overflow-visible", className)}
      style={{ width: `${largura / 100}em`, height: `${altura / 100}em` }}
    >
      <path
        d={d}
        fill="none"
        stroke="#EF6C22"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        className="anim-draw"
        style={{ "--len": 1, animationDelay: "calc(var(--intro) + 150ms)" } as React.CSSProperties}
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-x-clip pt-24 pb-14 lg:pt-36 lg:pb-24">
      <div className="container-ns grid items-center gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p style={{ animationDelay: "var(--intro)" }} className="anim-fade-up mb-6 text-sm font-semibold text-brand-text lg:mb-9 lg:text-[0.9375rem]">
            Cursos, marketing e automação para empresas de BH e de todo o Brasil
          </p>
          <h1
            className="relative font-extrabold tracking-[-0.03em] [--degrau:0.5em] lg:[--degrau:0.8em]"
            style={{ fontSize: "clamp(1.625rem, 7.2vw, 3.5rem)", lineHeight: 1.2 }}
          >
            <Escada degrau={50} largura={1150} className="lg:hidden" />
            <Escada degrau={80} largura={1220} className="hidden lg:block" />
            {LINHAS.map((linha, i) => (
              <span
                key={linha}
                className="relative block overflow-hidden whitespace-nowrap"
                style={{ paddingLeft: `calc(var(--degrau) * ${i})` }}
              >
                <span className="anim-rise" style={{ animationDelay: `calc(var(--intro) + ${i * 80}ms)` }}>
                  {linha}
                </span>
              </span>
            ))}
          </h1>
          <p className="anim-fade-up mt-9 max-w-xl text-lg text-body lg:mt-11 lg:text-xl" style={{ animationDelay: "calc(var(--intro) + 420ms)" }}>
            Treinamos sua equipe, fazemos o marketing trazer clientes e automatizamos o trabalho manual. Um parceiro, três
            frentes, tudo medido.
          </p>
          <div className="anim-fade-up mt-8 flex flex-col gap-3 sm:flex-row lg:mt-9" style={{ animationDelay: "calc(var(--intro) + 500ms)" }}>
            <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full sm:w-auto")}>
              Diagnóstico gratuito
            </Link>
            <Link href="/cursos/" className={cn(buttonVariants({ variant: "outlineDark", size: "pill" }), "w-full sm:w-auto")}>
              Ver cursos
            </Link>
          </div>
        </div>

        <figure className="relative mx-auto w-full max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <div aria-hidden="true" className="glow anim-glow-on absolute -inset-x-6 -top-12 -bottom-6 lg:-inset-x-14 lg:-top-16" />
          <HeroParallax>
            <div style={{ animationDelay: "var(--intro)" }} className="anim-scale-in relative rounded-3xl border border-line bg-white p-2.5 shadow-[0_30px_80px_-40px_rgba(239,108,34,0.55)] lg:p-3">
              <Picture
                nome="prova-1m-vendas"
                larguras={[360, 600, 900]}
                sizes="(min-width: 1024px) 400px, 200px"
                alt="Placa de R$ 1 milhão em vendas recebida pela Next Step"
                width={900}
                height={1600}
                prioridade
                imgClassName="block h-[340px] w-full rounded-2xl object-cover sm:h-[440px] lg:h-[480px]"
              />
            </div>
          </HeroParallax>
          <figcaption className="relative mt-4 flex items-baseline justify-between gap-4">
            <strong className="text-2xl font-extrabold lg:text-[1.75rem]">R$ 1 milhão</strong>
            <span className="text-sm text-subtle lg:text-[0.9375rem]">em vendas geradas no digital</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
