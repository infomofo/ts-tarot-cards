import { CardSelectionStrategy, TarotCard, CardPosition } from '../types';

/**
 * Deal strategy - takes cards sequentially from the top of the deck
 */
export class DealStrategy implements CardSelectionStrategy {
  name = 'deal';
  description = 'Deals cards sequentially from the top of the shuffled deck';

  selectCards(deck: TarotCard[], count: number, allowReversals: boolean): CardPosition[] {
    if (count > deck.length) {
      throw new Error(`Cannot deal ${count} cards, only ${deck.length} available`);
    }

    const selectedCards: CardPosition[] = [];
    
    for (let i = 0; i < count; i++) {
      const card = deck[i];
      const isReversed = allowReversals ? this.getBiometricRandomIndex(2) === 1 : false; // 50% chance of reversal if allowed
      
      selectedCards.push({
        card,
        position: i + 1,
        isReversed
      });
    }

    return selectedCards;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

/**
 * Fan pick strategy - allows selection of cards from random positions as if picked from a fan
 */
export class FanPickStrategy implements CardSelectionStrategy {
  name = 'fanpick';
  description = 'Allows selection of cards from random positions as if picked from a fanned deck';

  selectCards(deck: TarotCard[], count: number, allowReversals: boolean): CardPosition[] {
    if (count > deck.length) {
      throw new Error(`Cannot pick ${count} cards, only ${deck.length} available`);
    }

    const selectedCards: CardPosition[] = [];
    const availableIndices = Array.from({ length: deck.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      // Pick a random position from the fan
      const randomIndexPosition = this.getBiometricRandomIndex(availableIndices.length);
      const cardIndex = availableIndices.splice(randomIndexPosition, 1)[0];
      
      const card = deck[cardIndex];
      const isReversed = allowReversals ? this.getBiometricRandomIndex(2) === 1 : false; // 50% chance of reversal if allowed
      
      selectedCards.push({
        card,
        position: i + 1,
        isReversed
      });
    }

    return selectedCards;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

// Pre-defined strategies
export const CARD_SELECTION_STRATEGIES: Record<string, CardSelectionStrategy> = {
  deal: new DealStrategy(),
  fanpick: new FanPickStrategy()
};