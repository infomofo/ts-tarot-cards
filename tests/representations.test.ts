import { TarotDeck } from '../src/deck/deck';
import { Arcana, MajorArcanaCard, MinorArcanaCard, Suit } from '../src/types';

describe('Card Representations', () => {
  let deck: TarotDeck;

  beforeEach(() => {
    deck = new TarotDeck();
  });

  describe('Text Representation', () => {
    test('every card should have a text representation', () => {
      const cards = deck.selectCards(deck.getTotalCount());
      cards.forEach(cardPosition => {
        const card = cardPosition.card;
        expect(card.getTextRepresentation()).toBeDefined();
        expect(typeof card.getTextRepresentation()).toBe('string');
        expect(card.getTextRepresentation().length).toBeGreaterThan(0);
      });
    });

    test('major arcana text representation should have the correct format', () => {
      const cards = deck.selectCards(deck.getTotalCount());
      const majorArcanaCards = cards.filter(cp => cp.card.arcana === Arcana.Major).map(cp => cp.card) as MajorArcanaCard[];

      majorArcanaCards.forEach(card => {
        if (card.emoji) {
          const regex = /^\[M\d{1,2}[^a-zA-Z0-9\s]+\]$/u;
          expect(card.getTextRepresentation()).toMatch(regex);
        } else {
          const regex = /^\[M\d{1,2}-.+\]$/;
          expect(card.getTextRepresentation()).toMatch(regex);
        }
      });
    });

    test('minor arcana text representation should have the correct format', () => {
      const cards = deck.selectCards(deck.getTotalCount());
      const minorArcanaCards = cards.filter(cp => cp.card.arcana === Arcana.Minor).map(cp => cp.card) as MinorArcanaCard[];

      minorArcanaCards.forEach(card => {
        expect(card.getTextRepresentation().startsWith('[m')).toBe(true);
        expect(card.getTextRepresentation().endsWith(']')).toBe(true);
        const suitEmoji = {
          [Suit.Cups]: '🍵',
          [Suit.Pentacles]: '🪙',
          [Suit.Swords]: '🗡️',
          [Suit.Wands]: '🪄',
        }[card.suit];
        expect(card.getTextRepresentation().includes(suitEmoji)).toBe(true);
      });
    });
  });

  describe('SVG Representation', () => {
    test('every card should have an SVG representation', () => {
      const cards = deck.selectCards(deck.getTotalCount());
      cards.forEach(cardPosition => {
        const card = cardPosition.card;
        const svg = card.getSvg();
        expect(svg).toBeDefined();
        expect(typeof svg).toBe('string');
        expect(svg.trim().startsWith('<svg')).toBe(true);
        expect(svg.trim().endsWith('</svg>')).toBe(true);
      });
    });
  });
});
