import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { MAJOR_ARCANA_CARDS } from '../src/cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../src/cards/minor-arcana';
import { MajorArcana, MinorArcana, Suit, getMinorNumberName, getMajorArcanaName } from '../src/types';

const tarotModelDir = path.join(__dirname, '..', 'tarot-model');

function createMajorArcanaYaml() {
  const majorArcanaDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'major-arcana');
  fs.mkdirSync(majorArcanaDir, { recursive: true });

  for (const key in MAJOR_ARCANA_CARDS) {
    const card = MAJOR_ARCANA_CARDS[key as unknown as MajorArcana];
    if (card) {
      const cardData = {
        number: card.number,
        name: card.getName(),
        keywords: card.keywords,
        meanings: {
          upright: card.uprightMeanings,
          reversed: card.reversedMeanings,
        },
        visual_description: {
          background: card.visualDescription.split('.')[0] + '.',
          foreground: card.visualDescription.split('.').slice(1).join('.').trim(),
        },
        visual_description_analysis: card.visualDescriptionAnalysis.split('\n'),
        symbols: card.symbols,
        significance: card.significance,
        description: card.description,
        emoji: card.emoji,
        bg_color: card.backgroundColor,
      };

      const fileName = `${String(card.number).padStart(2, '0')}-${getMajorArcanaName(card.number).toLowerCase().replace(/\s+/g, '-')}.yml`;
      const filePath = path.join(majorArcanaDir, fileName);
      const yamlStr = yaml.dump(cardData);
      fs.writeFileSync(filePath, yamlStr);
      console.log(`Created ${filePath}`);
    }
  }
}

function createMinorArcanaYaml() {
  for (const key in MINOR_ARCANA_CARDS) {
    const card = MINOR_ARCANA_CARDS[key as unknown as MinorArcana];
    if (card) {
      const suitDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'minor-arcana', card.suit.toLowerCase());
      fs.mkdirSync(suitDir, { recursive: true });

      const cardData = {
        suit: card.suit,
        number: card.number,
        name: card.getName(),
        keywords: card.keywords,
        meanings: {
          upright: card.uprightMeanings,
          reversed: card.reversedMeanings,
        },
        visual_description: {
          background: card.visualDescription.split('.')[0] + '.',
          foreground: card.visualDescription.split('.').slice(1).join('.').trim(),
        },
        visual_description_analysis: card.visualDescriptionAnalysis.split('\n'),
        symbols: card.symbols,
        significance: card.significance,
        description: card.description,
      };

      const fileName = `${getMinorNumberName(card.number).toLowerCase()}.yml`;
      const filePath = path.join(suitDir, fileName);
      const yamlStr = yaml.dump(cardData);
      fs.writeFileSync(filePath, yamlStr);
      console.log(`Created ${filePath}`);
    }
  }
}

createMajorArcanaYaml();
createMinorArcanaYaml();

console.log('Finished creating card YAML files.');
