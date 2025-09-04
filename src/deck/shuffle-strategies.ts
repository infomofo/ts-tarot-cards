import { ShuffleStrategy, TarotCard } from '../types';
import { RiffleShuffleStrategy } from './riffle-shuffle-strategy';

/**
 * Modern shuffle algorithm that ensures each card has an equal probability
 * of ending up in any position
 */
export class FisherYatesShuffleStrategy implements ShuffleStrategy {
  name = 'fisherYates';

  description = 'Modern shuffle algorithm that ensures each card has an equal probability '
    + 'of ending up in any position';

  static shuffle(cards: TarotCard[]): TarotCard[] {
    const shuffled = [...cards];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = FisherYatesShuffleStrategy.getBiometricRandomIndex(i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }

  private static getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}

// Pre-defined shuffle strategies
export const SHUFFLE_STRATEGIES: Record<string, ShuffleStrategy> = {
  fisherYates: new FisherYatesShuffleStrategy(),
  riffle: new RiffleShuffleStrategy(),
};
