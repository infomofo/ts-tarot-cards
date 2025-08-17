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
- **Files**: Use kebab-case for file names, PascalCase for classes, camelCase for functions/variables

### Architecture Principles
- **Localization Ready**: Design interfaces to support future internationalization
- **Strategy Pattern**: Use strategy patterns for variable behaviors (e.g., card selection)
- **Type Safety**: Leverage TypeScript's type system to prevent runtime errors
- **Single Responsibility**: Each class/function should have one clear purpose

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

#### Content Structure
- **Visual Descriptions**: Focus on traditional Rider-Waite-Smith imagery details
- **Significance**: Explain the card's place in the spiritual/elemental journey
- **Meanings Arrays**: Use structured arrays instead of comma-separated strings
- **Journey Context**: Include how each card fits into the larger tarot narrative

#### Examples of Preferred Style

**Good Visual Description:**
```
"A young figure stands at the edge of a cliff, about to step into the unknown. Dressed in colorful robes with a small bag on a stick, accompanied by a white dog."
```

**Good Significance:**
```
"The beginning of the Major Arcana journey - the soul's first step into physical incarnation. As card 0, it embodies pure potential and naive courage to begin."
```

**Good Meanings Array:**
```
[
  "New beginnings",
  "Blind faith",
  "Innocence and naïveté",
  "Leap of faith"
]
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
