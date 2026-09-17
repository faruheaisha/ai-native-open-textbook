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
pageSha256: "da7205b25b554dc4c8c8bb8acd385cf9d0e30d6a65d4729dae1721240b89d40b"
contentMode: "local-full"
zh: ""
---

## Perpetual Market Making - Hummingbot

**URL:** https://hummingbot.org/strategies/perpetual-market-making

**Contents:**
- perpetual_market_making¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Exchanges supported¶
- 🛠️ Strategy configs¶
- 📓 Description¶
  - Architecture¶
  - Order Placement¶
  - Position Management¶
- ℹ️ More Resources¶

This strategy allows Hummingbot users to run a market making strategy on a single trading pair on a perpetuals swap (perp) order book exchange.

Similar to the pure_market_making_strategy, the perpetual_market_making strategy keeps placing limit buy and sell orders on the order book and waits for other participants (takers) to fill its orders. But unlike market making on spot markets, where assets are being exchanged, market making on perpetual markets creates and closes positions. Since outstanding perpetual swap positions are created after fills, the strategy has a number of parameters to determine when positions are closed to take profits and prevent losses.

The description below is a general approximation of this strategy. Please inspect the strategy code in Trading Logic above to understand exactly how it works.

The perpetual_market_making strategy works in a similar fashion as the pure_market_making_strategy, except adapted to trading perpetual swaps. Trading perpetual swaps creates positions, and doesn't just exchage assets like trading on spot markets.

On every tick the strategy creates new opening orders and existing orders are being cancelled. If an outstanding order is filled, the strategy then has to manage the position.

The strategy places long and short orders to open perpetual swap positions at predefined distances from a mid price. These distances are given by the parameters bid_spread and ask_spread.

On every tick, outstanding open orders are being evaluated. If they're too far from the proposal orders, as defined by the order_refresh_tolerance_pct parameter, they will be cancelled and replaced by new orders. If an active order finds itself below a min_spread threshold from the mid price, it will also be cancelled.

It's also possible to place multiple orders on each side in price layers as defined by the parameters order_levels, order_level_amount and order_level_spread. The closest to the mid price will be always orders at distances bid_spread and ask_spread.

The strategy can be restricted to trade only within a specific price band, defined by the price_ceiling and price_floor parameters. If the mid price is outside of this interval, no orders will be created, only cancelled.

New opening orders are not being placed if one or more of existing opening orders were filled and the strategy holds a position. In that case, the position(s) is being evaluated on every tick whether to close it or not, and whether to either take a profit or a loss. These decisions are controlled by parameters long_profit_taking_spread, short_profit_taking_spread and stop_loss_spread.

Perpetual Market Making Demo | Hummingbot Live: Demo of the Perpetual Market Making strategy

Check out Hummingbot Academy for more resources related to this strategy and others!
