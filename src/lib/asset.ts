import { site } from "@/content/site";

/**
 * Caminho de um arquivo de public/. No GitHub Pages o site fica em /NextStep,
 * então o prefixo (basePath) vem de siteUrl, via next.config.ts.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

/** Endereço completo de uma página do site (canônico, Open Graph, sitemap). */
export function absoluta(path: string) {
  return `${site.siteUrl}${path}`;
}
