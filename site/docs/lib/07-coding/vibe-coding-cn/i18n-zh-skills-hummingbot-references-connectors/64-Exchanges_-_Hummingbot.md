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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/connectors.md"
sourceRel: "i18n/zh/skills/hummingbot/references/connectors.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/connectors.md"
sourceSha256: "16ff6b5efa43a0629074cd926d8e11b244d1cda26f6f4eee157acd5d0c75f303"
pageSha256: "c5b289b6d03083fd2e35ea9bd9440f24862b2c425869a99a686887ea79135d60"
contentMode: "local-full"
zh: ""
---

## Exchanges - Hummingbot

**URL:** https://hummingbot.org/exchanges

**Contents:**
- Exchanges¶
- What Are Exchange Connectors?¶
  - Supported Exchange Types¶
  - Real-Time Usage Data¶
- How to Add a Hummingbot Connector¶
  - 🔧 DIY Governance¶
  - 💎 Bounty Management¶
  - 🏆 Sponsor the Foundation¶
- Current Foundation Partners¶
  - 🏆 Exchange Sponsors¶

Hummingbot is open source software that helps you create and deploy crypto trading bots across 50+ exchanges. The project has 14k+ GitHub stars and 3.9k+ forks, representing one of the most active trading bot communities.

Connectors are standardized API integrations that enable Hummingbot to communicate with different exchanges. Each connector implements a common interface for order management, balance tracking, and market data streaming, allowing strategies to work seamlessly across multiple exchanges.

See live trading activity across all exchanges via our public dashboard:

The Reported Volumes dashboard shows real-time, aggregated trading data from Hummingbot instances worldwide, including both official releases and community forks. This transparent data helps exchanges understand actual usage patterns and trading volume.

View Live Dashboard →

You can choose from three integration options to get an official Hummingbot connector built and maintained:

Build your own connector following other connectors in the development branch of Hummingbot's open source framework. Then, create a New Connector Proposal along with a valid, comprehensive pull request containing the connector code.

You'll need some HBOT tokens to create a proposal, and you'll be responsible for ongoing maintenance updates and periodic voting to keep your connector included in ongoing releases of Hummingbot.

Have a professional community developer build and maintain your connector through our Bounty Management service for $10,000. This comprehensive package includes full connector development for all supported trading types (spot, perpetuals, AMM), plus one year of maintenance and governance support. The Foundation handles developer assignment, code review, testing, and community approval processes.

See Bounties for more information or review the Bounty Escrow Agreement.

Partner directly with Hummingbot Foundation for priority development, exchange-specific content like Funding Rate Arbitrage on Hyperliquid, and co-marketing campaigns starting at $50,000.

This premium option includes dedicated engineering resources, custom content development, and ongoing collaboration. Ideal for exchanges with new technical requirements and those seeking joint go-to-market and educational initiatives.

Leading exchanges partnering with Hummingbot Foundation for strategic integration:

Exchanges supporting open-source development through revenue sharing:

Hummingbot uses a transparent, community-driven governance process that lets [HBOT] holders decide which exchanges the codebase should support:

Learn About Governance →

CLOB (Central Limit Order Book) connectors provide WebSocket and REST-based integrations for order book exchanges. These connectors handle order placement, cancellation, balance tracking, and real-time market data streaming.

Build CLOB Connectors →

Gateway connectors enable interaction with decentralized protocols through a standardized REST API interface. Gateway supports Router, AMM, and CLMM connector types for blockchain-based trading.

Build Gateway Connectors →

Get your exchange integrated with Hummingbot through our comprehensive bounty management service. Email us at operations@hummingbot.org or contact Foundation team members on Hummingbot Discord to learn more. Sign the Bounty Escrow Agreement and escrow the funds to formalize the engagement.
