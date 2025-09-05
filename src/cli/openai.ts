import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import { SpreadReading, Arcana, MinorArcanaCard } from '../types';

function readClioConfig(): string {
  try {
    const configPath = path.join(__dirname, '..', '..', 'clio-llm-config.md');
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

function buildInterpretationPrompt(reading: SpreadReading, userQuestion: string): string {
  let prompt = `The seeker asks: "${userQuestion}"\n\n`;
  prompt += `Reading Type: ${reading.spread.name}\n`;
  prompt += `Spread Purpose: ${reading.spread.description}\n\n`;
  prompt += 'Cards drawn:\n';

  // Collect information for pattern analysis
  const suits: string[] = [];
  const numbers: (string | number)[] = [];
  const symbols: string[] = [];
  const arcanas: string[] = [];

  reading.cards.forEach((cardPosition) => {
    const spreadPosition = reading.spread.positions.find(
      (p) => p.position === cardPosition.position,
    );

    if (spreadPosition) {
      const { card } = cardPosition;

      prompt += `\n=== ${spreadPosition.name}: ${card.getName()} ===`;
      prompt += ` (${cardPosition.isReversed ? 'Reversed' : 'Upright'})\n`;
      prompt += `Position Significance: ${spreadPosition.positionSignificance}\n`;
      prompt += `Arcana: ${card.arcana}\n`;
      prompt += `Keywords: ${card.keywords.join(', ')}\n`;

      // Include visual description and analysis
      prompt += `Visual Description: ${card.visualDescription}\n`;
      prompt += `Visual Analysis: ${card.visualDescriptionAnalysis}\n`;
      prompt += `Symbols: ${card.symbols.join(', ')}\n`;
      prompt += `Significance: ${card.significance}\n`;
      prompt += `Description: ${card.description}\n`;

      const meanings = cardPosition.isReversed
        ? card.reversedMeanings
        : card.uprightMeanings;
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
    }
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

  prompt += '\nPlease provide a cohesive interpretation that weaves these cards together to address the seeker\'s question. Focus on practical insights while maintaining CLIO\'s mystical voice. Pay special attention to any patterns identified above and how the symbolism relates to the querent\'s specific prompt.';

  return prompt;
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
