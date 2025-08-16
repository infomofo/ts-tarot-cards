# ts-tarot-cards

A TypeScript library to model tarot card archetypes and deck-specific variations.

## Features

- RWS-based archetype list and robust constants
- Flexible deck models (RWS, Thoth, custom)
- Decks can add/remove/rename cards

## Usage

```typescript
import { RWS_DECK, THOTH_DECK, CUSTOM_DECK } from 'ts-tarot-cards';
import { RWSCardArchetype } from 'ts-tarot-cards/archetypes/rws-card-archetype';

const justiceRWS = RWS_DECK.getCard(RWSCardArchetype.JUSTICE.id);
const adjustmentThoth = THOTH_DECK.getCard(RWSCardArchetype.JUSTICE.id);

// Example: Custom decks can add cards like "The Happy Squirrel"
// See Roadmap below for how to add custom archetypes
```

## Custom Card Example

To add a custom card (such as "The Happy Squirrel"), add it to your custom deck definition.

## Roadmap

- Populate all 78 archetypes and constants
- Add more deck metadata
- Add spread modeling
- Add RWS symbols meaning