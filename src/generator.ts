// Dedicated generator for authentic Classical Latin (Lorem Ipsum), Realistic Pseudo-Dutch, and Klingon (tlhIngan Hol)
// Featuring non-existing Dutch neologisms, authentic Klingon warrior grammar, and bullet lists

export type LanguageMode = 'latin' | 'dutch' | 'klingon';
export type ParagraphLength = 'short' | 'medium' | 'long';
export type OutputFormat = 'plain' | 'html' | 'markdown' | 'json';

export interface ParagraphItem {
  id: string;
  hasList: boolean;
  leadText: string;
  listItems: string[];
  followUpText?: string;
  rawText: string;
}

export interface GeneratorOptions {
  mode: LanguageMode;
  paragraphsCount: number;
  length: ParagraphLength;
  startWithLorem: boolean;
  includeLists: boolean;
}

// --- Latin Dictionary & Phrases ---
const LATIN_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'at', 'vero', 'eos',
  'accusamus', 'iusto', 'odio', 'dignissimos', 'ducimus', 'blanditiis', 'praesentium',
  'voluptatum', 'deleniti', 'atque', 'corrupti', 'quos', 'dolores', 'quas',
  'molestias', 'excepturi', 'occaecati', 'cupiditate', 'provident', 'similique',
  'mollitia', 'animi', 'dolorum', 'fuga', 'harum', 'quidem', 'rerum', 'facilis',
  'expedita', 'distinctio', 'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis',
  'eligendi', 'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus', 'maxime',
  'placeat', 'facere', 'possimus', 'omnis', 'voluptas', 'assumenda', 'repellendus',
  'temporibus', 'autem', 'quibusdam', 'officiis', 'debitis', 'saepe', 'eveniet',
  'voluptates', 'repudiandae', 'recusandae', 'itaque', 'earum', 'hic', 'tenetur',
  'sapiente', 'delectus', 'reiciendis', 'voluptatibus', 'maiores', 'alias',
  'perferendis', 'doloribus', 'asperiores', 'repellat', 'sapientem', 'arbitror',
  'pertinacia', 'comprehenditur', 'ratione', 'disciplinam', 'concludaturque',
  'philosophia', 'graviter', 'intellegatur', 'quaerendum', 'sententiae'
];

const LATIN_OPENERS = [
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
  'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti.',
  'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat.',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae.',
  'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.',
  'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
  'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.',
  'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
];

const LATIN_LIST_INTROS = [
  'Ex his autem rebus praecipue sequuntur:',
  'Principales conclusiones et rationes comprehenduntur:',
  'Harum rerum causae in promptu esse possunt:',
  'Quaedam ex his praecipuis officiis et commodis:',
  'In promptu est his de causis memoratis perspicere:',
  'Sequuntur cardines atque praecipua elementa:'
];

const LATIN_LIST_ITEMS = [
  'Consectetur adipiscing elit et sed do eiusmod tempor',
  'Ullamco laboris nisi ut aliquip ex ea commodo consequat',
  'Duis aute irure dolor in reprehenderit in voluptate velit',
  'Excepteur sint occaecat cupidatat non proident in culpa',
  'Accusamus et iusto odio dignissimos ducimus qui blanditiis',
  'Molestias excepturi sint occaecati cupiditate non provident',
  'Expedita distinctio nam libero tempore soluta nobis eligendi',
  'Temporibus autem quibusdam et aut officiis debitis aut rerum',
  'Reiciendis voluptatibus maiores alias consequatur aut perferendis',
  'Architecto beatae vitae dicta sunt explicabo nemo enim ipsam',
  'Magnam aliquam quaerat voluptatem ut enim ad minima veniam',
  'Corporis suscipit laboriosam nisi ut aliquid ex ea commodi'
];

// --- Non-Existing Dutch-Looking Pseudowords ---

