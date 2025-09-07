import { SpreadReader } from '../src/spreads/spreads';
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
      const reading = reader.performReading('threeCard');
      const text = renderer.renderAsText(reading);
      expect(text).toBeDefined();
      expect(typeof text).toBe('string');
      reading.cards.forEach(cardPosition => {
        expect(text).toContain(cardPosition.card.getTextRepresentation(cardPosition.isReversed));
      });
    });
  });

  describe('renderAsSvg', () => {
    it('should render a non-animated spread as SVG using image tags', () => {
      const reading = reader.performReading('celticCross');
      const svg = renderer.renderAsSvg(reading, false);
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg).toMatch(/^<svg width="560" height="826.6666666666666"/);
      expect(svg).toContain('</svg>');
      expect(svg).toContain('<image transform');
      expect(svg).not.toContain('<g transform');
    });

    it('should render an animated spread as SVG using g tags', () => {
      const reading = reader.performReading('celticCross');
      const svg = renderer.renderAsSvg(reading, true);
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</g>');
      expect(svg).not.toContain('<image');
    });
  });
});
