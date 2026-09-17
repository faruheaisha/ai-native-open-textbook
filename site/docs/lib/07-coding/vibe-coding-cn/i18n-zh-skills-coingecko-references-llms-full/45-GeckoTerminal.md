---
title: "CoinGecko MCP Server (Beta)"
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
pageSha256: "235554685244e7d16b3498b87f3596fa30f5dcee2c361fa42017380f00870963"
contentMode: "local-full"
zh: ""
---

# CoinGecko MCP Server (Beta)
Source: https://docs.coingecko.com/docs/mcp-server

MCP Server for Crypto Price & Market Data. MCP (Model Context Protocol) is an open standard that allows Large Language Model (LLM) and other AI agents to securely and intelligently interact with external data sources and tools.

&lt;img src="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=02ca3c105f2e635a6f2c7d055295f0d0" alt="" data-og-width="1200" width="1200" data-og-height="628" height="628" data-path="images/reference/63500e3-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=280&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=1720600784a5461c52e10e227df80b7c 280w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=560&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=293707f46e3f25f53958009a55744b3b 560w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=840&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=f4ace3ad35e9091f9e89a9d24dd1f169 840w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=1100&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=c904edee1f977ba97e1e659498da6daa 1100w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=1650&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=cad8e9cba2ce58e6142c92359fefa25a 1650w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/63500e3-image.png?w=2500&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=a7b36813341277fed347efe5b18b7967 2500w" />

  ### Welcome to the CoinGecko MCP Server!

  **CoinGecko MCP Server is currently in Beta.** We're constantly improving, and your feedback is crucial. Please share any thoughts or suggestions via [this feedback form](https://docs.google.com/forms/d/e/1FAIpQLSf06DOBauiZ8XS6NwWXUUwhFluH7jKHOAa3y4VsrkyGbLKyfA/viewform).

# 📕 Overview

The official CoinGecko MCP Server is now live, making CoinGecko data readily available to your AI models and applications. With the CoinGecko MCP, you can empower your agents to:

* **Access real-time market data**: Get aggregated prices, market cap, and trading volume for over 15k+ coins on CoinGecko, integrated across 1,000+ exchanges.
* **Dive into onchain analytics**: Query onchain DEX price and liquidity data for more than 8M tokens across 200+ networks via GeckoTerminal.
* **Discover market trends**: Instantly find trending coins, new token listings, top gainers/losers, and popular NFT collections.
* **Retrieve rich metadata**: Pull essential details like project descriptions, logos, social links, contract addresses, security info, and more.
* **Analyze historical performance**: Access historical price, market data, and OHLCV for any cryptocurrency.
* **Explore crypto categories**: Effortlessly list coins within specific sectors like Meme, DeFi, Layer 1, AI agent, and more.

  &lt;img src="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=a17e15d1b672940226da961086b986ed" data-og-width="2930" width="2930" data-og-height="1882" height="1882" data-path="images/reference/8c45171-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=280&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=c026d75329f72ee001fafea1c6d35659 280w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=560&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=e90eb94aa0cd98f9409042706e598703 560w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=840&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=fd02d8b78f1e6b325e29b59795d1f84f 840w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=1100&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=2ef4c5580ce4de3f5caae91b4c9be11d 1100w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=1650&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=c9efb0e238afbfe0a3d7bf54ede0c3c1 1650w, https://mintcdn.com/coingecko/b3Fla9Sm0TsVrJN4/images/reference/8c45171-image.png?w=2500&fit=max&auto=format&n=b3Fla9Sm0TsVrJN4&q=85&s=2b8f2e6b387cd3c9f9c229a31c1efe12 2500w" />

# 🔥 Getting Started

Connecting your AI to CoinGecko is simple. We offer several MCP server options to fit your needs, from keyless access for testing to authenticated connections for production applications.

Most MCP-compatible clients, like Claude Desktop, Gemini CLI, and Cursor, can be configured using a simple JSON file (e.g., `claude_desktop_config.json`)

  ### Prerequisites

  * Make sure your device has `node` installed. You can download it from [nodejs.org/download](https://nodejs.org/en/download)
