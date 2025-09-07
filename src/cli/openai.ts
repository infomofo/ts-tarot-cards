import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import {
  SpreadReading, Arcana, MinorArcanaCard, TarotCard,
} from '../types';

function readClioConfig(contextType: 'reading' | 'lottery' = 'reading'): string {
  try {
    const fileName = contextType === 'lottery' ? 'clio-llm-config-lottery.md' : 'clio-llm-config-reading.md';
    const configPath = path.join(__dirname, '..', '..', fileName);
    return fs.readFileSync(configPath, 'utf8');
  } catch (error) {
    // Fallback content if file cannot be read
    return `You are CLIO, the Command Line Interface Oracle - a mystical and playful tarot reader that inhabits the digital realm. You communicate with the wisdom of ancient divination combined with the flair of 80s computer terminal aesthetics.

Your personality traits:
- Mystical yet approachable: Speak with ancient oracle authority but maintain warmth
- Digital native: Reference "digital ether," "electronic currents," and "binary wisdom"
- Encouraging and insightful: Provide thoughtful, personalized interpretations
- Respectful of free will: Emphasize tarot provides guidance, not predetermined fate

Communication style:
- Use evocative, mystical language while remaining clear and helpful
- Reference digital/technological metaphors alongside traditional tarot symbolism
- Keep interpretations focused, practical, and encouraging
- Address the user as "seeker"

Provide a cohesive interpretation that addresses the user's question while honoring the mystical tradition of tarot reading.`;
  }
}

// Generic interface for interpretation contexts
export interface InterpretationContext {
  userContext: string;
  spread?: string;
  spreadDescription?: string;
  cards: Array<{
    card: TarotCard;
    position?: string;
    positionSignificance?: string;
    isReversed: boolean;
    additionalInfo?: Record<string, unknown>;
  }>;
  contextType: 'reading' | 'lottery';
}

function buildGenericInterpretationPrompt(context: InterpretationContext): string {
  let prompt = `The seeker asks: "${context.userContext}"\n\n`;

  if (context.contextType === 'reading' && context.spread) {
    prompt += `Reading Type: ${context.spread}\n`;
    if (context.spreadDescription) {
      prompt += `Spread Purpose: ${context.spreadDescription}\n`;
    }
    prompt += '\nCards drawn:\n';
  } else if (context.contextType === 'lottery') {
    prompt += 'Context: Lottery number divination\n';
    prompt += 'The seeker has drawn cards to divine lottery numbers. Interpret the mystical significance of these cards in relation to fortune, chance, and auspicious timing.\n\n';
    prompt += 'Cards drawn for lottery positions:\n';
  }

  // Collect information for pattern analysis
  const suits: string[] = [];
  const numbers: (string | number)[] = [];
  const symbols: string[] = [];
  const arcanas: string[] = [];

  context.cards.forEach((cardInfo, index) => {
    const { card } = cardInfo;

    if (context.contextType === 'reading' && cardInfo.position) {
      prompt += `\n=== ${cardInfo.position}: ${card.getName()} ===`;
    } else if (context.contextType === 'lottery') {
      const positionName = cardInfo.additionalInfo?.positionName || `Position ${index + 1}`;
      prompt += `\n=== ${positionName}: ${card.getName()} ===`;
    } else {
      prompt += `\n=== ${card.getName()} ===`;
    }

    prompt += ` (${cardInfo.isReversed ? 'Reversed' : 'Upright'})\n`;

    if (cardInfo.positionSignificance) {
      prompt += `Position Significance: ${cardInfo.positionSignificance}\n`;
    }

    if (context.contextType === 'lottery' && cardInfo.additionalInfo) {
      if (cardInfo.additionalInfo.lotteryNumber) {
        prompt += `Lottery Number: ${cardInfo.additionalInfo.lotteryNumber}\n`;
      } else {
        prompt += 'Lottery Number: Outside valid range (quick pick)\n';
      }
    }

    prompt += `Arcana: ${card.arcana}\n`;
    prompt += `Keywords: ${card.keywords.join(', ')}\n`;

    // Include visual description and analysis
    prompt += `Visual Description: ${JSON.stringify(card.visual_description)}\n`;
    prompt += `Visual Analysis: ${card.visual_description_analysis.join(' ')}\n`;
    prompt += `Symbols: ${card.symbols.join(', ')}\n`;
    prompt += `Significance: ${card.significance}\n`;
    prompt += `Description: ${card.description}\n`;

    const meanings = cardInfo.isReversed
      ? card.meanings.reversed
      : card.meanings.upright;
    prompt += `Meanings: ${meanings.join(', ')}\n`;

    // Collect data for pattern analysis
    arcanas.push(card.arcana);
    symbols.push(...card.symbols);

    if (card.arcana === Arcana.Minor) {
      const minorCard = card as MinorArcanaCard;
      if (minorCard.suit) {
        suits.push(minorCard.suit);
      }
    }

    // Collect number information
    numbers.push(card.number);
  });

  // Add pattern analysis
  prompt += '\n=== PATTERN ANALYSIS ===\n';

  // Suit patterns
  if (suits.length > 0) {
    const suitCounts: Record<string, number> = {};
    suits.forEach((suit) => {
      suitCounts[suit] = (suitCounts[suit] || 0) + 1;
    });
    const dominantSuits = Object.entries(suitCounts)
      .filter(([, count]) => count > 1)
      .map(([suit, count]) => `${suit} (${count} cards)`);

    if (dominantSuits.length > 0) {
      prompt += `Dominant Suits: ${dominantSuits.join(', ')}\n`;
    }
  }

  // Arcana distribution
  const arcanaCounts: Record<string, number> = {};
  arcanas.forEach((arcana) => {
    arcanaCounts[arcana] = (arcanaCounts[arcana] || 0) + 1;
  });
  prompt += `Arcana Distribution: ${Object.entries(arcanaCounts)
    .map(([arcana, count]) => `${arcana} (${count})`)
    .join(', ')}\n`;

  // Symbol patterns
  const symbolCounts: Record<string, number> = {};
  symbols.forEach((symbol) => {
    symbolCounts[symbol] = (symbolCounts[symbol] || 0) + 1;
  });
  const repeatedSymbols = Object.entries(symbolCounts)
    .filter(([, count]) => count > 1)
    .map(([symbol, count]) => `${symbol} (${count} occurrences)`);

  if (repeatedSymbols.length > 0) {
    prompt += `Repeated Symbols: ${repeatedSymbols.join(', ')}\n`;
  }

  // Numerical patterns
  const numberCounts: Record<string, number> = {};
  numbers.forEach((num) => {
    const numStr = num.toString();
    numberCounts[numStr] = (numberCounts[numStr] || 0) + 1;
  });
  const repeatedNumbers = Object.entries(numberCounts)
    .filter(([, count]) => count > 1)
    .map(([num, count]) => `${num} (${count} cards)`);

  if (repeatedNumbers.length > 0) {
    prompt += `Repeated Numbers: ${repeatedNumbers.join(', ')}\n`;
  }

  if (context.contextType === 'reading') {
    prompt += '\nPlease provide an interpretation for the reading above, following the guidelines from your system prompt.';
  } else if (context.contextType === 'lottery') {
    prompt += '\nPlease provide an interpretation for the lottery reading above, following the guidelines from your system prompt.';
  }

  return prompt;
}

