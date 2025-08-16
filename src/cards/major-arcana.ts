import { MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName } from '../types';

// Concrete implementation of MajorArcanaCard with localization support
class MajorArcanaCardImpl implements MajorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Major = Arcana.Major;
  public readonly number: MajorArcana;
  public readonly numericValue: MajorArcana;
  public readonly keywords: string[];
  public readonly uprightMeaning: string;
  public readonly reversedMeaning: string;
  public readonly description: string;

  constructor(
    id: string,
    number: MajorArcana,
    keywords: string[],
    uprightMeaning: string,
    reversedMeaning: string,
    description: string
  ) {
    this.id = id;
    this.number = number;
    this.numericValue = number;
    this.keywords = keywords;
    this.uprightMeaning = uprightMeaning;
    this.reversedMeaning = reversedMeaning;
    this.description = description;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return getMajorArcanaName(this.number);
  }
}

// Example major arcana cards - extensible to full deck
export const MAJOR_ARCANA_CARDS: Partial<Record<MajorArcana, MajorArcanaCard>> = {
  [MajorArcana.TheFool]: new MajorArcanaCardImpl(
    'major-00-fool',
    MajorArcana.TheFool,
    ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    'New beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    'Holding back, recklessness, risk-taking, being too trusting, naivety, inconsideration, stupidity, distraction, apathy, and irrationality.',
    'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.'
  ),
  [MajorArcana.TheMagician]: new MajorArcanaCardImpl(
    'major-01-magician',
    MajorArcana.TheMagician,
    ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    'Manifestation, resourcefulness, power, inspired action, creativity, willpower, concentration, and having the tools and skills to accomplish your goals.',
    'Manipulation, poor planning, untapped talents, lack of direction, weak willpower, scattered energy, and not using your abilities to their fullest potential.',
    'The Magician represents manifestation, resourcefulness, power, inspired action, creativity, willpower, concentration, and having the tools and skills to accomplish your goals.'
  )
};

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}