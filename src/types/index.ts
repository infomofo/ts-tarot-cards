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
  Ace = 'Ace',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Page = 'Page',
  Knight = 'Knight',
  Queen = 'Queen',
  King = 'King'
}

export enum MajorArcana {
  TheFool = 'The Fool',
  TheMagician = 'The Magician',
  TheHighPriestess = 'The High Priestess',
  TheEmpress = 'The Empress',
  TheEmperor = 'The Emperor',
  TheHierophant = 'The Hierophant',
  TheLovers = 'The Lovers',
  TheChariot = 'The Chariot',
  Strength = 'Strength',
  TheHermit = 'The Hermit',
  WheelOfFortune = 'Wheel of Fortune',
  Justice = 'Justice',
  TheHangedMan = 'The Hanged Man',
  Death = 'Death',
  Temperance = 'Temperance',
  TheDevil = 'The Devil',
  TheTower = 'The Tower',
  TheStar = 'The Star',
  TheMoon = 'The Moon',
  TheSun = 'The Sun',
  Judgement = 'Judgement',
  TheWorld = 'The World'
}

export interface SuitProperties {
  element: Element;
  generalMeaning: string;
  keywords: string[];
}

export interface TarotCard {
  id: string;
  name: string;
  arcana: Arcana;
  suit?: Suit;
  number?: MinorNumber;
  majorArcana?: MajorArcana;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  description: string;
}

export interface CardPosition {
  card: TarotCard;
  position: number;
  isReversed: boolean;
}

export interface Spread {
  name: string;
  positions: SpreadPosition[];
  description: string;
}

export interface SpreadPosition {
  position: number;
  name: string;
  meaning: string;
}

export interface SpreadReading {
  spread: Spread;
  cards: CardPosition[];
  timestamp: Date;
}