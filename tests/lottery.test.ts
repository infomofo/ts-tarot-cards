import { getCardLotteryNumber, drawLotteryCards } from '../src/cli/lottery';
import {
  TarotCard, MajorArcana, MinorArcanaCard, Suit, MinorNumber, Arcana,
} from '../src/types';
import { ALL_CARDS } from '../src/data';
import { TarotDeck } from '../src/deck/deck';

// Mock the TarotDeck
jest.mock('../src/deck/deck', () => ({
  TarotDeck: jest.fn().mockImplementation(() => ({
    selectCards: jest.fn(),
  })),
}));

// Mock console.log to prevent output during tests
const mockedConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Card to Lottery Number Mapping', () => {
  const allCards: TarotCard[] = [...ALL_CARDS];

  describe('getCardLotteryNumber', () => {
    it('should return 0 for The Fool (0)', () => {
      const fool = allCards.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheFool);
      if (fool) {
        expect(getCardLotteryNumber(fool)).toBe(0);
      }
    });

    it('should map Major Arcana cards 1-21 to their numbers', () => {
      const magician = allCards.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheMagician);
      const world = allCards.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheWorld);

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
      const fool = allCards.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheFool);
      expect(fool).toBeDefined();
      if (fool) {
        expect(getCardLotteryNumber(fool)).toBe(0);

        // No other card should map to 0
        const otherCards = allCards.filter(card => card.id !== fool.id);
        otherCards.forEach(card => {
          expect(getCardLotteryNumber(card)).not.toBe(0);
        });
      }
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

