jest.mock('inquirer');
import inquirer from 'inquirer';
import { mainMenu } from '../src/cli/index';
import { SpreadReader } from '../src/index';

describe('CLIO CLI', () => {
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
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });

  it('should show card details and loop', async () => {
    (inquirer.prompt as unknown as jest.Mock)
      .mockResolvedValueOnce({ choice: 'Learn about the tarot cards' })
      .mockResolvedValueOnce({ cardName: 'The Fool' })
      .mockResolvedValueOnce({ continue: true })
      .mockResolvedValueOnce({ cardName: 'The Magician' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await mainMenu();

    expect(inquirer.prompt).toHaveBeenCalledTimes(6);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Magician ***'));
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
    jest.spyOn(SpreadReader.prototype, 'performReading').mockReturnValue(mockReading as any);

    (inquirer.prompt as unknown as jest.Mock)
      .mockResolvedValueOnce({ choice: 'Get a sample tarot reading' })
      .mockResolvedValueOnce({ spreadName: 'threeCard' })
      .mockResolvedValueOnce({ continue: false })
      .mockResolvedValueOnce({ choice: 'Exit' });

    await mainMenu();

    expect(inquirer.prompt).toHaveBeenCalledTimes(4);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Fool (Past) ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The Magician (Present) ***'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('*** The High Priestess (Future) ***'));
  });
});
