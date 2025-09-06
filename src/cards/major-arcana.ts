import { MajorArcanaCard, MajorArcana, getMajorArcanaName } from '../types';
import { TAROT_DATA } from '../data-init';

const MAJOR_ARCANA_CARDS: Record<string, MajorArcanaCard> = {};
TAROT_DATA.majorArcana.forEach((card: MajorArcanaCard) => {
    MAJOR_ARCANA_CARDS[card.number] = card;
});

export { MAJOR_ARCANA_CARDS };

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}

export function createMajorArcanaId(arcana: MajorArcana): string {
  const cardName = getMajorArcanaName(arcana);
  return `major-${arcana.toString().padStart(2, '0')}-${cardName.toLowerCase().replace(/\s+/g, '-')}`;
}
