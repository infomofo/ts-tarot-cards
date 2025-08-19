import { MajorArcanaCard, Arcana, MajorArcana, getMajorArcanaName, toRomanNumeral, CardSymbol, SVGOptions } from '../types';
import { generateSvg } from './svg-generator';

// Concrete implementation of MajorArcanaCard with localization support
class MajorArcanaCardImpl implements MajorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Major = Arcana.Major;
  public readonly number: MajorArcana;
  public readonly numericValue: MajorArcana;
  public readonly romanNumeral: string;
  public readonly keywords: string[];
  public readonly uprightMeanings: string[];
  public readonly reversedMeanings: string[];
  public readonly visualDescription: string;
  public readonly visualDescriptionAnalysis: string;
  public readonly symbols: CardSymbol[];
  public readonly significance: string;
  public readonly description: string;
  public readonly emoji?: string;
  public readonly backgroundColor?: string;

  constructor(
    number: MajorArcana,
    keywords: string[],
    uprightMeanings: string[],
    reversedMeanings: string[],
    visualDescription: string,
    visualDescriptionAnalysis: string,
    symbols: CardSymbol[],
    significance: string,
    description: string,
    emoji?: string,
    backgroundColor?: string,
  ) {
    // Auto-generate ID like minor arcana
    this.id = `major-${number.toString().padStart(2, '0')}-${getMajorArcanaName(number).toLowerCase().replace(/\s+/g, '-')}`;
    this.number = number;
    this.numericValue = number;
    this.romanNumeral = toRomanNumeral(number);
    this.keywords = keywords;
    this.uprightMeanings = uprightMeanings;
    this.reversedMeanings = reversedMeanings;
    this.visualDescription = visualDescription;
    this.visualDescriptionAnalysis = visualDescriptionAnalysis;
    this.symbols = symbols;
    this.significance = significance;
    this.description = description;
    this.emoji = emoji;
    this.backgroundColor = backgroundColor;
  }

  getSvg(options?: SVGOptions): string {
    return generateSvg(this, options);
  }

  getTextRepresentation(): string {
    if (this.emoji) {
      return `[M${this.number}${this.emoji}]`;
    }
    return `[M${this.number}-${getMajorArcanaName(this.number).replace(/\s/g, '')}]`;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return getMajorArcanaName(this.number);
  }
}

// Helper function to create a complete MajorArcanaCard with auto-generated properties
function createMajorArcanaCard(
  number: MajorArcana,
  keywords: string[],
  uprightMeanings: string[],
  reversedMeanings: string[],
  visualDescription: string,
  visualDescriptionAnalysis: string,
  symbols: CardSymbol[],
  significance: string,
  description: string,
  emoji?: string,
  backgroundColor?: string,
): MajorArcanaCard {
  return new MajorArcanaCardImpl(number, keywords, uprightMeanings, reversedMeanings, visualDescription, visualDescriptionAnalysis, symbols, significance, description, emoji, backgroundColor);
}

