import { CardArchetype, MajorNumber, MinorNumber } from '../card-archetype';
import { Arcana } from '../arcana';
import { Suit } from '../suit';

export const RWSCardArchetype = {
  // Major Arcana (0-21)
  FOOL: { id: "The Fool", arcana: Arcana.Major, number: 0 } as CardArchetype,
  MAGICIAN: { id: "The Magician", arcana: Arcana.Major, number: 1 } as CardArchetype,
  HIGH_PRIESTESS: { id: "The High Priestess", arcana: Arcana.Major, number: 2 } as CardArchetype,
  EMPRESS: { id: "The Empress", arcana: Arcana.Major, number: 3 } as CardArchetype,
  EMPEROR: { id: "The Emperor", arcana: Arcana.Major, number: 4 } as CardArchetype,
  HIEROPHANT: { id: "The Hierophant", arcana: Arcana.Major, number: 5 } as CardArchetype,
  LOVERS: { id: "The Lovers", arcana: Arcana.Major, number: 6 } as CardArchetype,
  CHARIOT: { id: "The Chariot", arcana: Arcana.Major, number: 7 } as CardArchetype,
  STRENGTH: { id: "Strength", arcana: Arcana.Major, number: 8 } as CardArchetype,
  HERMIT: { id: "The Hermit", arcana: Arcana.Major, number: 9 } as CardArchetype,
  WHEEL_OF_FORTUNE: { id: "Wheel of Fortune", arcana: Arcana.Major, number: 10 } as CardArchetype,
  JUSTICE: { id: "Justice", arcana: Arcana.Major, number: 11 } as CardArchetype,
  HANGED_MAN: { id: "The Hanged Man", arcana: Arcana.Major, number: 12 } as CardArchetype,
  DEATH: { id: "Death", arcana: Arcana.Major, number: 13 } as CardArchetype,
  TEMPERANCE: { id: "Temperance", arcana: Arcana.Major, number: 14 } as CardArchetype,
  DEVIL: { id: "The Devil", arcana: Arcana.Major, number: 15 } as CardArchetype,
  TOWER: { id: "The Tower", arcana: Arcana.Major, number: 16 } as CardArchetype,
  STAR: { id: "The Star", arcana: Arcana.Major, number: 17 } as CardArchetype,
  MOON: { id: "The Moon", arcana: Arcana.Major, number: 18 } as CardArchetype,
  SUN: { id: "The Sun", arcana: Arcana.Major, number: 19 } as CardArchetype,
  JUDGEMENT: { id: "Judgement", arcana: Arcana.Major, number: 20 } as CardArchetype,
  WORLD: { id: "The World", arcana: Arcana.Major, number: 21 } as CardArchetype,

  // Minor Arcana - Wands
  ACE_OF_WANDS: { id: "Ace of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 1 } as CardArchetype,
  TWO_OF_WANDS: { id: "Two of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 2 } as CardArchetype,
  THREE_OF_WANDS: { id: "Three of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 3 } as CardArchetype,
  FOUR_OF_WANDS: { id: "Four of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 4 } as CardArchetype,
  FIVE_OF_WANDS: { id: "Five of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 5 } as CardArchetype,
  SIX_OF_WANDS: { id: "Six of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 6 } as CardArchetype,
  SEVEN_OF_WANDS: { id: "Seven of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 7 } as CardArchetype,
  EIGHT_OF_WANDS: { id: "Eight of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 8 } as CardArchetype,
  NINE_OF_WANDS: { id: "Nine of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 9 } as CardArchetype,
  TEN_OF_WANDS: { id: "Ten of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 10 } as CardArchetype,
  PAGE_OF_WANDS: { id: "Page of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 11 } as CardArchetype,
  KNIGHT_OF_WANDS: { id: "Knight of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 12 } as CardArchetype,
  QUEEN_OF_WANDS: { id: "Queen of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 13 } as CardArchetype,
  KING_OF_WANDS: { id: "King of Wands", arcana: Arcana.Minor, suit: Suit.Wands, number: 14 } as CardArchetype,

  // Minor Arcana - Cups
  ACE_OF_CUPS: { id: "Ace of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 1 } as CardArchetype,
  TWO_OF_CUPS: { id: "Two of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 2 } as CardArchetype,
  THREE_OF_CUPS: { id: "Three of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 3 } as CardArchetype,
  FOUR_OF_CUPS: { id: "Four of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 4 } as CardArchetype,
  FIVE_OF_CUPS: { id: "Five of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 5 } as CardArchetype,
  SIX_OF_CUPS: { id: "Six of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 6 } as CardArchetype,
  SEVEN_OF_CUPS: { id: "Seven of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 7 } as CardArchetype,
  EIGHT_OF_CUPS: { id: "Eight of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 8 } as CardArchetype,
  NINE_OF_CUPS: { id: "Nine of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 9 } as CardArchetype,
  TEN_OF_CUPS: { id: "Ten of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 10 } as CardArchetype,
  PAGE_OF_CUPS: { id: "Page of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 11 } as CardArchetype,
  KNIGHT_OF_CUPS: { id: "Knight of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 12 } as CardArchetype,
  QUEEN_OF_CUPS: { id: "Queen of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 13 } as CardArchetype,
  KING_OF_CUPS: { id: "King of Cups", arcana: Arcana.Minor, suit: Suit.Cups, number: 14 } as CardArchetype,

  // Minor Arcana - Swords
  ACE_OF_SWORDS: { id: "Ace of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 1 } as CardArchetype,
  TWO_OF_SWORDS: { id: "Two of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 2 } as CardArchetype,
  THREE_OF_SWORDS: { id: "Three of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 3 } as CardArchetype,
  FOUR_OF_SWORDS: { id: "Four of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 4 } as CardArchetype,
  FIVE_OF_SWORDS: { id: "Five of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 5 } as CardArchetype,
  SIX_OF_SWORDS: { id: "Six of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 6 } as CardArchetype,
  SEVEN_OF_SWORDS: { id: "Seven of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 7 } as CardArchetype,
  EIGHT_OF_SWORDS: { id: "Eight of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 8 } as CardArchetype,
  NINE_OF_SWORDS: { id: "Nine of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 9 } as CardArchetype,
  TEN_OF_SWORDS: { id: "Ten of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 10 } as CardArchetype,
  PAGE_OF_SWORDS: { id: "Page of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 11 } as CardArchetype,
  KNIGHT_OF_SWORDS: { id: "Knight of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 12 } as CardArchetype,
  QUEEN_OF_SWORDS: { id: "Queen of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 13 } as CardArchetype,
  KING_OF_SWORDS: { id: "King of Swords", arcana: Arcana.Minor, suit: Suit.Swords, number: 14 } as CardArchetype,

  // Minor Arcana - Pentacles
  ACE_OF_PENTACLES: { id: "Ace of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 1 } as CardArchetype,
  TWO_OF_PENTACLES: { id: "Two of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 2 } as CardArchetype,
  THREE_OF_PENTACLES: { id: "Three of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 3 } as CardArchetype,
  FOUR_OF_PENTACLES: { id: "Four of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 4 } as CardArchetype,
  FIVE_OF_PENTACLES: { id: "Five of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 5 } as CardArchetype,
  SIX_OF_PENTACLES: { id: "Six of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 6 } as CardArchetype,
  SEVEN_OF_PENTACLES: { id: "Seven of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 7 } as CardArchetype,
  EIGHT_OF_PENTACLES: { id: "Eight of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 8 } as CardArchetype,
  NINE_OF_PENTACLES: { id: "Nine of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 9 } as CardArchetype,
  TEN_OF_PENTACLES: { id: "Ten of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 10 } as CardArchetype,
  PAGE_OF_PENTACLES: { id: "Page of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 11 } as CardArchetype,
  KNIGHT_OF_PENTACLES: { id: "Knight of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 12 } as CardArchetype,
  QUEEN_OF_PENTACLES: { id: "Queen of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 13 } as CardArchetype,
  KING_OF_PENTACLES: { id: "King of Pentacles", arcana: Arcana.Minor, suit: Suit.Pentacles, number: 14 } as CardArchetype,
} as const;

export type RWSCardKey = keyof typeof RWSCardArchetype;
export type RWSCardArchetypeType = typeof RWSCardArchetype[RWSCardKey];

export const RWS_ARCHETYPES: CardArchetype[] = Object.values(RWSCardArchetype);