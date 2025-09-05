import {
  TarotCard, Arcana, MajorArcana, MinorArcanaCard, Suit,
} from '../types';

/**
 * Maps a tarot card to its lottery number according to the specified methodology:
 * - Skip The Fool (0)
 * - Major Arcana 1-21 (The Magician to The World)
 * - Minor Arcana by suit order: Wands (22-35), Cups (36-49), Swords (50-63), Pentacles (64-77)
 */
export function getCardLotteryNumber(card: TarotCard): number | null {
  if (card.arcana === Arcana.Major) {
    // Skip The Fool (0), return null for it
    if (card.number === MajorArcana.TheFool) {
      return null;
    }
    // Major Arcana 1-21 map directly to their numbers
    return card.number as number;
  }

  if (card.arcana === Arcana.Minor) {
    const minorCard = card as MinorArcanaCard;

    // Base number for each suit (starting positions)
    const suitBase = {
      [Suit.Wands]: 22, // 22-35
      [Suit.Cups]: 36, // 36-49
      [Suit.Swords]: 50, // 50-63
      [Suit.Pentacles]: 64, // 64-77
    };

    const base = suitBase[minorCard.suit];
    // Minor arcana numbers are 1-14 (Ace=1 through King=14)
    // Subtract 1 to make it 0-indexed for addition to base
    return base + (minorCard.number as number) - 1;
  }

  return null;
}

/**
 * Gets all cards that map to valid lottery numbers for the given range
 */
export function getValidCardsForRange(
  cards: TarotCard[],
  minNumber: number,
  maxNumber: number,
): TarotCard[] {
  return cards.filter((card) => {
    const lotteryNumber = getCardLotteryNumber(card);
    return lotteryNumber !== null && lotteryNumber >= minNumber && lotteryNumber <= maxNumber;
  });
}

/**
 * Gets the card name for display purposes
 */
export function getCardDisplayName(card: TarotCard): string {
  return card.getName();
}
