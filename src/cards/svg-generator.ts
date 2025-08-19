import {
  MajorArcanaCard,
  MinorArcanaCard,
  SVGOptions,
  TarotCard,
  Suit,
  MinorNumber,
  getMinorNumberName,
  Element,
} from '../types';
import { SUIT_PROPERTIES } from './suit';

const SUIT_EMOJI: Record<Suit, string> = {
  [Suit.Cups]: '🍵',
  [Suit.Pentacles]: '🪙',
  [Suit.Swords]: '🗡️',
  [Suit.Wands]: '🪄',
};

const FACE_CARD_EMOJI: Record<MinorNumber.Page | MinorNumber.Knight | MinorNumber.Queen | MinorNumber.King, string> = {
  [MinorNumber.Page]: '📜',
  [MinorNumber.Knight]: '♞',
  [MinorNumber.Queen]: '🫅',
  [MinorNumber.King]: '👑',
};

function getSuitColor(suit: Suit): string {
  const element = SUIT_PROPERTIES[suit].element;
  switch (element) {
    case Element.Water:
      return '#a0d2eb'; // Light Blue
    case Element.Earth:
      return '#d6a885'; // Light Brown
    case Element.Air:
      return '#e6e6fa'; // Lavender
    case Element.Fire:
      return '#f5b08c'; // Light Orange
    default:
      return '#f0f0f0'; // Light Grey
  }
}

export function generateSvg(card: TarotCard, options?: SVGOptions): string {
  if (card.arcana === 'Major') {
    return generateMajorArcanaSvg(card as MajorArcanaCard, options);
  } else {
    return generateMinorArcanaSvg(card as MinorArcanaCard, options);
  }
}

function generateMajorArcanaSvg(card: MajorArcanaCard, options?: SVGOptions): string {
  const {
    art_override_url,
    hide_number = false,
    hide_title = false,
  } = options || {};

  const backgroundColor = card.backgroundColor || '#ffffff';
  const title = card.getName();
  const romanNumeral = card.romanNumeral;
  const emoji = card.emoji;

  let artContent = '';
  if (art_override_url) {
    artContent = `<image href="${art_override_url}" x="0" y="0" height="100%" width="100%"/>`;
  } else if (emoji) {
    artContent = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100">${emoji}</text>`;
  }

  const numberContent = hide_number
    ? ''
    : `<text x="50%" y="15%" dominant-baseline="middle" text-anchor="middle" font-size="24" font-weight="bold">${romanNumeral}</text>`;

  const titleContent = hide_title
    ? ''
    : `<rect x="10%" y="80%" width="80%" height="15%" fill="white" stroke="black" stroke-width="2" />
       <text x="50%" y="88%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold" fill="black">${title}</text>`;

  return `
    <svg width="300" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      ${artContent}
      ${numberContent}
      ${titleContent}
    </svg>
  `;
}

function generateMinorArcanaSvg(card: MinorArcanaCard, options?: SVGOptions): string {
  const {
    art_override_url,
    hide_number = false,
    hide_suit = false,
  } = options || {};

  const backgroundColor = getSuitColor(card.suit);
  const romanNumeral = card.romanNumeral;
  const suitEmoji = SUIT_EMOJI[card.suit];

  let artContent = '';

  if (art_override_url) {
    artContent = `<image href="${art_override_url}" x="0" y="0" height="100%" width="100%"/>`;
  } else {
    if (card.number >= MinorNumber.Page) {
      // Face card
      const faceCardName = getMinorNumberName(card.number);
      const faceCardEmoji = FACE_CARD_EMOJI[card.number as keyof typeof FACE_CARD_EMOJI];
      artContent = `
        <rect x="10%" y="5%" width="80%" height="15%" fill="white" stroke="black" stroke-width="2" />
        <text x="50%" y="13%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold" fill="black">${faceCardName}</text>
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="60">${faceCardEmoji}</text>
        <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="60">${suitEmoji}</text>
      `;
    } else {
      // Number card
      const positions = getEmojiPositions(card.number);
      artContent = positions
        .map(
          (pos) =>
            `<text x="${pos.x}%" y="${pos.y}%" dominant-baseline="middle" text-anchor="middle" font-size="40">${suitEmoji}</text>`
        )
        .join('');
    }
  }

  const numberContent = hide_number || card.number >= MinorNumber.Page
    ? ''
    : `<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="24" font-weight="bold">${romanNumeral}</text>`;

  const suitContent = (!hide_suit && card.number >= MinorNumber.Page)
    ? `<text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" font-size="24">${suitEmoji}</text>`
    : '';

  return `
    <svg width="300" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      ${artContent}
      ${numberContent}
      ${suitContent}
    </svg>
  `;
}

function getEmojiPositions(number: MinorNumber): { x: number; y: number }[] {
  const full_width = 100
  const full_height = 100
  const center_x = full_width / 2
  const center_y = full_height / 2
  const padding = 15
  const positions: { [key: number]: { x: number; y: number }[] } = {
    [MinorNumber.Ace]: [{ x: center_x, y: center_y }],
    [MinorNumber.Two]: [{ x: center_x, y: padding }, { x: center_x, y: full_height - padding }],
    [MinorNumber.Three]: [{ x: center_x, y: padding }, { x: center_x, y: center_y }, { x: center_x, y: full_height - padding }],
    [MinorNumber.Four]: [{ x: padding, y: padding }, { x: full_width - padding, y: padding }, { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding }],
    [MinorNumber.Five]: [{ x: padding, y: padding }, { x: full_width - padding, y: padding }, { x: center_x, y: center_y }, { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding }],
    [MinorNumber.Six]: [
        { x: padding, y: padding }, { x: full_width - padding, y: padding },
        { x: padding, y: center_y }, { x: full_width - padding, y: center_y },
        { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding },
    ],
    [MinorNumber.Seven]: [
        { x: padding, y: padding }, { x: full_width - padding, y: padding },
        { x: center_x, y: padding + (center_y - padding) / 2 },
        { x: padding, y: center_y }, { x: full_width - padding, y: center_y },
        { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding },
    ],
    [MinorNumber.Eight]: [
        { x: padding, y: padding }, { x: full_width - padding, y: padding },
        { x: padding, y: padding + (center_y - padding) / 2 }, { x: full_width - padding, y: padding + (center_y - padding) / 2 },
        { x: padding, y: center_y + (center_y - padding) / 2 }, { x: full_width - padding, y: center_y + (center_y - padding) / 2 },
        { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding },
    ],
    [MinorNumber.Nine]: [
        { x: padding, y: padding }, { x: full_width - padding, y: padding },
        { x: padding, y: padding + (center_y - padding) / 3 }, { x: full_width - padding, y: padding + (center_y - padding) / 3 },
        { x: center_x, y: center_y },
        { x: padding, y: center_y + (center_y - padding) / 3 }, { x: full_width - padding, y: center_y + (center_y - padding) / 3 },
        { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding },
    ],
    [MinorNumber.Ten]: [
        { x: padding, y: padding }, { x: full_width - padding, y: padding },
        { x: center_x, y: padding + (center_y - padding) / 3 },
        { x: padding, y: center_y - (center_y - padding) / 3 }, { x: full_width - padding, y: center_y - (center_y - padding) / 3 },
        { x: padding, y: center_y + (center_y - padding) / 3 }, { x: full_width - padding, y: center_y + (center_y - padding) / 3 },
        { x: center_x, y: full_height - padding - (center_y - padding) / 3 },
        { x: padding, y: full_height - padding }, { x: full_width - padding, y: full_height - padding },
    ],
  };
  return positions[number] || [];
}
