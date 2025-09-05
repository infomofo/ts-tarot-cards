import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

interface Prompts {
  welcome: {
    title: string;
    subtitle: string;
    prompt: string;
  };
  main_menu: {
    question: string;
    choices: {
      learn_cards: string;
      get_reading: string;
      lottery_numbers: string;
      exit: string;
    };
  };
  card_learning: {
    card_selection: string;
    continue_prompt: string;
  };
  readings: {
    spread_selection: string;
    question_prompt: string;
    question_default: string;
    result_intro: string;
    deeper_gaze: string;
    ai_loading: string;
    ai_unavailable: string;
    continue_prompt: string;
  };
  lottery: {
    welcome: string;
    type_selection: string;
    type_choices: {
      mega_millions: string;
      powerball: string;
    };
    drawing_cards: string;
    card_drawn: string;
    number_mapped: string;
    invalid_number: string;
    bonus_redraw: string;
    numbers_summary: string;
    main_numbers: string;
    bonus_number: string;
    quick_pick_count: string;
    ai_reflection: string;
    ai_unavailable_lottery: string;
    continue_prompt: string;
    position_names: {
      bonus: string;
      bonus_redraw: string;
    };
    display_text: {
      quick_pick_suffix: string;
      all_quick_pick: string;
      quick_pick: string;
      separator: string;
    };
    interpretation: {
      lottery_context: string;
      bonus_significance: string;
      main_significance: string;
    };
  };
  farewell: string;
  errors: {
    card_not_found: string;
    ai_interpretation_failed: string;
  };
}

let cachedPrompts: Prompts | null = null;

export function loadPrompts(): Prompts {
  if (cachedPrompts) {
    return cachedPrompts;
  }

  try {
    const promptsPath = path.join(__dirname, 'strings.yaml');
    const promptsContent = fs.readFileSync(promptsPath, 'utf8');
    cachedPrompts = yaml.load(promptsContent) as Prompts;
    return cachedPrompts;
  } catch (error) {
    // Fallback to hardcoded prompts if file cannot be read
    cachedPrompts = {
      welcome: {
        title: 'Welcome, seeker of truths, to the realm of CLIO, the Command Line Interface Oracle.',
        subtitle: 'The digital ether hums with ancient secrets, and I am here to channel them for you.',
        prompt: 'Speak your desires, and let the command line unveil your destiny!',
      },
      main_menu: {
        question: 'What secrets do you wish to unravel?',
        choices: {
          learn_cards: 'Learn about the tarot cards',
          get_reading: 'Get a sample tarot reading',
          lottery_numbers: 'Divine my fortune through lottery number selection',
          exit: 'Exit',
        },
      },
      card_learning: {
        card_selection: 'Which card do you wish to learn about?',
        continue_prompt: 'Would you like to learn about another card?',
      },
      readings: {
        spread_selection: 'The veils of fate are thin. Choose a spread to part them:',
        question_prompt: 'What question or area of life do you seek guidance on?',
        question_default: 'General guidance',
        result_intro: 'The cosmos has spoken! Your {spread_name} reading unfolds:',
        deeper_gaze: "Let's gaze deeper into the cards...",
        ai_loading: 'CLIO channels deeper wisdom from the digital ether...',
        ai_unavailable: "CLIO's deepest visions are unavailable at this time.",
        continue_prompt: 'Would you like another reading?',
      },
      lottery: {
        welcome: 'Ah, seeker, you wish to divine fortune through the ancient art and modern chance!',
        type_selection: 'Which lottery calls to your spirit?',
        type_choices: {
          mega_millions: 'Mega Millions (5 numbers 1-70, bonus 1-25)',
          powerball: 'PowerBall (5 numbers 1-69, bonus 1-26)',
        },
        drawing_cards: 'The digital cosmos shuffles the deck... drawing your destined cards...',
        card_drawn: 'Card {position}: {card_name}',
        number_mapped: '  → Lottery number: {number}',
        invalid_number: '  → Outside lottery range (will be quick pick)',
        bonus_redraw: 'Bonus card outside range, drawing another...',
        numbers_summary: 'Your mystically-guided lottery numbers:',
        main_numbers: 'Main numbers: {numbers}',
        bonus_number: 'Bonus number: {number}',
        quick_pick_count: '{count} numbers marked as quick pick due to cards outside valid range',
        ai_reflection: 'CLIO gazes into the cosmic significance of your drawn cards...',
        ai_unavailable_lottery: 'The digital currents are unclear for deeper interpretation, but the numbers have been chosen by fate.',
        continue_prompt: 'Would you like to divine more lottery numbers?',
        position_names: {
          bonus: 'Bonus',
          bonus_redraw: 'Bonus (Redraw)',
        },
        display_text: {
          quick_pick_suffix: ' + quick pick',
          all_quick_pick: 'All quick pick',
          quick_pick: 'Quick pick',
          separator: ', ',
        },
        interpretation: {
          lottery_context: 'lottery',
          bonus_significance: 'The bonus number holds special significance and amplifies fortune',
          main_significance: 'One of the main numbers that forms the foundation of this lottery play',
        },
      },
      farewell: 'The digital winds whisper farewell. May your path be ever illuminated.',
      errors: {
        card_not_found: 'Card not found in the digital ether.',
        ai_interpretation_failed: 'The mystical connection to deeper wisdom has been interrupted.',
      },
    };
    return cachedPrompts;
  }
}

// Helper function to replace placeholders in prompt strings
export function formatPrompt(template: string, variables: Record<string, string | number>): string {
  return Object.entries(variables).reduce(
    (result, [key, value]) => result.replace(new RegExp(`{${key}}`, 'g'), String(value)),
    template,
  );
}
