/* eslint-disable no-console */
import inquirer from 'inquirer';
import { TarotDeck } from '../deck/deck';
import {
  TarotCard, Arcana, MinorArcanaCard, Suit,
} from '../types';
import { getGenericAiInterpretation, InterpretationContext } from './openai';
import { loadPrompts, formatPrompt } from './prompts';

/**
 * Maps a tarot card to its lottery number according to the specified methodology:
 * - The Fool (0) maps to 0
 * - Major Arcana 1-21 (The Magician to The World)
 * - Minor Arcana by suit order: Wands (22-35), Cups (36-49), Swords (50-63), Pentacles (64-77)
 */
export function getCardLotteryNumber(card: TarotCard): number {
  if (card.arcana === Arcana.Major) {
    // The Fool (0) maps to 0, all other Major Arcana map to their numbers
    return card.number as number;
  }

  if (card.arcana === Arcana.Minor) {
    const minorCard = card as MinorArcanaCard;

    // Base number for each suit (starting positions)
    const suitBase = {
      [Suit.Wands]: 22, // 22-35
      [Suit.Cups]: 36, // 36-49
      [Suit.Swords]: 50, // 50-63
      [Suit.Pentacles]: 64, // 64-77
    };

    const base = suitBase[minorCard.suit];
    // Minor arcana numbers are 1-14 (Ace=1 through King=14)
    // Subtract 1 to make it 0-indexed for addition to base
    return base + (minorCard.number as number) - 1;
  }

  // This should never happen in a properly constructed deck
  throw new Error('Unknown card arcana');
}

interface LotteryType {
  name: string;
  mainNumbers: {
    count: number;
    min: number;
    max: number;
  };
  bonusNumber: {
    min: number;
    max: number;
  };
}

const LOTTERY_TYPES: Record<string, LotteryType> = {
  mega_millions: {
    name: 'Mega Millions',
    mainNumbers: {
      count: 5,
      min: 1,
      max: 70,
    },
    bonusNumber: {
      min: 1,
      max: 25,
    },
  },
  powerball: {
    name: 'PowerBall',
    mainNumbers: {
      count: 5,
      min: 1,
      max: 69,
    },
    bonusNumber: {
      min: 1,
      max: 26,
    },
  },
};

interface DrawnCard {
  card: TarotCard;
  position: number;
  positionName: string;
  lotteryNumber: number;
  isReversed: boolean;
}

interface LotteryResult {
  lotteryType: LotteryType;
  drawnCards: DrawnCard[];
  mainNumbers: (number | null)[];
  bonusNumber: number | null;
  quickPickCount: number;
}

function drawLotteryCards(deck: TarotDeck, lotteryType: LotteryType): LotteryResult {
  const prompts = loadPrompts();
  const drawnCards: DrawnCard[] = [];
  const mainNumbers: (number | null)[] = [];
  let bonusNumber: number | null = null;
  let quickPickCount = 0;

  // Draw cards for main numbers
  for (let i = 0; i < lotteryType.mainNumbers.count; i += 1) {
    const cardPositions = deck.selectCards(1);
    if (cardPositions.length === 0) {
      throw new Error('Not enough cards in deck');
    }
    const cardPosition = cardPositions[0];

    const positionName = `Main ${i + 1}`;
    const lotteryNumber = getCardLotteryNumber(cardPosition.card);

    const cardDisplayName = cardPosition.isReversed
      ? `${cardPosition.card.getName()} (Reversed)`
      : cardPosition.card.getName();

    console.log(formatPrompt(prompts.lottery.card_drawn, {
      position: positionName,
      card_name: cardDisplayName,
    }));

    // Check if number is in valid range for main numbers
    const isValidMainNumber = lotteryNumber >= lotteryType.mainNumbers.min
      && lotteryNumber <= lotteryType.mainNumbers.max;

    if (isValidMainNumber) {
      console.log(formatPrompt(prompts.lottery.number_mapped, { number: lotteryNumber }));
      mainNumbers.push(lotteryNumber);
    } else {
      console.log(prompts.lottery.invalid_number);
      mainNumbers.push(null);
      quickPickCount += 1;
    }

    drawnCards.push({
      card: cardPosition.card,
      position: i + 1,
      positionName,
      lotteryNumber,
      isReversed: cardPosition.isReversed,
    });
  }

  // Draw card(s) for bonus number with special re-draw logic
  let bonusAttempts = 0;
  while (bonusNumber === null && bonusAttempts < 3) {
    const cardPositions = deck.selectCards(1);
    if (cardPositions.length === 0) {
      throw new Error('Not enough cards in deck');
    }
    const cardPosition = cardPositions[0];

    const positionName = prompts.lottery.position_names.bonus;
    const lotteryNumber = getCardLotteryNumber(cardPosition.card);

    if (bonusAttempts > 0) {
      console.log(prompts.lottery.bonus_redraw);
    }

    const cardDisplayName = cardPosition.isReversed
      ? `${cardPosition.card.getName()} (Reversed)`
      : cardPosition.card.getName();

    console.log(formatPrompt(prompts.lottery.card_drawn, {
      position: positionName,
      card_name: cardDisplayName,
    }));

    // Check if number is in valid range for bonus number
    const isValidBonusNumber = lotteryNumber >= lotteryType.bonusNumber.min
      && lotteryNumber <= lotteryType.bonusNumber.max;

    if (isValidBonusNumber) {
      console.log(formatPrompt(prompts.lottery.number_mapped, { number: lotteryNumber }));
      bonusNumber = lotteryNumber;
    } else {
      console.log(prompts.lottery.invalid_number);
      if (bonusAttempts === 2) {
        quickPickCount += 1;
      }
    }

    // Always record the card for interpretation purposes
    let positionNameForCard: string;
    if (bonusAttempts === 0) {
      positionNameForCard = prompts.lottery.position_names.bonus;
    } else if (bonusAttempts === 1) {
      positionNameForCard = prompts.lottery.position_names.bonus_redraw;
    } else {
      positionNameForCard = prompts.lottery.position_names.bonus_redraw_2;
    }

    drawnCards.push({
      card: cardPosition.card,
      position: lotteryType.mainNumbers.count + bonusAttempts + 1,
      positionName: positionNameForCard,
      lotteryNumber,
      isReversed: cardPosition.isReversed,
    });

    bonusAttempts += 1;
  }

  return {
    lotteryType,
    drawnCards,
    mainNumbers,
    bonusNumber,
    quickPickCount,
  };
}

