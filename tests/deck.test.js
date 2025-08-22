"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deck_1 = require("../src/deck/deck");
const card_selection_strategies_1 = require("../src/deck/card-selection-strategies");
const shuffle_strategies_1 = require("../src/deck/shuffle-strategies");
const spreads_1 = require("../src/spreads/spreads");
const types_1 = require("../src/types");
describe('TarotDeck', () => {
    let deck;
    beforeEach(() => {
        deck = new deck_1.TarotDeck();
    });
    test('should initialize with cards', () => {
        expect(deck.getTotalCount()).toBeGreaterThan(0);
        expect(deck.getRemainingCount()).toBe(deck.getTotalCount());
    });
    test('should select cards correctly', () => {
        const initialCount = deck.getRemainingCount();
        const dealtCards = deck.selectCards(3);
        expect(dealtCards).toHaveLength(3);
        expect(deck.getRemainingCount()).toBe(initialCount - 3);
        // Each card should have a position and reversal status
        dealtCards.forEach((cardPosition, index) => {
            expect(cardPosition.position).toBe(index + 1);
            expect(typeof cardPosition.isReversed).toBe('boolean');
            expect(cardPosition.card).toBeDefined();
            expect(cardPosition.card.id).toBeDefined();
            expect(cardPosition.card.getName()).toBeDefined();
        });
    });
    test('should fan pick cards correctly', () => {
        const initialCount = deck.getRemainingCount();
        const pickedCards = deck.selectCards(2, { strategy: card_selection_strategies_1.CARD_SELECTION_STRATEGIES.fanpick });
        expect(pickedCards).toHaveLength(2);
        expect(deck.getRemainingCount()).toBe(initialCount - 2);
        // Each card should have a position and reversal status
        pickedCards.forEach((cardPosition, index) => {
            expect(cardPosition.position).toBe(index + 1);
            expect(typeof cardPosition.isReversed).toBe('boolean');
            expect(cardPosition.card).toBeDefined();
        });
    });
    test('should throw error when selecting more cards than available', () => {
        const availableCards = deck.getRemainingCount();
        expect(() => deck.selectCards(availableCards + 1)).toThrow();
    });
    test('should reset deck correctly', () => {
        const originalCount = deck.getTotalCount();
        deck.selectCards(2);
        expect(deck.getRemainingCount()).toBe(originalCount - 2);
        deck.reset();
        expect(deck.getRemainingCount()).toBe(originalCount);
    });
    test('should shuffle deck (cards should be in different order)', () => {
        const deck1 = new deck_1.TarotDeck();
        const deck2 = new deck_1.TarotDeck();
        const cards1 = deck1.selectCards(4);
        const cards2 = deck2.selectCards(4);
        // While theoretically possible for shuffles to be identical,
        // it's extremely unlikely with 4 cards
        const sameOrder = cards1.every((card, index) => card.card.id === cards2[index].card.id);
        // This test might occasionally fail due to randomness, but very unlikely
        expect(sameOrder).toBe(false);
    });
    test('should support strategy-based card selection', () => {
        const deck = new deck_1.TarotDeck();
        const strategies = deck.getAvailableCardSelectionStrategies();
        expect(strategies).toHaveProperty('deal');
        expect(strategies).toHaveProperty('fanpick');
        const cards1 = deck.selectCards(3, { strategy: strategies.deal });
        expect(cards1).toHaveLength(3);
        deck.reset();
        const cards2 = deck.selectCards(3, { strategy: strategies.fanpick });
        expect(cards2).toHaveLength(3);
    });
    test('should set and get default strategy', () => {
        const deck = new deck_1.TarotDeck();
        const strategies = deck.getAvailableCardSelectionStrategies();
        // Default should be deal strategy
        expect(deck.getDefaultCardSelectionStrategy().name).toBe('deal');
        deck.setDefaultCardSelectionStrategy(strategies.fanpick);
        expect(deck.getDefaultCardSelectionStrategy().name).toBe('fanpick');
        // Test using default strategy
        const cards = deck.selectCards(2);
        expect(cards).toHaveLength(2);
    });
    test('should initialize with custom default strategy', () => {
        const strategies = card_selection_strategies_1.CARD_SELECTION_STRATEGIES;
        const deck = new deck_1.TarotDeck(strategies.fanpick);
        expect(deck.getDefaultCardSelectionStrategy().name).toBe('fanpick');
    });
});
describe('SpreadReader', () => {
    let reader;
    beforeEach(() => {
        reader = new spreads_1.SpreadReader();
    });
    test('should perform three card reading', () => {
        const reading = reader.performReading('threeCard');
        expect(reading.cards).toHaveLength(3);
        expect(reading.spread.name).toBe('Three Card Spread');
        expect(reading.spread.positions).toHaveLength(3);
        expect(reading.timestamp).toBeInstanceOf(Date);
        // Verify positions are correctly assigned
        expect(reading.cards[0].position).toBe(1);
        expect(reading.cards[1].position).toBe(2);
        expect(reading.cards[2].position).toBe(3);
    });
    test('should perform cross spread reading', () => {
        const reading = reader.performReading('crossSpread');
        expect(reading.cards).toHaveLength(5);
        expect(reading.spread.name).toBe('Cross Spread');
        expect(reading.spread.positions).toHaveLength(5);
    });
    test('should perform reading with fan pick strategy', () => {
        const reading = reader.performReading('threeCard', 'fanpick');
        expect(reading.cards).toHaveLength(3);
        expect(reading.spread.name).toBe('Three Card Spread');
    });
    test('should throw error for unknown spread', () => {
        expect(() => reader.performReading('unknownSpread')).toThrow();
    });
    test('should create custom spread', () => {
        const customSpread = reader.createCustomSpread('Custom Test', 'A test spread', [
            { position: 1, name: 'First', positionSignificance: 'First position', dealOrder: 1 },
            { position: 2, name: 'Second', positionSignificance: 'Second position', dealOrder: 2 }
        ], [
            { position: 1, x: 0, y: 0 },
            { position: 2, x: 1, y: 0 }
        ]);
        expect(customSpread.name).toBe('Custom Test');
        expect(customSpread.positions).toHaveLength(2);
        const reading = reader.performCustomReading(customSpread);
        expect(reading.cards).toHaveLength(2);
    });
    test('should get available spreads', () => {
        const spreads = reader.getAvailableSpreads();
        expect(spreads).toContain('threeCard');
        expect(spreads).toContain('crossSpread');
    });
    test('should get deck info', () => {
        const info = reader.getDeckInfo();
        expect(info.total).toBeGreaterThan(0);
        expect(info.remaining).toBe(info.total);
        reader.performReading('threeCard');
        const infoAfter = reader.getDeckInfo();
        expect(infoAfter.remaining).toBe(info.remaining - 3);
    });
    test('should generate interpretations for readings', () => {
        const reading = reader.performReading('threeCard');
        const interpretations = reader.generateInterpretations(reading);
        expect(interpretations).toHaveLength(3);
        interpretations.forEach((interpretation, index) => {
            expect(interpretation.position).toBe(reading.spread.positions[index]);
            expect(interpretation.card).toBe(reading.cards[index].card);
            expect(interpretation.isReversed).toBe(reading.cards[index].isReversed);
            expect(interpretation.meaning).toBeDefined();
            expect(interpretation.additionalNotes).toBeDefined();
        });
    });
    test('should respect reversal settings for spreads', () => {
        const readingWithReversals = reader.performReading('threeCard');
        const readingWithoutReversals = reader.performReading('simplePastPresent');
        // simplePastPresent spread doesn't allow reversals
        expect(readingWithoutReversals.cards.every(card => !card.isReversed)).toBe(true);
        expect(readingWithoutReversals.spread.allowReversals).toBe(false);
        // threeCard spread allows reversals
        expect(readingWithReversals.spread.allowReversals).toBe(true);
    });
    test('should include layout in spreads', () => {
        const spread = reader.getSpread('threeCard');
        expect(spread.layout).toBeDefined();
        expect(spread.layout.length).toBe(spread.positions.length);
        const spread2 = reader.getSpread('crossSpread');
        expect(spread2.layout).toBeDefined();
        expect(spread2.layout.length).toBe(spread2.positions.length);
    });
    test('should support new strategy-based card selection', () => {
        // Test with specific strategy override
        const readingWithDeal = reader.performReading('threeCard', 'deal');
        expect(readingWithDeal.cards).toHaveLength(3);
        reader.resetDeck(); // Reset deck for second test
        const readingWithFanpick = reader.performReading('threeCard', 'fanpick');
        expect(readingWithFanpick.cards).toHaveLength(3);
    });
    test('should use preferred strategy from spread', () => {
        const threeCardSpread = reader.getSpread('threeCard');
        expect(threeCardSpread.preferredStrategy).toBe('deal');
        const crossSpread = reader.getSpread('crossSpread');
        expect(crossSpread.preferredStrategy).toBe('fanpick');
        // Reading should use preferred strategy when no override provided
        const reading = reader.performReading('threeCard');
        expect(reading.cards).toHaveLength(3);
    });
    test('should get available strategies', () => {
        const strategies = reader.getAvailableStrategies();
        expect(strategies).toHaveProperty('deal');
        expect(strategies).toHaveProperty('fanpick');
        expect(strategies.deal.name).toBe('deal');
        expect(strategies.fanpick.name).toBe('fanpick');
    });
    test('should support custom strategy objects', () => {
        const strategies = reader.getAvailableStrategies();
        const dealStrategy = strategies.deal;
        const reading = reader.performReading('threeCard', dealStrategy);
        expect(reading.cards).toHaveLength(3);
    });
    test('should create custom spread with preferred strategy', () => {
        const customSpread = reader.createCustomSpread('Custom Strategy Test', 'A test spread with strategy', [
            { position: 1, name: 'First', positionSignificance: 'First position', dealOrder: 1 },
            { position: 2, name: 'Second', positionSignificance: 'Second position', dealOrder: 2 }
        ], [
            { position: 1, x: 0, y: 0 },
            { position: 2, x: 1, y: 0 }
        ], true, 'fanpick');
        expect(customSpread.preferredStrategy).toBe('fanpick');
        const reading = reader.performCustomReading(customSpread);
        expect(reading.cards).toHaveLength(2);
    });
    test('should throw error for unknown strategy', () => {
        expect(() => reader.performReading('threeCard', 'unknownStrategy')).toThrow();
    });
    test('should set default strategy', () => {
        reader.setDefaultCardSelectionStrategy('fanpick');
        // Create a spread without preferred strategy to test default
        const customSpread = reader.createCustomSpread('Default Strategy Test', 'A test spread', [{ position: 1, name: 'Only', positionSignificance: 'Only position', dealOrder: 1 }], [{ position: 1, x: 0, y: 0 }]);
        const reading = reader.performCustomReading(customSpread);
        expect(reading.cards).toHaveLength(1);
    });
});
describe('Card Types', () => {
    test('should have correct card structure for major arcana', () => {
        const deck = new deck_1.TarotDeck();
        const cards = deck.selectCards(deck.getTotalCount());
        const majorCards = cards.filter(cp => cp.card.arcana === types_1.Arcana.Major);
        const minorCards = cards.filter(cp => cp.card.arcana === types_1.Arcana.Minor);
        expect(majorCards.length).toBeGreaterThan(0);
        expect(minorCards.length).toBeGreaterThan(0);
        // Check major arcana card structure
        if (majorCards.length > 0) {
            const majorCard = majorCards[0].card;
            expect(majorCard.arcana).toBe(types_1.Arcana.Major);
            expect(majorCard.number).toBeDefined();
            expect(typeof majorCard.number).toBe('number');
            expect('suit' in majorCard).toBe(false);
        }
        // Check minor arcana card structure
        if (minorCards.length > 0) {
            const minorCard = minorCards[0].card;
            expect(minorCard.arcana).toBe(types_1.Arcana.Minor);
            expect(minorCard.suit).toBeDefined();
            expect(minorCard.number).toBeDefined();
            expect(typeof minorCard.number).toBe('number');
        }
    });
    test('should support localization-ready getName() method', () => {
        const deck = new deck_1.TarotDeck();
        const cards = deck.selectCards(5);
        cards.forEach(cardPosition => {
            const card = cardPosition.card;
            // getName() should return a string
            expect(typeof card.getName()).toBe('string');
            expect(card.getName().length).toBeGreaterThan(0);
            // getName() should accept optional locale parameter
            expect(typeof card.getName('en')).toBe('string');
            expect(card.getName('en')).toBe(card.getName()); // Currently returns same since no localization implemented yet
        });
    });
    test('should have roman numerals derived from numeric values', () => {
        const deck = new deck_1.TarotDeck();
        const cards = deck.selectCards(deck.getTotalCount());
        cards.forEach(cardPosition => {
            const card = cardPosition.card;
            // Every card should have a romanNumeral property
            expect(card.romanNumeral).toBeDefined();
            expect(typeof card.romanNumeral).toBe('string');
            expect(card.romanNumeral.length).toBeGreaterThan(0);
            // Should use valid roman numeral characters or be "0" for The Fool
            expect(card.romanNumeral).toMatch(/^[IVXLCDM0]+$/);
        });
    });
});
describe('Shuffle Strategies', () => {
    test('should support different shuffle strategies', () => {
        const deck = new deck_1.TarotDeck();
        const originalOrder = deck.selectCards(deck.getTotalCount()).map(cp => cp.card.id);
        // Reset and shuffle with Fisher-Yates
        deck.reset();
        deck.shuffle(shuffle_strategies_1.SHUFFLE_STRATEGIES.fisherYates);
        const fisherYatesOrder = deck.selectCards(deck.getTotalCount()).map(cp => cp.card.id);
        // Reset and shuffle with Riffle
        deck.reset();
        deck.shuffle(shuffle_strategies_1.SHUFFLE_STRATEGIES.riffle);
        const riffleOrder = deck.selectCards(deck.getTotalCount()).map(cp => cp.card.id);
        // Orders should be different (with very high probability)
        expect(fisherYatesOrder.join(',')).not.toBe(originalOrder.join(','));
        expect(riffleOrder.join(',')).not.toBe(originalOrder.join(','));
        expect(fisherYatesOrder.join(',')).not.toBe(riffleOrder.join(','));
    });
    test('should set and get default shuffle strategy', () => {
        const deck = new deck_1.TarotDeck();
        // Should have default shuffle strategy
        expect(deck.getDefaultShuffleStrategy()).toBeDefined();
        expect(deck.getDefaultShuffleStrategy().name).toBe('fisherYates');
        // Should be able to change default shuffle strategy
        deck.setDefaultShuffleStrategy(shuffle_strategies_1.SHUFFLE_STRATEGIES.riffle);
        expect(deck.getDefaultShuffleStrategy().name).toBe('riffle');
    });
    test('should get available shuffle strategies', () => {
        const deck = new deck_1.TarotDeck();
        const strategies = deck.getAvailableShuffleStrategies();
        expect(strategies).toBeDefined();
        expect(Object.keys(strategies)).toContain('fisherYates');
        expect(Object.keys(strategies)).toContain('riffle');
        expect(strategies.fisherYates.name).toBe('fisherYates');
        expect(strategies.riffle.name).toBe('riffle');
    });
    test('should initialize with custom shuffle strategy', () => {
        const deck = new deck_1.TarotDeck(card_selection_strategies_1.CARD_SELECTION_STRATEGIES.deal, shuffle_strategies_1.SHUFFLE_STRATEGIES.riffle);
        expect(deck.getDefaultShuffleStrategy().name).toBe('riffle');
    });
});
describe('Card Data Conventions', () => {
    let deck;
    beforeEach(() => {
        deck = new deck_1.TarotDeck();
    });
    test('should contain exactly 78 cards', () => {
        expect(deck.getTotalCount()).toBe(78);
    });
    test('every card should have a visual description and analysis', () => {
        const cards = deck.selectCards(deck.getTotalCount());
        cards.forEach(cardPosition => {
            const card = cardPosition.card;
            expect(card.visualDescription).toBeDefined();
            expect(card.visualDescription.length).toBeGreaterThan(0);
            expect(card.visualDescriptionAnalysis).toBeDefined();
            expect(card.visualDescriptionAnalysis.length).toBeGreaterThan(0);
        });
    });
    test('all symbols should be singular nouns', () => {
        const cards = deck.selectCards(deck.getTotalCount());
        cards.forEach(cardPosition => {
            const card = cardPosition.card;
            card.symbols.forEach(symbol => {
                // A simple check: the symbol should not end with 's' unless it's a word that ends in 's'
                // This is not foolproof, but it's a good heuristic.
                if (symbol.endsWith('s') && !symbol.endsWith('ss')) {
                    // List of exceptions
                    const exceptions = ['chaos', 'cross', 'cosmos', 'iris', 'ibis', 'lotus', 'ouroboros', 'staffs', 'wands', 'caduceus'];
                    if (!exceptions.includes(symbol.toLowerCase())) {
                        throw new Error(`Symbol "${symbol}" in card "${card.getName()}" might be plural.`);
                    }
                }
            });
        });
    });
    test('symbols should not include generic terms like "man" or "woman"', () => {
        const cards = deck.selectCards(deck.getTotalCount());
        const forbiddenSymbols = ['man', 'woman', 'figure', 'person'];
        cards.forEach(cardPosition => {
            const card = cardPosition.card;
            card.symbols.forEach(symbol => {
                expect(forbiddenSymbols).not.toContain(symbol.toLowerCase());
            });
        });
    });
});
//# sourceMappingURL=deck.test.js.map