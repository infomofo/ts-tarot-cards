import { CardSelectionStrategy, TarotCard } from '../types';

/**
 * Deal strategy - takes cards sequentially from the top of the deck
 */
export class DealStrategy implements CardSelectionStrategy {
  name = 'deal';
  description = 'Deals cards sequentially from the top of the shuffled deck';

  /**
   * Given an ordered deck of TarotCard, select cards sequentially from the top
   * @param deck - The ordered deck of tarot cards to select from
   * @param count - The number of cards to select
   * @returns An array of selected tarot cards
   */
  selectCards(deck: TarotCard[], count: number): TarotCard[] {
    if (count > deck.length) {
      throw new Error(`Cannot deal ${count} cards, only ${deck.length} available`);
    }

    return deck.slice(0, count);
  }
}

/**
 * Fan pick strategy - allows selection of cards from random positions as if picked from a fan
 */
export class FanPickStrategy implements CardSelectionStrategy {
  name = 'fanpick';
  description = 'Allows selection of cards from random positions as if picked from a fanned deck';

  /**
   * Given an ordered deck of TarotCard, select cards from random positions as if picked from a fanned deck
   * @param deck - The ordered deck of tarot cards to select from
   * @param count - The number of cards to select
   * @returns An array of selected tarot cards
   */
  selectCards(deck: TarotCard[], count: number): TarotCard[] {
    if (count > deck.length) {
      throw new Error(`Cannot pick ${count} cards, only ${deck.length} available`);
    }

    const selectedCards: TarotCard[] = [];
    const availableIndices = Array.from({ length: deck.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      // Pick a random position from the fan
      const randomIndexPosition = this.getBiometricRandomIndex(availableIndices.length);
      const cardIndex = availableIndices.splice(randomIndexPosition, 1)[0];
      
      const card = deck[cardIndex];
      selectedCards.push(card);
    }

    return selectedCards;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

// Pre-defined card selection strategies
export const CARD_SELECTION_STRATEGIES: Record<string, CardSelectionStrategy> = {
  deal: new DealStrategy(),
  fanpick: new FanPickStrategy()
};
