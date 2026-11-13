/**
 * Gera versões WebP e AVIF responsivas das imagens reais em public/imagens.
 * Roda antes do build (npm run build) e pode ser chamado com: npm run imagens
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const ORIGEM = "public/imagens";
const DESTINO = "public/imagens/otimizadas";

const IMAGENS = [
  { arquivo: "prova-1m-vendas.jpg", larguras: [360, 600, 900] },
  { arquivo: "prova-500k-vendas.jpg", larguras: [360, 600, 900] },
  { arquivo: "logo.png", larguras: [240, 480] },
  { arquivo: "logo-branco.png", larguras: [240, 480] },
];

async function existeMaisNovo(saida, entrada) {
  try {
    const [a, b] = await Promise.all([stat(saida), stat(entrada)]);
    return a.mtimeMs >= b.mtimeMs;
  } catch {
    return false;
  }
}

await mkdir(DESTINO, { recursive: true });

for (const { arquivo, larguras } of IMAGENS) {
  const entrada = path.join(ORIGEM, arquivo);
  const base = path.parse(arquivo).name;
  for (const w of larguras) {
    for (const formato of ["webp", "avif"]) {
      const saida = path.join(DESTINO, `${base}-${w}.${formato}`);
      if (await existeMaisNovo(saida, entrada)) continue;
      // Logos: corta a margem vazia em volta antes de redimensionar.
      const base0 = arquivo.startsWith("logo") ? sharp(await sharp(entrada).trim().toBuffer()) : sharp(entrada);
      const img = base0.resize({ width: w, withoutEnlargement: true });
      await (formato === "webp" ? img.webp({ quality: 78 }) : img.avif({ quality: 55 })).toFile(saida);
      console.log("gerada", saida);
    }
  }
}