const PSEUDO_DUTCH_NOUNS = [
  'knoestering', 'zwalkerschap', 'dreumelarij', 'plonstermacht', 'zwoeligheid',
  'flamberdom', 'grabbeltoet', 'schralerij', 'blonkerij', 'klossemens',
  'zwijmering', 'kroekeloof', 'schompelstelsel', 'drenkelarij', 'floeperte',
  'glimmernis', 'vlierigheid', 'slopperwoud', 'kwabberaar', 'drompertuur',
  'glunsterij', 'smoezelarij', 'stobbernis', 'kwelderaar', 'snoefterij',
  'rimpelarij', 'flodderdom', 'knorzeling', 'ploempernis', 'grompelij',
  'smadderaar', 'flonkerte', 'krammelarij', 'sneuvelaar', 'drommelarij',
  'kneukelarij', 'vroetelarij', 'zwomperaar', 'schellewaard', 'proestelarij',
  'snoevernis', 'kwikkelarij', 'plofsterij', 'kluisterdom', 'flemernis',
  'snobberij', 'brabbelstelsel', 'fliemerdom', 'glimmerschap', 'wrompelarij',
  'vloddernis', 'sprokkeltuur', 'knokkeldom', 'dwelmarij', 'snabbelaar',
  'knoerterij', 'zomperte', 'wrikkeling', 'slodderaar', 'sprenkelaar',
  'blodderdom', 'glompernis', 'stroefeling', 'slompertuur', 'kwamperij',
  'zwelgte', 'droemmeling', 'klonsterij', 'pluistering', 'frotterdom',
  'kwakkelarij', 'knuppelnis', 'wroeterij', 'schoffelaar', 'klopperdom',
  'zwalperij', 'strempelarij', 'sloffernis', 'knolsterdom', 'bolderarij',
  'plonsteraar', 'waddering', 'zwadderdom', 'sloddernis', 'snorkeltuur',
  'klompernis', 'kwanselarij', 'draverdom', 'smeurderij', 'klotterij',
  'krabbelstelsel', 'zwaffeling', 'snibbernis', 'sprokkelaar', 'kneuterdom'
];

const PSEUDO_DUTCH_ADJECTIVES = [
  'slompig', 'zwerfelijk', 'knoesterachtig', 'blonkerbaar', 'schrompeloos',
  'vlierend', 'zwijmerig', 'krammelend', 'snabberig', 'flonkerend',
  'grompelachtig', 'ploemperig', 'zwoelig', 'dreumelig', 'klossemachtig',
  'kwelbaar', 'snoefterig', 'flodderend', 'schomploos', 'glimmerend',
  'zwalkend', 'smadderig', 'kroekelig', 'fluisterzaam', 'knorzelig',
  'flemerig', 'sneuvelbaar', 'vroetelig', 'plompachtig', 'brabbelig',
  'kwakkelig', 'stroefelijk', 'glomperig', 'wrompelend', 'dwelmig',
  'blodderend', 'sprenkelbaar', 'droemelig', 'zwalperig', 'pluisterzaam',
  'knokkelig', 'frotterig', 'knoerterig', 'slomperig', 'schoffelig',
  'kluisterbaar', 'slodderig', 'knoetachtig', 'blompig', 'wrikkelig',
  'zwomperig', 'stobberig', 'proesterig', 'kwabberig', 'zwadderig',
  'klonsterend', 'bolderig', 'snorkelig', 'plonsterend', 'kwanselig'
];

const PSEUDO_DUTCH_VERBS_INFINITIVE = [
  'verkwonkelen', 'zwalpen', 'ontklungelen', 'behasperen', 'versnoefteren',
  'dreumelen', 'verklossemmen', 'zwijmeren', 'kroekelen', 'beschemeren',
  'grompelen', 'verslommelen', 'versnabbelen', 'beknoesteren', 'ontschompelen',
  'verflonkeren', 'glimmeren', 'ontzwalken', 'verkrammelen', 'besmoezelen',
  'sneufelen', 'verploemperen', 'drempelen', 'herknorzelen', 'wrompelen',
  'afvlodderen', 'sprokkelturen', 'bedwelmen', 'knoerteren', 'wrikkelen',
  'sprenkelen', 'blodderen', 'slomperen', 'kwamperen', 'klonsteren',
  'pluisteren', 'frotteren', 'kwakkelen', 'zwalperen', 'slofferen',
  'versmodderen', 'omzwadderen', 'beklomperen', 'afbolderen', 'ontkroekelen'
];

