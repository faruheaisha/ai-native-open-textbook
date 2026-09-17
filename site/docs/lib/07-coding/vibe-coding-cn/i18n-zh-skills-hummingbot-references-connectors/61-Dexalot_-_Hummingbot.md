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
pageSha256: "194e77110ec12a180fedfbb4443a18e0ef8f5c31aa1d8ad718d3893f9f00864f"
contentMode: "local-full"
zh: ""
---

## Dexalot - Hummingbot

**URL:** https://hummingbot.org/exchanges/dexalot/

**Contents:**
- Dexalot
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶

See the Dexalot Connector Guide for step-by-step instructions.

Create a wallet on one of the supported networks below:

From inside the Hummingbot client, run connect dexalot in order to connect your wallet:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

This perp exchange offers a paper trading mode:

Afer you create an account and create the API keys, you can enter them by using the connect dexalot_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available spot strategies / scripts.

**Examples:**

Example 1 (javascript):
```javascript
Enter your Dexalot private key >>>
Enter your Dexalot wallet address >>>
```

Example 2 (unknown):
```unknown
You are now connected to Dexalot!
```
