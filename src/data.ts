import { loadAllData } from './data-loader';
import {
  Suit,
  Spread,
  TarotCard,
  SuitProperties,
  Element,
} from './types';
import { MajorArcanaCardImpl } from './cards/major-arcana';
import { MinorArcanaCardImpl } from './cards/minor-arcana';

// Load all raw data from the YAML files
const rawData = loadAllData();

// --- Process Suits ---
export const ALL_SUITS: Record<Suit, SuitProperties> = Object.fromEntries(
  rawData.suits.map((rawSuit) => [
    rawSuit.name,
    {
      element: rawSuit.element as Element,
      general_meaning: rawSuit.general_meaning,
      keywords: rawSuit.keywords,
      emoji: rawSuit.emoji,
    },
  ]),
) as Record<Suit, SuitProperties>;

// --- Process Cards ---
const ALL_CARDS_ARRAY: TarotCard[] = [];

// Process Major Arcana
rawData.majorArcana.forEach((rawCard) => {
  ALL_CARDS_ARRAY.push(new MajorArcanaCardImpl(rawCard));
});

// Process Minor Arcana
rawData.minorArcana.forEach((suitFile) => {
  // Infer suit from the first card's name (e.g., "Ace of Cups")
  const suitName = suitFile.cards[0].name.split(' of ')[1] as Suit;
  const suitProperties = ALL_SUITS[suitName];
  suitFile.cards.forEach((rawCard) => {
    ALL_CARDS_ARRAY.push(new MinorArcanaCardImpl(rawCard, suitName, suitProperties));
  });
});

export const ALL_CARDS: readonly TarotCard[] = ALL_CARDS_ARRAY;

// --- Process Spreads ---
// This will replace SPREADS from the old code
export const ALL_SPREADS: Record<string, Spread> = {};
Object.entries(rawData.spreads).forEach(([id, rawSpread]) => {
  ALL_SPREADS[id] = {
    name: rawSpread.name,
    description: rawSpread.description,
    allow_reversals: rawSpread.allow_reversals,
    preferred_strategy: rawSpread.preferred_strategy,
    layout: rawSpread.layout,
    positions: rawSpread.positions.map((p) => ({
      position: p.position,
      name: p.name,
      position_significance: p.position_significance,
      deal_order: p.deal_order,
    })),
  };
});

// --- Process Tags and Numerology ---
// These are new data structures
export const ALL_TAGS = rawData.tags;
export const ALL_NUMEROLOGY = rawData.numerology;

// Helper function to get a card by its ID.
// The ID will be generated inside the card constructors.
export function getCardById(id: string): TarotCard | undefined {
  return ALL_CARDS.find((card) => card.id === id);
}
