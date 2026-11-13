"use client";

/** Guarda as UTMs da primeira visita da sessão para enviar junto com o lead. */

const CHAVE = "ns-utm";
const CAMPOS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Utms = Partial<Record<(typeof CAMPOS)[number], string>> & { pagina_entrada?: string; referrer?: string };

export function capturarUtms() {
  try {
    const params = new URLSearchParams(window.location.search);
    const novas: Utms = {};
    CAMPOS.forEach((c) => {
      const v = params.get(c);
      if (v) novas[c] = v.slice(0, 200);
    });
    const atuais = lerUtms();
    if (Object.keys(novas).length || !atuais.pagina_entrada) {
      sessionStorage.setItem(
        CHAVE,
        JSON.stringify({
          ...atuais,
          ...novas,
          pagina_entrada: atuais.pagina_entrada ?? window.location.pathname,
          referrer: atuais.referrer ?? document.referrer.slice(0, 300),
        }),
      );
    }
  } catch {
    /* sem sessionStorage */
  }
}

export function lerUtms(): Utms {
  try {
    return JSON.parse(sessionStorage.getItem(CHAVE) ?? "{}") as Utms;
  } catch {
    return {};
  }
}
