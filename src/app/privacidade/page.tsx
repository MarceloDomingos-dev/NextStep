import type { Metadata } from "next";
import { absoluta } from "@/lib/asset";
import { site } from "@/content/site";
import { Trilha } from "@/components/site/trilha";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Next Step trata os seus dados pessoais, conforme a LGPD.",
  alternates: { canonical: absoluta("/privacidade/") },
  openGraph: { url: absoluta("/privacidade/"), title: "Política de privacidade · Next Step" },
};

const email = site.contato.email;

const SECOES: { titulo: string; texto: string }[] = [
  {
    titulo: "Quem é o responsável",
    texto: `${site.nome}, com sede em ${site.contato.cidade}/${site.contato.uf}${site.cnpj ? `, CNPJ ${site.cnpj}` : ""}. Para qualquer assunto sobre os seus dados, fale com a gente pelo e-mail ${email}.`,
  },
  {
    titulo: "Quais dados coletamos",
    texto:
      "Nome, empresa, cargo, WhatsApp, e-mail, cidade/UF e as respostas do diagnóstico, informados voluntariamente por você. Também registramos dados técnicos do envio: data e hora, página de origem, parâmetros de campanha (UTM), tipo de dispositivo e navegador.",
  },
  {
    titulo: "Para que usamos",
    texto:
      "Gerar a recomendação do diagnóstico, entrar em contato sobre os nossos serviços, preparar propostas e melhorar o nosso atendimento. Não vendemos os seus dados.",
  },
  {
    titulo: "Base legal",
    texto:
      "O seu consentimento, dado ao marcar a caixa do formulário, e a realização de procedimentos preliminares a um contrato que você solicitou (art. 7º, incisos I e V, da LGPD).",
  },
  {
    titulo: "Com quem compartilhamos",
    texto:
      "Os dados do formulário ficam guardados em uma planilha Google usada apenas pela nossa equipe, e um aviso por e-mail chega à equipe a cada envio. Ferramentas de medição, como Google Analytics e Meta Pixel, só são ativadas se você aceitar os cookies.",
  },
  {
    titulo: "Cookies e armazenamento no navegador",
    texto:
      "Usamos cookies de medição apenas com a sua autorização no aviso de cookies. O site também guarda no seu navegador o andamento do diagnóstico e, se a conexão falhar, uma cópia do formulário para reenviar depois.",
  },
  {
    titulo: "Por quanto tempo guardamos",
    texto:
      "Mantemos os dados pelo tempo necessário para as finalidades acima ou até você pedir a exclusão, respeitando obrigações legais.",
  },
  {
    titulo: "Seus direitos",
    texto: `Você pode pedir a confirmação, o acesso, a correção, a exclusão ou a portabilidade dos seus dados e revogar o consentimento a qualquer momento pelo e-mail ${email}. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).`,
  },
  {
    titulo: "Segurança",
    texto:
      "Adotamos medidas técnicas e administrativas para proteger os seus dados contra acessos não autorizados, perda ou uso indevido.",
  },
];

export default function PrivacidadePage() {
  return (
    <section className="pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div className="container-ns">
        <Trilha itens={[{ label: "Política de privacidade" }]} />
        <div className="max-w-[68ch]">
          <h1
            className="mt-8 font-extrabold tracking-[-0.03em]"
            style={{ fontSize: "clamp(2rem, 1.3rem + 3vw, 3.5rem)", lineHeight: 1.05 }}
          >
            Política de privacidade
          </h1>
          <p className="mt-6 text-lg text-body">
            A {site.nome} respeita a sua privacidade e trata os seus dados pessoais de acordo com a Lei Geral de Proteção de
            Dados Pessoais (LGPD, Lei nº 13.709/2018).
          </p>
          {SECOES.map((s) => (
            <div key={s.titulo}>
              <h2 className="mt-10 text-xl font-bold lg:text-2xl">{s.titulo}</h2>
              <p className="mt-3 text-body">{s.texto}</p>
            </div>
          ))}
          <p className="mt-10 text-sm text-subtle">Última atualização: novembro de 2026.</p>
        </div>
      </div>
    </section>
  );
}
