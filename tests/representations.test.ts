import { Arcana, Suit, MinorArcanaCard, MajorArcanaCard } from '../src/types';
import { ALL_CARDS, ALL_SUIT_PROPS } from '../src/data';
import { getTopText } from '../src/cards/svg-generator';

describe('Card Representations', () => {
  describe('Text Representation', () => {
    test('ace of cups should have correct text', () => {
      const card = ALL_CARDS.find(c => c.id === 'minor-ace-of-cups') as MinorArcanaCard;
      // The old special case '☕️' is gone, now it uses the consistent suit emoji '🍵'
      expect(card.getTextRepresentation()).toBe(`[mA${ALL_SUIT_PROPS[Suit.Cups].emoji}]`);
    });

    test('ace of swords should have correct text', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-ace-of-swords') as MinorArcanaCard;
        expect(card.getTextRepresentation()).toBe(`[mA${ALL_SUIT_PROPS[Suit.Swords].emoji}]`);
    });

    test('face cards should have correct single-letter representation', () => {
        const page = ALL_CARDS.find(c => c.id === 'minor-page-of-wands') as MinorArcanaCard;
        const knight = ALL_CARDS.find(c => c.id === 'minor-knight-of-wands') as MinorArcanaCard;
        const queen = ALL_CARDS.find(c => c.id === 'minor-queen-of-wands') as MinorArcanaCard;
        const king = ALL_CARDS.find(c => c.id === 'minor-king-of-wands') as MinorArcanaCard;
        expect(page.getTextRepresentation()).toBe(`[mP${ALL_SUIT_PROPS[Suit.Wands].emoji}]`);
        expect(knight.getTextRepresentation()).toBe(`[mN${ALL_SUIT_PROPS[Suit.Wands].emoji}]`);
        expect(queen.getTextRepresentation()).toBe(`[mQ${ALL_SUIT_PROPS[Suit.Wands].emoji}]`);
        expect(king.getTextRepresentation()).toBe(`[mK${ALL_SUIT_PROPS[Suit.Wands].emoji}]`);
    });

    test('number cards should have correct numeric representation', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-two-of-pentacles') as MinorArcanaCard;
        expect(card.getTextRepresentation()).toBe(`[m2${ALL_SUIT_PROPS[Suit.Pentacles].emoji}]`);
    });
  });

  describe('SVG Representation', () => {
    test('should hide title correctly', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-four-of-cups') as MinorArcanaCard;
        const svg = card.getSvg({ hideTitle: true });
        expect(svg).not.toContain(card.getName());
    });

    test('should hide number correctly for numbered card', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-four-of-cups') as MinorArcanaCard;
        const svg = card.getSvg({ hideNumber: true });
        expect(svg).not.toContain(card.romanNumeral);
    });

    test('should hide rank correctly for face card', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-page-of-swords') as MinorArcanaCard;
        const svg = card.getSvg({ hideNumber: true });
        const topText = getTopText(card);
        // Check that the top text element is not present
        expect(svg).not.toContain(`<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold">${topText}</text>`);
        // Check that the main title, which also contains the word "Page", IS still present
        expect(svg).toContain('>Page of Swords<');
    });

    test('should show correct top text for Ace', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-ace-of-wands') as MinorArcanaCard;
        const svg = card.getSvg();
        expect(svg).toContain('>Ace<');
    });

    test('should not show emojis when hidden', () => {
        const card = ALL_CARDS.find(c => c.id === 'minor-three-of-wands') as MinorArcanaCard;
        const svg = card.getSvg({ hideEmoji: true });
        expect(svg).not.toContain(ALL_SUIT_PROPS[Suit.Wands].emoji);
    });

    test('should embed image with data URI', () => {
        const card = ALL_CARDS.find(c => c.id === 'major-00-the-fool') as MajorArcanaCard;
        const dummyDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        const svg = card.getSvg({ artOverrideUrl: dummyDataUri });
        expect(svg).toContain('<image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="');
    });
  });
});
