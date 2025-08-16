import { TarotDeck, DeckCardData } from '../deck';
import { RWS_ARCHETYPES } from '../archetypes/rws-card-archetype';

const rwsData = new Map<string, DeckCardData>();
for (const archetype of RWS_ARCHETYPES) {
  rwsData.set(archetype.id, {
    archetypeId: archetype.id,
    name: archetype.id,
    meanings: [],
    present: true
  });
}

export const RWS_DECK = new TarotDeck("Rider-Waite-Smith", rwsData);