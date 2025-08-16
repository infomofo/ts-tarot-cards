import { TarotDeck } from '../src/deck/deck';
import { CARD_SELECTION_STRATEGIES } from '../src/deck/strategies';
import { SpreadReader, SPREADS } from '../src/spreads/spreads';
import { Arcana, Suit, MinorNumber, MajorArcana, MajorArcanaCard, MinorArcanaCard } from '../src/types';

describe('TarotDeck', () => {
  let deck: TarotDeck;

  beforeEach(() => {
    deck = new TarotDeck();
  });

  test('should initialize with cards', () => {
    expect(deck.getTotalCount()).toBeGreaterThan(0);
    expect(deck.getRemainingCount()).toBe(deck.getTotalCount());
  });

  test('should deal cards correctly', () => {
    const initialCount = deck.getRemainingCount();
    const dealtCards = deck.deal(3);

    expect(dealtCards).toHaveLength(3);
    expect(deck.getRemainingCount()).toBe(initialCount - 3);
    
    // Each card should have a position and reversal status
    dealtCards.forEach((cardPosition, index) => {
      expect(cardPosition.position).toBe(index + 1);
      expect(typeof cardPosition.isReversed).toBe('boolean');
      expect(cardPosition.card).toBeDefined();
      expect(cardPosition.card.id).toBeDefined();
      expect(cardPosition.card.name).toBeDefined();
    });
  });

  test('should fan pick cards correctly', () => {
    const initialCount = deck.getRemainingCount();
    const pickedCards = deck.fanPick(2);

    expect(pickedCards).toHaveLength(2);
    expect(deck.getRemainingCount()).toBe(initialCount - 2);
    
    // Each card should have a position and reversal status
    pickedCards.forEach((cardPosition, index) => {
      expect(cardPosition.position).toBe(index + 1);
      expect(typeof cardPosition.isReversed).toBe('boolean');
      expect(cardPosition.card).toBeDefined();
    });
  });

  test('should throw error when dealing more cards than available', () => {
    const availableCards = deck.getRemainingCount();
    expect(() => deck.deal(availableCards + 1)).toThrow();
  });

  test('should reset deck correctly', () => {
    const originalCount = deck.getTotalCount();
    deck.deal(2);
    expect(deck.getRemainingCount()).toBe(originalCount - 2);
    
    deck.reset();
    expect(deck.getRemainingCount()).toBe(originalCount);
  });

  test('should shuffle deck (cards should be in different order)', () => {
    const deck1 = new TarotDeck();
    const deck2 = new TarotDeck();
    
    const cards1 = deck1.deal(4);
    const cards2 = deck2.deal(4);
    
    // While theoretically possible for shuffles to be identical, 
    // it's extremely unlikely with 4 cards
    const sameOrder = cards1.every((card, index) => 
      card.card.id === cards2[index].card.id
    );
    
    // This test might occasionally fail due to randomness, but very unlikely
    expect(sameOrder).toBe(false);
  });

  test('should support strategy-based card selection', () => {
    const deck = new TarotDeck();
    const strategies = deck.getAvailableStrategies();
    
    expect(strategies).toHaveProperty('deal');
    expect(strategies).toHaveProperty('fanpick');
    
    const cards1 = deck.selectCards(3, true, strategies.deal);
    expect(cards1).toHaveLength(3);
    
    deck.reset();
    const cards2 = deck.selectCards(3, true, strategies.fanpick);
    expect(cards2).toHaveLength(3);
  });

  test('should set and get default strategy', () => {
    const deck = new TarotDeck();
    const strategies = deck.getAvailableStrategies();
    
    // Default should be deal strategy
    expect(deck.getDefaultStrategy().name).toBe('deal');
    
    deck.setDefaultStrategy(strategies.fanpick);
    expect(deck.getDefaultStrategy().name).toBe('fanpick');
    
    // Test using default strategy
    const cards = deck.selectCards(2);
    expect(cards).toHaveLength(2);
  });

  test('should initialize with custom default strategy', () => {
    const strategies = CARD_SELECTION_STRATEGIES;
    const deck = new TarotDeck(strategies.fanpick);
    
    expect(deck.getDefaultStrategy().name).toBe('fanpick');
  });
});

