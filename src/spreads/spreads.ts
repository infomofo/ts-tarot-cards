import {
  Spread, SpreadPosition, SpreadReading, CardPosition, CardInterpretation, CardSelectionStrategy,
} from '../types';
import { TarotDeck } from '../deck/deck';
import { CARD_SELECTION_STRATEGIES } from '../deck/card-selection-strategies';

// Spread name constants to avoid magic strings
export const SPREAD_NAMES = {
  threeCard: 'threeCard',
  crossSpread: 'crossSpread',
  simplePastPresent: 'simplePastPresent',
  singleCard: 'singleCard',
  celticCross: 'celticCross',
} as const;

// Pre-defined spread templates
export const SPREADS: Record<string, Spread> = {
  singleCard: {
    name: 'Single Card Pull',
    description: 'A single card for quick guidance or a daily reading.',
    allowReversals: true,
    preferredStrategy: 'deal',
    layout: [
      { position: 1, x: 0, y: 0 },
    ],
    positions: [
      {
        position: 1, name: 'Guidance', positionSignificance: 'A single point of focus or advice', dealOrder: 1,
      },
    ],
  },
  threeCard: {
    name: 'Three Card Spread',
    description: 'A simple three-card spread representing past, present, and future.',
    allowReversals: true,
    preferredStrategy: 'deal',
    layout: [
      { position: 1, x: 0, y: 0 },
      { position: 2, x: 1, y: 0 },
      { position: 3, x: 2, y: 0 },
    ],
    positions: [
      {
        position: 1, name: 'Past', positionSignificance: 'Past influences and events that led to the current situation', dealOrder: 1,
      },
      {
        position: 2, name: 'Present', positionSignificance: 'Current situation and immediate influences', dealOrder: 2,
      },
      {
        position: 3, name: 'Future', positionSignificance: 'Potential outcome and future influences', dealOrder: 3,
      },
    ],
  },
  crossSpread: {
    name: 'Cross Spread',
    description: 'A five-card cross spread for deeper insight into a situation.',
    allowReversals: true,
    preferredStrategy: 'fanpick',
    layout: [
      { position: 1, x: 1, y: 1 },
      { position: 2, x: 2, y: 1 },
      { position: 3, x: 1, y: 2 },
      { position: 4, x: 0, y: 1 },
      { position: 5, x: 1, y: 0 },
    ],
    positions: [
      {
        position: 1, name: 'Present Situation', positionSignificance: 'The heart of the matter, current situation', dealOrder: 1,
      },
      {
        position: 2, name: 'Challenge/Cross', positionSignificance: 'What crosses you, obstacles or challenges', dealOrder: 2,
      },
      {
        position: 3, name: 'Distant Past/Foundation', positionSignificance: 'Foundation of the situation, distant past', dealOrder: 3,
      },
      {
        position: 4, name: 'Recent Past', positionSignificance: 'Recent events and influences', dealOrder: 4,
      },
      {
        position: 5, name: 'Possible Outcome', positionSignificance: 'Potential future outcome', dealOrder: 5,
      },
    ],
  },
  simplePastPresent: {
    name: 'Simple Past-Present',
    description: 'A two-card spread without reversals for straightforward guidance.',
    allowReversals: false,
    preferredStrategy: 'deal',
    layout: [
      { position: 1, x: 0, y: 0 },
      { position: 2, x: 1, y: 0 },
    ],
    positions: [
      {
        position: 1, name: 'Past', positionSignificance: 'What has led to this moment', dealOrder: 1,
      },
      {
        position: 2, name: 'Present', positionSignificance: 'What you need to know right now', dealOrder: 2,
      },
    ],
  },
  celticCross: {
    name: 'Celtic Cross',
    description: 'A comprehensive 10-card spread for in-depth analysis of a situation.',
    allowReversals: true,
    preferredStrategy: 'deal',
    layout: [
      { position: 1, x: 1, y: 1 },
      {
        position: 2, x: 1, y: 1, rotation: 90,
      },
      { position: 3, x: 1, y: 2 },
      { position: 4, x: 0, y: 1 },
      { position: 5, x: 1, y: 0 },
      { position: 6, x: 2, y: 1 },
      { position: 7, x: 3, y: 3 },
      { position: 8, x: 3, y: 2 },
      { position: 9, x: 3, y: 1 },
      { position: 10, x: 3, y: 0 },
    ],
    positions: [
      {
        position: 1, name: 'The Present', positionSignificance: 'The current situation or the heart of the matter.', dealOrder: 1,
      },
      {
        position: 2, name: 'The Challenge', positionSignificance: 'The immediate challenge or obstacle crossing you.', dealOrder: 2,
      },
      {
        position: 3, name: 'The Foundation', positionSignificance: 'The basis of the situation, events from the distant past.', dealOrder: 3,
      },
      {
        position: 4, name: 'The Past', positionSignificance: 'Recent events that have led to the present situation.', dealOrder: 4,
      },
      {
        position: 5, name: 'Above', positionSignificance: 'Conscious influences, goals, and what you are aiming for.', dealOrder: 5,
      },
      {
        position: 6, name: 'The Future', positionSignificance: 'What is likely to happen in the near future.', dealOrder: 6,
      },
      {
        position: 7, name: 'Advice', positionSignificance: 'Your role in the situation and the advice the cards offer.', dealOrder: 7,
      },
      {
        position: 8, name: 'External Influences', positionSignificance: 'How others see you and the situation; external forces at play.', dealOrder: 8,
      },
      {
        position: 9, name: 'Hopes and Fears', positionSignificance: 'Your hopes and fears regarding the situation.', dealOrder: 9,
      },
      {
        position: 10, name: 'The Outcome', positionSignificance: 'The final resolution or outcome of the situation.', dealOrder: 10,
      },
    ],
  },
};

