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
pageSha256: "3686970f13344ba480dba07c1961496faac067e5ad4099509f5f4280bd502bcc"
contentMode: "local-full"
zh: ""
---

## TWAP - Hummingbot

**URL:** https://hummingbot.org/strategies/twap

**Contents:**
- twap¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Exchanges supported¶
- 🛠️ Strategy configs¶
- 📓 Description¶
  - Overview¶
  - Config¶
  - Strategy¶
- 📺 Demo¶

This strategy is a simple bot that places a series of limit orders on an exchange, while allowing users to control order size, price, and duration.

We recommend this strategy as a starting point for developers looking to build their own strategies, and it is used as reference for articles in Developer Reference: Strategies.

The description below is a general approximation of this strategy. Please inspect the strategy code in Trading Logic above to understand exactly how it works.

The TWAP strategy is a common algorithmic execution strategy used for splitting up large orders over time. Specifically, the TWAP strategy helps traders minimize slippage when buying or selling large orders. These features make the strategy more useful to traders and will help when creating future, more complex strategies:

The TWAP strategy divides a large user order into chunks according to the following user configurations:

The orders are then split into tradable (quantized) amounts and executed sequentially with the indicated time delay in between orders. There is no time delay before the first order. Because only one order is placed in a clock tick, a state machine is needed to emit multiple orders over different clock ticks. To see the executed orders, type history into the command prompt.

Here are the additional user configurable parameters for the TWAP strategy (fields are added to config_map file):

The TWAP strategy logic is trying to split a large order into smaller ones over time, and it does that by maintaining important information about the state when processing orders by adding state variables.

Custom state variables can be added to the strategy by setting variables in the __init__ function.

TWAP processes orders when there is a remaining order quantity & the specified time_delay has passed. Specifically, some of the key elements in utilizing the remaining order quantity and time_delay are detailed below:

This demo is for instructional and educational purposes only. Any parameters used are purely for demo purposes only. We are not giving any legal, tax, financial, or investment advice. Every user is responsible for their use and configuration of Hummingbot.

Strategy coding for dummies: This article is a blog post submission from our of our users. It is not directly related to TWAP strategy, but it demos how you can write a custom script for cross exchange market making strategy

Check out Hummingbot Academy for more resources related to this strategy and others!
