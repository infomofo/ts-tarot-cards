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

  renderAsSvg(reading: SpreadReading, animate: boolean = false): string {
    const layout = reading.spread.layout;
    const cards = reading.cards;

    const baseCardWidth = 300;
    const baseCardHeight = 500;
    const desiredWidth = 100;
    const scale = desiredWidth / baseCardWidth;
    const cardWidth = animate ? baseCardWidth : desiredWidth;
    const cardHeight = animate ? baseCardHeight : baseCardHeight * scale;
    const padding = 40;

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
      const spreadPos = reading.spread.positions.find(p => p.position === cardPosition.position);
      if (layoutPos && spreadPos) {
        const x = layoutPos.x * (cardWidth + padding);
        const y = layoutPos.y * (cardHeight + padding);
        const rotation = layoutPos.rotation || 0;

        const cardSvg = cardPosition.card.getSvg({
          isReversed: cardPosition.isReversed,
          inner_svg: true,
          animate,
          dealOrder: spreadPos.dealOrder,
        });

        const transformOriginX = baseCardWidth / 2;
        const transformOriginY = baseCardHeight / 2;

        let cardGroup: string;
        if (animate) {
          const dealDelay = (spreadPos.dealOrder || 0) * 0.5;
          const dealDuration = 0.5;
          const positioningTransform = `translate(${x}, ${y})`;
          const rotationTransform = `rotate(${rotation}, ${transformOriginX}, ${transformOriginY})`;
          cardGroup = `
            <g transform="${positioningTransform}">
              <animateTransform attributeName="transform" type="translate" from="-400 0" to="0 0" dur="${dealDuration}s" begin="${dealDelay}s" fill="freeze" additive="sum" />
              <g transform="${rotationTransform}">
                ${cardSvg}
              </g>
            </g>
          `;
        } else {
          const transform = `translate(${x}, ${y}) scale(${scale}) rotate(${rotation}, ${transformOriginX}, ${transformOriginY})`;
          cardGroup = `<g transform="${transform}">${cardSvg}</g>`;
        }
        svgContent += cardGroup;
      }
    }

    return `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}">${svgContent}</svg>`;
  }
}
