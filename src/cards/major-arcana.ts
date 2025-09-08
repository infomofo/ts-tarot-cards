import {
  MajorArcanaCard, Arcana, MajorArcana, toRomanNumeral, CardSymbol, SVGOptions,
} from '../types';
import { generateSvg } from './svg-generator';

// The RawCard interface should match the structure of the YAML data.
// It's defined here for clarity, but it's consistent with what data-loader expects.
interface RawMajorArcanaCardData {
  number: number;
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
  symbols: string[];
  significance: string;
  description: string;
  emoji?: string;
  bg_color?: string;
}

// Concrete implementation of MajorArcanaCard.
// The constructor now takes a single raw data object.
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

  public readonly backgroundColor?: string;

  constructor(data: RawMajorArcanaCardData) {
    this.number = data.number as MajorArcana;
    this.name = data.name;
    this.id = `major-${this.number.toString().padStart(2, '0')}-${this.name.toLowerCase().replace(/\s+/g, '-')}`;
    this.romanNumeral = toRomanNumeral(this.number);
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
    return `[M${this.number}-${this.name.replace(/\s/g, '')}${reversedMark}]`;
  }

  getName(): string {
    // Future localization can be added here
    return this.name;
  }
}
