import * as fs from 'fs';
import * as path from 'path';
import { MAJOR_ARCANA_CARDS } from './cards/major-arcana';
import { MINOR_ARCANA_CARDS } from './cards/minor-arcana';
import { MajorArcana, MinorArcana, getMajorArcanaName, getMinorNumberName } from './types';

function generateSamples() {
  const samplesDir = './samples';

  // Ensure the samples directory exists
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir);
  }

  // Generate standard samples
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

  // Generate samples with SVGOptions
  const magician = MAJOR_ARCANA_CARDS[MajorArcana.TheMagician];
  if (magician) {
    let fileName = 'magician-no-number-no-emoji-no-title.svg';
    fs.writeFileSync(path.join(samplesDir, fileName), magician.getSvg({ hide_number: true, hide_emoji: true, hide_title: true }));

    fileName = 'magician-with-bg-image.svg';
    fs.writeFileSync(
      path.join(samplesDir, fileName),
      magician.getSvg({
        art_override_url: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
        hide_number: true,
        hide_emoji: true,
        hide_title: true,
      })
    );
  }

  const eightOfCups = MINOR_ARCANA_CARDS[MinorArcana.EightOfCups];
  if (eightOfCups) {
    const fileName = 'cups-08-eight-no-number-no-emoji.svg';
    fs.writeFileSync(path.join(samplesDir, fileName), eightOfCups.getSvg({ hide_number: true, hide_emoji: true, hide_title: true }));
  }

  const kingOfWands = MINOR_ARCANA_CARDS[MinorArcana.KingOfWands];
  if (kingOfWands) {
    const fileName = 'wands-14-king-no-number-no-emoji-no-title.svg';
    fs.writeFileSync(path.join(samplesDir, fileName), kingOfWands.getSvg({ hide_number: true, hide_emoji: true, hide_title: true }));
  }

  const sevenOfPentacles = MINOR_ARCANA_CARDS[MinorArcana.SevenOfPentacles];
  if (sevenOfPentacles) {
    const fileName = 'pentacles-07-seven-with-bg-image.svg';
    fs.writeFileSync(
      path.join(samplesDir, fileName),
      sevenOfPentacles.getSvg({
        art_override_url: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pents07.jpg',
      })
    );
  }

  console.log('All sample SVGs generated in ./samples directory.');
}

generateSamples();
