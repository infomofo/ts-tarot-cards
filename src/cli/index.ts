import inquirer from 'inquirer';
import { MAJOR_ARCANA_CARDS } from '../cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../cards/minor-arcana';
import { TarotCard, SpreadReader, SPREADS, SPREAD_NAMES } from '../index';
import { SpreadRenderer } from '../spreads/renderer';

const allCards: TarotCard[] = [...Object.values(MAJOR_ARCANA_CARDS), ...Object.values(MINOR_ARCANA_CARDS)];

export function clearConsole() {
  console.log('\x1B[2J\x1B[0f');
}

export function displayWelcomeMessage() {
  clearConsole();
  console.log("Welcome, seeker of truths, to the realm of CLIO, the Command Line Interface Oracle.");
  console.log("The digital ether hums with ancient secrets, and I am here to channel them for you.");
  console.log("Speak your desires, and let the command line unveil your destiny!\n");
}

export async function learnAboutSingleCard(): Promise<boolean> {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'cardName',
      message: 'Which card do you wish to learn about?',
      choices: allCards.map(card => card.getName()),
    },
  ]);

  const selectedCard = allCards.find(card => card.getName() === answer.cardName);
  if (selectedCard) {
    clearConsole();
    console.log(`\n*** ${selectedCard.getName()} ***`);
    console.log(`\nDescription: ${selectedCard.description}`);
    console.log(`\nKeywords: ${selectedCard.keywords.join(', ')}`);
    console.log('\nMeanings:');
    console.log('  Upright:');
    selectedCard.uprightMeanings.forEach(meaning => console.log(`    - ${meaning}`));
    console.log('  Reversed:');
    selectedCard.reversedMeanings.forEach(meaning => console.log(`    - ${meaning}`));
  }

  const continueAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: '\nWould you like to learn about another card?'
  });

  return continueAnswer.continue;
}

export async function getSingleReading(): Promise<boolean> {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'spreadName',
      message: 'The veils of fate are thin. Choose a spread to part them:',
      choices: Object.values(SPREAD_NAMES),
    },
  ]);

  const spreadName = answer.spreadName;
  const reader = new SpreadReader();
  const reading = reader.performReading(spreadName);
  const renderer = new SpreadRenderer();
  const textLayout = renderer.renderAsText(reading);

  clearConsole();
  console.log(`\nThe cosmos has spoken! Your ${spreadName} reading unfolds:\n`);
  console.log(textLayout);

  console.log("\nLet's gaze deeper into the cards...\n");

  reading.cards.forEach(cardPosition => {
    const spreadPosition = reading.spread.positions.find(p => p.position === cardPosition.position);
    if (spreadPosition) {
      console.log(`*** ${cardPosition.card.getName()} (${spreadPosition.name}) ***`);
      const reversed = cardPosition.isReversed;
      console.log(`This card is ${reversed ? 'reversed' : 'upright'}.`);
      console.log(`It speaks of: ${reversed ? cardPosition.card.reversedMeanings[0] : cardPosition.card.uprightMeanings[0]}`);
      console.log('\n');
    }
  });

  const continueAnswer = await inquirer.prompt({
    type: 'confirm',
    name: 'continue',
    message: '\nWould you like another reading?'
  });

  return continueAnswer.continue;
}

export async function mainMenu(): Promise<void> {
  displayWelcomeMessage();

  let running = true;
  while(running) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: 'What secrets do you wish to unravel?',
        choices: [
          'Learn about the tarot cards',
          'Get a sample tarot reading',
          new inquirer.Separator(),
          'Exit',
        ],
      },
    ]);

    switch (answers.choice) {
      case 'Learn about the tarot cards':
        let keepLearning = true;
        while (keepLearning) {
          keepLearning = await learnAboutSingleCard();
        }
        break;
      case 'Get a sample tarot reading':
        let keepReading = true;
        while (keepReading) {
          keepReading = await getSingleReading();
        }
        break;
      case 'Exit':
        console.log('\nThe digital winds whisper farewell. May your path be ever illuminated.\n');
        running = false;
        break;
    }
  }
}

if (require.main === module) {
  mainMenu();
}
