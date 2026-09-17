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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/strategies.md"
sourceRel: "i18n/zh/skills/hummingbot/references/strategies.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/hummingbot/references/strategies.md"
sourceSha256: "a9ba87eb4e73a53320c54672ff37d6a98bbd94e8e45e53c860c73e4e1c853574"
pageSha256: "dfdbb0619acd4e8d1fd250cdc8021da113685e8beda6408b0144147f8d80e1d9"
contentMode: "local-full"
zh: ""
---

## AMM Arbitrage - Hummingbot

**URL:** https://hummingbot.org/strategies/amm-arbitrage

**Contents:**
- amm_arb¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Supported Exchange Types¶
- 🛠️ Strategy configs¶
- 📓 Description¶
- ℹ️ More Resources¶

This strategy monitors prices between a trading pair (market_1) on a SPOT AMM DEX versus another trading pair (market_2) on another SPOT AMM CEX or SPOT CLOB DEX in order to identify arbitrage opportunities. It executes offsetting buy and sell orders in both markets in order to capture arbitrage opportunities with profitability higher than min_profitability, net of transaction costs, which include both blockchain transaction fees (gas) and exchange fees.

See Trading logic to understand how the strategy works.

How to arbitrage AMMs like Uniswap and Balancer: Learn how you can Arbitrage AMMs with our strategy

Quickstart Guide for amm_arb (deprecated): This guide will walk you through the installation and launch of the new amm_arb strategy
