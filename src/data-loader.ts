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
  getMinorNumberName,
  Arcana,
  Element,
  CardSymbol,
} from './types';

// Interfaces for raw YAML data
interface RawMajorArcanaData {
  number: MajorArcana;
  name: string;
  keywords: string[];
  meanings: {
    upright: string[];
    reversed: string[];
  };
  visual_description: {
    background: string;
    foreground: string;
  };
  visual_description_analysis: string[];
  symbols: CardSymbol[];
  significance: string;
  description: string;
  emoji?: string;
  bg_color?: string;
}

interface RawMinorArcanaData {
  number: MinorNumber;
  name: string;
  keywords: string[];
  meanings: {
    upright: string[];
    reversed: string[];
  };
  visual_description: {
    background: string;
    foreground: string;
  };
  visual_description_analysis: string[];
  symbols: CardSymbol[];
  significance: string;
  description: string;
}

interface RawSuitFileData {
  cards: RawMinorArcanaData[];
}

interface RawSuitPropertiesData {
  name: Suit;
  element: Element;
  general_meaning: string;
  keywords: string[];
  emoji: string;
}

interface RawSpreadsFile {
  spreads: Record<string, Spread>;
}

const DATA_PATH = path.join(process.cwd(), 'tarot-model');

function loadMajorArcana(): Omit<MajorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation' | 'element'>[] {
  const majorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'major-arcana');
  const files = fs.readdirSync(majorArcanaPath);

  return files.map((file) => {
    const filePath = path.join(majorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const cardData = yaml.load(content) as RawMajorArcanaData;

    return {
      id: `major-${cardData.number.toString().padStart(2, '0')}-${cardData.name.toLowerCase().replace(/\s+/g, '-')}`,
      arcana: Arcana.Major,
      number: cardData.number,
      name: cardData.name,
      romanNumeral: toRomanNumeral(cardData.number),
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
  });
}

function loadMinorArcana(): Omit<MinorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation' | 'element' | 'faceCardEmoji'>[] {
  const minorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'minor-arcana');
  const files = fs.readdirSync(minorArcanaPath);
  const allCards: Omit<MinorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation' | 'element' | 'faceCardEmoji'>[] = [];

  files.forEach((file) => {
    const filePath = path.join(minorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const suitData = yaml.load(content) as RawSuitFileData;
    const suitName = file.replace('.yml', '');
    const suit = (suitName.charAt(0).toUpperCase() + suitName.slice(1)) as Suit;

    suitData.cards.forEach((cardData) => {
      allCards.push({
        id: `minor-${getMinorNumberName(cardData.number).toLowerCase()}-of-${suitName.toLowerCase()}`,
        arcana: Arcana.Minor,
        suit,
        number: cardData.number,
        name: cardData.name,
        romanNumeral: toRomanNumeral(cardData.number),
        keywords: cardData.keywords,
        meanings: cardData.meanings,
        visual_description: cardData.visual_description,
        visual_description_analysis: cardData.visual_description_analysis,
        symbols: cardData.symbols,
        significance: cardData.significance,
        description: cardData.description,
      });
    });
  });

  return allCards;
}

function loadSuitProperties(): Record<Suit, SuitProperties> {
  const suitsPath = path.join(DATA_PATH, 'suits');
  const files = fs.readdirSync(suitsPath);
  const suitProperties: Partial<Record<Suit, SuitProperties>> = {};

  files.forEach((file) => {
    const filePath = path.join(suitsPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(content) as RawSuitPropertiesData;
    const suit = data.name;
    suitProperties[suit] = {
      element: data.element,
      general_meaning: data.general_meaning,
      keywords: data.keywords,
      emoji: data.emoji,
    };
  });

  return suitProperties as Record<Suit, SuitProperties>;
}

function loadSpreads(): Record<string, Spread> {
  const spreadsPath = path.join(DATA_PATH, 'spreads.yml');
  const content = fs.readFileSync(spreadsPath, 'utf8');
  const data = yaml.load(content) as RawSpreadsFile;
  return data.spreads;
}

function loadTags(): Record<string, string[]> {
  const tagsPath = path.join(DATA_PATH, 'tags.yml');
  const content = fs.readFileSync(tagsPath, 'utf8');
  const data = yaml.load(content) as { tags: Record<string, string[]> };
  return data.tags;
}

function loadNumerology(): Record<number, { name: string, keywords: string[] }> {
  const numerologyPath = path.join(DATA_PATH, 'numerology.yml');
  const content = fs.readFileSync(numerologyPath, 'utf8');
  const data = yaml.load(content) as {
    numbers: Record<number, { name: string, keywords: string[] }>
  };
  return data.numbers;
}

export const TAROT_DATA = {
  majorArcana: loadMajorArcana(),
  minorArcana: loadMinorArcana(),
  suitProperties: loadSuitProperties(),
  spreads: loadSpreads(),
  tags: loadTags(),
  numerology: loadNumerology(),
};
