import { TarotDeck } from '../src/deck/deck';
import { Arcana, MajorArcana, MajorArcanaCard, MinorArcana, MinorArcanaCard, Suit, getMinorNumberName } from '../src/types';
import { SUIT_PROPERTIES } from '../src/cards/suit';
import { getMajorArcanaCard } from '../src/cards/major-arcana';
import { getMinorArcanaCard } from '../src/cards/minor-arcana';
import { getTopText } from '../src/cards/svg-generator';

describe('Card Representations', () => {
  describe('Text Representation', () => {
    test('ace of cups should have correct text', () => {
      const card = getMinorArcanaCard(MinorArcana.AceOfCups) as MinorArcanaCard;
      expect(card.getTextRepresentation()).toBe('[mA☕️]');
    });

    test('ace of swords should have correct text', () => {
        const card = getMinorArcanaCard(MinorArcana.AceOfSwords) as MinorArcanaCard;
        expect(card.getTextRepresentation()).toBe(`[mA${SUIT_PROPERTIES[Suit.Swords].emoji}]`);
    });

    test('face cards should have correct single-letter representation', () => {
        const page = getMinorArcanaCard(MinorArcana.PageOfWands) as MinorArcanaCard;
        const knight = getMinorArcanaCard(MinorArcana.KnightOfWands) as MinorArcanaCard;
        const queen = getMinorArcanaCard(MinorArcana.QueenOfWands) as MinorArcanaCard;
        const king = getMinorArcanaCard(MinorArcana.KingOfWands) as MinorArcanaCard;
        expect(page.getTextRepresentation()).toBe(`[mP${SUIT_PROPERTIES[Suit.Wands].emoji}]`);
        expect(knight.getTextRepresentation()).toBe(`[mN${SUIT_PROPERTIES[Suit.Wands].emoji}]`);
        expect(queen.getTextRepresentation()).toBe(`[mQ${SUIT_PROPERTIES[Suit.Wands].emoji}]`);
        expect(king.getTextRepresentation()).toBe(`[mK${SUIT_PROPERTIES[Suit.Wands].emoji}]`);
    });

    test('number cards should have correct numeric representation', () => {
        const card = getMinorArcanaCard(MinorArcana.TwoOfPentacles) as MinorArcanaCard;
        expect(card.getTextRepresentation()).toBe(`[m2${SUIT_PROPERTIES[Suit.Pentacles].emoji}]`);
    });
  });

  describe('SVG Representation', () => {
    test('should hide title correctly', () => {
        const card = getMinorArcanaCard(MinorArcana.FourOfCups) as MinorArcanaCard;
        const svg = card.getSvg({ hideTitle: true });
        expect(svg).not.toContain(card.getName());
    });

    test('should hide number correctly for numbered card', () => {
        const card = getMinorArcanaCard(MinorArcana.FourOfCups) as MinorArcanaCard;
        const svg = card.getSvg({ hideNumber: true });
        expect(svg).not.toContain(card.romanNumeral);
    });

    test('should hide rank correctly for face card', () => {
        const card = getMinorArcanaCard(MinorArcana.PageOfSwords) as MinorArcanaCard;
        const svg = card.getSvg({ hideNumber: true });
        const topText = getTopText(card);
        // Check that the top text element is not present
        expect(svg).not.toContain(`<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold">${topText}</text>`);
        // Check that the main title, which also contains the word "Page", IS still present
        expect(svg).toContain('>Page of Swords<');
    });

    test('should show correct top text for Ace', () => {
        const card = getMinorArcanaCard(MinorArcana.AceOfWands) as MinorArcanaCard;
        const svg = card.getSvg();
        expect(svg).toContain('>Ace<');
    });

    test('should not show emojis when hidden', () => {
        const card = getMinorArcanaCard(MinorArcana.ThreeOfWands) as MinorArcanaCard;
        const svg = card.getSvg({ hideEmoji: true });
        expect(svg).not.toContain(SUIT_PROPERTIES[Suit.Wands].emoji);
    });

    test('should embed image with data URI', () => {
        const card = getMajorArcanaCard(MajorArcana.TheFool) as MajorArcanaCard;
        const dummyDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
        const svg = card.getSvg({ artOverrideUrl: dummyDataUri });
        expect(svg).toContain('<image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="');
    });
  });
});
