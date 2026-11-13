# Como colocar o domínio próprio no site

Hoje o site fica no endereço gratuito da Cloudflare Pages (`https://nextstepofc.pages.dev`).
Este guia é para o dia em que você comprar o domínio (por exemplo `nextstep.com.br`).
Nos exemplos abaixo, troque `seudominio.com.br` pelo domínio que você comprou.

Tempo total: cerca de 30 minutos de trabalho, mais a espera da troca de DNS (de alguns minutos a 24 horas).

## a) Registrar o domínio no Registro.br

1. Acesse https://registro.br e pesquise o nome que você quer.
2. Se estiver livre, crie sua conta (CPF ou CNPJ) e conclua o registro.
3. Pague a anuidade. O domínio fica ativo logo depois da confirmação do pagamento.

## b) Adicionar o site na Cloudflare e trocar os servidores DNS

1. Entre em https://dash.cloudflare.com com a mesma conta que hospeda o site.
2. Clique em **Adicionar um domínio** (Add a domain), digite `seudominio.com.br` e escolha o plano **Free**.
3. A Cloudflare vai mostrar dois **servidores de nomes** (nameservers), parecidos com `ana.ns.cloudflare.com` e `bob.ns.cloudflare.com`. Copie os dois.
4. No Registro.br, abra o domínio, vá em **DNS** > **Alterar servidores DNS**, apague os que estiverem lá e cole os dois da Cloudflare. Salve.
5. Volte à Cloudflare e clique em **Verificar servidores de nomes**. Quando a troca for reconhecida, o domínio aparece como **Ativo** e você recebe um e-mail. Pode levar de minutos a 24 horas.

## c) Conectar o domínio e o www ao projeto no Cloudflare Pages

1. Na Cloudflare, abra **Workers e Pages** e clique no projeto do site.
2. Vá na aba **Domínios personalizados** (Custom domains) > **Configurar um domínio personalizado**.
3. Digite `seudominio.com.br` e confirme. A Cloudflare cria o registro DNS sozinha.
4. Repita para `www.seudominio.com.br`.
5. Espere os dois aparecerem como **Ativo**. O certificado de segurança (HTTPS) é emitido automaticamente.

### Redirecionar o www para o endereço sem www

Faça pelo painel, que funciona sempre:

1. Na Cloudflare, abra o domínio `seudominio.com.br` > **Regras** > **Regras de redirecionamento** > **Criar regra**.
2. Escolha o modelo **Redirecionar de WWW para a raiz** (Redirect from WWW to root) e clique em **Implantar**.

O arquivo `public/_redirects` do projeto já tem a mesma regra pronta, comentada. Se quiser ativar também por lá, troque o domínio na linha e apague o `# ` do começo dela.

## d) A única linha de código a mudar

Abra o arquivo `src/content/site.ts` e troque o valor de `siteUrl`:

```ts
siteUrl: "https://seudominio.com.br",
```

Sem `www` e sem barra no final. Salve e envie para o GitHub (commit na branch principal). A Cloudflare publica a nova versão sozinha em 1 a 2 minutos.

Esse campo alimenta tudo que depende do domínio: endereço canônico, sitemap.xml, robots.txt, dados de compartilhamento (WhatsApp, LinkedIn, Facebook) e dados estruturados para o Google. Não há outro lugar para mexer.

## e) Como conferir se funcionou

1. **HTTPS**: abra `https://seudominio.com.br`. O site deve carregar com o cadeado no navegador.
2. **Redirecionamento do www**: abra `https://www.seudominio.com.br`. O endereço deve mudar sozinho para `https://seudominio.com.br`.
3. **Sitemap com o domínio novo**: abra `https://seudominio.com.br/sitemap.xml`. Todos os endereços da lista devem começar com `https://seudominio.com.br`. Se ainda aparecer `pages.dev`, o passo d) não foi publicado.
4. **Robots**: abra `https://seudominio.com.br/robots.txt`. A linha `Sitemap:` deve apontar para o domínio novo.
5. **Compartilhamento**: cole o link numa conversa do WhatsApp com você mesmo. Deve aparecer a imagem com a frase do site.

## f) Enviar o sitemap no Google Search Console

1. Acesse https://search.google.com/search-console e clique em **Adicionar propriedade**.
2. Escolha **Domínio** e digite `seudominio.com.br`.
3. O Google mostra um registro **TXT**. Na Cloudflare, abra o domínio > **DNS** > **Adicionar registro**, tipo **TXT**, nome `@`, e cole o valor. Salve e volte ao Search Console para clicar em **Verificar**.
4. No menu lateral, abra **Sitemaps**, digite `sitemap.xml` e clique em **Enviar**.
5. Em alguns dias o Google começa a mostrar as páginas indexadas.

## Depois da troca

- O endereço `nextstepofc.pages.dev` continua funcionando. Como o canônico passa a apontar para o domínio novo, o Google entende qual é o endereço oficial.
- Atualize o link do site na bio do Instagram e no perfil do WhatsApp Business.
