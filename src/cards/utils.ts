import { MinorNumber, Suit } from '../types';

const FACE_CARD_EMOJI_MAP: Partial<Record<MinorNumber, string>> = {
  [MinorNumber.Page]: '📜',
  [MinorNumber.Knight]: '♞',
};

export function getFaceCardEmoji(number: MinorNumber, suit: Suit): string | undefined {
  if (number === MinorNumber.Page || number === MinorNumber.Knight) {
    return FACE_CARD_EMOJI_MAP[number];
  }
  if (number === MinorNumber.Queen) {
    switch (suit) {
      case Suit.Cups:
        return '👸🏼';
      case Suit.Swords:
        return '👸🏻';
      case Suit.Wands:
        return '👸🏽';
      case Suit.Pentacles:
        return '👸🏾';
    }
  }
  if (number === MinorNumber.King) {
    switch (suit) {
      case Suit.Cups:
        return '🤴🏼';
      case Suit.Swords:
        return '🤴🏻';
      case Suit.Wands:
        return '🤴🏽';
      case Suit.Pentacles:
        return '🤴🏾';
    }
  }
  return undefined;
}
