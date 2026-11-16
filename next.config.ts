import type { NextConfig } from "next";
import { site } from "./src/content/site";

/**
 * Site 100% estático: `npm run build` gera a pasta `out`,
 * publicada no GitHub Pages pelo workflow .github/workflows/deploy.yml.
 *
 * O endereço do site fica em um lugar só: `siteUrl` em src/content/site.ts.
 * O caminho dele (hoje "/NextStep") vira o basePath. Com domínio próprio
 * (sem caminho), o basePath fica vazio sozinho.
 */
const basePath = new URL(site.siteUrl).pathname.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
