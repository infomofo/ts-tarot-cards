import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

const tarotModelDir = path.join(__dirname, '..', 'tarot-model');
const decksDir = path.join(tarotModelDir, 'decks', 'rider-waite-smith');
const tagsDir = path.join(tarotModelDir, 'tags');

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

function createTagFiles(start: number, end?: number) {
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

  const symbols = Array.from(allSymbols).slice(start, end);

  for (const symbol of symbols) {
    const parts = symbol.split(':');
    const tagName = parts[parts.length - 1];
    const tagPath = parts.slice(0, -1);

    const tagDir = path.join(tagsDir, ...tagPath);
    fs.mkdirSync(tagDir, { recursive: true });

    const tagData = {
      name: tagName,
      lineage: parts.join(' > '),
      appearance: "",
      interpretation: "",
      meaning: "",
      mythological_significance: "",
    };

    const filePath = path.join(tagDir, `${tagName}.yml`);
    const yamlStr = yaml.dump(tagData);
    fs.writeFileSync(filePath, yamlStr);
    console.log(`Created ${filePath}`);
  }
}

const start = process.argv[2] ? parseInt(process.argv[2], 10) : 0;
const end = process.argv[3] ? parseInt(process.argv[3], 10) : undefined;

createTagFiles(start, end);

console.log('Finished creating tag YAML files.');