const PSEUDO_DUTCH_VERBS_PARTICIPLE = [
  'verkwonkelend', 'gezwalpt', 'ontklungeld', 'behasperd', 'versnoefterd',
  'opgedreumeld', 'verklossemd', 'herzwijmerd', 'afgekroekeld', 'beschemerd',
  'doorgrompeld', 'verslommeld', 'beknoesterd', 'ontschompeld', 'verflonkerd',
  'geglimmerd', 'ontzwalpt', 'verkrammeld', 'besmoezeld', 'verploemperd',
  'herknorzeld', 'bedwelmd', 'ingezwolpen', 'afgeslofferd', 'aangekroekeld',
  'uitgewrompeld', 'bijgesprokkeld', 'overknoesterd', 'omgezwalpt', 'doorflonkerd'
];

const PSEUDO_DUTCH_CONNECTORS = [
  'desalsnogtems', 'klosserhalve', 'overwijze', 'daarentegens', 'geenswaarts',
  'derknoeste', 'immertoest', 'onmisblonkbaar', 'zwoelwaarts', 'naarklompe',
  'immerselwijs', 'desalverkropt', 'nochteloos', 'allengsdoord', 'wederzwalks',
  'krachtenswaarts', 'bovendroems', 'omtrentelijks', 'klaarblonks', 'waarnodigher',
  'mitsgaderswijs', 'alstoebeurt', 'onverletsel'
];

const PSEUDO_DUTCH_LIST_INTROS = [
  'De voornaamste knoesteringen en zwalkers laten zich als volgt samenvatten:',
  'Enkele kenmerkende bevindingen uit het recente schompelstelsel:',
  'De voornaamste uitgangspunten van deze dreumelarij omvatten:',
  'Belangrijke overwegingen omtrent de stobbernis en vlierigheid:',
  'Hierbij vallen de volgende wrikkelingen direct waar te nemen:',
  'De belangrijkste facetten van het flamberdom zijn thans:',
  'Samenvattend kunnen de volgende floepertes worden onderscheiden:',
  'Tot slot gelden de onderstaande richtlijnen voor elke zwomperaar:'
];

const PSEUDO_DUTCH_LIST_ITEMS = [
  'Slompige wrompelarij met flonkerende dreumelarij',
  'Het ontklungelen van het gehele schompelstelsel',
  'Klossemachtige floepertes binnen de stobbernis',
  'Een duurzaam verankerde plonstermacht zonder grompelij',
  'Zwoelige kwabberaars met blonkerende vlierigheid',
  'Tijdige signalering van potentiële ploempernissen',
  'Verkwonkelende dromperturen rondom het kroekeloof',
  'Doeltreffende kwanselarij zonder overbodige snoefterij',
  'Stille wrikkeling der zwalpende bolderarijen',
  'Structurele afbakening van alle vlierende knoesteringen',
  'Preventieve maatregelen jegens ongewenste dwelmarij',
  'Systematische herzwijmering van het sprokkeltuur',
  'Verdere verfijning van de klompernis en het knokkeldom',
  'Het waarborgen van slomploze en blonkerbare uitgangspunten'
];

const STEMS = [
  'knoest', 'zwalk', 'dreum', 'plonst', 'blonk', 'kloss', 'zwijm', 'kroek',
  'schomp', 'floep', 'glimm', 'vlier', 'slopp', 'kwabb', 'dromp', 'glunst',
  'smoez', 'stobb', 'kweld', 'snoeft', 'flodd', 'knorz', 'ploemp', 'gromp',
  'smadd', 'flonk', 'kramm', 'kneuk', 'vroet', 'zwomp', 'proest', 'snoev',
  'kwikk', 'flem', 'snobb', 'brabb', 'fliem', 'wromp', 'vlodd', 'sprokk',
  'knokk', 'dwelm', 'snabb', 'knoert', 'wrikk', 'sprenk', 'blodd', 'glomp',
  'stroef', 'slomp', 'kwamp', 'klonst', 'pluist', 'frott', 'kwakk', 'knupp',
  'schoff', 'zwalp', 'sloff', 'knoet', 'slabb', 'knaust', 'proemp', 'snork',
  'kwisp', 'swalp', 'zwadd', 'bolder', 'smeurd', 'klott'
];

