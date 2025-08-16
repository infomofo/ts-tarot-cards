import { TarotCard, CardPosition, CardSelectionStrategy } from '../types';
import { MAJOR_ARCANA_CARDS } from '../cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../cards/minor-arcana';
import { CARD_SELECTION_STRATEGIES, DealStrategy } from './strategies';

export class TarotDeck {
  private cards: TarotCard[] = [];
  private shuffled: TarotCard[] = [];
  private defaultStrategy: CardSelectionStrategy;

  constructor(defaultStrategy?: CardSelectionStrategy) {
    this.defaultStrategy = defaultStrategy || CARD_SELECTION_STRATEGIES.deal;
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck(): void {
    // Clear existing cards
    this.cards = [];
    
    // Add available major arcana cards
    this.cards.push(...Object.values(MAJOR_ARCANA_CARDS).filter(Boolean) as TarotCard[]);
    
    // Add available minor arcana cards
    this.cards.push(...Object.values(MINOR_ARCANA_CARDS).filter(Boolean) as TarotCard[]);
  }

  /**
   * Shuffle the deck using Fisher-Yates algorithm
   * In a real implementation, this could integrate with biometric randomness
   */
  shuffle(): void {
    this.shuffled = [...this.cards];
    
    // Fisher-Yates shuffle algorithm
    for (let i = this.shuffled.length - 1; i > 0; i--) {
      const j = this.getBiometricRandomIndex(i + 1);
      [this.shuffled[i], this.shuffled[j]] = [this.shuffled[j], this.shuffled[i]];
    }
  }

  /**
   * Stub for biometric randomness - could integrate with hardware or biometric data
   * For now, uses Math.random()
   */
  private getBiometricRandomIndex(max: number): number {
    // TODO: Integrate with biometric randomness source
    // This could use heart rate variability, mouse movement patterns, etc.
    return Math.floor(Math.random() * max);
  }

  /**
   * Deal a specified number of cards from the top of the deck
   */
  deal(count: number, allowReversals: boolean = true): CardPosition[] {
    if (count > this.shuffled.length) {
      throw new Error(`Cannot deal ${count} cards, only ${this.shuffled.length} available`);
    }

    const dealtCards: CardPosition[] = [];
    
    for (let i = 0; i < count; i++) {
      const card = this.shuffled.shift()!;
      const isReversed = allowReversals ? this.getBiometricRandomIndex(2) === 1 : false; // 50% chance of reversal if allowed
      
      dealtCards.push({
        card,
        position: i + 1,
        isReversed
      });
    }

    return dealtCards;
  }

  /**
   * Fan pick - allow selection of cards from a fanned deck
   * Returns cards in random positions as if picked from a fan
   */
  fanPick(count: number, allowReversals: boolean = true): CardPosition[] {
    if (count > this.shuffled.length) {
      throw new Error(`Cannot pick ${count} cards, only ${this.shuffled.length} available`);
    }

    const pickedCards: CardPosition[] = [];
    const availableIndices = Array.from({ length: this.shuffled.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      // Pick a random position from the fan
      const randomIndexPosition = this.getBiometricRandomIndex(availableIndices.length);
      const cardIndex = availableIndices.splice(randomIndexPosition, 1)[0];
      
      const card = this.shuffled[cardIndex];
      const isReversed = allowReversals ? this.getBiometricRandomIndex(2) === 1 : false; // 50% chance of reversal if allowed
      
      pickedCards.push({
        card,
        position: i + 1,
        isReversed
      });
    }

    // Remove picked cards from deck
    const pickedCardIds = new Set(pickedCards.map(cp => cp.card.id));
    this.shuffled = this.shuffled.filter(card => !pickedCardIds.has(card.id));

    return pickedCards;
  }

  /**
   * Select cards using a specified strategy
   */
  selectCards(count: number, allowReversals: boolean = true, strategy?: CardSelectionStrategy): CardPosition[] {
    const selectedStrategy = strategy || this.defaultStrategy;
    const selectedCards = selectedStrategy.selectCards([...this.shuffled], count, allowReversals);
    
    // Remove selected cards from deck
    const selectedCardIds = new Set(selectedCards.map(cp => cp.card.id));
    this.shuffled = this.shuffled.filter(card => !selectedCardIds.has(card.id));
    
    return selectedCards;
  }

  /**
   * Set the default card selection strategy
   */
  setDefaultStrategy(strategy: CardSelectionStrategy): void {
    this.defaultStrategy = strategy;
  }

  /**
   * Get the current default strategy
   */
  getDefaultStrategy(): CardSelectionStrategy {
    return this.defaultStrategy;
  }

  /**
   * Get available card selection strategies
   */
  getAvailableStrategies(): Record<string, CardSelectionStrategy> {
    return CARD_SELECTION_STRATEGIES;
  }

  /**
   * Get the number of cards remaining in the deck
   */
  getRemainingCount(): number {
    return this.shuffled.length;
  }

  /**
   * Get total number of cards in the deck
   */
  getTotalCount(): number {
    return this.cards.length;
  }

  /**
   * Reset the deck to its original state and shuffle
   */
  reset(): void {
    this.initializeDeck();
    this.shuffle();
  }
}