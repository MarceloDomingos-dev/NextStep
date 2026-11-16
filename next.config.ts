import type { NextConfig } from "next";
import { site } from "./src/content/site";

/**
 * Site 100% estático: `npm run build` gera a pasta `out`,
 * publicada no GitHub Pages pelo workflow .github/workflows/deploy.yml.
 *
 * O endereço do site fica em um lugar só: `siteUrl` em src/content/site.ts.
 * O caminho dele vira o basePath. Com domínio próprio (sem caminho), fica vazio.
 * A cópia no GitHub Pages (marcelodomingos-dev.github.io/NextStep) define
 * BASE_PATH=/NextStep no workflow, então as duas hospedagens funcionam.
 */
const basePath = (process.env.BASE_PATH ?? new URL(site.siteUrl).pathname).replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
