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
pageSha256: "02c61379e5b841bc2ce21a50b23bbac31b99b2828194db47d90d8ff6852c78df"
contentMode: "local-full"
zh: ""
---

## Controllers - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/controllers/

**Contents:**
- Controllers
- Base Classes¶
- Directional Trading Controllers¶
- Market Making Controllers¶
- Other Controllers¶

The Controller plays a crucial role within Hummingbot's Strategy V2 framework, serving as the orchestrator of the strategy's overall behavior. It interfaces with the MarketDataProvider, which includes OrderBook, Trades, and Candles, and forwards a series of ExecutorActions to the main strategy. The strategy then evaluates these actions, deciding to execute them based on its overarching rules and guidelines.

Users can now use controllers as sub-strategies allowing them to use multiple controllers in a single script or trade multiple pairs / configs in a single bot.

Currently, the controller base classes available are:

These strategies aim to profit from predicting the market's direction (up or down) and takes positions based on signals indicating the future price movement.

Suitable for strategies that rely on market trends, momentum, or other indicators predicting price movements.

Customizing signal generation (get_signal) allows users to change various analytical models to generate trade signals and determine the conditions under which trades should be executed or stopped.

These strategies provide liquidity by placing buy and sell orders near the current market price, aiming to profit from the spread between these orders.

Customization involves defining how price levels are selected (get_levels_to_execute), how orders are priced and sized (get_price_and_amount), and when orders should be refreshed or stopped early.

User may also adjust the strategy based on market depth, volatility, and other market conditions to optimize spread and order placement.