describe('SpreadReader', () => {
  let reader: SpreadReader;

  beforeEach(() => {
    reader = new SpreadReader();
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

  test('should perform reading with fan pick', () => {
    const reading = reader.performReading('threeCard', false);
    
    expect(reading.cards).toHaveLength(3);
    expect(reading.spread.name).toBe('Three Card Spread');
  });

  test('should throw error for unknown spread', () => {
    expect(() => reader.performReading('unknownSpread' as any)).toThrow();
  });

  test('should create custom spread', () => {
    const customSpread = reader.createCustomSpread(
      'Custom Test',
      'A test spread',
      [
        { position: 1, name: 'First', meaning: 'First position', dealOrder: 1 },
        { position: 2, name: 'Second', meaning: 'Second position', dealOrder: 2 }
      ]
    );

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

  test('should include visual representation in spreads', () => {
    const spread = reader.getSpread('threeCard');
    expect(spread.visualRepresentation).toBeDefined();
    expect(spread.visualRepresentation).toContain('digraph');
    
    const spread2 = reader.getSpread('crossSpread');
    expect(spread2.visualRepresentation).toBeDefined();
    expect(spread2.visualRepresentation).toContain('digraph');
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
    const customSpread = reader.createCustomSpread(
      'Custom Strategy Test',
      'A test spread with strategy',
      [
        { position: 1, name: 'First', meaning: 'First position', dealOrder: 1 },
        { position: 2, name: 'Second', meaning: 'Second position', dealOrder: 2 }
      ],
      true,
      undefined,
      'fanpick'
    );

    expect(customSpread.preferredStrategy).toBe('fanpick');
    
    const reading = reader.performCustomReading(customSpread);
    expect(reading.cards).toHaveLength(2);
  });

  test('should throw error for unknown strategy', () => {
    expect(() => reader.performReading('threeCard', 'unknownStrategy')).toThrow();
  });

  test('should set default strategy', () => {
    reader.setDefaultStrategy('fanpick');
    
    // Create a spread without preferred strategy to test default
    const customSpread = reader.createCustomSpread(
      'Default Strategy Test',
      'A test spread',
      [{ position: 1, name: 'Only', meaning: 'Only position', dealOrder: 1 }]
    );

    const reading = reader.performCustomReading(customSpread);
    expect(reading.cards).toHaveLength(1);
  });
});

describe('Card Types', () => {
  test('should have correct card structure for major arcana', () => {
    const deck = new TarotDeck();
    const cards = deck.deal(deck.getTotalCount());
    
    const majorCards = cards.filter(cp => cp.card.arcana === Arcana.Major);
    const minorCards = cards.filter(cp => cp.card.arcana === Arcana.Minor);
    
    expect(majorCards.length).toBeGreaterThan(0);
    expect(minorCards.length).toBeGreaterThan(0);
    
    // Check major arcana card structure
    if (majorCards.length > 0) {
      const majorCard = majorCards[0].card as MajorArcanaCard;
      expect(majorCard.arcana).toBe(Arcana.Major);
      expect(majorCard.number).toBeDefined();
      expect(typeof majorCard.number).toBe('number');
      expect('suit' in majorCard).toBe(false);
    }
    
    // Check minor arcana card structure
    if (minorCards.length > 0) {
      const minorCard = minorCards[0].card as MinorArcanaCard;
      expect(minorCard.arcana).toBe(Arcana.Minor);
      expect(minorCard.suit).toBeDefined();
      expect(minorCard.number).toBeDefined();
      expect(typeof minorCard.number).toBe('number');
    }
  });
});