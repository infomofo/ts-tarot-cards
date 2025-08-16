import { Spread, SpreadPosition, SpreadReading, CardPosition, Interpretation, CardSelectionStrategy } from '../types';
import { TarotDeck } from '../deck/deck';
import { CARD_SELECTION_STRATEGIES } from '../deck/strategies';

// Pre-defined spread templates
export const SPREADS: Record<string, Spread> = {
  threeCard: {
    name: 'Three Card Spread',
    description: 'A simple three-card spread representing past, present, and future.',
    allowReversals: true,
    preferredStrategy: 'deal', // Traditional sequential dealing
    visualRepresentation: `
digraph ThreeCardSpread {
  rankdir=LR;
  node [shape=rectangle, style=filled, fillcolor=lightblue];
  "1. Past" -> "2. Present" -> "3. Future";
}`,
    positions: [
      { position: 1, name: 'Past', meaning: 'Past influences and events that led to the current situation', dealOrder: 1 },
      { position: 2, name: 'Present', meaning: 'Current situation and immediate influences', dealOrder: 2 },
      { position: 3, name: 'Future', meaning: 'Potential outcome and future influences', dealOrder: 3 }
    ]
  },
  crossSpread: {
    name: 'Cross Spread',
    description: 'A five-card cross spread for deeper insight into a situation.',
    allowReversals: true,
    preferredStrategy: 'fanpick', // More intuitive selection for complex spreads
    visualRepresentation: `
digraph CrossSpread {
  node [shape=rectangle, style=filled, fillcolor=lightgreen];
  subgraph {
    rank=same; "2. Challenge";
  }
  subgraph {
    rank=same; "3. Foundation" -> "1. Present" -> "4. Recent Past";
  }
  subgraph {
    rank=same; "5. Outcome";
  }
  "1. Present" -> "2. Challenge" [style=dotted];
  "1. Present" -> "5. Outcome" [style=dotted];
}`,
    positions: [
      { position: 1, name: 'Present Situation', meaning: 'The heart of the matter, current situation', dealOrder: 1 },
      { position: 2, name: 'Challenge/Cross', meaning: 'What crosses you, obstacles or challenges', dealOrder: 2 },
      { position: 3, name: 'Distant Past/Foundation', meaning: 'Foundation of the situation, distant past', dealOrder: 3 },
      { position: 4, name: 'Recent Past', meaning: 'Recent events and influences', dealOrder: 4 },
      { position: 5, name: 'Possible Outcome', meaning: 'Potential future outcome', dealOrder: 5 }
    ]
  },
  // Example spread that doesn't use reversals
  simplePastPresent: {
    name: 'Simple Past-Present',
    description: 'A two-card spread without reversals for straightforward guidance.',
    allowReversals: false,
    preferredStrategy: 'deal', // Simple dealing for simple spread
    visualRepresentation: `
digraph SimplePastPresent {
  rankdir=LR;
  node [shape=rectangle, style=filled, fillcolor=lightyellow];
  "1. Past" -> "2. Present";
}`,
    positions: [
      { position: 1, name: 'Past', meaning: 'What has led to this moment', dealOrder: 1 },
      { position: 2, name: 'Present', meaning: 'What you need to know right now', dealOrder: 2 }
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
   * Supports both legacy boolean parameter and new strategy parameter
   */
  performReading(
    spreadName: keyof typeof SPREADS, 
    strategyOrLegacyBoolean?: string | CardSelectionStrategy | boolean
  ): SpreadReading {
    const spread = SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }

    const cardCount = spread.positions.length;
    
    // Handle legacy boolean parameter
    if (typeof strategyOrLegacyBoolean === 'boolean') {
      const useDealing = strategyOrLegacyBoolean;
      let cards: CardPosition[];

      if (useDealing) {
        cards = this.deck.deal(cardCount, spread.allowReversals);
      } else {
        cards = this.deck.fanPick(cardCount, spread.allowReversals);
      }

      return {
        spread,
        cards,
        timestamp: new Date()
      };
    }

    // Handle new strategy parameter
    let strategy: CardSelectionStrategy;

    // Determine strategy to use
    if (strategyOrLegacyBoolean) {
      if (typeof strategyOrLegacyBoolean === 'string') {
        strategy = CARD_SELECTION_STRATEGIES[strategyOrLegacyBoolean];
        if (!strategy) {
          throw new Error(`Unknown strategy: ${strategyOrLegacyBoolean}`);
        }
      } else {
        strategy = strategyOrLegacyBoolean;
      }
    } else if (spread.preferredStrategy) {
      strategy = CARD_SELECTION_STRATEGIES[spread.preferredStrategy];
      if (!strategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferredStrategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      strategy = this.deck.getDefaultStrategy();
    }

    const cards = this.deck.selectCards(cardCount, spread.allowReversals, strategy);

    return {
      spread,
      cards,
      timestamp: new Date()
    };
  }

  /**
   * Perform a reading using a custom spread
   * Supports both legacy boolean parameter and new strategy parameter
   */
  performCustomReading(
    spread: Spread, 
    strategyOrLegacyBoolean?: string | CardSelectionStrategy | boolean
  ): SpreadReading {
    const cardCount = spread.positions.length;
    
    // Handle legacy boolean parameter
    if (typeof strategyOrLegacyBoolean === 'boolean') {
      const useDealing = strategyOrLegacyBoolean;
      let cards: CardPosition[];

      if (useDealing) {
        cards = this.deck.deal(cardCount, spread.allowReversals);
      } else {
        cards = this.deck.fanPick(cardCount, spread.allowReversals);
      }

      return {
        spread,
        cards,
        timestamp: new Date()
      };
    }

    // Handle new strategy parameter
    let strategy: CardSelectionStrategy;

    // Determine strategy to use
    if (strategyOrLegacyBoolean) {
      if (typeof strategyOrLegacyBoolean === 'string') {
        strategy = CARD_SELECTION_STRATEGIES[strategyOrLegacyBoolean];
        if (!strategy) {
          throw new Error(`Unknown strategy: ${strategyOrLegacyBoolean}`);
        }
      } else {
        strategy = strategyOrLegacyBoolean;
      }
    } else if (spread.preferredStrategy) {
      strategy = CARD_SELECTION_STRATEGIES[spread.preferredStrategy];
      if (!strategy) {
        throw new Error(`Unknown preferred strategy for spread: ${spread.preferredStrategy}`);
      }
    } else {
      // Fallback to deck's default strategy
      strategy = this.deck.getDefaultStrategy();
    }

    const cards = this.deck.selectCards(cardCount, spread.allowReversals, strategy);

    return {
      spread,
      cards,
      timestamp: new Date()
    };
  }

  /**
   * Generate interpretations for a reading
   */
  generateInterpretations(reading: SpreadReading): Interpretation[] {
    return reading.cards.map((cardPosition, index) => {
      const position = reading.spread.positions[index];
      return {
        position,
        card: cardPosition.card,
        isReversed: cardPosition.isReversed,
        meaning: cardPosition.isReversed 
          ? cardPosition.card.reversedMeaning 
          : cardPosition.card.uprightMeaning,
        additionalNotes: `Card drawn for position "${position.name}". ${position.meaning}`
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
    allowReversals: boolean = true, 
    visualRepresentation?: string,
    preferredStrategy?: string
  ): Spread {
    return {
      name,
      description,
      positions,
      allowReversals,
      visualRepresentation,
      preferredStrategy
    };
  }

  /**
   * Get available card selection strategies
   */
  getAvailableStrategies(): Record<string, CardSelectionStrategy> {
    return CARD_SELECTION_STRATEGIES;
  }

  /**
   * Set the deck's default strategy
   */
  setDefaultStrategy(strategy: string | CardSelectionStrategy): void {
    if (typeof strategy === 'string') {
      const strategyObj = CARD_SELECTION_STRATEGIES[strategy];
      if (!strategyObj) {
        throw new Error(`Unknown strategy: ${strategy}`);
      }
      this.deck.setDefaultStrategy(strategyObj);
    } else {
      this.deck.setDefaultStrategy(strategy);
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
      total: this.deck.getTotalCount()
    };
  }
}