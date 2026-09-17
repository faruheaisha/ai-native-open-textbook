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
pageSha256: "d691183ff0b825c4bbdb8f2bc075ccda6e427b6ff893573dc264a90e247ae947"
contentMode: "local-full"
zh: ""
---

## Spot Perpetual Arbitrage - Hummingbot

**URL:** https://hummingbot.org/strategies/spot-perpetual-arbitrage/

**Contents:**
- spot_perpetual_arbitrage¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Exchanges supported¶
- 🛠️ Strategy configs¶
- 📓 Description¶
- ℹ️ More Resources¶

This strategy looks at the price on the spot connector and the price on the derivative connector. Then it calculates the spread between the two connectors. The key features for this strategy are min_divergence and min_convergence.

When the spread between spot and derivative markets reaches a value above min_divergence, the first part of the operation will be executed, creating a buy/sell order on the spot connector, while opening an opposing long/short position on the derivative connector.

With the position open, the bot will scan the prices on both connectors, and once the price spread between them reaches a value below min_convergence, the bot will close both positions.

How to Use the New Spot-perpetual Arbitrage Strategy: Learn how the spot-perpetual arbitrage strategy works and how you can make use of it.

Spot-Perpetual Arbitrage Strategy Demo | Hummingbot Live: A live demo on how you can set parameters to run the spot-perpetual arbitrage strategy

Check out Hummingbot Academy for more resources related to this strategy and others!
