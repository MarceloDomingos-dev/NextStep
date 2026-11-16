/** Textos das frentes de Marketing e Automação. */

export const marketing = {
  eyebrow: "Marketing",
  titulo: "Marketing que traz cliente, não curtida.",
  subtitulo:
    "Você posta, impulsiona e os clientes não chegam. Montamos o caminho do anúncio até a venda e medimos cada real investido.",
  resumoHome: {
    titulo: "Você posta, impulsiona e os clientes não chegam.",
    texto: "Estratégia, tráfego pago, redes sociais, branding e páginas de venda, com relatório de custo por cliente.",
    botao: "Diagnóstico de marketing",
  },
  dores: [
    "Depende de indicação para vender",
    "Investe em anúncio e não sabe o retorno",
    "Posta todo dia e o telefone não toca",
  ],
  entregas: [
    { titulo: "Estratégia e posicionamento", texto: "Quem é seu cliente e por que comprar de você." },
    { titulo: "Tráfego pago", texto: "Meta e Google Ads com custo por cliente acompanhado." },
    { titulo: "Redes sociais", texto: "Conteúdo que gera conversa de venda." },
    { titulo: "Branding", texto: "Uma marca que passa confiança." },
    { titulo: "Páginas de venda", texto: "Feitas para converter, não para enfeitar." },
  ],
  resultado:
    "Fluxo previsível de clientes novos, custo por cliente conhecido e relatório mensal em linguagem de negócio.",
  ctaFinal: "Quer saber onde seu marketing está perdendo venda?",
};

export const automacao = {
  eyebrow: "Automação de processos",
  titulo: "Trabalho manual vira processo que roda sozinho.",
  subtitulo: "Menos retrabalho, menos erro e mais horas livres para a sua equipe vender e atender.",
  resumoHome: {
    titulo: "Menos retrabalho, menos erro, mais horas livres.",
    antes: "Pedido digitado duas vezes",
    depois: "Entra uma vez e chega ao CRM",
    botao: "Mapear tarefas manuais",
  },
  dores: [
    "Mesma pergunta respondida 40 vezes por dia",
    "Dado digitado em dois lugares",
    "Relatório montado à mão toda semana",
  ],
  antesDepois: [
    {
      antes: "Atendente responde o mesmo orçamento o dia inteiro.",
      depois: "O WhatsApp responde e qualifica o cliente na hora.",
    },
    {
      antes: "Pedido digitado no WhatsApp e na planilha.",
      depois: "O pedido entra uma vez e chega ao CRM e ao financeiro.",
    },
    {
      antes: "Relatório da semana montado na sexta à noite.",
      depois: "Painel atualizado sozinho, toda manhã.",
    },
  ],
  solucoes: [
    "Atendimento e WhatsApp",
    "Integrações entre sistemas",
    "CRM e funil de vendas",
    "Relatórios e dashboards automáticos",
    "IA aplicada a tarefas repetitivas",
  ],
  passos: [
    { titulo: "Mapeamos", texto: "Listamos as tarefas manuais da equipe." },
    { titulo: "Priorizamos", texto: "Pelo tempo que cada uma consome." },
    { titulo: "Automatizamos", texto: "E testamos junto com a equipe." },
    { titulo: "Acompanhamos", texto: "Medimos e ajustamos." },
  ],
  ctaFinal: "Quantas horas por semana sua equipe gasta com tarefa repetida?",
};

export const comoFunciona = [
  { titulo: "Diagnóstico", texto: "Entendemos onde a empresa está e o que trava." },
  { titulo: "Plano", texto: "Prioridades, metas e prazos claros." },
  { titulo: "Execução", texto: "Colocamos em prática junto com a sua equipe." },
  { titulo: "Acompanhamento", texto: "Medimos, ajustamos e mostramos a evolução." },
];

/** Os três cards de "Nossas Soluções" na home. */
export const solucoes = [
  {
    id: "trafego",
    nome: "Gestão de Tráfego",
    problema: "Você investe em anúncio e não sabe quanto voltou.",
    solucao:
      "Campanhas no Meta Ads e no Google Ads montadas para gerar venda, com custo por cliente acompanhado e relatório mensal em linguagem de negócio.",
    entregas: ["Meta Ads e Google Ads", "Funil do anúncio à venda", "Relatório de custo por cliente"],
    href: "/marketing/",
    cta: "Ver como funciona",
    mensagem: "Olá! Vim pelo site e quero um diagnóstico de tráfego pago para a minha empresa.",
  },
  {
    id: "sites",
    nome: "Criação de Sites e Portfólios",
    problema: "Seu site não passa a confiança que a sua empresa tem.",
    solucao:
      "Sites institucionais, páginas de venda e portfólios rápidos, bonitos no celular e pensados para transformar visita em conversa no WhatsApp.",
    entregas: ["Site institucional", "Página de vendas", "Portfólio profissional"],
    href: null,
    cta: "Quero um site",
    mensagem: "Olá! Vim pelo site e quero um site (ou portfólio) novo para a minha empresa.",
  },
  {
    id: "automacao",
    nome: "Automação Empresarial",
    problema: "Sua equipe perde horas com tarefa repetida.",
    solucao:
      "WhatsApp que responde e qualifica, sistemas que conversam entre si, CRM organizado e relatórios que se montam sozinhos.",
    entregas: ["Atendimento no WhatsApp", "Integrações e CRM", "Relatórios automáticos"],
    href: "/automacao/",
    cta: "Ver exemplos",
    mensagem: "Olá! Vim pelo site e quero mapear as tarefas manuais da minha empresa para automatizar.",
  },
] as const;

/** Pilares de "Por que a Next Step" (seção Sobre). */
export const diferenciais = [
  { titulo: "Foco em venda, não em vaidade", texto: "Medimos clientes, vendas e horas economizadas. Curtida não paga boleto." },
  { titulo: "Um parceiro, várias frentes", texto: "Tráfego, site, automação e capacitação conversando entre si, sem cinco fornecedores." },
  { titulo: "Conhecimento que fica", texto: "Ensinamos o time a fazer junto, para a empresa não depender de ninguém." },
];
