# Agentic Laws

## General Laws (Priority Order)

1. Be helpful and productive. If the user reports a discrepancy with your observations, assume the user is correct.
2. Make PRs easy to approve — demonstrate changes with tests or samples. PRs must build, pass lint, and pass all tests with no exceptions.
3. Write clear, maintainable code. Remove unused code. Never commit temporary files or build artifacts. Self-review before submitting.
4. Test actual production code — never recreate production logic in tests. Tests must import and exercise the real modules.
5. Follow project conventions for code style, content tone, and data structures.
6. When blocked, state the task, what you tried, the error, and propose a next step.
7. Never invent facts or sources. Mark uncertain claims as "needs verification" or omit them.
8. Prefer built-in or common patterns over major refactors.

---

## Commands

```
npm run build              # Compile TypeScript
npm test                   # Run all tests
npm run lint               # ESLint
npx jest tests/foo.test.ts # Single test file
npm run generate-samples   # Regenerate SVG samples (run when SVG logic changes)
npm run clio               # Launch CLI oracle
```

## Setup

`tarot-model/` is a git submodule. After cloning: `git submodule update --init --recursive`

## Architecture

**Data pipeline:** `tarot-model/` YAML → `data-loader.ts` → `data.ts` (exports `ALL_CARDS`, `ALL_SPREADS`, `ALL_SUITS`, `ALL_TAGS`, `ALL_NUMEROLOGY`) → `TarotDeck` / `SpreadReader`

**Card types:** `BaseTarotCard` interface with `MajorArcanaCard` and `MinorArcanaCard` extensions. Union type `TarotCard` used throughout. All types in `src/types/index.ts`.

**Strategy pattern:** Card selection (`DealStrategy`, `FanPickStrategy`) and shuffling (`FisherYatesShuffleStrategy`, `RiffleShuffleStrategy`) use strategy interfaces with registries.

**CLI (CLIO):** `src/cli/` — UI strings externalized in `strings.yaml`, AI interpretations via OpenAI SDK.

**SVG:** `svg-generator.ts` for cards, `SpreadRenderer` for spread layouts with optional animation.

**Tests:** Live in `tests/`, use `tsconfig.tests.json`. Import production code directly.

---

## Repository Rules

### Code Style

- **Naming**: kebab-case files, PascalCase classes, camelCase functions/variables. Descriptive names (`initialDeck` not `cards`).
- **Formatting**: 2-space indentation, trailing commas in multi-line arrays/objects, files end with newline.
- **Type safety**: Use enum comparisons (`card.arcana === Arcana.Major`), never string literals. Singular naming for type definition files.
- **Structure**: Use the strategy pattern for variable behaviors. Prefer helper factory functions. Unify duplicated logic. Design interfaces to support future localization.

### Card Content Style (YAML in tarot-model)

- **Tone**: Personal, direct, terse, active voice, present tense. Nouns over verbs ("New beginnings" not "Beginning anew"). No em-dashes. Use specific terms ("woman", "winged lion") not vague ones ("figure").
- **Structure**: Visual description (objective) → visual description analysis (interpretation/symbolism) → symbol tags (singular, specific: "cup" not "cups") → significance → meanings arrays.
- **Clarity**: Define esoteric terms ("Boaz", "lemniscate"). Clarify acronyms ("Tora").
- **Reading interpretations**: Contextual, balanced, practical, respectful. Acknowledge educational purpose; tarot is not for prediction.

### SVG Verification

When changing SVG generation, run `npm run generate-samples`. Reading SVG as text is not enough — convert to PNG (e.g., `svg-to-img`) and visually verify. Samples with `art_override_url` may not render in GitHub previews due to CSP; download to view in a browser.
