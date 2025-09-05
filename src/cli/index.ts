/* eslint-disable no-console */
import inquirer from 'inquirer';
import { displayWelcomeMessage } from './cli';
import { learnAboutSingleCard, getSingleReading } from './readings';
import { getLotteryNumbers } from './lottery';
import { loadPrompts } from './prompts';

// Re-export functions for backward compatibility
export { clearConsole, displayWelcomeMessage } from './cli';
export { learnAboutSingleCard, getSingleReading } from './readings';

export async function mainMenu(): Promise<void> {
  const prompts = loadPrompts();
  displayWelcomeMessage();

  let running = true;
  while (running) {
    // eslint-disable-next-line no-await-in-loop
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'choice',
        message: prompts.main_menu.question,
        choices: [
          prompts.main_menu.choices.learn_cards,
          prompts.main_menu.choices.get_reading,
          prompts.main_menu.choices.lottery_numbers,
          new inquirer.Separator(),
          prompts.main_menu.choices.exit,
        ],
      },
    ]);

    let keepLearning;
    let keepReading;
    let keepLottery;
    switch (answers.choice) {
      case prompts.main_menu.choices.learn_cards:
        keepLearning = true;
        while (keepLearning) {
          // eslint-disable-next-line no-await-in-loop
          keepLearning = await learnAboutSingleCard();
        }
        break;
      case prompts.main_menu.choices.get_reading:
        keepReading = true;
        while (keepReading) {
          // eslint-disable-next-line no-await-in-loop
          keepReading = await getSingleReading();
        }
        break;
      case prompts.main_menu.choices.lottery_numbers:
        keepLottery = true;
        while (keepLottery) {
          // eslint-disable-next-line no-await-in-loop
          keepLottery = await getLotteryNumbers();
        }
        break;
      case prompts.main_menu.choices.exit:
        console.log(`\n${prompts.farewell}\n`);
        running = false;
        break;
      default:
        break;
    }
  }
}

if (require.main === module) {
  mainMenu();
}
