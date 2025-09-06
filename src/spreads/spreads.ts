import {
  Spread,
  SpreadPosition,
  SpreadReading,
  CardPosition,
  CardInterpretation,
  CardSelectionStrategy,
  SpreadLayoutPosition,
} from '../types';
import { TarotDeck } from '../deck/deck';
import { CARD_SELECTION_STRATEGIES } from '../deck/card-selection-strategies';
import { ALL_SPREADS } from '../data';

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
    spreadName: string,
    strategy?: string | CardSelectionStrategy,
    userContext?: string,
  ): SpreadReading {
    const spread = ALL_SPREADS[spreadName];
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
    } else if (spread.preferred_strategy) {
      cardSelectionStrategy = CARD_SELECTION_STRATEGIES[spread.preferred_strategy];
      if (!cardSelectionStrategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferred_strategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      cardSelectionStrategy = this.deck.getDefaultCardSelectionStrategy();
    }

    let cards = this.deck.selectCards(cardCount, { strategy: cardSelectionStrategy });

    // Apply reversal logic at the reader level
    cards = this.applyReversals(cards, spread.allow_reversals);

    return {
      spread,
      cards,
      allowReversals: spread.allow_reversals,
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
    } else if (spread.preferred_strategy) {
      cardSelectionStrategy = CARD_SELECTION_STRATEGIES[spread.preferred_strategy];
      if (!cardSelectionStrategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferred_strategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      cardSelectionStrategy = this.deck.getDefaultCardSelectionStrategy();
    }

    let cards = this.deck.selectCards(cardCount, { strategy: cardSelectionStrategy });

    // Apply reversal logic at the reader level
    cards = this.applyReversals(cards, spread.allow_reversals);

    return {
      spread,
      cards,
      allowReversals: spread.allow_reversals,
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
      const meaning = cardPosition.isReversed
        ? cardPosition.card.meanings.reversed.join(', ')
        : cardPosition.card.meanings.upright.join(', ');

      return {
        position,
        card: cardPosition.card,
        isReversed: cardPosition.isReversed,
        meaning,
        additionalNotes: `Card drawn for position "${position.name}". ${position.position_significance}`,
      };
    });
  }

  /**
   * Get a specific spread template
   */
  getSpread(spreadName: string): Spread {
    const spread = ALL_SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }
    return spread;
  }

  /**
   * Get all available spread names
   */
  getAvailableSpreads(): string[] {
    return Object.keys(ALL_SPREADS);
  }

  /**
   * Create a custom spread
   */
  createCustomSpread(
    name: string,
    description: string,
    positions: SpreadPosition[],
    layout: SpreadLayoutPosition[],
    allow_reversals: boolean = true,
    preferred_strategy?: string,
  ): Spread {
    return {
      name,
      description,
      positions,
      layout,
      allow_reversals,
      preferred_strategy,
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
