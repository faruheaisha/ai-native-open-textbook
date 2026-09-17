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
pageSha256: "ba4b3d2189472dc8c42b181ba0083a903551865e0ba50f1387bd8e03d1571fa3"
contentMode: "local-full"
zh: ""
---

## Connector Architecture - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/architecture/

**Contents:**
- Connector Architecture
- Component Overview¶
  - Exchange/Derivative.py¶
  - ConnectorAuth.py¶
  - OrderBookTracker¶
  - UserStreamTracker¶
  - OrderBookTrackerDataSource¶
  - UserStreamTrackerDataSource¶
  - InFlightOrder¶
  - ClientOrderTracker¶

The information below are for developers building spot and perpetual connectors that integrate directly into the Hummingbot client. For information on developing gateway connectors that use Gateway, see Building Gateway Connectors.

Here is the high-level design of a connector:

Note that for Derivative (perp) connectors, we have a multiple inheritance to ExchangeBase and PerpetualTrading.

Each connector is comprised of the following components. Below are the detailed descriptions of tasks for each component and its corresponding files.

File: *_exchange/derivative.py — REQUIRED

Connector modules are centered around an Exchange/Derivative class, which are ultimately children of ConnectorBase. Each Exchange/Derivative class contains an OrderBookTracker and UserStreamTracker, and they are responsible for maintaining order books and user account information.

Exchange/Derivative instances also contain a ClientOrderTracker which tracks the connector's InFlightOrders, which are orders placed by Hummingbot currently on the order book. Typically, it is also helpful to have an exchange-specific Auth class, which generates the necessary authentication parameters/headers to access restricted REST endpoints and WebSocket channel, such as for placing orders and listening for order updates.

The Derivative class in particular inherits functions that are specifically used in perpetual markets. See the PerpetualTrading class for more info.

File: *_auth.py — OPTIONAL

This class generates the appropriate authentication headers for the restricted REST endpoints to be used by the Exchange/Derivative and UserStreamTrackerDataSource classes. Generally, this would mean constructing the appropriate HTTP headers and authentication payload(as specified by the exchange's API documentation)

Some arguments tend to include:

Depending on the specific exchange, different information may be needed for authentication. Typically, the Auth class will:

This module is typically required for centralized exchange only. Generally, auth for DEXs is handled by the respective wallet.

File: *_order_book_tracker.py — REQUIRED

Each Exchange/Derivative class contains an OrderBookTracker to maintain a real-time order book of one/multiple trading pairs and is responsible for applying the order book snapshots and diff messages to the corresponding OrderBook.

File: *_user_stream_tracker.py — OPTIONAL

Each Exchange/Derivative class contains a UserStreamTracker, to maintain the current state of the user's account, orders and positions.

File: *_order_book_data_source.py — REQUIRED

The OrderBookTrackerDataSource class is responsible for order book data retrieval. It simply collects, parses, and queues the data stream to be processed by OrderBookTracker. Generally, this would mean pulling data from the exchange's API/WebSocket servers. For Perpetual connectors, the OrderBookTrackerDataSource is also tasked with maintaining the funding information of the active market.

It is necessary to track the timestamp/nonce of each message received from the exchange API servers to maintain a consistent and up-to-date order book. Depending on the exchange responses, we can keep an order book in the following ways:

It is important that the order book being maintained reflects all changes and is consistent with the order book on the exchange. As a safeguard/fallback, in the event when Hummingbot is unable to adequately maintain the order book, executing periodic order book snapshot requests can help to ensure that any deltas missed would be corrected.

File: *_user_stream_data_source.py — OPTIONAL

The UserStreamTrackerDataSource class deals with user data retrieval. It simply collects, parses and queues the data stream to be processed by UserStreamTracker.

Unlike OrderBookTrackerDataSource, UserStreamTrackerDataSource only retrieves data about user account balances and orders.

File: /hummingbot/core/data_type/in_flight_order.py

Stores all details pertaining to the current state of an order.

It is important to keep a consistent and accurate state of all active orders placed by the user. This ensures that the strategies are given the correct information and are able to perform their tasks accordingly.

File: /hummingbot/connector/client_order_tracker.py

An instance of ClientOrderTracker holds and manages InFlightOrders by calling the connector's trigger_event method.

Provides utilities for connectors to update in-flight orders and to handle order errors.

The BudgetChecker uses the information from a TradeFeeSchema to generate a specific instance of TradeFeeBase that is then applied to an OrderCandidate in order to asses the order's effects on account balances.

The TradeFee object contains the necessary information to account for fees when estimating an order's impact on account balances.

Example: TradeFee from hummingbot.client.settings import AllConnectorSettings trade_fee_schema = AllConnectorSettings.get_connector_settings()[exchange].trade_fee_schema percent = trade_fee_schema.maker_percent_fee_decimal if is_maker else trade_fee_schema.taker_percent_fee_decimal fixed_fees = trade_fee_schema.maker_fixed_fees if is_maker else trade_fee_schema.taker_fixed_fees trade_fee = AddedToCostTradeFee(percent, trade_fee_schema.percent_fee_token, fixed_fees)

Contains the necessary information to build the TradeFee object.

For both makers and takers specifies percent and fixed fees, and tokens in which the fees are paid.

Exchanges must specify their respective default schemas inside their [exchange]_utils.py files: DEFAULT_FEES = TradeFeeSchema( maker_percent_fee_decimal=Decimal("0.001"), taker_percent_fee_decimal=Decimal("0.001") )

Example: TradeFeeSchema trade_fee_schema = TradeFeeSchema( maker_percent_fee_decimal=Decimal("1.0"), taker_percent_fee_decimal=Decimal("2.3") )

A specific instance of the TradeFeeBase class defines the fees to be applied to an order - their types, amounts and assets.

Extends TradeFeeBase, implements get_fee_impact_on_order_cost(), get_fee_impact_on_order_returns().

Fees of this class are applied on top of the cost of a buy order (e.g. a buy order of 10 COINX at 9 USDT with a fee of 1% means that the user's account will be deducted 90.9 USDT and added 10 COINX — this is most exchanges' approach to fees).

Extends TradeFeeBase, implements get_fee_impact_on_order_cost(), get_fee_impact_on_order_returns().

Fees of this class are deducted from the returns of a buy order (e.g. a buy order of 10 COINX at 9 USDT with a fee of 1% means that the user's account will be deducted 90 USDT and added 9.9 COINX — this is Binance's approach to fees).

**Examples:**

Example 1 (python):
```python
from hummingbot.client.settings import AllConnectorSettings

trade_fee_schema = AllConnectorSettings.get_connector_settings()[exchange].trade_fee_schema

percent = trade_fee_schema.maker_percent_fee_decimal if is_maker else trade_fee_schema.taker_percent_fee_decimal
fixed_fees = trade_fee_schema.maker_fixed_fees if is_maker else trade_fee_schema.taker_fixed_fees

trade_fee = AddedToCostTradeFee(percent, trade_fee_schema.percent_fee_token, fixed_fees)
```

Example 2 (unknown):
```unknown
DEFAULT_FEES = TradeFeeSchema(
    maker_percent_fee_decimal=Decimal("0.001"),
    taker_percent_fee_decimal=Decimal("0.001")
)
```

Example 3 (unknown):
```unknown
trade_fee_schema = TradeFeeSchema(
    maker_percent_fee_decimal=Decimal("1.0"),
    taker_percent_fee_decimal=Decimal("2.3")
)
```
