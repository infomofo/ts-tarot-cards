# Agent Guidelines for TypeScript Tarot Cards Library

This document provides comprehensive guidelines for AI agents working on this TypeScript tarot cards library, covering both code generation standards and content tone guidelines.

## Code Generation Standards

### File Formatting
- **Line Endings**: All files must end with a newline character to avoid the red mark in diffs
- **Trailing Commas**: Use trailing commas in arrays and objects when items span multiple lines
- **Indentation**: Use 2 spaces for indentation consistently
- **Type Safety**: Maintain full TypeScript coverage with proper type annotations

### Code Structure
- **Enum Usage**: Prefer enum values over string literals for consistency and type safety
- **Factory Functions**: Use helper factory functions for object creation to ensure consistency
- **Auto-Generation**: Prefer auto-generated values (IDs, numeric values) over manual specification to reduce errors
- **Consistent Patterns**: Maintain identical patterns across similar components (e.g., major/minor arcana)

### Naming Conventions
- **Methods**: Use descriptive method names that clearly indicate their purpose
- **Properties**: Use clear, unambiguous property names (e.g., `positionSignificance` vs `meaning`)
- **Variables**: Use clear, self-documenting names that eliminate ambiguity (e.g., `initialDeck` vs `cards`, `currentDeck` vs `shuffled`)
- **Files**: Use kebab-case for file names, PascalCase for classes, camelCase for functions/variables
- **Type Files**: Use singular naming convention for type definition files (e.g., `suit.ts` not `suits.ts`)

### Architecture Principles
- **Localization Ready**: Design interfaces to support future internationalization
- **Strategy Pattern**: Use strategy patterns for variable behaviors (e.g., card selection)
- **Type Safety**: Leverage TypeScript's type system to prevent runtime errors
- **Single Responsibility**: Each class/function should have one clear purpose
- **Unified Logic**: Avoid duplicating functionality in multiple places. Unify logic into a single, reusable function or property.
- **Clean Code**: Remove any unused or "crufted" code to keep the codebase clean and maintainable.
- **Comprehensive Testing**: Ensure all logic branches and options are covered by tests to prevent regressions.
- **Sample Generation**: When adding or updating visual features like SVG generation, ensure that sample files are generated to cover all permutations of the feature's options. This includes creating samples for different card types (Major Arcana, Minor Arcana number, Minor Arcana face card) and for different option combinations (e.g., hiding elements, using background images).

### SVG Sample Generation

To maintain a consistent set of sample SVGs for review, a temporary script `src/generate-samples.ts` should be used. When the SVG generation logic is changed, this script should be run to regenerate the samples.

**Specific Samples to Maintain:**
- **The Magician with Background Image**:
  - `art_override_url`: `https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA0L3drOTE5ODI2NTktaW1hZ2UuanBn.jpg`
  - `hide_number`: `true`
  - `hide_emoji`: `true`
  - `hide_title`: `true`
- **Numbered Card with Background Image**:
  - `art_override_url`: `https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA4L2xyL21pYTgzODI0LWltYWdlLmpwZw.jpg`
  - `hide_number`: `false`
  - `hide_emoji`: `false`
  - `hide_title`: `false`

## Content Tone Guidelines

### Card Descriptions and Meanings

#### Tone and Style
- **Personal and Direct**: Use a personal, accessible tone that speaks directly to the reader
- **Terse and Focused**: Keep descriptions concise while maintaining essential information
- **Avoid Repetition**: Don't unnecessarily repeat card names when context is clear
- **Educational**: Include journey context that helps users understand card relationships

#### Language Preferences
- **Nouns over Verbs**: Prefer noun phrases over gerunds for meanings
  - Good: "New beginnings", "Blind faith"
  - Avoid: "Beginning anew", "Having faith"
- **Active Voice**: Use active voice when possible
- **Present Tense**: Describe card meanings in present tense
- **Authentic Language**: Avoid language that feels overly formal or "AI-generated." For example, do not use em-dashes (—); rephrase sentences to avoid them. The tone should be natural and direct.
- **Strong, Descriptive Language**: Use clear, specific, and descriptive language. Avoid vague terms like "figure" or "creature" when a more specific term like "woman," "man," "child," or "winged lion" can be used. Use gender-identifying language early in descriptions unless the gender is ambiguous or irrelevant.

#### Content Structure
- **Visual Description**: A purely objective description of the Pamela Colman Smith artwork. This should describe only what is visually present on the card, without any interpretation, historical context, or naming of figures (e.g., use "a nude male and female figure" instead of "Adam and Eve").
- **Visual Description Analysis**: An expanded commentary on the significance of the visual design. This is where interpretations, mythological references (e.g., "The figures are commonly interpreted as Adam and Eve"), and deeper meanings should be placed.
- **Symbol Tagging**: To create a useful, cross-card lexicon, symbols should be tagged consistently.
  - **Use Singular Nouns**: Tags should be singular (e.g., "cup," not "cups"; "pillar," not "pillars").
  - **Avoid Numbers**: Do not include numbers in tags unless the number itself is visually distinct and significant (e.g., avoid "two cups" as a tag on the Two of Cups). The goal is to tag common symbols, not describe the card's name.
  - **Avoid Broad Tags**: Do not use overly broad or generic tags that are not useful for linking cards, such as "man", "woman", "person", or "child".
- **Significance**: Explain the card's place in the spiritual/elemental journey.
- **Meanings Arrays**: Use structured arrays instead of comma-separated strings.

#### Content Clarity
- **Define Esoteric Terms**: Any specialized or historical terms (e.g., "Boaz," "Jachin," "lemniscate") must be briefly defined in the `visualDescriptionAnalysis`.
- **Clarify Acronyms**: Acronyms or non-English words (e.g., "TORA") should be explained and properly cased (e.g., "Tora").

#### Examples of Preferred Style

**Good Visual Description:**
```
"A woman sits between two pillars, one black and one white. She wears a crown, holds a scroll, and has a crescent moon at her feet."
```

**Good Visual Description Analysis:**
```
"The pillars, Boaz (black) and Jachin (white), represent duality and the entrance to a sacred temple. The scroll, marked 'Tora' (a version of 'Torah'), contains hidden wisdom. The woman is often identified as the High Priestess, a guardian of the subconscious."
```

### Reading Interpretations
- **Contextual**: Relate interpretations to the user's question or situation
- **Balanced**: Acknowledge both positive and challenging aspects
- **Practical**: Provide actionable insights when appropriate
- **Respectful**: Maintain respect for tarot traditions while being accessible

### Disclaimers
- **Author's Interpretations**: Acknowledge that some interpretations reflect the author's understanding
- **Educational Purpose**: Emphasize the educational and reflective nature of tarot
- **Not Prediction**: Clarify that tarot is for insight and reflection, not literal prediction

## Implementation Notes
- These guidelines should be applied consistently across all card descriptions
- When updating existing content, prioritize clarity and consistency over preserving exact wording
- Always maintain the educational value and spiritual context of tarot while keeping content accessible
