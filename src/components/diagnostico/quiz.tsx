"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Check } from "lucide-react";
import {
  cursoPorSituacao,
  perguntas,
  pontuacao,
  proximosPassos,
  recomendacoes,
  type Frente,
  type Opcao,
} from "@/content/quiz";
import { getCurso } from "@/content/cursos";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { enviarLead } from "@/lib/leads";
import { lerUtms } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/* ---------- Formulário ---------- */

const soDigitos = (v: string) => v.replace(/\D/g, "");

function mascaraWhats(v: string) {
  const d = soDigitos(v).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  cargo: z.string().trim().min(2, "Informe seu cargo."),
  whatsapp: z
    .string()
    .refine((v) => [10, 11].includes(soDigitos(v).length), "Informe um WhatsApp com DDD, por exemplo (31) 99999-9999."),
  email: z.string().trim().email("Informe um e-mail válido."),
  cidade: z.string().trim().min(2, "Informe sua cidade."),
  consentimento: z.boolean().refine((v) => v, "Para continuar, marque o consentimento."),
});

type Dados = z.infer<typeof schema>;
type Respostas = Record<string, string>;
type Etapa = "intro" | "perguntas" | "form" | "resultado";

const SESSAO = "ns-diagnostico";

/* ---------- Regras ---------- */

function opcoesDe(indice: number, respostas: Respostas): Opcao[] {
  const p = perguntas[indice];
  if (p.opcoes) return p.opcoes;
  return p.opcoesPor?.[respostas.desafio] ?? [];
}

function rotulo(indice: number, respostas: Respostas) {
  const p = perguntas[indice];
  return opcoesDe(indice, respostas).find((o) => o.valor === respostas[p.id])?.label ?? "";
}

function frenteDe(respostas: Respostas): Frente {
  return opcoesDe(1, respostas).find((o) => o.valor === respostas.situacao)?.frente ?? "marketing";
}

function pontuar(r: Respostas) {
  const total =
    (pontuacao.prazo[r.prazo] ?? 0) +
    (pontuacao.faturamento[r.faturamento] ?? 0) +
    (pontuacao.porte[r.porte] ?? 0) +
    (pontuacao.tentativas[r.tentativas] ?? 0);
  const classificacao = total >= pontuacao.faixas.quente ? "Quente" : total >= pontuacao.faixas.morno ? "Morno" : "Frio";
  return { total, classificacao };
}

/* ---------- Componente ---------- */

