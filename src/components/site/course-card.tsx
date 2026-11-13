import Link from "next/link";
import type { Curso } from "@/content/cursos";
import { InscreverCurso } from "@/components/site/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { cn } from "@/lib/utils";

export function CourseCard({ curso, comBotao = true }: { curso: Curso; comBotao?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-[transform,border-color,box-shadow] duration-300 ease-[var(--ease-step)] hover:-translate-y-1 hover:border-brand/60 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.25)] lg:p-[30px]">
      <div className="flex items-center justify-between gap-3">
        <ul className="flex flex-wrap gap-1.5" aria-label="Modalidades">
          {curso.modalidades.map((m) => (
            <li key={m} className="chip">
              {m}
            </li>
          ))}
        </ul>
        <span className="shrink-0 font-bold">
          {curso.carga}h<span className="sr-only"> de carga horária</span>
        </span>
      </div>
      <h3 className="mt-1.5 text-[1.375rem] leading-tight font-bold">
        <Link href={`/cursos/${curso.slug}/`} className="after:absolute after:inset-0 after:rounded-3xl after:content-['']">
          {curso.nome}
        </Link>
      </h3>
      <p className="text-base text-[#444]">{curso.publico}</p>
      {comBotao && (
        <div className="relative z-10 mt-auto pt-2">
          <InscreverCurso curso={curso} />
        </div>
      )}
    </article>
  );
}

export function InCompanyCard({ className }: { className?: string }) {
  return (
    <article className={cn("relative flex h-full flex-col gap-3 overflow-hidden rounded-3xl bg-ink p-6 text-white lg:p-[30px]", className)}>
      <span aria-hidden="true" className="glow absolute -right-24 -bottom-24 size-[260px]" />
      <h3 className="relative text-[1.375rem] leading-tight font-bold">In company para sua equipe</h3>
      <p className="relative text-base text-[#d4d4d4]">
        Qualquer curso do catálogo, adaptado à rotina e aos números da sua empresa.
      </p>
      <div className="relative mt-auto pt-2">
        <WhatsAppLink
          mensagem={site.mensagens.inCompany}
          className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "w-full")}
          ariaLabel="Pedir proposta in company: abre o WhatsApp"
        >
          Pedir proposta
        </WhatsAppLink>
      </div>
    </article>
  );
}
