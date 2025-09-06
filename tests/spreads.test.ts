import { SpreadReader, SPREADS, SPREAD_NAMES } from '../src/spreads/spreads';

describe('SpreadReader', () => {
  let reader: SpreadReader;

  beforeEach(() => {
    reader = new SpreadReader();
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

        it('should perform a reading and return a SpreadReading object', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading).toBeDefined();
          expect(reading.spread.name).toBe(spread.name);
          expect(reading.cards.length).toBe(spread.positions.length);
        });

        it('should respect the allowReversals setting', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading.allow_reversals).toBe(spread.allow_reversals);
        });

        it('should have a layout', () => {
          const reading = reader.performReading(spreadName as keyof typeof SPREADS);
          expect(reading.spread.layout).toBeDefined();
          expect(Array.isArray(reading.spread.layout)).toBe(true);
          expect(reading.spread.layout.length).toBe(reading.spread.positions.length);
        });
      });
    });
  });

});
