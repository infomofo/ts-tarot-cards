import { MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName, toRomanNumeral, CardSymbol, SVGOptions } from '../types';
import { generateSvg } from './svg-generator';
import { loadMajorArcanaCards } from '../data-loader';

// Concrete implementation of MajorArcanaCard with localization support
class MajorArcanaCardImpl implements MajorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Major = Arcana.Major;
  public readonly number: MajorArcana;
  public readonly romanNumeral: string;
  public readonly keywords: string[];
  public readonly meanings: { upright: string[]; reversed: string[]; };
  public readonly visual_description: { background: string; foreground: string; };
  public readonly visual_description_analysis: string[];
  public readonly symbols: CardSymbol[];
  public readonly significance: string;
  public readonly description: string;
  public readonly emoji?: string;
  public readonly backgroundColor?: string;

  constructor(data: any) {
    this.id = data.id;
    this.number = data.number;
    this.romanNumeral = data.romanNumeral;
    this.keywords = data.keywords;
    this.meanings = data.meanings;
    this.visual_description = data.visual_description;
    this.visual_description_analysis = data.visual_description_analysis;
    this.symbols = data.symbols;
    this.significance = data.significance;
    this.description = data.description;
    this.emoji = data.emoji;
    this.backgroundColor = data.bg_color;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(isReversed = false): string {
    const reversedMark = isReversed ? 'r' : '';
    if (this.emoji) {
      return `[M${this.number}${this.emoji}${reversedMark}]`;
    }
    return `[M${this.number}-${this.getName().replace(/\s/g, '')}${reversedMark}]`;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return getMajorArcanaName(this.number);
  }
}

const loadedCards = loadMajorArcanaCards();

export const MAJOR_ARCANA_CARDS: Partial<Record<MajorArcana, MajorArcanaCard>> = {};

for (const key in loadedCards) {
  const cardData = loadedCards[key as unknown as MajorArcana];
  if (cardData) {
    MAJOR_ARCANA_CARDS[key as unknown as MajorArcana] = new MajorArcanaCardImpl(cardData);
  }
}

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}

export function createMajorArcanaId(arcana: MajorArcana): string {
  return `major-${arcana.toString().padStart(2, '0')}-${getMajorArcanaName(arcana).toLowerCase().replace(/\s+/g, '-')}`;
}
