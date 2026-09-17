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
pageSha256: "22e024920cd5b0af9c47ee8029e5ac3c96a1ad4643440d1fd35283aaa829cdcb"
contentMode: "local-full"
zh: ""
---

## Pancakeswap - Hummingbot

**URL:** https://hummingbot.org/exchanges/gateway/pancakeswap/

**Contents:**
- PancakeSwap¶
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
- Configuration¶
- Router Endpoints¶
- AMM Endpoints¶
- CLMM Endpoints¶

PancakeSwap operates on BNB Chain and other EVM-compatible networks.

See Gateway Connect for instructions on connecting your wallet to Gateway.

Configure PancakeSwap settings in /conf/connectors/pancakeswap.yml.

Below are the PancakeSwap configuration parameters and their default values: # Global settings for PancakeSwap # Default slippage percentage for swaps (2%) slippagePct: 2 # For each swap, the maximum number of hops to consider maximumHops: 4

Integration to PancakeSwap's Smart Router for optimal trade execution

Integration to PancakeSwap V2 classic AMM pools

Integration to PancakeSwap V3 concentrated liquidity pools

For more info, run Gateway in development mode and go to http://localhost:15888 in your browser to see detailed documentation for each endpoint.

**Examples:**

Example 1 (unknown):
```unknown
# Global settings for PancakeSwap
# Default slippage percentage for swaps (2%)
slippagePct: 2

# For each swap, the maximum number of hops to consider
maximumHops: 4
```
