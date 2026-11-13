"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { navegacao, site } from "@/content/site";
import { Logo } from "@/components/site/picture";
import { WhatsAppLink } from "@/components/site/whatsapp";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const naHome = pathname === "/";
  const [rolou, setRolou] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [secaoAtiva, setSecaoAtiva] = useState<string | null>(null);
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
          else setSecaoAtiva((atual) => (atual === e.target.id ? null : atual));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    alvos.forEach((a) => obs.observe(a));
    return () => obs.disconnect();
  }, [naHome]);

  const ativo = (item: (typeof navegacao)[number]) =>
    naHome ? secaoAtiva === item.secao : pathname.startsWith(item.href.replace(/\/$/, "")) && item.href !== "/#resultados";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[transform,background-color,border-color] duration-300 ease-[var(--ease-step)]",
        rolou ? "border-b border-line bg-white/90 backdrop-blur-md" : "border-b border-transparent bg-white",
        escondido && !menuAberto ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <div className="container-ns flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex items-center rounded-lg" aria-label="Next Step, página inicial">
          <Logo className="h-10 w-auto lg:h-[52px]" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10 text-base font-medium">
            {navegacao.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={ativo(item) ? "page" : undefined}
                  className="group relative inline-flex min-h-11 items-center"
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
          <Link
            href="/diagnostico/"
            className={cn(buttonVariants({ variant: "brand", size: "pillMd" }), "hidden sm:inline-flex")}
          >
            Diagnóstico gratuito
          </Link>

          <Sheet open={menuAberto} onOpenChange={setMenuAberto}>
            <SheetTrigger
              className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-white lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu aria-hidden="true" className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm gap-0 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-16 items-center px-6">
                <Logo className="h-9 w-auto" />
              </div>
              <nav aria-label="Menu" className="px-6 pt-4">
                <ul className="flex flex-col">
                  {[{ label: "Início", href: "/" }, ...navegacao].map((item) => (
                    <li key={item.href} className="border-b border-line">
                      <SheetClose
                        render={<Link href={item.href} />}
                        className="flex min-h-14 items-center text-2xl font-bold"
                      >
                        {item.label}
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-auto flex flex-col gap-3 p-6">
                <SheetClose
                  render={<Link href="/diagnostico/" />}
                  className={cn(buttonVariants({ variant: "brand", size: "pill" }), "w-full")}
                >
                  Diagnóstico gratuito
                </SheetClose>
                <WhatsAppLink
                  className={cn(buttonVariants({ variant: "outlineDark", size: "pill" }), "w-full")}
                  ariaLabel="Falar no WhatsApp: abre o WhatsApp"
                >
                  Falar no WhatsApp
                </WhatsAppLink>
                <p className="pt-2 text-center text-sm text-subtle">{site.contato.telefone}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
