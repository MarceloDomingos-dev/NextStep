/**
 * Dados gerais da Next Step. Edite aqui contatos, números e integrações.
 * Tudo marcado [EDITAR] é um dado que só a Next Step tem.
 */

export const site = {
  nome: "Next Step",
  slogan: "Sua jornada começa aqui.",
  descricao:
    "Equipe preparada, marketing que vende e processos que rodam sozinhos. Cursos, marketing e automação em BH e online.",

  /**
   * [EDITAR: domínio próprio]
   * Endereço público do site, sem barra no final. É o ÚNICO lugar onde o domínio aparece:
   * canônico, sitemap.xml, robots.txt, Open Graph/Twitter, JSON-LD e imagem de compartilhamento leem daqui.
   * Quando comprar o domínio, troque por "https://seudominio.com.br" (passo a passo em DOMINIO.md).
   */
  siteUrl: "https://nextstepofc.pages.dev",

  contato: {
    /** Só números: 55 + DDD + número. Usado por whatsappLink(). */
    whatsapp: "5531998209953",
    telefone: "(31) 99820-9953",
    email: "stepnext.soluctions@gmail.com",
    cidade: "Belo Horizonte",
    uf: "MG",
    atendimento: "Empresas de todo o Brasil",
  },

  redes: {
    instagram: { url: "https://www.instagram.com/nextstepofc/", usuario: "@nextstepofc" },
    /** Vazio = não aparece. [EDITAR] */
    linkedin: "",
  },

  /** [EDITAR] Preencha o CNPJ. Vazio = não aparece no rodapé. */
  cnpj: "",

  /** Integrações. Vazias = desligadas. Configure por variáveis de ambiente no workflow. */
  integracoes: {
    leadWebhookUrl: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ?? "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  },

  /** Mensagens padrão do WhatsApp. */
  mensagens: {
    geral: "Olá! Vim pelo site da Next Step e quero conversar sobre a minha empresa.",
    inCompany: "Olá! Vim pelo site e quero um treinamento in company para minha equipe.",
    marketing: "Olá! Vim pelo site e quero um diagnóstico de marketing para a minha empresa.",
    automacao: "Olá! Vim pelo site e quero mapear as tarefas manuais da minha empresa para automatizar.",
  },
} as const;

/**
 * Faixa de números da home. `visivel: false` esconde o item.
 * Só entram números confirmados pela Next Step.
 */
export const numeros = [
  { valor: 1, prefixo: "+R$ ", sufixo: " mi", legenda: "em vendas geradas", visivel: true },
  { valor: 100, prefixo: "+", sufixo: " mil", legenda: "vendas feitas no digital", visivel: true },
  { valor: 70, prefixo: "+", sufixo: "", legenda: "empresas atendidas", visivel: true },
] as const;

/** Provas reais (fotos em public/imagens). Para adicionar uma foto, inclua um bloco aqui. */
export const provas = [
  {
    src: "/imagens/prova-1m-vendas",
    largura: 900,
    altura: 1600,
    alt: "Placa de R$ 1 milhão em vendas recebida pela Next Step",
    legenda: "R$ 1 milhão em vendas",
  },
] as const;

export const navegacao = [
  { label: "Cursos", href: "/cursos/", secao: "cursos" },
  { label: "Marketing", href: "/marketing/", secao: "marketing" },
  { label: "Automação", href: "/automacao/", secao: "automacao" },
  { label: "Resultados", href: "/#resultados", secao: "resultados" },
] as const;
