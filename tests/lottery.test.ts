import { getCardLotteryNumber, getValidCardsForRange } from '../src/cli/card-mapping';
import { MAJOR_ARCANA_CARDS } from '../src/cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../src/cards/minor-arcana';
import { TarotCard, MajorArcana, MinorArcanaCard, Suit, MinorNumber } from '../src/types';

describe('Card to Lottery Number Mapping', () => {
  const allCards: TarotCard[] = [
    ...Object.values(MAJOR_ARCANA_CARDS),
    ...Object.values(MINOR_ARCANA_CARDS),
  ].filter(Boolean) as TarotCard[];

  describe('getCardLotteryNumber', () => {
    it('should return null for The Fool (0)', () => {
      const fool = MAJOR_ARCANA_CARDS[MajorArcana.TheFool];
      if (fool) {
        expect(getCardLotteryNumber(fool)).toBeNull();
      }
    });

    it('should map Major Arcana cards 1-21 to their numbers', () => {
      const magician = MAJOR_ARCANA_CARDS[MajorArcana.TheMagician];
      const world = MAJOR_ARCANA_CARDS[MajorArcana.TheWorld];
      
      if (magician) {
        expect(getCardLotteryNumber(magician)).toBe(1);
      }
      if (world) {
        expect(getCardLotteryNumber(world)).toBe(21);
      }
    });

    it('should map Wands suit to numbers 22-35', () => {
      const wandsCards = allCards.filter(card => 
        card.arcana === 'Minor' && (card as MinorArcanaCard).suit === Suit.Wands
      ) as MinorArcanaCard[];

      expect(wandsCards.length).toBeGreaterThan(0);
      
      // Test specific cards
      const aceOfWands = wandsCards.find(card => card.number === MinorNumber.Ace);
      const kingOfWands = wandsCards.find(card => card.number === MinorNumber.King);
      
      if (aceOfWands) {
        expect(getCardLotteryNumber(aceOfWands)).toBe(22);
      }
      if (kingOfWands) {
        expect(getCardLotteryNumber(kingOfWands)).toBe(35);
      }
    });

    it('should map Cups suit to numbers 36-49', () => {
      const cupsCards = allCards.filter(card => 
        card.arcana === 'Minor' && (card as MinorArcanaCard).suit === Suit.Cups
      ) as MinorArcanaCard[];

      expect(cupsCards.length).toBeGreaterThan(0);
      
      const aceOfCups = cupsCards.find(card => card.number === MinorNumber.Ace);
      const kingOfCups = cupsCards.find(card => card.number === MinorNumber.King);
      
      if (aceOfCups) {
        expect(getCardLotteryNumber(aceOfCups)).toBe(36);
      }
      if (kingOfCups) {
        expect(getCardLotteryNumber(kingOfCups)).toBe(49);
      }
    });

    it('should map Swords suit to numbers 50-63', () => {
      const swordsCards = allCards.filter(card => 
        card.arcana === 'Minor' && (card as MinorArcanaCard).suit === Suit.Swords
      ) as MinorArcanaCard[];

      expect(swordsCards.length).toBeGreaterThan(0);
      
      const aceOfSwords = swordsCards.find(card => card.number === MinorNumber.Ace);
      const kingOfSwords = swordsCards.find(card => card.number === MinorNumber.King);
      
      if (aceOfSwords) {
        expect(getCardLotteryNumber(aceOfSwords)).toBe(50);
      }
      if (kingOfSwords) {
        expect(getCardLotteryNumber(kingOfSwords)).toBe(63);
      }
    });

    it('should map Pentacles suit to numbers 64-77', () => {
      const pentaclesCards = allCards.filter(card => 
        card.arcana === 'Minor' && (card as MinorArcanaCard).suit === Suit.Pentacles
      ) as MinorArcanaCard[];

      expect(pentaclesCards.length).toBeGreaterThan(0);
      
      const aceOfPentacles = pentaclesCards.find(card => card.number === MinorNumber.Ace);
      const kingOfPentacles = pentaclesCards.find(card => card.number === MinorNumber.King);
      
      if (aceOfPentacles) {
        expect(getCardLotteryNumber(aceOfPentacles)).toBe(64);
      }
      if (kingOfPentacles) {
        expect(getCardLotteryNumber(kingOfPentacles)).toBe(77);
      }
    });
  });

  describe('getValidCardsForRange', () => {
    it('should return cards valid for Mega Millions main numbers (1-70)', () => {
      const validCards = getValidCardsForRange(allCards, 1, 70);
      
      // Should include Major Arcana 1-21 and all minor arcana up to 70
      expect(validCards.length).toBeGreaterThan(0);
      
      // Verify all returned cards map to numbers in range
      validCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(70);
      });
    });

    it('should return cards valid for Mega Millions bonus numbers (1-25)', () => {
      const validCards = getValidCardsForRange(allCards, 1, 25);
      
      // Should include Major Arcana 1-21 and some minor arcana
      expect(validCards.length).toBeGreaterThan(0);
      
      // Verify all returned cards map to numbers in range
      validCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(25);
      });
    });

    it('should return cards valid for PowerBall main numbers (1-69)', () => {
      const validCards = getValidCardsForRange(allCards, 1, 69);
      
      expect(validCards.length).toBeGreaterThan(0);
      
      validCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(69);
      });
    });

    it('should return cards valid for PowerBall bonus numbers (1-26)', () => {
      const validCards = getValidCardsForRange(allCards, 1, 26);
      
      expect(validCards.length).toBeGreaterThan(0);
      
      validCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(number).toBeGreaterThanOrEqual(1);
        expect(number).toBeLessThanOrEqual(26);
      });
    });

    it('should exclude The Fool from any valid range', () => {
      const validCards = getValidCardsForRange(allCards, 1, 77);
      const fool = MAJOR_ARCANA_CARDS[MajorArcana.TheFool];
      
      if (fool) {
        expect(validCards).not.toContain(fool);
      }
    });
  });

  describe('card mapping consistency', () => {
    it('should never have duplicate lottery numbers', () => {
      const numbers = new Set<number>();
      
      allCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        if (number !== null) {
          expect(numbers.has(number)).toBe(false);
          numbers.add(number);
        }
      });
    });

    it('should map exactly 77 cards to lottery numbers', () => {
      const validNumbers = allCards
        .map(card => getCardLotteryNumber(card))
        .filter(number => number !== null);
      
      expect(validNumbers.length).toBe(77);
    });

    it('should have consecutive numbers from 1 to 77', () => {
      const numbers = allCards
        .map(card => getCardLotteryNumber(card))
        .filter(number => number !== null)
        .sort((a, b) => a - b);
      
      for (let i = 0; i < numbers.length; i++) {
        expect(numbers[i]).toBe(i + 1);
      }
    });
  });
});