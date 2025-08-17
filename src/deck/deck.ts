import { TarotCard, CardPosition, CardSelectionStrategy, CardSelectionOptions, ShuffleStrategy } from '../types';
import { MAJOR_ARCANA_CARDS } from '../cards/major-arcana';
import { MINOR_ARCANA_CARDS } from '../cards/minor-arcana';
import { CARD_SELECTION_STRATEGIES, SHUFFLE_STRATEGIES, DealStrategy } from './strategies';

export class TarotDeck {
  private cards: TarotCard[] = [];
  private shuffled: TarotCard[] = [];
  private defaultStrategy: CardSelectionStrategy;
  private defaultShuffleStrategy: ShuffleStrategy;

  constructor(defaultStrategy?: CardSelectionStrategy, defaultShuffleStrategy?: ShuffleStrategy) {
    this.defaultStrategy = defaultStrategy || CARD_SELECTION_STRATEGIES.deal;
    this.defaultShuffleStrategy = defaultShuffleStrategy || SHUFFLE_STRATEGIES['fisher-yates'];
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
   * Shuffle the deck using the specified or default shuffle strategy
   */
  shuffle(shuffleStrategy?: ShuffleStrategy): void {
    const strategy = shuffleStrategy || this.defaultShuffleStrategy;
    this.shuffled = strategy.shuffle(this.cards);
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
    const allowReversals = options?.allowReversals ?? true;
    const strategy = options?.strategy || this.defaultStrategy;
    
    const selectedCards = strategy.selectCards([...this.shuffled], count, allowReversals);
    
    // Remove selected cards from deck
    const selectedCardIds = new Set(selectedCards.map(cp => cp.card.id));
    this.shuffled = this.shuffled.filter(card => !selectedCardIds.has(card.id));
    
    return selectedCards;
  }

  /**
   * Deal cards from the top of the deck
   * @deprecated Use selectCards() with deal strategy instead
   */
  deal(count: number, allowReversals: boolean = true): CardPosition[] {
    return this.selectCards(count, { allowReversals, strategy: CARD_SELECTION_STRATEGIES.deal });
  }

  /**
   * Fan pick - random selection from the deck
   * @deprecated Use selectCards() with fanpick strategy instead
   */
  fanPick(count: number, allowReversals: boolean = true): CardPosition[] {
    return this.selectCards(count, { allowReversals, strategy: CARD_SELECTION_STRATEGIES.fanpick });
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