# Como colocar o domínio próprio no site

Hoje o site fica no endereço gratuito do GitHub Pages: `https://marcelodomingos-dev.github.io/NextStep/`.
Este guia é para o dia em que você comprar o domínio (por exemplo `nextstep.com.br`).
Nos exemplos abaixo, troque `seudominio.com.br` pelo domínio que você comprou.

Tempo total: cerca de 30 minutos de trabalho, mais a espera do DNS (de alguns minutos a 24 horas).

## a) Registrar o domínio no Registro.br

1. Acesse https://registro.br e pesquise o nome que você quer.
2. Se estiver livre, crie sua conta (CPF ou CNPJ) e conclua o registro.
3. Pague a anuidade. O domínio fica ativo logo depois da confirmação do pagamento.

## b) Apontar o domínio para o GitHub Pages (DNS no Registro.br)

1. No Registro.br, abra o domínio e clique em **DNS** > **Editar zona** (se pedir, ative o "Modo avançado" com os servidores do próprio Registro.br).
2. Crie quatro registros do tipo **A** com o nome em branco (raiz do domínio), um para cada endereço:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Crie um registro do tipo **CNAME** com o nome `www` e o valor `marcelodomingos-dev.github.io`.
4. Salve. A propagação leva de minutos a algumas horas.

## c) Conectar o domínio ao site no GitHub

1. No GitHub, abra o repositório `NextStep` > **Settings** > **Pages**.
2. Em **Custom domain**, digite `seudominio.com.br` e clique em **Save**. O GitHub confere o DNS.
3. Quando aparecer o aviso de que o DNS está correto, marque **Enforce HTTPS**. O certificado de segurança pode levar até 1 hora para ser emitido.
4. O endereço com `www` passa a redirecionar sozinho para o endereço sem `www` (o GitHub faz isso porque você configurou o domínio sem `www` e criou o CNAME do `www` no passo b).

## d) A única linha de código a mudar

Abra o arquivo `src/content/site.ts` e troque o valor de `siteUrl`:

```ts
siteUrl: "https://seudominio.com.br",
```

Sem `www` e sem barra no final. Envie para o GitHub (commit na branch publicada). O site é publicado de novo sozinho em 1 a 3 minutos.

Esse campo alimenta tudo que depende do domínio: o prefixo das páginas (com domínio próprio o `/NextStep` some do endereço), o endereço canônico, sitemap.xml, robots.txt, dados de compartilhamento (WhatsApp, LinkedIn, Facebook) e dados estruturados para o Google. Não há outro lugar para mexer.

## e) Como conferir se funcionou

1. **HTTPS**: abra `https://seudominio.com.br`. O site deve carregar com o cadeado no navegador.
2. **Redirecionamento do www**: abra `https://www.seudominio.com.br`. O endereço deve mudar sozinho para `https://seudominio.com.br`.
3. **Sitemap com o domínio novo**: abra `https://seudominio.com.br/sitemap.xml`. Todos os endereços da lista devem começar com `https://seudominio.com.br`. Se ainda aparecer `github.io`, o passo d) não foi publicado.
4. **Robots**: abra `https://seudominio.com.br/robots.txt`. A linha `Sitemap:` deve apontar para o domínio novo.
5. **Compartilhamento**: cole o link numa conversa do WhatsApp com você mesmo. Deve aparecer a imagem com a frase do site.

## f) Enviar o sitemap no Google Search Console

1. Acesse https://search.google.com/search-console e clique em **Adicionar propriedade**.
2. Escolha **Domínio** e digite `seudominio.com.br`.
3. O Google mostra um registro **TXT**. No Registro.br, em **DNS** > **Editar zona**, crie um registro **TXT** com o nome em branco e cole o valor. Salve e volte ao Search Console para clicar em **Verificar**.
4. No menu lateral, abra **Sitemaps**, digite `sitemap.xml` e clique em **Enviar**.
5. Em alguns dias o Google começa a mostrar as páginas indexadas.

## Depois da troca

- O endereço antigo (`marcelodomingos-dev.github.io/NextStep`) passa a redirecionar para o domínio novo.
- Atualize o link do site na bio do Instagram e no perfil do WhatsApp Business.
