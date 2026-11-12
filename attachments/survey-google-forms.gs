/**
 * Monta o questionário com frequentadores (Apêndice B) no Google Forms.
 *
 * Uso: script.google.com > Novo projeto > colar este arquivo > executar
 * criarQuestionario (novo formulário + planilha) ou preencherFormularioExistente
 * (substitui o conteúdo de um formulário já criado, sem criar planilha).
 * As URLs aparecem no log de execução.
 */
const TITULO = 'Cardápios digitais em bares e restaurantes de Porto Alegre';
const FORM_EXISTENTE_ID = '10Yr6TCFR0jpekb00Bcn7biN355maoKiFvnrbCJNlxfI';

function criarQuestionario() {
  const form = FormApp.create(TITULO);
  const codigos = montarQuestionario(form);
  vincularPlanilha(form, codigos);
  logLinks(form);
}

function preencherFormularioExistente() {
  const form = FormApp.openById(FORM_EXISTENTE_ID);
  form.getItems().forEach((item) => form.deleteItem(item));
  form.setTitle(TITULO);
  montarQuestionario(form);
  logLinks(form);
}

function logLinks(form) {
  Logger.log('Link para responder: ' + form.getPublishedUrl());
  Logger.log('Link para editar: ' + form.getEditUrl());
}

