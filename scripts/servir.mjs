/**
 * Serve a pasta `out` no computador do mesmo jeito que o GitHub Pages:
 * o site responde em http://localhost:8080/NextStep/ (o prefixo vem de siteUrl).
 * Uso: npm run build && npm run start
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const PORTA = Number(process.env.PORT ?? 8080);
const RAIZ = path.resolve("out");
const site = await readFile("src/content/site.ts", "utf8");
const siteUrl = site.match(/siteUrl:\s*"([^"]+)"/)?.[1] ?? "";
const prefixo = new URL(siteUrl).pathname.replace(/\/$/, "");

const TIPOS = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

async function arquivo(caminho) {
  try {
    const s = await stat(caminho);
    if (s.isDirectory()) return arquivo(path.join(caminho, "index.html"));
    return caminho;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (prefixo && (url === "/" || !url.startsWith(prefixo))) {
    res.writeHead(302, { Location: `${prefixo}/` }).end();
    return;
  }
  const relativo = url.slice(prefixo.length) || "/";
  const destino = path.join(RAIZ, path.normalize(relativo));
  if (!destino.startsWith(RAIZ)) return res.writeHead(403).end();
  const achado = await arquivo(destino);
  if (!achado) {
    res.writeHead(404, { "Content-Type": TIPOS[".html"] });
    res.end(await readFile(path.join(RAIZ, "404.html")));
    return;
  }
  res.writeHead(200, { "Content-Type": TIPOS[path.extname(achado)] ?? "application/octet-stream" });
  res.end(await readFile(achado));
}).listen(PORTA, () => console.log(`Site em http://localhost:${PORTA}${prefixo}/`));
