/**
 * Diagnóstico gratuito: perguntas, recomendação e pontuação do lead.
 * A pontuação vai só para a planilha (não aparece para o visitante).
 */

export type Frente = "cursos" | "marketing" | "automacao";

export type Opcao = { valor: string; label: string; frente?: Frente };

export type Pergunta = {
  id: string;
  titulo: string;
  opcoes?: Opcao[];
  /** Opções que dependem da resposta da pergunta 1. */
  opcoesPor?: Record<string, Opcao[]>;
};

export const perguntas: Pergunta[] = [
  {
    id: "desafio",
    titulo: "Qual é o maior desafio da sua empresa hoje?",
    opcoes: [
      { valor: "vendas", label: "Vender mais" },
      { valor: "equipe", label: "Capacitar a equipe" },
      { valor: "processos", label: "Tarefa manual demais" },
      { valor: "nao_sei", label: "Não sei, quero um diagnóstico" },
    ],
  },
  {
    id: "situacao",
    titulo: "Qual destas situações mais parece com a sua?",
    opcoesPor: {
      vendas: [
        { valor: "poucos_clientes", label: "Poucos clientes novos", frente: "marketing" },
        { valor: "indicacao", label: "Dependo de indicação", frente: "marketing" },
        { valor: "anuncio_sem_retorno", label: "Invisto em anúncio e não vejo retorno", frente: "marketing" },
      ],
      equipe: [
        { valor: "desmotivada", label: "Equipe desmotivada", frente: "cursos" },
        { valor: "rotatividade", label: "Alta rotatividade", frente: "cursos" },
        { valor: "lideres", label: "Líderes sem preparo", frente: "cursos" },
      ],
      processos: [
        { valor: "mesmas_perguntas", label: "Respondo as mesmas perguntas o dia todo", frente: "automacao" },
        { valor: "dado_duplicado", label: "Os dados são digitados em mais de um lugar", frente: "automacao" },
        { valor: "relatorio_manual", label: "Relatórios são montados à mão", frente: "automacao" },
      ],
      nao_sei: [
        { valor: "faturamento_parado", label: "O faturamento parou de crescer", frente: "marketing" },
        { valor: "apagando_incendio", label: "Vivo apagando incêndio e não tenho tempo", frente: "automacao" },
        { valor: "time_nao_entrega", label: "O time não entrega o que eu preciso", frente: "cursos" },
      ],
    },
  },
  {
    id: "tempo",
    titulo: "Há quanto tempo esse problema existe?",
    opcoes: [
      { valor: "menos_3m", label: "Menos de 3 meses" },
      { valor: "3_12m", label: "De 3 a 12 meses" },
      { valor: "mais_1a", label: "Mais de 1 ano" },
    ],
  },
  {
    id: "porte",
    titulo: "Quantas pessoas trabalham na empresa?",
    opcoes: [
      { valor: "so_eu", label: "Só eu" },
      { valor: "2_10", label: "2 a 10" },
      { valor: "11_50", label: "11 a 50" },
      { valor: "mais_50", label: "Mais de 50" },
    ],
  },
  {
    id: "faturamento",
    titulo: "Qual o faturamento mensal aproximado?",
    opcoes: [
      { valor: "ate_20k", label: "Até R$ 20 mil" },
      { valor: "20k_100k", label: "R$ 20 a 100 mil" },
      { valor: "100k_500k", label: "R$ 100 a 500 mil" },
      { valor: "acima_500k", label: "Acima de R$ 500 mil" },
      { valor: "nao_informar", label: "Prefiro não informar" },
    ],
  },
  {
    id: "tentativas",
    titulo: "Já tentou resolver isso antes?",
    opcoes: [
      { valor: "nunca", label: "Nunca tentei" },
      { valor: "sozinho", label: "Tentei sozinho" },
      { valor: "contratou", label: "Já contratei alguém e não deu certo" },
    ],
  },
  {
    id: "prazo",
    titulo: "Para quando você quer resolver?",
    opcoes: [
      { valor: "este_mes", label: "Este mês" },
      { valor: "3_meses", label: "Nos próximos 3 meses" },
      { valor: "pesquisando", label: "Só estou pesquisando" },
    ],
  },
];

export const recomendacoes: Record<Frente, { titulo: string; texto: string; href: string }> = {
  cursos: {
    titulo: "Capacitar a equipe",
    texto:
      "Sua dor principal está nas pessoas. Um curso prático para líderes ou equipe é o caminho mais rápido.",
    href: "/cursos/",
  },
  marketing: {
    titulo: "Vender mais com marketing",
    texto: "Sua dor principal está em atrair clientes. Um plano de marketing com metas e custo por cliente resolve isso.",
    href: "/marketing/",
  },
  automacao: {
    titulo: "Automatizar tarefas manuais",
    texto: "Sua equipe perde horas com trabalho repetido. Automatizar o que se repete libera tempo e reduz erros.",
    href: "/automacao/",
  },
};

/** Curso sugerido conforme a situação escolhida (frente Cursos). */
export const cursoPorSituacao: Record<string, string> = {
  lideres: "lideranca-alta-performance",
  rotatividade: "lideranca-alta-performance",
  desmotivada: "comunicacao-assertiva",
  time_nao_entrega: "gestao-por-indicadores-kpis",
};

export const proximosPassos = [
  "Conversa de 20 minutos no WhatsApp",
  "Proposta sob medida",
  "Início com metas definidas",
];

/** Pontuação do lead (máximo 100). Só vai para a planilha. */
export const pontuacao = {
  prazo: { este_mes: 35, "3_meses": 20, pesquisando: 5 } as Record<string, number>,
  faturamento: { ate_20k: 5, "20k_100k": 15, "100k_500k": 25, acima_500k: 30, nao_informar: 10 } as Record<string, number>,
  porte: { so_eu: 5, "2_10": 10, "11_50": 17, mais_50: 20 } as Record<string, number>,
  tentativas: { nunca: 8, sozinho: 12, contratou: 15 } as Record<string, number>,
  faixas: { quente: 70, morno: 45 },
};
