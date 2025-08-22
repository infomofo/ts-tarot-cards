"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spreads_1 = require("../src/spreads/spreads");
describe('SpreadReader', () => {
    let reader;
    beforeEach(() => {
        reader = new spreads_1.SpreadReader();
    });
    describe('getSpread', () => {
        it('should return a specific spread template', () => {
            const spread = reader.getSpread(spreads_1.SPREAD_NAMES.threeCard);
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
            expect(spreadNames).toContain(spreads_1.SPREAD_NAMES.threeCard);
            expect(spreadNames).toContain(spreads_1.SPREAD_NAMES.crossSpread);
        });
    });
    describe('performReading', () => {
        Object.keys(spreads_1.SPREADS).forEach(spreadName => {
            describe(`for ${spreadName} spread`, () => {
                const spread = spreads_1.SPREADS[spreadName];
                it('should perform a reading and return a SpreadReading object', () => {
                    const reading = reader.performReading(spreadName);
                    expect(reading).toBeDefined();
                    expect(reading.spread.name).toBe(spread.name);
                    expect(reading.cards.length).toBe(spread.positions.length);
                });
                it('should respect the allowReversals setting', () => {
                    const reading = reader.performReading(spreadName);
                    expect(reading.allowReversals).toBe(spread.allowReversals);
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
//# sourceMappingURL=spreads.test.js.map