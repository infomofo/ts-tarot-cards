import { SpreadReader } from '../src/spreads/spreads';
import { ALL_SPREADS } from '../src/data';

describe('SpreadReader', () => {
  let reader: SpreadReader;

  beforeEach(() => {
    reader = new SpreadReader();
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

        it('should perform a reading and return a SpreadReading object', () => {
          const reading = reader.performReading(spreadName);
          expect(reading).toBeDefined();
          expect(reading.spread.name).toBe(spread.name);
          expect(reading.cards.length).toBe(spread.positions.length);
        });

        it('should respect the allow_reversals setting', () => {
          const reading = reader.performReading(spreadName);
          expect(reading.allowReversals).toBe(spread.allow_reversals);
        });

        it('should have a layout', () => {
          const reading = reader.performReading(spreadName);
          expect(reading.spread.layout).toBeDefined();
          expect(Array.isArray(reading.spread.layout)).toBe(true);
          expect(reading.spread.layout.length).toBe(reading.spread.positions.length);
        });
      });
    });
  });

});
