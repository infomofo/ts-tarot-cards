import * as fs from 'fs';
import * as path from 'path';
import svgToImg = require('svg-to-img');

async function verifySvg(inputFile: string, outputFile: string) {
  try {
    console.log(`Reading SVG file: ${inputFile}`);
    const svgContent = fs.readFileSync(inputFile, 'utf-8');

    console.log('Converting SVG to PNG...');
    const image = await svgToImg.from(svgContent).toPng();

    console.log(`Writing PNG file: ${outputFile}`);
    fs.writeFileSync(outputFile, image);

    console.log('Verification image generated successfully!');
  } catch (error) {
    console.error('An error occurred during SVG verification:', error);
    process.exit(1);
  }
}

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Please provide the input SVG file path.');
  process.exit(1);
}

const outputFileName = `${path.basename(inputFile, '.svg')}.png`;
const outputFile = path.join(path.dirname(inputFile), outputFileName);

verifySvg(inputFile, outputFile);
