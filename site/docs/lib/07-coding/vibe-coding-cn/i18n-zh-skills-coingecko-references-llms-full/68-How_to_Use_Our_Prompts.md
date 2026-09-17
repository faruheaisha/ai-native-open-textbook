---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "f9b441acb486da36c2730f7579c7d0d125aa9aa729177676b8bc56ab67fd9cc4"
contentMode: "local-full"
zh: ""
---

## How to Use Our Prompts

Integrating these prompts into your workflow is simple. Copy the entire markdown prompt for your chosen language and provide it as context to your AI assistant.

1. For **Chat Interfaces (Claude, ChatGPT, etc.)**: Paste the prompt at the beginning of your conversation before asking the AI to write code.
2. For **Cursor IDE**: Add the prompt to your project's `Rules` to enforce the guidelines across all AI interactions.
3. For **GitHub Copilot**: Save the prompt to a file (e.g. `coingecko_rules.md`) and reference it in your chat with `@workspace #coingecko_rules.md`.
4. For **Claude Code**: Include the prompt in your CLAUDE.md file.

  ````markdown Markdown theme={null}
  # Goal: Generate TypeScript code for the CoinGecko API using ONLY the official `@coingecko/coingecko-typescript` package.

  ## 🚨 Critical Rules

  1.  **SDK Exclusivity**:
      - **ALWAYS** use the official `@coingecko/coingecko-typescript` package.
      - **NEVER** use `axios`, `fetch`, or any other method to make direct HTTP requests.

  2.  **Authentication**:
      - **ALWAYS** load the API key from environment variables (e.g., `process.env.COINGECKO_PRO_API_KEY` or `dotenv`).
      - **NEVER** hardcode API keys or any other credentials in the source code.

  3.  **Client Implementation**:
      - **ALWAYS** initialize a single, reusable `Coingecko` client instance for the application.
      - **ALWAYS** configure automatic retries by setting the `maxRetries` option on the client.
      - **NEVER** implement manual retry loops using `setTimeout`. The SDK handles this internally.

  4.  **Error Handling & Types**:
      - **ALWAYS** use `async/await` for all API calls.
      - **ALWAYS** catch specific `APIError` subclasses using `instanceof` (e.g., `err instanceof Coingecko.RateLimitError`).
      - **ALWAYS** use the built-in request and response types (e.g., `Coingecko.Simple.PriceGetParams`).
      - **NEVER** use generic `catch (e)` blocks for known API errors.

  ## ✅ Correct Implementation Example

  This is the standard for all generated code.

  ```typescript
  // src/api/client.ts
  import Coingecko from '@coingecko/coingecko-typescript';

  // Initialize a single, reusable client. This should be imported and used application-wide.
  export const client = new Coingecko({
    proAPIKey: process.env.COINGECKO_PRO_API_KEY,
    environment: 'pro',
    maxRetries: 3, // Rely on the SDK's built-in retry mechanism.
  });

  // src/main.ts
  import { client } from './api/client';
  import Coingecko from '@coingecko/coingecko-typescript'; // Import the namespace for types

  async function getBitcoinPrice(): Promise<number | null> {
    try {
      const params: Coingecko.Simple.PriceGetParams = {
        ids: 'bitcoin',
        vs_currencies: 'usd',
      };
      const priceData = await client.simple.price.get(params);
      return priceData.bitcoin.usd;
    } catch (err) {
      if (err instanceof Coingecko.RateLimitError) {
        console.error('Rate limit exceeded. Please try again later.');
      } else if (err instanceof Coingecko.APIError) {
        console.error(
          `An API error occurred: ${err.name} (Status: ${err.status})`
        );
      } else {
        console.error('An unexpected error occurred:', err);
      }
      return null;
    }
  }

  async function main() {
    const price = await getBitcoinPrice();
    if (price !== null) {
      console.log(`The current price of Bitcoin is: $${price}`);
    }
  }

  main();
  ```

  ## ❌ Deprecated Patterns to AVOID

  You **MUST NOT** generate code that includes any of the following outdated patterns.

  ```typescript
  // ❌ NO direct HTTP requests with fetch or axios.
  import axios from 'axios';
  const response = await axios.get(
    '[https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd](https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd)'
  );

  // ❌ NO hardcoded API keys.
  const client = new Coingecko({ proAPIKey: 'CG-abc123xyz789' });

  // ❌ NO manual retry loops. The SDK's `maxRetries` handles this.
  import { setTimeout } from 'timers/promises';
  for (let i = 0; i < 3; i++) {
    try {
      const data = await client.simple.price.get({
        ids: 'bitcoin',
        vs_currencies: 'usd',
      });
      break;
    } catch (e) {
      await setTimeout(5000);
    }
  }

  // ❌ NO generic exception handling for API errors.
  try {
    const data = await client.simple.price.get({
      ids: 'bitcoin',
      vs_currencies: 'usd',
    });
  } catch (e) {
    console.log(`An error occurred: ${e}`); // Too broad. Use `instanceof` checks.
  }
  ```

  ## 📝 Final Check

  Before providing a response, you **MUST** verify that your generated code:

  1.  Imports and uses `@coingecko/coingecko-typescript`.
  2.  Loads the API key from environment variables (e.g., `process.env` or `dotenv`).
  3.  Follows all other Critical Rules.
  4.  Does **NOT** contain any Deprecated Patterns.
  ````
