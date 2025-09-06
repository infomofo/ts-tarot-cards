import { MinorArcanaCard, MinorArcana, getMinorNumberName, Suit, MinorNumber } from '../types';
import { TAROT_DATA } from '../data-init';

const MINOR_ARCANA_CARDS: Record<string, MinorArcanaCard> = {};
TAROT_DATA.minorArcana.forEach((card: MinorArcanaCard) => {
    const key = `${card.name.toLowerCase().replace(/\s/g, '-')}` as MinorArcana;
    MINOR_ARCANA_CARDS[key] = card;
});

export { MINOR_ARCANA_CARDS };

export function getMinorArcanaCard(enumValue: MinorArcana): MinorArcanaCard | undefined {
  return MINOR_ARCANA_CARDS[enumValue];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  const numberName = getMinorNumberName(number).toLowerCase();
  const suitName = suit.toLowerCase();
  return `minor-${numberName}-of-${suitName}`;
}
