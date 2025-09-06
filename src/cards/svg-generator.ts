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
import { ALL_SUIT_PROPERTIES } from '../data';

function getSuitColor(suit: Suit): string {
  const { element } = ALL_SUIT_PROPERTIES[suit];
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

function getEmojiPositions(number: MinorNumber): { x: number; y: number }[] {
  const fullWidth = 100;
  const centerX = fullWidth / 2;
  const paddingX = 25;

  // New y-coordinate space for the art area
  const artYStart = 15;
  const artYEnd = 80;
  const artHeight = artYEnd - artYStart;
  const artCenterY = artYStart + artHeight / 2;
  const artPaddingY = 10;

  const positions: { [key: number]: { x: number; y: number }[] } = {
    [MinorNumber.Ace]: [{ x: centerX, y: artCenterY }],
    [MinorNumber.Two]: [
      { x: centerX, y: artYStart + artPaddingY },
      { x: centerX, y: artYEnd - artPaddingY },
    ],
    [MinorNumber.Three]: [
      { x: paddingX, y: artYStart + artPaddingY },
      { x: centerX, y: artCenterY },
      { x: fullWidth - paddingX, y: artYEnd - artPaddingY },
    ],
    [MinorNumber.Four]: [
      { x: paddingX, y: artYStart + artPaddingY },
      { x: fullWidth - paddingX, y: artYStart + artPaddingY },
      { x: paddingX, y: artYEnd - artPaddingY },
      { x: fullWidth - paddingX, y: artYEnd - artPaddingY },
    ],
    [MinorNumber.Five]: [
      { x: paddingX, y: artYStart + artPaddingY },
      { x: fullWidth - paddingX, y: artYStart + artPaddingY },
      { x: centerX, y: artCenterY },
      { x: paddingX, y: artYEnd - artPaddingY },
      { x: fullWidth - paddingX, y: artYEnd - artPaddingY },
    ],
    [MinorNumber.Six]: [
      { x: paddingX, y: artYStart + artPaddingY },
      { x: fullWidth - paddingX, y: artYStart + artPaddingY },
      { x: paddingX, y: artCenterY },
      { x: fullWidth - paddingX, y: artCenterY },
      { x: paddingX, y: artYEnd - artPaddingY },
      { x: fullWidth - paddingX, y: artYEnd - artPaddingY },
    ],
    [MinorNumber.Seven]: [
      { x: paddingX, y: artYStart + 5 },
      { x: centerX, y: artYStart + 15 },
      { x: fullWidth - paddingX, y: artYStart + 5 },
      { x: paddingX, y: artCenterY + 10 },
      { x: fullWidth - paddingX, y: artCenterY + 10 },
      { x: paddingX, y: artYEnd - 5 },
      { x: fullWidth - paddingX, y: artYEnd - 5 },
    ],
    [MinorNumber.Eight]: [
      { x: paddingX, y: artYStart + 5 },
      { x: fullWidth - paddingX, y: artYStart + 5 },
      { x: paddingX, y: artYStart + artHeight / 3 },
      { x: fullWidth - paddingX, y: artYStart + artHeight / 3 },
      { x: paddingX, y: artYEnd - artHeight / 3 },
      { x: fullWidth - paddingX, y: artYEnd - artHeight / 3 },
      { x: paddingX, y: artYEnd - 5 },
      { x: fullWidth - paddingX, y: artYEnd - 5 },
    ],
    [MinorNumber.Nine]: [
      { x: paddingX, y: artYStart + 5 },
      { x: centerX, y: artYStart + 5 },
      { x: fullWidth - paddingX, y: artYStart + 5 },
      { x: paddingX, y: artCenterY },
      { x: centerX, y: artCenterY },
      { x: fullWidth - paddingX, y: artCenterY },
      { x: paddingX, y: artYEnd - 5 },
      { x: centerX, y: artYEnd - 5 },
      { x: fullWidth - paddingX, y: artYEnd - 5 },
    ],
    [MinorNumber.Ten]: [
      { x: paddingX, y: artYStart + 5 },
      { x: centerX, y: artYStart + 5 },
      { x: fullWidth - paddingX, y: artYStart + 5 },
      { x: paddingX, y: artYStart + artHeight / 3 },
      { x: fullWidth - paddingX, y: artYStart + artHeight / 3 },
      { x: centerX, y: artCenterY },
      { x: paddingX, y: artYEnd - artHeight / 3 },
      { x: fullWidth - paddingX, y: artYEnd - artHeight / 3 },
      { x: paddingX, y: artYEnd - 5 },
      { x: fullWidth - paddingX, y: artYEnd - 5 },
    ],
  };
  return positions[number] || [];
}

export function generateSvg(card: TarotCard, options?: SVGOptions): string {
  const {
    artOverrideUrl,
    hideNumber = false,
    hideTitle = false,
    hideEmoji = false,
    isReversed = false,
    innerSvg = false,
    animate = false,
    dealDelay = 0,
  } = options || {};

  const backgroundColor = card.arcana === Arcana.Major
    ? (card as MajorArcanaCard).bg_color || '#ffffff'
    : getSuitColor((card as MinorArcanaCard).suit);

  const topText = getTopText(card);
  const numberContent = hideNumber ? '' : `<text x="50%" y="10%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold">${topText}</text>`;

  let artContent = '';
  if (artOverrideUrl) {
    artContent = `<image href="${artOverrideUrl}" x="10%" y="15%" width="80%" height="65%" preserveAspectRatio="xMidYMid slice"/>`;
  } else if (!hideEmoji) {
    if (card.arcana === Arcana.Major) {
      const { emoji } = (card as MajorArcanaCard);
      if (emoji) {
        artContent = `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="100">${emoji}</text>`;
      }
    } else {
      const minorCard = card as MinorArcanaCard;
      const suitEmoji = ALL_SUIT_PROPERTIES[minorCard.suit].emoji;
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
          .map((pos) => `<text x="${pos.x}%" y="${pos.y}%" dominant-baseline="middle" text-anchor="middle" font-size="40">${suitEmoji}</text>`)
          .join('');
      }
    }
  }

  const titleContent = hideTitle
    ? ''
    : `
    <rect x="10%" y="80%" width="80%" height="15%" fill="white" stroke="black" stroke-width="2" />
    <text x="50%" y="88%" dominant-baseline="middle" text-anchor="middle" font-size="20" font-weight="bold" fill="black">${card.getName()}</text>
  `;

  const transform = isReversed ? 'transform="rotate(180, 150, 250)"' : '';

  const cardFace = `
    <rect width="100%" height="100%" fill="${backgroundColor}" />
    ${artContent}
    ${numberContent}
    ${titleContent}
  `;

  const cardBack = '<rect width="100%" height="100%" fill="#00008b" />';
  let innerContent: string;

  if (animate) {
    const flipDelay = dealDelay + 0.5 + 0.5; // dealDelay + dealDuration + pause
    const flipDuration = 0.5;
    const flipMidpoint = flipDelay + flipDuration / 2;

    innerContent = `
      <g style="transform-origin: center; transform-box: fill-box;">
        <animateTransform attributeName="transform" type="scale"
          from="1 1" to="0 1" dur="${flipDuration / 2}s" begin="${flipDelay}s" fill="freeze" />
        <animateTransform attributeName="transform" type="scale"
          from="0 1" to="1 1" dur="${flipDuration / 2}s" begin="${flipMidpoint}s" fill="freeze" />
        <g>
          <g visibility="visible">
            <animate attributeName="visibility" from="visible" to="hidden"
              dur="0.01s" begin="${flipMidpoint}s" fill="freeze" />
            ${cardBack}
          </g>
          <g visibility="hidden" ${transform}>
            <animate attributeName="visibility" from="hidden" to="visible"
              dur="0.01s" begin="${flipMidpoint}s" fill="freeze" />
            ${cardFace}
          </g>
        </g>
      </g>
    `;
  } else {
    innerContent = `<g ${transform}>${cardFace}</g>`;
  }

  if (innerSvg) {
    return innerContent;
  }

  return `
    <svg width="300" height="500" viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg">
      ${innerContent}
    </svg>
  `;
}
