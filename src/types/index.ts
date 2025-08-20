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

// Symbol type for hierarchical tagging of visual elements
export type CardSymbol = string; // Freeform strings like "bird", "fruit", "sun", "mountain", etc.

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

export enum MinorArcana {
  // Cups
  AceOfCups = 'ace-of-cups',
  TwoOfCups = 'two-of-cups',
  ThreeOfCups = 'three-of-cups',
  FourOfCups = 'four-of-cups',
  FiveOfCups = 'five-of-cups',
  SixOfCups = 'six-of-cups',
  SevenOfCups = 'seven-of-cups',
  EightOfCups = 'eight-of-cups',
  NineOfCups = 'nine-of-cups',
  TenOfCups = 'ten-of-cups',
  PageOfCups = 'page-of-cups',
  KnightOfCups = 'knight-of-cups',
  QueenOfCups = 'queen-of-cups',
  KingOfCups = 'king-of-cups',
  
  // Pentacles
  AceOfPentacles = 'ace-of-pentacles',
  TwoOfPentacles = 'two-of-pentacles',
  ThreeOfPentacles = 'three-of-pentacles',
  FourOfPentacles = 'four-of-pentacles',
  FiveOfPentacles = 'five-of-pentacles',
  SixOfPentacles = 'six-of-pentacles',
  SevenOfPentacles = 'seven-of-pentacles',
  EightOfPentacles = 'eight-of-pentacles',
  NineOfPentacles = 'nine-of-pentacles',
  TenOfPentacles = 'ten-of-pentacles',
  PageOfPentacles = 'page-of-pentacles',
  KnightOfPentacles = 'knight-of-pentacles',
  QueenOfPentacles = 'queen-of-pentacles',
  KingOfPentacles = 'king-of-pentacles',
  
  // Swords
  AceOfSwords = 'ace-of-swords',
  TwoOfSwords = 'two-of-swords',
  ThreeOfSwords = 'three-of-swords',
  FourOfSwords = 'four-of-swords',
  FiveOfSwords = 'five-of-swords',
  SixOfSwords = 'six-of-swords',
  SevenOfSwords = 'seven-of-swords',
  EightOfSwords = 'eight-of-swords',
  NineOfSwords = 'nine-of-swords',
  TenOfSwords = 'ten-of-swords',
  PageOfSwords = 'page-of-swords',
  KnightOfSwords = 'knight-of-swords',
  QueenOfSwords = 'queen-of-swords',
  KingOfSwords = 'king-of-swords',
  
  // Wands
  AceOfWands = 'ace-of-wands',
  TwoOfWands = 'two-of-wands',
  ThreeOfWands = 'three-of-wands',
  FourOfWands = 'four-of-wands',
  FiveOfWands = 'five-of-wands',
  SixOfWands = 'six-of-wands',
  SevenOfWands = 'seven-of-wands',
  EightOfWands = 'eight-of-wands',
  NineOfWands = 'nine-of-wands',
  TenOfWands = 'ten-of-wands',
  PageOfWands = 'page-of-wands',
  KnightOfWands = 'knight-of-wands',
  QueenOfWands = 'queen-of-wands',
  KingOfWands = 'king-of-wands'
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
  emoji: string;
}

// SVG generation options
export interface SVGOptions {
  art_override_url?: string;
  hide_number?: boolean;
  hide_emoji?: boolean;
  hide_title?: boolean;
}

// Base interface for all tarot cards
export interface BaseTarotCard {
  id: string;
  keywords: string[];
  uprightMeanings: string[]; // Changed from string to array for better structure
  reversedMeanings: string[]; // Changed from string to array for better structure
  visualDescription: string; // Description of the traditional Smith artwork
  visualDescriptionAnalysis: string; // Analysis of the visual description
  symbols: CardSymbol[]; // Hierarchical symbol tags for visual elements
  significance: string; // Card's significance and place in the journey
  description: string; // General description
  arcana: Arcana; // Overridden by extensions
  numericValue: number; // Overridden by extensions - unified numeric system
  romanNumeral: string; // Derived from numericValue during initialization
  
  // Dynamic name generation for localization support
  getName(locale?: string): string;

  // SVG representation generation
  getSvg(options?: SVGOptions): string;
  getTextRepresentation(): string;
}

// Major Arcana card
export interface MajorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Major;
  number: MajorArcana;
  numericValue: MajorArcana; // 0-21, overrides base
  emoji?: string;
  backgroundColor?: string;
}

// Minor Arcana card
export interface MinorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Minor;
  suit: Suit;
  number: MinorNumber;
  numericValue: MinorNumber; // 1-14, overrides base
  faceCardEmoji?: string;
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
  visualRepresentationContext?: string; // Explanatory text for the visual representation
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

export interface CardSelectionOptions {
  strategy?: CardSelectionStrategy;
}

/**
 * Interface for card selection strategies that determine how cards are chosen from a deck.
 * Developers can implement this interface to create custom card selection methods.
 */
export interface CardSelectionStrategy {
  /** Unique identifier for the strategy */
  name: string;
  /** Human-readable description of how the strategy works */
  description: string;
  /**
   * Given an ordered deck of TarotCard, select the specified number of cards according to the strategy's logic.
   * @param deck - The ordered deck of tarot cards to select from
   * @param count - The number of cards to select
   * @returns An array of selected tarot cards
   */
  selectCards(deck: TarotCard[], count: number): TarotCard[];
}

/**
 * Interface for shuffle strategies that determine how a deck of cards is randomized.
 * Developers can implement this interface to create custom shuffling algorithms.
 */
export interface ShuffleStrategy {
  /** Unique identifier for the strategy */
  name: string;
  /** Human-readable description of how the strategy works */
  description: string;
  /**
   * Randomize the order of cards in the deck according to the strategy's algorithm.
   * @param cards - The deck of tarot cards to shuffle
   * @returns A new array with the cards in randomized order
   */
  shuffle(cards: TarotCard[]): TarotCard[];
}
