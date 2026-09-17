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
pageSha256: "22a32fc34fdd3e348c46913379c99c6762a2263544e453caada9f38acd1790fe"
contentMode: "local-full"
zh: ""
---

## Cross-Exchange Market Making (XEMM) - Hummingbot

**URL:** https://hummingbot.org/strategies/cross-exchange-market-making

**Contents:**
- cross_exchange_market_making¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Supported Exchange Types¶
- 🛠️ Strategy configs¶
- 📓 Description¶
  - Architecture¶
  - Live Configuration¶
  - Order Creation and Adjustment¶
  - Cancel Order Flow¶

Also referred to as liquidity mirroring or exchange remarketing, this strategy allows you to make a market (creates buy and sell orders) on the maker exchange, while hedging any filled trades on a second, taker exchange. The strategy attempts places maker orders at spreads that are wider than taker orders by a spread equal to min_profitability.

The description below is a general approximation of this strategy. Please inspect the strategy code in Trading Logic above to understand exactly how it works.

The cross exchange market making strategy performs market making trades between two markets: it emits limit orders to a less liquid, larger spread market; and emits market orders on a more liquid, smaller spread market whenever the limit orders were hit. This, in effect, sends the liquidity from the more liquid market to the less liquid market.

In Hummingbot code and documentation, we usually refer to the less liquid market as the "maker side" - since the cross exchange market making strategy is providing liquidity there. We then refer to the more liquid market as the "taker side" - since the strategy is taking liquidity there.

The startegy currently supports centralized exchanges on the maker side and centralized and decentralized exchanges on the taker side. Decentralized exchanges are accessed through the hummingbot gateway.

The cross exchange market making strategy's code is divided into two major parts:

Order creation and adjustment

Periodically creates and adjusts limit orders on the maker side.

Performs the opposite, hedging trade on the taker side, whenever a maker order has been filled.

The strategy now supports live configuration. That means any changes in configuration by the user are immediately taken into account by the strategy without a need for it to be restarted.

Here's a high-level view of the logical flow of the order creation and adjustment part. The overall logic of order creation and adjustment is pretty involved, but it can be roughly divided to the Cancel Order Flow and the Create Order Flow.

The cross exchange market making strategy regularly refreshes the limit orders it has on the maker side market by regularly cancelling old orders (or waiting for existing order to expire), and creating new limit orders. This process ensures the limit orders it has on the maker side are always of the correct and profitable prices.

The entry point of this logic flow is the c_process_market_pair() function in cross_exchange_market_making.pyx.

The cancel order flow regularly monitors all active limit orders on the maker side, to ensure they are all valid and profitable over time. If any active limit order becomes invalid (e.g. because the asset balance changed) or becomes unprofitable (due to market price changes), then it should cancel such orders.

The active_order_canceling setting changes how the cancel order flow operates. active_order_canceling should be enabled when the maker side is a centralized exchange (e.g. Binance, Coinbase Pro), and it should be disabled when the maker side is a decentralized exchange.

When active_order_canceling is enabled, the cross exchange market making strategy would refresh orders by actively cancelling them regularly. This is optimal for centralized exchanges because it allows the strategy to respond quickly when, for example, market prices have significantly changed. This should not be chosen for decentralized exchanges that charge gas for cancelling orders (such as Radar Relay).

When active_order_canceling is disabled, the cross exchange market making strategy would emit limit orders that automatically expire after a predefined time period. This means the strategy can just wait for them to expire to refresh the maker orders, rather than having to cancel them actively. This is useful for decentralized exchanges because it avoids the potentially very long cancellation delays there, and it also does not cost any gas to wait for order expiration.

It is still possible for the strategy to actively cancel orders with active_order_canceling disabled, via the cancel_order_threshold setting. For example, you can set it to -0.05 such that the strategy would still cancel a limit order on a DEX when it's profitability dropped below -5%. This can be used as a safety switch to guard against sudden and large price changes on decentralized exchanges.

Assuming active order canceling is enabled, the first check the strategy does with each active maker order is whether it is still profitable or not. The current profitability of an order is calculated assuming the order is filled and hedged on the taker market immediately.

If the profit ratio calculated for the maker order is less than the min_profitability setting, then the order is canceled.

The logic of this check can be found in the function c_check_if_still_profitable() in cross_exchange_market_making.pyx.

Otherwise, the strategy will go onto the next check.

The next check afterwards checks whether there's enough asset balance left to satisfy the maker order. If there is not enough balance left on the exchange, the order would be cancelled.

The logic of this check can be found in the function c_check_if_sufficient_balance() in cross_exchange_market_making.pyx.

Otherwise, the strategy will go onto the next check.

Asset prices on both the maker side and taker side are always changing, and thus the optimal prices for the limit orders on the maker side would change over time as well.

The cross exchange market making strategy calculates the optimal pricing from the following factors:

If the price of the active order is different from the optimal price calculated, then the order would be cancelled. Otherwise, the strategy would allow the order to stay.

The logic of this check can be found in the function c_check_if_price_correct() in cross_exchange_market_making.pyx.

After all the active orders on make side have been checked, the strategy will proceed to the create order flow.

After going through the cancel order flow, the cross exchange market making strategy would check and re-create any missing limit orders on the maker side.

The logic inside the create order flow is relatively straightforward. It checks whether there are existing bid and ask orders on the maker side. If any of the orders are missing, it will check whether it is profitable to create one at the moment. If it's profitable to create the missing orders, it will calculate the optimal pricing and size and create those orders.

The logic of the create order flow can be found in the function c_check_and_create_new_orders() in cross_exchange_market_making.pyx.

The cross exchange market making strategy would always immediately hedge any order fills from the maker side, regardless of how profitable the hedge is at the moment. The rationale is, it is more useful to minimize unnecessary exposure to further market risks for the users, than to wait speculatively for a profitable moment to hedge the maker order fill - which may never come.

The logic of the hedging order fill flow can be found in the function c_did_fill_order() and c_check_and_hedge_orders() in cross_exchange_market_making.py.

Decentralized exchanges have several peculiarities compared to centralized exchanges, which must be accounted for if selected on the taker side. For starters, in general interaction with them is less reliable. Unlike in case of centralized exchanges, for example obtaining an asset price from a DEX may occasionally fail. For this reason many operations on a DEX may have to be repeated until they're executed successfully.

Another difference is dependence of transaction fees on currrent gas fees. Therefore taker transaction fees may vary and therefore also position profitability checks performed in the method check_if_still_profitable() may return different results at different times for the same maker positions.

What is cross exchange market making?

Cross Exchange Market Making with Jelle

Use cross-exchange market making (XEMM) strategy to lower risk: The XMM strategy effectively reduces inventory risk. This article talks about how to proceed with XEMM in place.

Cross Exchange Market Making Strategy | Hummingbot Live: In this video, Paulo shows how to optimize a Cross Exchange Market-Making strategy using the Hummingbot app.

Check out Hummingbot Academy for more resources related to this strategy and others!
