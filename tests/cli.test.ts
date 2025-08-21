jest.mock('inquirer');
jest.mock('../src/cli/index', () => jest.fn());

import inquirer from 'inquirer';

const runClio = async () => {
  require('../src/cli/index');
};

describe('CLIO CLI', () => {
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    const inquirer = require('inquirer');
    inquirer.prompt = jest.fn();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation((() => {}) as (code?: any) => never);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should display the main menu and exit', async () => {
    const inquirer = require('inquirer');
    inquirer.prompt.mockResolvedValueOnce({ choice: 'Exit' });
    await runClio();
    expect(inquirer.prompt).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'choice' })
      ])
    );
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should show card details and loop', async () => {
    const inquirer = require('inquirer');
    inquirer.prompt
      .mockResolvedValueOnce({ choice: 'Learn about the tarot cards' })
      .mockResolvedValueOnce({ cardName: 'The Fool' })
      .mockResolvedValueOnce({ continue: true })
      .mockResolvedValueOnce({ cardName: 'The Magician' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await runClio();

    expect(inquirer.prompt).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Magician ***'));
  });

  it('should perform a reading and loop', async () => {
    const { SPREADS } = require('../src/index');
    const mockReading = {
      spread: SPREADS.threeCard,
      cards: [{
        card: {
          getName: () => 'The Fool',
          uprightMeanings: ['New beginnings'],
          reversedMeanings: ['Recklessness']
        },
        position: 1,
        isReversed: false,
      }],
    };
    jest.doMock('../src/index', () => ({
      ...jest.requireActual('../src/index'),
      SpreadReader: jest.fn().mockImplementation(() => ({
        performReading: jest.fn().mockReturnValue(mockReading),
      })),
    }));

    const inquirer = require('inquirer');
    inquirer.prompt
      .mockResolvedValueOnce({ choice: 'Get a sample tarot reading' })
      .mockResolvedValueOnce({ spreadName: 'threeCard' })
      .mockResolvedValueOnce({ continue: true })
      .mockResolvedValueOnce({ spreadName: 'singleCard' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await runClio();

    expect(inquirer.prompt).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool (Past) ***'));
  });

  it('should call OpenAI when API key is present', async () => {
    process.env.OPENAI_API_KEY = 'fake-key';
    const { SPREADS } = require('../src/index');
    const mockReading = {
      spread: SPREADS.threeCard,
      cards: [{
        card: { getName: () => 'The Fool', uprightMeanings: ['New beginnings'], reversedMeanings: ['Recklessness'] },
        position: 1,
        isReversed: false,
      }],
    };
    jest.doMock('../src/index', () => ({
      ...jest.requireActual('../src/index'),
      SpreadReader: jest.fn().mockImplementation(() => ({
        performReading: jest.fn().mockReturnValue(mockReading),
      })),
    }));

    const OpenAI = require('openai');
    const openai = new OpenAI();
    const mockCreate = openai.chat.completions.create;
    (mockCreate as jest.Mock).mockResolvedValue({ choices: [{ message: { content: "Your future is bright!" } }] });

    const inquirer = require('inquirer');
    inquirer.prompt
      .mockResolvedValueOnce({ choice: 'Get a sample tarot reading' })
      .mockResolvedValueOnce({ spreadName: 'threeCard' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await runClio();

    expect(mockCreate).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Your future is bright!'));

    delete process.env.OPENAI_API_KEY;
  });

  it('should show a message when OpenAI API key is missing', async () => {
    const { SPREADS } = require('../src/index');
    const mockReading = {
      spread: SPREADS.threeCard,
      cards: [{
        card: { getName: () => 'The Fool', uprightMeanings: ['New beginnings'], reversedMeanings: ['Recklessness'] },
        position: 1,
        isReversed: false,
      }],
    };
    jest.doMock('../src/index', () => ({
      ...jest.requireActual('../src/index'),
      SpreadReader: jest.fn().mockImplementation(() => ({
        performReading: jest.fn().mockReturnValue(mockReading),
      })),
    }));
    const inquirer = require('inquirer');
    inquirer.prompt
      .mockResolvedValueOnce({ choice: 'Get a sample tarot reading' })
      .mockResolvedValueOnce({ spreadName: 'threeCard' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await runClio();

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining("OPENAI_API_KEY not set"));
  });
});
