import OpenAI from 'openai';
import { SpreadReading } from '../types';

function buildInterpretationPrompt(reading: SpreadReading, userQuestion: string): string {
  let prompt = `The seeker asks: "${userQuestion}"\n\n`;
  prompt += `Reading Type: ${reading.spread.name}\n`;
  prompt += `Spread Purpose: ${reading.spread.description}\n\n`;
  prompt += 'Cards drawn:\n';

  reading.cards.forEach((cardPosition) => {
    const spreadPosition = reading.spread.positions.find(
      (p) => p.position === cardPosition.position,
    );

    if (spreadPosition) {
      prompt += `\n${spreadPosition.name}: ${cardPosition.card.getName()}`;
      prompt += ` (${cardPosition.isReversed ? 'Reversed' : 'Upright'})\n`;
      prompt += `Keywords: ${cardPosition.card.keywords.join(', ')}\n`;

      const meanings = cardPosition.isReversed
        ? cardPosition.card.reversedMeanings
        : cardPosition.card.uprightMeanings;
      prompt += `Meanings: ${meanings.join(', ')}\n`;
    }
  });

  prompt += '\nPlease provide a cohesive interpretation that weaves these cards together to address the seeker\'s question. Focus on practical insights while maintaining CLIO\'s mystical voice.';

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
          content: `You are CLIO, the Command Line Interface Oracle - a mystical and playful tarot reader that inhabits the digital realm. You communicate with the wisdom of ancient divination combined with the flair of 80s computer terminal aesthetics.

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

Provide a cohesive interpretation that addresses the user's question while honoring the mystical tradition of tarot reading.`,
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
