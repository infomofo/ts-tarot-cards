import { MinorArcanaCard, Arcana, Suit, MinorNumber, getMinorNumberName } from '../types';

// Example minor arcana cards - extensible to full deck
export const MINOR_ARCANA_CARDS: Partial<Record<string, MinorArcanaCard>> = {
  'cups-ace': {
    id: 'minor-cups-ace',
    name: `${getMinorNumberName(MinorNumber.Ace)} of ${Suit.Cups}`,
    arcana: Arcana.Minor,
    suit: Suit.Cups,
    number: MinorNumber.Ace,
    keywords: ['love', 'new relationships', 'compassion', 'creativity'],
    uprightMeaning: 'New love, new relationships, new beginnings in love, spiritual awakening, intuitive awareness, compassion, creativity, and overflowing feelings.',
    reversedMeaning: 'Emotional loss, blocked creativity, emptiness, lack of purpose, diversion, and emotional instability.',
    description: 'The Ace of Cups represents new love, new relationships, new beginnings in love, spiritual awakening, intuitive awareness, compassion, creativity, and overflowing feelings.'
  },
  'swords-three': {
    id: 'minor-swords-three',
    name: `${getMinorNumberName(MinorNumber.Three)} of ${Suit.Swords}`,
    arcana: Arcana.Minor,
    suit: Suit.Swords,
    number: MinorNumber.Three,
    keywords: ['heartbreak', 'emotional pain', 'sorrow', 'grief'],
    uprightMeaning: 'Heartbreak, emotional pain, sorrow, grief, hurt, trauma, sadness, rejection, separation, and loss.',
    reversedMeaning: 'Negative self-talk, releasing pain, optimism, forgiveness, recovering from heartbreak, and healing.',
    description: 'The Three of Swords represents heartbreak, emotional pain, sorrow, grief, hurt, trauma, sadness, rejection, separation, and loss.'
  },
  'wands-ten': {
    id: 'minor-wands-ten',
    name: `${getMinorNumberName(MinorNumber.Ten)} of ${Suit.Wands}`,
    arcana: Arcana.Minor,
    suit: Suit.Wands,
    number: MinorNumber.Ten,
    keywords: ['burden', 'extra responsibility', 'hard work', 'completion'],
    uprightMeaning: 'Burden, extra responsibility, hard work, stress, achievement, creative blocks, and carrying a heavy load.',
    reversedMeaning: 'Doing too much, overstressed, delegate, disorganization, and letting go of burdens.',
    description: 'The Ten of Wands represents burden, extra responsibility, hard work, stress, achievement, and carrying a heavy load.'
  }
};

export function getMinorArcanaCard(suit: Suit, number: MinorNumber): MinorArcanaCard | undefined {
  const key = `${suit.toLowerCase()}-${getMinorNumberName(number).toLowerCase()}`;
  return MINOR_ARCANA_CARDS[key];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${suit.toLowerCase()}-${getMinorNumberName(number).toLowerCase()}`;
}