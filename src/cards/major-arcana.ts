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
export const MAJOR_ARCANA_CARDS: Partial<Record<string, MajorArcanaCard>> = {
  'the-fool': createMajorArcanaCard(
    MajorArcana.TheFool,
    ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    [
      'New beginnings and fresh starts',
      'Having faith in the future', 
      'Being inexperienced but optimistic',
      'Beginner\'s luck and natural talent',
      'Improvisation and spontaneity',
      'Believing in the universe and taking leaps of faith'
    ],
    [
      'Holding back and fear of taking risks',
      'Recklessness and poor judgment',
      'Being overly trusting or naive',
      'Inconsideration of consequences',
      'Distraction and lack of focus',
      'Irrationality and foolish behavior'
    ],
    'A young figure stands at the edge of a cliff, about to step into the unknown. Dressed in colorful robes with a small bag on a stick, accompanied by a white dog. The sun shines brightly overhead, and mountains stretch into the distance.',
    'The Fool represents the very beginning of the Major Arcana journey - the soul\'s first step into physical incarnation and earthly experience. As card 0, it embodies pure potential and the courage to begin. The Fool\'s journey through the Major Arcana represents the soul\'s evolution and spiritual awakening.',
    'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.'
  ),
  'the-magician': createMajorArcanaCard(
    MajorArcana.TheMagician,
    ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    [
      'Manifestation and creation',
      'Resourcefulness and skill',
      'Personal power and confidence',
      'Inspired action and determination',
      'Creativity and innovation',
      'Having the tools and skills to accomplish goals',
      'Willpower and concentration',
      'Communication and influence'
    ],
    [
      'Manipulation and trickery',
      'Poor planning and lack of forethought',
      'Untapped talents and wasted potential',
      'Lack of direction and scattered energy',
      'Weak willpower and indecision',
      'Using abilities for selfish or harmful purposes',
      'Overconfidence and arrogance'
    ],
    'A figure stands before an altar with the four suit symbols (cup, pentacle, sword, wand) representing the four elements. One hand points to heaven, the other to earth, with an infinity symbol above the head. Red and white robes symbolize passion and purity.',
    'The Magician represents the soul\'s first conscious act of will after The Fool\'s leap of faith. As the first numbered card, it shows the moment when potential becomes directed energy. The Magician teaches us to harness our will and use the tools available to manifest our desires in the physical world.',
    'The Magician represents manifestation, resourcefulness, power, inspired action, creativity, willpower, concentration, and having the tools and skills to accomplish your goals.'
  )
};

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  const key = getMajorArcanaName(arcana).toLowerCase().replace(/\s+/g, '-');
  return MAJOR_ARCANA_CARDS[key];
}

export function createMajorArcanaId(arcana: MajorArcana): string {
  return `major-${arcana.toString().padStart(2, '0')}-${getMajorArcanaName(arcana).toLowerCase().replace(/\s+/g, '-')}`;
}