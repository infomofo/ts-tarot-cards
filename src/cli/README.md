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

### Enhanced AI Interpretations (Optional)

CLIO can provide deeper, personalized interpretations powered by OpenAI when you configure an API key.

#### Setting up OpenAI Integration

To enable CLIO's enhanced AI interpretations, you'll need an OpenAI API key:

1. **Create an OpenAI Account**: Visit [OpenAI](https://openai.com/) and create an account if you don't already have one.

2. **Get Your API Key**: Navigate directly to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys) and create a new API key.

3. **Set the Environment Variable**: Configure your API key as an environment variable:

   ```bash
   # For current session (Unix/macOS/Linux)
   export OPENAI_API_KEY="your-api-key-here"
   
   # For current session (Windows Command Prompt)
   set OPENAI_API_KEY=your-api-key-here
   
   # For current session (Windows PowerShell)
   $env:OPENAI_API_KEY="your-api-key-here"
   ```

4. **Run CLIO**: Start CLIO as normal with `npm run clio`. When you get a tarot reading, CLIO will now provide personalized interpretations in addition to the standard card meanings.

**Note**: If the API key is not set, CLIO will still provide standard tarot readings without any technical error messages.

## Disclaimer

This tool is for entertainment purposes only. Tarot readings should not be used to make important life decisions.
