import { SpreadReader, SPREADS, SPREAD_NAMES } from '../src/spreads/spreads';
import { TarotDeck } from '../src/deck/deck';
import { MAJOR_ARCANA_CARDS } from '../src/cards/major-arcana';
import { MajorArcana } from '../src/types';

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
      const spread = reader.getSpread(SPREAD_NAMES.threeCard);
      expect(spread).toBeDefined();
      expect(spread.name).toBe('Three Card Spread');
    });

    it('should throw an error for an unknown spread', () => {
      expect(() => reader.getSpread('unknownSpread' as any)).toThrow('Unknown spread: unknownSpread');
    });
  });

  describe('getAvailableSpreads', () => {
    it('should return an array of available spread names', () => {
      const spreadNames = reader.getAvailableSpreads();
      expect(spreadNames).toContain(SPREAD_NAMES.threeCard);
      expect(spreadNames).toContain(SPREAD_NAMES.crossSpread);
    });
  });

  describe('performReading', () => {
    Object.keys(SPREADS).forEach(spreadName => {
      describe(`for ${spreadName} spread`, () => {
        const spread = SPREADS[spreadName];

        beforeEach(() => {
          const majorArcanaKeys = Object.keys(MajorArcana).filter(k => isNaN(Number(k))) as (keyof typeof MajorArcana)[];
          const mockCards = spread.positions.map((p, i) => ({
            card: MAJOR_ARCANA_CARDS[MajorArcana[majorArcanaKeys[i]]],
            position: p.position,
            isReversed: false,
          }));
          (deck.selectCards as jest.Mock).mockReturnValue(mockCards);
        });

        it('should perform a reading and return a SpreadReading object', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading).toBeDefined();
          expect(reading.spread.name).toBe(spread.name);
          expect(reading.cards.length).toBe(spread.positions.length);
        });

        it('should respect the allowReversals setting', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading.allowReversals).toBe(spread.allowReversals);
        });

        it('should have a layout', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading.spread.layout).toBeDefined();
          expect(Array.isArray(reading.spread.layout)).toBe(true);
          expect(reading.spread.layout.length).toBe(reading.spread.positions.length);
        });
      });
    });

    describe('reversal logic', () => {
      it('should respect the isReversed flag when allowReversals is true', () => {
        const mockCards = [
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: true },
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheMagician], position: 2, isReversed: false },
        ];
        (deck.selectCards as jest.Mock).mockReturnValue(mockCards);

        const reading = reader.performReading(SPREAD_NAMES.threeCard);
        expect(reading.cards[0].isReversed).toBe(true);
        expect(reading.cards[1].isReversed).toBe(false);
      });

      it('should override the isReversed flag when allowReversals is false', () => {
        const mockCards = [
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: true },
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheMagician], position: 2, isReversed: false },
        ];
        (deck.selectCards as jest.Mock).mockReturnValue(mockCards);

        const reading = reader.performReading(SPREAD_NAMES.simplePastPresent);
        expect(reading.cards[0].isReversed).toBe(false);
        expect(reading.cards[1].isReversed).toBe(false);
      });
    });
  });

});
