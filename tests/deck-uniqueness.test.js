"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreads_1 = require("../src/spreads/spreads");
describe('SpreadReader Card Uniqueness', () => {
    it('should not deal duplicate cards across multiple readings', () => {
        const spreadReader = new spreads_1.SpreadReader();
        const drawnCardIds = new Set();
        const reading1 = spreadReader.performReading(spreads_1.SPREAD_NAMES.threeCard);
        for (const cardPosition of reading1.cards) {
            expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
            drawnCardIds.add(cardPosition.card.id);
        }
        const reading2 = spreadReader.performReading(spreads_1.SPREAD_NAMES.celticCross);
        for (const cardPosition of reading2.cards) {
            expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
            drawnCardIds.add(cardPosition.card.id);
        }
        const reading3 = spreadReader.performReading(spreads_1.SPREAD_NAMES.simplePastPresent);
        for (const cardPosition of reading3.cards) {
            expect(drawnCardIds.has(cardPosition.card.id)).toBe(false);
            drawnCardIds.add(cardPosition.card.id);
        }
    });
});
//# sourceMappingURL=deck-uniqueness.test.js.map