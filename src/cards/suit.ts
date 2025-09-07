import { Suit, SuitProperties } from '../types';
import { ALL_SUIT_PROPS } from '../data';

export function getSuitProperties(suit: Suit): SuitProperties {
  return ALL_SUIT_PROPS[suit];
}
