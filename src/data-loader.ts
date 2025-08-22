import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { MajorArcanaCard, MinorArcanaCard, SuitProperties, Spread, MajorArcana, MinorArcana, Suit, MinorNumber, getMajorArcanaName, getMinorNumberName } from './types';

const tarotModelDir = path.join(__dirname, '..', 'tarot-model');

function loadYamlFile(filePath: string): any {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return yaml.load(fileContents);
}

export function loadMajorArcanaCards(): Partial<Record<MajorArcana, MajorArcanaCard>> {
  const majorArcanaDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'major-arcana');
  const files = fs.readdirSync(majorArcanaDir);
  const cards: Partial<Record<MajorArcana, MajorArcanaCard>> = {};

  for (const file of files) {
    if (path.extname(file) === '.yml') {
      const data = loadYamlFile(path.join(majorArcanaDir, file));
      const number = data.number as MajorArcana;
      cards[number] = {
        ...data,
        id: `major-${String(number).padStart(2, '0')}-${getMajorArcanaName(number).toLowerCase().replace(/\s+/g, '-')}`,
        romanNumeral: toRomanNumeral(number),
        getSvg: () => '', // These will be implemented later
        getTextRepresentation: () => '',
        getName: () => data.name,
      } as MajorArcanaCard;
    }
  }
  return cards;
}

export function loadMinorArcanaCards(): Partial<Record<MinorArcana, MinorArcanaCard>> {
  const minorArcanaDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'minor-arcana');
  const files = fs.readdirSync(minorArcanaDir);
  const cards: Partial<Record<MinorArcana, MinorArcanaCard>> = {};

  for (const file of files) {
    if (path.extname(file) === '.yml') {
      const data = loadYamlFile(path.join(minorArcanaDir, file));
      const suit = data.suit as Suit;
      const number = data.number as MinorNumber;
      const cardEnum = MinorArcana[`${getMinorNumberName(number)}Of${suit}` as keyof typeof MinorArcana];

      cards[cardEnum] = {
        ...data,
        id: `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`,
        romanNumeral: toRomanNumeral(number),
        getSvg: () => '', // These will be implemented later
        getTextRepresentation: () => '',
        getName: () => data.name,
      } as MinorArcanaCard;
    }
  }
  return cards;
}

export function loadSuitProperties(): Record<Suit, SuitProperties> {
  const suitsDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'suits');
  const files = fs.readdirSync(suitsDir);
  const suitProperties: Partial<Record<Suit, SuitProperties>> = {};

  for (const file of files) {
    if (path.extname(file) === '.yml') {
      const data = loadYamlFile(path.join(suitsDir, file));
      const suit = data.name as Suit;
      suitProperties[suit] = data as SuitProperties;
    }
  }
  return suitProperties as Record<Suit, SuitProperties>;
}

export function loadSpreads(): Record<string, Spread> {
  const spreadsDir = path.join(tarotModelDir, 'spreads');
  const files = fs.readdirSync(spreadsDir);
  const spreads: Record<string, Spread> = {};

  for (const file of files) {
    if (path.extname(file) === '.yml') {
      const data = loadYamlFile(path.join(spreadsDir, file));
      const spreadName = path.basename(file, '.yml').replace(/-(\w)/g, (_, c) => c.toUpperCase());
      spreads[spreadName] = data as Spread;
    }
  }
  return spreads;
}

// Helper function to convert number to Roman numeral
function toRomanNumeral(num: number): string {
  if (num === 0) return '0';
  const roman = {
    M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let str = '';
  for (const i in roman) {
    const q = Math.floor(num / roman[i as keyof typeof roman]);
    num -= q * roman[i as keyof typeof roman];
    str += i.repeat(q);
  }
  return str;
}
