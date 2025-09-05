/* eslint-disable no-console */
import inquirer from 'inquirer';
import { TarotDeck } from '../deck/deck';
import { TarotCard } from '../types';
import { getCardLotteryNumber } from './card-mapping';
import { getGenericAiInterpretation, InterpretationContext } from './openai';
import { loadPrompts, formatPrompt } from './prompts';

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
  lotteryNumber: number | null;
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

    console.log(formatPrompt(prompts.lottery.card_drawn, {
      position: positionName,
      card_name: cardPosition.card.getName(),
    }));

    // Check if number is in valid range for main numbers
    const isValidMainNumber = lotteryNumber !== null
      && lotteryNumber >= lotteryType.mainNumbers.min
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
      lotteryNumber: isValidMainNumber ? lotteryNumber : null,
      isReversed: cardPosition.isReversed,
    });
  }

  // Draw card(s) for bonus number with special re-draw logic
  let bonusAttempts = 0;
  while (bonusNumber === null && bonusAttempts < 2) {
    const cardPositions = deck.selectCards(1);
    if (cardPositions.length === 0) {
      throw new Error('Not enough cards in deck');
    }
    const cardPosition = cardPositions[0];

    const positionName = 'Bonus';
    const lotteryNumber = getCardLotteryNumber(cardPosition.card);

    if (bonusAttempts > 0) {
      console.log(prompts.lottery.bonus_redraw);
    }

    console.log(formatPrompt(prompts.lottery.card_drawn, {
      position: positionName,
      card_name: cardPosition.card.getName(),
    }));

    // Check if number is in valid range for bonus number
    const isValidBonusNumber = lotteryNumber !== null
      && lotteryNumber >= lotteryType.bonusNumber.min
      && lotteryNumber <= lotteryType.bonusNumber.max;

    if (isValidBonusNumber) {
      console.log(formatPrompt(prompts.lottery.number_mapped, { number: lotteryNumber }));
      bonusNumber = lotteryNumber;
    } else {
      console.log(prompts.lottery.invalid_number);
      if (bonusAttempts === 1) {
        quickPickCount += 1;
      }
    }

    // Always record the card for interpretation purposes
    drawnCards.push({
      card: cardPosition.card,
      position: lotteryType.mainNumbers.count + bonusAttempts + 1,
      positionName: bonusAttempts > 0 ? 'Bonus (Redraw)' : 'Bonus',
      lotteryNumber: isValidBonusNumber ? lotteryNumber : null,
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

  // Display main numbers
  const validMainNumbers = result.mainNumbers.filter((n) => n !== null);
  const mainNumbersDisplay = validMainNumbers.length > 0
    ? validMainNumbers.join(', ') + (validMainNumbers.length < result.lotteryType.mainNumbers.count ? ' + quick pick' : '')
    : 'All quick pick';

  console.log(formatPrompt(prompts.lottery.main_numbers, { numbers: mainNumbersDisplay }));

  // Display bonus number
  const bonusDisplay = result.bonusNumber !== null ? result.bonusNumber.toString() : 'Quick pick';
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
        contextType: 'lottery',
        cards: result.drawnCards.map((drawn) => ({
          card: drawn.card,
          position: drawn.positionName,
          positionSignificance: drawn.positionName.includes('Bonus')
            ? 'The bonus number holds special significance and amplifies fortune'
            : 'One of the main numbers that forms the foundation of this lottery play',
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
