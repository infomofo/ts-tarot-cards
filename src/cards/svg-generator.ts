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
    hide_emoji = false,
  } = options || {};

  const backgroundColor = card.backgroundColor || '#ffffff';
  const title = card.getName();
  const romanNumeral = card.romanNumeral;
  const emoji = card.emoji;

  let artContent = '';
  if (art_override_url) {
    artContent = `<image href="${art_override_url}" x="0" y="0" height="100%" width="100%"/>`;
  } else if (emoji && !hide_emoji) {
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
    hide_emoji = false,
  } = options || {};

  const backgroundColor = getSuitColor(card.suit);
  const suitEmoji = SUIT_PROPERTIES[card.suit].emoji;

  let artContent = '';
  let numberContent = '';

  // Determine Art Content
  if (art_override_url) {
    artContent = `<image href="${art_override_url}" x="0" y="0" height="100%" width="100%"/>`;
  } else if (!hide_emoji) {
    if (card.number === MinorNumber.Ace) {
      artContent = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="120">${suitEmoji}</text>`;
    } else if (card.number >= MinorNumber.Page) {
      const faceCardName = getMinorNumberName(card.number);
      artContent = `
        <rect x="10%" y="5%" width="80%" height="15%" fill="white" stroke="black" stroke-width="2" />
        <text x="50%" y="13%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold" fill="black">${faceCardName}</text>
        <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" font-size="60">${card.faceCardEmoji}</text>
        <text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" font-size="60">${suitEmoji}</text>
      `;
    } else {
      const positions = getEmojiPositions(card.number);
      artContent = positions
        .map(pos => `<text x="${pos.x}%" y="${pos.y}%" dominant-baseline="middle" text-anchor="middle" font-size="40">${suitEmoji}</text>`)
        .join('');
    }
  }

  // Determine Number Content
  if (!hide_number && card.number < MinorNumber.Page) {
    const text = card.number === MinorNumber.Ace ? 'Ace' : card.romanNumeral;
    numberContent = `
      <text x="8%" y="8%" dominant-baseline="hanging" text-anchor="start" font-size="24" font-weight="bold">${text}</text>
      <text x="92%" y="92%" dominant-baseline="text-after-edge" text-anchor="end" font-size="24" font-weight="bold">${text}</text>
    `;
  }

  return `
    <svg width="300" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      ${artContent}
      ${numberContent}
    </svg>
  `;
}

function getEmojiPositions(number: MinorNumber): { x: number; y: number }[] {
  const full_width = 100
  const full_height = 100
  const center_x = full_width / 2
  const center_y = full_height / 2
  const padding_x = 25
  const padding_y = 20
  const positions: { [key: number]: { x: number; y: number }[] } = {
    [MinorNumber.Ace]: [{ x: center_x, y: center_y }],
    [MinorNumber.Two]: [{ x: center_x, y: padding_y + 10 }, { x: center_x, y: full_height - padding_y - 10 }],
    [MinorNumber.Three]: [{ x: padding_x, y: padding_y }, { x: center_x, y: center_y }, { x: full_width - padding_x, y: full_height - padding_y }],
    [MinorNumber.Four]: [{ x: padding_x, y: padding_y }, { x: full_width - padding_x, y: padding_y }, { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y }],
    [MinorNumber.Five]: [{ x: padding_x, y: padding_y }, { x: full_width - padding_x, y: padding_y }, { x: center_x, y: center_y }, { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y }],
    [MinorNumber.Six]: [
        { x: padding_x, y: padding_y }, { x: full_width - padding_x, y: padding_y },
        { x: padding_x, y: center_y }, { x: full_width - padding_x, y: center_y },
        { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y },
    ],
    [MinorNumber.Seven]: [
      { x: padding_x, y: padding_y }, { x: full_width - padding_x, y: padding_y },
      { x: center_x, y: padding_y + (center_y - padding_y) / 2 },
      { x: padding_x, y: center_y + 10 }, { x: full_width - padding_x, y: center_y + 10 },
      { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y },
    ],
    [MinorNumber.Eight]: [
        { x: padding_x, y: padding_y }, { x: full_width - padding_x, y: padding_y },
        { x: padding_x, y: padding_y + (center_y - padding_y) / 2 }, { x: full_width - padding_x, y: padding_y + (center_y - padding_y) / 2 },
        { x: padding_x, y: center_y + (center_y - padding_y) / 2 + 5 }, { x: full_width - padding_x, y: center_y + (center_y - padding_y) / 2 + 5 },
        { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y },
    ],
    [MinorNumber.Nine]: [
        { x: padding_x, y: padding_y }, { x: center_x, y: padding_y }, { x: full_width - padding_x, y: padding_y },
        { x: padding_x, y: center_y }, { x: center_x, y: center_y }, { x: full_width - padding_x, y: center_y },
        { x: padding_x, y: full_height - padding_y }, { x: center_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y },
    ],
    [MinorNumber.Ten]: [
        { x: padding_x, y: padding_y }, { x: center_x, y: padding_y }, { x: full_width - padding_x, y: padding_y },
        { x: padding_x, y: padding_y + (center_y - padding_y) / 2 }, { x: full_width - padding_x, y: padding_y + (center_y - padding_y) / 2 },
        { x: center_x, y: center_y },
        { x: padding_x, y: center_y + (center_y - padding_y) / 2 }, { x: full_width - padding_x, y: center_y + (center_y - padding_y) / 2 },
        { x: padding_x, y: full_height - padding_y }, { x: full_width - padding_x, y: full_height - padding_y },
    ],
  };
  return positions[number] || [];
}
