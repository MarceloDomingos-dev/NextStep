# Site da Next Step

Site estático em Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui.
`npm run build` gera a pasta `out`, publicada na Cloudflare Pages.

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Se a página parecer antiga, recarregue com Ctrl+F5.

Para testar a versão final (a mesma que vai ao ar):

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

## Publicar na Cloudflare Pages

1. Em https://dash.cloudflare.com, abra **Workers e Pages** > **Criar** > **Pages** > **Conectar ao Git**.
2. Autorize o GitHub e escolha o repositório `MarceloDomingos-dev/NextStep`.
3. Preencha:

| Campo | Valor |
| --- | --- |
| Nome do projeto | `nextstepofc` (define o endereço `nextstepofc.pages.dev`) |
| Branch de produção | `main` |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |

4. Em **Variáveis de ambiente**, adicione as que já tiver (todas opcionais):

| Variável | Para que serve |
| --- | --- |
| `NEXT_PUBLIC_LEAD_WEBHOOK_URL` | URL `/exec` do Google Apps Script que recebe os leads (veja `apps-script.gs`) |
| `NEXT_PUBLIC_GA4_ID` | ID do Google Analytics 4, ex.: `G-XXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Meta Pixel |

5. Clique em **Salvar e implantar**. Cada commit na branch `main` publica o site de novo. Outras branches ganham um endereço de prévia.

Se o nome `nextstepofc` não estiver disponível, escolha outro e atualize `siteUrl` em `src/content/site.ts` com o endereço que a Cloudflare mostrar.

Domínio próprio: veja `DOMINIO.md`.

## Outros comandos

- `npm run lint`: confere o código.
- `npm run imagens`: gera as versões WebP/AVIF das fotos (roda sozinho antes do build).
- `npm run og`: gera de novo a imagem de compartilhamento (`public/og.png`).

O site antigo está guardado em `legacy/index.html`.
