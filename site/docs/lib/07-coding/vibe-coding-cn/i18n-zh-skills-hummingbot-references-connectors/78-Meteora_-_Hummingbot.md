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
pageSha256: "85f081a537868991c2803292009c712af9c711e28ba2bf86f74399f49cad3057"
contentMode: "local-full"
zh: ""
---

## Meteora - Hummingbot

**URL:** https://hummingbot.org/exchanges/gateway/meteora

**Contents:**
- Meteora¶
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
- Configuration¶
- CLMM Endpoints¶

Meteora operates on Solana networks.

See Gateway Connect for instructions on connecting your wallet to Gateway.

Configure Meteora settings in /conf/connectors/meteora.yml.

Below are the Meteora configuration parameters and their default values: # Global settings for Meteora # Default slippage percentage for swaps (e.g., 1 = 1%) slippagePct: 1 # default DLMM strategy type for positions # SpotImBalanced = 0, # CurveImBalanced = 1, # BidAskImBalanced = 2, # SpotBalanced = 3, # CurveBalanced = 4, # BidAskBalanced = 5 strategyType: 0

Integration to Meteora's Dynamic Liquidity Market Maker (DLMM)

For more info, run Gateway in development mode and go to http://localhost:15888 in your browser to see detailed documentation for each endpoint.

**Examples:**

Example 1 (unknown):
```unknown
# Global settings for Meteora
# Default slippage percentage for swaps (e.g., 1 = 1%)
slippagePct: 1

# default DLMM strategy type for positions
# SpotImBalanced = 0,
# CurveImBalanced = 1,
# BidAskImBalanced = 2,
# SpotBalanced = 3,
# CurveBalanced = 4,
# BidAskBalanced = 5
strategyType: 0
```