const NOUN_SUFFIXES = [
  'ing', 'enschap', 'arij', 'erij', 'igheid', 'erdam', 'eloof', 'enstelsel',
  'te', 'nis', 'eraar', 'ertuur', 'dom', 'sel', 'ling', 'sterij', 'knoop'
];

const ADJ_SUFFIXES = [
  'ig', 'erig', 'achtig', 'baar', 'end', 'zaam', 'eloos', 'lijk', 'erlijk'
];

// --- Klingon (tlhIngan Hol) Vocabulary & Phrases ---

const KLINGON_NOUNS = [
  'SuvwI\'', 'batlh', 'Duj', 'wo\'', 'jagh', 'may\'', 'HIq', 'targh', 'loD', 'be\'',
  'puq', 'juH', 'qo\'', 'chabal', 'lojmIt', 'nav', 'De\'wI\'', 'chIch', 'betleH', 'yIH',
  'ghe\'\'or', 'pIn\'a\'', 'ra\'ghom', 'roD', 'tach', 'tlhup', 'yaS', 'yoH', 'yuv', 'Qo\'noS',
  'quv', 'chut', 'pIch', 'sub', 'meq', 'Hegh', 'nger', 'vum', 'legh', 'ghoj',
  'tIgh', 'Ha\'DIbaH', 'cha\'', 'wey', 'yoD', 'ghom', 'ghob', 'bortaS', 'quv'
];

const KLINGON_VERBS = [
  'Qap', 'Hegh', 'taH', 'HoH', 'Sop', 'tlhutlh', 'ghoj', 'vum', 'legh', 'voq',
  'ghoH', 'jegh', 'poSmoH', 'Qaw\'', 'tu\'', 'baH', 'yIn', 'choQ', 'ja\'', 'jach',
  'jot', 'law\'', 'puS', 'ngoq', 'rotlh', 'val', 'yoH', 'yuv', 'nob', 'Doq',
  'lo\'', 'wov', 'Hurgh'
];

const KLINGON_ADJECTIVES = [
  'QaQ', 'bIr', 'qan', 'matlh', 'yoH', 'puj', 'tuj', 'chu\'', 'Doj', 'nIb',
  'Dun', 'tlhIb', 'val', 'sub', 'rotlh', 'meQ', 'Doy\'', 'quv', 'jegh'
];

const KLINGON_PROVERBS = [
  'batlh potlh law\' yIn potlh puS.',
  'Heghlu\'meH QaQ jajvam.',
  'bortaS bIr jablu\'DI\' reH QaQqu\' nay\'.',
  'tlhIngan wo\' rInbe\' reH taH.',
  'SuvwI\' qan tu\'lu\'be\'.',
  'Duj tIvoqtaH, \'ach Dujraj yIghoH.',
  'qo\'mey poSmoH Hol.',
  'bIjeghbe\'chugh vaj bIHegh.',
  'Ha\'DIbaH DaSopchugh, Ha\'DIbaH yISop.',
  'matlh \'ej yoH Hoch SuvwI\'.',
  'qeylIS betleH rur batlh \'ej quv.',
  'chaq wa\' jaj Hoch jaghmey DIQaw\'.',
  'De\'wI\' tIgh tlhInganpu\' ghojmeH taH.',
  'HIq tlhutlh SuvwI\'pu\', \'ach may\' lu\'ang.',
  'reH tagh may\' \'ej Hegh jagh.',
  'quvmey potlh law\' yInmey potlh puS.',
  'toH, bortaS yIcher \'ej SuvtaH!'
];

const KLINGON_LIST_INTROS = [
  'tlhIngan chut \'ej potlhqu\'bogh nger:',
  'bortaS \'ej batlh potlh law\' Hoch:',
  'SuvwI\'pu\' ra\'ghom nger vIlab:',
  'pIn\'a\'mey \'ej chabalmey vIto\':',
  'may\'mey \'ej batlh chabalmey vIcha\':',
  'Hoch SuvwI\'pu\'vaD ra\'lu\'bogh chut:'
];