export class SpreadReader {
  private deck: TarotDeck;

  constructor(deck?: TarotDeck) {
    this.deck = deck || new TarotDeck();
  }

  /**
   * Apply reversal logic to cards based on spread settings
   */
  private applyReversals(cards: CardPosition[], allowReversals: boolean): CardPosition[] {
    if (!allowReversals) {
      return cards.map((cp) => ({ ...cp, isReversed: false }));
    }

    return cards.map((cp) => ({
      ...cp,
      isReversed: this.getBiometricRandomIndex(2) === 1, // 50% chance of reversal
    }));
  }

  /**
   * Biometric randomness stub - could integrate with hardware or biometric data
   */
  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }

  /**
   * Perform a reading using a predefined spread
   */
  performReading(
    spreadName: keyof typeof SPREADS,
    strategy?: string | CardSelectionStrategy,
    userContext?: string,
  ): SpreadReading {
    const spread = SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }

    const cardCount = spread.positions.length;

    // Determine strategy to use
    let cardSelectionStrategy: CardSelectionStrategy;

    if (strategy) {
      if (typeof strategy === 'string') {
        cardSelectionStrategy = CARD_SELECTION_STRATEGIES[strategy];
        if (!cardSelectionStrategy) {
          throw new Error(`Unknown strategy: ${strategy}`);
        }
      } else {
        cardSelectionStrategy = strategy;
      }
    } else if (spread.preferredStrategy) {
      cardSelectionStrategy = CARD_SELECTION_STRATEGIES[spread.preferredStrategy];
      if (!cardSelectionStrategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferredStrategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      cardSelectionStrategy = this.deck.getDefaultCardSelectionStrategy();
    }

    let cards = this.deck.selectCards(cardCount, { strategy: cardSelectionStrategy });

    // Apply reversal logic at the reader level
    cards = this.applyReversals(cards, spread.allowReversals);

    return {
      spread,
      cards,
      allowReversals: spread.allowReversals,
      userContext,
      timestamp: new Date(),
    };
  }

  /**
   * Perform a reading using a custom spread
   */
  performCustomReading(
    spread: Spread,
    strategy?: string | CardSelectionStrategy,
    userContext?: string,
  ): SpreadReading {
    const cardCount = spread.positions.length;

    // Determine strategy to use
    let cardSelectionStrategy: CardSelectionStrategy;

    if (strategy) {
      if (typeof strategy === 'string') {
        cardSelectionStrategy = CARD_SELECTION_STRATEGIES[strategy];
        if (!cardSelectionStrategy) {
          throw new Error(`Unknown strategy: ${strategy}`);
        }
      } else {
        cardSelectionStrategy = strategy;
      }
    } else if (spread.preferredStrategy) {
      cardSelectionStrategy = CARD_SELECTION_STRATEGIES[spread.preferredStrategy];
      if (!cardSelectionStrategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferredStrategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      cardSelectionStrategy = this.deck.getDefaultCardSelectionStrategy();
    }

    let cards = this.deck.selectCards(cardCount, { strategy: cardSelectionStrategy });

    // Apply reversal logic at the reader level
    cards = this.applyReversals(cards, spread.allowReversals);

    return {
      spread,
      cards,
      allowReversals: spread.allowReversals,
      userContext,
      timestamp: new Date(),
    };
  }

  /**
   * Generate interpretations for a reading
   */
  generateInterpretations(reading: SpreadReading): CardInterpretation[] {
    return reading.cards.map((cardPosition, index) => {
      const position = reading.spread.positions[index];
      return {
        position,
        card: cardPosition.card,
        isReversed: cardPosition.isReversed,
        meaning: cardPosition.isReversed
          ? cardPosition.card.reversedMeanings.join(', ')
          : cardPosition.card.uprightMeanings.join(', '),
        additionalNotes: `Card drawn for position "${position.name}". ${position.positionSignificance}`,
      };
    });
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
  createCustomSpread(
    name: string,
    description: string,
    positions: SpreadPosition[],
    layout: Spread['layout'],
    allowReversals: boolean = true,
    preferredStrategy?: string,
  ): Spread {
    return {
      name,
      description,
      positions,
      layout,
      allowReversals,
      preferredStrategy,
    };
  }

  /**
   * Get available card selection strategies
   */
  getAvailableStrategies(): Record<string, CardSelectionStrategy> {
    return CARD_SELECTION_STRATEGIES;
  }

  /**
   * Set the deck's default card selection strategy
   */
  setDefaultCardSelectionStrategy(strategy: string | CardSelectionStrategy): void {
    if (typeof strategy === 'string') {
      const strategyObj = CARD_SELECTION_STRATEGIES[strategy];
      if (!strategyObj) {
        throw new Error(`Unknown strategy: ${strategy}`);
      }
      this.deck.setDefaultCardSelectionStrategy(strategyObj);
    } else {
      this.deck.setDefaultCardSelectionStrategy(strategy);
    }
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
      total: this.deck.getTotalCount(),
    };
  }
}
