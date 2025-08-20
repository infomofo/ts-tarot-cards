import * as fs from 'fs';
import * as path from 'path';
import { SpreadReader, SPREAD_NAMES } from './spreads/spreads';
import { SpreadRenderer } from './spreads/renderer';

function generateSamples() {
  const samplesDir = './samples';

  // Clean and recreate the samples directory
  if (fs.existsSync(samplesDir)) {
    fs.rmSync(samplesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(samplesDir);

  const reader = new SpreadReader();
  const renderer = new SpreadRenderer();

  for (const spreadName of Object.values(SPREAD_NAMES)) {
    const reading = reader.performReading(spreadName);
    const svg = renderer.renderAsSvg(reading);
    const svgFilePath = path.join(samplesDir, `${spreadName}-reading.svg`);
    fs.writeFileSync(svgFilePath, svg);
    console.log(`Generated SVG for ${spreadName} at ${svgFilePath}`);
  }
}

generateSamples();
