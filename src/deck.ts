import { CardArchetype } from './card-archetype';

export interface DeckCardData {
  archetypeId?: string; // Link to RWS archetype if exists
  name: string;
  meanings: string[];
  reversedMeanings?: string[];
  symbolism?: string[];
  imageUrl?: string;
  present: boolean;
}

export class TarotDeck {
  name: string;
  cardData: Map<string, DeckCardData>; // key is card's unique id

  constructor(name: string, cardData: Map<string, DeckCardData>) {
    this.name = name;
    this.cardData = cardData;
  }

  getCard(cardId: string): DeckCardData | undefined {
    const card = this.cardData.get(cardId);
    return card && card.present ? card : undefined;
  }

  getAllCards(): DeckCardData[] {
    return Array.from(this.cardData.values()).filter(card => card.present);
  }
}