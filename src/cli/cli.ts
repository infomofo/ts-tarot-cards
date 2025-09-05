/* eslint-disable no-console */
import { loadPrompts } from './prompts';

export function clearConsole(): void {
  console.log('\x1B[2J\x1B[0f');
}

export function displayWelcomeMessage(): void {
  const prompts = loadPrompts();
  clearConsole();
  console.log(prompts.welcome.title);
  console.log(prompts.welcome.subtitle);
  console.log(`${prompts.welcome.prompt}\n`);
}