const KLINGON_LIST_ITEMS = [
  'batlh potlh law\' yIn potlh puS',
  'Heghlu\'meH QaQ jajvam \'ej Qapla\'',
  'bortaS bIr jablu\'DI\' reH QaQqu\' nay\'',
  'tlhIngan wo\' rInbe\' reH taH',
  'SuvwI\' qan tu\'lu\'be\' \'ej yoH Hoch',
  'qeylIS betleH rur batlh \'ej quv',
  'bIjeghbe\'chugh vaj bIHeghqu\'',
  'qo\'mey poSmoH Hol \'ej De\'wI\'',
  'Duj tIvoqtaH \'ach jagh yIHoH',
  'HIq tlhutlh SuvwI\' \'ej taH',
  'Ha\'DIbaH DaSopchugh, Ha\'DIbaH yISop',
  'matlh \'ej yoH Hoch SuvwI\'pu\'',
  'chaq wa\' jaj Hoch jaghmey DIQaw\'',
  'toH, bortaS yIcher \'ej SuvtaH'
];

const KLINGON_TEMPLATES = [
  'HoHlu\'meH {noun1} vIlegh, \'ach {noun2} vIvoqtaH.',
  'batlh {verb1}taHvIS {noun1}, {verb2}qu\' {noun2}.',
  'chaq {noun1} lu{verb1}chugh, vaj {noun2} wI{verb2}pu\'.',
  'reH {noun1} potlh law\' {noun2} potlh puS.',
  'nuqDaq \'oH {noun1}\'e\' \'ej chay\' {noun2} {verb1}?',
  'bI{verb1}be\'chugh vaj {noun1} Da{verb2}laHbe\'.',
  '{noun1} qan tu\'lu\'be\' \'ej reH taH {noun2}.',
  'matlh {noun1} \'ej yoH {noun2}, vaj Qapla\' wIHev.',
  '{noun1}vam lu{verb1}taH Hoch SuvwI\'pu\'.',
  'bortaS {adj1} jablu\'DI\' reH {verb1}qu\' {noun1}.',
  'petaQ! {noun1} luHoHlu\' \'ej batlh {noun2} wIHev.',
  'qo\'mey poSmoH {noun1}, \'ach {noun2} wIQaw\'chu\'.'
];

function getRandomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDynamicPseudoNoun(): string {
  const prefix = Math.random() > 0.6 ? getRandomItem(['ver', 'be', 'ont', 'her', 'ge', 'aan', 'af']) : '';
  const stem = getRandomItem(STEMS);
  const suffix = getRandomItem(NOUN_SUFFIXES);
  return `${prefix}${stem}${suffix}`;
}

function generateDynamicPseudoAdj(): string {
  const stem = getRandomItem(STEMS);
  const suffix = getRandomItem(ADJ_SUFFIXES);
  return `${stem}${suffix}`;
}

