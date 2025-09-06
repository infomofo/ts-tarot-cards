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
} from './types';

const DATA_PATH = path.join(process.cwd(), 'tarot-model');

function loadMajorArcana(): Omit<MajorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation'>[] {
  const majorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'major-arcana');
  const files = fs.readdirSync(majorArcanaPath);

  return files.map(file => {
    const filePath = path.join(majorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const cardData: any = yaml.load(content);

    return {
      id: `major-${cardData.number.toString().padStart(2, '0')}-${cardData.name.toLowerCase().replace(/\s+/g, '-')}`,
      arcana: Arcana.Major,
      number: cardData.number as MajorArcana,
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

function loadMinorArcana(): Omit<MinorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation'>[] {
  const minorArcanaPath = path.join(DATA_PATH, 'decks', 'rider-waite-smith', 'minor-arcana');
  const files = fs.readdirSync(minorArcanaPath);
  const allCards: Omit<MinorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation'>[] = [];

  files.forEach(file => {
    const filePath = path.join(minorArcanaPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const suitData: any = yaml.load(content);
    const suitName = file.replace('.yml', '');
    const suit = (suitName.charAt(0).toUpperCase() + suitName.slice(1)) as Suit;

    suitData.cards.forEach((cardData: any) => {
      allCards.push({
        id: `minor-${getMinorNumberName(cardData.number).toLowerCase()}-of-${suitName.toLowerCase()}`,
        arcana: Arcana.Minor,
        suit: suit,
        number: cardData.number as MinorNumber,
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

function loadSpreads(): Record<string, Spread> {
  const spreadsPath = path.join(DATA_PATH, 'spreads.yml');
  const content = fs.readFileSync(spreadsPath, 'utf8');
  const data: any = yaml.load(content);
  return data.spreads;
}

function loadTags(): any {
  const tagsPath = path.join(DATA_PATH, 'tags.yml');
  const content = fs.readFileSync(tagsPath, 'utf8');
  const data: any = yaml.load(content);
  return data.tags;
}

function loadNumerology(): any {
  const numerologyPath = path.join(DATA_PATH, 'numerology.yml');
  const content = fs.readFileSync(numerologyPath, 'utf8');
  const data: any = yaml.load(content);
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
