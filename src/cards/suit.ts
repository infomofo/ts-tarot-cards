import { Suit, SuitProperties } from '../types';
import { TAROT_DATA } from '../data-init';

export const SUIT_PROPERTIES: Record<Suit, SuitProperties> = TAROT_DATA.suitProperties;

export function getSuitProperties(suit: Suit): SuitProperties {
  return SUIT_PROPERTIES[suit];
}
