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
      allow_reversals: false,
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
      allow_reversals: true,
      timestamp: new Date(),
    };

    const result = await getAiInterpretation(mockReading, 'What does my future hold?');

    expect(result).toBe('Greetings, seeker! The digital currents reveal...');
    expect(mockCreate).toHaveBeenCalledWith({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: expect.stringContaining('You are CLIO, the Command Line Interface Oracle'),
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
      allow_reversals: true,
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
      allow_reversals: false,
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
      allow_reversals: false,
      timestamp: new Date(),
    };

    const result = await getAiInterpretation(mockReading, 'Test question');

    expect(result).toBe('The digital currents are unclear at this time, seeker.');
  });
});