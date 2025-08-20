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
        grid[layoutPos.y][layoutPos.x] = cardPosition.card.getTextRepresentation();
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

    const cardWidth = 100;
    const cardHeight = 150;
    const padding = 20;

    let maxX = 0;
    let maxY = 0;
    for (const pos of layout) {
      if (pos.x > maxX) maxX = pos.x;
      if (pos.y > maxY) maxY = pos.y;
    }

    const svgWidth = (maxX + 1) * (cardWidth + padding);
    const svgHeight = (maxY + 1) * (cardHeight + padding);

    let svgContent = '';

    for (const cardPosition of cards) {
      const layoutPos = layout.find(p => p.position === cardPosition.position);
      if (layoutPos) {
        const x = layoutPos.x * (cardWidth + padding);
        const y = layoutPos.y * (cardHeight + padding);
        const rotation = layoutPos.rotation || 0;

        const transform = `translate(${x}, ${y}) rotate(${rotation}, ${cardWidth / 2}, ${cardHeight / 2})`;

        svgContent += `<g transform="${transform}">`;
        svgContent += `<rect x="0" y="0" width="${cardWidth}" height="${cardHeight}" fill="#FFF" stroke="#000" />`;
        svgContent += `<text x="${cardWidth / 2}" y="${cardHeight / 2}" dominant-baseline="middle" text-anchor="middle" font-size="12">${cardPosition.card.getTextRepresentation()}</text>`;
        svgContent += `</g>`;
      }
    }

    return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
  }
}
