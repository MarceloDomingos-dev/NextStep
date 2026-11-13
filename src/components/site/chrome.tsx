"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { capturarUtms } from "@/lib/utm";
import { reenviarPendentes } from "@/lib/leads";
import { carregarAnalytics, lerConsentimento, salvarConsentimento } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** UTMs, reenvio de leads pendentes e analytics (se já houver aceite). */
export function ClientInit() {
  useEffect(() => {
    capturarUtms();
    reenviarPendentes();
    if (lerConsentimento() === "aceito") carregarAnalytics();
  }, []);
  return null;
}

/** Barra fixa no mobile: aparece depois do hero e some perto do rodapé. */
export function MobileCta() {
  const pathname = usePathname();
  const [visivel, setVisivel] = useState(false);
  const emCurso = pathname.startsWith("/cursos/") && pathname !== "/cursos/";
  const noDiagnostico = pathname.startsWith("/diagnostico");

  useEffect(() => {
    let pertoDoRodape = false;
    const rodape = document.getElementById("rodape");
    const obs = rodape
      ? new IntersectionObserver(([e]) => {
          pertoDoRodape = e.isIntersecting;
          atualizar();
        })
      : null;
    if (rodape) obs!.observe(rodape);
    function atualizar() {
      setVisivel(window.scrollY > window.innerHeight * 0.7 && !pertoDoRodape);
    }
    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    return () => {
      window.removeEventListener("scroll", atualizar);
      obs?.disconnect();
    };
  }, [pathname]);

  if (emCurso || noDiagnostico) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-[var(--ease-step)] lg:hidden",
        visivel ? "translate-y-0" : "translate-y-full",
      )}
      aria-hidden={!visivel}
      inert={!visivel}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <WhatsAppLink
          className={cn(buttonVariants({ variant: "outlineDark", size: "pillMd" }), "w-full")}
          ariaLabel="WhatsApp: abre o WhatsApp"
        >
          WhatsApp
        </WhatsAppLink>
        <Link href="/diagnostico/" className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "w-full")}>
          Diagnóstico
        </Link>
      </div>
    </div>
  );
}

export function BackToTop() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const on = () => setVisivel(window.scrollY > window.innerHeight * 1.2);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.querySelector<HTMLElement>("#conteudo")?.focus({ preventScroll: true });
      }}
      aria-label="Voltar ao topo"
      tabIndex={visivel ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-24 z-30 hidden size-12 items-center justify-center rounded-full border border-line bg-white shadow-lg transition-[opacity,transform] duration-300 hover:border-brand active:scale-95 lg:right-8 lg:bottom-8 lg:flex",
        visivel ? "opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      )}
    >
      <ArrowUp aria-hidden="true" className="size-5" />
    </button>
  );
}

export function CookieBanner() {
  const [mostrar, setMostrar] = useState(false);
  useEffect(() => {
    setMostrar(lerConsentimento() === null);
  }, []);
  if (!mostrar) return null;
  const escolher = (v: "aceito" | "recusado") => {
    salvarConsentimento(v);
    setMostrar(false);
  };
  return (
    <section
      aria-label="Aviso de cookies"
      className="anim-fade-up fixed inset-x-4 bottom-4 z-50 max-w-md rounded-3xl border border-ink-line bg-ink-2 p-5 text-[0.9375rem] text-[#d4d4d4] shadow-2xl sm:left-6 sm:right-auto sm:bottom-6"
    >
      <p>
        Usamos cookies para medir o desempenho do site e das campanhas, conforme a LGPD. Você escolhe.{" "}
        <Link href="/privacidade/" className="font-semibold text-white underline underline-offset-4">
          Política de privacidade
        </Link>
      </p>
      <div className="mt-4 flex gap-2.5">
        <button type="button" onClick={() => escolher("aceito")} className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "flex-1")}>
          Aceitar
        </button>
        <button type="button" onClick={() => escolher("recusado")} className={cn(buttonVariants({ variant: "outlineLight", size: "pillMd" }), "flex-1")}>
          Recusar
        </button>
      </div>
    </section>
  );
}
