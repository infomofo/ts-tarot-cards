import { TAROT_DATA } from './data-loader';
import {
  MajorArcanaCard, MinorArcanaCard, Spread, Suit, SuitProperties,
} from './types';
import { MajorArcanaCardImpl } from './cards/major-arcana';
import { MinorArcanaCardImpl } from './cards/minor-arcana';

// Process Major Arcana cards
const MAJOR_ARCANA_CARDS: Record<string, MajorArcanaCard> = {};
TAROT_DATA.majorArcana.forEach((cardData) => {
  // The key for major arcana is its number
  MAJOR_ARCANA_CARDS[cardData.number] = new MajorArcanaCardImpl(cardData);
});

// Process Minor Arcana cards
const MINOR_ARCANA_CARDS: Record<string, MinorArcanaCard> = {};
TAROT_DATA.minorArcana.forEach((rawCardData) => {
  const suitProperties = TAROT_DATA.suitProperties[rawCardData.suit];

  // Add the suit-specific emoji to the card data before creating the instance
  const cardDataForImpl = {
    ...rawCardData,
    faceCardEmoji: suitProperties?.emoji,
    element: suitProperties?.element,
  };

  const card = new MinorArcanaCardImpl(cardDataForImpl as MinorArcanaCard);
  // The key for minor arcana is its string id, e.g., "minor-ace-of-cups"
  MINOR_ARCANA_CARDS[card.id] = card;
});

// Export all processed data
export const ALL_MAJOR_ARCANA: Readonly<Record<string, MajorArcanaCard>> = MAJOR_ARCANA_CARDS;
export const ALL_MINOR_ARCANA: Readonly<Record<string, MinorArcanaCard>> = MINOR_ARCANA_CARDS;
export const ALL_SUIT_PROPS: Readonly<Record<Suit, SuitProperties>> = TAROT_DATA.suitProperties;
export const ALL_SPREADS: Readonly<Record<string, Spread>> = TAROT_DATA.spreads;

// Combine all cards into a single array, which is useful for creating the deck
export const ALL_CARDS: ReadonlyArray<MajorArcanaCard | MinorArcanaCard> = [
  ...Object.values(ALL_MAJOR_ARCANA),
  ...Object.values(ALL_MINOR_ARCANA),
];
