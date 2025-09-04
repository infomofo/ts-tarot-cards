import { CardSelectionStrategy, TarotCard } from '../types';
import { FanPickStrategy } from './fan-pick-strategy';

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

// Pre-defined card selection strategies
export const CARD_SELECTION_STRATEGIES: Record<string, CardSelectionStrategy> = {
  deal: new DealStrategy(),
  fanpick: new FanPickStrategy(),
};
