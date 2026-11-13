import type { NextConfig } from "next";

/**
 * Site 100% estático: `npm run build` gera a pasta `out`,
 * publicada na Cloudflare Pages (veja README.md e DOMINIO.md).
 * O endereço do site fica em um lugar só: `siteUrl` em src/content/site.ts.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
