import { Spread, SpreadPosition, SpreadReading, CardPosition, CardInterpretation, CardSelectionStrategy } from '../types';
import { TarotDeck } from '../deck/deck';
import { CARD_SELECTION_STRATEGIES } from '../deck/card-selection-strategies';

// Spread name constants to avoid magic strings
export const SPREAD_NAMES = {
  threeCard: 'threeCard',
  crossSpread: 'crossSpread', 
  simplePastPresent: 'simplePastPresent',
  singleCard: 'singleCard',
  celticCross: 'celticCross'
} as const;

// Pre-defined spread templates
export const SPREADS: Record<string, Spread> = {
  singleCard: {
    name: 'Single Card Pull',
    description: 'A single card for quick guidance or a daily reading.',
    allowReversals: true,
    preferredStrategy: 'deal',
    visualRepresentation: `
digraph SingleCard {
  node [shape=rectangle, style=filled, fillcolor=lightblue];
  "1. Guidance";
}`,
    positions: [
      { position: 1, name: 'Guidance', positionSignificance: 'A single point of focus or advice', dealOrder: 1 }
    ]
  },
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
      { position: 1, name: 'Past', positionSignificance: 'Past influences and events that led to the current situation', dealOrder: 1 },
      { position: 2, name: 'Present', positionSignificance: 'Current situation and immediate influences', dealOrder: 2 },
      { position: 3, name: 'Future', positionSignificance: 'Potential outcome and future influences', dealOrder: 3 }
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
  edge [style=invis];
  { rank=same; "4. Recent Past"; "1. Present Situation"; "2. Challenge/Cross"; }
  "4. Recent Past" -> "1. Present Situation" -> "2. Challenge/Cross";
  "5. Possible Outcome" -> "1. Present Situation" -> "3. Distant Past/Foundation";
}`,
    positions: [
      { position: 1, name: 'Present Situation', positionSignificance: 'The heart of the matter, current situation', dealOrder: 1 },
      { position: 2, name: 'Challenge/Cross', positionSignificance: 'What crosses you, obstacles or challenges', dealOrder: 2 },
      { position: 3, name: 'Distant Past/Foundation', positionSignificance: 'Foundation of the situation, distant past', dealOrder: 3 },
      { position: 4, name: 'Recent Past', positionSignificance: 'Recent events and influences', dealOrder: 4 },
      { position: 5, name: 'Possible Outcome', positionSignificance: 'Potential future outcome', dealOrder: 5 }
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
      { position: 1, name: 'Past', positionSignificance: 'What has led to this moment', dealOrder: 1 },
      { position: 2, name: 'Present', positionSignificance: 'What you need to know right now', dealOrder: 2 }
    ]
  },
  celticCross: {
    name: 'Celtic Cross',
    description: 'A comprehensive 10-card spread for in-depth analysis of a situation.',
    allowReversals: true,
    preferredStrategy: 'deal',
    visualRepresentation: `
digraph CelticCross {
    node [shape=rectangle, style=filled, fillcolor=lightblue];
    edge [style=invis];

    // Define node styles
    node_cross [fillcolor=lightcoral];
    node_staff [fillcolor=lightgoldenrodyellow];

    // Apply styles
    node [style=filled];
    subgraph {
        node [shape=rectangle];
        "1. The Present"; "2. The Challenge"; "3. The Foundation"; "4. The Past"; "5. Above"; "6. The Future" [style=filled, fillcolor=lightcoral];
        "7. Advice"; "8. External Influences"; "9. Hopes and Fears"; "10. The Outcome" [style=filled, fillcolor=lightgoldenrodyellow];
    }

    // The Staff
    "10. The Outcome" -> "9. Hopes and Fears" -> "8. External Influences" -> "7. Advice";

    // The Cross
    { rank=same; "4. The Past"; "1. The Present"; "6. The Future"; }
    "4. The Past" -> "1. The Present" -> "6. The Future";
    "5. Above" -> "1. The Present" -> "3. The Foundation";
    "2. The Challenge" -> "1. The Present" [style=solid, dir=none, constraint=false];

    // Connect Cross to Staff
    "6. The Future" -> "7. Advice" [minlen=2];
}`,
    visualRepresentationContext: 'The Celtic Cross consists of two main parts: "The Cross" (positions 1-6) which represents the core of the situation, and "The Staff" (positions 7-10) which provides further insight and advice.',
    positions: [
      { position: 1, name: 'The Present', positionSignificance: 'The current situation or the heart of the matter.', dealOrder: 1 },
      { position: 2, name: 'The Challenge', positionSignificance: 'The immediate challenge or obstacle crossing you.', dealOrder: 2 },
      { position: 3, name: 'The Foundation', positionSignificance: 'The basis of the situation, events from the distant past.', dealOrder: 3 },
      { position: 4, name: 'The Past', positionSignificance: 'Recent events that have led to the present situation.', dealOrder: 4 },
      { position: 5, name: 'Above', positionSignificance: 'Conscious influences, goals, and what you are aiming for.', dealOrder: 5 },
      { position: 6, name: 'The Future', positionSignificance: 'What is likely to happen in the near future.', dealOrder: 6 },
      { position: 7, name: 'Advice', positionSignificance: 'Your role in the situation and the advice the cards offer.', dealOrder: 7 },
      { position: 8, name: 'External Influences', positionSignificance: 'How others see you and the situation; external forces at play.', dealOrder: 8 },
      { position: 9, name: 'Hopes and Fears', positionSignificance: 'Your hopes and fears regarding the situation.', dealOrder: 9 },
      { position: 10, name: 'The Outcome', positionSignificance: 'The final resolution or outcome of the situation.', dealOrder: 10 }
    ]
  }
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
      return cards.map(cp => ({ ...cp, isReversed: false }));
    }

    return cards.map(cp => ({
      ...cp,
      isReversed: this.getBiometricRandomIndex(2) === 1 // 50% chance of reversal
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
    userContext?: string
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
      timestamp: new Date()
    };
  }

  /**
   * Perform a reading using a custom spread
   */
  performCustomReading(
    spread: Spread, 
    strategy?: string | CardSelectionStrategy,
    userContext?: string
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
      timestamp: new Date()
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
        additionalNotes: `Card drawn for position "${position.name}". ${position.positionSignificance}`
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
    visualRepresentationContext?: string,
    preferredStrategy?: string
  ): Spread {
    return {
      name,
      description,
      positions,
      allowReversals,
      visualRepresentation,
      visualRepresentationContext,
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
      total: this.deck.getTotalCount()
    };
  }

  /**
   * Generate a digraph for a reading, replacing position names with card text representations
   */
  generateReadingDigraph(reading: SpreadReading): string {
    let digraph = reading.spread.visualRepresentation || '';

    reading.cards.forEach(cardPosition => {
      const positionInfo = reading.spread.positions.find(p => p.position === cardPosition.position);
      if (positionInfo) {
        const cardText = cardPosition.card.getTextRepresentation();
        const positionName = `"${positionInfo.position}. ${positionInfo.name}"`;
        digraph = digraph.replaceAll(positionName, `"${cardText}"`);
      }
    });

    return digraph;
  }
}
