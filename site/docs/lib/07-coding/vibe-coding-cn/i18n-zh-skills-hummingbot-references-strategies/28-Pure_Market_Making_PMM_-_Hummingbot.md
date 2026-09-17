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
pageSha256: "dade9f16265fc30b346d4ee0c47e90a4ad5476d38b6c124fd1b0f88eb69200fa"
contentMode: "local-full"
zh: ""
---

## Pure Market Making (PMM) - Hummingbot

**URL:** https://hummingbot.org/strategies/pure-market-making/

**Contents:**
- pure_market_making¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Supported Exchange Types¶
- 🛠️ Strategy configs¶
- 📓 Description¶
  - Architecture¶
  - Refreshing Orders¶
  - Executing Order Proposals¶
  - Example Order Flow¶

This strategy allows Hummingbot users to run a market making strategy on a single trading pair on a spot exchanges.

It places limit buy (bid) and limit sell (ask) orders on the order book at prices relative to the mid-price with spreads equal to bid_spread and ask_spread. Every order_refresh_time seconds, the strategy replaces existing orders with new orders with refreshed spreads and order amounts.

In addition, the strategy contains a number of parameters to enable traders to control how orders are placed relative to their inventory position, use prices from a different order book, etc.

The description below is a general approximation of this strategy. Please inspect the strategy code in Trading Logic above to understand exactly how it works.

The built-in pure market making strategy in Hummingbot periodically requests limit order proposals from configurable order pricing and sizing plugins, and also periodically refreshes the orders by cancelling existing limit orders.

Here's a high level view of the logic flow inside the built-in pure market making strategy.

The pure market making strategy operates in a tick-by-tick manner. Each tick is typically 1 second, although it can be programmatically modified to longer or shorter durations.

At each tick, the pure market making strategy would first query the order filter plugin whether to proceed or not. Assuming the answer is yes, then it'll query the order pricing and sizing plugins and calculate whether and what market making orders it should emit. At the same time, it'll also look at any existing limit orders it previously placed on the market and decide whether it should cancel those.

The process repeats over and over at each tick, causing limit orders to be periodically placed and cancelled according to the proposals made by the order pricing and sizing plugins.

For each limit order that was emitted by the pure market making strategy, an expiry timestamp would be generated for that order and the order will be tracked by the strategy. The time until expiry for new orders is configured via the order_refresh_time parameter.

After an order's expiration time is reached, the pure market making strategy will create a cancel order proposal for that order.

After collecting all the order pricing, sizing and cancel order proposals from plugins and the internal refresh order logic - the pure market making strategy logic will merge all of the proposals and execute them.

Below is a hypothetical example of how the pure market making strategy works for a few clock ticks.

This cycle of order creation and order cancellation will repeat again and again for as long as the strategy is running. If a limit order is completely filled by a market order, the strategy will simply refresh it at the next clock tick.

What is market making?: A blog post that explains the basics of market making.

How to set up a simple pure market making bot on Binance: Learn how to create pure market making bot on Binance exchange.

Trader Sharing: Pure Market Making with cgambit: Eagle Club member and top Hummingbot Miner earner cgambit shares his tips and insights on pure market making.

Pure Market Making (PMM) Strategy: Use Pure Market Making Strategy but set dynamic bid/ask orders based on TradingView indicators which trigger alerts to Telegram and change the bid/ask orders using inventory skew or spreads-adjusted.

Check out Hummingbot Academy for more resources related to this strategy and others!
