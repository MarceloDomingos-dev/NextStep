import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { Reveal } from "@/components/site/motion";
import { cn } from "@/lib/utils";

/** Card escuro de fechamento, com brilho laranja que "respira" e a escada pequena. */
export function CtaFinal({
  titulo = "Qual é o próximo passo da sua empresa?",
  mensagem,
  rotuloWhats = "Falar no WhatsApp",
  secundario = { label: "Diagnóstico gratuito", href: "/diagnostico/" },
}: {
  titulo?: string;
  mensagem?: string;
  rotuloWhats?: string;
  secundario?: { label: string; href: string } | null;
}) {
  return (
    <section className="bg-ink pt-16 text-white lg:pt-28">
      <div className="container-ns">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-ink-line bg-ink-2 p-7 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-16">
          <span aria-hidden="true" className="glow anim-breathe absolute -top-40 -right-32 size-[420px] lg:size-[560px]" />
          <div className="relative lg:flex lg:items-end lg:gap-6">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 72 72" className="size-10 shrink-0 lg:size-[72px]">
              <path
                d="M2 70 H 24 V 48 H 46 V 26 H 70 V 2"
                fill="none"
                stroke="#EF6C22"
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength={1}
                className="anim-draw-view"
              />
            </svg>
            <h2
              className="mt-3 max-w-[620px] font-extrabold tracking-[-0.03em] lg:mt-0"
              style={{ fontSize: "clamp(1.8rem, 1.1rem + 2.9vw, 3.5rem)", lineHeight: 1.06 }}
            >
              {titulo}
            </h2>
          </div>
          <div className="relative mt-6 flex shrink-0 flex-col gap-3 lg:mt-0">
            <WhatsAppLink
              mensagem={mensagem}
              className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full")}
              ariaLabel={`${rotuloWhats}: abre o WhatsApp`}
            >
              {rotuloWhats}
            </WhatsAppLink>
            {secundario && (
              <Link href={secundario.href} className={cn(buttonVariants({ variant: "outlineLight", size: "pill" }), "w-full")}>
                {secundario.label}
              </Link>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
