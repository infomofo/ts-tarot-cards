import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { Tag, Numerology } from './types';

// Define the structure of the raw data loaded from YAML files
// These will be different from the final application types
// and will reflect the snake_case YAML structure.

// A generic structure for a card from YAML
interface RawCard {
  name: string;
  number: number;
  keywords: string[];
  meanings: {
    upright: string[];
    reversed: string[];
  };
  visual_description: {
    background: string;
    foreground: string;
  };
  visual_description_analysis: string[];
  symbols: string[];
  significance: string;
  description: string;
  emoji?: string;
  bg_color?: string;
}

interface RawMinorArcanaSuitFile {
  cards: RawCard[];
}

interface RawSuit {
  name: string;
  element: string;
  general_meaning: string;
  keywords: string[];
  emoji: string;
}

interface RawSpreadPosition {
  position: number;
  name: string;
  position_significance: string;
  deal_order: number;
}

interface RawSpreadLayoutPosition {
  position: number;
  x: number;
  y: number;
  rotation?: number;
}

interface RawSpread {
  name:string;
  description: string;
  allow_reversals: boolean;
  preferred_strategy?: string;
  layout: RawSpreadLayoutPosition[];
  positions: RawSpreadPosition[];
}

// Path to the tarot-model directory
const tarotModelDir = path.join(process.cwd(), 'tarot-model');

function loadMajorArcana(): RawCard[] {
  const majorArcanaDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'major-arcana');
  const files = fs.readdirSync(majorArcanaDir);
  return files.map((file) => {
    const filePath = path.join(majorArcanaDir, file);
    return yaml.load(fs.readFileSync(filePath, 'utf8')) as RawCard;
  }).sort((a, b) => a.number - b.number);
}

function loadMinorArcana(): RawMinorArcanaSuitFile[] {
  const minorArcanaDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith', 'minor-arcana');
  const files = fs.readdirSync(minorArcanaDir);
  return files.map((file) => {
    const filePath = path.join(minorArcanaDir, file);
    return yaml.load(fs.readFileSync(filePath, 'utf8')) as RawMinorArcanaSuitFile;
  });
}

function loadSuits(): RawSuit[] {
  const suitsDir = path.join(tarotModelDir, 'suits');
  const files = fs.readdirSync(suitsDir);
  return files.map((file) => {
    const filePath = path.join(suitsDir, file);
    return yaml.load(fs.readFileSync(filePath, 'utf8')) as RawSuit;
  });
}

function loadSpreads(): Record<string, RawSpread> {
  const spreadsPath = path.join(tarotModelDir, 'spreads.yml');
  const data = yaml.load(fs.readFileSync(spreadsPath, 'utf8')) as { spreads: Record<string, RawSpread> };
  return data.spreads;
}

function loadTags(): Record<string, Tag> {
  const tagsPath = path.join(tarotModelDir, 'tags.yml');
  const data = yaml.load(fs.readFileSync(tagsPath, 'utf8')) as { tags: Record<string, Tag> };
  return data.tags;
}

function loadNumerology(): Record<number, Numerology> {
  const numerologyPath = path.join(tarotModelDir, 'numerology.yml');
  const data = yaml.load(fs.readFileSync(numerologyPath, 'utf8')) as { numbers: Record<number, Numerology> };
  return data.numbers;
}

export function loadAllData() {
  return {
    majorArcana: loadMajorArcana(),
    minorArcana: loadMinorArcana(),
    suits: loadSuits(),
    spreads: loadSpreads(),
    tags: loadTags(),
    numerology: loadNumerology(),
  };
}
