import { SpreadReader } from '../src/spreads/spreads';
import { TarotDeck } from '../src/deck/deck';
import { ALL_CARDS, ALL_SPREADS } from '../src/data';
import { MajorArcana, SpreadPosition } from '../src/types';

// Mock the TarotDeck
jest.mock('../src/deck/deck', () => ({
  TarotDeck: jest.fn().mockImplementation(() => ({
    selectCards: jest.fn(),
    getDefaultCardSelectionStrategy: jest.fn(),
  })),
}));

describe('SpreadReader', () => {
  let reader: SpreadReader;
  let deck: TarotDeck;

  beforeEach(() => {
    deck = new TarotDeck();
    reader = new SpreadReader(deck);
    (deck.selectCards as jest.Mock).mockReturnValue([]);
  });

  describe('getSpread', () => {
    it('should return a specific spread template', () => {
      const spread = reader.getSpread('threeCard');
      expect(spread).toBeDefined();
      expect(spread.name).toBe('Three Card Spread');
    });

    it('should throw an error for an unknown spread', () => {
      expect(() => reader.getSpread('unknownSpread')).toThrow('Unknown spread: unknownSpread');
    });
  });

  describe('getAvailableSpreads', () => {
    it('should return an array of available spread names', () => {
      const spreadNames = reader.getAvailableSpreads();
      expect(spreadNames).toContain('threeCard');
      expect(spreadNames).toContain('crossSpread');
    });
  });

  describe('performReading', () => {
    Object.keys(ALL_SPREADS).forEach(spreadName => {
      describe(`for ${spreadName} spread`, () => {
        const spread = ALL_SPREADS[spreadName];

        beforeEach(() => {
          const mockCards = spread.positions.map((p: SpreadPosition, i: number) => ({
            card: ALL_CARDS[i],
            position: p.position,
            isReversed: false,
          }));
          (deck.selectCards as jest.Mock).mockReturnValue(mockCards);
        });

        it('should perform a reading and return a SpreadReading object', () => {
          const reading = reader.performReading(spreadName);
          expect(reading).toBeDefined();
          expect(reading.spread.name).toBe(spread.name);
          expect(reading.cards.length).toBe(spread.positions.length);
        });

        it('should respect the allow_reversals setting', () => {
          const reading = reader.performReading(spreadName);
          expect(reading.allow_reversals).toBe(spread.allow_reversals);
        });

        it('should have a layout', () => {
          const reading = reader.performReading(spreadName);
          expect(reading.spread.layout).toBeDefined();
          expect(Array.isArray(reading.spread.layout)).toBe(true);
          expect(reading.spread.layout.length).toBe(reading.spread.positions.length);
        });
      });
    });

    describe('reversal logic', () => {
      it('should respect the isReversed flag when allow_reversals is true', () => {
        const mockCards = [
          { card: ALL_CARDS.find(c => c.number === MajorArcana.TheFool), position: 1, isReversed: true },
          { card: ALL_CARDS.find(c => c.number === MajorArcana.TheMagician), position: 2, isReversed: false },
        ];
        (deck.selectCards as jest.Mock).mockReturnValue(mockCards);

        const reading = reader.performReading('threeCard');
        expect(reading.cards[0].isReversed).toBe(true);
        expect(reading.cards[1].isReversed).toBe(false);
      });

      it('should override the isReversed flag when allow_reversals is false', () => {
        const mockCards = [
          { card: ALL_CARDS.find(c => c.number === MajorArcana.TheFool), position: 1, isReversed: true },
          { card: ALL_CARDS.find(c => c.number === MajorArcana.TheMagician), position: 2, isReversed: false },
        ];
        (deck.selectCards as jest.Mock).mockReturnValue(mockCards);

        const reading = reader.performReading('simplePastPresent');
        expect(reading.cards[0].isReversed).toBe(false);
        expect(reading.cards[1].isReversed).toBe(false);
      });
    });
  });

});
