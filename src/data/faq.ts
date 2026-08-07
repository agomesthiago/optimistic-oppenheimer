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
    answer: 'O Vidas Masculinas é um projeto independente e gratuito criado para dar visibilidade a uma realidade ignorada: homens morrem mais, mais cedo e por causas evitáveis. A página reúne dados oficiais do Ministério da Saúde e do IBGE em um único lugar — traduzidos em números que fazem sentido para qualquer pessoa, não apenas para especialistas.'

  },
  {
    id: 'faq-02',
    category: 'Geral',
    question: 'Por que focar especificamente na mortalidade masculina?',
    answer: `No Brasil, homens morrem em números muito maiores do que mulheres — e grande parte dessas mortes poderia ser evitada. Homicídios, acidentes e suicídio matam desproporcionalmente mais homens. Ao mesmo tempo, eles vão menos ao médico e recebem diagnósticos mais tarde. O projeto existe porque esse padrão é real, mensurável e precisa ser debatido.`
  },
  {
    id: 'faq-03',
    category: 'Geral',
    question: 'Quais são os órgãos públicos oficiais utilizados como fonte?',
    answer: 'Usamos exclusivamente dados públicos do governo federal: o Sistema de Informações sobre Mortalidade (SIM) do Ministério da Saúde, acessado via PCDaS/Fiocruz, e as tábuas de mortalidade do IBGE. Nada é estimado ou inventado.'
  },
  {
    id: 'faq-04',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por ano no Brasil por todas as causas?',
    answer: `Em média, ${TOTAL_MALE_DEATHS_PER_YEAR.toLocaleString('pt-BR')} homens morrem por ano no Brasil — de doenças, acidentes, violência e outras causas. São mais de ${Math.round(TOTAL_MALE_DEATHS_PER_YEAR / 365).toLocaleString('pt-BR')} por dia.`
  },
  {
    id: 'faq-05',
    category: 'Estatísticas',
    question: 'Qual é a taxa bruta de mortalidade masculina por 100 mil habitantes no Brasil?',
    answer: `A taxa bruta de mortalidade masculina no Brasil é de cerca de ${MALE_MORTALITY_RATE_PER_100K} mortes por 100.000 homens por ano. Essa métrica ajuda a comparar o risco entre diferentes grupos e períodos.`
  },
  {
    id: 'faq-06',
    category: 'Estatísticas',
    question: 'Qual é a maior causa de morte de homens no Brasil?',
    answer: `Doenças do coração. Elas são responsáveis por cerca de ${(cardiovascularProportion * 100).toFixed(1).replace('.', ',')}% de todas as mortes masculinas no Brasil — o equivalente a ${cardiovascularEstimate.toLocaleString('pt-BR')} homens por ano. A maioria dos casos tem tratamento eficaz quando detectado a tempo.`
  },
  {
    id: 'faq-07',
    category: 'Estatísticas',
    question: 'Quantos homens morrem por homicídios e violência no Brasil por ano?',
    answer: `Em média, ${homicideEstimate.toLocaleString('pt-BR')} homens são mortos por homicídio todo ano no Brasil. A vasta maioria das vítimas de violência intencional no país é masculina.`
  },
  {
    id: 'faq-08',
    category: 'Estatísticas',
    question: 'Quantos homens morrem em acidentes de trânsito no Brasil por ano?',
    answer: `Acidentes de trânsito matam em média ${trafficEstimate.toLocaleString('pt-BR')} homens por ano no Brasil. A maioria das vítimas fatais nas estradas são homens — especialmente jovens entre 20 e 39 anos.`
  },
  {
    id: 'faq-09',
    category: 'Longevidade',
    question: 'Qual é a expectativa de vida ao nascer dos homens no Brasil?',
    answer: `Segundo o IBGE, um homem brasileiro vive, em média, ${LIFE_EXPECTANCY_DATA.male.toFixed(1).replace('.', ',')} anos. Uma mulher, ${LIFE_EXPECTANCY_DATA.female.toFixed(1).replace('.', ',')} anos. A diferença é de ${LIFE_EXPECTANCY_DATA.gap.toFixed(1).replace('.', ',')} anos — anos que os homens perdem em grande parte por causas evitáveis.`
  },
  {
    id: 'faq-10',
    category: 'Longevidade',
    question: 'Qual é a diferença na expectativa de vida entre homens e mulheres?',
    answer: `${LIFE_EXPECTANCY_DATA.gap.toFixed(1).replace('.', ',')} anos. Essa diferença não é por acaso: homens morrem mais cedo por causas externas (violência, acidentes), vão menos ao médico e chegam tarde demais ao diagnóstico de doenças crônicas.`
  },
  {
    id: 'faq-11',
    category: 'Longevidade',
    question: 'Por que os homens vivem menos que as mulheres no Brasil?',
    answer: 'Não é apenas biologia. Homens buscam médico menos, são mais expostos a trabalhos perigosos, e a cultura em torno da masculinidade ainda afasta muitos do cuidado com a própria saúde. Esses fatores são mensuráveis e — o mais importante — são evitáveis.'
  },
  {
    id: 'faq-12',
    category: 'Suicídio',
    question: 'Qual a proporção de suicídios masculinos no Brasil?',
    answer: `${SUICIDE_DATA.malePercentage.toFixed(1).replace('.', ',')}% das vítimas de suicídio no Brasil são homens. Para cada mulher que morre assim, ${SUICIDE_DATA.ratioMaleToFemale.toFixed(1).replace('.', ',')} homens perdem a vida. É uma crise silenciosa — e os dados mostram isso com clareza.`
  },
  {
    id: 'faq-13',
    category: 'Suicídio',
    question: 'Quantos homens morrem por suicídio a cada dia no Brasil?',
    answer: `Em média, ${Math.round(SUICIDE_DATA.male / 365.25)} homens tiram a própria vida todo dia no Brasil — o equivalente a ${SUICIDE_DATA.male.toLocaleString('pt-BR')} por ano. São filhos, pais, amigos. Vidas que poderiam ter sido salvas.`
  },
  {
    id: 'faq-14',
    category: 'Suicídio',
    question: 'Por que o suicídio é proporcionalmente maior entre os homens?',
    answer: 'Homens tendem a usar métodos mais letais, pedem ajuda menos e carregam sozinhos o sofrimento por mais tempo. A cultura que ensina o homem a "aguentar" tem um custo real: mais mortes evitáveis.'
  },
  {
    id: 'faq-15',
    category: 'Suicídio',
    question: 'O que são os CAPS e como atuam na saúde mental?',
    answer: 'Os Centros de Atenção Psicossocial (CAPS) são unidades públicas do SUS que oferecem atendimento gratuito em saúde mental. Não precisa de agendamento — qualquer pessoa pode chegar e ser acolhida.'
  },
  {
    id: 'faq-16',
    category: 'Suicídio',
    question: 'A depressão masculina apresenta sintomas específicos?',
    answer: 'Sim. Em homens, a depressão muitas vezes não parece "tristeça" — aparece como irritação constante, comportamentos de risco, consumo excessivo de álcool ou recolhimento abrupto. Reconhecer esses sinais pode salvar uma vida.'
  },
  {
    id: 'faq-17',
    category: 'Causas',
    question: 'Como prevenir as doenças cardiovasculares em homens?',
    answer: 'Pressão alta, glicemia, exercício físico regular, alimentação equilibrada, menos cigarro e menos álcool. E, acima de tudo, fazer exames preventivos todos os anos — algo que muitos homens ainda evitam por achar que "estão bem".'
  },
  {
    id: 'faq-18',
    category: 'Causas',
    question: 'Qual a importância do diagnóstico precoce do câncer de próstata?',
    answer: 'O câncer de próstata é o segundo mais comum entre homens no Brasil. Quando detectado cedo, as chances de cura passam de 90%. Mesmo assim, muitos homens adiamos a consulta por constrangimento ou por achar que "ainda não precisa".'
  },
  {
    id: 'faq-19',
    category: 'Causas',
    question: 'Quais medidas reduzem as mortes de homens no trânsito?',
    answer: 'Fiscalização mais rigorosa, respeito à velocidade, capacete adequado, zero álcool ao volante. São medidas simples que já provaram salvar vidas — e que dependem tanto de políticas públicas quanto de cada condutor.'
  },
  {
    id: 'faq-20',
    category: 'Causas',
    question: 'O que são causas externas de mortalidade?',
    answer: 'Causas externas são mortes que não têm origem biológica: homicídios, acidentes, afogamentos, quedas. O que as une é o fato de que a maioria poderia ser evitada com políticas públicas adequadas e mudanças de comportamento.'
  },
  {
    id: 'faq-21',
    category: 'Metodologia',
    question: 'Como funciona a contagem local?',
    answer: 'O contador pega o tempo que já passou desde 1º de janeiro e multiplica pela média histórica de mortes por segundo, calculada com base nos dados oficiais do Ministério da Saúde. Não é um número exato — é uma projeção baseada em médias reais.'
  },
  {
    id: 'faq-22',
    category: 'Metodologia',
    question: 'Quais são as limitações metodológicas do modelo?',
    answer: 'O modelo distribui as médias históricas de forma uniforme ao longo do ano. Não considera variações sazonais nem eventos atípicos. É uma ferramenta de conscientização baseada em tendências reais — não um sistema de monitoramento em tempo real.'
  },
  {
    id: 'faq-23',
    category: 'Apoio',
    question: 'Como entrar em contato com o CVV em situações de crise emocional?',
    answer: 'Ligue 188 de qualquer telefone, a qualquer hora. O atendimento é gratuito, confidencial e funciona 24 horas por dia. Se preferir, acesse o chat em https://cvv.org.br/chat/ — funciona pelo celular mesmo.'
  },
  {
    id: 'faq-24',
    category: 'Apoio',
    question: 'Como localizar o CAPS mais próximo?',
    answer: 'Pesquise "CAPS" no Google Maps ou pergunte na Unidade de Saúde mais próxima. Eles atendem gratuitamente e sem burocracia.'
  },
  {
    id: 'faq-25',
    category: 'Apoio',
    question: 'Quais são os principais sinais de alerta em situações de risco ou sofrimento psíquico?',
    answer: 'Fique atento a mudanças bruscas de comportamento, isolamento súbito, falas sobre sair de cena ou não querer mais estar aqui, descuido com a aparência e despedidas aparentemente sem motivo. Se você perceber algo assim em alguém, pergunte diretamente — a pergunta não piora a situação.'
  },
  {
    id: 'faq-26',
    category: 'Apoio',
    question: 'Como abordar um amigo ou familiar que apresente sinais de sofrimento?',
    answer: 'Pergunte diretamente e ouça sem julgamento. Não diga "isso passa" ou "tem gente pior". Valide o que a pessoa está sentindo e se ofereça para ir junto buscar ajuda — no CAPS, num psicólogo ou no CVV. Estar presente já é muito.'
  },
  {
    id: 'faq-27',
    category: 'Apoio',
    question: 'O que fazer imediatamente em uma emergência de saúde mental?',
    answer: 'Não deixe a pessoa sozinha. Remova objetos perigosos do alcance. Ligue imediatamente para o CVV (188), para o SAMU (192) ou leve ao pronto-socorro mais próximo. Você não precisa resolver sozinho — mas estar lá faz toda a diferença.'
  }
];

