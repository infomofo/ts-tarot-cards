import { MinorArcanaCard, Arcana, Suit, MinorNumber, MinorArcana, getMinorNumberName, toRomanNumeral } from '../types';

// Concrete implementation of MinorArcanaCard with localization support
class MinorArcanaCardImpl implements MinorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Minor = Arcana.Minor;
  public readonly suit: Suit;
  public readonly number: MinorNumber;
  public readonly numericValue: MinorNumber;
  public readonly romanNumeral: string;
  public readonly keywords: string[];
  public readonly uprightMeanings: string[];
  public readonly reversedMeanings: string[];
  public readonly visualDescription: string;
  public readonly significance: string;
  public readonly description: string;

  constructor(
    suit: Suit,
    number: MinorNumber,
    keywords: string[],
    uprightMeanings: string[],
    reversedMeanings: string[],
    visualDescription: string,
    significance: string,
    description: string
  ) {
    this.id = `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
    this.suit = suit;
    this.number = number;
    this.numericValue = number; // Automatically use the enum value
    this.romanNumeral = toRomanNumeral(number);
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
    return `${getMinorNumberName(this.number)} of ${this.suit}`;
  }
}

// Helper function to create a complete MinorArcanaCard with auto-generated properties
function createMinorArcanaCard(
  suit: Suit,
  number: MinorNumber,
  keywords: string[],
  uprightMeanings: string[],
  reversedMeanings: string[],
  visualDescription: string,
  significance: string,
  description: string
): MinorArcanaCard {
  return new MinorArcanaCardImpl(suit, number, keywords, uprightMeanings, reversedMeanings, visualDescription, significance, description);
}

// Example minor arcana cards - extensible to full deck
export const MINOR_ARCANA_CARDS: Partial<Record<MinorArcana, MinorArcanaCard>> = {
  [MinorArcana.AceOfCups]: createMinorArcanaCard(
    Suit.Cups,
    MinorNumber.Ace,
    ['love', 'new relationships', 'compassion', 'creativity'],
    [
      'New love and emotional beginnings',
      'Spiritual awakening and intuitive awareness',
      'Compassion and empathy',
      'Creative inspiration',
      'Overflowing feelings and emotional abundance',
      'New relationships and deep connections',
      'Opening your heart to possibilities'
    ],
    [
      'Emotional loss and blocked feelings',
      'Blocked creativity and inspiration',
      'Emptiness and lack of fulfillment',
      'Lack of purpose or spiritual connection',
      'Emotional instability',
      'Closed heart and difficulty connecting'
    ],
    'A hand emerges from a cloud, holding a golden chalice overflowing with water. Five streams of water pour from the cup, with a dove descending toward it carrying a communion wafer. Lotus blossoms float on the water below.',
    'The Ace of Cups represents the beginning of the emotional and spiritual journey in the suit of Cups. As the first card in the suit of Water/Emotions, it embodies pure emotional potential and the opening of the heart. It marks the start of the emotional journey through love, relationships, and spiritual awakening.',
    'The Ace of Cups represents new love, new relationships, new beginnings in love, spiritual awakening, intuitive awareness, compassion, creativity, and overflowing feelings.'
  ),
  [MinorArcana.ThreeOfSwords]: createMinorArcanaCard(
    Suit.Swords,
    MinorNumber.Three,
    ['heartbreak', 'emotional pain', 'sorrow', 'grief'],
    [
      'Heartbreak and emotional pain',
      'Necessary endings and release',
      'Learning through sorrow',
      'Grief and mourning process',
      'Emotional healing and recovery',
      'Truth and clarity through pain',
      'Liberation from toxic situations'
    ],
    [
      'Negative self-talk and self-blame',
      'Optimism and emotional recovery',
      'Forgiveness and moving forward',
      'Recovering from heartbreak',
      'Healing emotional wounds',
      'Releasing pain and finding peace'
    ],
    'A large red heart pierced by three swords against a stormy gray sky filled with heavy clouds. Rain falls steadily, representing tears and emotional release.',
    'The Three of Swords represents a crucial point in the suit of Swords\' journey through the realm of thoughts and communication. In the Air element\'s progression, this card shows how mental clarity sometimes requires painful truth and the cutting away of illusions. It teaches that heartbreak can lead to wisdom and that pain often precedes growth.',
    'The Three of Swords represents heartbreak, emotional pain, sorrow, grief, hurt, trauma, sadness, rejection, separation, and loss.'
  ),
  [MinorArcana.TenOfWands]: createMinorArcanaCard(
    Suit.Wands,
    MinorNumber.Ten,
    ['burden', 'extra responsibility', 'hard work', 'completion'],
    [
      'Achievement through perseverance',
      'Carrying extra responsibility',
      'Hard work paying off',
      'Completion of a challenging project',
      'Success that comes with a price',
      'Determination and commitment',
      'Almost reaching your goal'
    ],
    [
      'Doing too much and burnout',
      'Being overstressed and overwhelmed',
      'Need to delegate responsibilities',
      'Disorganization and chaos',
      'Letting go of unnecessary burdens',
      'Learning to ask for help'
    ],
    'A figure struggling to carry ten heavy wands toward a nearby village. The person is bent over with the weight but can see their destination ahead. The burden is almost overwhelming, but the goal is within reach.',
    'The Ten of Wands represents the culmination of the Fire element\'s journey in the suit of Wands. This card shows the final stage before completion, where the creative energy and passion that began with the Ace has grown into a significant responsibility. It teaches that success often requires carrying heavy loads and that achievement comes through perseverance.',
    'The Ten of Wands represents burden, extra responsibility, hard work, stress, achievement, and carrying a heavy load.'
  )
};

export function getMinorArcanaCard(enumValue: MinorArcana): MinorArcanaCard | undefined {
  return MINOR_ARCANA_CARDS[enumValue];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
}