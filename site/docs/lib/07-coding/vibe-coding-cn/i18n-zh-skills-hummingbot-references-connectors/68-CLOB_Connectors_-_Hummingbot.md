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
pageSha256: "2b874f532793120da8e753c8ac3041ee08318bc9f6e16606a91efc990d2ffac9"
contentMode: "local-full"
zh: ""
---

## CLOB Connectors - Hummingbot

**URL:** https://hummingbot.org/connectors/clob

**Contents:**
- CLOB Connectors
  - CLOB Connector Types¶
  - Current CLOB Connectors¶
  - Building CLOB Connectors¶

CLOB (Central Limit Order Book) connectors integrate into a CLOB exchange's WebSocket API, enabling standardized order placement/cancellation and order book data fetching from the perspective of Hummingbot strategies. These connectors work with both centralized exchanges (CEX) and decentralized exchanges (DEX) that utilize a central limit order book model.

Each connector is customized for a particular exchange's idiosyncrasies to enable this level of standardization, so they should ideally have a maintainer, whose role is to ensure consistent performance by fixing bugs, incorporating API updates, and other ongoing work.

Currently, Hummingbot supports two CLOB connector standards, each which define how the code encapsulated in a connector folder should offer standardized API endpoints and hook into the Hummingbot client.

CLOB Spot: WebSocket-based connectors to an exchange's spot order book-based markets. Each connector is a folder in the hummingbot/connector/exchange folder.

CLOB Perp: WebSocket-based connectors to an exchange's perpetual futures order book-based markets. Each connector is a folder in the hummingbot/connector/derivative folder. By convention, these connector names end in _perpetual.

These connector standards allow users to create Strategies and Scripts that can operate on different spot and perpetual markets without modification.

Here are the CLOB connectors in the codebase for the current Epoch. Note that the Foundation prioritizes fixes for connectors from exchanges that are sponsors or partners, so they tend to be more reliable and better maintained.

The Notion templates below summarize the file and functionalities needed to build the latest spot and perpetual connectors standards and support V2 Strategies:

See Building Connectors for more information.

If the exchange is not yet supported by Hummingbot, you can submit a governance proposal for it to be included. New connectors may be contributed by community members via New Connector Proposals, which require a pull request with the connector code to the Hummingbot Github repo, along with a minimum HBOT balance to create.
