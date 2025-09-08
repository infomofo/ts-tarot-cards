import { loadAllData } from '../src/data-loader';

describe('Data Loader', () => {
  const rawData = loadAllData();

  describe('Major Arcana', () => {
    it('should load all 22 Major Arcana cards', () => {
      expect(rawData.majorArcana).toHaveLength(22);
    });

    it('should load The Fool correctly', () => {
      const fool = rawData.majorArcana.find(card => card.number === 0);
      expect(fool).toBeDefined();
      expect(fool?.name).toBe('The Fool');
      expect(fool?.keywords).toContain('innocence');
    });

    it('should load The World correctly', () => {
        const world = rawData.majorArcana.find(card => card.number === 21);
        expect(world).toBeDefined();
        expect(world?.name).toBe('The World');
        expect(world?.keywords).toContain('completion');
    });
  });

  describe('Minor Arcana', () => {
    it('should load 4 minor arcana suit files', () => {
      expect(rawData.minorArcana).toHaveLength(4);
    });

    it('should load 14 cards for each suit', () => {
      rawData.minorArcana.forEach(suitFile => {
        expect(suitFile.cards).toHaveLength(14);
      });
    });

    it('should load the Ace of Cups correctly', () => {
        const cupsFile = rawData.minorArcana.find(sf => sf.cards[0].name.includes('Cups'));
        const aceOfCups = cupsFile?.cards.find(c => c.name === 'Ace of Cups');
        expect(aceOfCups).toBeDefined();
        expect(aceOfCups?.number).toBe(1);
        expect(aceOfCups?.keywords).toContain('love');
    });
  });

  describe('Suits', () => {
    it('should load 4 suits', () => {
      expect(rawData.suits).toHaveLength(4);
    });

    it('should load Cups suit properties correctly', () => {
        const cups = rawData.suits.find(s => s.name === 'Cups');
        expect(cups).toBeDefined();
        expect(cups?.element).toBe('Water');
        expect(cups?.emoji).toBe('🍵');
    });
  });

  describe('Spreads', () => {
    it('should load spreads', () => {
      expect(Object.keys(rawData.spreads).length).toBeGreaterThan(0);
    });

    it('should load the threeCard spread correctly', () => {
        const threeCard = rawData.spreads.threeCard;
        expect(threeCard).toBeDefined();
        expect(threeCard.name).toBe('Three Card Spread');
        expect(threeCard.positions).toHaveLength(3);
    });
  });

  describe('Tags', () => {
    it('should load tags', () => {
      expect(Object.keys(rawData.tags).length).toBeGreaterThan(0);
    });

    it('should load the lion tag correctly', () => {
        const lion = rawData.tags.lion;
        expect(lion).toBeDefined();
        expect(lion.name).toBe('lion');
    });
  });

  describe('Numerology', () => {
    it('should load numerology data', () => {
        expect(Object.keys(rawData.numerology).length).toBeGreaterThan(0);
    });

    it('should load data for number 1 correctly', () => {
        const one = rawData.numerology[1];
        expect(one).toBeDefined();
    });
  });
});
