/* eslint-disable max-len */
import { SpreadReading } from '../types';

export class SpreadRenderer {
  renderAsText(reading: SpreadReading): string {
    const { layout } = reading.spread;
    const { cards } = reading;

    // Find the dimensions of the grid
    let maxX = 0;
    let maxY = 0;
    layout.forEach((pos) => {
      if (pos.x > maxX) {
        maxX = pos.x;
      }
      if (pos.y > maxY) {
        maxY = pos.y;
      }
    });

    // Create a 2D grid
    const grid: (string | null)[][] = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill(null));

    // Place cards in the grid
    cards.forEach((cardPosition) => {
      const layoutPos = layout.find((p) => p.position === cardPosition.position);
      if (layoutPos) {
        grid[layoutPos.y][layoutPos.x] = cardPosition.card
          .getTextRepresentation(cardPosition.isReversed);
      }
    });

    // Render the grid to a string
    let output = '';
    grid.forEach((row) => {
      const rowString = row.map((c) => c || ' '.repeat(8)).join(' ');
      output += `${rowString}\n`;
    });

    return output;
  }

  renderAsSvg(reading: SpreadReading, animate: boolean = false): string {
    const { layout } = reading.spread;
    const { cards } = reading;

    const baseCardWidth = 300;
    const baseCardHeight = 500;
    const desiredWidth = 100;
    const scale = desiredWidth / baseCardWidth;
    const cardWidth = animate ? baseCardWidth : desiredWidth;
    const cardHeight = animate ? baseCardHeight : baseCardHeight * scale;
    const padding = 40;

    let maxX = 0;
    let maxY = 0;
    layout.forEach((pos) => {
      if (pos.x > maxX) {
        maxX = pos.x;
      }
      if (pos.y > maxY) {
        maxY = pos.y;
      }
    });

    const svgWidth = (maxX + 1) * (cardWidth + padding);
    const svgHeight = (maxY + 1) * (cardHeight + padding);

    let svgContent = '';

    cards.forEach((cardPosition) => {
      const layoutPos = layout.find((p) => p.position === cardPosition.position);
      const spreadPos = reading.spread.positions.find((p) => p.position === cardPosition.position);
      if (layoutPos && spreadPos) {
        const x = layoutPos.x * (cardWidth + padding);
        const y = layoutPos.y * (cardHeight + padding);
        const rotation = layoutPos.rotation || 0;

        const transformOriginX = baseCardWidth / 2;
        const transformOriginY = baseCardHeight / 2;

        let cardGroup: string;
        if (animate) {
          const dealDelay = (spreadPos.dealOrder || 0) * 0.5;
          const cardSvg = cardPosition.card.getSvg({
            isReversed: cardPosition.isReversed,
            animate,
            dealDelay,
          });
          const dealDuration = 0.5;
          const positioningTransform = `translate(${x}, ${y})`;
          const rotationTransform = `rotate(${rotation}, ${transformOriginX}, ${transformOriginY})`;
          // Using a nested <svg> element preserves the card's coordinate system for animations.
          cardGroup = `
            <g transform="${positioningTransform}" data-deal-order="${spreadPos.dealOrder}">
              <animateTransform attributeName="transform" type="translate" from="-400 0" to="0 0"
                dur="${dealDuration}s" begin="${dealDelay}s" fill="freeze" additive="sum" />
              <g transform="${rotationTransform}">
                ${cardSvg}
              </g>
            </g>
          `;
        } else {
          // Revert to the original <image> tag logic,
          // which is more robust for preserving card-internal coordinate systems.
          const cardSvg = cardPosition.card.getSvg({
            isReversed: cardPosition.isReversed,
            animate: false,
          });
          const cardSvgDataUri = `data:image/svg+xml;base64,${
            Buffer.from(cardSvg).toString('base64')
          }`;
          const rotationCenterX = x + cardWidth / 2;
          const rotationCenterY = y + cardHeight / 2;
          const transform = `rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})`;
          cardGroup = `<image transform="${transform}" href="${cardSvgDataUri}" x="${x}" y="${y}"
            width="${cardWidth}" height="${cardHeight}" />`;
        }
        svgContent += cardGroup;
      }
    });

    return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
  }
}
