/**
 * This script generates a fixed set of sample images and spread representations.
 *
 * Individual Cards:
 * - Ace of Cups
 * - 2 of Cups
 * - 3 of Cups (reversed)
 * - 4 of Pentacles
 * - 5 of Wands
 * - 6 of Wands
 * - 7 of Swords
 * - 8 of Swords
 * - 9 of Cups
 * - 10 of Swords
 * - Page of Pentacles
 * - Knight of Swords (reversed)
 * - Queen of Cups
 * - King of Wands
 * - The Fool
 * - The Fool with fool background image, no title, no number, no emoji
 * - 9 of swords with generic background image, showing title, number and emoji
 * - 2 of swords with generic background image, no number, no emoji
 *
 * Spreads (Text Representation):
 * - single spread
 * - three pick spread (with interpretation)
 * - celtic cross
 * - simplePastPresent
 * - cross spread (with interpretation)
 *
 * Spreads (SVG Representation):
 * - single spread
 * - three pick spread
 * - celtic cross (with interpretation)
 * - simplePastPresent
 * - cross spread
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
    { name: 'ace-of-cups', card: ALL_CARDS.find((c) => c.id === 'minor-ace-of-cups')! },
    { name: '2-of-cups', card: ALL_CARDS.find((c) => c.id === 'minor-two-of-cups')! },
    { name: '3-of-cups-reversed', card: ALL_CARDS.find((c) => c.id === 'minor-three-of-cups')!, isReversed: true },
    { name: '4-of-pentacles', card: ALL_CARDS.find((c) => c.id === 'minor-four-of-pentacles')! },
    { name: '5-of-wands', card: ALL_CARDS.find((c) => c.id === 'minor-five-of-wands')! },
    { name: '6-of-wands', card: ALL_CARDS.find((c) => c.id === 'minor-six-of-wands')! },
    { name: '7-of-swords', card: ALL_CARDS.find((c) => c.id === 'minor-seven-of-swords')! },
    { name: '8-of-swords', card: ALL_CARDS.find((c) => c.id === 'minor-eight-of-swords')! },
    { name: '9-of-cups', card: ALL_CARDS.find((c) => c.id === 'minor-nine-of-cups')! },
    { name: '10-of-swords', card: ALL_CARDS.find((c) => c.id === 'minor-ten-of-swords')! },
    { name: 'page-of-pentacles', card: ALL_CARDS.find((c) => c.id === 'minor-page-of-pentacles')! },
    { name: 'knight-of-swords-reversed', card: ALL_CARDS.find((c) => c.id === 'minor-knight-of-swords')!, isReversed: true },
    { name: 'queen-of-cups', card: ALL_CARDS.find((c) => c.id === 'minor-queen-of-cups')! },
    { name: 'king-of-wands', card: ALL_CARDS.find((c) => c.id === 'minor-king-of-wands')! },
    { name: 'the-fool', card: ALL_CARDS.find((c) => c.id === 'major-00-the-fool')! },
    {
      name: 'the-fool-custom-bg',
      card: ALL_CARDS.find((c) => c.id === 'major-00-the-fool')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/publicdomain-00-fool.jpg')),
        hideTitle: true,
        hideNumber: true,
        hideEmoji: true,
      },
    },
    {
      name: '9-of-swords-generic-bg',
      card: ALL_CARDS.find((c) => c.id === 'minor-nine-of-swords')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png')),
      },
    },
    {
      name: '2-of-swords-generic-bg-no-text',
      card: ALL_CARDS.find((c) => c.id === 'minor-two-of-swords')!,
      options: {
        artOverrideUrl: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png')),
        hideNumber: true,
        hideEmoji: true,
      },
    },
  ];

  individualCards.forEach((sample) => {
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
