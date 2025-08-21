import {
  Arcana,
  MajorArcanaCard,
  MinorArcanaCard,
  SVGOptions,
  TarotCard,
  Suit,
  MinorNumber,
  getMinorNumberName,
  Element,
} from '../types';
import { getFaceCardEmoji } from './utils';
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

export function getTopText(card: TarotCard): string {
  if (card.arcana === Arcana.Major) {
    return card.romanNumeral;
  }
  const minorCard = card as MinorArcanaCard;
  switch (minorCard.number) {
    case MinorNumber.Ace:
    case MinorNumber.Page:
    case MinorNumber.Knight:
    case MinorNumber.Queen:
    case MinorNumber.King:
      return getMinorNumberName(minorCard.number);
    default:
      return minorCard.romanNumeral;
  }
}

export function generateSvg(card: TarotCard, options?: SVGOptions): string {
  const {
    art_override_url,
    hide_number = false,
    hide_title = false,
    hide_emoji = false,
    isReversed = false,
    inner_svg = false,
  } = options || {};

  const backgroundColor = card.arcana === Arcana.Major
    ? (card as MajorArcanaCard).backgroundColor || '#ffffff'
    : getSuitColor((card as MinorArcanaCard).suit);

  const topText = getTopText(card);
  const numberContent = hide_number ? '' : `<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold">${topText}</text>`;

  let artContent = '';
  if (art_override_url) {
    artContent = `<image href="${art_override_url}" x="10%" y="15%" width="80%" height="65%" preserveAspectRatio="xMidYMid slice"/>`;
  } else if (!hide_emoji) {
    if (card.arcana === Arcana.Major) {
        const emoji = (card as MajorArcanaCard).emoji;
        if (emoji) {
            artContent = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100">${emoji}</text>`;
        }
    } else {
        const minorCard = card as MinorArcanaCard;
        const suitEmoji = SUIT_PROPERTIES[minorCard.suit].emoji;
        if (minorCard.number >= MinorNumber.Page) {
            artContent = `
                <text x="50%" y="40%" dominant-baseline="middle" text-anchor="middle" font-size="60">${getFaceCardEmoji(minorCard.number, minorCard.suit)}</text>
                <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" font-size="60">${suitEmoji}</text>
            `;
        } else if (minorCard.number === MinorNumber.Ace) {
            artContent = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100">${suitEmoji}</text>`;
        } else {
            const positions = getEmojiPositions(minorCard.number);
            artContent = positions
                .map(pos => `<text x="${pos.x}%" y="${pos.y}%" dominant-baseline="middle" text-anchor="middle" font-size="40">${suitEmoji}</text>`)
                .join('');
        }
    }
  }

  const titleContent = hide_title ? '' : `
    <rect x="10%" y="80%" width="80%" height="15%" fill="white" stroke="black" stroke-width="2" />
    <text x="50%" y="88%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold" fill="black">${card.getName()}</text>
  `;

  const transform = isReversed ? 'transform="rotate(180, 150, 250)"' : '';

  const innerContent = `
      <g ${transform}>
        <rect width="100%" height="100%" fill="${backgroundColor}" />
        ${artContent}
        ${numberContent}
        ${titleContent}
      </g>
  `;

  if (inner_svg) {
    return innerContent;
  }

  return `
    <svg width="300" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg">
      ${innerContent}
    </svg>
  `;
}

function getEmojiPositions(number: MinorNumber): { x: number; y: number }[] {
  const full_width = 100;
  const center_x = full_width / 2;
  const padding_x = 25;

  // New y-coordinate space for the art area
  const art_y_start = 15;
  const art_y_end = 80;
  const art_height = art_y_end - art_y_start;
  const art_center_y = art_y_start + art_height / 2;
  const art_padding_y = 10;

  const positions: { [key: number]: { x: number; y: number }[] } = {
    [MinorNumber.Ace]: [{ x: center_x, y: art_center_y }],
    [MinorNumber.Two]: [{ x: center_x, y: art_y_start + art_padding_y }, { x: center_x, y: art_y_end - art_padding_y }],
    [MinorNumber.Three]: [{ x: padding_x, y: art_y_start + art_padding_y }, { x: center_x, y: art_center_y }, { x: full_width - padding_x, y: art_y_end - art_padding_y }],
    [MinorNumber.Four]: [{ x: padding_x, y: art_y_start + art_padding_y }, { x: full_width - padding_x, y: art_y_start + art_padding_y }, { x: padding_x, y: art_y_end - art_padding_y }, { x: full_width - padding_x, y: art_y_end - art_padding_y }],
    [MinorNumber.Five]: [{ x: padding_x, y: art_y_start + art_padding_y }, { x: full_width - padding_x, y: art_y_start + art_padding_y }, { x: center_x, y: art_center_y }, { x: padding_x, y: art_y_end - art_padding_y }, { x: full_width - padding_x, y: art_y_end - art_padding_y }],
    [MinorNumber.Six]: [
        { x: padding_x, y: art_y_start + art_padding_y }, { x: full_width - padding_x, y: art_y_start + art_padding_y },
        { x: padding_x, y: art_center_y }, { x: full_width - padding_x, y: art_center_y },
        { x: padding_x, y: art_y_end - art_padding_y }, { x: full_width - padding_x, y: art_y_end - art_padding_y },
    ],
    [MinorNumber.Seven]: [
      { x: padding_x, y: art_y_start + 5 }, { x: center_x, y: art_y_start + 15 }, { x: full_width - padding_x, y: art_y_start + 5 },
      { x: padding_x, y: art_center_y + 10 }, { x: full_width - padding_x, y: art_center_y + 10 },
      { x: padding_x, y: art_y_end - 5 }, { x: full_width - padding_x, y: art_y_end - 5 },
    ],
    [MinorNumber.Eight]: [
        { x: padding_x, y: art_y_start + 5 }, { x: full_width - padding_x, y: art_y_start + 5 },
        { x: padding_x, y: art_y_start + art_height / 3 }, { x: full_width - padding_x, y: art_y_start + art_height / 3 },
        { x: padding_x, y: art_y_end - art_height / 3 }, { x: full_width - padding_x, y: art_y_end - art_height / 3 },
        { x: padding_x, y: art_y_end - 5 }, { x: full_width - padding_x, y: art_y_end - 5 },
    ],
    [MinorNumber.Nine]: [
        { x: padding_x, y: art_y_start + 5 }, { x: center_x, y: art_y_start + 5 }, { x: full_width - padding_x, y: art_y_start + 5 },
        { x: padding_x, y: art_center_y }, { x: center_x, y: art_center_y }, { x: full_width - padding_x, y: art_center_y },
        { x: padding_x, y: art_y_end - 5 }, { x: center_x, y: art_y_end - 5 }, { x: full_width - padding_x, y: art_y_end - 5 },
    ],
    [MinorNumber.Ten]: [
        { x: padding_x, y: art_y_start + 5 }, { x: center_x, y: art_y_start + 5 }, { x: full_width - padding_x, y: art_y_start + 5 },
        { x: padding_x, y: art_y_start + art_height / 3 }, { x: full_width - padding_x, y: art_y_start + art_height / 3 },
        { x: center_x, y: art_center_y },
        { x: padding_x, y: art_y_end - art_height / 3 }, { x: full_width - padding_x, y: art_y_end - art_height / 3 },
        { x: padding_x, y: art_y_end - 5 }, { x: full_width - padding_x, y: art_y_end - 5 },
    ],
  };
  return positions[number] || [];
}
