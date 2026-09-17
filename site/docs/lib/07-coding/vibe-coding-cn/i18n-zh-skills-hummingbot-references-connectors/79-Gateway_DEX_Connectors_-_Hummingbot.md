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
pageSha256: "f00982368fb6c3eec95cfc6a24dd628c7688606bb2600acac1db30080182b944"
contentMode: "local-full"
zh: ""
---

## Gateway DEX Connectors - Hummingbot

**URL:** https://hummingbot.org/gateway/connectors/

**Contents:**
- Gateway DEX Connectors¶
- Supported Connectors¶
  - Active Connectors¶
  - Legacy Connectors¶
- Connector Schemas¶
  - Router Schema¶
  - AMM Schema¶
  - CLMM Schema¶
- Building Custom Connectors¶

Gateway provides standardized connectors for interacting with decentralized exchanges (DEXs) across different blockchain networks. Each connector implements one or more trading types (Router, AMM, CLMM) to support various DeFi protocols.

The Gateway refactoring approved in NCP-22 has been completed with the v2.8.0 release. The new standard is now ready, and developers can help upgrade the legacy connectors to the new architecture. Community developers can claim bounties for these upgrades where available.

The following connectors are available in legacy versions but need to be upgraded to the v2.8.0 standard:

Gateway implements three standardized schemas that define the API structure for different trading types. Each connector must implement one or more of these schemas to ensure compatibility with Hummingbot.

For DEX aggregators and swap-only protocols. Focuses on quoting optimal trade routes across multiple liquidity sources and executing quotes.

For traditional Automated Market Maker pools with constant product (x*y=k) formulas, such as Uniswap V2 and Raydium Standard Pools.

For Concentrated Liquidity Market Maker pools where liquidity providers can specify custom price ranges such as Uniswap V3 and Raydium Concentrated Pools.

For detailed instructions on building custom Gateway DEX connectors, see Building Gateway Connectors.
