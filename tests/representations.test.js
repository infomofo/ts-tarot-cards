"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../src/types");
const suit_1 = require("../src/cards/suit");
const major_arcana_1 = require("../src/cards/major-arcana");
const minor_arcana_1 = require("../src/cards/minor-arcana");
const svg_generator_1 = require("../src/cards/svg-generator");
describe('Card Representations', () => {
    describe('Text Representation', () => {
        test('ace of cups should have correct text', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.AceOfCups);
            expect(card.getTextRepresentation()).toBe('[mA☕️]');
        });
        test('ace of swords should have correct text', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.AceOfSwords);
            expect(card.getTextRepresentation()).toBe(`[mA${suit_1.SUIT_PROPERTIES[types_1.Suit.Swords].emoji}]`);
        });
        test('face cards should have correct single-letter representation', () => {
            const page = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.PageOfWands);
            const knight = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.KnightOfWands);
            const queen = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.QueenOfWands);
            const king = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.KingOfWands);
            expect(page.getTextRepresentation()).toBe(`[mP${suit_1.SUIT_PROPERTIES[types_1.Suit.Wands].emoji}]`);
            expect(knight.getTextRepresentation()).toBe(`[mN${suit_1.SUIT_PROPERTIES[types_1.Suit.Wands].emoji}]`);
            expect(queen.getTextRepresentation()).toBe(`[mQ${suit_1.SUIT_PROPERTIES[types_1.Suit.Wands].emoji}]`);
            expect(king.getTextRepresentation()).toBe(`[mK${suit_1.SUIT_PROPERTIES[types_1.Suit.Wands].emoji}]`);
        });
        test('number cards should have correct numeric representation', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.TwoOfPentacles);
            expect(card.getTextRepresentation()).toBe(`[m2${suit_1.SUIT_PROPERTIES[types_1.Suit.Pentacles].emoji}]`);
        });
    });
    describe('SVG Representation', () => {
        test('should hide title correctly', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.FourOfCups);
            const svg = card.getSvg({ hide_title: true });
            expect(svg).not.toContain(card.getName());
        });
        test('should hide number correctly for numbered card', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.FourOfCups);
            const svg = card.getSvg({ hide_number: true });
            expect(svg).not.toContain(card.romanNumeral);
        });
        test('should hide rank correctly for face card', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.PageOfSwords);
            const svg = card.getSvg({ hide_number: true });
            const topText = (0, svg_generator_1.getTopText)(card);
            // Check that the top text element is not present
            expect(svg).not.toContain(`<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold">${topText}</text>`);
            // Check that the main title, which also contains the word "Page", IS still present
            expect(svg).toContain('>Page of Swords<');
        });
        test('should show correct top text for Ace', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.AceOfWands);
            const svg = card.getSvg();
            expect(svg).toContain('>Ace<');
        });
        test('should not show emojis when hidden', () => {
            const card = (0, minor_arcana_1.getMinorArcanaCard)(types_1.MinorArcana.ThreeOfWands);
            const svg = card.getSvg({ hide_emoji: true });
            expect(svg).not.toContain(suit_1.SUIT_PROPERTIES[types_1.Suit.Wands].emoji);
        });
        test('should embed image with data URI', () => {
            const card = (0, major_arcana_1.getMajorArcanaCard)(types_1.MajorArcana.TheFool);
            const dummyDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
            const svg = card.getSvg({ art_override_url: dummyDataUri });
            expect(svg).toContain('<image href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="');
        });
    });
});
//# sourceMappingURL=representations.test.js.map