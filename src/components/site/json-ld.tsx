import { site } from "@/content/site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON gerado no build a partir do conteúdo do site.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function organizacaoLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.siteUrl}/#organizacao`,
    name: site.nome,
    slogan: site.slogan,
    description: site.descricao,
    url: `${site.siteUrl}/`,
    logo: `${site.siteUrl}/imagens/logo.png`,
    image: `${site.siteUrl}/imagens/prova-1m-vendas.jpg`,
    telephone: "+55 31 99820-9953",
    email: site.contato.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.contato.cidade,
      addressRegion: site.contato.uf,
      addressCountry: "BR",
    },
    areaServed: [{ "@type": "City", name: "Belo Horizonte" }, { "@type": "Country", name: "Brasil" }],
    sameAs: [site.redes.instagram.url, site.redes.linkedin].filter(Boolean),
  };
}

export function faqLd(itens: { p: string; r: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((i) => ({
      "@type": "Question",
      name: i.p,
      acceptedAnswer: { "@type": "Answer", text: i.r },
    })),
  };
}
