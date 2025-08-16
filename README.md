# TypeScript Tarot Cards

A TypeScript library for modeling and working with Rider-Waite-Smith Tarot deck, including deck management, card spreads, and reading functionality.

## Features

- **Core Types & Enums**: Complete type definitions for tarot cards, suits, arcana, and spreads
- **Suit Properties**: Element associations and meanings for each suit (Cups/Water, Pentacles/Earth, Swords/Air, Wands/Fire)
- **Extensible Card System**: Archetype examples for major and minor arcana, designed to be extended to full 78-card deck
- **Deck Logic**: Shuffling, dealing, and fan pick functionality with stub for biometric randomness
- **Spread Modeling**: Pre-defined spreads (3-card, cross) with custom spread creation
- **Reading Support**: Complete reading workflow with card positions and reversal handling

## Installation

```bash
npm install ts-tarot-cards
```

## Usage

### Basic Deck Operations

```typescript
import { TarotDeck } from 'ts-tarot-cards';

// Create and shuffle a deck
const deck = new TarotDeck();

// Deal cards from the top
const dealtCards = deck.deal(3);

// Fan pick (random selection)
const fanPicked = deck.fanPick(1);

// Check remaining cards
console.log(`${deck.getRemainingCount()} cards remaining`);

// Reset deck
deck.reset();
```

### Performing Spreads

```typescript
import { SpreadReader } from 'ts-tarot-cards';

const reader = new SpreadReader();

// Three-card spread
const threeCardReading = reader.performReading('threeCard');
console.log('Past:', threeCardReading.cards[0]);
console.log('Present:', threeCardReading.cards[1]);
console.log('Future:', threeCardReading.cards[2]);

// Cross spread
const crossReading = reader.performReading('crossSpread');

// Custom spread
const customSpread = reader.createCustomSpread(
  'Relationship Spread',
  'Insight into relationship dynamics',
  [
    { position: 1, name: 'You', meaning: 'Your role in the relationship' },
    { position: 2, name: 'Partner', meaning: 'Their role in the relationship' },
    { position: 3, name: 'Relationship', meaning: 'The relationship itself' }
  ]
);

const customReading = reader.performCustomReading(customSpread);
```

### Working with Suits

```typescript
import { getSuitProperties, Suit, Element } from 'ts-tarot-cards';

const cupsProperties = getSuitProperties(Suit.Cups);
console.log(cupsProperties.element); // Element.Water
console.log(cupsProperties.generalMeaning); // "Emotions, relationships, spirituality, intuition"
```

### Card Information

```typescript
import { getMajorArcanaCard, MajorArcana } from 'ts-tarot-cards';

const fool = getMajorArcanaCard(MajorArcana.TheFool);
if (fool) {
  console.log(fool.uprightMeaning);
  console.log(fool.reversedMeaning);
  console.log(fool.keywords);
}
```

## Current Card Set

This library currently includes example implementations of:

**Major Arcana (2 cards)**:
- The Fool (0)
- The Magician (I)

**Minor Arcana (2 cards)**:
- Ace of Cups
- Three of Swords

The architecture is designed to be easily extended to include the full 78-card Rider-Waite-Smith deck.

## Types

### Core Types

- `TarotCard`: Complete card definition with meanings, keywords, and metadata
- `CardPosition`: Card with position and reversal information
- `Spread`: Spread definition with positions and meanings
- `SpreadReading`: Complete reading with cards, spread, and timestamp

### Enums

- `Arcana`: Major, Minor
- `Suit`: Cups, Pentacles, Swords, Wands
- `Element`: Water, Earth, Air, Fire
- `MinorNumber`: Ace through King
- `MajorArcana`: All 22 major arcana cards

## Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Development mode (watch)
npm run dev
```

## Architecture Notes

- **Biometric Randomness**: The shuffling system includes stubs for integrating biometric randomness sources (heart rate variability, mouse movements, etc.) for enhanced randomness in divination contexts
- **Extensibility**: The card system is designed to easily accommodate the full 78-card deck
- **Type Safety**: Full TypeScript typing ensures compile-time validation of card operations

## IMPORTANT DISCLAIMER

⚠️ **This library is for educational, entertainment, and software development purposes only.**

- Tarot card interpretations provided in this library are traditional meanings and should not be considered as professional advice
- Some interpretations included are the author's own and may vary from other sources or traditions  
- This software is not intended to provide medical, psychological, financial, or legal guidance
- Any decisions made based on tarot readings should not replace professional consultation
- The developers are not responsible for any decisions made using this library
- Card meanings and interpretations may vary among different traditions and practitioners
- Random number generation, even with biometric enhancement, cannot predict future events

Use responsibly and with an understanding that tarot is a tool for reflection and entertainment, not prediction or professional guidance.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit pull requests to expand the card database, add new spread types, or improve functionality.