// Example major arcana cards - extensible to full deck
export const MAJOR_ARCANA_CARDS: Partial<Record<MajorArcana, MajorArcanaCard>> = {
  [MajorArcana.TheFool]: createMajorArcanaCard(
    MajorArcana.TheFool,
    ['new beginnings', 'innocence', 'spontaneity', 'free spirit'],
    ['New beginnings', 'Blind faith', 'Innocence and naïveté', 'Leap of faith'],
    ['Fear of risks', 'Reckless behavior', 'Excessive naïveté', 'Poor judgment'],
    'A young man in colorful robes stands at the edge of a cliff with a small white dog. He holds a white rose in one hand and a small bag on a stick in the other.',
    'The young man represents innocence and the beginning of a journey. His lack of concern for the cliff edge signifies a leap of faith. The white dog is a symbol of loyalty and protection.',
    ['cliff', 'sun', 'dog', 'mountain', 'rose', 'bag'],
    'The beginning of the Major Arcana journey. As card 0, it embodies pure potential and naive courage.',
    'Represents new beginnings, blind faith, inexperience, and improvisation.',
    '🤡',
    '#FFD700'
  ),
  [MajorArcana.TheMagician]: createMajorArcanaCard(
    MajorArcana.TheMagician,
    ['manifestation', 'resourcefulness', 'power', 'inspired action'],
    ['Manifestation', 'Resourcefulness', 'Personal power', 'Inspired action'],
    ['Manipulation', 'Poor planning', 'Wasted potential', 'Scattered energy'],
    'A man stands before a table with a cup, a pentacle, a sword, and a wand on it. One hand points up, the other points down. An infinity symbol is above his head. He wears a white robe and a red cloak.',
    'The four items on the table represent the four suits of the Minor Arcana and the four elements, indicating the man has all the tools needed to manifest his will. The hand gestures signify the connection between the spiritual and material worlds ("as above, so below"). The infinity symbol, or lemniscate, represents eternal potential and mastery.',
    ['cup', 'pentacle', 'sword', 'wand', 'lemniscate', 'altar'],
    'The soul\'s first conscious act of will. As card 1, it transforms potential into directed energy.',
    'Represents manifestation, resourcefulness, and having the tools to accomplish your goals.',
    '🧙‍♂️',
    '#ADD8E6'
  ),
  [MajorArcana.TheHighPriestess]: createMajorArcanaCard(
    MajorArcana.TheHighPriestess,
    ['intuition', 'unconscious', 'inner voice', 'secrets'],
    ['Intuition', 'Sacred knowledge', 'Subconscious mind', 'Seeing beyond the obvious'],
    ['Ignoring intuition', 'Secrets and gossip', 'Hidden agendas', 'Confusion'],
    'A woman sits between two pillars, one black and one white. She wears a crown, holds a scroll, and has a crescent moon at her feet. A veil with pomegranates hangs behind her.',
    'The pillars, labeled "B" (Boaz) and "J" (Jachin), represent duality and the entrance to a sacred temple. The scroll, marked "TORA" (a version of "Torah"), contains hidden wisdom. The pomegranates on the veil symbolize fertility and the subconscious.',
    ['pillar', 'scroll', 'moon', 'pomegranate', 'veil', 'crown'],
    'The guardian of the subconscious. She teaches the value of looking inward for answers.',
    'Represents intuition, sacred knowledge, and the subconscious mind. It is time to listen to your inner voice.',
    '🔮',
    '#E6E6FA'
  ),
  [MajorArcana.TheEmpress]: createMajorArcanaCard(
    MajorArcana.TheEmpress,
    ['femininity', 'beauty', 'nature', 'nurturing', 'abundance'],
    ['Femininity', 'Nurturing', 'Abundance', 'Connection to nature'],
    ['Creative blocks', 'Dependence on others', 'Smothering love', 'Neglecting self-care'],
    'A woman with a crown of twelve stars sits on a throne in a golden wheat field. She holds a scepter. A heart-shaped shield with the symbol for Venus is beside her.',
    'The crown of twelve stars represents the zodiac. The wheat field symbolizes abundance from nature. The Venus symbol on the shield connects her to the planet of love, beauty, and creation. She is often seen as the archetypal mother figure.',
    ['throne', 'wheat', 'crown', 'scepter', 'venus symbol', 'shield'],
    'Symbolizing creation and the material world, she is the embodiment of motherhood.',
    'Represents femininity, nurturing, abundance, and creativity.',
    '👸',
    '#90EE90'
  ),
  [MajorArcana.TheEmperor]: createMajorArcanaCard(
    MajorArcana.TheEmperor,
    ['authority', 'structure', 'control', 'fatherhood'],
    ['Authority', 'Structure', 'Self-control', 'Fatherly guidance'],
    ['Domination', 'Rigid control', 'Lack of discipline', 'Abuse of power'],
    'A man with a long white beard and a crown sits on a stone throne decorated with four ram heads. He holds a scepter in one hand and a globe in the other. He wears armor under his robes.',
    'The ram heads are symbols of Aries, the astrological sign of leadership and action. The scepter is an Ankh, an Egyptian symbol for life, and the globe symbolizes his dominion. The armor signifies protection and fortitude.',
    ['throne', 'ram head', 'ankh', 'globe', 'armor'],
    'The masculine counterpart to the Empress, he represents order and structure.',
    'Represents authority, structure, and control. It is time to create order from chaos.',
    '🤴',
    '#F08080'
  ),
  [MajorArcana.TheHierophant]: createMajorArcanaCard(
    MajorArcana.TheHierophant,
    ['tradition', 'conformity', 'morality', 'ethics'],
    ['Tradition', 'Spiritual guidance', 'Conformity', 'Shared beliefs'],
    ['Rebellion', 'Challenging the status quo', 'Dogma', 'Non-conformity'],
    'A man in religious robes sits on a throne between two pillars. He raises one hand in blessing and holds a papal cross. Two men kneel before him, and crossed keys are at his feet.',
    'This man is often interpreted as a Pope, representing established religious institutions. The crossed keys are the keys to heaven, symbolizing access to sacred knowledge. The two kneeling men show the transfer of wisdom.',
    ['throne', 'pillar', 'papal cross', 'acolyte', 'key'],
    'The bridge between the divine and humanity, he represents tradition and established belief systems.',
    'Represents tradition, spiritual wisdom, and conformity. Seek guidance from trusted sources.',
    '🙏',
    '#DDA0DD'
  ),
  [MajorArcana.TheLovers]: createMajorArcanaCard(
    MajorArcana.TheLovers,
    ['love', 'harmony', 'relationships', 'values alignment'],
    ['Love', 'Harmony', 'Making value-based choices', 'Partnership'],
    ['Disharmony', 'Misalignment of values', 'Poor choices', 'Relationship struggles'],
    'A nude man and woman stand in a garden. Above them, a large, winged angel with purple robes emerges from a cloud. Behind the woman is a tall fruit tree with a serpent coiled around its trunk. Behind the man is a tree with twelve flames.',
    'The man and woman are commonly interpreted as Adam and Eve. The angel is Raphael. The Tree of Knowledge (behind the woman) and the Tree of Life (behind the man) represent a choice between earthly desire and spiritual union.',
    ['angel', 'serpent', 'tree of knowledge', 'tree of life'],
    'Representing the soul\'s first major choice, this card is about relationships and values.',
    'Represents love, relationships, and choices. A decision needs to be made based on your personal values.',
    '👩‍❤️‍👨',
    '#FFB6C1'
  ),
  [MajorArcana.TheChariot]: createMajorArcanaCard(
    MajorArcana.TheChariot,
    ['control', 'willpower', 'victory', 'assertion'],
    ['Willpower', 'Victory', 'Assertiveness', 'Forward momentum'],
    ['Lack of direction', 'Loss of control', 'Aggression', 'Scattered energy'],
    'A warrior in armor stands in a chariot under a starry canopy. He holds no reins, and the chariot is pulled by two sphinxes (one black, one white).',
    'The warrior controls the sphinxes through sheer willpower, symbolizing mastery over opposing forces. The black and white sphinxes represent duality (conscious/unconscious, positive/negative) that must be balanced to move forward.',
    ['chariot', 'sphinx', 'warrior', 'canopy'],
    'The Chariot represents the victory of will over conflict.',
    'Represents willpower, determination, and victory. Take control and move forward with confidence.',
    '🏎️',
    '#A9A9A9'
  ),
  [MajorArcana.Strength]: createMajorArcanaCard(
    MajorArcana.Strength,
    ['strength', 'courage', 'patience', 'compassion'],
    ['Inner strength', 'Courage', 'Compassion', 'Taming the ego'],
    ['Weakness', 'Self-doubt', 'Lack of self-control', 'Aggression'],
    'A woman gently closes the jaws of a lion with her bare hands. She wears a white robe and a floral crown, with an infinity symbol above her head.',
    'This card depicts inner strength, not brute force. The woman\'s calm demeanor shows that true power comes from compassion. The infinity symbol, or lemniscate, connects her to the Magician\'s infinite potential.',
    ['lion', 'lemniscate', 'floral crown'],
    'This card teaches that true power comes from within. The soul learns to master its primal instincts with compassion.',
    'Represents inner strength, courage, and compassion. Your power comes from a place of love and patience.',
    '🦁',
    '#F4A460'
  ),
  [MajorArcana.TheHermit]: createMajorArcanaCard(
    MajorArcana.TheHermit,
    ['soul-searching', 'introspection', 'guidance', 'solitude'],
    ['Introspection', 'Seeking inner guidance', 'Solitude', 'Wisdom'],
    ['Isolation', 'Loneliness', 'Withdrawal', 'Lost path'],
    'An old man with a long white beard stands on a mountain peak, holding a lantern with a shining star and a long staff. He is alone and looking down.',
    'The lantern contains a six-pointed star (Seal of Solomon), symbolizing wisdom. The Hermit has withdrawn from the world to find this inner light, which he can now share with others. The mountain peak signifies his achievement and isolation.',
    ['lantern', 'star', 'staff', 'mountain'],
    'The Hermit represents the soul\'s need to turn inward for answers.',
    'Represents soul-searching, introspection, and inner guidance. It is time to withdraw and look for answers within.',
    '🐚',
    '#BDB76B'
  ),
  [MajorArcana.WheelOfFortune]: createMajorArcanaCard(
    MajorArcana.WheelOfFortune,
    ['good luck', 'karma', 'life cycles', 'destiny'],
    ['Good luck', 'Karma', 'Turning points', 'Unexpected events'],
    ['Bad luck', 'Negative karma', 'Resistance to change', 'Feeling powerless'],
    'A giant wheel in the sky is surrounded by four winged animals: a man, an eagle, a lion, and a bull. On the wheel are letters, a sphinx, a serpent, and a red, devil-like creature.',
    'The four animals represent the four fixed signs of the zodiac (Aquarius, Scorpio, Leo, Taurus). The letters on the wheel can spell ROTA (wheel) or TAROT. The wheel is constantly turning, symbolizing the ever-changing cycles of life and fate.',
    ['wheel', 'sphinx', 'serpent', 'winged creature', 'letter'],
    'This card signifies the unpredictable nature of fate and the cycles of life.',
    'Represents good luck, karma, and life cycles. A turning point is at hand; embrace the change.',
    '🎡',
    '#DAA520'
  ),
  [MajorArcana.Justice]: createMajorArcanaCard(
    MajorArcana.Justice,
    ['justice', 'fairness', 'truth', 'cause and effect'],
    ['Justice', 'Truth', 'Cause and effect', 'Accountability'],
    ['Injustice', 'Dishonesty', 'Avoiding accountability', 'Bias'],
    'A crowned woman sits on a throne, holding a double-edged sword upright in one hand and scales in the other.',
    'The double-edged sword represents the power of intellect to make clear, impartial decisions. The scales symbolize the weighing of evidence to find balance and fairness. This card is about objective truth and taking responsibility for one\'s actions.',
    ['sword', 'scale', 'throne', 'crown'],
    'Justice represents the soul\'s encounter with truth and karmic consequences.',
    'Represents justice, fairness, and truth. Actions have consequences, and a balanced decision must be made.',
    '⚖️',
    '#B0C4DE'
  ),
  [MajorArcana.TheHangedMan]: createMajorArcanaCard(
    MajorArcana.TheHangedMan,
    ['suspension', 'restriction', 'letting go', 'new perspectives'],
    ['Surrender', 'New perspectives', 'Pausing to reflect', 'Sacrifice'],
    ['Stalling', 'Resistance to letting go', 'Martyrdom', 'Feeling stuck'],
    'A man hangs upside down from a T-shaped cross made of living wood, tied by one foot. His expression is calm, and his head is surrounded by a halo.',
    'He has willingly suspended himself to gain a new perspective, indicated by his serene expression and the halo of enlightenment. The T-shaped cross is a symbol of the living world. This is a pause for spiritual insight, not a punishment.',
    ['cross', 'halo'],
    'This card represents a pause in the soul\'s journey for profound insight.',
    'Represents suspension, new perspectives, and letting go. It is time to pause and see things differently.',
    '🙃',
    '#87CEEB'
  ),
  [MajorArcana.Death]: createMajorArcanaCard(
    MajorArcana.Death,
    ['endings', 'change', 'transformation', 'transition'],
    ['Endings', 'Transformation', 'Letting go', 'Transition'],
    ['Resistance to change', 'Fear of the unknown', 'Holding onto the past', 'Stagnation'],
    'A skeleton in armor rides a white horse, carrying a black flag with a white rose. A bishop, a woman, and a child are in its path.',
    'The skeleton represents the inevitability of change, which comes for all, regardless of status. The white horse symbolizes purity and the unstoppable force of this transformation. The rose on the flag represents beauty and life that can emerge from endings.',
    ['skeleton', 'white horse', 'flag', 'rose'],
    'Death is not about literal death but about transformation. The soul learns to let go of what no longer serves it.',
    'Represents endings, change, and transformation. A chapter is closing, making way for a new one.',
    '💀',
    '#2F4F4F'
  ),
  [MajorArcana.Temperance]: createMajorArcanaCard(
    MajorArcana.Temperance,
    ['balance', 'moderation', 'patience', 'purpose'],
    ['Balance', 'Patience', 'Finding a middle ground', 'Blending opposing forces'],
    ['Imbalance', 'Lack of patience', 'Conflict', 'Extremes in behavior'],
    'An angel with one foot in water and one on land pours water between two cups. The angel has a triangle in a square on its chest and a sun symbol on its forehead. A path leads to a rising sun.',
    'The act of pouring water between two cups symbolizes the blending of opposites to create harmony. The angel\'s stance (one foot in water, one on land) represents the connection between the subconscious and the material world. The path to the rising sun shows the way forward through balance.',
    ['angel', 'cup', 'water', 'sun', 'path'],
    'Temperance teaches the soul the art of balance and integration.',
    'Represents balance, moderation, and patience. It is time to find harmony and a middle ground.',
    '🥂',
    '#AFEEEE'
  ),
  [MajorArcana.TheDevil]: createMajorArcanaCard(
    MajorArcana.TheDevil,
    ['addiction', 'materialism', 'bondage', 'ignorance'],
    ['Bondage', 'Addiction', 'Materialism', 'Exploring the shadow self'],
    ['Breaking free', 'Releasing negative patterns', 'Detachment', 'Gaining awareness'],
    'A goat-headed being with bat wings sits on a black pedestal. Two naked people, a man and a woman, are loosely chained to the pedestal. They have small horns and tails.',
    'This card is a parody of The Lovers, showing a relationship based on bondage and materialism. The chains are loose, indicating that the figures are trapped by their own choices and can escape. The goat-headed being is often identified with Baphomet, representing the primal, shadow self.',
    ['devil', 'chain', 'pedestal'],
    'The Devil represents the soul\'s confrontation with its shadow side: addiction, materialism, and self-imposed limitations.',
    'Represents addiction, bondage, and materialism. You are chained by your own choices and can break free.',
    '😈',
    '#DC143C'
  ),
  [MajorArcana.TheTower]: createMajorArcanaCard(
    MajorArcana.TheTower,
    ['sudden change', 'upheaval', 'chaos', 'revelation'],
    ['Sudden change', 'Chaos', 'Awakening', 'Liberation'],
    ['Avoiding disaster', 'Fear of change', 'Clinging to false beliefs', 'Delayed upheaval'],
    'A tall tower on a mountain is struck by lightning and bursts into flames. Two people are falling from the top, and a crown is dislodged.',
    'The Tower represents a sudden, dramatic upheaval that destroys false structures and beliefs. The lightning is a flash of insight from the divine that shatters the ego (the crown). The falling people represent the loss of security when illusions are broken.',
    ['tower', 'lightning', 'fire', 'crown'],
    'The Tower signifies a sudden, ego-shattering event that destroys false structures.',
    'Represents sudden upheaval, chaos, and revelation. A dramatic change is about to tear down your reality.',
    '🗼',
    '#FF4500'
  ),
  [MajorArcana.TheStar]: createMajorArcanaCard(
    MajorArcana.TheStar,
    ['hope', 'faith', 'purpose', 'rejuvenation'],
    ['Hope', 'Faith', 'Renewal', 'Healing'],
    ['Despair', 'Lack of faith', 'Creative blocks', 'Feeling disconnected'],
    'A naked woman kneels by a pool of water, pouring water from two pitchers onto the land and into the pool. Above her shines one large star and seven smaller ones. A bird sits on a nearby tree.',
    'After the chaos of the Tower, the Star brings hope and renewal. The woman is naked, symbolizing vulnerability and authenticity. The large star is a guiding light, and the seven smaller stars represent the chakras. The bird is an ibis, a symbol of wisdom.',
    ['nude woman', 'star', 'pool', 'pitcher', 'ibis'],
    'After the storm of the Tower, the Star brings hope and healing.',
    'Represents hope, faith, and renewal. After a dark time, healing and inspiration are here.',
    '🌟',
    '#4682B4'
  ),
  [MajorArcana.TheMoon]: createMajorArcanaCard(
    MajorArcana.TheMoon,
    ['illusion', 'fear', 'anxiety', 'subconscious'],
    ['Illusion', 'Fear', 'Exploring the subconscious', 'Dreams and intuition'],
    ['Releasing fear', 'Clarity', 'Confronting illusions', 'Repressed emotions'],
    'A full moon with a crescent inside shines between two towers. A wolf and a dog howl at the moon, and a crayfish emerges from a pool of water onto a winding path.',
    'The Moon represents the journey into the subconscious. The dog (tamed nature) and wolf (wild nature) represent our primal fears. The crayfish emerging from the water symbolizes the surfacing of deep-seated emotions and instincts. The path is one of uncertainty.',
    ['moon', 'tower', 'wolf', 'dog', 'crayfish', 'path'],
    'The Moon represents the soul\'s journey through the dark night of the subconscious.',
    'Represents illusion, fear, and the subconscious. Things are not as they seem; trust your intuition.',
    '🌙',
    '#483D8B'
  ),
  [MajorArcana.TheSun]: createMajorArcanaCard(
    MajorArcana.TheSun,
    ['positivity', 'fun', 'warmth', 'success'],
    ['Joy', 'Success', 'Clarity', 'Optimism'],
    ['Lack of success', 'Pessimism', 'Unrealistic expectations', 'Feeling sad'],
    'A naked child rides a white horse under a smiling sun. The child holds a large red banner. Sunflowers grow over a brick wall behind them.',
    'The naked child represents innocence and joy in its purest form. The smiling sun radiates warmth and positivity. The sunflowers symbolize growth and abundance. The white horse represents purity and strength.',
    ['sun', 'child', 'white horse', 'sunflower', 'banner'],
    'Following the uncertainty of the Moon, the Sun brings clarity and joy.',
    'Represents joy, success, and positivity. It is a time of celebration and enlightenment.',
    '☀️',
    '#FFD700'
  ),
  [MajorArcana.Judgement]: createMajorArcanaCard(
    MajorArcana.Judgement,
    ['judgement', 'rebirth', 'inner calling', 'absolution'],
    ['Rebirth', 'Answering a higher calling', 'Absolution', 'Awakening'],
    ['Self-doubt', 'Ignoring the call', 'Guilt', 'Fear of change'],
    'An angel blows a trumpet from the heavens, and a man, a woman, and a child rise from their graves below.',
    'This card depicts a personal Last Judgment. The angel is often identified as Gabriel, calling the souls to awaken to a new level of consciousness. The rising people represent a rebirth and a reckoning with one\'s past actions, leading to absolution.',
    ['angel', 'trumpet', 'grave'],
    'Judgement represents the soul\'s final reckoning and rebirth.',
    'Represents judgment, rebirth, and a higher calling. It is time to face the past and embrace a new beginning.',
    '🎺',
    '#C0C0C0'
  ),
  [MajorArcana.TheWorld]: createMajorArcanaCard(
    MajorArcana.TheWorld,
    ['completion', 'integration', 'accomplishment', 'travel'],
    ['Completion', 'Integration', 'Accomplishment', 'Fulfillment'],
    ['Lack of completion', 'Unfinished business', 'Feeling incomplete', 'Lack of closure'],
    'A dancing woman is in the center of a large laurel wreath, holding two wands. In the corners are the heads of a man, an eagle, a lion, and a bull.',
    'The dancing woman represents the integrated self, in harmony with the universe. The laurel wreath symbolizes success and completion. The four heads represent the four fixed signs of the zodiac and the four evangelists, now in balance. The cycle is complete.',
    ['dancing woman', 'wreath', 'wand', 'winged creature'],
    'The final card of the Major Arcana, the World represents the completion of the soul\'s journey.',
    'Represents completion, integration, and accomplishment. The journey is complete, and it is time to celebrate your success.',
    '🌎',
    '#87CEFA'
  )
};

export function getMajorArcanaCard(arcana: MajorArcana): MajorArcanaCard | undefined {
  return MAJOR_ARCANA_CARDS[arcana];
}

export function createMajorArcanaId(arcana: MajorArcana): string {
  return `major-${arcana.toString().padStart(2, '0')}-${getMajorArcanaName(arcana).toLowerCase().replace(/\s+/g, '-')}`;
}
