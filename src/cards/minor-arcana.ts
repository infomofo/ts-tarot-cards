import {
  MinorArcanaCard,
  Arcana,
  Suit,
  MinorNumber,
  getMinorNumberName,
  toRomanNumeral,
  CardSymbol,
  SVGOptions,
  SuitProperties,
  Element,
} from '../types';
import { generateSvg } from './svg-generator';

// The RawCard interface should match the structure of the YAML data.
interface RawMinorArcanaCardData {
  name: string;
  number: number;
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
  symbols: string[];
  significance: string;
  description: string;
}

// Concrete implementation of MinorArcanaCard.
// The constructor now takes a raw data object and the suit properties.
export class MinorArcanaCardImpl implements MinorArcanaCard {
  public readonly id: string;

  public readonly arcana: Arcana.Minor = Arcana.Minor;

  public readonly suit: Suit;

  public readonly name: string;

  public readonly number: MinorNumber;

  public readonly romanNumeral: string;

  public readonly keywords: string[];

  public readonly meanings: { upright:string[]; reversed: string[]; };

  public readonly visual_description: { background: string; foreground: string; };

  public readonly visual_description_analysis: string[];

  public readonly symbols: CardSymbol[];

  public readonly significance: string;

  public readonly description: string;

  public readonly element: Element;

  public readonly emoji: string;

  constructor(data: RawMinorArcanaCardData, suit: Suit, suitProperties: SuitProperties) {
    this.name = data.name;
    this.suit = suit;
    this.number = data.number as MinorNumber;
    this.id = `minor-${getMinorNumberName(this.number).toLowerCase()}-of-${this.suit.toLowerCase()}`;
    this.romanNumeral = toRomanNumeral(this.number);
    this.keywords = data.keywords;
    this.meanings = data.meanings;
    this.visual_description = data.visual_description;
    this.visual_description_analysis = data.visual_description_analysis;
    this.symbols = data.symbols;
    this.significance = data.significance;
    this.description = data.description;
    this.element = suitProperties.element;
    this.emoji = suitProperties.emoji;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(isReversed = false): string {
    const reversedMark = isReversed ? 'r' : '';
    const suitEmoji = this.emoji;
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
    // Future localization can be added here
    return this.name;
  }
}
