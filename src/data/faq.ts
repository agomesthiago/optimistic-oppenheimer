export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Geral' | 'Estatísticas' | 'Longevidade' | 'Suicídio' | 'Causas' | 'Metodologia' | 'Apoio';
}

export const FAQ_DATA: FAQItem[] = [
  // Categoria: Geral (01 - 03)
  {
    id: 'faq-01',
    category: 'Geral',
    question: 'O que é o projeto Vidas Masculinas?',
    answer: 'O Vidas Masculinas é uma iniciativa independente, open-source e sem fins lucrativos desenvolvida no formato Single-Page Knowledge Hub. Seu propósito é conscientizar a sociedade, educar a população e fornecer dados oficiais transparentes sobre a mortalidade masculina e a saúde mental no Brasil com base em estatísticas públicas do DATASUS/SIM e IBGE.'
  },
  {
    id: 'faq-02',
    category: 'Geral',
    question: 'Por que focar especificamente na mortalidade masculina?',
    answer: 'No Brasil, mais de 800.000 homens morrem a cada ano, representando aproximadamente 55% de todos os óbitos do país. Homens morrem proporcionalmente mais por homicídios (mais de 90% das vítimas), acidentes de trânsito (mais de 80%) e suicídio (77,8%), apresentando uma expectativa de vida em média 7 anos menor do que as mulheres por fatores epidemiológicos evitáveis.'
  },
  {
    id: 'faq-03',
    category: 'Geral',
    question: 'Quais são os órgãos públicos oficiais utilizados como fonte?',
    answer: 'Os dados compilados e calculados são extraídos exclusivamente de órgãos públicos federais de saúde e estatística do Brasil: DATASUS (Sistema de Informações sobre Mortalidade - SIM) do Ministério da Saúde, IBGE (Instituto Brasileiro de Geografia e Estatística), INCA (Instituto Nacional de Câncer) e IPEA (Atlas da Violência).'
  },

  // Categoria: Estatísticas (04 - 08)
  {
    id: 'faq-04',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por ano no Brasil por todas as causas?',
    answer: 'Com base nas séries históricas do DATASUS/SIM do Ministério da Saúde e nas estimativas populacionais do IBGE, morrem anualmente no Brasil aproximadamente 780.000 a 800.000 homens por causas diversas, englobando patologias crônicas, causas externas e acidentes.'
  },
  {
    id: 'faq-05',
    category: 'Estatísticas',
    question: 'Qual é a taxa bruta de mortalidade masculina por 100 mil habitantes no Brasil?',
    answer: 'A taxa bruta de mortalidade masculina no Brasil é de aproximadamente 757 óbitos a cada 100.000 homens por ano. Essa taxa varia conforme a faixa etária, concentrando maior letalidade por violência na juventude e por doenças crônicas na terceira idade.'
  },
  {
    id: 'faq-06',
    category: 'Estatísticas',
    question: 'Qual é a maior causa de morte de homens no Brasil?',
    answer: 'As doenças do aparelho circulatório (doenças cardiovasculares, como infarto agudo do miocárdio e acidente vascular cerebral - AVC) lideram as causas de morte masculina, respondendo por cerca de 25,4% do total de óbitos no país (~210.000 mortes/ano).'
  },
  {
    id: 'faq-07',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por homicídios e violência no Brasil por ano?',
    answer: 'De acordo com o Atlas da Violência do IPEA e o DATASUS/SIM, mais de 40.000 homens são vítimas de homicídio anualmente no Brasil. Homens de 15 a 29 anos constituem mais de 91% de todas as vítimas de mortes violentas intencionais no país.'
  },
  {
    id: 'faq-08',
    category: 'Estatísticas',
    question: 'Quantos homens morrem em acidentes de trânsito no Brasil por ano?',
    answer: 'Os acidentes de trânsito causam a morte de cerca de 28.000 a 30.000 homens por ano no Brasil (~3,4% do total de óbitos masculinos). Homens representam mais de 80% das vítimas fatais em sinistros de transporte terrestre (motocicletas, automóveis e atropelamentos).'
  },

  // Categoria: Longevidade (09 - 11)
  {
    id: 'faq-09',
    category: 'Longevidade',
    question: 'Qual é a expectativa de vida ao nascer dos homens no Brasil?',
    answer: 'Segundo as Tábuas Completas de Mortalidade do IBGE (ano de referência 2022), a expectativa de vida ao nascer para a população masculina no Brasil é de 72,0 anos, enquanto para as mulheres é de 79,0 anos.'
  },
  {
    id: 'faq-10',
    category: 'Longevidade',
    question: 'Qual é a diferença na expectativa de vida entre homens e mulheres?',
    answer: 'A diferença na expectativa de vida ao nascer é de 7,0 anos a menos para os homens no Brasil (72,0 anos masculinos versus 79,0 anos femininos). Esse indicador reflete fatores de mortalidade precoce por causas externas e menor procura preventiva por serviços de saúde.'
  },
  {
    id: 'faq-11',
    category: 'Longevidade',
    question: 'Por que os homens vivem menos que as mulheres no Brasil?',
    answer: 'A menor longevidade masculina resulta de uma combinação de fatores: sobremortalidade por causas externas (homicídios e acidentes), menor adesão a consultas médicas preventivas no SUS, diagnóstico tardio de doenças crônicas, maior exposição a riscos ocupacionais e fatores comportamentais como tabagismo e etilismo.'
  },

  // Categoria: Suicídio (12 - 16)
  {
    id: 'faq-12',
    category: 'Suicídio',
    question: 'Qual a proporção de suicídios masculinos no Brasil?',
    answer: 'Segundo os Boletins Epidemiológicos de Suicídio do Ministério da Saúde / SIM, 77,8% de todas as vítimas de suicídio registradas no Brasil são homens. Para cada mulher que morre por suicídio, aproximadamente 3,5 homens falecem pela mesma causa.'
  },
  {
    id: 'faq-13',
    category: 'Suicídio',
    question: 'Quantos homens morrem por suicídio a cada dia no Brasil?',
    answer: 'Estimam-se cerca de 13.356 mortes masculinas por suicídio ao ano no Brasil, o que corresponde a uma média de aproximadamente 33 a 36 homens que falecem por essa causa diariamente no país.'
  },
  {
    id: 'faq-14',
    category: 'Suicídio',
    question: 'Por que o suicídio é proporcionalmente maior entre os homens?',
    answer: 'Estudos epidemiológicos e de saúde mental indicam que homens tendem a utilizar métodos de maior letalidade, buscam menos ajuda profissional preventiva devido a estigmas sociais e frequentemente reprimem sinais de sofrimento psíquico, como depressão e ansiedade.'
  },
  {
    id: 'faq-15',
    category: 'Suicídio',
    question: 'O que são os CAPS e como atuam na saúde mental?',
    answer: 'Os Centros de Atenção Psicossocial (CAPS) são unidades públicas do SUS especializadas em saúde mental que oferecem atendimento gratuito, interdisciplinar e de porta aberta (sem necessidade de encaminhamento prévio) em todo o Brasil.'
  },
  {
    id: 'faq-16',
    category: 'Suicídio',
    question: 'A depressão masculina apresenta sintomas específicos?',
    answer: 'Sim. Em homens, a depressão frequentemente se manifesta por meio de irritabilidade extrema, comportamento de risco, consumo excessivo de álcool e sintomas somáticos (dores físicas sem causa orgânica aparente), além dos quadros convencionais de tristeza.'
  },

  // Categoria: Causas (17 - 20)
  {
    id: 'faq-17',
    category: 'Causas',
    question: 'Como prevenir as doenças cardiovasculares em homens?',
    answer: 'A prevenção envolve controle da pressão arterial e glicemia, prática regular de atividades físicas, alimentação equilibrada, cessação do tabagismo, redução do consumo de álcool e realização de exames preventivos anuais.'
  },
  {
    id: 'faq-18',
    category: 'Causas',
    question: 'Qual a importância do diagnóstico precoce do câncer de próstata?',
    answer: 'O câncer de próstata é o segundo tumor maligno mais comum entre homens no Brasil. Quando diagnosticado precocemente por meio de exames preventivos (como PSA e toque retal), as taxas de sucesso no tratamento ultrapassam 90%.'
  },
  {
    id: 'faq-19',
    category: 'Causas',
    question: 'Quais medidas reduzem as mortes de homens no trânsito?',
    answer: 'Fiscalização ostensiva com foco em alcoolemia, uso obrigatório de equipamentos de proteção (como capacetes adequados), respeito aos limites de velocidade, manutenção preventiva de veículos e campanhas educativas focadas nos condutores masculinos.'
  },
  {
    id: 'faq-20',
    category: 'Causas',
    question: 'O que são causas externas de mortalidade?',
    answer: 'Causas externas englobam lesões, envenenamentos, violência intencional e acidentes que resultam em óbito. Diferenciam-se de patologias biológicas por serem passíveis de prevenção por meio de políticas públicas e intervenções comportamentais.'
  },

  // Categoria: Metodologia (21 - 22)
  {
    id: 'faq-21',
    category: 'Metodologia',
    question: 'Como funciona o cálculo em tempo real do contador?',
    answer: 'O contador calcula o tempo decorrido em segundos desde o início do ano corrente (ou do início da sessão) e aplica a taxa populacional fracionada de mortes por segundo, derivada das médias anuais oficiais do DATASUS e IBGE.'
  },
  {
    id: 'faq-22',
    category: 'Metodologia',
    question: 'Quais são as limitações metodológicas do modelo?',
    answer: 'O modelo utiliza médias estatísticas anualizadas e não contabiliza variações sazonais imediatas. Trata-se de um instrumento educativo e epidemiológico de aproximação estatística com finalidade de conscientização em saúde pública.'
  },

  // Categoria: Apoio (23 - 24)
  {
    id: 'faq-23',
    category: 'Apoio',
    question: 'Como entrar em contato com o CVV em situações de crise emocional?',
    answer: 'Ligue gratuitamente para o número 188 a partir de qualquer telefone fixo ou celular no Brasil, ou acesse o atendimento online via chat em https://cvv.org.br/chat/.'
  },
  {
    id: 'faq-24',
    category: 'Apoio',
    question: 'Como localizar o CAPS mais próximo?',
    answer: 'É possível localizar a unidade de referência pesquisando por "CAPS mais próximo" em serviços de mapas ou consultando a Secretaria de Saúde do município.'
  }
];
