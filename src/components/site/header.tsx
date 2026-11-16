"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { navegacao, site } from "@/content/site";
import { Logo } from "@/components/site/picture";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

/** Header escuro (estilo V4): logo branco, menu enxuto e o botão "Falar com um especialista". */
export function Header() {
  const pathname = usePathname();
  const naHome = pathname === "/";
  const [rolou, setRolou] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(naHome ? "inicio" : null);
  const [menuAberto, setMenuAberto] = useState(false);

  // Fundo ao rolar + esconde ao descer, volta ao subir.
  useEffect(() => {
    let ultimo = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setRolou(y > 8);
        setEscondido(y > 320 && y > ultimo + 4);
        if (y < ultimo - 4) setEscondido(false);
        ultimo = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy na home.
  useEffect(() => {
    if (!naHome) return;
    const ids = navegacao.map((n) => n.secao);
    const alvos = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) setSecaoAtiva(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    alvos.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, [naHome]);

  const ativo = (item: (typeof navegacao)[number]) => {
    if (naHome) return secaoAtiva === item.secao;
    if (item.secao === "aprendizado") return pathname.startsWith("/cursos");
    if (item.secao === "solucoes") return pathname.startsWith("/marketing") || pathname.startsWith("/automacao");
    return false;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-white transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-step)]",
        rolou ? "border-b border-white/10 bg-ink/85 backdrop-blur-md" : "border-b border-transparent bg-ink",
        escondido && !menuAberto ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container-ns flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="flex shrink-0 items-center rounded-lg" aria-label="Next Step, página inicial">
          <Logo variante="claro" prioridade className="h-9 w-auto lg:h-11" />
        </Link>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-8 text-[0.9375rem] font-medium text-white/75">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={ativo(item) ? "page" : undefined}
                  className="group relative inline-flex min-h-11 items-center transition-colors hover:text-white aria-[current=page]:text-white"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-1.5 h-0.5 origin-left rounded-full bg-brand transition-transform duration-300 ease-[var(--ease-step)]",
                      ativo(item) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppLink
            mensagem={site.mensagens.especialista}
            className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "group hidden gap-1.5 sm:inline-flex")}
            ariaLabel="Falar com um especialista: abre o WhatsApp"
          >
            Falar com um especialista
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </WhatsAppLink>

          <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors hover:border-white/50 xl:hidden"
              aria-label="Abrir menu"
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm gap-0 border-l-0 bg-ink p-0 text-white">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-16 items-center px-6">
                <Logo variante="claro" className="h-9 w-auto" />
              </div>
              <nav aria-label="Menu" className="px-6 pt-4">
                <ul className="flex flex-col">
                  {navegacao.map((item) => (
                    <li key={item.href} className="border-b border-white/10">
                      <SheetClose
                        render={<Link href={item.href} />}
                        className="flex min-h-14 items-center font-display text-2xl font-bold"
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-6">
                <WhatsAppLink
                  mensagem={site.mensagens.especialista}
                  className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full")}
                  ariaLabel="Falar com um especialista: abre o WhatsApp"
                >
                  Falar com um especialista
                </WhatsAppLink>
                <SheetClose
                  render={<Link href="/diagnostico/" />}
                  className={cn(buttonVariants({ variant: "outlineLight", size: "pill" }), "w-full")}
                >
                  Diagnóstico gratuito
                </SheetClose>
                <p className="pt-2 text-center text-sm text-white/60">{site.contato.telefone}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
