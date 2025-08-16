import { Spread, SpreadPosition, SpreadReading, CardPosition, Interpretation } from '../types';
import { TarotDeck } from '../deck/deck';

// Pre-defined spread templates
export const SPREADS: Record<string, Spread> = {
  threeCard: {
    name: 'Three Card Spread',
    description: 'A simple three-card spread representing past, present, and future.',
    allowReversals: true,
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
   */
  performReading(spreadName: keyof typeof SPREADS, useDealing: boolean = true): SpreadReading {
    const spread = SPREADS[spreadName];
    if (!spread) {
      throw new Error(`Unknown spread: ${spreadName}`);
    }

    const cardCount = spread.positions.length;
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

  /**
   * Perform a reading using a custom spread
   */
  performCustomReading(spread: Spread, useDealing: boolean = true): SpreadReading {
    const cardCount = spread.positions.length;
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
  createCustomSpread(name: string, description: string, positions: SpreadPosition[], allowReversals: boolean = true, visualRepresentation?: string): Spread {
    return {
      name,
      description,
      positions,
      allowReversals,
      visualRepresentation
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