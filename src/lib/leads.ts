"use client";

import { site } from "@/content/site";

/**
 * Envio do lead ao Google Apps Script (apps-script.gs).
 * POST text/plain evita o preflight CORS. Se falhar, o lead fica numa fila
 * no localStorage e é reenviado na próxima visita.
 */

const FILA = "ns-leads-pendentes";

export type Lead = Record<string, string | number | boolean>;

async function postar(lead: Lead) {
  const url = site.integracoes.leadWebhookUrl;
  if (!url) return false;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(lead),
      signal: ctrl.signal,
    });
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}

function lerFila(): Lead[] {
  try {
    return JSON.parse(localStorage.getItem(FILA) ?? "[]") as Lead[];
  } catch {
    return [];
  }
}

function salvarFila(fila: Lead[]) {
  try {
    if (fila.length) localStorage.setItem(FILA, JSON.stringify(fila.slice(-20)));
    else localStorage.removeItem(FILA);
  } catch {
    /* sem armazenamento */
  }
}

/** Envia o lead. Retorna true se foi enviado agora, false se ficou na fila. */
export async function enviarLead(dados: Lead) {
  // O ID evita linha duplicada na planilha quando um lead pendente é reenviado.
  const lead: Lead = { ...dados, lead_id: novoId() };
  const ok = await postar(lead);
  if (!ok) salvarFila([...lerFila(), lead]);
  return ok;
}

function novoId() {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export async function reenviarPendentes() {
  const fila = lerFila();
  if (!fila.length || !site.integracoes.leadWebhookUrl) return;
  const restantes: Lead[] = [];
  for (const lead of fila) {
    if (!(await postar(lead))) restantes.push(lead);
  }
  salvarFila(restantes);
}
