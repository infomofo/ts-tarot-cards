/* eslint-disable no-console */
import inquirer from 'inquirer';
import { MAJOR_ARCANA_CARDS } from '../cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../cards/minor-arcana';
import {
  TarotCard, SpreadReader, SPREAD_NAMES,
} from '../index';
import { SpreadRenderer } from '../spreads/renderer';
import { getAiInterpretation } from './openai';
import { clearConsole } from './cli';
import { loadPrompts, formatPrompt } from './prompts';

const allCards: TarotCard[] = [
  ...Object.values(MAJOR_ARCANA_CARDS),
  ...Object.values(MINOR_ARCANA_CARDS),
];

export async function learnAboutSingleCard(): Promise<boolean> {
  const prompts = loadPrompts();

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'cardName',
      message: prompts.card_learning.card_selection,
      choices: allCards.map((card) => card.getName()),
    },
  ]);

  const selectedCard = allCards.find((card) => card.getName() === answer.cardName);
  if (selectedCard) {
    clearConsole();
    console.log(`\n*** ${selectedCard.getName()} ***`);
    console.log(`\nDescription: ${selectedCard.description}`);
    console.log(`\nKeywords: ${selectedCard.keywords.join(', ')}`);
    console.log('\nMeanings:');
    console.log('  Upright:');
    selectedCard.meanings.upright.forEach((meaning: string) => console.log(`    - ${meaning}`));
    console.log('  Reversed:');
    selectedCard.meanings.reversed.forEach((meaning: string) => console.log(`    - ${meaning}`));
  }

  const continueAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: prompts.card_learning.continue_prompt,
  });

  return continueAnswer.continue;
}

export async function getSingleReading(): Promise<boolean> {
  const prompts = loadPrompts();

  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'spreadName',
      message: prompts.readings.spread_selection,
      choices: Object.values(SPREAD_NAMES),
    },
  ]);

  // Ask for the user's question
  const questionAnswer = await inquirer.prompt([
    {
      type: 'input',
      name: 'question',
      message: prompts.readings.question_prompt,
      default: prompts.readings.question_default,
    },
  ]);

  const { spreadName } = answer;
  const { question } = questionAnswer;
  const reader = new SpreadReader();
  const reading = reader.performReading(spreadName);
  const renderer = new SpreadRenderer();
  const textLayout = renderer.renderAsText(reading);

  clearConsole();
  console.log(`\n${formatPrompt(prompts.readings.result_intro, { spread_name: spreadName })}\n`);
  console.log(textLayout);

  console.log(`\n${prompts.readings.deeper_gaze}\n`);

  // Display individual card meanings
  reading.cards.forEach((cardPosition) => {
    const spreadPosition = reading.spread.positions.find(
      (p) => p.position === cardPosition.position,
    );
    if (spreadPosition) {
      console.log(`*** ${cardPosition.card.getName()} (${spreadPosition.name}) ***`);
      const reversed = cardPosition.isReversed ? 'reversed' : 'upright';
      console.log(`This card is ${reversed}.`);
      const meanings = cardPosition.isReversed
        ? cardPosition.card.meanings.reversed
        : cardPosition.card.meanings.upright;
      const meaning = meanings[Math.floor(Math.random() * meanings.length)];
      console.log(`It speaks of: ${meaning}`);
      console.log('\n');
    }
  });

  // Try to get AI interpretation if API key is available
  if (process.env.OPENAI_API_KEY) {
    console.log(`\n${prompts.readings.ai_loading}\n`);
    try {
      const aiInterpretation = await getAiInterpretation(reading, question);
      console.log(aiInterpretation);
      console.log('\n');
    } catch (error) {
      console.log(`${prompts.readings.ai_unavailable}\n`);
    }
  } else {
    console.log(`${prompts.readings.ai_unavailable}\n`);
  }

  const continueAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: prompts.readings.continue_prompt,
  });

  return continueAnswer.continue;
}
