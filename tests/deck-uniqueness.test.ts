import { SpreadReader, SPREAD_NAMES } from '../src/spreads/spreads';
import { TarotCard } from '../src/types';

describe('SpreadReader Card Uniqueness', () => {
  it('should not deal duplicate cards across multiple readings', () => {
    const spreadReader = new SpreadReader();
    const drawnCardIds = new Set<string>();

    const reading1 = spreadReader.performReading(SPREAD_NAMES.threeCard);
    for (const cardPosition of reading1.cards) {
      expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
      drawnCardIds.add(cardPosition.card.id);
    }

    const reading2 = spreadReader.performReading(SPREAD_NAMES.celticCross);
    for (const cardPosition of reading2.cards) {
      expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
      drawnCardIds.add(cardPosition.card.id);
    }

    const reading3 = spreadReader.performReading(SPREAD_NAMES.simplePastPresent);
    for (const cardPosition of reading3.cards) {
      expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
      drawnCardIds.add(cardPosition.card.id);
    }
  });
});
