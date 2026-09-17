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
pageSha256: "848c27a05a2caab30b381e0bb4abd7bc9070449285807145e63b8582d1cc2ebc"
contentMode: "local-full"
zh: ""
---

## Scripts Cheatsheat - Hummingbot

**URL:** https://hummingbot.org/scripts/cheatsheet/

**Contents:**
- Scripts Cheatsheat
- Getting started¶
- Scripts basics¶
  - Configuration¶
  - Markets¶
  - Execution¶
- Market Operations¶
  - Create and cancel Orders¶
- Account Data¶
  - Balance¶

See below for reference docs that help you create Scripts that inherit from the ScriptStrategy base class.

This Script Strategies Cheatsheet is also available in PDF form.

Watch the full video that accompanies this page:

Scripts are a subclass of ScriptStrategy.

You can define the variables that you will use as class variables. By default, there is no configuration file for scripts.

Define the connectors and trading pairs, in the class variable markets, with the following structure:

self.get_balance_df()

self.active_orders_df()

You can create custom handlers for various market events by implementing one or more of the following methods in your script:

To send notifications to the Hummingbot client, use the following methods:

If you have the Telegram integration activated, you will receive the notifications there too.

A connection is stored in the instance variable connectors with the following structure: Dict["connector_name", ConnectorBase]

For example, self.connectors["binance"] will return the Binance exchange class.

For example, self.connectors["binance"].get_mid_price("ETH-USDT") will return the mid price for the ETH-USDT trading pair on Binance.

Use these methods to compute metrics efficiently:

Returns a ClientOrderBookQueryResult class with:

This checks if the balance is enough to place the order, all_or_none=True will set the amount to 0 on insufficient balance and all_or_none=False will adjust the order size to the available balance.

**Examples:**

Example 1 (unknown):
```unknown
Dict["connector_name", Set(Trading pairs)]
```

Example 2 (unknown):
```unknown
self.buy(connector_name, trading_pair, amount, order_type, price, [position_action])
self.sell(connector_name, trading_pair, amount, order_type, price,[position_action])
self.cancel(connector_name, trading_pair, order_id)```
# position_action is only used in perpetual connectors
```

Example 3 (unknown):
```unknown
did_create_buy_order(self, event: BuyOrderCreatedEvent)
did_create_sell_order(self, event: SellOrderCreatedEvent)
did_fill_order(self, event: OrderFilledEvent)
did_fail_order(self, event: MarketOrderFailureEvent)
did_cancel_order(self, event: OrderCancelledEvent)
did_expire_order(self, event: OrderExpiredEvent)
did_complete_buy_order(self, event: BuyOrderCompletedEvent)
did_complete_sell_order(self, event: SellOrderCompletedEvent)
```

Example 4 (unknown):
```unknown
self.notify_hb_app(msg)
self.notify_hb_app_with_timestamp(msg)
```
