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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "77d389babdc38599087af70a035f9aa6ed2f94e9f18328e5e8451fbaa64e7dbc"
contentMode: "local-full"
zh: ""
---

## How to Use Our Prompts

Integrating these prompts into your workflow is simple. Copy the entire markdown prompt for your chosen language and provide it as context to your AI assistant.

1. For **Chat Interfaces (Claude, ChatGPT, etc.)**: Paste the prompt at the beginning of your conversation before asking the AI to write code.
2. For **Cursor IDE**: Add the prompt to your project's `Rules` to enforce the guidelines across all AI interactions.
3. For **GitHub Copilot**: Save the prompt to a file (e.g. `coingecko_rules.md`) and reference it in your chat with `@workspace #coingecko_rules.md`.
4. For **Claude Code**: Include the prompt in your CLAUDE.md file.

  typescript
  // src/api/client.ts
  import Coingecko from '@coingecko/coingecko-typescript';

// Initialize a single, reusable client. This should be imported and used application-wide.
  export const client = new Coingecko(\{
    proAPIKey: process.env.COINGECKO_PRO_API_KEY,
    environment: 'pro',
    maxRetries: 3, // Rely on the SDK's built-in retry mechanism.
  \});

// src/main.ts
  import \{ client \} from './api/client';
  import Coingecko from '@coingecko/coingecko-typescript'; // Import the namespace for types

async function getBitcoinPrice(): Promise&lt;number | null> \{
    try \{
      const params: Coingecko.Simple.PriceGetParams = \{
        ids: 'bitcoin',
        vs_currencies: 'usd',
      \};
      const priceData = await client.simple.price.get(params);
      return priceData.bitcoin.usd;
    \} catch (err) \{
      if (err instanceof Coingecko.RateLimitError) \{
        console.error('Rate limit exceeded. Please try again later.');
      \} else if (err instanceof Coingecko.APIError) \{
        console.error(
          `An API error occurred: ${err.name} (Status: ${err.status\})`
        );
      \} else \{
        console.error('An unexpected error occurred:', err);
      \}
      return null;
    \}
  \}

async function main() \{
    const price = await getBitcoinPrice();
    if (price !== null) \{
      console.log(`The current price of Bitcoin is: $${price}`);
    }
  }

main();
  typescript
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
    console.log(`An error occurred: ${e\}`); // Too broad. Use `instanceof` checks.
  \}
  `

* **GitHub**: [github.com/coingecko/coingecko-typescript](https://github.com/coingecko/coingecko-typescript)
* **npm**: [npmjs.com/package/@coingecko/coingecko-typescript](https://www.npmjs.com/package/@coingecko/coingecko-typescript)

Notice something off or missing? Let us know by opening an [Issue here](https://github.com/coingecko/coingecko-typescript/issues).

Have feedback, a cool idea, or need help? Reach out to `soonaik@coingecko[dot]com`

**Examples:**

Example 1 (typescript):
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

Example 2 (typescript):
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
