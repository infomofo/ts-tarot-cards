import { MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName } from '../types';

// Concrete implementation of MajorArcanaCard with localization support
class MajorArcanaCardImpl implements MajorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Major = Arcana.Major;
  public readonly number: MajorArcana;
  public readonly numericValue: MajorArcana;
  public readonly keywords: string[];
  public readonly uprightMeanings: string[];
  public readonly reversedMeanings: string[];
  public readonly visualDescription: string;
  public readonly significance: string;
  public readonly description: string;

  constructor(
    number: MajorArcana,
    keywords: string[],
    uprightMeanings: string[],
    reversedMeanings: string[],
    visualDescription: string,
    significance: string,
    description: string
  ) {
    // Auto-generate ID like minor arcana
    this.id = `major-${number.toString().padStart(2, '0')}-${getMajorArcanaName(number).toLowerCase().replace(/\s+/g, '-')}`;
    this.number = number;
    this.numericValue = number;
    this.keywords = keywords;
    this.uprightMeanings = uprightMeanings;
    this.reversedMeanings = reversedMeanings;
    this.visualDescription = visualDescription;
    this.significance = significance;
    this.description = description;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return getMajorArcanaName(this.number);
  }
}

// Helper function to create a complete MajorArcanaCard with auto-generated properties
function createMajorArcanaCard(
  number: MajorArcana,
  keywords: string[],
  uprightMeanings: string[],
  reversedMeanings: string[],
  visualDescription: string,
  significance: string,
  description: string
): MajorArcanaCard {
  return new MajorArcanaCardImpl(number, keywords, uprightMeanings, reversedMeanings, visualDescription, significance, description);
}

// Example major arcana cards - extensible to full deck
export const MAJOR_ARCANA_CARDS: Partial<Record<MajorArcana, MajorArcanaCard>> = {
  [MajorArcana.TheFool]: createMajorArcanaCard(
    MajorArcana.TheFool,
    ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    [
      'New beginnings',
      'Blind faith',
      'Innocence and naïveté',
      'Beginner\'s luck',
      'Spontaneity',
      'Leap of faith',
    ],
    [
      'Fear of risks',
      'Reckless behavior',
      'Excessive naïveté',
      'Poor judgment',
      'Distraction',
      'Foolish choices',
    ],
    'A young figure stands at the edge of a cliff, about to step into the unknown. Dressed in colorful robes with a small bag on a stick, accompanied by a white dog. The sun shines brightly overhead, and mountains stretch into the distance.',
    'The beginning of the Major Arcana journey - the soul\'s first step into physical incarnation. As card 0, it embodies pure potential and naive courage to begin.',
    'Represents new beginnings, blind faith in the future, inexperience, beginner\'s luck, and improvisation. Ignorance is bliss.'
  ),
  [MajorArcana.TheMagician]: createMajorArcanaCard(
    MajorArcana.TheMagician,
    ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    [
      'Manifestation',
      'Resourcefulness',
      'Personal power',
      'Inspired action',
      'Creativity',
      'Willpower',
      'Focus and concentration',
      'Communication skills',
    ],
    [
      'Manipulation',
      'Poor planning',
      'Wasted potential',
      'Scattered energy',
      'Weak willpower',
      'Selfish intentions',
      'Arrogance',
    ],
    'A figure stands before an altar with the four suit symbols (cup, pentacle, sword, wand) representing the four elements. One hand points to heaven, the other to earth, with an infinity symbol above the head. Red and white robes symbolize passion and purity.',
    'The soul\'s first conscious act of will after the leap of faith. As card 1, it transforms potential into directed energy and teaches us to harness our will to manifest desires.',
    'Represents manifestation, resourcefulness, personal power, willpower, and having the tools to accomplish your goals. As above, so below.'
  )
};

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}

export function createMajorArcanaId(arcana: MajorArcana): string {
  return `major-${arcana.toString().padStart(2, '0')}-${getMajorArcanaName(arcana).toLowerCase().replace(/\s+/g, '-')}`;
}