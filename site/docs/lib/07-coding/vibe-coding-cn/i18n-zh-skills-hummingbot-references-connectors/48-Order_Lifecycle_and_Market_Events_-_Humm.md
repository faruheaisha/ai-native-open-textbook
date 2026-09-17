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
pageSha256: "0922de2f0af82c2c6a2de8f2935848dba4148a3e156c7c4d5c59cf1f7bafd84e"
contentMode: "local-full"
zh: ""
---

## Order Lifecycle and Market Events - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/architecture/order_lifecycle

**Contents:**
- Order Lifecycle and Market Events
- Order Lifecycle Flowchart¶
- Creating an Order¶
- Order Tracking¶
- Submitting an Order¶
- Order Being Filled¶
- Order Completion¶
- Order Cancellation or Expiry¶
- Order Failure¶

The information below are for developers building spot and perp connectors that integrate directly into the Hummingbot client. For information on developing gateway connectors that use Gateway, see Building Gateway Connectors.

Exchange connectors track status updates of all orders created in Hummingbot and emit events on status updates of its orders for the strategy modules. Be careful when implementing a new exchange connector to ensure all the status updates and emitted events adhere to the semantics defined by Hummingbot.

An order is created when a script or strategy invokes the buy() or sell() method in an exchange connector. buy() and sell() would return immediately with a client-side order ID that Hummingbot uses to track the order's status.

They would schedule the order to be submitted to the exchange as soon as possible but would not wait for the reply from the exchange before returning.

Order tracking starts when _create_order() is called. It is called from within the buy() and sell() functions.

An exchange connector should keep tracking the order's status and emit events for any change of states until the order is completed, cancelled, expired, or failed.

This is done by calling start_tracking_order() method in the Exchange class. start_tracking_order() should be called before the API request for placing the order is executed.

In most of our built-in exchange connectors, order submission occurs in the _create_order() function - although it may be different for some decentralized exchange connectors.

The _create_order() method is responsible for performing the necessary trading rule checks before submitting the order via the REST API.

Upon receiving a successful response, a BuyOrderCreatedEvent or SellOrderCreatedEvent would be emitted. Otherwise, a MarketOrderFailureEvent would be emitted. Note that despite the naming, MarketOrderFailureEvent is emitted even for limit orders.

Other market participants could fill an order over time once it's live on an exchange. Depending on the order types, i.e. limit or market, the order could be filled either immediately or after another market participant fulfils it.

For every order fill on our orders, whether partially or entirely, the exchange connector must emit an OrderFilledEvent, to notify the strategy modules about the order's progress.

Once an order has been completely filled, the exchange connector must emit a BuyOrderCompletedEvent or SellOrderCompletedEvent.

The exchange connector would stop tracking the order afterward.

BuyOrderCompletedEvent or SellOrderCompletedEvent should always come after an OrderFilledEvent has been emitted.

If an order is canceled or expired before it has been completely filled, an OrderCancelledEvent or an OrderExpiredEvent should be emitted.

For centralized exchanges, order tracking should end after emitting an OrderCancelledEvent or OrderExpiredEvent.

On decentralized exchanges - since it's possible for orders to be filled after cancellation or even expiry, due to block delays - the exchange connector may keep tracking the order for a certain amount of time afterwards.

If a failed order has been rejected for any reason other than cancellation or expiry, MarketOrderFailureEvent must be emitted.
