import { TarotDeck, DeckCardData } from '../deck';
import { RWS_ARCHETYPES, RWSCardArchetype } from '../archetypes/rws-card-archetype';

const thothData = new Map<string, DeckCardData>();
for (const archetype of RWS_ARCHETYPES) {
  if (archetype.id === RWSCardArchetype.JUSTICE.id) {
    thothData.set(archetype.id, {
      archetypeId: archetype.id,
      name: "Adjustment",
      meanings: ["Balance", "Karma"],
      present: true
    });
  } else {
    thothData.set(archetype.id, {
      archetypeId: archetype.id,
      name: archetype.id,
      meanings: [],
      present: true
    });
  }
}

export const THOTH_DECK = new TarotDeck("Thoth", thothData);