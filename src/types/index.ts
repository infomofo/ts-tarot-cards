// Core enums and types for Tarot deck modeling

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
  name: string;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

// Major Arcana card
export interface MajorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Major;
  number: MajorArcana;
}

// Minor Arcana card
export interface MinorArcanaCard extends BaseTarotCard {
  arcana: Arcana.Minor;
  suit: Suit;
  number: MinorNumber;
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
  meaning: string;
  dealOrder: number; // Order in which this position is dealt
}

export interface Spread {
  name: string;
  positions: SpreadPosition[];
  description: string;
  visualRepresentation?: string; // Graphviz DOT notation or ASCII art
  allowReversals: boolean; // Whether this spread uses reversals
}

export interface Interpretation {
  position: SpreadPosition;
  card: TarotCard;
  isReversed: boolean;
  meaning: string;
  additionalNotes?: string;
}

export interface SpreadReading {
  spread: Spread;
  cards: CardPosition[];
  interpretations?: Interpretation[];
  timestamp: Date;
}