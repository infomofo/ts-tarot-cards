import * as fs from 'fs';
import * as path from 'path';
import { MAJOR_ARCANA_CARDS } from './cards/major-arcana';
import { MINOR_ARCANA_CARDS } from './cards/minor-arcana';
import { Arcana, MajorArcana, MinorArcana, SVGOptions, TarotCard, getMajorArcanaName, getMinorNumberName, Suit, MinorNumber } from './types';

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

  // --- Generate Representative Set of Cards ---
  const cardsToGenerate: TarotCard[] = [
    ...Object.values(MAJOR_ARCANA_CARDS), // All Major Arcana
    ...Object.values(MINOR_ARCANA_CARDS).filter(card => card.suit === Suit.Cups), // All Cups
    ...Object.values(MINOR_ARCANA_CARDS).filter(card =>
      card.suit !== Suit.Cups &&
      [MinorNumber.Ace, MinorNumber.Five, MinorNumber.Queen].includes(card.number)
    ), // Ace, 5, Queen of other suits
  ];

  for (const card of cardsToGenerate) {
    if (card) {
      let fileName: string;
      if (card.arcana === Arcana.Major) {
        const cardName = getMajorArcanaName(card.number).replace(/\s+/g, '-').toLowerCase();
        fileName = `major-${String(card.number).padStart(2, '0')}-${cardName}.svg`;
      } else {
        const suitName = card.suit.toLowerCase();
        const cardNumber = String(card.number).padStart(2, '0');
        const cardName = getMinorNumberName(card.number).toLowerCase();
        fileName = `${suitName}-${cardNumber}-${cardName}.svg`;
      }
      fs.writeFileSync(path.join(samplesDir, fileName), card.getSvg());
    }
  }

  // --- Generate Specific Option Combinations for The Fool ---
  const foolCard = MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!;
  const foolSamples: { name: string, options: SVGOptions }[] = [
    { name: 'fool-default', options: {} },
    { name: 'fool-hide_number', options: { hide_number: true } },
    { name: 'fool-hide_title', options: { hide_title: true } },
    { name: 'fool-hide_emoji', options: { hide_emoji: true } },
    { name: 'fool-hide_number-hide_title-hide_emoji', options: { hide_number: true, hide_title: true, hide_emoji: true } },
  ];

  for (const sample of foolSamples) {
    fs.writeFileSync(path.join(samplesDir, `${sample.name}.svg`), foolCard.getSvg(sample.options));
  }

  // --- Generate Samples with Local Images ---
  const foolImage = imageToDataURI(path.join(__dirname, '../tests/resources/publicdomain-00-fool.jpg'));
  const magicianImage = imageToDataURI(path.join(__dirname, '../tests/resources/publicdomain-01-magician.webp'));
  const backImage = imageToDataURI(path.join(__dirname, '../tests/resources/generic-tarot-back.png'));

  // Update existing samples to use local images
  fs.writeFileSync(path.join(samplesDir, 'fool-with-bg-image.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!.getSvg({ art_override_url: foolImage }));
  fs.writeFileSync(path.join(samplesDir, 'four-of-cups-with-bg-image.svg'), MINOR_ARCANA_CARDS[MinorArcana.FourOfCups]!.getSvg({ art_override_url: backImage }));

  // Add new samples as per request
  // Fool: suppress title, image, and number
  fs.writeFileSync(path.join(samplesDir, 'fool-local-suppress-all.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!.getSvg({ art_override_url: foolImage, hide_title: true, hide_number: true, hide_emoji: true }));

  // Magician: suppress all
  fs.writeFileSync(path.join(samplesDir, 'magician-local-suppress-all.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheMagician]!.getSvg({ art_override_url: magicianImage, hide_title: true, hide_number: true, hide_emoji: true }));
  // Magician: don't suppress number
  fs.writeFileSync(path.join(samplesDir, 'magician-local-suppress-title-emoji.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheMagician]!.getSvg({ art_override_url: magicianImage, hide_title: true, hide_emoji: true }));

  // Generic back for different card types
  fs.writeFileSync(path.join(samplesDir, 'major-arcana-with-back.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheEmpress]!.getSvg({ art_override_url: backImage }));
  fs.writeFileSync(path.join(samplesDir, 'minor-arcana-num-with-back.svg'), MINOR_ARCANA_CARDS[MinorArcana.TwoOfCups]!.getSvg({ art_override_url: backImage }));
  fs.writeFileSync(path.join(samplesDir, 'minor-arcana-face-with-back.svg'), MINOR_ARCANA_CARDS[MinorArcana.KingOfSwords]!.getSvg({ art_override_url: backImage }));

  // --- Keep Two Samples for External URLs ---
  // Fool: suppress title, number, and emoji
  fs.writeFileSync(path.join(samplesDir, 'fool-external-suppress-all.svg'), MAJOR_ARCANA_CARDS[MajorArcana.TheFool]!.getSvg({
    art_override_url: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
    hide_title: true,
    hide_number: true,
    hide_emoji: true,
  }));

  // Generic background for a minor arcana, don't suppress anything
  fs.writeFileSync(path.join(samplesDir, 'page-of-wands-external-bg.svg'), MINOR_ARCANA_CARDS[MinorArcana.PageOfWands]!.getSvg({
    art_override_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  }));


  console.log('All sample SVGs generated in ./samples directory.');
}

generateSamples();
