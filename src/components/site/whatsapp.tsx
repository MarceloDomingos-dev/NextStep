"use client";

import { useState, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink, mensagemCurso } from "@/lib/whatsapp";
import { track, type Evento } from "@/lib/analytics";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Curso } from "@/content/cursos";
import { cn } from "@/lib/utils";

type Props = {
  mensagem?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  evento?: Evento;
  params?: Record<string, string>;
};

/** Link de WhatsApp com evento de analytics. Usa sempre whatsappLink(). */
export function WhatsAppLink({ mensagem, children, className, ariaLabel, evento = "clique_whatsapp", params }: Props) {
  return (
    <a
      href={whatsappLink(mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel ?? (typeof children === "string" ? `${children}: abre o WhatsApp` : undefined)}
      onClick={() => track(evento, params)}
    >
      {children}
    </a>
  );
}

/**
 * "Quero me inscrever": abre o WhatsApp com o nome do curso e a modalidade.
 * Com mais de uma modalidade, pergunta antes o formato.
 */
export function InscreverCurso({
  curso,
  className,
  variante = "dark",
  tamanho = "pillMd",
  rotulo = "Quero me inscrever",
}: {
  curso: Pick<Curso, "nome" | "modalidades">;
  className?: string;
  variante?: "dark" | "brand";
  tamanho?: "pillMd" | "pill";
  rotulo?: string;
}) {
  const [aberto, setAberto] = useState(false);
  const classes = cn(buttonVariants({ variant: variante, size: tamanho }), "group/wa w-full", className);
  const icone = (
    <MessageCircle
      aria-hidden="true"
      className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover/wa:translate-x-0 group-hover/wa:opacity-100 motion-reduce:hidden"
    />
  );
  const aria = `${rotulo} em ${curso.nome}: abre o WhatsApp`;

  if (curso.modalidades.length === 1) {
    const modalidade = curso.modalidades[0];
    return (
      <WhatsAppLink
        mensagem={mensagemCurso(curso.nome, modalidade)}
        className={classes}
        ariaLabel={aria}
        evento="clique_whatsapp_curso"
        params={{ curso: curso.nome, modalidade }}
      >
        {rotulo}
        {icone}
      </WhatsAppLink>
    );
  }

  return (
    <>
      <button type="button" className={classes} onClick={() => setAberto(true)} aria-haspopup="dialog">
        {rotulo}
        {icone}
      </button>
      <Dialog open={aberto} onOpenChange={setAberto}>
        <DialogContent className="rounded-3xl p-7 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">Em qual formato?</DialogTitle>
            <DialogDescription className="text-base text-subtle">{curso.nome}</DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col gap-3">
            {curso.modalidades.map((m) => (
              <WhatsAppLink
                key={m}
                mensagem={mensagemCurso(curso.nome, m)}
                className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }), "w-full justify-between")}
                ariaLabel={`${m}: continuar no WhatsApp`}
                evento="clique_whatsapp_curso"
                params={{ curso: curso.nome, modalidade: m }}
              >
                {m}
                <span className="text-sm font-normal">Continuar no WhatsApp</span>
              </WhatsAppLink>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
