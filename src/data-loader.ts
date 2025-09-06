import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import {
  MajorArcanaCard,
  MinorArcanaCard,
  Suit,
  MajorArcana,
  MinorNumber,
  Spread,
  SuitProperties,
  toRomanNumeral,
  getMajorArcanaName,
  getMinorNumberName,
  Arcana,
  SVGOptions,
} from './types';
import { generateSvg } from './cards/svg-generator';

const DATA_PATH = path.join(process.cwd(), 'tarot-model');

// Function to load Major Arcana cards
function loadMajorArcana(): MajorArcanaCard[] {
  const majorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'major-arcana');
  const files = fs.readdirSync(majorArcanaPath);

  return files.map(file => {
    const filePath = path.join(majorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const cardData: any = yaml.load(content);

    const card: Omit<MajorArcanaCard, 'id' | 'romanNumeral' | 'getName' | 'getSvg' | 'getTextRepresentation'> = {
      arcana: Arcana.Major,
      number: cardData.number as MajorArcana,
      name: cardData.name,
      keywords: cardData.keywords,
      meanings: cardData.meanings,
      visual_description: cardData.visual_description,
      visual_description_analysis: cardData.visual_description_analysis,
      symbols: cardData.symbols,
      significance: cardData.significance,
      description: cardData.description,
      emoji: cardData.emoji,
      bg_color: cardData.bg_color,
    };

    const finalCard: MajorArcanaCard = {
      ...card,
      id: `major-${card.number.toString().padStart(2, '0')}-${card.name.toLowerCase().replace(/\s+/g, '-')}`,
      romanNumeral: toRomanNumeral(card.number),
      getName: () => card.name,
      getSvg: (options?: SVGOptions) => generateSvg(finalCard, options),
      getTextRepresentation: (isReversed = false) => {
        const reversedMark = isReversed ? 'r' : '';
        if (card.emoji) {
          return `[M${card.number}${card.emoji}${reversedMark}]`;
        }
        return `[M${card.number}-${getMajorArcanaName(card.number).replace(/\s/g, '')}${reversedMark}]`;
      },
    };

    return finalCard;
  });
}

// Function to load Minor Arcana cards
function loadMinorArcana(suitProperties: Record<Suit, SuitProperties>): MinorArcanaCard[] {
  const minorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'minor-arcana');
  const files = fs.readdirSync(minorArcanaPath);
  const allCards: MinorArcanaCard[] = [];

  files.forEach(file => {
    const filePath = path.join(minorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const suitData: any = yaml.load(content);
    const suit = file.replace('.yml', '') as Suit;

    suitData.cards.forEach((cardData: any) => {
      const card: Omit<MinorArcanaCard, 'id' | 'romanNumeral' | 'getName' | 'getSvg' | 'getTextRepresentation'> = {
        arcana: Arcana.Minor,
        suit: suit,
        number: cardData.number as MinorNumber,
        name: cardData.name,
        keywords: cardData.keywords,
        meanings: cardData.meanings,
        visual_description: cardData.visual_description,
        visual_description_analysis: cardData.visual_description_analysis,
        symbols: cardData.symbols,
        significance: cardData.significance,
        description: cardData.description,
      };

      const finalCard: MinorArcanaCard = {
        ...card,
        id: `minor-${getMinorNumberName(card.number).toLowerCase()}-of-${card.suit.toLowerCase()}`,
        romanNumeral: toRomanNumeral(card.number),
        getName: () => card.name,
        getSvg: (options?: SVGOptions) => generateSvg(finalCard, options),
        getTextRepresentation: (isReversed = false) => {
          const reversedMark = isReversed ? 'r' : '';
          if (finalCard.id === 'minor-ace-of-cups') {
            return `[mA☕️${reversedMark}]`;
          }
          const suitEmoji = TAROT_DATA.suitProperties[card.suit].emoji;
          let numberChar;
          switch (card.number) {
            case MinorNumber.Ace:
              numberChar = 'A';
              break;
            case MinorNumber.Page:
              numberChar = 'P';
              break;
            case MinorNumber.Knight:
              numberChar = 'N';
              break;
            case MinorNumber.Queen:
              numberChar = 'Q';
              break;
            case MinorNumber.King:
              numberChar = 'K';
              break;
            default:
              numberChar = String(card.number);
              break;
          }
          return `[m${numberChar}${suitEmoji}${reversedMark}]`;
        },
      };
      allCards.push(finalCard);
    });
  });

  return allCards;
}

// Function to load Suit Properties
function loadSuitProperties(): Record<Suit, SuitProperties> {
    const suitsPath = path.join(DATA_PATH, 'suits');
    const files = fs.readdirSync(suitsPath);
    const suitProperties: Partial<Record<Suit, SuitProperties>> = {};

    files.forEach(file => {
        const filePath = path.join(suitsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const data: any = yaml.load(content);
        const suit = data.name as Suit;
        suitProperties[suit] = {
            element: data.element,
            general_meaning: data.general_meaning,
            keywords: data.keywords,
            emoji: data.emoji,
        };
    });

    return suitProperties as Record<Suit, SuitProperties>;
}


// Function to load Spreads
function loadSpreads(): Record<string, Spread> {
  const spreadsPath = path.join(DATA_PATH, 'spreads.yml');
  const content = fs.readFileSync(spreadsPath, 'utf8');
  const data: any = yaml.load(content);
  return data.spreads;
}

// Function to load Tags
function loadTags(): any {
  const tagsPath = path.join(DATA_PATH, 'tags.yml');
  const content = fs.readFileSync(tagsPath, 'utf8');
  const data: any = yaml.load(content);
  return data.tags;
}

// Function to load Numerology
function loadNumerology(): any {
  const numerologyPath = path.join(DATA_PATH, 'numerology.yml');
  const content = fs.readFileSync(numerologyPath, 'utf8');
  const data: any = yaml.load(content);
  return data.numbers;
}

let tarotData: any = null;

export function getTarotData() {
  if (tarotData) {
    return tarotData;
  }

  const suitProperties = loadSuitProperties();
  tarotData = {
    majorArcana: loadMajorArcana(),
    minorArcana: loadMinorArcana(suitProperties),
    suitProperties: suitProperties,
    spreads: loadSpreads(),
    tags: loadTags(),
    numerology: loadNumerology(),
  };
  return tarotData;
}

export const TAROT_DATA = getTarotData();
