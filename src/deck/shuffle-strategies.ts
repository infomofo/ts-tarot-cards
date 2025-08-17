import { ShuffleStrategy, TarotCard } from '../types';

/**
 * Modern shuffle algorithm that ensures each card has an equal probability of ending up in any position
 */
export class FisherYatesShuffleStrategy implements ShuffleStrategy {
  name = 'fisherYates';
  description = 'Modern shuffle algorithm that ensures each card has an equal probability of ending up in any position';

  shuffle(cards: TarotCard[]): TarotCard[] {
    const shuffled = [...cards];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = this.getBiometricRandomIndex(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

/**
 * Physical card shuffling simulation that mimics the traditional method of dividing the deck and interleaving cards
 */
export class RiffleShuffleStrategy implements ShuffleStrategy {
  name = 'riffle';
  description = 'Physical card shuffling simulation that mimics the traditional method of dividing the deck and interleaving cards';

  shuffle(cards: TarotCard[]): TarotCard[] {
    let shuffled = [...cards];
    
    // Perform multiple riffle shuffles (3-7 times is typical)
    const passes = 3 + this.getBiometricRandomIndex(5); // 3-7 passes
    
    for (let pass = 0; pass < passes; pass++) {
      shuffled = this.singleRiffle(shuffled);
    }

    return shuffled;
  }

  private singleRiffle(cards: TarotCard[]): TarotCard[] {
    const mid = Math.floor(cards.length / 2);
    const firstHalf = cards.slice(0, mid);
    const secondHalf = cards.slice(mid);
    
    const result: TarotCard[] = [];
    let i = 0, j = 0;
    
    while (i < firstHalf.length || j < secondHalf.length) {
      // Randomly interleave cards from both halves
      if (i >= firstHalf.length) {
        result.push(secondHalf[j++]);
      } else if (j >= secondHalf.length) {
        result.push(firstHalf[i++]);
      } else if (this.getBiometricRandomIndex(2) === 0) {
        result.push(firstHalf[i++]);
      } else {
        result.push(secondHalf[j++]);
      }
    }
    
    return result;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

// Pre-defined shuffle strategies
export const SHUFFLE_STRATEGIES: Record<string, ShuffleStrategy> = {
  fisherYates: new FisherYatesShuffleStrategy(),
  riffle: new RiffleShuffleStrategy()
};