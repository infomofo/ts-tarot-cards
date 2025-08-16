import { MinorArcanaCard, Arcana, Suit, MinorNumber, getMinorNumberName } from '../types';

// Helper function to create a complete MinorArcanaCard with auto-generated properties
function createMinorArcanaCard(
  suit: Suit,
  number: MinorNumber,
  keywords: string[],
  uprightMeaning: string,
  reversedMeaning: string,
  description: string
): MinorArcanaCard {
  return {
    id: `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`,
    name: `${getMinorNumberName(number)} of ${suit}`,
    arcana: Arcana.Minor,
    suit,
    number,
    numericValue: number, // Automatically use the enum value
    keywords,
    uprightMeaning,
    reversedMeaning,
    description
  };
}

// Example minor arcana cards - extensible to full deck
export const MINOR_ARCANA_CARDS: Partial<Record<string, MinorArcanaCard>> = {
  'ace-of-cups': createMinorArcanaCard(
    Suit.Cups,
    MinorNumber.Ace,
    ['love', 'new relationships', 'compassion', 'creativity'],
    'New love, new relationships, new beginnings in love, spiritual awakening, intuitive awareness, compassion, creativity, and overflowing feelings.',
    'Emotional loss, blocked creativity, emptiness, lack of purpose, diversion, and emotional instability.',
    'The Ace of Cups represents new love, new relationships, new beginnings in love, spiritual awakening, intuitive awareness, compassion, creativity, and overflowing feelings.'
  ),
  'three-of-swords': createMinorArcanaCard(
    Suit.Swords,
    MinorNumber.Three,
    ['heartbreak', 'emotional pain', 'sorrow', 'grief'],
    'Heartbreak, emotional pain, sorrow, grief, hurt, trauma, sadness, rejection, separation, and loss.',
    'Negative self-talk, releasing pain, optimism, forgiveness, recovering from heartbreak, and healing.',
    'The Three of Swords represents heartbreak, emotional pain, sorrow, grief, hurt, trauma, sadness, rejection, separation, and loss.'
  ),
  'ten-of-wands': createMinorArcanaCard(
    Suit.Wands,
    MinorNumber.Ten,
    ['burden', 'extra responsibility', 'hard work', 'completion'],
    'Burden, extra responsibility, hard work, stress, achievement, creative blocks, and carrying a heavy load.',
    'Doing too much, overstressed, delegate, disorganization, and letting go of burdens.',
    'The Ten of Wands represents burden, extra responsibility, hard work, stress, achievement, and carrying a heavy load.'
  )
};

export function getMinorArcanaCard(suit: Suit, number: MinorNumber): MinorArcanaCard | undefined {
  const key = `${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
  return MINOR_ARCANA_CARDS[key];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
}