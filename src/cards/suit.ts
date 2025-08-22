import { Suit, SuitProperties } from '../types';
import { loadSuitProperties } from '../data-loader';

export const SUIT_PROPERTIES: Record<Suit, SuitProperties> = loadSuitProperties();

export function getSuitProperties(suit: Suit): SuitProperties {
  return SUIT_PROPERTIES[suit];
}
