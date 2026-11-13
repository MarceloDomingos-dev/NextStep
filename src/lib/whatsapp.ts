import { site } from "@/content/site";

/** Único ponto que monta links do WhatsApp. Todos os CTAs usam esta função. */
export function whatsappLink(mensagem: string = site.mensagens.geral) {
  return `https://wa.me/${site.contato.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

export function mensagemCurso(nome: string, modalidade: string) {
  return `Olá! Vim pelo site e quero saber mais sobre o curso ${nome} (${modalidade}).`;
}
