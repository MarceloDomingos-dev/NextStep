import type { Metadata } from "next";
import { absoluta } from "@/lib/asset";
import { Quiz } from "@/components/diagnostico/quiz";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito",
  description: "Sete perguntas para descobrir se o que trava sua empresa é equipe, vendas ou processos.",
  alternates: { canonical: absoluta("/diagnostico/") },
  openGraph: { url: absoluta("/diagnostico/"), title: "Diagnóstico gratuito · Next Step" },
};

export default function DiagnosticoPage() {
  return (
    <section className="relative min-h-dvh overflow-x-clip bg-mist pt-24 pb-20 lg:pt-32 lg:pb-28">
      <div aria-hidden="true" className="glow absolute -top-40 -right-40 size-[640px]" />
      <div className="container-ns relative">
        <div className="mx-auto max-w-[720px]">
          <Quiz />
          <noscript>
            <p className="mt-6 rounded-2xl bg-white p-5">
              O diagnóstico precisa de JavaScript. Se preferir, chame a gente direto no WhatsApp: (31) 99820-9953.
            </p>
          </noscript>
        </div>
      </div>
    </section>
  );
}
