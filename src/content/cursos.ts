/**
 * Catálogo de cursos. Para adicionar um curso, copie um bloco e edite.
 * A página /cursos/[slug] é gerada automaticamente a partir daqui.
 *
 * `modulosConfirmados: false` esconde o conteúdo programático no site
 * até a Next Step confirmar os módulos reais. [EDITAR]
 */

export type Modalidade = "Online" | "Presencial" | "In company";

export type Curso = {
  slug: string;
  nome: string;
  carga: number; // horas
  modalidades: Modalidade[];
  publico: string; // "Para ..."
  promessa: string;
  paraQuem: string[];
  aprender: string[];
  modulos: { titulo: string; descricao?: string }[];
  modulosConfirmados: boolean;
};

export const cursos: Curso[] = [
  {
    slug: "lideranca-alta-performance",
    nome: "Liderança de Alta Performance",
    carga: 16,
    modalidades: ["Presencial", "In company"],
    publico: "Para gestores e novos líderes.",
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
    modalidades: ["Online", "Presencial"],
    publico: "Para times comerciais.",
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
    publico: "Para atendimento e pós-venda.",
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
    publico: "Para qualquer área.",
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
    publico: "Para equipes e lideranças.",
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
    publico: "Para gestores e donos.",
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
    p: "Onde acontecem as turmas presenciais?",
    r: "Em Belo Horizonte e região. O local exato vai junto com a confirmação da turma.",
  },
  {
    p: "Como recebo o certificado?",
    r: "Por e-mail, em formato digital, ao concluir a carga horária.",
  },
];

export function getCurso(slug: string) {
  return cursos.find((c) => c.slug === slug);
}