function displayLotteryResults(result: LotteryResult): void {
  const prompts = loadPrompts();

  console.log(`\n${prompts.lottery.numbers_summary}`);

  // Display drawn cards
  const cardsList = result.drawnCards
    .map((drawn) => (drawn.isReversed ? `${drawn.card.getName()} (Reversed)` : drawn.card.getName()))
    .join(prompts.lottery.display_text.separator);
  console.log(formatPrompt(prompts.lottery.drawn_cards_summary, { cards_list: cardsList }));
  console.log('');

  // Display main numbers
  const validMainNumbers = result.mainNumbers.filter((n) => n !== null);
  const mainNumbersDisplay = validMainNumbers.length > 0
    ? validMainNumbers.join(prompts.lottery.display_text.separator)
      + (validMainNumbers.length < result.lotteryType.mainNumbers.count
        ? prompts.lottery.display_text.quick_pick_suffix : '')
    : prompts.lottery.display_text.all_quick_pick;

  console.log(formatPrompt(prompts.lottery.main_numbers, { numbers: mainNumbersDisplay }));

  // Display bonus number
  const bonusDisplay = result.bonusNumber !== null
    ? result.bonusNumber.toString()
    : prompts.lottery.display_text.quick_pick;
  console.log(formatPrompt(prompts.lottery.bonus_number, { number: bonusDisplay }));

  // Display quick pick count if any
  if (result.quickPickCount > 0) {
    console.log(formatPrompt(prompts.lottery.quick_pick_count, { count: result.quickPickCount }));
  }

  console.log('');
}

async function getLotteryInterpretation(result: LotteryResult): Promise<void> {
  const prompts = loadPrompts();

  if (process.env.OPENAI_API_KEY) {
    console.log(prompts.lottery.ai_reflection);
    console.log('');

    try {
      // Build interpretation context
      const context: InterpretationContext = {
        userContext: `Lottery number divination for ${result.lotteryType.name}`,
        contextType: 'lottery' as const,
        cards: result.drawnCards.map((drawn) => ({
          card: drawn.card,
          position: drawn.positionName,
          positionSignificance: drawn.positionName.includes(prompts.lottery.position_names.bonus)
            ? prompts.lottery.interpretation.bonus_significance
            : prompts.lottery.interpretation.main_significance,
          isReversed: drawn.isReversed,
          additionalInfo: {
            positionName: drawn.positionName,
            lotteryNumber: drawn.lotteryNumber,
          },
        })),
      };

      const aiInterpretation = await getGenericAiInterpretation(context);
      console.log(aiInterpretation);
      console.log('');
    } catch (error) {
      console.log(prompts.lottery.ai_unavailable_lottery);
      console.log('');
    }
  } else {
    console.log(prompts.lottery.ai_unavailable_lottery);
    console.log('');
  }
}

export async function getLotteryNumbers(): Promise<boolean> {
  const prompts = loadPrompts();

  console.log(`\n${prompts.lottery.welcome}\n`);

  // Ask for lottery type
  const lotteryAnswer = await inquirer.prompt([
    {
      type: 'list',
      name: 'lotteryType',
      message: prompts.lottery.type_selection,
      choices: [
        {
          name: prompts.lottery.type_choices.mega_millions,
          value: 'mega_millions',
        },
        {
          name: prompts.lottery.type_choices.powerball,
          value: 'powerball',
        },
      ],
    },
  ]);

  const selectedLottery = LOTTERY_TYPES[lotteryAnswer.lotteryType];

  console.log(`\n${prompts.lottery.drawing_cards}\n`);

  // Create and shuffle a new deck for each drawing
  const deck = new TarotDeck();

  const result = drawLotteryCards(deck, selectedLottery);

  // Display the results
  displayLotteryResults(result);

  // Get AI interpretation if available
  await getLotteryInterpretation(result);

  const continueAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: prompts.lottery.continue_prompt,
  });

  return continueAnswer.continue;
}