export function Quiz() {
  const [etapa, setEtapa] = useState<Etapa>("intro");
  const [indice, setIndice] = useState(0);
  const [respostas, setRespostas] = useState<Respostas>({});
  const [lead, setLead] = useState<Dados | null>(null);
  const [envioFalhou, setEnvioFalhou] = useState(false);
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primeiraRenderizacao = useRef(true);

  const total = perguntas.length;
  const pergunta = perguntas[indice];
  const opcoes = useMemo(() => opcoesDe(indice, respostas), [indice, respostas]);
  const escolhida = respostas[pergunta.id];

  // Retoma o andamento salvo ou a opção vinda da prévia da home (?r=vendas).
  useEffect(() => {
    try {
      const r = new URLSearchParams(window.location.search).get("r");
      if (r && perguntas[0].opcoes!.some((o) => o.valor === r)) {
        setRespostas({ desafio: r });
        setIndice(1);
        setEtapa("perguntas");
        track("inicio_diagnostico", { origem: "previa_home" });
        return;
      }
      const salvo = JSON.parse(sessionStorage.getItem(SESSAO) ?? "null") as { respostas: Respostas; indice: number } | null;
      if (salvo && Object.keys(salvo.respostas).length) {
        setRespostas(salvo.respostas);
        setIndice(Math.min(salvo.indice, total - 1));
        setEtapa("perguntas");
      }
    } catch {
      /* começa do zero */
    }
  }, [total]);

  useEffect(() => {
    if (etapa !== "perguntas") return;
    try {
      sessionStorage.setItem(SESSAO, JSON.stringify({ respostas, indice }));
    } catch {
      /* sem armazenamento */
    }
  }, [respostas, indice, etapa]);

  // Leva o foco ao título a cada troca de tela (leitores de tela e teclado).
  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    tituloRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [etapa, indice]);

  const responder = useCallback(
    (valor: string) => {
      setRespostas((r) => {
        const novo = { ...r, [pergunta.id]: valor };
        // Trocar o desafio invalida a situação escolhida antes.
        if (pergunta.id === "desafio" && r.desafio !== valor) delete novo.situacao;
        return novo;
      });
    },
    [pergunta.id],
  );

  const avancar = useCallback(() => {
    if (indice < total - 1) setIndice((i) => i + 1);
    else setEtapa("form");
  }, [indice, total]);

  const voltar = useCallback(() => {
    if (etapa === "form") setEtapa("perguntas");
    else if (indice > 0) setIndice((i) => i - 1);
    else setEtapa("intro");
  }, [etapa, indice]);

  // Teclado: 1 a 5 escolhe, Enter avança.
  useEffect(() => {
    if (etapa !== "perguntas") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const alvo = e.target as HTMLElement;
      if (alvo.tagName === "TEXTAREA" || (alvo.tagName === "INPUT" && (alvo as HTMLInputElement).type !== "radio")) return;
      const n = Number(e.key);
      if (n >= 1 && n <= opcoes.length) {
        e.preventDefault();
        responder(opcoes[n - 1].valor);
      } else if (e.key === "Enter" && escolhida && alvo.tagName !== "BUTTON" && alvo.tagName !== "A") {
        e.preventDefault();
        avancar();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [etapa, opcoes, escolhida, responder, avancar]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Dados>({
    resolver: zodResolver(schema),
    defaultValues: { nome: "", empresa: "", cargo: "", whatsapp: "", email: "", cidade: "", consentimento: false },
  });

  // Avisa antes de sair da página com o formulário começado.
  useEffect(() => {
    if (etapa !== "form" || !isDirty || isSubmitting) return;
    const aviso = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", aviso);
    return () => window.removeEventListener("beforeunload", aviso);
  }, [etapa, isDirty, isSubmitting]);

  const frente = frenteDe(respostas);
  const rec = recomendacoes[frente];
  const cursoSugerido = frente === "cursos" ? getCurso(cursoPorSituacao[respostas.situacao] ?? "") : undefined;

  const enviar = async (dados: Dados) => {
    const { total: pontos, classificacao } = pontuar(respostas);
    const utms = lerUtms();
    const ok = await enviarLead({
      data_hora: new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      classificacao,
      pontuacao: pontos,
      nome: dados.nome,
      empresa: dados.empresa,
      cargo: dados.cargo,
      whatsapp: dados.whatsapp,
      email: dados.email,
      cidade_uf: dados.cidade,
      frente_interesse: rec.titulo,
      curso_sugerido: cursoSugerido?.nome ?? "",
      desafio: rotulo(0, respostas),
      situacao: rotulo(1, respostas),
      tempo_problema: rotulo(2, respostas),
      porte: rotulo(3, respostas),
      faturamento: rotulo(4, respostas),
      tentativas: rotulo(5, respostas),
      prazo: rotulo(6, respostas),
      consentimento_lgpd: "Sim",
      pagina_origem: utms.pagina_entrada ?? window.location.pathname,
      referrer: utms.referrer ?? "",
      utm_source: utms.utm_source ?? "",
      utm_medium: utms.utm_medium ?? "",
      utm_campaign: utms.utm_campaign ?? "",
      utm_term: utms.utm_term ?? "",
      utm_content: utms.utm_content ?? "",
      dispositivo: window.matchMedia("(max-width: 767px)").matches ? "Celular" : "Computador",
      user_agent: navigator.userAgent.slice(0, 200),
    });
    setEnvioFalhou(!ok);
    setLead(dados);
    setEtapa("resultado");
    track("lead_enviado", { frente });
    try {
      sessionStorage.removeItem(SESSAO);
    } catch {
      /* ok */
    }
  };

  const refazer = () => {
    setRespostas({});
    setIndice(0);
    setLead(null);
    setEtapa("intro");
  };

  const cartao = "rounded-3xl border border-line bg-white p-6 shadow-[0_20px_60px_-45px_rgba(0,0,0,0.3)] sm:p-9 lg:p-12";
  const tituloClasse = "font-extrabold tracking-[-0.025em] outline-none";

  /* ---------- Abertura ---------- */
  if (etapa === "intro") {
    return (
      <div className={cartao}>
        <p className="eyebrow">Diagnóstico gratuito</p>
        <h1 ref={tituloRef} tabIndex={-1} className={cn(tituloClasse, "mt-3 text-[2rem] leading-[1.06] lg:text-5xl")}>
          Descubra o próximo passo da sua empresa
        </h1>
        <p className="mt-5 text-lg text-body">
          Sete perguntas rápidas para entender se o que trava o crescimento é equipe, vendas ou processos. No fim, você
          recebe uma recomendação e fala com a gente no WhatsApp.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {["7 perguntas", "Cerca de 2 minutos", "Sem custo"].map((t) => (
            <li key={t} className="chip text-sm">
              {t}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            setEtapa("perguntas");
            track("inicio_diagnostico", { origem: "pagina" });
          }}
          className={cn(buttonVariants({ variant: "brand", size: "pill" }), "mt-8 w-full sm:w-auto")}
        >
          Começar
        </button>
      </div>
    );
  }

  /* ---------- Perguntas ---------- */
  if (etapa === "perguntas") {
    const pct = Math.round((indice / total) * 100);
    return (
      <div className={cartao}>
        <div className="flex justify-between text-sm text-subtle">
          <span>
            Pergunta {indice + 1} de {total}
          </span>
          <span aria-hidden="true">{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Andamento do diagnóstico"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={indice}
          aria-valuetext={`Pergunta ${indice + 1} de ${total}`}
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#ededed]"
        >
          <div
            className="h-full w-full origin-left rounded-full bg-[image:var(--grad-brand)] transition-transform duration-500 ease-[var(--ease-step)]"
            style={{ transform: `scaleX(${Math.max(indice / total, 0.02)})` }}
          />
        </div>

        <fieldset className="mt-8">
          <legend className="w-full">
            <h1 ref={tituloRef} tabIndex={-1} className={cn(tituloClasse, "text-2xl leading-tight lg:text-[2rem]")}>
              {pergunta.titulo}
            </h1>
          </legend>
          <div className="mt-6 flex flex-col gap-2.5">
            {opcoes.map((o, i) => {
              const marcada = escolhida === o.valor;
              return (
                <label
                  key={o.valor}
                  className={cn(
                    "flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-200 has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand",
                    marcada ? "border-brand bg-brand-tint font-semibold" : "border-line bg-white hover:border-[#a3a3a3]",
                  )}
                >
                  <input
                    type="radio"
                    name={pergunta.id}
                    value={o.valor}
                    checked={marcada}
                    onChange={() => responder(o.valor)}
                    onClick={(e) => {
                      // Clique de mouse ou toque avança sozinho; setas do teclado só escolhem.
                      if (e.detail > 0) {
                        responder(o.valor);
                        setTimeout(avancar, 220);
                      }
                    }}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "hidden size-7 shrink-0 items-center justify-center rounded-lg border text-sm font-semibold sm:flex",
                      marcada ? "border-brand bg-white text-brand-text" : "border-line text-subtle",
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1">{o.label}</span>
                  <Check
                    aria-hidden="true"
                    strokeWidth={3}
                    className={cn("size-5 shrink-0 text-brand transition-opacity", marcada ? "opacity-100" : "opacity-0")}
                  />
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3">
          <button type="button" onClick={voltar} className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }))}>
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar
          </button>
          <button
            type="button"
            onClick={avancar}
            disabled={!escolhida}
            className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "min-w-32")}
          >
            {indice === total - 1 ? "Concluir" : "Avançar"}
          </button>
        </div>
        <p className="mt-5 hidden text-sm text-subtle lg:block">
          Dica: use as teclas 1 a {opcoes.length} para escolher e Enter para avançar.
        </p>
      </div>
    );
  }

  /* ---------- Formulário ---------- */
  if (etapa === "form") {
    const campo =
      "mt-1.5 h-12 w-full rounded-xl border border-[#bdbdbd] bg-white px-4 text-base placeholder:text-[#8a8a8a] aria-invalid:border-destructive";
    const campos: { nome: keyof Dados; label: string; tipo?: string; auto: string; modo?: "tel" | "email" | "text"; ex: string }[] = [
      { nome: "nome", label: "Nome", auto: "name", ex: "Maria Silva…" },
      { nome: "empresa", label: "Empresa", auto: "organization", ex: "Nome da empresa…" },
      { nome: "cargo", label: "Cargo", auto: "organization-title", ex: "Sócia, gerente…" },
      { nome: "whatsapp", label: "WhatsApp (com DDD)", tipo: "tel", auto: "tel-national", modo: "tel", ex: "(31) 99999-9999…" },
      { nome: "email", label: "E-mail", tipo: "email", auto: "email", modo: "email", ex: "voce@empresa.com.br…" },
      { nome: "cidade", label: "Cidade/UF", auto: "address-level2", ex: "Belo Horizonte/MG…" },
    ];
    return (
      <div className={cartao}>
        <h1 ref={tituloRef} tabIndex={-1} className={cn(tituloClasse, "text-2xl leading-tight lg:text-[2rem]")}>
          Sua recomendação está pronta. Para quem enviamos?
        </h1>
        <form
          noValidate
          onSubmit={handleSubmit(enviar, (erros) => {
            const primeiro = Object.keys(erros)[0];
            document.getElementById(`campo-${primeiro}`)?.focus();
          })}
          className="mt-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {campos.map((c) => {
              const erro = errors[c.nome]?.message;
              const reg = register(c.nome as Exclude<keyof Dados, "consentimento">);
              return (
                <div key={c.nome}>
                  <label htmlFor={`campo-${c.nome}`} className="text-[0.9375rem] font-semibold">
                    {c.label}
                  </label>
                  <input
                    id={`campo-${c.nome}`}
                    type={c.tipo ?? "text"}
                    inputMode={c.modo}
                    autoComplete={c.auto}
                    placeholder={c.ex}
                    spellCheck={c.nome === "email" || c.nome === "whatsapp" ? false : undefined}
                    aria-invalid={erro ? true : undefined}
                    aria-describedby={erro ? `erro-${c.nome}` : undefined}
                    className={campo}
                    {...reg}
                    onChange={(e) => {
                      if (c.nome === "whatsapp") {
                        e.target.value = mascaraWhats(e.target.value);
                        setValue("whatsapp", e.target.value, { shouldValidate: !!errors.whatsapp });
                      } else {
                        void reg.onChange(e);
                      }
                    }}
                  />
                  {erro && (
                    <p id={`erro-${c.nome}`} role="alert" className="mt-1.5 text-sm font-medium text-destructive">
                      {erro}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem]">
              <input
                id="campo-consentimento"
                type="checkbox"
                aria-invalid={errors.consentimento ? true : undefined}
                aria-describedby={errors.consentimento ? "erro-consentimento" : undefined}
                className="mt-0.5 size-6 shrink-0 rounded-md accent-[#EF6C22]"
                {...register("consentimento")}
              />
              <span>
                Aceito que a Next Step use estes dados para entrar em contato sobre o diagnóstico, conforme a{" "}
                <Link href="/privacidade/" target="_blank" className="font-semibold underline underline-offset-4">
                  Política de privacidade
                </Link>
                .
              </span>
            </label>
            {errors.consentimento && (
              <p id="erro-consentimento" role="alert" className="mt-1.5 text-sm font-medium text-destructive">
                {errors.consentimento.message}
              </p>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <button type="button" onClick={voltar} className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }))}>
              <ArrowLeft aria-hidden="true" className="size-4" />
              Voltar
            </button>
            <button type="submit" disabled={isSubmitting} className={cn(buttonVariants({ variant: "brand", size: "pillMd" }))}>
              {isSubmitting ? "Enviando…" : "Ver minha recomendação"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  /* ---------- Resultado ---------- */
  const primeiroNome = lead?.nome.split(" ")[0] ?? "";
  const mensagem = [
    `Olá! Sou ${lead?.nome}, da ${lead?.empresa} (${lead?.cidade}).`,
    "Fiz o diagnóstico no site da Next Step.",
    `Desafio: ${rotulo(1, respostas)}.`,
    `Há quanto tempo: ${rotulo(2, respostas)}.`,
    `Equipe: ${rotulo(3, respostas)}.`,
    `Recomendação: ${rec.titulo}${cursoSugerido ? ` (curso ${cursoSugerido.nome})` : ""}.`,
    "Quero conversar.",
  ].join("\n");

  return (
    <div className={cartao}>
      <p className="eyebrow" aria-live="polite">
        {primeiroNome}, o próximo passo da {lead?.empresa} é…
      </p>
      <h1 ref={tituloRef} tabIndex={-1} className={cn(tituloClasse, "mt-3 text-[2rem] leading-[1.06] lg:text-5xl")}>
        {rec.titulo}
      </h1>
      <p className="mt-5 text-lg text-body">{rec.texto}</p>
      {cursoSugerido && (
        <p className="mt-4 rounded-2xl bg-brand-tint p-4">
          Sugestão de curso:{" "}
          <Link href={`/cursos/${cursoSugerido.slug}/`} className="font-bold underline underline-offset-4">
            {cursoSugerido.nome} ({cursoSugerido.carga}h)
          </Link>
        </p>
      )}

      <h2 className="mt-8 text-lg font-bold">Como seguimos</h2>
      <ol className="mt-4 flex flex-col gap-3">
        {proximosPassos.map((p, i) => (
          <li key={p} className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-brand text-sm font-extrabold text-brand-text">
              {i + 1}
            </span>
            {p}
          </li>
        ))}
      </ol>

      {envioFalhou && (
        <p role="status" className="mt-6 rounded-2xl border border-line bg-mist p-4 text-[0.9375rem] text-body">
          Não conseguimos registrar seus dados agora. Eles ficaram salvos neste navegador e serão reenviados. Você já pode
          seguir para o WhatsApp.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <WhatsAppLink
          mensagem={mensagem}
          className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full px-3 text-[0.9375rem] sm:w-auto sm:px-7 sm:text-base")}
          ariaLabel="Falar com um especialista: abre o WhatsApp"
          params={{ origem: "diagnostico", frente }}
        >
          Falar com um especialista no WhatsApp
        </WhatsAppLink>
        <Link href={rec.href} className="inline-flex min-h-12 items-center justify-center px-2 font-semibold underline underline-offset-4">
          Ver detalhes
        </Link>
      </div>
      <button type="button" onClick={refazer} className="mt-6 inline-flex min-h-11 items-center text-[0.9375rem] text-subtle underline underline-offset-4">
        Refazer o diagnóstico
      </button>
    </div>
  );
}
