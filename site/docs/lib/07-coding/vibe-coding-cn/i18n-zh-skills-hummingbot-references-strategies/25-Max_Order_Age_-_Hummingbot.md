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
pageSha256: "25fa3b8bd906783f5030e8833f925b410f17b14f9ca5fbde016504ae98b9c3a6"
contentMode: "local-full"
zh: ""
---

## Max Order Age - Hummingbot

**URL:** https://hummingbot.org/strategy-configs/max-order-age/

**Contents:**
- Max Order Age¶
- How it works¶
- Sample configuration¶
  - Max order age with order refresh tolerance¶
  - Max order age with hanging orders¶
  - Why max order age is important in liquidity mining?¶

Released on version 0.34.0

By default, the parameter is set to 1800 seconds.

To reconfigure, run the command config max_order_age and set the desired value in seconds.

The max_order_age parameter allows you to set a specific duration when resetting your order's age. It refreshes your orders and automatically creates an order based on the spread and movement of the market. Also, hanging orders remain as hanging orders.

We can set the maximum age of an order before it refreshes back to the set spread and amount. The example below shows that it refreshed the order's age before order_refresh_time was triggered because max_order_age was set to 20 seconds.

Setting our max_order_age at a lower time than order_refresh_time refreshes our orders based on the last spread and value.

Now try out a configuration without max order age, and let's enable order refresh tolerance.

The orders are not canceling because it is within the 0.1% order refresh tolerance percentage even though the order refresh time is 30 seconds.

Now add max order age to the config.

The max_order_age parameter tried to refresh the order but order_refresh_tolerance_pct kicked in. That's why the order was canceled, and the bot created a new order because it reached the threshold of 0.02%.

Max order age respects hanging orders and refreshes the orders but does not cancel active hanging orders. See the example below.

The hanging orders were not canceled and were only refreshed when max_order_age was triggered.

Suppose you are participating in the HARD-USDT campaign with an order refresh time of 30 minutes. Max order age refreshes depending on what you set it on as long as it is lower than the order refresh time. When participating in liquidity mining, outstanding orders that reach the 30-minute mark are not subject to rewards. Therefore, it is best to use the parameter to refresh the orders' age to be eligible for rewards.

**Examples:**

Example 1 (unknown):
```unknown
bid_spread : 0.50
ask_spread : 0.50
max_order_age : 20.0
order_refresh_time : 60.0
```

Example 2 (unknown):
```unknown
bid_spread : 0.50
ask_spread : 0.50
order_refresh_tolerance_pct: 0.1
order_refresh_time : 60.0
```

Example 3 (unknown):
```unknown
bid_spread : 0.50
ask_spread : 0.50
order_refresh_tolerance_pct: 0.02
max_order_age: 15.0
order_refresh_time : 30.0
```

Example 4 (unknown):
```unknown
ask_spread: 0.3
bid_spread: 0.3
order_refresh_time: 60
max_order_age: 30
hanging_order_enabled: True
```
