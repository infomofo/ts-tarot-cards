import { Suit, Element, SuitProperties } from '../types';

export const SUIT_PROPERTIES: Record<Suit, SuitProperties> = {
  [Suit.Cups]: {
    element: Element.Water,
    generalMeaning: 'Emotions, relationships, spirituality, intuition',
    keywords: ['love', 'emotions', 'relationships', 'intuition', 'spirituality', 'subconscious'],
    emoji: '🍵'
  },
  [Suit.Pentacles]: {
    element: Element.Earth,
    generalMeaning: 'Material world, money, career, health, manifestation',
    keywords: ['money', 'career', 'material', 'health', 'practical', 'manifestation'],
    emoji: '🪙'
  },
  [Suit.Swords]: {
    element: Element.Air,
    generalMeaning: 'Thoughts, communication, conflict, intellect',
    keywords: ['thoughts', 'communication', 'conflict', 'intellect', 'logic', 'challenges'],
    emoji: '🗡️'
  },
  [Suit.Wands]: {
    element: Element.Fire,
    generalMeaning: 'Passion, creativity, energy, inspiration, career',
    keywords: ['passion', 'creativity', 'energy', 'inspiration', 'action', 'growth'],
    emoji: '🪄'
  }
};

export function getSuitProperties(suit: Suit): SuitProperties {
  return SUIT_PROPERTIES[suit];
}
