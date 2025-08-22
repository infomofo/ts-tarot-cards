import { loadMajorArcanaCards, loadMinorArcanaCards, loadSuitProperties, loadSpreads } from '../src/data-loader';
import { MajorArcana, MinorArcana, Suit } from '../src/types';

describe('Data Loader', () => {
  it('should load all Major Arcana cards', () => {
    const majorArcanaCards = loadMajorArcanaCards();
    expect(Object.keys(majorArcanaCards)).toHaveLength(22);
    expect(majorArcanaCards[MajorArcana.TheFool]).toBeDefined();
    expect(majorArcanaCards[MajorArcana.TheFool]?.getName()).toBe('The Fool');
  });

  it('should load all Minor Arcana cards', () => {
    const minorArcanaCards = loadMinorArcanaCards();
    expect(Object.keys(minorArcanaCards)).toHaveLength(56);
    expect(minorArcanaCards[MinorArcana.AceOfCups]).toBeDefined();
    expect(minorArcanaCards[MinorArcana.AceOfCups]?.getName()).toBe('Ace of Cups');
  });

  it('should load all suit properties', () => {
    const suitProperties = loadSuitProperties();
    expect(Object.keys(suitProperties)).toHaveLength(4);
    expect(suitProperties[Suit.Cups]).toBeDefined();
    expect(suitProperties[Suit.Cups].element).toBe('Water');
  });

  it('should load all spreads', () => {
    const spreads = loadSpreads();
    expect(Object.keys(spreads)).toHaveLength(5);
    expect(spreads.threeCard).toBeDefined();
    expect(spreads.threeCard.name).toBe('Three Card Spread');
  });
});
