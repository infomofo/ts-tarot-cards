import { SpreadReading } from '../types';

export class SpreadRenderer {
  renderAsText(reading: SpreadReading): string {
    const layout = reading.spread.layout;
    const cards = reading.cards;

    // Find the dimensions of the grid
    let maxX = 0;
    let maxY = 0;
    for (const pos of layout) {
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y > maxY) maxY = pos.y;
    }

    // Create a 2D grid
    const grid: (string | null)[][] = Array(maxY + 1).fill(null).map(() => Array(maxX + 1).fill(null));

    // Place cards in the grid
    for (const cardPosition of cards) {
      const layoutPos = layout.find(p => p.position === cardPosition.position);
      if (layoutPos) {
        grid[layoutPos.y][layoutPos.x] = cardPosition.card.getTextRepresentation(cardPosition.isReversed);
      }
    }

    // Render the grid to a string
    let output = '';
    for (const row of grid) {
      output += row.map(cell => cell || ' '.repeat(8)).join(' ');
      output += '\n';
    }

    return output;
  }

  renderAsSvg(reading: SpreadReading): string {
    const layout = reading.spread.layout;
    const cards = reading.cards;
    const interpretation = reading.interpretation;

    const cardWidth = 150;
    const cardHeight = 250;
    const padding = 20;

    let maxX = 0;
    let maxY = 0;
    for (const pos of layout) {
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y > maxY) maxY = pos.y;
    }

    const spreadWidth = (maxX + 1) * (cardWidth + padding);
    let svgHeight = (maxY + 1) * (cardHeight + padding);
    const svgWidth = spreadWidth;

    let interpretationContent = '';
    if (interpretation) {
      svgHeight += 50; // Add space for the interpretation text
      interpretationContent = `
        <text x="${svgWidth / 2}" y="${svgHeight - 25}" dominant-baseline="middle" text-anchor="middle" font-size="16" fill="black">
          ${interpretation}
        </text>
      `;
    }

    let svgContent = '';

    for (const cardPosition of cards) {
      const layoutPos = layout.find(p => p.position === cardPosition.position);
      if (layoutPos) {
        const x = layoutPos.x * (cardWidth + padding);
        const y = layoutPos.y * (cardHeight + padding);
        const rotation = layoutPos.rotation || 0;

        const cardSvg = cardPosition.card.getSvg({
          isReversed: cardPosition.isReversed
        });

        const cardSvgDataUri = `data:image/svg+xml;base64,${Buffer.from(cardSvg).toString('base64')}`;

        const transform = `rotate(${rotation}, ${x + cardWidth / 2}, ${y + cardHeight / 2})`;

        svgContent += `<image transform="${transform}" href="${cardSvgDataUri}" x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" />`;
      }
    }

    return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgContent}${interpretationContent}</svg>`;
  }
}
