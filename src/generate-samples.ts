import * as fs from 'fs';
import * as path from 'path';
import { MAJOR_ARCANA_CARDS } from './cards/major-arcana';
import { MINOR_ARCANA_CARDS } from './cards/minor-arcana';
import { MajorArcana, MinorArcana, SVGOptions, TarotCard, getMajorArcanaName, getMinorNumberName } from './types';

function generateSamples() {
  const samplesDir = './samples';

  // Clean and recreate the samples directory
  if (fs.existsSync(samplesDir)) {
    fs.rmSync(samplesDir, { recursive: true, force: true });
  }
  fs.mkdirSync(samplesDir);

  // --- Generate Full Deck ---
  const allCards = [...Object.values(MAJOR_ARCANA_CARDS), ...Object.values(MINOR_ARCANA_CARDS)];
  for (const card of allCards) {
    if (card) {
      let fileName: string;
      if (card.arcana === 'Major') {
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

  // --- Generate Cartesian Product of Options for Key Cards ---
  const baseCards: { name: string; card: TarotCard }[] = [
    { name: 'fool', card: MAJOR_ARCANA_CARDS[MajorArcana.TheFool]! },
    { name: 'four-of-cups', card: MINOR_ARCANA_CARDS[MinorArcana.FourOfCups]! },
    { name: 'page-of-wands', card: MINOR_ARCANA_CARDS[MinorArcana.PageOfWands]! },
  ];

  const options: ('hide_number' | 'hide_title' | 'hide_emoji')[] = ['hide_number', 'hide_title', 'hide_emoji'];
  const optionCombinations: SVGOptions[] = [];

  // Generate all 2^n combinations of boolean options
  for (let i = 0; i < (1 << options.length); i++) {
    const combination: SVGOptions = {};
    for (let j = 0; j < options.length; j++) {
      if ((i >> j) & 1) {
        combination[options[j]] = true;
      }
    }
    optionCombinations.push(combination);
  }

  for (const { name, card } of baseCards) {
    // Generate sample for each option combination
    for (const combo of optionCombinations) {
      const flags = Object.keys(combo).join('-');
      const fileName = flags ? `${name}-${flags}.svg` : `${name}-default.svg`;
      fs.writeFileSync(path.join(samplesDir, fileName), card.getSvg(combo));
    }

    // Generate sample with background image
    const bgImageUrl = name === 'fool'
      ? 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg'
      : 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg'; // Using magician as a stand-in for minor arcana

    const bgFileName = `${name}-with-bg-image.svg`;
    fs.writeFileSync(path.join(samplesDir, bgFileName), card.getSvg({ art_override_url: bgImageUrl }));
  }

  console.log('All sample SVGs generated in ./samples directory.');
}

generateSamples();
