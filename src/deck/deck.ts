import { TarotCard, CardPosition, CardSelectionStrategy, CardSelectionOptions, ShuffleStrategy } from '../types';
import { MAJOR_ARCANA_CARDS } from '../cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../cards/minor-arcana';
import { CARD_SELECTION_STRATEGIES } from './card-selection-strategies';
import { SHUFFLE_STRATEGIES } from './shuffle-strategies';

export class TarotDeck {
  private initialDeck: TarotCard[] = [];
  private currentDeck: TarotCard[] = [];
  private defaultCardSelectionStrategy: CardSelectionStrategy;
  private defaultShuffleStrategy: ShuffleStrategy;

  constructor(defaultStrategy?: CardSelectionStrategy, defaultShuffleStrategy?: ShuffleStrategy) {
    this.defaultCardSelectionStrategy = defaultStrategy || CARD_SELECTION_STRATEGIES.deal;
    this.defaultShuffleStrategy = defaultShuffleStrategy || SHUFFLE_STRATEGIES.fisherYates;
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck(): void {
    // Clear existing cards
    this.initialDeck = [];
    
    // Add available major arcana cards
    this.initialDeck.push(...Object.values(MAJOR_ARCANA_CARDS).filter(Boolean) as TarotCard[]);
    
    // Add available minor arcana cards
    this.initialDeck.push(...Object.values(MINOR_ARCANA_CARDS).filter(Boolean) as TarotCard[]);
  }

  /**
   * Shuffle the deck using the specified or default shuffle strategy
   */
  shuffle(shuffleStrategy?: ShuffleStrategy): void {
    const strategy = shuffleStrategy || this.defaultShuffleStrategy;
    this.currentDeck = strategy.shuffle(this.initialDeck);
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
   * Select cards using a specified strategy or options
   */
  selectCards(count: number, options?: CardSelectionOptions): CardPosition[] {
    const strategy = options?.strategy || this.defaultCardSelectionStrategy;
    
    const selectedCards = strategy.selectCards([...this.currentDeck], count);
    
    // Convert TarotCard[] to CardPosition[] with position numbering
    // Reversal logic will be handled at the reader/spread level
    const cardPositions: CardPosition[] = selectedCards.map((card, index) => ({
      card,
      position: index + 1,
      isReversed: false // Default to upright, reversal handled by reader
    }));
    
    // Remove selected cards from deck
    const selectedCardIds = new Set(selectedCards.map(card => card.id));
    this.currentDeck = this.currentDeck.filter(card => !selectedCardIds.has(card.id));
    
    return cardPositions;
  }

  /**
   * Deal cards from the top of the deck
   * @deprecated Use selectCards() with deal strategy instead
   */
  deal(count: number): CardPosition[] {
    return this.selectCards(count, { strategy: CARD_SELECTION_STRATEGIES.deal });
  }

  /**
   * Fan pick - random selection from the deck
   * @deprecated Use selectCards() with fanpick strategy instead
   */
  fanPick(count: number): CardPosition[] {
    return this.selectCards(count, { strategy: CARD_SELECTION_STRATEGIES.fanpick });
  }

  /**
   * Set the default card selection strategy
   */
  setDefaultCardSelectionStrategy(strategy: CardSelectionStrategy): void {
    this.defaultCardSelectionStrategy = strategy;
  }

  /**
   * Get the current default card selection strategy
   */
  getDefaultCardSelectionStrategy(): CardSelectionStrategy {
    return this.defaultCardSelectionStrategy;
  }

  /**
   * Get available card selection strategies
   */
  getAvailableCardSelectionStrategies(): Record<string, CardSelectionStrategy> {
    return CARD_SELECTION_STRATEGIES;
  }

  /**
   * Set the default shuffle strategy
   */
  setDefaultShuffleStrategy(strategy: ShuffleStrategy): void {
    this.defaultShuffleStrategy = strategy;
  }

  /**
   * Get the current default shuffle strategy
   */
  getDefaultShuffleStrategy(): ShuffleStrategy {
    return this.defaultShuffleStrategy;
  }

  /**
   * Get available shuffle strategies
   */
  getAvailableShuffleStrategies(): Record<string, ShuffleStrategy> {
    return SHUFFLE_STRATEGIES;
  }

  /**
   * Get the number of cards remaining in the deck
   */
  getRemainingCount(): number {
    return this.currentDeck.length;
  }

  /**
   * Get total number of cards in the deck
   */
  getTotalCount(): number {
    return this.initialDeck.length;
  }

  /**
   * Reset the deck to its original state and shuffle
   */
  reset(): void {
    this.initializeDeck();
    this.shuffle();
  }
}
