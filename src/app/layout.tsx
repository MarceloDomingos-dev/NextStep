import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { absoluta, asset } from "@/lib/asset";
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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(`${site.siteUrl}/`),
  title: {
    default: "Next Step · Tráfego, sites, automação e educação para empresas",
    template: "%s · Next Step",
  },
  description:
    "Mais vendas no digital, menos trabalho manual e uma equipe pronta para crescer. Gestão de tráfego, criação de sites, automação empresarial e cursos. Fale com um especialista.",
  applicationName: site.nome,
  alternates: { canonical: absoluta("/") },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: absoluta("/"),
    images: [{ url: absoluta("/og.png"), width: 1200, height: 630, alt: "Next Step: equipe preparada, marketing que vende e processos que rodam sozinhos." }],
  },
  twitter: { card: "summary_large_image", images: [absoluta("/og.png")] },
  icons: { icon: [{ url: asset("/icon.svg"), type: "image/svg+xml" }] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable} ${serif.variable}`} suppressHydrationWarning>
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
