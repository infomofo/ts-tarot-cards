// Core enums and types for Tarot deck modeling

/**
 * Convert numeric value to roman numeral
 */
export function toRomanNumeral(num: number): string {
  // Special case for 0 (The Fool)
  if (num === 0) {
    return '0'; // The Fool is traditionally represented as 0 or sometimes without a number
  }

  const values = [
    { value: 1000, numeral: 'M' },
    { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' },
    { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ];

  let result = '';
  let remaining = num;

  for (const { value, numeral } of values) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
}

export enum Arcana {
  Major = 'Major',
  Minor = 'Minor'
}

export enum Suit {
  Cups = 'Cups',
  Pentacles = 'Pentacles',
  Swords = 'Swords',
  Wands = 'Wands'
}

export enum Element {
  Water = 'Water',
  Earth = 'Earth',
  Air = 'Air',
  Fire = 'Fire'
}

export enum MinorNumber {
  Ace = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Page = 11,
  Knight = 12,
  Queen = 13,
  King = 14
}

export enum MajorArcana {
  TheFool = 0,
  TheMagician = 1,
  TheHighPriestess = 2,
  TheEmpress = 3,
  TheEmperor = 4,
  TheHierophant = 5,
  TheLovers = 6,
  TheChariot = 7,
  Strength = 8,
  TheHermit = 9,
  WheelOfFortune = 10,
  Justice = 11,
  TheHangedMan = 12,
  Death = 13,
  Temperance = 14,
  TheDevil = 15,
  TheTower = 16,
  TheStar = 17,
  TheMoon = 18,
  TheSun = 19,
  Judgement = 20,
  TheWorld = 21
}

// Helper functions to get string names
export function getMinorNumberName(num: MinorNumber): string {
  const names: Record<MinorNumber, string> = {
    [MinorNumber.Ace]: 'Ace',
    [MinorNumber.Two]: 'Two',
    [MinorNumber.Three]: 'Three',
    [MinorNumber.Four]: 'Four',
    [MinorNumber.Five]: 'Five',
    [MinorNumber.Six]: 'Six',
    [MinorNumber.Seven]: 'Seven',
    [MinorNumber.Eight]: 'Eight',
    [MinorNumber.Nine]: 'Nine',
    [MinorNumber.Ten]: 'Ten',
    [MinorNumber.Page]: 'Page',
    [MinorNumber.Knight]: 'Knight',
    [MinorNumber.Queen]: 'Queen',
    [MinorNumber.King]: 'King'
  };
  return names[num];
}

export function getMajorArcanaName(num: MajorArcana): string {
  const names: Record<MajorArcana, string> = {
    [MajorArcana.TheFool]: 'The Fool',
    [MajorArcana.TheMagician]: 'The Magician',
    [MajorArcana.TheHighPriestess]: 'The High Priestess',
    [MajorArcana.TheEmpress]: 'The Empress',
    [MajorArcana.TheEmperor]: 'The Emperor',
    [MajorArcana.TheHierophant]: 'The Hierophant',
    [MajorArcana.TheLovers]: 'The Lovers',
    [MajorArcana.TheChariot]: 'The Chariot',
    [MajorArcana.Strength]: 'Strength',
    [MajorArcana.TheHermit]: 'The Hermit',
    [MajorArcana.WheelOfFortune]: 'Wheel of Fortune',
    [MajorArcana.Justice]: 'Justice',
    [MajorArcana.TheHangedMan]: 'The Hanged Man',
    [MajorArcana.Death]: 'Death',
    [MajorArcana.Temperance]: 'Temperance',
    [MajorArcana.TheDevil]: 'The Devil',
    [MajorArcana.TheTower]: 'The Tower',
    [MajorArcana.TheStar]: 'The Star',
    [MajorArcana.TheMoon]: 'The Moon',
    [MajorArcana.TheSun]: 'The Sun',
    [MajorArcana.Judgement]: 'Judgement',
    [MajorArcana.TheWorld]: 'The World'
  };
  return names[num];
}

export interface SuitProperties {
  element: Element;
  generalMeaning: string;
  keywords: string[];
}

// Base interface for all tarot cards
export interface BaseTarotCard {
  id: string;
  keywords: string[];
  uprightMeanings: string[]; // Changed from string to array for better structure
  reversedMeanings: string[]; // Changed from string to array for better structure
  visualDescription: string; // Description of the traditional Smith artwork
  significance: string; // Card's significance and place in the journey
  description: string; // General description
  arcana: Arcana; // Overridden by extensions
  numericValue: number; // Overridden by extensions - unified numeric system
  romanNumeral: string; // Derived from numericValue during initialization
  
  // Dynamic name generation for localization support
  getName(locale?: string): string;
}

// Major Arcana card
export interface MajorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Major;
  number: MajorArcana;
  numericValue: MajorArcana; // 0-21, overrides base
}

// Minor Arcana card
export interface MinorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Minor;
  suit: Suit;
  number: MinorNumber;
  numericValue: MinorNumber; // 1-14, overrides base
}

// Union type for any tarot card
export type TarotCard = MajorArcanaCard | MinorArcanaCard;

export interface CardPosition {
  card: TarotCard;
  position: number;
  isReversed: boolean;
}

export interface SpreadPosition {
  position: number;
  name: string;
  positionSignificance: string; // What this position represents in the spread context
  dealOrder: number; // Order in which this position is dealt
}

export interface Spread {
  name: string;
  positions: SpreadPosition[];
  description: string;
  visualRepresentation?: string; // Graphviz DOT notation or ASCII art
  allowReversals: boolean; // Whether this spread uses reversals
  preferredStrategy?: string; // Preferred card selection strategy name
}

export interface CardInterpretation {
  position: SpreadPosition;
  card: TarotCard;
  isReversed: boolean;
  meaning: string;
  additionalNotes?: string;
}

export interface SpreadReading {
  spread: Spread;
  cards: CardPosition[];
  cardInterpretations?: CardInterpretation[];
  overallInterpretation?: string; // Interpretation of the entire spread reading
  userContext?: string; // User-provided context like "what area of life to explore"
  allowReversals: boolean; // Whether this specific reading allows reversals
  timestamp: Date;
}

// Card Selection Strategy Interface
export interface CardSelectionStrategy {
  name: string;
  description: string;
  selectCards(deck: TarotCard[], count: number, allowReversals: boolean): CardPosition[];
}

// Shuffle Strategy Interface
export interface ShuffleStrategy {
  name: string;
  description: string;
  shuffle(cards: TarotCard[]): TarotCard[];
}