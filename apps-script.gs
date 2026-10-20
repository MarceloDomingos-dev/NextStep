/**
 * ============================================================================
 *  NEXT STEP — Receptor de leads do site → Planilha Google
 * ============================================================================
 *
 *  Este script recebe o POST (JSON) enviado pelo quiz de diagnóstico do site
 *  e grava cada lead como uma nova linha na aba "Leads" da planilha.
 *  Não precisa de servidor: o Google hospeda tudo de graça.
 *
 *  ---------------------------------------------------------------------------
 *  PASSO A PASSO PARA PUBLICAR
 *  ---------------------------------------------------------------------------
 *  1. Acesse https://sheets.google.com e crie uma planilha em branco
 *     (ex.: "Leads — Next Step").
 *  2. No menu da planilha, clique em  Extensões → Apps Script.
 *  3. Apague o código de exemplo que aparece e cole TODO este arquivo.
 *  4. Clique no ícone de disquete (Salvar). Dê um nome ao projeto,
 *     ex.: "Leads Next Step".
 *  5. Clique em  Implantar → Nova implantação.
 *  6. Em "Selecione o tipo", clique na engrenagem e escolha  App da Web.
 *  7. Preencha:
 *       - Descrição: Leads do site
 *       - Executar como: Eu (seu e-mail)
 *       - Quem pode acessar: Qualquer pessoa
 *  8. Clique em  Implantar. O Google vai pedir autorização:
 *       Autorizar acesso → escolha sua conta → "Avançado" →
 *       "Acessar Leads Next Step (não seguro)" → Permitir.
 *     (O aviso aparece porque o script é seu e não foi verificado pelo Google.
 *      É normal e seguro.)
 *  9. Copie a "URL do app da Web" (termina em /exec).
 * 10. No index.html, cole essa URL em  CONFIG.LEAD_WEBHOOK_URL.
 * 11. Teste: abra o site, faça o diagnóstico e confira a aba "Leads".
 *     A aba e o cabeçalho são criados automaticamente no primeiro lead.
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

/**
 * Colunas da planilha: [chave enviada pelo site, título da coluna].
 * A ordem aqui define a ordem das colunas.
 */
const COLUNAS = [
  ['data_hora',            'Data/hora'],
  ['classificacao',        'Classificação'],
  ['pontuacao',            'Pontuação'],
  ['nome',                 'Nome'],
  ['empresa',              'Empresa'],
  ['cargo',                'Cargo'],
  ['whatsapp',             'WhatsApp'],
  ['email',                'E-mail'],
  ['cidade_uf',            'Cidade/UF'],
  ['site_instagram',       'Instagram/Site'],
  ['servico_recomendado',  'Serviço recomendado'],
  ['interesse',            'Interesse (botão clicado)'],
  ['desafio',              '1. Maior desafio'],
  ['situacao',             '2. Situação'],
  ['tempo_problema',       '3. Há quanto tempo'],
  ['porte',                '4. Nº de pessoas'],
  ['faturamento',          '5. Faturamento mensal'],
  ['tentativas',           '6. Já tentou resolver'],
  ['prazo',                '7. Prazo para resolver'],
  ['ganho_estimado_pct',   'Ganho estimado (%)'],
  ['ganho_estimado_rs',    'Ganho estimado (R$ em 6 meses)'],
  ['consentimento_lgpd',   'Consentimento LGPD'],
  ['botao_origem',         'Botão de origem'],
  ['pagina',               'Página'],
  ['utm_source',           'utm_source'],
  ['utm_medium',           'utm_medium'],
  ['utm_campaign',         'utm_campaign'],
  ['dispositivo',          'Dispositivo'],
  ['user_agent',           'Navegador'],
  ['lead_id',              'ID do lead'],
];

/** Recebe o lead enviado pelo site. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // evita que dois leads simultâneos gravem na mesma linha

  try {
    const dados = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    const aba = obterAba_();

    // Evita duplicidade: o site pode reenviar um lead que ficou pendente.
    if (dados.lead_id) {
      const colId = COLUNAS.findIndex(c => c[0] === 'lead_id') + 1;
      const achou = aba.getRange(1, colId, Math.max(aba.getLastRow(), 1), 1)
        .createTextFinder(String(dados.lead_id)).matchEntireCell(true).findNext();
      if (achou) return resposta_({ ok: true, duplicado: true });
    }

    const linha = COLUNAS.map(([chave]) => {
      const v = dados[chave];
      if (v === undefined || v === null) return '';
      if (typeof v === 'boolean') return v ? 'Sim' : 'Não';
      // Evita que textos iniciados por "=", "+", "-" ou "@" virem fórmulas.
      if (typeof v === 'string' && /^[=+\-@]/.test(v)) return "'" + v;
      return v;
    });

    aba.appendRow(linha);
    colorirClassificacao_(aba, aba.getLastRow(), dados.classificacao);

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

/** Cria a aba e o cabeçalho, se ainda não existirem. */
function obterAba_() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(SHEET_NAME);
  if (!aba) aba = planilha.insertSheet(SHEET_NAME);

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS.map(c => c[1]));
    aba.getRange(1, 1, 1, COLUNAS.length)
      .setFontWeight('bold')
      .setBackground('#1E3A5F')
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
