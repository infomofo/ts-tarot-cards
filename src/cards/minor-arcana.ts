import {
  MinorArcanaCard,
  Arcana,
  Suit,
  Element,
  MinorNumber,
  getMinorNumberName,
  CardSymbol,
  SVGOptions,
} from '../types';
import { generateSvg } from './svg-generator';

// Concrete implementation of MinorArcanaCard
export class MinorArcanaCardImpl implements MinorArcanaCard {
  public readonly id: string;

  public readonly arcana: Arcana.Minor = Arcana.Minor;

  public readonly suit: Suit;

  public readonly element: Element;

  public readonly number: MinorNumber;

  public readonly name: string;

  public readonly romanNumeral: string;

  public readonly keywords: string[];

  public readonly meanings: { upright: string[]; reversed: string[]; };

  public readonly visual_description: { background: string; foreground: string; };

  public readonly visual_description_analysis: string[];

  public readonly symbols: CardSymbol[];

  public readonly significance: string;

  public readonly description: string;

  public readonly faceCardEmoji?: string;

  constructor(cardData: Omit<MinorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation'>) {
    this.id = cardData.id;
    this.suit = cardData.suit;
    this.element = cardData.element;
    this.number = cardData.number;
    this.name = cardData.name;
    this.romanNumeral = cardData.romanNumeral;
    this.keywords = cardData.keywords;
    this.meanings = cardData.meanings;
    this.visual_description = cardData.visual_description;
    this.visual_description_analysis = cardData.visual_description_analysis;
    this.symbols = cardData.symbols;
    this.significance = cardData.significance;
    this.description = cardData.description;
    this.faceCardEmoji = cardData.faceCardEmoji;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(isReversed = false): string {
    const reversedMark = isReversed ? 'r' : '';
    const suitEmoji = this.faceCardEmoji || '?';
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

  getName(): string {
    // Future localization can be added here based on locale parameter
    return `${getMinorNumberName(this.number)} of ${this.suit}`;
  }
}