function montarQuestionario(form) {
  form
    .setDescription(
      'Pesquisa do Trabalho de Conclusão de Curso de César Hoffmann (Ciência da Computação, UNISINOS), ' +
      'orientada pelo Prof. Dr. Guilherme Lacerda. Leva de 5 a 8 minutos e não pede seu nome nem e-mail.'
    )
    .setCollectEmail(false)
    .setLimitOneResponsePerUser(false)
    .setAllowResponseEdits(false)
    .setProgressBar(true)
    .setConfirmationMessage(
      'Obrigado pela participação! Se quiser receber os resultados consolidados, escreva para cesarhoff@unisinos.br.'
    );

  const likert = ['1 - Discordo totalmente', '2 - Discordo', '3 - Neutro', '4 - Concordo', '5 - Concordo totalmente'];

  // Seção 0: TCLE e triagem de idade
  const consentimento = form.addMultipleChoiceItem()
    .setTitle('Termo de Consentimento Livre e Esclarecido')
    .setHelpText(
      'Objetivo: entender como clientes vivenciam cardápios digitais com autoatendimento (QR Code no próprio ' +
      'celular, tablet na mesa ou totem) em bares e restaurantes de Porto Alegre.\n\n' +
      'Participação voluntária, sem identificação nominal; você pode desistir a qualquer momento fechando o formulário. ' +
      'Riscos mínimos e nenhum benefício financeiro.\n\n' +
      'Dados tratados conforme a LGPD (Lei 13.709/2018), usados apenas para fins acadêmicos, armazenados com acesso ' +
      'restrito ao pesquisador e ao orientador, e descartados em até 24 meses após a defesa.\n\n' +
      'Contato: César Hoffmann, cesarhoff@unisinos.br, (51) 99804-4896.'
    )
    .setRequired(true);

  // Seção 1: Perfil
  form.addPageBreakItem().setTitle('Seção 1 de 4 — Perfil do respondente');
  form.addMultipleChoiceItem().setTitle('Faixa etária')
    .setChoiceValues(['18 a 24', '25 a 34', '35 a 44', '45 a 54', '55 ou mais']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Você mora em Porto Alegre ou na região metropolitana?')
    .setChoiceValues(['Sim', 'Não']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Gênero')
    .setChoiceValues(['Feminino', 'Masculino', 'Não binário', 'Prefiro não responder']).showOtherOption(true).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Escolaridade (maior nível concluído ou em curso)')
    .setChoiceValues(['Ensino fundamental', 'Ensino médio', 'Ensino superior', 'Pós-graduação']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Com que frequência você vai a bares ou restaurantes?')
    .setChoiceValues(['Várias vezes por semana', 'Uma vez por semana', 'Quinzenalmente', 'Mensalmente', 'Raramente'])
    .setRequired(true);
  form.addMultipleChoiceItem().setTitle('Que tipo de estabelecimento você frequenta com mais frequência?')
    .setChoiceValues(['Bar ou boteco', 'Cervejaria ou taproom', 'Restaurante casual', 'Restaurante sofisticado', 'Fast-casual / lancheria'])
    .showOtherOption(true).setRequired(true);
  form.addCheckboxItem().setTitle('Você tem alguma deficiência ou dificuldade que afete o uso de cardápios?')
    .setHelpText('Marque todas as que se aplicam.')
    .setChoiceValues(['Visual', 'Motora', 'De leitura', 'Nenhuma', 'Prefiro não responder']).setRequired(true);

  // Seção 2: Experiência
  form.addPageBreakItem().setTitle('Seção 2 de 4 — Experiência com cardápios digitais')
    .setHelpText('Considere qualquer cardápio digital em que você mesmo consulta ou faz o pedido: QR Code no seu celular, tablet na mesa ou totem.');
  const exposicao = form.addMultipleChoiceItem()
    .setTitle('Nos últimos 12 meses, com que frequência você encontrou cardápios digitais em bares e restaurantes?')
    .setRequired(true);
  form.addMultipleChoiceItem().setTitle('Em geral, qual é a sua preferência?')
    .setChoiceValues(['Cardápio físico', 'Cardápio digital', 'Indiferente']).setRequired(true);

  // Ordem intercalada para que itens do mesmo construto não fiquem lado a lado.
  // Códigos entre colchetes ficam só no script/planilha de análise, não aparecem no formulário.
  const itensA = [
    ['PE1', 'O cardápio digital é mais prático que o cardápio físico.'],
    ['SI1', 'Pessoas próximas a mim (amigos, familiares) preferem estabelecimentos com cardápio digital.'],
    ['HM1', 'Acho prazeroso explorar um cardápio digital com fotos e descrições dos itens.'],
    ['EE2_inv', 'Tenho dificuldade de ler ou navegar no cardápio digital.'],
    ['FC1', 'Geralmente tenho conexão de internet adequada para usar o cardápio digital no estabelecimento.'],
    ['HB1', 'Quando me sento em um bar ou restaurante, abrir o cardápio digital já virou um hábito automático.'],
    ['PV2_inv', 'O cardápio digital me leva a pedir ou gastar mais do que eu pediria com cardápio físico.'],
    ['BI1', 'Pretendo continuar usando cardápios digitais em bares e restaurantes nos próximos meses.'],
    ['TRU', 'Confio nos preços e na disponibilidade de itens informados pelo cardápio digital.'],
    ['EE1', 'É fácil aprender a usar um cardápio digital, seja no celular, no tablet ou no totem.'],
  ];
  const itensB = [
    ['HM2_inv', 'O cardápio digital atrapalha a experiência social com as pessoas que estão comigo.'],
    ['PE2', 'O cardápio digital me ajuda a escolher meu pedido mais rapidamente.'],
    ['FC2', 'Quando preciso de ajuda com o cardápio digital, há alguém no estabelecimento que pode me auxiliar.'],
    ['PRI', 'Preocupo-me com a proteção dos meus dados pessoais ao usar cardápios digitais.'],
    ['SI2', 'Avaliações em redes sociais ou no Google Maps influenciam minha escolha de um bar ou restaurante com cardápio digital.'],
    ['HB2', 'Uso o cardápio digital sem precisar pensar muito sobre isso.'],
    ['PV1', 'Vale a pena usar meus dados móveis e meu tempo para abrir o cardápio digital.'],
    ['SOC', 'Sinto falta da interação com o garçom quando uso o cardápio digital.'],
    ['BI2', 'Recomendaria a um amigo um restaurante por ele oferecer cardápio digital.'],
  ];
  const instrucao = 'Indique seu nível de concordância com cada afirmação.';
  form.addGridItem().setTitle('Sobre cardápios digitais (parte 1 de 2)').setHelpText(instrucao)
    .setRows(itensA.map(([, t]) => t)).setColumns(likert).setRequired(true);
  form.addGridItem().setTitle('Sobre cardápios digitais (parte 2 de 2)').setHelpText(instrucao)
    .setRows(itensB.map(([, t]) => t)).setColumns(likert).setRequired(true);

  form.addMultipleChoiceItem().setTitle('Você já desistiu de pedir ou ficou frustrado em alguma situação com cardápio digital?')
    .setChoiceValues(['Sim', 'Não']).setRequired(true);
  form.addParagraphTextItem().setTitle('Se sim, conte brevemente o que aconteceu.');

  // Seção 3: Aspectos técnicos
  form.addPageBreakItem().setTitle('Seção 3 de 4 — Aspectos técnicos');
  form.addCheckboxItem().setTitle('Você já enfrentou algum destes problemas?')
    .setHelpText('Marque todos os que se aplicam.')
    .setChoiceValues([
      'Falha ao escanear o QR Code ou abrir o cardápio',
      'Tela do tablet ou totem não respondeu ao toque',
      'Página ou interface não carregou (internet lenta ou Wi-Fi indisponível)',
      'Layout confuso ou difícil de ler',
      'Preço ou informação desatualizados',
      'Falta de opção de acessibilidade (tamanho de fonte, contraste)',
      'Precisei fazer cadastro ou informar dados pessoais para ver o cardápio ou pedir',
      'Nenhum desses',
    ])
    .showOtherOption(true).setRequired(true);
  form.addParagraphTextItem().setTitle('Em que situações o cardápio digital funciona melhor para você?');
  form.addParagraphTextItem().setTitle('Em que situações o cardápio digital funciona pior para você?');

  // Seção 4: Visão geral
  const visaoGeral = form.addPageBreakItem().setTitle('Seção 4 de 4 — Visão geral');
  form.addMultipleChoiceItem().setTitle('Você acredita que os cardápios digitais vieram para ficar?')
    .setChoiceValues(['Sim', 'Não', 'Não sei']).setRequired(true);
  form.addMultipleChoiceItem().setTitle('Se você fosse dono de um bar ou restaurante, adotaria cardápio digital?')
    .setChoiceValues(['Sim', 'Não', 'Talvez']).setRequired(true);
  form.addParagraphTextItem().setTitle('Por quê? (opcional)');
  form.addParagraphTextItem().setTitle('Há algo mais que você gostaria de comentar sobre o tema? (opcional)');

  // Ramificações (definidas depois que as seções existem)
  consentimento.setChoices([
    consentimento.createChoice('Li, concordo em participar e tenho 18 anos ou mais', FormApp.PageNavigationType.CONTINUE),
    consentimento.createChoice('Não concordo ou tenho menos de 18 anos', FormApp.PageNavigationType.SUBMIT),
  ]);
  exposicao.setChoices([
    exposicao.createChoice('Sempre', FormApp.PageNavigationType.CONTINUE),
    exposicao.createChoice('Frequentemente', FormApp.PageNavigationType.CONTINUE),
    exposicao.createChoice('Às vezes', FormApp.PageNavigationType.CONTINUE),
    exposicao.createChoice('Raramente', FormApp.PageNavigationType.CONTINUE),
    exposicao.createChoice('Nunca', visaoGeral),
  ]);

  return itensA.map(([c, t]) => [c, t, 'parte 1']).concat(itensB.map(([c, t]) => [c, t, 'parte 2']));
}

function vincularPlanilha(form, codigos) {
  const planilha = SpreadsheetApp.create('Respostas — Questionário cardápios digitais (TCC)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, planilha.getId());
  const legenda = planilha.insertSheet('Codigos_UTAUT2');
  legenda.getRange(1, 1, 1, 3).setValues([['Código', 'Afirmação', 'Grade']]);
  legenda.getRange(2, 1, codigos.length, 3).setValues(codigos);
  Logger.log('Planilha de respostas: ' + planilha.getUrl());
}
