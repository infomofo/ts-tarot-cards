# CLIO - The Command Line Interface Oracle

Welcome to CLIO, a mystical and playful tarot card reader for your command line.

## Installation

CLIO is included in the `ts-tarot-cards` package. To install, run:

```bash
npm install ts-tarot-cards
```

## Running CLIO

To start the CLIO interface, run the following command from the root of the project:

```bash
npm run clio
```

## Features

CLIO offers a simple, text-based interface with a touch of 80s computer terminal flair.

### Main Menu

When you start CLIO, you will be greeted by the main menu, where you can choose to:

*   **Learn about the tarot cards:** Get detailed information about any of the 78 cards in the Rider-Waite-Smith deck.
*   **Get a sample tarot reading:** Choose from a variety of spreads and get a personalized reading from CLIO.
*   **Exit:** Return to the mundane world.

### LLM-Powered Interpretations

CLIO can provide deep, mystical, and fun interpretations of your tarot readings using the power of a Large Language Model (LLM).

To enable this feature, you will need an API key from an OpenAI-compatible provider. Set the `OPENAI_API_KEY` environment variable to your API key.

If the `OPENAI_API_KEY` is not set, CLIO will still provide a reading, but without the LLM-powered interpretation.

You can customize the persona and instructions for the LLM by editing the `clio-llm-config.md` file in the root of the project.

## Disclaimer

This tool is for entertainment purposes only. Tarot readings should not be used to make important life decisions.
