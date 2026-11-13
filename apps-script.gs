/**
 * ============================================================================
 *  NEXT STEP — Receptor de leads do site → Planilha Google + aviso por e-mail
 * ============================================================================
 *
 *  Este script recebe o POST (JSON) enviado pelo diagnóstico do site,
 *  grava cada lead como uma nova linha na aba "Leads" da planilha e
 *  envia um e-mail de aviso para a equipe.
 *  Não precisa de servidor: o Google hospeda tudo de graça.
 *
 *  ---------------------------------------------------------------------------
 *  PASSO A PASSO PARA PUBLICAR
 *  ---------------------------------------------------------------------------
 *  1. Entre no Google com a conta stepnext.soluctions@gmail.com.
 *  2. Acesse https://sheets.google.com e crie uma planilha em branco
 *     (ex.: "Leads — Next Step").
 *  3. No menu da planilha, clique em  Extensões → Apps Script.
 *  4. Apague o código de exemplo que aparece e cole TODO este arquivo.
 *  5. Clique no ícone de disquete (Salvar). Dê um nome ao projeto,
 *     ex.: "Leads Next Step".
 *  6. Clique em  Implantar → Nova implantação.
 *  7. Em "Selecione o tipo", clique na engrenagem e escolha  App da Web.
 *  8. Preencha:
 *       - Descrição: Leads do site
 *       - Executar como: Eu (seu e-mail)
 *       - Quem pode acessar: Qualquer pessoa
 *  9. Clique em  Implantar. O Google vai pedir autorização (planilha e
 *     envio de e-mail):
 *       Autorizar acesso → escolha sua conta → "Avançado" →
 *       "Acessar Leads Next Step (não seguro)" → Permitir.
 *     (O aviso aparece porque o script é seu e não foi verificado pelo Google.
 *      É normal.)
 * 10. Copie a "URL do app da Web" (termina em /exec).
 * 11. Na Cloudflare Pages, abra o projeto do site → Configurações →
 *     Variáveis de ambiente → adicione
 *       NEXT_PUBLIC_LEAD_WEBHOOK_URL = (a URL copiada)
 *     e clique em "Repetir implantação" para o site pegar a variável.
 * 12. Teste: abra o site, faça o diagnóstico e confira a aba "Leads"
 *     e a caixa de entrada. A aba e o cabeçalho são criados sozinhos.
 *
 *  IMPORTANTE: se você alterar este código depois, vá em
 *  Implantar → Gerenciar implantações → (lápis) Editar → Versão: "Nova versão"
 *  → Implantar. Assim a mesma URL continua funcionando com o código novo.
 *
 *  Dica: para testar se a URL está no ar, abra-a no navegador.
 *  Deve aparecer "Next Step — receptor de leads ativo".
 * ============================================================================
 */

/** Nome da aba onde os leads serão gravados. */
const SHEET_NAME = 'Leads';

/** Quem recebe o aviso de novo lead. Separe vários e-mails com vírgula. Vazio = não envia. */
const EMAIL_AVISO = 'stepnext.soluctions@gmail.com';

/**
 * Colunas da planilha: [chave enviada pelo site, título da coluna].
 * A ordem aqui define a ordem das colunas.
 */
const COLUNAS = [
  ['data_hora',          'Data/hora'],
  ['classificacao',      'Classificação'],
  ['pontuacao',          'Pontuação'],
  ['nome',               'Nome'],
  ['empresa',            'Empresa'],
  ['cargo',              'Cargo'],
  ['whatsapp',           'WhatsApp'],
  ['email',              'E-mail'],
  ['cidade_uf',          'Cidade/UF'],
  ['frente_interesse',   'Frente de interesse'],
  ['curso_sugerido',     'Curso sugerido'],
  ['desafio',            '1. Maior desafio'],
  ['situacao',           '2. Situação'],
  ['tempo_problema',     '3. Há quanto tempo'],
  ['porte',              '4. Nº de pessoas'],
  ['faturamento',        '5. Faturamento mensal'],
  ['tentativas',         '6. Já tentou resolver'],
  ['prazo',              '7. Prazo para resolver'],
  ['consentimento_lgpd', 'Consentimento LGPD'],
  ['pagina_origem',      'Página de origem'],
  ['referrer',           'Veio de (site)'],
  ['utm_source',         'utm_source'],
  ['utm_medium',         'utm_medium'],
  ['utm_campaign',       'utm_campaign'],
  ['utm_term',           'utm_term'],
  ['utm_content',        'utm_content'],
  ['dispositivo',        'Dispositivo'],
  ['user_agent',         'Navegador'],
  ['lead_id',            'ID do lead'],
];

