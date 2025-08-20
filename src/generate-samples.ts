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
import * as fs from 'fs';
import * as path from 'path';
import { MAJOR_ARCANA_CARDS, getMajorArcanaCard } from './cards/major-arcana';
import { MINOR_ARCANA_CARDS, getMinorArcanaCard } from './cards/minor-arcana';
import { MajorArcana, MinorArcana, SVGOptions, TarotCard } from './types';
import { SpreadReader, SPREAD_NAMES } from './spreads/spreads';
import { SpreadRenderer } from './spreads/renderer';

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
  const individualCards: { name: string, card: TarotCard, options?: SVGOptions, isReversed?: boolean }[] = [
    { name: 'ace-of-cups', card: getMinorArcanaCard(MinorArcana.AceOfCups)! },
    { name: '2-of-cups', card: getMinorArcanaCard(MinorArcana.TwoOfCups)! },
    { name: '3-of-cups-reversed', card: getMinorArcanaCard(MinorArcana.ThreeOfCups)!, isReversed: true },
    { name: '4-of-pentacles', card: getMinorArcanaCard(MinorArcana.FourOfPentacles)! },
    { name: '5-of-wands', card: getMinorArcanaCard(MinorArcana.FiveOfWands)! },
    { name: '6-of-wands', card: getMinorArcanaCard(MinorArcana.SixOfWands)! },
    { name: '7-of-swords', card: getMinorArcanaCard(MinorArcana.SevenOfSwords)! },
    { name: '8-of-swords', card: getMinorArcanaCard(MinorArcana.EightOfSwords)! },
    { name: '9-of-cups', card: getMinorArcanaCard(MinorArcana.NineOfCups)! },
    { name: '10-of-swords', card: getMinorArcanaCard(MinorArcana.TenOfSwords)! },
    { name: 'page-of-pentacles', card: getMinorArcanaCard(MinorArcana.PageOfPentacles)! },
    { name: 'knight-of-swords-reversed', card: getMinorArcanaCard(MinorArcana.KnightOfSwords)!, isReversed: true },
    { name: 'queen-of-cups', card: getMinorArcanaCard(MinorArcana.QueenOfCups)! },
    { name: 'king-of-wands', card: getMinorArcanaCard(MinorArcana.KingOfWands)! },
    { name: 'the-fool', card: getMajorArcanaCard(MajorArcana.TheFool)! },
    {
      name: 'the-fool-custom-bg',
      card: getMajorArcanaCard(MajorArcana.TheFool)!,
      options: {
        art_override_url: imageToDataURI(path.join(__dirname, '../tests/resources/publicdomain-00-fool.jpg')),
        hide_title: true,
        hide_number: true,
        hide_emoji: true
      }
    },
    {
      name: '9-of-swords-generic-bg',
      card: getMinorArcanaCard(MinorArcana.NineOfSwords)!,
      options: {
        art_override_url: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png'))
      }
    },
    {
      name: '2-of-swords-generic-bg-no-text',
      card: getMinorArcanaCard(MinorArcana.TwoOfSwords)!,
      options: {
        art_override_url: imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png')),
        hide_number: true,
        hide_emoji: true
      }
    },
  ];

  for (const sample of individualCards) {
    const svg = sample.card.getSvg({ ...sample.options, isReversed: sample.isReversed });
    fs.writeFileSync(path.join(samplesDir, `${sample.name}.svg`), svg);
  }

  // --- Generate Spreads ---
  const spreadsToGenerate = [
    { name: SPREAD_NAMES.singleCard, interpretation: undefined },
    { name: SPREAD_NAMES.threeCard, interpretation: "A simple look at the past, present, and future." },
    { name: SPREAD_NAMES.celticCross, interpretation: "A deep dive into a complex situation." },
    { name: SPREAD_NAMES.simplePastPresent, interpretation: undefined },
    { name: SPREAD_NAMES.crossSpread, interpretation: "A look at the core of the situation and its challenges." },
  ];

  for (const spreadInfo of spreadsToGenerate) {
    const reading = spreadReader.performReading(spreadInfo.name as keyof typeof SPREAD_NAMES);
    if (spreadInfo.interpretation) {
      reading.interpretation = spreadInfo.interpretation;
    }

    // Generate Text Representation
    const textRepresentation = spreadRenderer.renderAsText(reading);
    fs.writeFileSync(path.join(samplesDir, `${spreadInfo.name}-text.txt`), textRepresentation);

    // Generate SVG Representation
    const svgRepresentation = spreadRenderer.renderAsSvg(reading);
    fs.writeFileSync(path.join(samplesDir, `${spreadInfo.name}-svg.svg`), svgRepresentation);
  }

  console.log('All sample SVGs and spreads generated in ./samples directory.');
}

generateSamples();
