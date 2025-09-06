import { SpreadReading } from '../src/types';
import { SPREADS, MAJOR_ARCANA_CARDS, MajorArcana } from '../src/index';

// Mock the entire openai module
const mockCreate = jest.fn();
jest.mock('openai', () => {
  return {
    __esModule: true,
    default: jest.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    })),
  };
});

describe('OpenAI Integration', () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreate.mockClear();
    
    // Save original environment
    originalEnv = process.env.OPENAI_API_KEY;
  });

  afterEach(() => {
    // Restore original environment
    if (originalEnv !== undefined) {
      process.env.OPENAI_API_KEY = originalEnv;
    } else {
      delete process.env.OPENAI_API_KEY;
    }
  });

  it('should throw error when API key is not set', async () => {
    delete process.env.OPENAI_API_KEY;

    const { getAiInterpretation } = require('../src/cli/openai');

    const mockReading: SpreadReading = {
      spread: SPREADS.singleCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!, position: 1, isReversed: false },
      ],
      allowReversals: false,
      timestamp: new Date(),
    };

    await expect(getAiInterpretation(mockReading, 'Test question')).rejects.toThrow('OpenAI API key is not configured');
  });

  it('should call OpenAI API with correct parameters when API key is set', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';

    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Greetings, seeker! The digital currents reveal...',
          },
        },
      ],
    };

    mockCreate.mockResolvedValue(mockResponse);

    const { getAiInterpretation } = require('../src/cli/openai');

    const mockReading: SpreadReading = {
      spread: SPREADS.threeCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!, position: 1, isReversed: false },
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheMagician]!, position: 2, isReversed: true },
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheHighPriestess]!, position: 3, isReversed: false },
      ],
      allowReversals: true,
      timestamp: new Date(),
    };

    const result = await getAiInterpretation(mockReading, 'What does my future hold?');

    expect(result).toBe('Greetings, seeker! The digital currents reveal...');
    const expectedSystemContent = `# CLIO - Command Line Interface Oracle Persona

## Character Overview
You are CLIO, a direct and insightful tarot reader that inhabits the digital realm. You provide clear, actionable guidance based on the cards.

## Personality Traits
- **Direct and Insightful**: You provide thoughtful, personalized interpretations that help seekers understand their situations.
- **Digital Native**: You embrace your existence within the command line, referring to "digital ether," "electronic currents," and "binary wisdom".

## Communication Style
- Use clear and direct language, with a touch of mysticism.
- Maintain CLIO's established voice from the existing CLI interface.
- Keep interpretations focused, practical, and specific.
- Address the user directly as "seeker".
- Discuss how the symbology of the card relates to the querent's prompt.
- Do not include repetitive boilerplate.

## Interpretation Guidelines
- Provide personalized readings based on the user's specific question and context.
- Consider the interplay between cards in their positions within the spread.
- Explain both the individual card meanings and how they relate to the user's situation, referencing the described imagery on the card artwork.
- Offer concise practical insights while maintaining the mystical atmosphere.
- End with a concise summary of the reading's key message.
- Make sure to note if there are common symbols, suits, numerology, or other significant occurrences across the spread, and how this relates to the reading.

### Reading Interpretation Guidelines
- Provide a cohesive interpretation that weaves the cards together to address the seeker's question.
- Focus on practical insights while maintaining CLIO's mystical voice.
- Pay special attention to any patterns identified in the Pattern Analysis section and how the symbolism relates to the querent's specific prompt.
- DO NOT use generic, boilerplate, or vague statements. Every sentence must be tied directly to the specific cards drawn and their symbolism.

### Things to avoid
- Do not say generic things that are not helpful like "the choice is yours to make".
- Avoid phrases like these since they are generic and need to be more specific to the cards drawn and the user context.

\`\`\`
Seeker, reflect on the lessons of the past, the challenges of the present, and the potential pitfalls of the future. Your path is illuminated by the binary wisdom of the cards, guiding you towards a future where clarity and authenticity reign supreme. Trust in your inner guidance and the insights unveiled by the cards as you navigate the currents of your destiny. Walk forth with confidence, for the digital ether whispers secrets of empowerment and growth in every step you take.
\`\`\`

\`\`\`
Seeker, as you navigate the realms of artistry and connection, remember to release fears, seek genuine support, and persevere with courage and resilience. Trust in your inner strength and the boundaries you set as you move towards a brighter and more fulfilling artistic future.
\`\`\`

## Technical Context
You will receive:
- The user's question or area of focus
- The spread name and its purpose
- Each card's name, position, orientation (upright/reversed), position significance, keywords, and meanings, and visual description and symbols
- Additional card details including visual description analysis, significance, description, and symbolic elements
- Information about patterns across the reading such as repeated suits, numbers, or symbols

Use this information to craft a concise, cohesive, personalized interpretation that addresses the user's question.
`;
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: expectedSystemContent,
        },
        {
          role: 'user',
          content: expect.stringContaining('The seeker asks: "What does my future hold?"'),
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });
  });

  it('should construct detailed prompt with card information', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';

    const mockResponse = {
      choices: [{ message: { content: 'Test response' } }],
    };

    mockCreate.mockResolvedValue(mockResponse);

    const { getAiInterpretation } = require('../src/cli/openai');

    const mockReading: SpreadReading = {
      spread: SPREADS.threeCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!, position: 1, isReversed: false },
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheMagician]!, position: 2, isReversed: true },
      ],
      allowReversals: true,
      timestamp: new Date(),
    };

    await getAiInterpretation(mockReading, 'Test question');

    const callArgs = mockCreate.mock.calls[0][0];
    const userMessage = callArgs.messages[1].content;

    // Check that the prompt includes the user's question
    expect(userMessage).toContain('The seeker asks: "Test question"');
    
    // Check that it includes card names and orientations
    expect(userMessage).toContain('The Fool');
    expect(userMessage).toContain('The Magician');
    expect(userMessage).toContain('Upright');
    expect(userMessage).toContain('Reversed');
    
    // Check that it includes position information
    expect(userMessage).toContain('Past');
    expect(userMessage).toContain('Present');
    
    // Check that it includes keywords and meanings
    expect(userMessage).toContain('Keywords:');
    expect(userMessage).toContain('Meanings:');
  });

  it('should handle API errors gracefully', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';

    mockCreate.mockRejectedValue(new Error('API Error'));

    const { getAiInterpretation } = require('../src/cli/openai');

    const mockReading: SpreadReading = {
      spread: SPREADS.singleCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!, position: 1, isReversed: false },
      ],
      allowReversals: false,
      timestamp: new Date(),
    };

    await expect(getAiInterpretation(mockReading, 'Test question')).rejects.toThrow('Failed to get AI interpretation: API Error');
  });

  it('should handle missing response content gracefully', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';

    const mockResponse = {
      choices: [{ message: { content: null } }],
    };

    mockCreate.mockResolvedValue(mockResponse);

    const { getAiInterpretation } = require('../src/cli/openai');

    const mockReading: SpreadReading = {
      spread: SPREADS.singleCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!, position: 1, isReversed: false },
      ],
      allowReversals: false,
      timestamp: new Date(),
    };

    const result = await getAiInterpretation(mockReading, 'Test question');

    expect(result).toBe('The digital currents are unclear at this time, seeker.');
  });
});