/** Recebe o lead enviado pelo site. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // evita que dois leads simultâneos gravem na mesma linha

  try {
    const dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Ignora envios vazios ou de robôs (sem os campos mínimos).
    if (!dados.nome || !dados.whatsapp) return resposta_({ ok: false, erro: 'dados incompletos' });

    const aba = obterAba_();

    // Evita duplicidade: o site pode reenviar um lead que ficou pendente.
    if (dados.lead_id) {
      const colId = COLUNAS.findIndex(c => c[0] === 'lead_id') + 1;
      const achou = aba.getRange(1, colId, Math.max(aba.getLastRow(), 1), 1)
        .createTextFinder(String(dados.lead_id)).matchEntireCell(true).findNext();
      if (achou) return resposta_({ ok: true, duplicado: true });
    }

    const linha = COLUNAS.map(([chave]) => limpar_(dados[chave]));
    aba.appendRow(linha);
    colorirClassificacao_(aba, aba.getLastRow(), dados.classificacao);

    // O aviso não pode impedir a gravação: se o e-mail falhar, o lead já está salvo.
    try {
      enviarAviso_(dados);
    } catch (erroEmail) {
      console.error('Falha ao enviar aviso: ' + erroEmail);
    }

    return resposta_({ ok: true });
  } catch (erro) {
    return resposta_({ ok: false, erro: String(erro) });
  } finally {
    lock.releaseLock();
  }
}

/** Permite testar a URL abrindo no navegador. */
function doGet() {
  return ContentService.createTextOutput('Next Step — receptor de leads ativo');
}

/** Converte o valor para a planilha, sem deixar texto virar fórmula. */
function limpar_(v) {
  if (v === undefined || v === null) return '';
  if (typeof v === 'boolean') return v ? 'Sim' : 'Não';
  if (typeof v === 'string') {
    const texto = v.slice(0, 500);
    return /^[=+\-@]/.test(texto) ? "'" + texto : texto;
  }
  return v;
}

/** E-mail de aviso para a equipe a cada novo lead. */
function enviarAviso_(d) {
  if (!EMAIL_AVISO) return;
  const numero = String(d.whatsapp || '').replace(/\D/g, '');
  const linhas = [
    'Novo lead pelo diagnóstico do site.',
    '',
    'Classificação: ' + (d.classificacao || '-') + ' (' + (d.pontuacao || 0) + ' pontos)',
    'Frente de interesse: ' + (d.frente_interesse || '-'),
    d.curso_sugerido ? 'Curso sugerido: ' + d.curso_sugerido : null,
    '',
    'Nome: ' + (d.nome || '-'),
    'Empresa: ' + (d.empresa || '-') + (d.cargo ? ' (' + d.cargo + ')' : ''),
    'WhatsApp: ' + (d.whatsapp || '-') + (numero ? '  https://wa.me/55' + numero : ''),
    'E-mail: ' + (d.email || '-'),
    'Cidade: ' + (d.cidade_uf || '-'),
    '',
    'Desafio: ' + (d.desafio || '-'),
    'Situação: ' + (d.situacao || '-'),
    'Há quanto tempo: ' + (d.tempo_problema || '-'),
    'Equipe: ' + (d.porte || '-'),
    'Faturamento: ' + (d.faturamento || '-'),
    'Já tentou resolver: ' + (d.tentativas || '-'),
    'Prazo: ' + (d.prazo || '-'),
    '',
    'Origem: ' + (d.utm_source || 'direto') + (d.utm_campaign ? ' / ' + d.utm_campaign : ''),
    'Página de entrada: ' + (d.pagina_origem || '-'),
    '',
    'Planilha: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
  ].filter(l => l !== null);

  MailApp.sendEmail({
    to: EMAIL_AVISO,
    subject: 'Novo lead (' + (d.classificacao || 'site') + '): ' + (d.nome || '') + ' · ' + (d.empresa || ''),
    body: linhas.join('\n'),
    replyTo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email || '')) ? d.email : undefined,
  });
}

/** Cria a aba e o cabeçalho, se ainda não existirem. */
function obterAba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(SHEET_NAME);
  if (!aba) aba = planilha.insertSheet(SHEET_NAME);

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS.map(c => c[1]));
    aba.getRange(1, 1, 1, COLUNAS.length)
      .setFontWeight('bold')
      .setBackground('#0A0A0A')
      .setFontColor('#FFFFFF');
    aba.setFrozenRows(1);
  }
  return aba;
}

/** Destaca a célula de classificação: Quente, Morno ou Frio. */
function colorirClassificacao_(aba, linha, classificacao) {
  const cores = { Quente: '#FDE2D3', Morno: '#FFF1D6', Frio: '#E3ECF7' };
  if (!cores[classificacao]) return;
  const col = COLUNAS.findIndex(c => c[0] === 'classificacao') + 1;
  aba.getRange(linha, col).setBackground(cores[classificacao]).setFontWeight('bold');
}

function resposta_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
