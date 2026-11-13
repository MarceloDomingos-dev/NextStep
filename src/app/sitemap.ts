import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { cursos } from "@/content/cursos";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["/", "/cursos/", "/marketing/", "/automacao/", "/diagnostico/", "/privacidade/"];
  const hoje = new Date();
  return [
    ...paginas.map((p) => ({
      url: `${site.siteUrl}${p}`,
      lastModified: hoje,
      priority: p === "/" ? 1 : p === "/privacidade/" ? 0.2 : 0.8,
    })),
    ...cursos.map((c) => ({
      url: `${site.siteUrl}/cursos/${c.slug}/`,
      lastModified: hoje,
      priority: 0.7,
    })),
  ];
}
