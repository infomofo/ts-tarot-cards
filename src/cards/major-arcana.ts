import {
  MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName, CardSymbol, SVGOptions,
} from '../types';
import { generateSvg } from './svg-generator';

export class MajorArcanaCardImpl implements MajorArcanaCard {
  public readonly id: string;

  public readonly arcana: Arcana.Major = Arcana.Major;

  public readonly number: MajorArcana;

  public readonly name: string;

  public readonly romanNumeral: string;

  public readonly keywords: string[];

  public readonly meanings: { upright: string[]; reversed: string[]; };

  public readonly visual_description: { background: string; foreground: string; };

  public readonly visual_description_analysis: string[];

  public readonly symbols: CardSymbol[];

  public readonly significance: string;

  public readonly description: string;

  public readonly emoji?: string;

  public readonly bg_color?: string;

  constructor(cardData: Omit<MajorArcanaCard, 'getName' | 'getSvg' | 'getTextRepresentation'>) {
    this.id = cardData.id;
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
    this.emoji = cardData.emoji;
    this.bg_color = cardData.bg_color;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(isReversed = false): string {
    const reversedMark = isReversed ? 'r' : '';
    if (this.emoji) {
      return `[M${this.number}${this.emoji}${reversedMark}]`;
    }
    return `[M${this.number}-${getMajorArcanaName(this.number).replace(/\s/g, '')}${reversedMark}]`;
  }

  getName(): string {
    // Future localization can be added here based on locale parameter
    return this.name;
  }
}
