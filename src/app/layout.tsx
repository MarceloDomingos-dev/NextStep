import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { MotionProvider } from "@/components/site/motion";
import { BackToTop, ClientInit, CookieBanner, MobileCta } from "@/components/site/chrome";
import { JsonLd, organizacaoLd } from "@/components/site/json-ld";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${site.siteUrl}/`),
  title: {
    default: "Next Step · Cursos, marketing e automação para empresas",
    template: "%s · Next Step",
  },
  description:
    "Equipe preparada, marketing que vende e processos que rodam sozinhos. Cursos, marketing e automação em BH e online. Faça o diagnóstico gratuito.",
  applicationName: site.nome,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: "./",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Next Step: equipe preparada, marketing que vende e processos que rodam sozinhos." }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={archivo.variable} suppressHydrationWarning>
      <body>
        <a
          href="#conteudo"
          className="fixed top-2 left-2 z-[60] -translate-y-[300%] rounded-full bg-ink px-5 py-3 font-semibold text-white focus:translate-y-0"
        >
          Pular para o conteúdo
        </a>
        <MotionProvider>
          <Header />
          <main id="conteudo" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileCta />
          <BackToTop />
          <CookieBanner />
        </MotionProvider>
        <ClientInit />
        <JsonLd data={organizacaoLd()} />
      </body>
    </html>
  );
}
