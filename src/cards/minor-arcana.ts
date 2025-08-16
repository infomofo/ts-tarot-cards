import { TarotCard, Arcana, Suit, MinorNumber } from '../types';

// Example minor arcana cards - extensible to full deck
export const MINOR_ARCANA_CARDS: Partial<Record<string, TarotCard>> = {
  'cups-ace': {
    id: 'minor-cups-ace',
    name: 'Ace of Cups',
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
    name: 'Three of Swords',
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
    name: 'Ten of Wands',
    arcana: Arcana.Minor,
    suit: Suit.Wands,
    number: MinorNumber.Ten,
    keywords: ['burden', 'extra responsibility', 'hard work', 'completion'],
    uprightMeaning: 'Burden, extra responsibility, hard work, stress, achievement, creative blocks, and carrying a heavy load.',
    reversedMeaning: 'Doing too much, overstressed, delegate, disorganization, and letting go of burdens.',
    description: 'The Ten of Wands represents burden, extra responsibility, hard work, stress, achievement, and carrying a heavy load.'
  }
};

export function getMinorArcanaCard(suit: Suit, number: MinorNumber): TarotCard | undefined {
  const key = `${suit.toLowerCase()}-${number.toLowerCase()}`;
  return MINOR_ARCANA_CARDS[key];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${suit.toLowerCase()}-${number.toLowerCase()}`;
}