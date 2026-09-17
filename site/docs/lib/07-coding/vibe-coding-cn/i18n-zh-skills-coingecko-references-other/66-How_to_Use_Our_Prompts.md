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
pageSha256: "9830923bec39ce0b95697c2429ebb1c10d6fe95898caed5ec7953593ce5d9c8d"
contentMode: "local-full"
zh: ""
---

## How to Use Our Prompts

Integrating these prompts into your workflow is simple. Copy the entire markdown prompt for your chosen language and provide it as context to your AI assistant.

1. For **Chat Interfaces (Claude, ChatGPT, etc.)**: Paste the prompt at the beginning of your conversation before asking the AI to write code.
2. For **Cursor IDE**: Add the prompt to your project's `Rules` to enforce the guidelines across all AI interactions.
3. For **GitHub Copilot**: Save the prompt to a file (e.g. `coingecko_rules.md`) and reference it in your chat with `@workspace #coingecko_rules.md`.

Select the prompt that matches your project's tech stack.

* 🐍 **[Python](https://docs.coingecko.com/docs/python-ai-prompts)**: A complete guide for implementing the CoinGecko API using our official [coingecko-sdk](https://pypi.org/project/coingecko-sdk/).
* 🟦 **[TypeScript](https://docs.coingecko.com/docs/typescript-ai-prompts#/)**: The definitive prompt for integrating the CoinGecko API with our official [@coingecko/coingecko-typescript](https://www.npmjs.com/package/@coingecko/coingecko-typescript) package.

To get the most out of our AI prompts, keep these tips in mind:

* **Be Specific**: After providing the main prompt, give the AI a clear, specific task (e.g. "Write a function to fetch the price of Bitcoin and Ethereum in EUR").
* **Customize**: Feel free to modify the prompts to fit your project's unique requirements or coding standards.
* **Version Control**: Store your customized prompts in your repository to ensure your entire team benefits from consistent AI-generated code.
* **Always Review**: Treat AI-generated code as a starting point. Always review it for security, performance, and correctness.
