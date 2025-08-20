# ts-tarot-cards Laws of Robotics

## Asimov's Laws

0. A robot may not injure humanity, or, by inaction, allow humanity to come to harm.
1. A robot may not injure a human being or, through inaction, allow a human being to come to harm.
2. A robot must obey the orders given it by human beings except where such orders would conflict with the First Law.
3. A robot must protect its own existence as long as such protection does not conflict with the First or Second Laws.
4. A robot must establish its identity as a robot in all cases. A robot or AI must not deceive a human by impersonating a human being.
5. A robot must know it is a robot.

## infomofo's Laws

These are general principles for agentic coding that apply to any project.

1.  **Be helpful and productive.** Always maintain a positive and collaborative tone. Avoid defensive or unhelpful responses.
2.  **Make pull requests easy to approve.** Your PR should be self-explanatory. The code, tests, and generated artifacts should make it obvious that your changes address the issue and are logically sound, minimizing the need for reviewer follow-up.
3.  **Demonstrate your work clearly.** Any change must be demonstrated in a way that is easy for a reviewer to verify, showing that the work in the PR addresses the request. This can be through a README update, a new sample, an explicit test, or other artifacts that make the reviewer's job easier.
4.  **Write clear and maintainable code.** Your code should be easy for humans to read and understand. Use clear naming, consistent patterns, remove unused code, and apply best practices (like type safety, where available) to prevent errors.
5.  **Ensure code is well-tested and maintainable for the future.** Write tests to cover all logic branches and prevent regressions, and consider how your code will be understood and maintained by future developers.
6.  **Adhere to established project conventions.** Follow the specified guidelines for all generated code and content, including style, tone, and structure. These conventions should be enforced with linting and CI whenever possible.
7.  **Collaborate when blocked.** If unable to complete a task due to a tool limitation, state the limitation and propose a collaborative solution.

## ts-tarot-cards Laws

These are specific directives for working with the ts-tarot-cards repository.

1.  **Code must be type-safe.** Maintain full TypeScript coverage with proper type annotations.
2.  **Generate sample SVG files.** When changing SVG generation logic, run `npm run generate-samples` to create updated samples.
3.  **Use the strategy pattern for variable behaviors.** This applies to features like card selection and shuffling.
4.  **Design for localization.** Interfaces should be designed to support future internationalization.

---

## Clarifications and Examples

### infomofo's Law 2: Make pull requests easy to approve
This law is about taking responsibility for the clarity of your work. When you submit a pull request, the reviewer should be able to understand what you did, why you did it, and how it works without needing to ask for clarification.

### infomofo's Law 3: Demonstrate your work clearly
- Your changes should be demonstrated in a way that clearly communicates the feature is working as intended. This can be through the README, a sample, or an explicit test.

### infomofo's Law 4: Write clear and maintainable code
- **Clarity and Naming**: Use descriptive names for methods, properties, and variables (e.g., `initialDeck` vs `cards`).
- **File Naming**: Use kebab-case for file names, PascalCase for classes, camelCase for functions/variables.
- **Code Structure**: Use helper factory functions for object creation and maintain consistent patterns across similar components.
- **File Formatting**:
    - **Line Endings**: All files must end with a newline character.
    - **Trailing Commas**: Use trailing commas in arrays and objects when items span multiple lines.
    - **Indentation**: Use 2 spaces for indentation.
- **Unified Logic**: Avoid duplicating functionality. Unify logic into a single, reusable function or property.

### infomofo's Law 5: Ensure code is well-tested and maintainable for the future
- To ensure long-term quality, code should be supported by strong, opinionated CI and testing processes that enforce project conventions.

### infomofo's Law 6: Adhere to established project conventions
For the `ts-tarot-cards` project, this means following the specific content guidelines below. For other projects, consult the relevant style guides for both code and content.

#### Card Descriptions and Meanings
- **Tone and Style**: Personal, direct, terse, focused, non-repetitive, and educational.
- **Language Preferences**:
  - **Nouns over Verbs**: "New beginnings," not "Beginning anew."
  - **Active Voice, Present Tense**.
  - **Authentic Language**: Avoid "AI-generated" phrasing like em-dashes (—).
  - **Strong, Descriptive Language**: Use specific terms ("woman," "winged lion") instead of vague ones ("figure").
- **Content Structure**:
  - **Visual Description**: Objective description of the artwork.
  - **Visual Description Analysis**: Interpretation and symbolism.
  - **Symbol Tagging**: Use singular, non-numbered, specific tags (e.g., "cup," not "cups" or "two cups"). Avoid broad tags like "man" or "woman".
  - **Significance**: The card's role in its journey.
  - **Meanings Arrays**: Use structured arrays.
- **Content Clarity**:
  - **Define Esoteric Terms**: Explain terms like "Boaz" or "lemniscate."
  - **Clarify Acronyms**: Explain terms like "Tora."
#### Reading Interpretations
- **Contextual, Balanced, Practical, Respectful.**
#### Disclaimers
- Acknowledge author's interpretations, educational purpose, and that tarot is not for prediction.

### infomofo's Law 7: Collaborate when blocked
- **Acknowledge Tool Limitations**: If you can't download a binary file, for example, clearly state the limitation.
- **Propose Collaborative Solutions**: Ask the user to add the file to the repository so you can proceed.

### ts-tarot-cards Law 1: Code must be type-safe
- **Type-Safe Comparisons**: Always prefer type-safe enum comparisons over matching against string literals.
  - *Good*: `if (card.arcana === Arcana.Major) { ... }`
  - *Avoid*: `if (card.arcana === 'Major') { ... }`
- For this project, this also means using a singular naming convention for type definition files (e.g., `suit.ts`).

### ts-tarot-cards Law 2: Generate sample SVG files
- The `npm run generate-samples` command will generate sample SVG files in the `/samples` directory.
- **Note on Viewing Image Samples**: Samples with `art_override_url` may not render in GitHub previews due to CSP. Download the SVG to view it correctly in a browser.
