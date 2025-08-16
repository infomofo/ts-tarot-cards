import { TarotDeck, DeckCardData } from '../deck';
import { RWS_ARCHETYPES } from '../archetypes/rws-card-archetype';

const customData = new Map<string, DeckCardData>();
for (const archetype of RWS_ARCHETYPES) {
  customData.set(archetype.id, {
    archetypeId: archetype.id,
    name: archetype.id,
    meanings: [],
    present: true
  });
}

export const CUSTOM_DECK = new TarotDeck("Custom Deck", customData);