describe('drawLotteryCards', () => {
  let deck: TarotDeck;

  const megaMillions = {
    name: 'Mega Millions',
    mainNumbers: {
      count: 5, min: 1, max: 70,
    },
    bonusNumber: { min: 1, max: 25 },
  };

  beforeEach(() => {
    deck = new TarotDeck();
  });

  it('should draw 5 main numbers and 1 bonus number', () => {
    const magician = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheMagician)!;
    const hierophant = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHierophant)!;
    const lovers = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheLovers)!;
    const chariot = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheChariot)!;
    const strength = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.Strength)!;
    const hermit = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHermit)!;

    (deck.selectCards as jest.Mock).mockReturnValueOnce([{ card: magician, isReversed: false }]) // 1
      .mockReturnValueOnce([{ card: hierophant, isReversed: false }]) // 5
      .mockReturnValueOnce([{ card: lovers, isReversed: false }]) // 6
      .mockReturnValueOnce([{ card: chariot, isReversed: false }]) // 7
      .mockReturnValueOnce([{ card: strength, isReversed: false }]) // 8
      .mockReturnValueOnce([{ card: hermit, isReversed: false }]); // 9 (bonus)

    const result = drawLotteryCards(deck, megaMillions);

    expect(result.mainNumbers).toEqual([1, 5, 6, 7, 8]);
    expect(result.bonusNumber).toBe(9);
    expect(result.quickPickCount).toBe(0);
    expect(result.drawnCards.length).toBe(6);
  });

  it('should re-draw main numbers if they are out of range', () => {
    const kingOfPentacles = ALL_CARDS.find(c => c.arcana === Arcana.Minor && (c as MinorArcanaCard).suit === Suit.Pentacles && (c as MinorArcanaCard).number === MinorNumber.King)!;
    const magician = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheMagician)!;
    const hierophant = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHierophant)!;
    const lovers = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheLovers)!;
    const chariot = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheChariot)!;
    const strength = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.Strength)!;
    const hermit = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHermit)!;

    (deck.selectCards as jest.Mock).mockReturnValueOnce([{ card: kingOfPentacles, isReversed: false }]) // 77 (invalid)
      .mockReturnValueOnce([{ card: magician, isReversed: false }]) // 1
      .mockReturnValueOnce([{ card: hierophant, isReversed: false }]) // 5
      .mockReturnValueOnce([{ card: lovers, isReversed: false }]) // 6
      .mockReturnValueOnce([{ card: chariot, isReversed: false }]) // 7
      .mockReturnValueOnce([{ card: strength, isReversed: false }]) // 8
      .mockReturnValueOnce([{ card: hermit, isReversed: false }]); // 9 (bonus)

    const result = drawLotteryCards(deck, megaMillions);

    expect(result.mainNumbers).toEqual([1, 5, 6, 7, 8]);
    expect(result.bonusNumber).toBe(9);
    expect(result.quickPickCount).toBe(0);
    expect(result.drawnCards.length).toBe(7); // 1 invalid + 5 valid main + 1 bonus
    expect(result.drawnCards[0].lotteryNumber).toBe(77);
  });

  it('should handle bonus number re-draws correctly', () => {
    const magician = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheMagician)!;
    const hierophant = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHierophant)!;
    const lovers = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheLovers)!;
    const chariot = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheChariot)!;
    const strength = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.Strength)!;
    const aceOfSwords = ALL_CARDS.find(c => c.arcana === Arcana.Minor && (c as MinorArcanaCard).suit === Suit.Swords && (c as MinorArcanaCard).number === MinorNumber.Ace)!;
    const hermit = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHermit)!;

    (deck.selectCards as jest.Mock).mockReturnValueOnce([{ card: magician, isReversed: false }]) // 1
      .mockReturnValueOnce([{ card: hierophant, isReversed: false }]) // 5
      .mockReturnValueOnce([{ card: lovers, isReversed: false }]) // 6
      .mockReturnValueOnce([{ card: chariot, isReversed: false }]) // 7
      .mockReturnValueOnce([{ card: strength, isReversed: false }]) // 8
      .mockReturnValueOnce([{ card: aceOfSwords, isReversed: false }]) // 50 (invalid bonus)
      .mockReturnValueOnce([{ card: hermit, isReversed: false }]); // 9 (valid bonus)

    const result = drawLotteryCards(deck, megaMillions);

    expect(result.mainNumbers).toEqual([1, 5, 6, 7, 8]);
    expect(result.bonusNumber).toBe(9);
    expect(result.quickPickCount).toBe(0);
    expect(result.drawnCards.length).toBe(7); // 5 main + 1 invalid bonus + 1 valid bonus
  });

  it('should correctly handle reversed cards', () => {
    const magician = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheMagician)!;
    const hierophant = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHierophant)!;
    const lovers = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheLovers)!;
    const chariot = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheChariot)!;
    const strength = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.Strength)!;
    const hermit = ALL_CARDS.find(c => c.arcana === Arcana.Major && c.number === MajorArcana.TheHermit)!;

    (deck.selectCards as jest.Mock).mockReturnValueOnce([{ card: magician, isReversed: true }]) // 1
      .mockReturnValueOnce([{ card: hierophant, isReversed: false }]) // 5
      .mockReturnValueOnce([{ card: lovers, isReversed: true }]) // 6
      .mockReturnValueOnce([{ card: chariot, isReversed: false }]) // 7
      .mockReturnValueOnce([{ card: strength, isReversed: true }]) // 8
      .mockReturnValueOnce([{ card: hermit, isReversed: false }]); // 9 (bonus)

    const result = drawLotteryCards(deck, megaMillions);

    expect(result.mainNumbers).toEqual([1, 5, 6, 7, 8]);
    expect(result.bonusNumber).toBe(9);
    expect(result.quickPickCount).toBe(0);
    expect(result.drawnCards.length).toBe(6);
    expect(result.drawnCards[0].isReversed).toBe(true);
    expect(result.drawnCards[1].isReversed).toBe(false);
    expect(result.drawnCards[2].isReversed).toBe(true);
    expect(result.drawnCards[3].isReversed).toBe(false);
    expect(result.drawnCards[4].isReversed).toBe(true);
    expect(result.drawnCards[5].isReversed).toBe(false);
  });
});