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
pageSha256: "1e5f126d2a9ce89695c4eb5979b25b5e7517b731aa6928880f835dd460d50078"
contentMode: "local-full"
zh: ""
---

## Dynamic vs. Static Tools

When running our CoinGecko MCP server, you can choose how the LLM client discovers tools.

* **Static (Default)**: The AI is given a complete list of tools and their functions upfront. This is faster for specific, known tasks.
* **Dynamic**: The AI first asks the server for available tools based on a keyword search, then learns how to use them. This is flexible but can be slower.

For a deeper dive, read the [official documentation](https://www.stainless.com/changelog/mcp-dynamic-tools) from Stainless.

To help AI models interact with CoinGecko data effectively, we provide an `llms.txt` file at [/llms-full.txt](https://docs.coingecko.com/llms-full.txt). This file gives models context on how to best query our API, ensuring more accurate and efficient data retrieval. We recommend utilizing this in your integrations.

CoinGecko MCP Server is powered by [Stainless](https://www.stainless.com/) ✱

Have feedback, a cool idea, or need help? Reach out to `soonaik@coingecko[dot]com` or fill in [this feedback form](https://docs.google.com/forms/d/e/1FAIpQLSf06DOBauiZ8XS6NwWXUUwhFluH7jKHOAa3y4VsrkyGbLKyfA/viewform).
