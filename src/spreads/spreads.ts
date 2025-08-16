import { Spread, SpreadPosition, SpreadReading, CardPosition } from '../types';
import { TarotDeck } from '../deck/deck';

// Pre-defined spread templates
export const SPREADS: Record<string, Spread> = {
  threeCard: {
    name: 'Three Card Spread',
    description: 'A simple three-card spread representing past, present, and future.',
    positions: [
      { position: 1, name: 'Past', meaning: 'Past influences and events that led to the current situation' },
      { position: 2, name: 'Present', meaning: 'Current situation and immediate influences' },
      { position: 3, name: 'Future', meaning: 'Potential outcome and future influences' }
    ]
  },
  crossSpread: {
    name: 'Cross Spread',
    description: 'A five-card cross spread for deeper insight into a situation.',
    positions: [
      { position: 1, name: 'Present Situation', meaning: 'The heart of the matter, current situation' },
      { position: 2, name: 'Challenge/Cross', meaning: 'What crosses you, obstacles or challenges' },
      { position: 3, name: 'Distant Past/Foundation', meaning: 'Foundation of the situation, distant past' },
      { position: 4, name: 'Recent Past', meaning: 'Recent events and influences' },
      { position: 5, name: 'Possible Outcome', meaning: 'Potential future outcome' }
    ]
  }
};

export class SpreadReader {
  private deck: TarotDeck;

  constructor(deck?: TarotDeck) {
    this.deck = deck || new TarotDeck();
  }

  /**
   * Perform a reading using a predefined spread
   */
  performReading(spreadName: keyof typeof SPREADS, useDealing: boolean = true): SpreadReading {
    const spread = SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }

    const cardCount = spread.positions.length;
    let cards: CardPosition[];

    if (useDealing) {
      cards = this.deck.deal(cardCount);
    } else {
      cards = this.deck.fanPick(cardCount);
    }

    return {
      spread,
      cards,
      timestamp: new Date()
    };
  }

  /**
   * Perform a reading using a custom spread
   */
  performCustomReading(spread: Spread, useDealing: boolean = true): SpreadReading {
    const cardCount = spread.positions.length;
    let cards: CardPosition[];

    if (useDealing) {
      cards = this.deck.deal(cardCount);
    } else {
      cards = this.deck.fanPick(cardCount);
    }

    return {
      spread,
      cards,
      timestamp: new Date()
    };
  }

  /**
   * Get a specific spread template
   */
  getSpread(spreadName: keyof typeof SPREADS): Spread {
    const spread = SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }
    return spread;
  }

  /**
   * Get all available spread names
   */
  getAvailableSpreads(): string[] {
    return Object.keys(SPREADS);
  }

  /**
   * Create a custom spread
   */
  createCustomSpread(name: string, description: string, positions: SpreadPosition[]): Spread {
    return {
      name,
      description,
      positions
    };
  }

  /**
   * Reset the deck
   */
  resetDeck(): void {
    this.deck.reset();
  }

  /**
   * Get deck information
   */
  getDeckInfo(): { remaining: number; total: number } {
    return {
      remaining: this.deck.getRemainingCount(),
      total: this.deck.getTotalCount()
    };
  }
}