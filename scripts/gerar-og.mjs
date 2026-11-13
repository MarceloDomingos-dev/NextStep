/**
 * Gera public/og.png (1200x630), a imagem que aparece quando o link do site
 * é compartilhado no WhatsApp, LinkedIn etc.
 * Rode à mão quando mudar a frase principal: npm run og
 * (não roda no build, porque depende das fontes do computador)
 */
import sharp from "sharp";

const linhas = ["Equipe preparada,", "marketing que vende", "e processos que", "rodam sozinhos."];
const passo = 44; // recuo de cada degrau
const x0 = 80;
const y0 = 250;
const lh = 86;

const texto = linhas
  .map(
    (l, i) =>
      `<text x="${x0 + passo * i}" y="${y0 + lh * i}" font-family="Arial Black, Arial, Helvetica, sans-serif" font-weight="900" font-size="64" letter-spacing="-2" fill="#0A0A0A">${l}</text>`,
  )
  .join("");

const y = (i) => y0 + lh * i + 18;
const escada = `M${x0} ${y(0)} H ${x0 + passo} V ${y(1)} H ${x0 + 2 * passo} V ${y(2)} H ${x0 + 3 * passo} V ${y(3)} H 1120`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="g" cx="100%" cy="0%" r="70%">
      <stop offset="0" stop-color="#FF8A1F" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#FF8A1F" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#FFFFFF"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="${escada}" fill="none" stroke="#EF6C22" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  ${texto}
  <text x="${x0}" y="590" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#555555">Cursos, marketing e automação para empresas</text>
</svg>`;

const logo = await sharp("public/imagens/logo.png").resize({ height: 110 }).toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 48, left: 64 }])
  .png({ compressionLevel: 9 })
  .toFile("public/og.png");

console.log("gerada public/og.png");
