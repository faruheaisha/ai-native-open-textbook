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
pageSha256: "163db9a7cae739a7dd60558e0bc0a07554b7e479096a4368e74812ea21610c0f"
contentMode: "local-full"
zh: ""
---

## Connectors - Hummingbot

**URL:** https://hummingbot.org/connectors/

**Contents:**
- Connectors
- What are Connectors?¶
- CLOB Connectors¶
- Gateway DEX Connectors¶
- Connector Maintenance¶
- Connector Governance¶

Connectors are packages of code that link Hummingbot's internal trading engine with real-time and historical data from different cryptocurrency exchanges and blockchains, via WebSocket and/or REST API. They standardize interactions with the idiosyncratic APIs offered by these platforms, for purposes such as gathering order book and blockchain data, as well as sending and cancelling transactions and orders.

CLOB (Central Limit Order Book) connectors integrate into a CLOB exchange's WebSocket API, enabling standardized order placement/cancellation and order book data fetching from the perspective of Hummingbot strategies. These connectors work with both centralized exchanges (CEX) and decentralized exchanges (DEX) that utilize a central limit order book model.

See CLOB Connectors for a list of the current CLOB connectors in Hummingbot

Gateway connectors establish and maintain connections to automated market maker (AMM) DEXs and other protocols on various blockchain networks, interfaces with their Javascript SDKs, and exposes standard REST API endpoints for trading and liquidity provision-related actions on these DEXs.

See Gateway for comprehensive documentation about Gateway, including supported DEX connectors, API commands, and configuration.

CLOB connectors requires ongoing maintenance: fixing bugs, addressing user issues, and keeping up with updates to both the exchange/blockchain API as wel as improvements to the Hummingbot connector standard.

Hummingbot Foundation maintains certain reference connectors to maintain an updated standard and leverages community-based developers to maintain other connectors to the same standard. We assign Bounties to community developers to upgrade and fix bugs for each exchange's connectors in the codebase.

Hummingbot Foundation governance lets HBOT holders which exchanges are supported by the open source codebase.

New connectors may be contributed by community members via New Connector Proposals, which require a pull request with the connector code to the Hummingbot Github repo, along with a minimum HBOT balance to create.

For existing connectors, quarterly Exchange Connector Polls allocates HBOT bounties toward top exchanges and determines which exchanges should be included in the codebase going forward. See the Connector Pots tab in HBOT Tracker for the current allocations for each exchange.
