import {
  TOTAL_MALE_DEATHS_PER_YEAR,
  MALE_MORTALITY_RATE_PER_100K,
  SUICIDE_DATA,
  CAUSE_BREAKDOWN,
  LIFE_EXPECTANCY_DATA
} from '../utils/mortality';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Geral' | 'Estatísticas' | 'Longevidade' | 'Suicídio' | 'Causas' | 'Metodologia' | 'Apoio';
}

const getCauseEstimate = (id: string) => {
  return CAUSE_BREAKDOWN.find(c => c.id === id)?.annualEstimate || 0;
};

const cardiovascularEstimate = getCauseEstimate('cardiovascular');
const cardiovascularProportion = CAUSE_BREAKDOWN.find(c => c.id === 'cardiovascular')?.proportion || 0;

const homicideEstimate = getCauseEstimate('homicide');
const trafficEstimate = getCauseEstimate('traffic');

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-01',
    category: 'Geral',
    question: 'O que é o projeto Vidas Masculinas?',
    answer: 'O Vidas Masculinas é uma iniciativa independente, open-source e sem fins lucrativos desenvolvida no formato Single-Page Knowledge Hub. Seu propósito é conscientizar a sociedade, educar a população e fornecer dados oficiais transparentes sobre a mortalidade masculina e a saúde mental no Brasil com base nos microdados públicos do SIM/DATASUS e PCDaS/Fiocruz.'
  },
  {
    id: 'faq-02',
    category: 'Geral',
    question: 'Por que focar especificamente na mortalidade masculina?',
    answer: `No Brasil, centenas de milhares de homens morrem a cada ano. Homens apresentam taxas severamente desproporcionais de mortalidade por causas externas (homicídios e acidentes) e suicídio, onde representam a ampla maioria das vítimas. Isso resulta em uma expectativa de vida inferior à das mulheres devido a fatores epidemiológicos muitas vezes evitáveis.`
  },
  {
    id: 'faq-03',
    category: 'Geral',
    question: 'Quais são os órgãos públicos oficiais utilizados como fonte?',
    answer: 'Os dados compilados e calculados são extraídos exclusivamente das bases de dados abertas do governo federal, especificamente do Sistema de Informações sobre Mortalidade (SIM), unificados via base PCDaS/Fiocruz, e do IBGE.'
  },
  {
    id: 'faq-04',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por ano no Brasil por todas as causas?',
    answer: `Com base nas séries históricas mais recentes do SIM (PCDaS), morrem anualmente no Brasil, em média, ${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} homens por causas diversas, englobando patologias crônicas, causas externas e acidentes.`
  },
  {
    id: 'faq-05',
    category: 'Estatísticas',
    question: 'Qual é a taxa bruta de mortalidade masculina por 100 mil habitantes no Brasil?',
    answer: `A taxa bruta calculada de mortalidade masculina no Brasil é de aproximadamente ${MALE_MORTALITY_RATE_PER_100K} óbitos a cada 100.000 homens por ano.`
  },
  {
    id: 'faq-06',
    category: 'Estatísticas',
    question: 'Qual é a maior causa de morte de homens no Brasil?',
    answer: `As doenças cardiovasculares lideram as causas de morte masculina, respondendo por cerca de ${(cardiovascularProportion * 100).toFixed(1).replace('.', ',')}% do total de óbitos no país (em média ${cardiovascularEstimate.toLocaleString('pt-BR')} mortes anuais).`
  },
  {
    id: 'faq-07',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por homicídios e violência no Brasil por ano?',
    answer: `De acordo com as consolidações do SIM, dezenas de milhares de homens são vítimas de homicídio anualmente no Brasil (em média ${homicideEstimate.toLocaleString('pt-BR')} óbitos). Homens constituem a imensa maioria de todas as vítimas de mortes violentas intencionais no país.`
  },
  {
    id: 'faq-08',
    category: 'Estatísticas',
    question: 'Quantos homens morrem em acidentes de trânsito no Brasil por ano?',
    answer: `Os acidentes de trânsito causam a morte de milhares de homens por ano no Brasil (em média ${trafficEstimate.toLocaleString('pt-BR')} óbitos). Homens representam a vasta maioria das vítimas fatais em sinistros de transporte terrestre.`
  },
  {
    id: 'faq-09',
    category: 'Longevidade',
    question: 'Qual é a expectativa de vida ao nascer dos homens no Brasil?',
    answer: `Segundo o IBGE, a expectativa de vida ao nascer para a população masculina no Brasil é de ${LIFE_EXPECTANCY_DATA.male.toFixed(1).replace('.', ',')} anos, enquanto para as mulheres é de ${LIFE_EXPECTANCY_DATA.female.toFixed(1).replace('.', ',')} anos.`
  },
  {
    id: 'faq-10',
    category: 'Longevidade',
    question: 'Qual é a diferença na expectativa de vida entre homens e mulheres?',
    answer: `A diferença na expectativa de vida ao nascer é de ${LIFE_EXPECTANCY_DATA.gap.toFixed(1).replace('.', ',')} anos a menos para os homens no Brasil. Esse indicador reflete fatores de mortalidade precoce por causas externas e menor procura preventiva por serviços de saúde.`
  },
  {
    id: 'faq-11',
    category: 'Longevidade',
    question: 'Por que os homens vivem menos que as mulheres no Brasil?',
    answer: 'A menor longevidade masculina resulta de uma combinação de fatores: sobremortalidade por causas externas (homicídios e acidentes), menor adesão a consultas médicas preventivas no SUS, diagnóstico tardio de doenças crônicas, maior exposição a riscos ocupacionais e fatores comportamentais.'
  },
  {
    id: 'faq-12',
    category: 'Suicídio',
    question: 'Qual a proporção de suicídios masculinos no Brasil?',
    answer: `Segundo os dados consolidados do SIM, ${SUICIDE_DATA.malePercentage.toFixed(1).replace('.', ',')}% de todas as vítimas de suicídio registradas no Brasil são homens. Para cada mulher que morre por suicídio, ${SUICIDE_DATA.ratioMaleToFemale.toFixed(1).replace('.', ',')} homens falecem pela mesma causa.`
  },
  {
    id: 'faq-13',
    category: 'Suicídio',
    question: 'Quantos homens morrem por suicídio a cada dia no Brasil?',
    answer: `Com base nas séries históricas, ocorrem em média ${SUICIDE_DATA.male.toLocaleString('pt-BR')} mortes masculinas por suicídio ao ano no Brasil, o que corresponde a uma média de aproximadamente ${Math.round(SUICIDE_DATA.male / 365.25)} homens por dia.`
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
    answer: 'Os Centros de Atenção Psicossocial (CAPS) são unidades públicas do SUS especializadas em saúde mental que oferecem atendimento gratuito, interdisciplinar e de porta aberta em âmbito nacional.'
  },
  {
    id: 'faq-16',
    category: 'Suicídio',
    question: 'A depressão masculina apresenta sintomas específicos?',
    answer: 'Sim. Em homens, a depressão frequentemente se manifesta por meio de irritabilidade extrema, comportamento de risco, consumo excessivo de álcool e sintomas somáticos, além dos quadros convencionais de tristeza.'
  },
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
    answer: 'Fiscalização ostensiva com foco em alcoolemia, uso obrigatório de equipamentos de proteção (como capacetes adequados), respeito aos limites de velocidade, manutenção preventiva de veículos e campanhas educativas.'
  },
  {
    id: 'faq-20',
    category: 'Causas',
    question: 'O que são causas externas de mortalidade?',
    answer: 'Causas externas englobam lesões, envenenamentos, violência intencional e acidentes que resultam em óbito. Diferenciam-se de patologias biológicas por serem passíveis de prevenção por meio de políticas públicas e intervenções comportamentais.'
  },
  {
    id: 'faq-21',
    category: 'Metodologia',
    question: 'Como funciona a contagem local?',
    answer: 'O contador soma o tempo decorrido no ano civil e aplica uma taxa de distribuição média anualizada (derivada dos microdados do SIM) para exibir, em tempo real, o ritmo em que os óbitos masculinos ocorrem no Brasil.'
  },
  {
    id: 'faq-22',
    category: 'Metodologia',
    question: 'Quais são as limitações metodológicas do modelo?',
    answer: 'O modelo distribui as médias históricas do SIM de forma uniforme e não contabiliza variações sazonais imediatas diárias ou sazonais agudas. Trata-se de um instrumento construído sobre dados consolidados com foco em macro-tendências epidemiológicas.'
  },
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
