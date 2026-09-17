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
pageSha256: "84bb5e931c9ad152bc8f8e1101a58bd6166b32c9b1defba26e3d2e8316d8a607"
contentMode: "local-full"
zh: ""
---

## BTC Markets - Hummingbot

**URL:** https://hummingbot.org/exchanges/btc-markets/

**Contents:**
- BTC Markets
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Generate API Keys¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶

From inside the Hummingbot client, run connect btc_markets:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect btc_markets_paper_trade instead of connect btc_markets.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

**Examples:**

Example 1 (unknown):
```unknown
Enter your btc_markets API key >>>
Enter your btc_markets secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to btc_markets
```
