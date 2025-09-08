/**
 * This script generates a fixed set of sample images and spread representations.
 */
/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';
import {
  SVGOptions, TarotCard,
} from './types';
import { SpreadReader } from './spreads/spreads';
import { SpreadRenderer } from './spreads/renderer';
import { ALL_CARDS } from './data';

// Helper to find a card by its name
function getCardByName(name: string): TarotCard | undefined {
  return ALL_CARDS.find((card) => card.getName() === name);
}

function imageToDataURI(filePath: string): string {
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let mimeType = '';
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      mimeType = 'image/jpeg';
      break;
    case '.png':
      mimeType = 'image/png';
      break;
    case '.webp':
      mimeType = 'image/webp';
      break;
    default:
      throw new Error(`Unsupported image type: ${ext}`);
  }
  return `data:${mimeType};base64,${fileContent.toString('base64')}`;
}

function generateSamples() {
  const samplesDir = './samples';

  // Clean and recreate the samples directory
  if (fs.existsSync(samplesDir)) {
    fs.rmSync(samplesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(samplesDir);

  const spreadReader = new SpreadReader();
  const spreadRenderer = new SpreadRenderer();

  // --- Generate Individual Cards ---
  const individualCards: {
    name: string,
    card: TarotCard,
    options?: SVGOptions,
    isReversed?: boolean
  }[] = [
    { name: 'ace-of-cups', card: getCardByName('Ace of Cups')! },
    { name: '2-of-cups', card: getCardByName('Two of Cups')! },
    { name: '3-of-cups-reversed', card: getCardByName('Three of Cups')!, isReversed: true },
    { name: '4-of-pentacles', card: getCardByName('Four of Pentacles')! },
    { name: '5-of-wands', card: getCardByName('Five of Wands')! },
    { name: '6-of-wands', card: getCardByName('Six of Wands')! },
    { name: '7-of-swords', card: getCardByName('Seven of Swords')! },
    { name: '8-of-swords', card: getCardByName('Eight of Swords')! },
    { name: '9-of-cups', card: getCardByName('Nine of Cups')! },
    { name: '10-of-swords', card: getCardByName('Ten of Swords')! },
    { name: 'page-of-pentacles', card: getCardByName('Page of Pentacles')! },
    { name: 'knight-of-swords-reversed', card: getCardByName('Knight of Swords')!, isReversed: true },
    { name: 'queen-of-cups', card: getCardByName('Queen of Cups')! },
    { name: 'king-of-wands', card: getCardByName('King of Wands')! },
    { name: 'the-fool', card: getCardByName('The Fool')! },
    {
      name: 'the-fool-custom-bg',
      card: getCardByName('The Fool')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/publicdomain-00-fool.jpg')),
        hideTitle: true,
        hideNumber: true,
        hideEmoji: true,
      },
    },
    {
      name: '9-of-swords-generic-bg',
      card: getCardByName('Nine of Swords')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png')),
      },
    },
    {
      name: '2-of-swords-generic-bg-no-text',
      card: getCardByName('Two of Swords')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png')),
        hideNumber: true,
        hideEmoji: true,
      },
    },
  ];

  individualCards.forEach((sample) => {
    if (!sample.card) {
      console.error(`Card not found for sample: ${sample.name}`);
      return;
    }
    const svg = sample.card.getSvg({ ...sample.options, isReversed: sample.isReversed });
    fs.writeFileSync(path.join(samplesDir, `${sample.name}.svg`), svg);
  });

  // --- Generate Spreads ---
  const spreadsToGenerate = [
    { name: 'singleCard', interpretation: undefined },
    { name: 'threeCard', interpretation: 'A simple look at the past, present, and future.' },
    { name: 'celticCross', interpretation: 'A deep dive into a complex situation.' },
    { name: 'simplePastPresent', interpretation: undefined },
    { name: 'crossSpread', interpretation: 'A look at the core of the situation and its challenges.' },
  ];

  spreadsToGenerate.forEach((spreadInfo) => {
    const reading = spreadReader.performReading(spreadInfo.name);
    if (spreadInfo.interpretation) {
      reading.interpretation = spreadInfo.interpretation;
    }

    // Generate Text Representation
    const textRepresentation = spreadRenderer.renderAsText(reading);
    fs.writeFileSync(path.join(samplesDir, `${spreadInfo.name}-text.txt`), textRepresentation);

    // Generate SVG Representation
    const svgRepresentation = spreadRenderer.renderAsSvg(reading, false);
    fs.writeFileSync(path.join(samplesDir, `${spreadInfo.name}-svg.svg`), svgRepresentation);
  });

  // --- Generate Animated Spreads ---
  const animatedSpreadsToGenerate = [
    { name: 'threeCard' },
    { name: 'celticCross' },
  ];

  animatedSpreadsToGenerate.forEach((spreadInfo) => {
    const reading = spreadReader.performReading(spreadInfo.name);
    const svgRepresentation = spreadRenderer.renderAsSvg(reading, true);
    fs.writeFileSync(path.join(samplesDir, `${spreadInfo.name}-animated.svg`), svgRepresentation);
  });

  console.log('All sample SVGs and spreads generated in ./samples directory.');
}

generateSamples();
