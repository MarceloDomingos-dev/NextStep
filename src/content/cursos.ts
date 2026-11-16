/**
 * Catálogo de cursos. Para adicionar um curso, copie um bloco e edite.
 * A página /cursos/[slug] é gerada automaticamente a partir daqui.
 *
 * `modulosConfirmados: false` esconde o conteúdo programático no site
 * até a Next Step confirmar os módulos reais. [EDITAR]
 */

export type Modalidade = "Online" | "In company" | "Imersão Online";

export type Curso = {
  slug: string;
  nome: string;
  carga: number; // horas
  modalidades: Modalidade[];
  categoria: string; // área do conhecimento, aparece no card
  publico: string; // "Para ..."
  /** Frase curta da transformação, usada no card da vitrine. */
  transformacao: string;
  promessa: string;
  paraQuem: string[];
  aprender: string[];
  modulos: { titulo: string; descricao?: string }[];
  modulosConfirmados: boolean;
  /** true = aparece primeiro e com selo "Disponível agora". */
  destaque?: boolean;
};

export const cursos: Curso[] = [
  {
    slug: "primeiros-passos",
    nome: "Primeiros Passos",
    carga: 5, // [EDITAR] confirme a carga horária
    modalidades: ["Online"],
    categoria: "Empreendedorismo",
    publico: "Para quem quer empreender ou entender como uma empresa funciona.",
    transformacao: "Saia do zero e entenda, na prática, como uma empresa nasce, se organiza e ganha dinheiro.",
    promessa:
      "Entenda como uma empresa funciona por dentro: quem faz o quê, para onde ela vai e como o dinheiro circula, do jeito mais prático possível.",
    paraQuem: [
      "Jovens de 15 a 35 anos que querem empreender",
      "Quem está começando a trabalhar em uma empresa",
      "Quem tem uma ideia e não sabe por onde começar",
    ],
    aprender: [
      "Como uma empresa funciona de ponta a ponta",
      "Quem faz o quê em cada área",
      "Como transformar uma ideia em negócio",
      "O básico do dinheiro da empresa",
    ],
    modulos: [
      { titulo: "Como uma empresa funciona" },
      { titulo: "Quem faz o quê" },
      { titulo: "Para onde a empresa vai" },
      { titulo: "Da ideia ao negócio" },
      { titulo: "O dinheiro da empresa" },
    ],
    modulosConfirmados: true,
    destaque: true,
  },
  {
    slug: "lideranca-alta-performance",
    nome: "Liderança de Alta Performance",
    carga: 16,
    modalidades: ["In company"],
    categoria: "Liderança",
    publico: "Para gestores e novos líderes.",
    transformacao: "Do líder que apaga incêndio ao líder que delega, cobra e bate meta com o time.",
    promessa:
      "Forme líderes que delegam, dão feedback e batem metas com a equipe, sem depender do dono para cada decisão.",
    paraQuem: ["Gestores recém-promovidos", "Líderes que vivem apagando incêndio", "Donos que querem delegar com segurança"],
    aprender: [
      "Delegar com clareza de dono, prazo e resultado",
      "Dar feedback que muda comportamento",
      "Conduzir reuniões curtas e úteis",
      "Acompanhar metas da equipe toda semana",
    ],
    modulos: [
      { titulo: "O papel do líder", descricao: "Da execução à gestão: o que muda quando você passa a responder pelo resultado do time." },
      { titulo: "Delegação e acompanhamento" },
      { titulo: "Feedback e conversas difíceis" },
      { titulo: "Metas e rotina de gestão" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
  {
    slug: "vendas-consultivas-negociacao",
    nome: "Vendas Consultivas e Negociação",
    carga: 12,
    modalidades: ["Online"],
    categoria: "Vendas",
    publico: "Para times comerciais.",
    transformacao: "Pare de dar desconto para fechar: venda valor e negocie sem perder margem.",
    promessa: "Venda valor, contorne objeções e feche mais, sem dar desconto para fechar.",
    paraQuem: ["Vendedores e representantes", "Líderes comerciais", "Donos que ainda vendem"],
    aprender: [
      "Descobrir a real necessidade do cliente",
      "Apresentar valor antes do preço",
      "Contornar as objeções mais comuns",
      "Negociar sem perder margem",
    ],
    modulos: [
      { titulo: "Venda consultiva na prática" },
      { titulo: "Perguntas que vendem" },
      { titulo: "Objeções e negociação" },
      { titulo: "Fechamento e pós-venda" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
  {
    slug: "atendimento-que-fideliza",
    nome: "Atendimento que Fideliza",
    carga: 8,
    modalidades: ["In company", "Online"],
    categoria: "Atendimento",
    publico: "Para atendimento e pós-venda.",
    transformacao: "Transforme cada atendimento em cliente que volta e indica.",
    promessa: "Um padrão de atendimento que transforma cliente em cliente que volta e indica.",
    paraQuem: ["Equipes de atendimento e recepção", "Pós-venda e suporte", "Quem atende pelo WhatsApp"],
    aprender: [
      "Criar um padrão de atendimento",
      "Lidar com cliente insatisfeito",
      "Responder rápido sem perder qualidade",
      "Transformar atendimento em nova venda",
    ],
    modulos: [
      { titulo: "O padrão de atendimento" },
      { titulo: "Comunicação com o cliente" },
      { titulo: "Reclamações e situações difíceis" },
      { titulo: "Fidelização e indicação" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
  {
    slug: "gestao-do-tempo-produtividade",
    nome: "Gestão do Tempo e Produtividade",
    carga: 6,
    modalidades: ["Online"],
    categoria: "Produtividade",
    publico: "Para qualquer área.",
    transformacao: "Recupere horas da semana focando só no que gera resultado.",
    promessa: "Organização, prioridades e foco no que gera resultado.",
    paraQuem: ["Profissionais de qualquer área", "Líderes sem tempo para gerir", "Equipes com prazos estourados"],
    aprender: [
      "Priorizar o que gera resultado",
      "Planejar a semana em 20 minutos",
      "Cortar interrupções",
      "Usar ferramentas simples de organização",
    ],
    modulos: [
      { titulo: "Onde o tempo vai" },
      { titulo: "Prioridades" },
      { titulo: "Planejamento semanal" },
      { titulo: "Foco e rotina" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
  {
    slug: "comunicacao-assertiva",
    nome: "Comunicação Assertiva",
    carga: 8,
    modalidades: ["In company"],
    categoria: "Comunicação",
    publico: "Para equipes e lideranças.",
    transformacao: "Menos ruído entre as áreas e mais alinhamento no time.",
    promessa: "Menos ruído, menos conflito e mais alinhamento entre as áreas.",
    paraQuem: ["Equipes com ruído entre áreas", "Líderes que precisam alinhar o time", "Empresas em crescimento"],
    aprender: [
      "Falar com clareza e objetividade",
      "Dar e receber feedback",
      "Resolver conflitos sem desgaste",
      "Conduzir conversas difíceis",
    ],
    modulos: [
      { titulo: "Fundamentos da comunicação assertiva" },
      { titulo: "Escuta e clareza" },
      { titulo: "Feedback" },
      { titulo: "Conflitos e alinhamento" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
  {
    slug: "gestao-por-indicadores-kpis",
    nome: "Gestão por Indicadores (KPIs)",
    carga: 10,
    modalidades: ["Online", "In company"],
    categoria: "Administração",
    publico: "Para gestores e donos.",
    transformacao: "Troque o achismo por um painel simples que mostra para onde a empresa vai.",
    promessa: "Defina, acompanhe e use indicadores para decidir melhor.",
    paraQuem: ["Donos e diretores", "Gestores de área", "Empresas que decidem no achismo"],
    aprender: [
      "Escolher os indicadores certos",
      "Montar um painel simples",
      "Definir metas realistas",
      "Criar uma rotina de acompanhamento",
    ],
    modulos: [
      { titulo: "O que medir" },
      { titulo: "Indicadores por área" },
      { titulo: "Metas e painel" },
      { titulo: "Rotina de gestão" },
    ],
    modulosConfirmados: false, // [EDITAR]
  },
];

/** Dúvidas comuns a todas as páginas de curso. */
export const faqCurso = [
  {
    p: "Dá para fazer só com o meu time?",
    r: "Sim. No formato in company, o curso é feito só para a sua equipe, com exemplos da sua empresa.",
  },
  {
    p: "Como funcionam as aulas online?",
    r: "Ao vivo, pela internet. Depois da inscrição, você recebe pelo WhatsApp as datas e o link de acesso.",
  },
  {
    p: "Como recebo o certificado?",
    r: "Por e-mail, em formato digital, ao concluir a carga horária.",
  },
];

export function getCurso(slug: string) {
  return cursos.find((c) => c.slug === slug);
}