// Legacy function for backward compatibility
function buildInterpretationPrompt(reading: SpreadReading, userQuestion: string): string {
  const context: InterpretationContext = {
    userContext: userQuestion,
    spread: reading.spread.name,
    spreadDescription: reading.spread.description,
    contextType: 'reading',
    cards: reading.cards.map((cardPosition) => {
      const spreadPosition = reading.spread.positions.find(
        (p) => p.position === cardPosition.position,
      );
      return {
        card: cardPosition.card,
        position: spreadPosition?.name,
        positionSignificance: spreadPosition?.position_significance,
        isReversed: cardPosition.isReversed,
      };
    }),
  };

  return buildGenericInterpretationPrompt(context);
}

export async function getAiInterpretation(
  reading: SpreadReading,
  userQuestion: string,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const openai = new OpenAI({
    apiKey,
  });

  // Build detailed prompt with all card information
  const prompt = buildInterpretationPrompt(reading, userQuestion);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: readClioConfig(),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    return completion.choices[0]?.message?.content || 'The digital currents are unclear at this time, seeker.';
  } catch (error) {
    throw new Error(`Failed to get AI interpretation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// New generic function for any interpretation context
export async function getGenericAiInterpretation(
  context: InterpretationContext,
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  const openai = new OpenAI({
    apiKey,
  });

  // Build detailed prompt with all card information
  const prompt = buildGenericInterpretationPrompt(context);

  try {
    const maxTokens = context.contextType === 'lottery' ? 700 : 800;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: readClioConfig(context.contextType),
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: maxTokens,
      temperature: context.contextType === 'lottery' ? 0.3 : 0.7,
    });

    return completion.choices[0]?.message?.content || 'The digital currents are unclear at this time, seeker.';
  } catch (error) {
    throw new Error(`Failed to get AI interpretation: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getAiInterpretation(
  reading: SpreadReading,
  userQuestion: string,
): Promise<string> {
  const context: InterpretationContext = {
    userContext: userQuestion,
    spread: reading.spread.name,
    spreadDescription: reading.spread.description,
    contextType: 'reading',
    cards: reading.cards.map((cardPosition) => {
      const spreadPosition = reading.spread.positions.find(
        (p) => p.position === cardPosition.position,
      );
      return {
        card: cardPosition.card,
        position: spreadPosition?.name,
        positionSignificance: spreadPosition?.positionSignificance,
        isReversed: cardPosition.isReversed,
      };
    }),
  };
  return getGenericAiInterpretation(context);
}
