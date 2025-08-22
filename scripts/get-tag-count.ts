import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const tarotModelDir = path.join(__dirname, '..', 'tarot-model');
const decksDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith');

function getCardFiles(dir: string): string[] {
  let files: string[] = [];
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      files = files.concat(getCardFiles(fullPath));
    } else if (path.extname(fullPath) === '.yml') {
      files.push(fullPath);
    }
  }
  return files;
}

function getTagCount() {
  const cardFiles = getCardFiles(decksDir);
  const allSymbols = new Set<string>();

  for (const file of cardFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const data = yaml.load(content) as { symbols?: string[] };
    if (data.symbols) {
      for (const symbol of data.symbols) {
        allSymbols.add(symbol);
      }
    }
  }
  console.log(`Total unique symbols: ${allSymbols.size}`);
}

getTagCount();
