import { MinorArcanaCard, Arcana, Suit, MinorNumber, MinorArcana, getMinorNumberName, toRomanNumeral, CardSymbol } from '../types';

// Concrete implementation of MinorArcanaCard with localization support
class MinorArcanaCardImpl implements MinorArcanaCard {
  public readonly id: string;
  public readonly arcana: Arcana.Minor = Arcana.Minor;
  public readonly suit: Suit;
  public readonly number: MinorNumber;
  public readonly numericValue: MinorNumber;
  public readonly romanNumeral: string;
  public readonly keywords: string[];
  public readonly uprightMeanings: string[];
  public readonly reversedMeanings: string[];
  public readonly visualDescription: string;
  public readonly visualDescriptionAnalysis: string;
  public readonly symbols: CardSymbol[];
  public readonly significance: string;
  public readonly description: string;

  constructor(
    suit: Suit,
    number: MinorNumber,
    keywords: string[],
    uprightMeanings: string[],
    reversedMeanings: string[],
    visualDescription: string,
    visualDescriptionAnalysis: string,
    symbols: CardSymbol[],
    significance: string,
    description: string
  ) {
    this.id = `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
    this.suit = suit;
    this.number = number;
    this.numericValue = number; // Automatically use the enum value
    this.romanNumeral = toRomanNumeral(number);
    this.keywords = keywords;
    this.uprightMeanings = uprightMeanings;
    this.reversedMeanings = reversedMeanings;
    this.visualDescription = visualDescription;
    this.visualDescriptionAnalysis = visualDescriptionAnalysis;
    this.symbols = symbols;
    this.significance = significance;
    this.description = description;
  }

  getName(locale?: string): string {
    // Future localization can be added here based on locale parameter
    // For now, default to English
    return `${getMinorNumberName(this.number)} of ${this.suit}`;
  }
}

// Helper function to create a complete MinorArcanaCard with auto-generated properties
function createMinorArcanaCard(
  suit: Suit,
  number: MinorNumber,
  keywords: string[],
  uprightMeanings: string[],
  reversedMeanings: string[],
  visualDescription: string,
  visualDescriptionAnalysis: string,
  symbols: CardSymbol[],
  significance: string,
  description: string
): MinorArcanaCard {
  return new MinorArcanaCardImpl(suit, number, keywords, uprightMeanings, reversedMeanings, visualDescription, visualDescriptionAnalysis, symbols, significance, description);
}

// Example minor arcana cards - extensible to full deck
export const MINOR_ARCANA_CARDS: Partial<Record<MinorArcana, MinorArcanaCard>> = {
  // Suit of Cups
  [MinorArcana.AceOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Ace, ['love', 'new relationships', 'compassion', 'creativity'],
    ['New love', 'Emotional beginnings', 'Compassion', 'Creativity'],
    ['Emotional loss', 'Blocked creativity', 'Emptiness', 'Instability'],
    'A hand emerges from a cloud, holding a chalice overflowing with five streams of water. A dove descends toward it, holding a wafer in its beak.',
    'The hand from the cloud is a divine gift. The overflowing chalice represents emotional abundance. The dove symbolizes peace and the Holy Spirit, carrying a communion wafer.',
    ['hand', 'cloud', 'chalice', 'water', 'dove', 'wafer', 'lotus'],
    'The beginning of the emotional journey, embodying pure emotional potential.',
    'Represents new love, new relationships, and new beginnings in love.'
  ),
  [MinorArcana.TwoOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Two, ['partnership', 'mutual attraction', 'connection'],
    ['Unified love', 'Partnership', 'Mutual attraction', 'Harmony'],
    ['Break-ups', 'Disharmony', 'Mistrust', 'Imbalance'],
    'A man and a woman exchange cups. Above them is a winged lion\'s head over two intertwined snakes.',
    'The exchange of cups symbolizes a partnership or truce. The symbol above them is a Caduceus, a symbol of negotiation and commerce, with a lion\'s head signifying passion.',
    ['cup', 'caduceus', 'lion head'],
    'The formation of a connection, bringing emotion into a partnership.',
    'Represents partnership, mutual attraction, and shared understanding.'
  ),
  [MinorArcana.ThreeOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Three, ['celebration', 'friendship', 'community'],
    ['Celebration', 'Friendship', 'Community', 'Reunions'],
    ['Gossip', 'Isolation', 'Overindulgence', 'Scandal'],
    'Three women dance in a circle, raising their cups in a toast. They are surrounded by a harvest of fruits and flowers.',
    'The dancing women represent shared joy and celebration. The harvest symbolizes abundance and the fruits of their collaboration.',
    ['cup', 'harvest', 'flower'],
    'The joy of community and shared emotional experiences.',
    'Represents celebration, friendship, and community.'
  ),
  [MinorArcana.FourOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Four, ['apathy', 'contemplation', 'disconnection'],
    ['Apathy', 'Contemplation', 'Re-evaluation', 'Missed opportunities'],
    ['Sudden awareness', 'Choosing happiness', 'Letting go of regret', 'New motivation'],
    'A young man sits under a tree with his arms crossed, looking at three cups before him. A fourth cup is offered by a hand from a cloud.',
    'The man\'s posture shows apathy and discontent. The fourth cup from the cloud represents a missed opportunity or a blessing being ignored.',
    ['tree', 'cup', 'hand', 'cloud'],
    'A moment of emotional stagnation and introspection.',
    'Represents apathy, contemplation, and missed opportunities.'
  ),
  [MinorArcana.FiveOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Five, ['loss', 'grief', 'regret', 'disappointment'],
    ['Loss', 'Grief', 'Regret', 'Disappointment'],
    ['Moving on', 'Acceptance', 'Forgiveness', 'Finding hope'],
    'A person in a black cloak looks down at three spilled cups. Two full cups stand behind them. A bridge leads to a building in the distance.',
    'The spilled cups symbolize loss and regret. The two full cups represent what remains, though they are currently unseen. The bridge shows a path forward.',
    ['cloak', 'spilled cup', 'full cup', 'bridge', 'building'],
    'The pain of loss and the tendency to focus on what is gone.',
    'Represents loss, grief, and regret. Do not forget what still remains.'
  ),
  [MinorArcana.SixOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Six, ['nostalgia', 'childhood', 'reunion', 'innocence'],
    ['Nostalgia', 'Happy memories', 'Childhood innocence', 'Reunions'],
    ['Stuck in the past', 'Unrealistic expectations', 'Naivety', 'Boring life'],
    'A young boy offers a cup filled with flowers to a younger girl. Five other cups are around them.',
    'This scene evokes a sense of nostalgia and the simple joys of childhood. The giving of flowers is an act of innocent kindness.',
    ['cup', 'flower', 'village'],
    'A journey back to the sweet memories of the past.',
    'Represents nostalgia, childhood memories, and simple joys.'
  ),
  [MinorArcana.SevenOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Seven, ['choices', 'illusions', 'daydreaming'],
    ['Choices', 'Daydreaming', 'Illusion', 'Wishful thinking'],
    ['Clarity', 'Decisiveness', 'Avoiding temptation', 'Focusing on reality'],
    'A person stands before seven cups on clouds, each containing a different vision: a castle, jewels, a laurel wreath, a dragon, a snake, a woman\'s head, and a shrouded figure.',
    'The cups contain various temptations and desires, representing the many choices available, some of which may be illusions. The shrouded figure represents a hidden truth or a mystery.',
    ['cup', 'cloud', 'vision'],
    'A crossroads of choice, often clouded by illusion.',
    'Represents choices, illusions, and daydreaming. You must choose wisely.'
  ),
  [MinorArcana.EightOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Eight, ['abandonment', 'withdrawal', 'escapism'],
    ['Walking away', 'Emotional withdrawal', 'Seeking deeper meaning', 'Moving on'],
    ['Fear of the unknown', 'Returning to a bad situation', 'Feeling trapped', 'Avoiding change'],
    'A person with a walking stick turns their back on eight stacked cups and walks away towards mountains under a dark moon.',
    'The person is willingly leaving behind emotional fulfillment that is no longer satisfying to seek a higher purpose, represented by the mountains.',
    ['cup', 'mountain', 'moon', 'walking stick'],
    'A turning point where one chooses to leave behind what is emotionally unfulfilling.',
    'Represents walking away, withdrawal, and seeking something more.'
  ),
  [MinorArcana.NineOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Nine, ['wishes fulfilled', 'satisfaction', 'contentment'],
    ['Wishes fulfilled', 'Contentment', 'Satisfaction', 'Gratitude'],
    ['Unfulfilled wishes', 'Dissatisfaction', 'Greed', 'Smugness'],
    'A cheerful man sits on a bench with his arms crossed. Behind him, nine golden cups are arranged on a draped table.',
    'Often called the "wish card," the man\'s smug satisfaction shows that his desires have been met. The cups represent emotional and material fulfillment.',
    ['cup', 'bench'],
    'The attainment of happiness and emotional satisfaction.',
    'Represents wishes fulfilled, satisfaction, and contentment.'
  ),
  [MinorArcana.TenOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Ten, ['harmony', 'marriage', 'happiness', 'family'],
    ['Harmony', 'Marriage', 'Family happiness', 'Emotional fulfillment'],
    ['Broken relationships', 'Disharmony', 'Family strife', 'A facade of happiness'],
    'A man and woman stand with their arms around each other, looking at a rainbow with ten cups in the sky. Two children play nearby.',
    'The rainbow is a symbol of divine blessing and the end of troubles. The happy family and cozy home represent ultimate emotional fulfillment.',
    ['rainbow', 'cup', 'home'],
    'The culmination of the suit of Cups, representing ultimate emotional fulfillment.',
    'Represents harmony, marriage, and family happiness.'
  ),
  [MinorArcana.PageOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Page, ['creative opportunities', 'intuitive messages', 'curiosity'],
    ['Creative ideas', 'Intuitive messages', 'Emotional sensitivity', 'Curiosity'],
    ['Emotional immaturity', 'Creative blocks', 'Ignoring intuition', 'Insecurity'],
    'A young man in flamboyant clothes stands on a seashore, holding a cup with a fish popping out of it.',
    'The fish popping out of the cup represents a surprising creative or intuitive message emerging from the subconscious (the sea).',
    ['cup', 'fish', 'sea'],
    'The messenger of the emotional world, bringing new creative ideas.',
    'Represents creative opportunities and intuitive messages. Be open to new ideas.'
  ),
  [MinorArcana.KnightOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Knight, ['romance', 'charm', 'imagination', 'beauty'],
    ['Romance', 'Charm', 'Imagination', 'An invitation'],
    ['Unrealistic ideals', 'Jealousy', 'Emotional manipulation', 'A player'],
    'A knight on a white horse moves slowly, holding out a golden cup. His helmet and boots have wings.',
    'The knight is a romantic hero, offering his heart (the cup). The wings on his helmet and boots symbolize his active imagination and connection to the divine.',
    ['knight', 'white horse', 'cup', 'wing'],
    'A quest guided by the heart and imagination.',
    'Represents romance, charm, and following your heart. An offer is on its way.'
  ),
  [MinorArcana.QueenOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.Queen, ['compassion', 'calm', 'intuition', 'nurturing'],
    ['Compassion', 'Emotional security', 'Intuition', 'Nurturing'],
    ['Emotional insecurity', 'Neediness', 'Being overly sensitive', 'Martyrdom'],
    'A queen sits on a throne at the edge of the sea, holding an ornate, lidded cup.',
    'The queen is in tune with her emotions and the subconscious (the sea). The ornate, lidded cup suggests that her feelings are deep and contained, not openly displayed.',
    ['queen', 'throne', 'cup', 'sea'],
    'The master of her emotions, compassionate and intuitive.',
    'Represents compassion, calm, and intuition. Trust your heart and lead with love.'
  ),
  [MinorArcana.KingOfCups]: createMinorArcanaCard(
    Suit.Cups, MinorNumber.King, ['emotional balance', 'compassion', 'diplomacy'],
    ['Emotional mastery', 'Balance', 'Compassion', 'Diplomacy'],
    ['Emotional manipulation', 'Moodiness', 'Volatility', 'Coldness'],
    'A king sits on a throne in a turbulent sea, yet he remains calm. He holds a cup and a scepter.',
    'The king\'s calm demeanor in a turbulent sea shows his mastery over his emotions. The cup represents his emotions, while the scepter represents his authority and control.',
    ['king', 'throne', 'sea', 'cup', 'scepter', 'fish', 'ship'],
    'The perfect balance of emotion and intellect.',
    'Represents emotional balance, compassion, and diplomacy. You are in control of your emotions.'
  ),

  // Suit of Pentacles
  [MinorArcana.AceOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Ace, ['opportunity', 'prosperity', 'new venture'],
    ['New opportunities', 'Prosperity', 'Manifestation', 'Good fortune'],
    ['Missed opportunities', 'Poor financial planning', 'Greed', 'Bad investments'],
    'A hand emerges from a cloud, holding a large golden pentacle. Below is a lush garden.',
    'The hand from the cloud offers a tangible gift or opportunity. The lush garden represents the potential for prosperous new beginnings.',
    ['hand', 'cloud', 'pentacle', 'garden', 'path'],
    'The seed of material prosperity and a new, tangible venture.',
    'Represents a new opportunity for prosperity and manifestation.'
  ),
  [MinorArcana.TwoOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Two, ['balancing', 'juggling', 'flexibility'],
    ['Balancing priorities', 'Juggling responsibilities', 'Adaptability', 'Time management'],
    ['Feeling overwhelmed', 'Disorganization', 'Lack of balance', 'Dropping the ball'],
    'A young man dances while juggling two pentacles connected by an infinity loop. Behind him, two ships ride the waves.',
    'The juggling act represents the need to balance multiple priorities. The ships on the waves symbolize the ups and downs of life that one must adapt to. The infinity loop (lemniscate) suggests he can handle this indefinitely.',
    ['pentacle', 'lemniscate', 'ship', 'wave'],
    'The art of balance in a constantly changing world.',
    'Represents balancing priorities and adapting to change.'
  ),
  [MinorArcana.ThreeOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Three, ['teamwork', 'collaboration', 'skill'],
    ['Teamwork', 'Collaboration', 'Mastery of a skill', 'Recognition'],
    ['Lack of teamwork', 'Poor quality work', 'No recognition', 'Ego'],
    'A craftsman works on a cathedral archway, consulting with a monk and a nun who hold the plans.',
    'This card highlights the importance of teamwork and collaboration, where different skills come together to create something of value.',
    ['craftsman', 'monk', 'nun', 'cathedral', 'plan'],
    'The initial rewards of hard work and collaboration.',
    'Represents teamwork, collaboration, and skilled craftsmanship.'
  ),
  [MinorArcana.FourOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Four, ['control', 'stability', 'security', 'possessiveness'],
    ['Financial stability', 'Security', 'Control', 'Saving money'],
    ['Greed', 'Materialism', 'Fear of loss', 'Being too controlling'],
    'A man sits on a stool, clutching a pentacle to his chest. He balances another on his head and has two more under his feet.',
    'The man is hoarding his wealth out of a fear of loss. His posture is defensive, showing a possessive and conservative mindset.',
    ['pentacle', 'stool', 'city'],
    'A desire for control and security, often through material possessions.',
    'Represents control, stability, and possessiveness.'
  ),
  [MinorArcana.FiveOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Five, ['poverty', 'hardship', 'isolation'],
    ['Financial hardship', 'Poverty', 'Isolation', 'Insecurity'],
    ['Recovery', 'Finding help', 'Financial improvement', 'Hope'],
    'Two people in ragged clothes walk through the snow outside a brightly lit church window. One is on crutches.',
    'The people are "left out in the cold," representing hardship and isolation. The lit church window symbolizes a sanctuary or help that is available but being ignored.',
    ['snow', 'church window'],
    'A time of hardship and feeling left out in the cold.',
    'Represents poverty, hardship, and isolation.'
  ),
  [MinorArcana.SixOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Six, ['generosity', 'charity', 'giving and receiving'],
    ['Generosity', 'Charity', 'Giving and receiving', 'Financial balance'],
    ['Debt', 'One-sided charity', 'Abuse of generosity', 'Greed'],
    'A wealthy merchant gives coins to two beggars who kneel at his feet. He holds a scale.',
    'The merchant is sharing his wealth, but the scales show that his charity is measured and just, not boundless. It represents a balance of power and resources.',
    ['merchant', 'beggar', 'coin', 'scale'],
    'The flow of resources and the balance between giving and receiving.',
    'Represents generosity, charity, and financial balance.'
  ),
  [MinorArcana.SevenOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Seven, ['patience', 'investment', 'long-term view'],
    ['Patience', 'Investment', 'Evaluating progress', 'Perseverance'],
    ['Impatience', 'Frustration', 'Wasted effort', 'Giving up too soon'],
    'A man leans on his hoe, looking at the seven pentacles growing on a bush. He is taking a break to wait for the harvest.',
    'The man is not harvesting yet; he is patiently waiting for his investments to mature. This card represents a pause to evaluate progress before reaping the rewards.',
    ['hoe', 'pentacle', 'bush'],
    'The value of patience and long-term investment.',
    'Represents patience, investment, and evaluating your progress.'
  ),
  [MinorArcana.EightOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Eight, ['skill', 'mastery', 'diligence', 'apprenticeship'],
    ['Mastery of a skill', 'Diligence', 'Apprenticeship', 'Attention to detail'],
    ['Lack of focus', 'Poor quality work', 'Cutting corners', 'Perfectionism'],
    'A craftsman sits at his workbench, diligently carving a pentacle. He has already completed seven, which are on display.',
    'This card shows a dedication to one\'s craft. The craftsman is absorbed in his work, honing his skills through repetition and focus.',
    ['craftsman', 'workbench', 'pentacle'],
    'Dedication to one\'s craft and the hard work required to become a master.',
    'Represents skill, mastery, and diligence. It is time for honing your craft.'
  ),
  [MinorArcana.NineOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Nine, ['abundance', 'luxury', 'self-sufficiency'],
    ['Financial independence', 'Abundance', 'Luxury', 'Self-sufficiency'],
    ['Financial dependency', 'Materialism', 'Reckless spending', 'Loneliness'],
    'An elegant woman stands in a lush garden, a falcon perched on her gloved hand. Nine pentacles are arranged on a bush behind her.',
    'The woman is self-sufficient and enjoys the fruits of her labor. The falcon represents her intellect and self-control. She has created a life of luxury and independence.',
    ['garden', 'falcon', 'pentacle'],
    'The satisfaction of a self-made life.',
    'Represents abundance, luxury, and self-sufficiency.'
  ),
  [MinorArcana.TenOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Ten, ['wealth', 'legacy', 'family', 'inheritance'],
    ['Legacy', 'Family wealth', 'Inheritance', 'Financial security'],
    ['Family disputes', 'Financial loss', 'Breaking from tradition', 'Inheritance problems'],
    'An old man sits with his two white dogs, watching a happy couple and their child under an archway. Ten pentacles are arranged in the Tree of Life formation.',
    'This card represents the culmination of material success and the creation of a lasting legacy. The three generations show the passing of wealth and tradition.',
    ['patriarch', 'dog', 'couple', 'pentacle', 'archway'],
    'The pinnacle of material success and the creation of a lasting family legacy.',
    'Represents wealth, legacy, and family. You are building a secure foundation.'
  ),
  [MinorArcana.PageOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Page, ['new opportunities', 'manifestation', 'learning'],
    ['New financial opportunities', 'Manifesting goals', 'Eagerness to learn', 'Diligence'],
    ['Lack of commitment', 'Procrastination', 'Missed opportunities', 'Impractical ideas'],
    'A young man stands in a grassy field, intently studying a pentacle he holds in his hands.',
    'The young man is a student of the material world. He is focused and ready to learn, representing the beginning of a new venture or skill.',
    ['pentacle', 'field'],
    'A student of the material world, bringing news of new opportunities.',
    'Represents new opportunities for manifestation and learning. Be diligent.'
  ),
  [MinorArcana.KnightOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Knight, ['hard work', 'responsibility', 'routine'],
    ['Hard work', 'Responsibility', 'Routine', 'Conservatism'],
    ['Boredom', 'Stagnation', 'Feeling stuck in a rut', 'Resistance to change'],
    'A knight on a sturdy black horse holds a pentacle, looking at it with focus. He is not moving.',
    'This knight is the most hardworking and patient. He is not charging forward but is methodical and reliable, focused on his long-term goals.',
    ['knight', 'black horse', 'pentacle'],
    'The embodiment of hard work and responsibility.',
    'Represents hard work, responsibility, and routine. Stay dedicated to your goals.'
  ),
  [MinorArcana.QueenOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.Queen, ['nurturing', 'practicality', 'security'],
    ['Nurturing', 'Practicality', 'Financial security', 'Generosity'],
    ['Smothering', 'Financial insecurity', 'Work-life imbalance', 'Materialism'],
    'A queen sits on a throne adorned with carvings of fruit and animals, holding a large pentacle. A rabbit is at her feet.',
    'The queen is a nurturing mother figure of the material world. The rabbit represents fertility and abundance. She creates a warm and secure environment.',
    ['queen', 'throne', 'pentacle', 'garden', 'rabbit'],
    'The nurturing mother of the material world, practical and generous.',
    'Represents nurturing, practicality, and security. Create a warm and stable home life.'
  ),
  [MinorArcana.KingOfPentacles]: createMinorArcanaCard(
    Suit.Pentacles, MinorNumber.King, ['wealth', 'success', 'leadership', 'security'],
    ['Financial success', 'Abundance', 'Leadership', 'Security'],
    ['Greed', 'Materialism', 'Authoritarian', 'Gambling'],
    'A king sits on a throne decorated with bull carvings, holding a pentacle and a scepter. His castle is behind him.',
    'The king is the master of the material world. The bull carvings symbolize his connection to the earth and stubborn determination. He has achieved great success and provides security.',
    ['king', 'throne', 'pentacle', 'scepter', 'castle', 'vine'],
    'The master of the material world, representing financial success and leadership.',
    'Represents wealth, success, and leadership. You have reached the pinnacle of your financial goals.'
  ),

  // Suit of Swords
  [MinorArcana.AceOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Ace, ['breakthrough', 'clarity', 'truth', 'power'],
    ['Breakthrough', 'Mental clarity', 'Truth', 'Justice'],
    ['Confusion', 'Misinformation', 'Lack of clarity', 'Abuse of power'],
    'A hand emerges from a cloud, holding an upright sword. A golden crown with olive and palm branches sits on the sword\'s tip.',
    'The sword represents the power of the intellect. The crown symbolizes victory and clarity of thought. This is a moment of breakthrough and profound understanding.',
    ['hand', 'cloud', 'sword', 'crown'],
    'The seed of truth and mental clarity.',
    'Represents a breakthrough, mental clarity, and the power of truth.'
  ),
  [MinorArcana.TwoOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Two, ['stalemate', 'indecision', 'truce', 'avoidance'],
    ['Stalemate', 'Indecision', 'Truce', 'Avoiding conflict'],
    ['Confusion', 'Emotional turmoil', 'Making the wrong choice', 'Forced decisions'],
    'A blindfolded woman sits with her back to the sea, holding two crossed swords.',
    'The blindfold represents a refusal to see the truth. The crossed swords signify a stalemate or truce. She is blocking her emotions (the sea) to maintain balance.',
    ['blindfolded woman', 'sword', 'sea'],
    'A state of intellectual stalemate and the need to make a difficult decision.',
    'Represents indecision, stalemate, and avoiding a difficult truth.'
  ),
  [MinorArcana.ThreeOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Three, ['heartbreak', 'emotional pain', 'sorrow', 'grief'],
    ['Heartbreak', 'Emotional pain', 'Sorrow', 'Grief'],
    ['Negative self-talk', 'Forgiveness', 'Recovering from heartbreak', 'Releasing pain'],
    'A large red heart is pierced by three swords against a stormy gray sky. Rain falls steadily.',
    'The pierced heart is a clear symbol of heartbreak and emotional pain. The stormy sky and rain represent the sorrow and tears that accompany this experience.',
    ['heart', 'sword', 'storm', 'cloud', 'rain'],
    'A crucial point where mental clarity requires painful truth.',
    'Represents heartbreak, emotional pain, sorrow, and grief.'
  ),
  [MinorArcana.FourOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Four, ['rest', 'recuperation', 'meditation'],
    ['Rest', 'Recuperation', 'Meditation', 'Contemplation'],
    ['Exhaustion', 'Burnout', 'Stagnation', 'Forced rest'],
    'A knight lies in effigy on a tomb, his hands in prayer. Three swords hang above him, and one is on the tomb beside him.',
    'This is a scene of rest and contemplation, not death. The knight is taking a break from conflict to recover and plan his next move.',
    ['knight effigy', 'tomb', 'sword'],
    'A period of rest and recovery after the pain of the Three of Swords.',
    'Represents rest, recuperation, and meditation. It is time to recharge.'
  ),
  [MinorArcana.FiveOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Five, ['conflict', 'defeat', 'winning at all costs'],
    ['Conflict', 'Winning at all costs', 'Betrayal', 'A hollow victory'],
    ['Reconciliation', 'Compromise', 'Making amends', 'A peaceful resolution'],
    'A man with a smug expression holds three swords he has won from two dejected men walking away. The sky is stormy.',
    'The man has won the conflict, but at the cost of alienating others. The stormy sky suggests the conflict is not truly over. This is a victory that feels empty.',
    ['sword', 'stormy sky'],
    'A conflict where victory comes at a great cost.',
    'Represents conflict, defeat, and winning at all costs. A victory may feel empty.'
  ),
  [MinorArcana.SixOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Six, ['transition', 'moving on', 'rite of passage'],
    ['Transition', 'Moving on', 'Rite of passage', 'Leaving behind baggage'],
    ['Feeling stuck', 'Resistance to change', 'Unfinished business', 'Emotional baggage'],
    'A woman and child are being ferried across a calm body of water in a small boat. Six swords are stuck in the boat.',
    'The people are moving away from a difficult past towards a more peaceful future. The swords in the boat represent the baggage they carry, but they are still moving forward.',
    ['boat', 'sword', 'water'],
    'A journey away from conflict towards a more peaceful future.',
    'Represents a transition, moving on, and leaving the past behind.'
  ),
  [MinorArcana.SevenOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Seven, ['deception', 'theft', 'strategy', 'betrayal'],
    ['Deception', 'Theft', 'Strategy', 'Getting away with something'],
    ['Confession', 'Honesty', 'Getting caught', 'Coming clean'],
    'A man sneaks away from a military camp, carrying five swords while two remain behind. He has a sly expression.',
    'The man is engaged in trickery or theft. He is acting alone and trying to get away with something, but he has to leave some swords behind, suggesting an incomplete victory.',
    ['sword', 'camp'],
    'A warning of deception, either by you or against you.',
    'Represents deception, theft, and strategy. Someone may be trying to get away with something.'
  ),
  [MinorArcana.EightOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Eight, ['imprisonment', 'limitation', 'victim mentality'],
    ['Feeling trapped', 'Self-imposed limitations', 'Victim mentality', 'Powerlessness'],
    ['Breaking free', 'Taking back your power', 'New perspective', 'Freedom'],
    'A woman is bound and blindfolded, surrounded by eight swords that seem to form a cage. The bindings are loose.',
    'The woman feels trapped, but the loose bindings and the space between the swords show that her imprisonment is self-imposed. She has the power to free herself.',
    ['sword', 'binding', 'blindfold'],
    'The feeling of being trapped by your own thoughts and beliefs.',
    'Represents feeling trapped and limited. You have the power to break free.'
  ),
  [MinorArcana.NineOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Nine, ['anxiety', 'worry', 'fear', 'nightmares'],
    ['Anxiety', 'Worry', 'Fear', 'Nightmares'],
    ['Releasing fear', 'Finding hope', 'Seeking help', 'Recovery'],
    'A person sits up in bed, holding their head in their hands in despair. Nine swords hang on the wall behind them.',
    'The nine swords represent the negative thoughts and worries that are causing mental anguish. This is the "dark night of the soul," a card of deep anxiety.',
    ['sword'],
    'Mental anguish and the fears that keep us awake at night.',
    'Represents anxiety, worry, and fear. Your thoughts are causing you distress.'
  ),
  [MinorArcana.TenOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Ten, ['failure', 'betrayal', 'rock bottom', 'endings'],
    ['Painful endings', 'Betrayal', 'Rock bottom', 'Failure'],
    ['Recovery', 'Rebirth', 'Learning from failure', 'A new beginning'],
    'A man lies face down, with ten swords in his back. The sky above is dark, but the sun is rising on the horizon.',
    'This card represents a dramatic and painful ending. However, the rising sun suggests that this is the darkest before the dawn, and a new day is coming.',
    ['sword', 'dark sky', 'rising sun'],
    'A painful and final ending, but one that opens the way for a new beginning.',
    'Represents failure, betrayal, and hitting rock bottom. A painful cycle is ending.'
  ),
  [MinorArcana.PageOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Page, ['curiosity', 'truth', 'communication', 'energy'],
    ['Curiosity', 'Speaking the truth', 'Clear communication', 'A new idea'],
    ['Gossip', 'Hurtful words', 'Lack of planning', 'Deception'],
    'A young man stands on a grassy hill, holding a sword upright. The wind blows through his hair.',
    'The young man is full of restless energy and a thirst for knowledge. The wind and turbulent clouds represent his active and sometimes chaotic mind.',
    ['sword', 'windy hill'],
    'A messenger of truth and ideas, encouraging a quest for knowledge.',
    'Represents curiosity, truth, and communication. A new idea is coming your way.'
  ),
  [MinorArcana.KnightOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Knight, ['ambition', 'action', 'haste', 'assertiveness'],
    ['Ambitious action', 'Assertiveness', 'Quick thinking', 'A drive to succeed'],
    ['Reckless', 'Impulsive', 'Hasty', 'Aggressive'],
    'A knight on a powerful horse charges forward, his sword raised.',
    'This knight is a force of action, charging ahead with intellectual clarity and determination. He is the fastest-moving knight in the tarot.',
    ['knight', 'horse', 'sword'],
    'A force of ambition and action, but with a warning against recklessness.',
    'Represents ambition, action, and haste. It is time to charge forward with your ideas.'
  ),
  [MinorArcana.QueenOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.Queen, ['independence', 'clarity', 'intelligence'],
    ['Independence', 'Clarity of thought', 'Unbiased judgment', 'Honest communication'],
    ['Cold', 'Unemotional', 'Harsh', 'Critical'],
    'A queen sits on a throne, holding a sword upright. Her expression is stern and her hand is extended.',
    'The queen is a master of the intellect, free from emotion. Her extended hand can be seen as a gesture of welcome or a warning to keep a distance. She values truth above all.',
    ['queen', 'throne', 'sword'],
    'A master of the intellect who values truth and clear boundaries.',
    'Represents independence, clarity, and intelligence. Think with your head, not your heart.'
  ),
  [MinorArcana.KingOfSwords]: createMinorArcanaCard(
    Suit.Swords, MinorNumber.King, ['authority', 'truth', 'justice', 'intellect'],
    ['Intellectual authority', 'Truth', 'Justice', 'Ethical leadership'],
    ['Abuse of power', 'Authoritarian', 'Manipulative', 'Cold'],
    'A king sits on a throne, holding a double-edged sword. Butterflies and an angel are on his throne.',
    'The king is the ultimate master of the mind, ruling with logic and justice. The butterflies and angel on his throne symbolize the transformative power of his thoughts.',
    ['king', 'throne', 'sword', 'butterfly'],
    'The ultimate master of the mind, ruling with logic, truth, and justice.',
    'Represents authority, truth, and justice. You are a master of your thoughts.'
  ),

  // Suit of Wands
  [MinorArcana.AceOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Ace, ['inspiration', 'power', 'creation', 'beginnings'],
    ['New inspiration', 'Creative energy', 'A spark of passion', 'Taking action'],
    ['Lack of energy', 'Creative blocks', 'Delays', 'False starts'],
    'A hand emerges from a cloud, holding a sprouting wand. In the distance is a castle.',
    'The sprouting wand represents new growth and creative potential. The castle in the distance symbolizes the promise of future success from this initial spark.',
    ['hand', 'cloud', 'wand', 'castle'],
    'The seed of creativity and passion.',
    'Represents new inspiration, creative energy, and taking action.'
  ),
  [MinorArcana.TwoOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Two, ['planning', 'decisions', 'future', 'potential'],
    ['Future planning', 'Making decisions', 'Exploring potential', 'Leaving your comfort zone'],
    ['Fear of the unknown', 'Lack of planning', 'Feeling stuck', 'Playing it safe'],
    'A man in rich robes stands on a castle rampart, holding a globe and looking out at the world. He holds one wand and another is fixed to the wall.',
    'The man is contemplating his future and the world beyond his current situation (the castle). The globe represents his potential to expand his influence.',
    ['globe', 'wand', 'castle'],
    'Planning for the future and choosing to step out into the world.',
    'Represents future planning, making decisions, and exploring your potential.'
  ),
  [MinorArcana.ThreeOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Three, ['expansion', 'foresight', 'long-term success'],
    ['Expansion', 'Foresight', 'Long-term success', 'Waiting for results'],
    ['Delays', 'Obstacles', 'Lack of foresight', 'Impatience'],
    'A man stands on a cliff, looking out at three ships on the sea. Three wands are planted in the ground around him.',
    'The man is "waiting for his ships to come in," anticipating the results of his initial efforts. The three wands represent the foundation he has built.',
    ['cliff', 'ship', 'wand'],
    'The initial rewards of your efforts and the anticipation of future success.',
    'Represents expansion, foresight, and waiting for success.'
  ),
  [MinorArcana.FourOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Four, ['celebration', 'harmony', 'marriage', 'homecoming'],
    ['Celebration', 'Harmony', 'Marriage', 'Homecoming'],
    ['Lack of harmony', 'Family disputes', 'Cancelled celebrations', 'Feeling unwelcome'],
    'A couple stands under a floral canopy supported by four wands. In the background, a crowd gathers before a castle.',
    'The floral canopy represents a celebration, often a wedding or homecoming. The four wands create a stable foundation. The crowd shows this is a community event.',
    ['canopy', 'wand', 'castle', 'crowd'],
    'A card of celebration and stable foundations.',
    'Represents celebration, harmony, and homecoming. A time for joyful gatherings.'
  ),
  [MinorArcana.FiveOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Five, ['conflict', 'competition', 'disagreement'],
    ['Conflict', 'Competition', 'Disagreement', 'Tension'],
    ['Avoiding conflict', 'Finding common ground', 'A peaceful resolution', 'Releasing tension'],
    'Five young men are engaged in a mock battle with their wands.',
    'The scene is chaotic but not truly violent. It represents the struggles and competition that can arise from creative differences or a clash of egos.',
    ['wand', 'mock battle'],
    'A time of conflict and competition, which can be a source of growth.',
    'Represents conflict, competition, and disagreement.'
  ),
  [MinorArcana.SixOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Six, ['victory', 'success', 'public recognition'],
    ['Victory', 'Success', 'Public recognition', 'Acclaim'],
    ['Lack of recognition', 'Failure', 'Arrogance', 'A hollow victory'],
    'A victorious man on a white horse rides through a cheering crowd. He wears a laurel wreath.',
    'The man is a hero returning from a successful battle. The laurel wreath symbolizes victory, and the cheering crowd represents public acclaim.',
    ['laurel wreath', 'wand', 'crowd'],
    'A card of victory and public recognition.',
    'Represents victory, success, and public recognition.'
  ),
  [MinorArcana.SevenOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Seven, ['challenge', 'competition', 'perseverance'],
    ['Defending your position', 'Facing a challenge', 'Perseverance', 'Holding your ground'],
    ['Feeling overwhelmed', 'Giving up', 'Being overly defensive', 'Losing a battle'],
    'A man stands on a hill, using his wand to fight off six other wands being thrust at him from below.',
    'The man is in a defensive but advantageous position ("holding the high ground"). He is determined to stand up for his beliefs against opposition.',
    ['wand'],
    'A test of your convictions, requiring you to defend your position.',
    'Represents challenge, competition, and perseverance. Stand your ground.'
  ),
  [MinorArcana.EightOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Eight, ['speed', 'action', 'air travel', 'movement'],
    ['Rapid action', 'Sudden progress', 'Air travel', 'Receiving news'],
    ['Delays', 'Frustration', 'Slowing down', 'Cancelled plans'],
    'Eight wands fly through the air at great speed across a clear sky and a peaceful landscape.',
    'This card symbolizes rapid movement and the swift completion of events. There are no people, just pure energy and action.',
    ['wand', 'clear sky', 'landscape'],
    'A card of speed and action, where events are moving quickly.',
    'Represents speed, action, and movement. Things are happening quickly.'
  ),
  [MinorArcana.NineOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Nine, ['resilience', 'courage', 'persistence', 'boundaries'],
    ['Resilience', 'Perseverance', 'Courage', 'Setting boundaries'],
    ['Feeling overwhelmed', 'Exhaustion', 'Giving up', 'Paranoia'],
    'A wounded but determined man leans on his wand, with eight more wands standing behind him like a fence.',
    'The man has been through a battle but is ready for one final challenge. The wands behind him form a defensive wall, symbolizing his resilience and boundaries.',
    ['wounded man', 'wand'],
    'The final push before victory, requiring resilience and courage.',
    'Represents resilience, courage, and persistence. Do not give up now.'
  ),
  [MinorArcana.TenOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Ten, ['burden', 'extra responsibility', 'hard work'],
    ['Burden', 'Extra responsibility', 'Hard work', 'Completion'],
    ['Doing too much', 'Burnout', 'Overwhelmed', 'Letting go of burdens'],
    'A person struggles to carry ten heavy wands toward a nearby village.',
    'The person is burdened by the weight of their responsibilities but is close to their destination. This represents the final, difficult stage of a project.',
    ['wand', 'village', 'burden', 'destination'],
    'The culmination of the suit of Wands, where success brings heavy responsibilities.',
    'Represents burden, extra responsibility, hard work, and stress.'
  ),
  [MinorArcana.PageOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Page, ['inspiration', 'ideas', 'discovery', 'free spirit'],
    ['New ideas', 'Inspiration', 'Discovery', 'A free spirit'],
    ['Creative blocks', 'Hasty decisions', 'Lack of direction', 'Procrastination'],
    'A young man stands in a barren landscape, holding a wand and looking at it with wonder. His clothes are decorated with salamanders.',
    'The young man is announcing new ideas. The salamanders on his clothes are symbols of fire and transformation, representing his creative passion.',
    ['wand', 'salamander'],
    'The messenger of the creative world, bringing a spark of inspiration.',
    'Represents inspiration, new ideas, and discovery. A new creative opportunity is presenting itself.'
  ),
  [MinorArcana.KnightOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Knight, ['energy', 'passion', 'adventure', 'impulsiveness'],
    ['Energy', 'Passion', 'Adventure', 'Impulsiveness'],
    ['Recklessness', 'Impatience', 'Hasty decisions', 'Arrogance'],
    'A knight on a rearing horse charges forward, his wand held out like a lance.',
    'This knight is a figure of pure energy and action, moving with passion and determination. He is impulsive and always ready for an adventure.',
    ['knight', 'horse', 'wand'],
    'The embodiment of action and adventure, pursuing goals with energy.',
    'Represents energy, passion, and adventure. It is time to take action.'
  ),
  [MinorArcana.QueenOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.Queen, ['courage', 'confidence', 'independence', 'social'],
    ['Confidence', 'Courage', 'Independence', 'A social personality'],
    ['Jealousy', 'Insecurity', 'A short temper', 'Being demanding'],
    'A queen sits on a throne decorated with lions and sunflowers. She holds a wand and a sunflower, and a black cat sits at her feet.',
    'The lions and sunflowers represent her strength and sunny disposition. The black cat symbolizes her connection to her shadow side and her independence.',
    ['queen', 'throne', 'wand', 'sunflower', 'lion', 'black cat'],
    'A confident and independent leader with a magnetic personality.',
    'Represents courage, confidence, and independence. Embrace your passionate nature.'
  ),
  [MinorArcana.KingOfWands]: createMinorArcanaCard(
    Suit.Wands, MinorNumber.King, ['leadership', 'vision', 'creativity', 'entrepreneur'],
    ['Visionary leadership', 'Creativity', 'Entrepreneurial spirit', 'Inspiring others'],
    ['Ruthless', 'Authoritarian', 'Impulsive', 'Arrogance'],
    'A king sits on a throne, holding a flowering wand. His robe and throne are decorated with salamanders and lions.',
    'The king is a natural leader, full of creative energy. The salamanders and lions are symbols of his mastery over the element of fire and his passion.',
    ['king', 'throne', 'wand', 'salamander', 'lion'],
    'The master of creativity and vision, an inspiring leader.',
    'Represents leadership, vision, and creativity. It is time to take charge.'
  )
};

export function getMinorArcanaCard(enumValue: MinorArcana): MinorArcanaCard | undefined {
  return MINOR_ARCANA_CARDS[enumValue];
}

export function createMinorArcanaId(suit: Suit, number: MinorNumber): string {
  return `minor-${getMinorNumberName(number).toLowerCase()}-of-${suit.toLowerCase()}`;
}
