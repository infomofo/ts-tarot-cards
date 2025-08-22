import { MinorArcanaCard, Arcana, Suit, MinorNumber, MinorArcana, getMinorNumberName, toRomanNumeral, CardSymbol, SVGOptions } from '../types';
import { generateSvg } from './svg-generator';
import { SUIT_PROPERTIES } from './suit';
import { loadMinorArcanaCards } from '../data-loader';

// Concrete implementation of MinorArcanaCard with localization support
class MinorArcanaCardImpl implements MinorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Minor = Arcana.Minor;
  public readonly suit: Suit;
  public readonly number: MinorNumber;
  public readonly romanNumeral: string;
  public readonly keywords: string[];
  public readonly meanings: { upright: string[]; reversed: string[]; };
  public readonly visual_description: { background: string; foreground: string; };
  public readonly visual_description_analysis: string[];
  public readonly symbols: CardSymbol[];
  public readonly significance: string;
  public readonly description: string;

  constructor(data: any) {
    this.id = data.id;
    this.suit = data.suit;
    this.number = data.number;
    this.romanNumeral = data.romanNumeral;
    this.keywords = data.keywords;
    this.meanings = data.meanings;
    this.visual_description = data.visual_description;
    this.visual_description_analysis = data.visual_description_analysis;
    this.symbols = data.symbols;
    this.significance = data.significance;
    this.description = data.description;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(isReversed = false): string {
    const reversedMark = isReversed ? 'r' : '';
    if (this.id === 'minor-ace-of-cups') {
      return `[mA☕️${reversedMark}]`;
    }
    const suitEmoji = SUIT_PROPERTIES[this.suit].emoji;
    let numberChar;
    switch (this.number) {
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
        numberChar = String(this.number);
        break;
    }
    return `[m${numberChar}${suitEmoji}${reversedMark}]`;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return `${getMinorNumberName(this.number)} of ${this.suit}`;
  }
}

const loadedCards = loadMinorArcanaCards();

export const MINOR_ARCANA_CARDS: Partial<Record<MinorArcana, MinorArcanaCard>> = {};

for (const key in loadedCards) {
  const cardData = loadedCards[key as unknown as MinorArcana];
  if (cardData) {
    MINOR_ARCANA_CARDS[key as unknown as MinorArcana] = new MinorArcanaCardImpl(cardData);
  }
}

export function getMinorArcanaCard(enumValue: MinorArcana): MinorArcanaCard | undefined {
  return MINOR_ARCANA_CARDS[enumValue];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
}