function generateLatinSentence(): string {
  const sentenceLength = getRandomInt(8, 18);
  const words: string[] = [];
  for (let i = 0; i < sentenceLength; i++) {
    words.push(getRandomItem(LATIN_WORDS));
  }
  
  if (sentenceLength > 10 && Math.random() > 0.4) {
    const commaIndex = getRandomInt(3, sentenceLength - 4);
    words[commaIndex] = words[commaIndex] + ',';
  }
  
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

const DUTCH_PSEUDO_TEMPLATES = [
  'Hoewel de {noun1} van het {noun2} zorgvuldig dient te worden {participle}, blijkt in de praktijk dat het {noun3} veel {adj1}er in elkaar steekt.',
  '{connector} wijst recent onderzoek naar de {noun1} uit dat de {noun2} geenszins los kan worden gezien van het {noun3}.',
  'In tegenstelling tot wat men voorheen aannam over de {noun1}, levert deze {adj1}e benadering opmerkelijk {adj2}e uitkomsten op voor alle {noun_plural}.',
  'Bovendien dient te worden opgemerkt dat een {adj1}e wisselwerking tussen het {noun1} en de {noun2} van buitengewoon {adj2} belang blijft.',
  'Klaarblijkelijk ontstaan er nieuwe {noun_plural} zodra men de {noun1} van het {noun2} nader gaat {infinitive}.',
  'Men kan zich overigens afvragen in hoeverre een {adj1}e {noun1} op de langere termijn voldoende {adj2} zal blijken voor de {noun2}.',
  'Naarmate de {noun_plural} elkaar sneller opvolgen, groeit eveneens de behoefte aan een {adj1} {noun1} met heldere {noun_plural}.',
  'Het uitgangspunt van deze gedachtegang berust immers op het principe dat een {noun1} slechts verwezenlijkt kan worden door het {noun2} te {infinitive}.',
  'Zowel binnen het {noun1} als rondom de {noun2} wordt deze {adj1}e zienswijze thans breed {participle}.',
  'Onverminderd van kracht blijft het standpunt dat {noun1}, {noun2} en {noun3} steeds voorop dienen te staan bij elke nieuwe {noun4}.',
  'Tevens kan worden vastgesteld dat de {noun1} tussen de {noun2} en het {noun3} aanzienlijk aan {noun4} heeft gewonnen.',
  'Het behoeft dan ook geen betoog dat een tijdige signalering van {adj1}e {noun_plural} van {adj2}e invloed is.',
  'Derhalve is het raadzaam om niet enkel naar de directe {noun1} te kijken, maar tevens het {noun2} grondig te {infinitive}.',
  'Zonder een {adj1}e {noun1} dreigt het gehele {noun2} immers te {infinitive}, hetgeen door menig {noun3} ten stelligste wordt {participle}.',
  'Reeds tijdens de eerste {noun1} werd duidelijk dat een dergelijke {noun2} nauwelijks te {infinitive} valt binnen de bestaande {noun_plural}.',
  'Alhoewel menigeen twijfelt aan de {noun1}, bewijst de {adj1}e {noun2} dat het {noun3} wel degelijk kan {infinitive}.'
];

function getPseudoNoun(): string {
  return Math.random() > 0.4 ? getRandomItem(PSEUDO_DUTCH_NOUNS) : generateDynamicPseudoNoun();
}

function getPseudoAdj(): string {
  return Math.random() > 0.4 ? getRandomItem(PSEUDO_DUTCH_ADJECTIVES) : generateDynamicPseudoAdj();
}

function getPseudoNounPlural(): string {
  const noun = getPseudoNoun();
  if (noun.endsWith('ing') || noun.endsWith('erij') || noun.endsWith('arij') || noun.endsWith('te')) {
    return noun + 'en';
  }
  if (noun.endsWith('aar') || noun.endsWith('sel') || noun.endsWith('dom')) {
    return noun + 's';
  }
  return noun + 'en';
}

function generatePseudoDutchSentence(): string {
  if (Math.random() < 0.72) {
    const template = getRandomItem(DUTCH_PSEUDO_TEMPLATES);
    return template
      .replace('{noun1}', getPseudoNoun())
      .replace('{noun2}', getPseudoNoun())
      .replace('{noun3}', getPseudoNoun())
      .replace('{noun4}', getPseudoNoun())
      .replace('{noun_plural}', getPseudoNounPlural())
      .replace('{adj1}', getPseudoAdj())
      .replace('{adj2}', getPseudoAdj())
      .replace('{infinitive}', getRandomItem(PSEUDO_DUTCH_VERBS_INFINITIVE))
      .replace('{participle}', getRandomItem(PSEUDO_DUTCH_VERBS_PARTICIPLE))
      .replace('{connector}', getRandomItem(PSEUDO_DUTCH_CONNECTORS));
  }

  const sentenceTypes = [
    () => `De ${getPseudoAdj()}e ${getPseudoNoun()} ${getRandomItem(PSEUDO_DUTCH_VERBS_PARTICIPLE)} gisteren reeds de gehele ${getPseudoNoun()}, terwijl het ${getPseudoNoun()} rustig bleef ${getRandomItem(PSEUDO_DUTCH_VERBS_INFINITIVE)}.`,
    () => `Hierdoor raakte menige ${getPseudoNoun()} verstrikt in een ${getPseudoAdj()}e ${getPseudoNoun()}, hetgeen allengsdoord leidde tot een onverwachte ${getPseudoNoun()}.`,
    () => `Is het immers niet zo dat elke ${getPseudoAdj()}e ${getPseudoNoun()} uiteindelijk dient te ${getRandomItem(PSEUDO_DUTCH_VERBS_INFINITIVE)}?`,
    () => `Men constateert dat noch de ${getPseudoNoun()}, noch het ${getPseudoNoun()} in staat is om de ${getPseudoAdj()}e ${getPseudoNounPlural()} te ${getRandomItem(PSEUDO_DUTCH_VERBS_INFINITIVE)}.`,
    () => `Met een ${getPseudoAdj()} gebaar gaf de ${getPseudoNoun()} te kennen dat het ${getPseudoNoun()} thans volledig was ${getRandomItem(PSEUDO_DUTCH_VERBS_PARTICIPLE)}.`
  ];

  return getRandomItem(sentenceTypes)();
}

function generateKlingonSentence(): string {
  // 45% use authentic canonical proverbs
  if (Math.random() < 0.45) {
    return getRandomItem(KLINGON_PROVERBS);
  }

  // 55% use dynamic Klingon warrior template
  const template = getRandomItem(KLINGON_TEMPLATES);
  return template
    .replace('{noun1}', getRandomItem(KLINGON_NOUNS))
    .replace('{noun2}', getRandomItem(KLINGON_NOUNS))
    .replace('{verb1}', getRandomItem(KLINGON_VERBS))
    .replace('{verb2}', getRandomItem(KLINGON_VERBS))
    .replace('{adj1}', getRandomItem(KLINGON_ADJECTIVES));
}

function generateSentenceForMode(mode: LanguageMode): string {
  switch (mode) {
    case 'latin':
      return Math.random() < 0.25 ? getRandomItem(LATIN_OPENERS) : generateLatinSentence();
    case 'dutch':
      return generatePseudoDutchSentence();
    case 'klingon':
      return generateKlingonSentence();
  }
}

function getSentenceCountForLength(length: ParagraphLength): number {
  switch (length) {
    case 'short':
      return getRandomInt(3, 4);
    case 'medium':
      return getRandomInt(5, 7);
    case 'long':
      return getRandomInt(8, 11);
  }
}

function buildRawText(leadText: string, listItems: string[], followUpText?: string): string {
  if (listItems.length === 0) return leadText;
  const items = listItems.map(item => `  • ${item}`).join('\n');
  return followUpText ? `${leadText}\n${items}\n${followUpText}` : `${leadText}\n${items}`;
}

export function generateText(options: GeneratorOptions): ParagraphItem[] {
  const { mode, paragraphsCount, length, startWithLorem, includeLists } = options;
  const count = Math.max(1, Math.min(100, Math.floor(paragraphsCount) || 1));
  const paragraphs: ParagraphItem[] = [];

  // Determine which paragraphs will contain bullet summaries
  const listIndices = new Set<number>();
  if (includeLists) {
    if (count === 1) {
      listIndices.add(0);
    } else {
      const candidateIndices = Array.from({ length: count }, (_, i) => i);
      const pool = count > 1 ? candidateIndices.slice(1) : candidateIndices;
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      const numLists = Math.max(1, Math.round(count * 0.35));
      for (let i = 0; i < Math.min(numLists, pool.length); i++) {
        listIndices.add(pool[i]);
      }
    }
  }

  for (let p = 0; p < count; p++) {
    const id = `p-${p}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const hasList = listIndices.has(p);

    if (hasList) {
      // Build a paragraph containing a bullet summary
      const introSentences: string[] = [];
      const sentencesCount = length === 'short' ? 1 : getRandomInt(1, 2);

      for (let s = 0; s < sentencesCount; s++) {
        if (p === 0 && s === 0 && startWithLorem) {
          if (mode === 'latin') {
            introSentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.');
          } else if (mode === 'dutch') {
            introSentences.push('Knoestering ipsum dolor sit amet, klossemachtige zwalkers en vlierende dreumelarij ter opvulling van de plonstermacht.');
          } else {
            introSentences.push('Qapla\' ipsum dolor sit amet, batlh potlh law\' yIn potlh puS, Heghlu\'meH QaQ jajvam.');
          }
        } else {
          introSentences.push(generateSentenceForMode(mode));
        }
      }

      // Add the list intro
      let listIntro: string;
      let itemPool: string[];
      if (mode === 'latin') {
        listIntro = getRandomItem(LATIN_LIST_INTROS);
        itemPool = [...LATIN_LIST_ITEMS];
      } else if (mode === 'dutch') {
        listIntro = getRandomItem(PSEUDO_DUTCH_LIST_INTROS);
        itemPool = [...PSEUDO_DUTCH_LIST_ITEMS];
      } else {
        listIntro = getRandomItem(KLINGON_LIST_INTROS);
        itemPool = [...KLINGON_LIST_ITEMS];
      }

      introSentences.push(listIntro);
      const leadText = introSentences.join(' ');

      // Pick 3 to 5 bullet items
      const itemCount = getRandomInt(3, 5);
      for (let i = itemPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [itemPool[i], itemPool[j]] = [itemPool[j], itemPool[i]];
      }
      const listItems = itemPool.slice(0, itemCount);

      // Optional follow up sentence (70% probability if length is medium or long)
      let followUpText: string | undefined = undefined;
      if (length !== 'short' && Math.random() < 0.75) {
        followUpText = generateSentenceForMode(mode);
      }

      const rawText = buildRawText(leadText, listItems, followUpText);
      paragraphs.push({
        id,
        hasList: true,
        leadText,
        listItems,
        followUpText,
        rawText
      });
    } else {
      // Regular paragraph
      const sentencesInPara = getSentenceCountForLength(length);
      const sentences: string[] = [];

      for (let s = 0; s < sentencesInPara; s++) {
        if (p === 0 && s === 0 && startWithLorem) {
          if (mode === 'latin') {
            sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
          } else if (mode === 'dutch') {
            sentences.push('Knoestering ipsum dolor sit amet, klossemachtige zwalkers en vlierende dreumelarij ter opvulling van de plonstermacht.');
          } else {
            sentences.push('Qapla\' ipsum dolor sit amet, batlh potlh law\' yIn potlh puS, Heghlu\'meH QaQ jajvam.');
          }
          continue;
        }

        sentences.push(generateSentenceForMode(mode));
      }

      const leadText = sentences.join(' ');
      paragraphs.push({
        id,
        hasList: false,
        leadText,
        listItems: [],
        rawText: leadText
      });
    }
  }

  return paragraphs;
}

export function formatSingleParagraph(para: ParagraphItem, format: OutputFormat): string {
  if (!para.hasList) {
    switch (format) {
      case 'html':
        return `<p>${para.rawText}</p>`;
      case 'plain':
      case 'markdown':
      case 'json':
      default:
        return para.rawText;
    }
  }

  // Paragraph with list
  switch (format) {
    case 'html': {
      const itemsHtml = para.listItems.map(item => `  <li>${item}</li>`).join('\n');
      const followUp = para.followUpText ? `\n<p>${para.followUpText}</p>` : '';
      return `<p>${para.leadText}</p>\n<ul>\n${itemsHtml}\n</ul>${followUp}`;
    }
    case 'markdown': {
      const itemsMd = para.listItems.map(item => `- ${item}`).join('\n');
      const followUp = para.followUpText ? `\n\n${para.followUpText}` : '';
      return `${para.leadText}\n\n${itemsMd}${followUp}`;
    }
    case 'plain': {
      const itemsPlain = para.listItems.map(item => `  • ${item}`).join('\n');
      const followUp = para.followUpText ? `\n${para.followUpText}` : '';
      return `${para.leadText}\n${itemsPlain}${followUp}`;
    }
    case 'json': {
      return para.rawText;
    }
  }
}

export function formatOutput(paragraphs: ParagraphItem[], format: OutputFormat): string {
  switch (format) {
    case 'plain':
      return paragraphs.map(p => formatSingleParagraph(p, 'plain')).join('\n\n');
    case 'html':
      return paragraphs.map(p => formatSingleParagraph(p, 'html')).join('\n\n');
    case 'markdown':
      return paragraphs.map(p => formatSingleParagraph(p, 'markdown')).join('\n\n');
    case 'json': {
      const mapped = paragraphs.map(p => {
        if (!p.hasList) return p.rawText;
        return {
          leadText: p.leadText,
          listItems: p.listItems,
          followUpText: p.followUpText || null,
        };
      });
      return JSON.stringify(mapped, null, 2);
    }
  }
}

export function calculateStats(text: string, paragraphsCount: number) {
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const characters = trimmed.length;
  const readingTimeMinutes = Math.max(0.1, +(words / 200).toFixed(1));

  return {
    paragraphs: paragraphsCount,
    words,
    characters,
    readingTimeMinutes,
  };
}
