# Site da Next Step

Site estático em Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui.
`npm run build` gera a pasta `out`, publicada no GitHub Pages em https://marcelodomingos-dev.github.io/NextStep/.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000/NextStep. Se a página parecer antiga, recarregue com Ctrl+F5.

Para testar a versão final (a mesma que vai ao ar), em http://localhost:8080/NextStep/:

```bash
npm run build
npm run start
```

## Onde editar o conteúdo

Tudo fica em `src/content/`. Procure por `[EDITAR]` para achar o que falta preencher.

| Arquivo | O que tem |
| --- | --- |
| `site.ts` | Endereço do site (`siteUrl`), contatos, redes, CNPJ, números da faixa, mensagens de WhatsApp |
| `cursos.ts` | Catálogo de cursos. Um bloco novo cria a página do curso sozinho |
| `servicos.ts` | Textos de Marketing, Automação e "Como funciona" |
| `faq.ts` | Perguntas frequentes da home |
| `quiz.ts` | Perguntas e recomendações do diagnóstico |

Todos os botões de WhatsApp usam `whatsappLink()` em `src/lib/whatsapp.ts`.

## Publicar no GitHub Pages

A publicação é automática: cada push nas branches `main` ou `redesign` roda o workflow
`.github/workflows/deploy.yml`, que gera o site e publica no GitHub Pages em 1 a 3 minutos.
Para acompanhar, abra a aba **Actions** do repositório.

Configuração do repositório (já feita):

| Onde | Valor |
| --- | --- |
| Settings > Pages > Source | GitHub Actions |
| Settings > Environments > github-pages | branches `main` e `redesign` liberadas |

Integrações (opcionais): em **Settings > Secrets and variables > Actions > Variables**, crie:

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | URL `/exec` do Google Apps Script que recebe os leads (veja `apps-script.gs`) |
| `NEXT_PUBLIC_GA4_ID` | ID do Google Analytics 4, ex.: `G-XXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel |

Depois de criar ou mudar uma variável, rode o workflow de novo (Actions > Publicar no GitHub Pages > Run workflow).

O endereço do site fica só em `siteUrl` (`src/content/site.ts`). O caminho dele (`/NextStep`) vira o prefixo das páginas no build.
Domínio próprio: veja `DOMINIO.md`.

## Outros comandos

- `npm run lint`: confere o código.
- `npm run imagens`: gera as versões WebP/AVIF das fotos (roda sozinho antes do build).
- `npm run og`: gera de novo a imagem de compartilhamento (`public/og.png`).

O site antigo está guardado em `legacy/index.html`.
