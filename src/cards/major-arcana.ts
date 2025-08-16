import { MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName } from '../types';

// Example major arcana cards - extensible to full deck
export const MAJOR_ARCANA_CARDS: Partial<Record<MajorArcana, MajorArcanaCard>> = {
  [MajorArcana.TheFool]: {
    id: 'major-00-fool',
    name: getMajorArcanaName(MajorArcana.TheFool),
    arcana: Arcana.Major,
    number: MajorArcana.TheFool,
    keywords: ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    uprightMeaning: 'New beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.',
    reversedMeaning: 'Holding back, recklessness, risk-taking, being too trusting, naivety, inconsideration, stupidity, distraction, apathy, and irrationality.',
    description: 'The Fool represents new beginnings, having faith in the future, being inexperienced, not knowing what to expect, having beginner\'s luck, improvisation and believing in the universe.'
  },
  [MajorArcana.TheMagician]: {
    id: 'major-01-magician',
    name: getMajorArcanaName(MajorArcana.TheMagician),
    arcana: Arcana.Major,
    number: MajorArcana.TheMagician,
    keywords: ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    uprightMeaning: 'Manifestation, resourcefulness, power, inspired action, creativity, willpower, concentration, and having the tools and skills to accomplish your goals.',
    reversedMeaning: 'Manipulation, poor planning, untapped talents, lack of direction, weak willpower, scattered energy, and not using your abilities to their fullest potential.',
    description: 'The Magician represents manifestation, resourcefulness, power, inspired action, creativity, willpower, concentration, and having the tools and skills to accomplish your goals.'
  }
};

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}