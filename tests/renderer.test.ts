import { SpreadReader, SPREAD_NAMES } from '../src/spreads/spreads';
import { SpreadRenderer } from '../src/spreads/renderer';

describe('SpreadRenderer', () => {
  let reader: SpreadReader;
  let renderer: SpreadRenderer;

  beforeEach(() => {
    reader = new SpreadReader();
    renderer = new SpreadRenderer();
  });

  describe('renderAsText', () => {
    it('should render a spread as text', () => {
      const reading = reader.performReading(SPREAD_NAMES.threeCard);
      const text = renderer.renderAsText(reading);
      expect(text).toBeDefined();
      expect(typeof text).toBe('string');
      reading.cards.forEach(cardPosition => {
        expect(text).toContain(cardPosition.card.getTextRepresentation(cardPosition.isReversed));
      });
    });
  });

  describe('renderAsSvg', () => {
    it('should render a non-animated spread as SVG using g tags and scaling', () => {
      const reading = reader.performReading(SPREAD_NAMES.celticCross);
      const svg = renderer.renderAsSvg(reading, false);
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</g>');
      // Check for scale transform, which is indicative of non-animated spread
      expect(svg).toContain('scale(0.333');
      expect(svg).not.toContain('<image transform');
    });

    it('should render an animated spread as SVG using g tags without scaling', () => {
      const reading = reader.performReading(SPREAD_NAMES.celticCross);
      const svg = renderer.renderAsSvg(reading, true);
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</g>');
      expect(svg).not.toContain('scale(0.333');
      expect(svg).not.toContain('<image transform');
    });

    it('should maintain card uniqueness in the SVG output', () => {
      const reading = reader.performReading(SPREAD_NAMES.celticCross);
      const svg = renderer.renderAsSvg(reading, false);
      const cardNames = reading.cards.map(c => c.card.getName());
      const uniqueCardNames = [...new Set(cardNames)];

      for (const name of uniqueCardNames) {
        const occurrences = (svg.match(new RegExp(name, 'g')) || []).length;
        expect(occurrences).toBe(1);
      }
    });
  });
});
