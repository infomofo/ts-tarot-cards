import { TarotDeck } from '../src/deck/deck';
import { Arcana, MajorArcana, MajorArcanaCard, MinorArcana, MinorArcanaCard, Suit } from '../src/types';
import { SUIT_PROPERTIES } from '../src/cards/suit';
import { getMajorArcanaCard } from '../src/cards/major-arcana';
import { getMinorArcanaCard } from '../src/cards/minor-arcana';

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
        const suitEmoji = SUIT_PROPERTIES[card.suit].emoji;
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

    test('major arcana should hide elements correctly', () => {
      const card = getMajorArcanaCard(MajorArcana.TheMagician) as MajorArcanaCard;
      const svg = card.getSvg({ hide_number: true, hide_title: true, hide_emoji: true });
      expect(svg).not.toContain('font-weight="bold"');
      if (card.emoji) {
        expect(svg).not.toContain(card.emoji);
      }
    });

    test('minor arcana number card should hide elements correctly', () => {
      const card = getMinorArcanaCard(MinorArcana.EightOfCups) as MinorArcanaCard;
      const svg = card.getSvg({ hide_number: true, hide_emoji: true });
      expect(svg).not.toContain('font-weight="bold"');
      expect(svg).not.toContain(SUIT_PROPERTIES[card.suit].emoji);
    });

    test('minor arcana face card should hide elements correctly', () => {
      const card = getMinorArcanaCard(MinorArcana.KingOfWands) as MinorArcanaCard;
      const svg = card.getSvg({ hide_number: true, hide_emoji: true, hide_title: true });
      expect(svg).not.toContain('font-weight="bold"');
      if (card.faceCardEmoji) {
        expect(svg).not.toContain(card.faceCardEmoji);
      }
    });
  });
});
