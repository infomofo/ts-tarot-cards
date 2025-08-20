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
    it('should render a spread as SVG', () => {
      const reading = reader.performReading(SPREAD_NAMES.celticCross);
      const svg = renderer.renderAsSvg(reading);
      expect(svg).toBeDefined();
      expect(typeof svg).toBe('string');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('<g transform');
    });
  });
});
