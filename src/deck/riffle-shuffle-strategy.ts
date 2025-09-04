import { ShuffleStrategy, TarotCard } from '../types';

/**
 * Physical card shuffling simulation that mimics the traditional method
 * of dividing the deck and interleaving cards
 */
export class RiffleShuffleStrategy implements ShuffleStrategy {
  name = 'riffle';

  description = 'Physical card shuffling simulation that mimics the traditional method '
    + 'of dividing the deck and interleaving cards';

  shuffle(cards: TarotCard[]): TarotCard[] {
    let shuffled = [...cards];

    // Perform multiple riffle shuffles (3-7 times is typical)
    const passes = 3 + this.getBiometricRandomIndex(5); // 3-7 passes

    for (let pass = 0; pass < passes; pass += 1) {
      shuffled = this.singleRiffle(shuffled);
    }

    return shuffled;
  }

  private singleRiffle(cards: TarotCard[]): TarotCard[] {
    const mid = Math.floor(cards.length / 2);
    const firstHalf = cards.slice(0, mid);
    const secondHalf = cards.slice(mid);

    const result: TarotCard[] = [];
    let i = 0;
    let j = 0;

    while (i < firstHalf.length || j < secondHalf.length) {
      // Randomly interleave cards from both halves
      if (i >= firstHalf.length) {
        result.push(secondHalf[j]);
        j += 1;
      } else if (j >= secondHalf.length) {
        result.push(firstHalf[i]);
        i += 1;
      } else if (this.getBiometricRandomIndex(2) === 0) {
        result.push(firstHalf[i]);
        i += 1;
      } else {
        result.push(secondHalf[j]);
        j += 1;
      }
    }

    return result;
  }

  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    return Math.floor(Math.random() * max);
  }
}
