jest.mock('inquirer');
import inquirer from 'inquirer';
import { mainMenu } from '../src/cli/index';
import { SpreadReader } from '../src/index';
import { getTarotData } from '../src/data-loader';

describe('CLIO CLI', () => {
  beforeAll(() => {
    getTarotData();
  });

  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    (inquirer.prompt as unknown as jest.Mock).mockClear();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as (code?: any) => never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display the main menu and exit', async () => {
    (inquirer.prompt as unknown as jest.Mock).mockResolvedValue({ choice: 'Exit' });
    await mainMenu();
    expect(inquirer.prompt).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'choice' })
      ])
    );
  });

  it('should show card details and loop', async () => {
    const { MAJOR_ARCANA_CARDS, MajorArcana } = require('../src/index');
    const mockPrompt = jest.fn()
      .mockResolvedValueOnce({ choice: 'Learn about the tarot cards' })
      .mockResolvedValueOnce({ cardName: 'The Fool' })
      .mockResolvedValueOnce({ continue: true })
      .mockResolvedValueOnce({ cardName: 'The Magician' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    jest.doMock('inquirer', () => ({
      prompt: mockPrompt,
      Separator: jest.fn(),
    }));

    const { mainMenu } = require('../src/cli/index');
    await mainMenu();

    expect(mockPrompt).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(MAJOR_ARCANA_CARDS[MajorArcana.TheFool].description));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Magician ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining(MAJOR_ARCANA_CARDS[MajorArcana.TheMagician].description));
  });

  it('should perform a reading and loop', async () => {
    const { SPREADS, MAJOR_ARCANA_CARDS, MajorArcana } = require('../src/index');
    const mockReading = {
      spread: SPREADS.threeCard,
      cards: [
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: false },
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheMagician], position: 2, isReversed: false },
        { card: MAJOR_ARCANA_CARDS[MajorArcana.TheHighPriestess], position: 3, isReversed: false },
      ],
      allowReversals: true,
      timestamp: new Date(),
    };

    jest.doMock('../src/index', () => ({
      ...jest.requireActual('../src/index'),
      SpreadReader: jest.fn().mockImplementation(() => ({
        performReading: jest.fn().mockReturnValue(mockReading),
      })),
    }));

    const mockPrompt = jest.fn()
      .mockResolvedValueOnce({ choice: 'Get a sample tarot reading' })
      .mockResolvedValueOnce({ spreadName: 'threeCard' })
      .mockResolvedValueOnce({ continue: true })
      .mockResolvedValueOnce({ spreadName: 'singleCard' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    jest.doMock('inquirer', () => ({
      prompt: mockPrompt,
      Separator: jest.fn(),
    }));

    const { mainMenu } = require('../src/cli/index');
    await mainMenu();

    expect(mockPrompt).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool (Past) ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Magician (Present) ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The High Priestess (Future) ***'));
  });

  it('should ask for user question and show graceful message when no API key', async () => {
    // Save original environment
    const originalEnv = process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_API_KEY;

    try {
      const { SPREADS, MAJOR_ARCANA_CARDS, MajorArcana } = require('../src/index');
      const mockReading = {
        spread: SPREADS.singleCard,
        cards: [
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: false },
        ],
        allowReversals: false,
        timestamp: new Date(),
      };

      jest.doMock('../src/index', () => ({
        ...jest.requireActual('../src/index'),
        SpreadReader: jest.fn().mockImplementation(() => ({
          performReading: jest.fn().mockReturnValue(mockReading),
        })),
      }));

      const mockPrompt = jest.fn()
        .mockResolvedValueOnce({ spreadName: 'singleCard' })
        .mockResolvedValueOnce({ question: 'What should I focus on today?' })
        .mockResolvedValueOnce({ continue: false });

      jest.doMock('inquirer', () => ({
        prompt: mockPrompt,
        Separator: jest.fn(),
      }));

      const { getSingleReading } = await import('../src/cli/index');
      await getSingleReading();

      expect(mockPrompt).toHaveBeenCalledTimes(3);
      expect(mockPrompt).toHaveBeenCalledWith([
        expect.objectContaining({
          name: 'question',
          message: 'What question or area of life do you seek guidance on?',
        }),
      ]);
      expect(consoleLogSpy).toHaveBeenCalledWith("CLIO's deepest visions are unavailable at this time.\n");
    } finally {
      // Restore original environment
      if (originalEnv !== undefined) {
        process.env.OPENAI_API_KEY = originalEnv;
      }
    }
  });

  it('should call AI interpretation when API key is present', async () => {
    // Set up environment
    process.env.OPENAI_API_KEY = 'test-key';
    const originalEnv = process.env.OPENAI_API_KEY;

    try {
      const { SPREADS, MAJOR_ARCANA_CARDS, MajorArcana } = require('../src/index');
      const mockReading = {
        spread: SPREADS.singleCard,
        cards: [
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: false },
        ],
        allowReversals: false,
        timestamp: new Date(),
      };

      jest.doMock('../src/index', () => ({
        ...jest.requireActual('../src/index'),
        SpreadReader: jest.fn().mockImplementation(() => ({
          performReading: jest.fn().mockReturnValue(mockReading),
        })),
      }));

      // Mock the AI interpretation function
      const mockGetAiInterpretation = jest.fn().mockResolvedValue('Greetings, seeker! The digital currents reveal great possibilities...');
      jest.doMock('../src/cli/openai', () => ({
        getAiInterpretation: mockGetAiInterpretation,
      }));

      const mockPrompt = jest.fn()
        .mockResolvedValueOnce({ spreadName: 'singleCard' })
        .mockResolvedValueOnce({ question: 'What should I focus on today?' })
        .mockResolvedValueOnce({ continue: false });

      jest.doMock('inquirer', () => ({
        prompt: mockPrompt,
        Separator: jest.fn(),
      }));

      const { getSingleReading } = await import('../src/cli/index');
      await getSingleReading();

      expect(mockGetAiInterpretation).toHaveBeenCalledWith(
        expect.objectContaining({
          spread: mockReading.spread,
          cards: mockReading.cards,
          allowReversals: mockReading.allowReversals,
        }),
        'What should I focus on today?'
      );
      expect(consoleLogSpy).toHaveBeenCalledWith('\nCLIO channels deeper wisdom from the digital ether...\n');
      expect(consoleLogSpy).toHaveBeenCalledWith('Greetings, seeker! The digital currents reveal great possibilities...');
    } finally {
      // Restore original environment
      if (originalEnv !== undefined) {
        process.env.OPENAI_API_KEY = originalEnv;
      } else {
        delete process.env.OPENAI_API_KEY;
      }
    }
  });

  it('should handle AI interpretation errors gracefully', async () => {
    // Set up environment
    process.env.OPENAI_API_KEY = 'test-key';
    const originalEnv = process.env.OPENAI_API_KEY;

    try {
      const { SPREADS, MAJOR_ARCANA_CARDS, MajorArcana } = require('../src/index');
      const mockReading = {
        spread: SPREADS.singleCard,
        cards: [
          { card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool], position: 1, isReversed: false },
        ],
        allowReversals: false,
        timestamp: new Date(),
      };

      jest.doMock('../src/index', () => ({
        ...jest.requireActual('../src/index'),
        SpreadReader: jest.fn().mockImplementation(() => ({
          performReading: jest.fn().mockReturnValue(mockReading),
        })),
      }));

      // Mock the AI interpretation function to throw an error
      const mockGetAiInterpretation = jest.fn().mockRejectedValue(new Error('API Error'));
      jest.doMock('../src/cli/openai', () => ({
        getAiInterpretation: mockGetAiInterpretation,
      }));

      const mockPrompt = jest.fn()
        .mockResolvedValueOnce({ spreadName: 'singleCard' })
        .mockResolvedValueOnce({ question: 'What should I focus on today?' })
        .mockResolvedValueOnce({ continue: false });

      jest.doMock('inquirer', () => ({
        prompt: mockPrompt,
        Separator: jest.fn(),
      }));

      const { getSingleReading } = await import('../src/cli/index');
      await getSingleReading();

      expect(consoleLogSpy).toHaveBeenCalledWith("CLIO's deepest visions are unavailable at this time.\n");
    } finally {
      // Restore original environment
      if (originalEnv !== undefined) {
        process.env.OPENAI_API_KEY = originalEnv;
      } else {
        delete process.env.OPENAI_API_KEY;
      }
    }
  });
});
