import { Arcana } from './arcana';
import { Suit } from './suit';

// Type aliases for valid card numbers
export type MajorNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21;
export type MinorNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface CardArchetype {
  id: string;
  arcana: Arcana;
  suit?: Suit;
  number?: MajorNumber | MinorNumber;
}