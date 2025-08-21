import inquirer from 'inquirer';
import { MAJOR_ARCANA_CARDS } from '../../src/cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../../src/cards/minor-arcana';
import { TarotCard, SpreadReader, SPREADS, SPREAD_NAMES, SpreadReading } from '../index';
import { SpreadRenderer } from '../spreads/renderer';
import OpenAI from 'openai';
import * as fs from 'fs';

const allCards: TarotCard[] = [...Object.values(MAJOR_ARCANA_CARDS), ...Object.values(MINOR_ARCANA_CARDS)];

function clearConsole() {
  console.log('\x1B[2J\x1B[0f');
}

function displayWelcomeMessage() {
  clearConsole();
  console.log("Welcome, seeker of truths, to the realm of CLIO, the Command Line Interface Oracle.");
  console.log("The digital ether hums with ancient secrets, and I am here to channel them for you.");
  console.log("Speak your desires, and let the command line unveil your destiny!\n");
}

function learnAboutCards() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'cardName',
        message: 'Which card do you wish to learn about?',
        choices: allCards.map(card => card.getName()),
      },
    ])
    .then(answer => {
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
      inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: '\nWould you like to learn about another card?'
      }).then(answer => {
        if(answer.continue) {
          learnAboutCards();
        } else {
          mainMenu();
        }
      })
    });
}

async function getLlmInterpretation(reading: SpreadReading) {
  if (!process.env.OPENAI_API_KEY) {
    console.log("\nCLIO's deepest visions are unavailable at this time. (OPENAI_API_KEY not set)");
    return;
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const config = fs.readFileSync('clio-llm-config.md', 'utf-8');

    let prompt = `${config}\n\n`;
    prompt += `Spread: ${reading.spread.name}\n`;
    reading.cards.forEach(cardPosition => {
      const spreadPosition = reading.spread.positions.find(p => p.position === cardPosition.position);
      if (spreadPosition) {
        prompt += `Card: ${cardPosition.card.getName()} (${spreadPosition.name})\n`;
        prompt += `Meaning: ${cardPosition.isReversed ? cardPosition.card.reversedMeanings[0] : cardPosition.card.uprightMeanings[0]}\n`;
      }
    });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    console.log("\nCLIO's vision crystallizes:\n");
    console.log(response.choices[0].message.content);

  } catch (error) {
    console.error("\nCLIO's connection to the ether has been disrupted:", error);
  }
}

function getAReading() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'spreadName',
        message: 'The veils of fate are thin. Choose a spread to part them:',
        choices: Object.values(SPREAD_NAMES),
      },
    ])
    .then(async answer => {
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

      await getLlmInterpretation(reading);

      inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: '\nWould you like another reading?'
      }).then(answer => {
        if(answer.continue) {
          getAReading();
        } else {
          mainMenu();
        }
      })
    });
}


function mainMenu() {
  inquirer
    .prompt([
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
    ])
    .then((answers) => {
      switch (answers.choice) {
        case 'Learn about the tarot cards':
          learnAboutCards();
          break;
        case 'Get a sample tarot reading':
          getAReading();
          break;
        case 'Exit':
          console.log('\nThe digital winds whisper farewell. May your path be ever illuminated.\n');
          process.exit(0);
      }
    });
}

displayWelcomeMessage();
mainMenu();
