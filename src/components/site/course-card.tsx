import Link from "next/link";
import { ArrowRight, Clock, MonitorPlay } from "lucide-react";
import type { Curso } from "@/content/cursos";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Card de programa no padrão de vitrine de escola de negócios:
 * tag de formato, título, transformação, carga/formato e "Ver ementa e inscrever-se".
 * O card inteiro leva à página do curso, onde fica a inscrição pelo WhatsApp.
 */
export function CourseCard({ curso, comBotao = true }: { curso: Curso; comBotao?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-white transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-step)] hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_28px_60px_-36px_rgba(10,10,10,0.35)]">
      {/* Faixa superior: categoria e formatos */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-6 py-4 lg:px-7">
        <span className="text-xs font-bold tracking-[0.14em] text-subtle uppercase">{curso.categoria}</span>
        <ul className="flex flex-wrap justify-end gap-1.5" aria-label="Formatos">
          {curso.modalidades.map((m) => (
            <li key={m} className="chip">
              {m}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col px-6 pt-6 pb-6 lg:px-7 lg:pt-7">
        {curso.destaque && (
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-light" />
            Disponível agora
          </span>
        )}
        <h3 className="font-display text-[1.45rem] leading-[1.1] font-extrabold tracking-[-0.02em]">
          <Link href={`/cursos/${curso.slug}/`} className="after:absolute after:inset-0 after:rounded-2xl after:content-['']">
            {curso.nome}
          </Link>
        </h3>
        <p className="mt-3 text-[0.9875rem] leading-relaxed text-body">{curso.transformacao}</p>

        <dl className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-subtle">
          <div className="flex items-center gap-1.5">
            <Clock aria-hidden="true" className="size-4 text-brand-text" />
            <dt className="sr-only">Carga horária</dt>
            <dd>{curso.carga}h de conteúdo</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <MonitorPlay aria-hidden="true" className="size-4 text-brand-text" />
            <dt className="sr-only">Formato</dt>
            <dd>{curso.modalidades.join(" ou ")}</dd>
          </div>
        </dl>

        {comBotao && (
          <div aria-hidden="true" className="mt-auto pt-6">
            <span className="flex items-center justify-between border-t border-line pt-5 font-semibold text-ink">
              Ver ementa e inscrever-se
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-ink text-white transition-[background-color,transform] duration-300 group-hover:translate-x-0.5 group-hover:bg-brand">
                <ArrowRight className="size-4" />
              </span>
            </span>
          </div>
        )}
      </div>
    </article>
  );
}

export function InCompanyCard({ className, horizontal = false }: { className?: string; horizontal?: boolean }) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col gap-3 overflow-hidden rounded-2xl bg-ink p-6 text-white lg:p-7",
        horizontal && "lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-12 lg:p-10",
        className,
      )}
    >
      <span aria-hidden="true" className="glow absolute -right-24 -bottom-24 size-[260px]" />
      <span className="relative text-xs font-bold tracking-[0.14em] text-brand-light uppercase">In Company</span>
      <h3 className="relative font-display text-[1.45rem] leading-[1.1] font-extrabold tracking-[-0.02em]">
        Um programa sob medida para o seu time
      </h3>
      <p className="relative text-base text-[#d4d4d4]">
        Qualquer curso da Área de Aprendizado, adaptado à rotina, aos números e aos desafios da sua empresa.
      </p>
      <div className={cn("relative mt-auto pt-2", horizontal && "lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:w-72 lg:pt-0")}>
        <WhatsAppLink
          mensagem={site.mensagens.inCompany}
          className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "w-full")}
          ariaLabel="Pedir proposta in company: abre o WhatsApp"
        >
          Pedir proposta in company
        </WhatsAppLink>
      </div>
    </article>
  );
}
