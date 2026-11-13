import Link from "next/link";
import { site } from "@/content/site";
import { Logo } from "@/components/site/picture";
import { WhatsAppLink } from "@/components/site/whatsapp";

export function Footer() {
  const { contato, redes } = site;
  return (
    <footer id="rodape" className="bg-ink text-[#bdbdbd]">
      <div className="container-ns grid gap-10 py-16 text-[0.9375rem] sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo variante="claro" className="h-10 w-auto" />
          <p className="mt-4">{site.slogan}</p>
        </div>
        <nav aria-label="Soluções">
          <h2 className="font-semibold text-white">Soluções</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {[
              ["Cursos", "/cursos/"],
              ["Marketing", "/marketing/"],
              ["Automação", "/automacao/"],
              ["Diagnóstico gratuito", "/diagnostico/"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link href={href} className="inline-flex min-h-10 items-center hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="font-semibold text-white">Contato</h2>
          <ul className="mt-3 flex flex-col gap-1">
            <li>
              <WhatsAppLink className="inline-flex min-h-10 items-center hover:text-white" ariaLabel={`WhatsApp ${contato.telefone}: abre o WhatsApp`}>
                {contato.telefone}
              </WhatsAppLink>
            </li>
            <li>
              <a href={`mailto:${contato.email}`} className="inline-flex min-h-10 items-center break-all hover:text-white">
                {contato.email}
              </a>
            </li>
            <li className="flex min-h-10 items-center">
              {contato.cidade}, {contato.uf}
            </li>
            <li>
              <a
                href={redes.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center hover:text-white"
              >
                Instagram {redes.instagram.usuario}
              </a>
            </li>
            {redes.linkedin && (
              <li>
                <a href={redes.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center hover:text-white">
                  LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-white">Empresa</h2>
          <ul className="mt-3 flex flex-col gap-1">
            <li>
              <Link href="/privacidade/" className="inline-flex min-h-10 items-center hover:text-white">
                Política de privacidade
              </Link>
            </li>
            {site.cnpj && <li className="flex min-h-10 items-center">CNPJ {site.cnpj}</li>}
          </ul>
        </div>
      </div>
      <div className="container-ns border-t border-ink-line py-6 pb-28 text-sm lg:pb-6">
        © {new Date().getFullYear()} {site.nome}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
