"use client";

import { site } from "@/content/site";

/**
 * GA4 e Meta Pixel só carregam depois do aceite no banner de cookies.
 * Eventos: clique_whatsapp_curso, inicio_diagnostico, lead_enviado, clique_whatsapp.
 */

const CHAVE_CONSENTIMENTO = "ns-cookies";
type Consentimento = "aceito" | "recusado";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; callMethod?: (...a: unknown[]) => void; push?: unknown };
    _fbq?: unknown;
  }
}

export function lerConsentimento(): Consentimento | null {
  try {
    const v = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function salvarConsentimento(v: Consentimento) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, v);
  } catch {
    /* navegador sem armazenamento: segue sem medir */
  }
  if (v === "aceito") carregarAnalytics();
}

let carregado = false;

export function carregarAnalytics() {
  if (carregado || typeof window === "undefined") return;
  carregado = true;
  const { ga4Id, metaPixelId } = site.integracoes;

  if (ga4Id) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id);
  }

  if (metaPixelId) {
    /* Snippet oficial do Meta Pixel, reescrito sem eval */
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    } as NonNullable<Window["fbq"]>;
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    window.fbq = fbq;
    window._fbq = fbq;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    fbq("init", metaPixelId);
    fbq("track", "PageView");
  }
}

export type Evento = "clique_whatsapp_curso" | "inicio_diagnostico" | "lead_enviado" | "clique_whatsapp";

export function track(evento: Evento, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || lerConsentimento() !== "aceito") return;
  window.gtag?.("event", evento, params);
  if (window.fbq) {
    if (evento === "lead_enviado") window.fbq("track", "Lead", params);
    else if (evento === "clique_whatsapp" || evento === "clique_whatsapp_curso") window.fbq("track", "Contact", params);
    else window.fbq("trackCustom", evento, params);
  }
}
