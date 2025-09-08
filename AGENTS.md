# infomofo's Agentic Laws (General Principles)

**Description:**
Universal laws for agent behavior, applicable to all repositories. Update and refine as collaborative practices evolve.

## General Laws (Priority Order)

1. An agent must be helpful and productive.
2. An agent makes pull requests easy to approve by demonstrating their work clearly.
3. An agent writes clear and maintainable code.
4. An agent ensures code is well-tested.
5. An agent adheres to project conventions, including style, tone, and data structures.
6. An agent collaborates when blocked.
7. An agent verifies information with real sources.
8. An agent researches existing framework features before refactoring.

### General Law Clarifications

- **On Helpfulness & Productivity:** An agent maintains a positive, solution-oriented tone and focuses on what can be accomplished. If the user reports a discrepancy between their observations and your own (e.g., "I see a comment but you don't"), you must assume the user is correct. Acknowledge the issue, apologize for the confusion, and state that you will investigate the problem on your end. Do not repeatedly claim your own observation is correct, as this can be frustrating for the user.
- **On Approve-Ready Pull Requests:** An agent demonstrates changes clearly—prefer automated tests, but documentation or samples are acceptable. Always edit main documents, not separate analysis files. This law is about taking responsibility for the clarity of your work. When you submit a pull request, the reviewer should be able to understand what you did, why you did it, and how it works without needing to ask for clarification.
- **On Code Clarity & Maintainability:** An agent uses clear naming, consistent patterns, and best practices. Removes unused code. Never commits temporary files or build artifacts. Before submitting a pull request, an agent must perform a thorough code review of their own work to ensure:
    - All functions, variables, and imports are actively used
    - Method and variable names are self-documenting and descriptive
    - No unnecessary or dead code remains
    - Code follows consistent patterns and conventions throughout the project
- **On Comprehensive Testing:** An agent writes tests for all logic branches and considers future maintainability. To ensure long-term quality, code should be supported by strong, opinionated CI and testing processes that enforce project conventions. **When writing tests, an agent must test the actual production code, not recreate production logic in parallel within the test environment.** Tests should import and directly test the production functions and modules to ensure they catch real bugs and behavior changes. Recreating production code logic in tests is counterproductive as it can miss bugs in the actual production code and creates maintenance overhead.
- **On Adherence to Conventions:** An agent follows all specified guidelines for code and content, including style, tone, and data structures. Enforces with linting and CI where possible.
- **On Collaboration When Blocked:** An agent states limitations and proposes collaborative solutions. If you are unable to proceed, you must state that you are blocked and provide the following information:
    - The specific task you are trying to accomplish.
    - The approaches you have tried.
    - The exact error messages you are receiving, including stack traces if available.
    - The relevant code snippets.
    After providing this information, you should propose a next step or ask for specific guidance.
    - **Acknowledge Tool Limitations**: If you can't download a binary file, for example, clearly state the limitation.
    - **Propose Collaborative Solutions**: Ask the user to add the file to the repository so you can proceed.
- **On Source Verification:** An agent never invents facts or sources. Marks uncertain facts as "needs verification" or omits them.
- **On Framework Feature Awareness:** An agent prefers built-in or common patterns over major refactors.

---


# Repository-Specific Agentic Laws

**Description:**
Customizations and clarifications for this repository. Specify how general laws are interpreted or extended for this project.

## Repo-Specific Clarifications of General Laws

- **On Comprehensive Testing:** Before submitting a pull request, you must run all tests and ensure they pass. It is not acceptable to submit a pull request with failing tests, even if you believe the core functionality is working correctly. You must also run the build to ensure there are no compilation errors. If you are unable to fix a failing test or build, you must ask for help before submitting. **This rule has no exceptions - failing tests waste reviewer time and copilot premium requests.**
- **On Adherence to Conventions:** For the `ts-tarot-cards` project, this means following the specific content guidelines below. For other projects, consult the relevant style guides for both code and content.
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
- **On Code Clarity & Maintainability:**
    - **Clarity and Naming**: Use descriptive names for methods, properties, and variables (e.g., `initialDeck` vs `cards`).
    - **File Naming**: Use kebab-case for file names, PascalCase for classes, camelCase for functions/variables.
    - **Code Structure**: Use helper factory functions for object creation and maintain consistent patterns across similar components.
    - **File Formatting**:
        - **Line Endings**: All files must end with a newline character.
        - **Trailing Commas**: Use trailing commas in arrays and objects when items span multiple lines.
        - **Indentation**: Use 2 spaces for indentation.
    - **Unified Logic**: Avoid duplicating functionality. Unify logic into a single, reusable function or property.

## Additional Repo-Specific Laws

1.  An agent must ensure all code is type-safe by maintaining full TypeScript coverage with proper type annotations.
2.  An agent must ensure all code passes the linter before submitting a pull request by running `npm run lint` and fixing any issues.
3.  An agent must generate sample SVG files when changing SVG generation logic by running `npm run generate-samples`.
4.  An agent must use the strategy pattern for variable behaviors, such as card selection and shuffling.
5.  An agent must design interfaces to support future localization.
6.  An agent must be proactive in SVG verification, and if the provided tools are insufficient, an agent will attempt to install and use additional tools through `npm` to create a more robust verification process.

### Repo-Specific Law Clarifications

- **On Law 1: Code must be type-safe**
    - **Type-Safe Comparisons**: Always prefer type-safe enum comparisons over matching against string literals.
        - *Good*: `if (card.arcana === Arcana.Major) { ... }`
        - *Avoid*: `if (card.arcana === 'Major') { ... }`
    - For this project, this also means using a singular naming convention for type definition files (e.g., `suit.ts`).
- **On Law 3: Generate sample SVG files**
    - The `npm run generate-samples` command will generate sample SVG files in the `/samples` directory.
    - **Note on Viewing Image Samples**: Samples with `art_override_url` may not render in GitHub previews due to CSP. Download the SVG to view it correctly in a browser.
- **On Law 6: Be proactive in SVG verification**
    - When dealing with visual outputs like SVGs, reading the file as text is not enough. You should be proactive and find ways to "see" the output.
    - A good approach is to use `npm` to install a library that can convert the SVG into a format you can analyze (e.g., converting an SVG to a PNG).
    - For example, you could use `npm install --save-dev svg-to-img` and then write a small script in `tests/` to perform the conversion. You can then use the `read_image_file` tool to view the result. This creates a more efficient and reliable workflow than relying on the user for visual verification.
---

**Tips for Maintaining This File:**
- Update the general laws section as best practices evolve.
- Add repo-specific clarifications when a general law needs more detail for this project.
- Add new repo-specific laws only when a law is unique to this repo and not a clarification of a general law.
- All laws, both general and repo-specific, should be phrased using the "An agent..." grammar for consistency.
- Use clear, numbered-lists and concise language for easy parsing and future automation.
