import * as fs from 'fs';
import { MAJOR_ARCANA_CARDS } from './cards/major-arcana';
import { MINOR_ARCANA_CARDS } from './cards/minor-arcana';
import { MajorArcana, MinorArcana, getMajorArcanaName, getMinorNumberName, Suit, MinorNumber } from './types';
import { createMinorArcanaCard } from './cards/minor-arcana';
import { createMajorArcanaCard } from './cards/major-arcana';

function generateSamples() {
  const samplesDir = './samples';
  if (!fs.existsSync(samplesDir)) {
    fs.mkdirSync(samplesDir);
  }

  // Generate Major Arcana samples
  for (const card of Object.values(MAJOR_ARCANA_CARDS)) {
    if (card) {
      const cardName = getMajorArcanaName(card.number).replace(/\s+/g, '_').toLowerCase();
      const fileName = `major_arcana_${String(card.number).padStart(2, '0')}_${cardName}.svg`;
      fs.writeFileSync(`${samplesDir}/${fileName}`, card.getSvg());
    }
  }

  // Generate Minor Arcana samples
  for (const card of Object.values(MINOR_ARCANA_CARDS)) {
    if (card) {
      const suitName = card.suit.toLowerCase();
      const cardNumber = String(card.number).padStart(2, '0');
      const cardName = getMinorNumberName(card.number).toLowerCase();
      const fileName = `minor_arcana_${suitName}_${cardNumber}_${cardName}.svg`;
      fs.writeFileSync(`${samplesDir}/${fileName}`, card.getSvg());
    }
  }

  // Generate samples with SVGOptions
  const magician = MAJOR_ARCANA_CARDS[MajorArcana.TheMagician];
  if (magician) {
    fs.writeFileSync(`${samplesDir}/magician_no_number_no_emoji_no_title.svg`, magician.getSvg({ hide_number: true, hide_emoji: true, hide_title: true }));
    fs.writeFileSync(
      `${samplesDir}/magician_with_bg_image.svg`,
      magician.getSvg({
        art_override_url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3drOTE5ODI2NTktaW1hZ2UuanBn.jpg',
        hide_number: true,
        hide_emoji: true,
        hide_title: true,
      })
    );
  }

  const eightOfCups = MINOR_ARCANA_CARDS[MinorArcana.EightOfCups];
  if (eightOfCups) {
    fs.writeFileSync(`${samplesDir}/eight_of_cups_no_number_no_emoji.svg`, eightOfCups.getSvg({ hide_number: true, hide_emoji: true }));
  }

  const kingOfWands = MINOR_ARCANA_CARDS[MinorArcana.KingOfWands];
  if (kingOfWands) {
    fs.writeFileSync(`${samplesDir}/king_of_wands_no_number_no_emoji_no_title.svg`, kingOfWands.getSvg({ hide_number: true, hide_emoji: true, hide_title: true }));
  }

  const sevenOfPentacles = MINOR_ARCANA_CARDS[MinorArcana.SevenOfPentacles];
  if (sevenOfPentacles) {
    fs.writeFileSync(
      `${samplesDir}/seven_of_pentacles_with_bg_image.svg`,
      sevenOfPentacles.getSvg({
        art_override_url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2xyL21pYTgzODI0LWltYWdlLmpwZw.jpg',
      })
    );
  }

  console.log('All sample SVGs generated in ./samples directory.');
}

generateSamples();
