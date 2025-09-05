import { getLotteryNumbers, getCardLotteryNumber } from '../src/cli/lottery';
import { MAJOR_ARCANA_CARDS } from '../src/cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../src/cards/minor-arcana';
import { TarotCard, MajorArcana, MinorArcanaCard, Suit, MinorNumber, Arcana } from '../src/types';

describe('Card to Lottery Number Mapping', () => {
  const allCards: TarotCard[] = [
    ...Object.values(MAJOR_ARCANA_CARDS),
    ...Object.values(MINOR_ARCANA_CARDS),
  ].filter(Boolean) as TarotCard[];

  describe('getCardLotteryNumber', () => {
    it('should return 0 for The Fool (0)', () => {
      const fool = MAJOR_ARCANA_CARDS[MajorArcana.TheFool];
      if (fool) {
        expect(getCardLotteryNumber(fool)).toBe(0);
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
        card.arcana === Arcana.Minor && (card as MinorArcanaCard).suit === Suit.Wands
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
        card.arcana === Arcana.Minor && (card as MinorArcanaCard).suit === Suit.Cups
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
        card.arcana === Arcana.Minor && (card as MinorArcanaCard).suit === Suit.Swords
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
        card.arcana === Arcana.Minor && (card as MinorArcanaCard).suit === Suit.Pentacles
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

  describe('comprehensive card mapping coverage', () => {
    it('should map all cards in the deck to exactly one number', () => {
      const mappedNumbers = new Set<number>();
      let cardCount = 0;
      
      allCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(number).toBeGreaterThanOrEqual(0);
        expect(number).toBeLessThanOrEqual(77);
        expect(mappedNumbers.has(number)).toBe(false);
        mappedNumbers.add(number);
        cardCount += 1;
      });
      
      // Should have 78 cards total (22 major + 56 minor)
      expect(cardCount).toBe(78);
      expect(mappedNumbers.size).toBe(78);
    });

    it('should have continuous coverage for all numbers 0-77', () => {
      const mappedNumbers = allCards
        .map(card => getCardLotteryNumber(card))
        .sort((a, b) => a - b);
      
      // Should have consecutive numbers from 0 to 77
      for (let i = 0; i <= 77; i++) {
        expect(mappedNumbers).toContain(i);
      }
      
      // Should have exactly 78 numbers (0-77)
      expect(mappedNumbers.length).toBe(78);
    });

    it('should map The Fool to 0 and no other card to 0', () => {
      const fool = MAJOR_ARCANA_CARDS[MajorArcana.TheFool];
      expect(fool).toBeDefined();
      expect(getCardLotteryNumber(fool!)).toBe(0);
      
      // No other card should map to 0
      const otherCards = allCards.filter(card => card !== fool);
      otherCards.forEach(card => {
        expect(getCardLotteryNumber(card)).not.toBe(0);
      });
    });
  });

  describe('card mapping consistency', () => {
    it('should never have duplicate lottery numbers', () => {
      const numbers = new Set<number>();
      
      allCards.forEach(card => {
        const number = getCardLotteryNumber(card);
        expect(numbers.has(number)).toBe(false);
        numbers.add(number);
      });
    });

    it('should map exactly 78 cards to lottery numbers', () => {
      const validNumbers = allCards.map(card => getCardLotteryNumber(card));
      expect(validNumbers.length).toBe(78);
    });

    it('should have consecutive numbers from 0 to 77', () => {
      const numbers = allCards
        .map(card => getCardLotteryNumber(card))
        .sort((a, b) => a - b);
      
      for (let i = 0; i < numbers.length; i++) {
        expect(numbers[i]).toBe(i);
      }
    });
  });
});