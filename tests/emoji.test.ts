import { TarotDeck } from '../src/deck/deck';
import { Arcana, MajorArcana, MajorArcanaCard, MinorArcanaCard, Suit } from '../src/types';

describe('Tarot Card Emojis', () => {
  let deck: TarotDeck;

  beforeEach(() => {
    deck = new TarotDeck();
  });

  test('every card should have an emoji property', () => {
    const cards = deck.selectCards(deck.getTotalCount());
    cards.forEach(cardPosition => {
      const card = cardPosition.card;
      expect(card.emoji).toBeDefined();
      expect(typeof card.emoji).toBe('string');
      expect(card.emoji.length).toBeGreaterThan(0);
    });
  });

  test('major arcana emojis should have the correct format', () => {
    const cards = deck.selectCards(deck.getTotalCount());
    const majorArcanaCards = cards.filter(cp => cp.card.arcana === Arcana.Major).map(cp => cp.card) as MajorArcanaCard[];

    majorArcanaCards.forEach(card => {
      if (card.emojiOverride) {
        const regex = /^\[M\d{1,2}[^a-zA-Z0-9\s]+\]$/u;
        expect(card.emoji).toMatch(regex);
      } else {
        const regex = /^\[M\d{1,2}-.+\]$/;
        expect(card.emoji).toMatch(regex);
      }
    });
  });

  test('minor arcana emojis should have the correct format', () => {
    const cards = deck.selectCards(deck.getTotalCount());
    const minorArcanaCards = cards.filter(cp => cp.card.arcana === Arcana.Minor).map(cp => cp.card) as MinorArcanaCard[];

    minorArcanaCards.forEach(card => {
      expect(card.emoji.startsWith('[m')).toBe(true);
      expect(card.emoji.endsWith(']')).toBe(true);
      const suitEmoji = {
        [Suit.Cups]: '🍵',
        [Suit.Pentacles]: '🪙',
        [Suit.Swords]: '🗡️',
        [Suit.Wands]: '🪄',
      }[card.suit];
      expect(card.emoji.includes(suitEmoji)).toBe(true);
    });
  });
});
