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
pageSha256: "8d85d228c2b32e4cc8bd17fdc1ad2d6927230c9edd2733c52c9c4a7176b508f9"
contentMode: "local-full"
zh: ""
---

## Exchange API Requirements - Hummingbot

**URL:** https://hummingbot.org/developers/connectors/build

**Contents:**
- Exchange API Requirements
- API requirements¶
  - Additional requirements for perp connectors¶
- Components¶
  - Authorization¶
  - Utils¶
  - Order Book¶
  - Order Book Data Source¶
  - User Stream Data Source¶
  - Connector¶

The information below are for developers building spot and perp connectors that integrate directly into the Hummingbot client. For information on developing gateway connectors that use Gateway, see Building Gateway Connectors.

Exchanges with REST APIs must provide:

It is useful if the REST API provides the following, but a connector can be built without them:

Exchanges with WebSocket APIs must provide:

It would be useful if the Websocket API also provides the following, but a connector can be built without them:

Below, we describe the components that need to be implemented to create a new connector. Some components can be implemented in parallel, but others have dependencies.

Class that provides the logic for the web assistant to correctly configure authenticated requests to the exchange (private endpoint). It should be a subclass of AuthBase

Example: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_auth.py

The Utils module is generally used to define functions that are used in several components from the connector. There is no need to add functions if the connector does not require special behavior when creating requests or does not have a special logic to generate order ids.

It is required to define in this module the configuration for the connector, including: - Default fees - Required parameters to establish a connection (for example the API Key and API secret).

The configurations have to be specified for each domain the connector will support (all connectors can handle multiple domains if configured correctly)

Example: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_utils.py

Subclass of OrderBook to define specialized methods to create the snapshot messages, difference messages and trade messages based on the events received by the data source

Example: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_order_book.py

Subclass of OrderBookTrackerDataSource. It includes all the logic related to receiving updates through websocket for all public channels. The class should include: - Logic to provide the latest prices in the exchange for some one or more trading pairs - Logic to return all supported trading pairs (filtering out for example any pair that could be disabled in the exchange) - Functionality to translate trading pairs from exchange notation to the client notation, and the other way around - Method to get a full copy of the current order book for a particular trading pair - Logic to subscribe to the required public channels, and process all events received. The required channels would be: order book differences and public trades events. It also requires a method to regularly do a full update of the order book (snapshot).

A tracker class has to be created for the connector (subclass of OrderBookTracker) to start the background process that receives the events and updates.

Example: - https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_api_order_book_data_source.py - https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_order_book_tracker.py

Dependencies: Order Book (to create diff messages, snapshot messages and trade messages)

Subclass of UserStreamTrackerDataSource

The class should include: - Logic to subscribe to the private websocket channels to receive order updates, trade updates and balances updates - Logic to process each type of event

A tracker class has to be created for the connector (subclass of UserStreamTracker) to start the background process that receives the events and updates.

Subclass of ExchangeBase (for exchange connectors) or ConnectorBase (for Gateway connectors).

Example: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/exchange/binance/binance_exchange.py

In the case of a perpetuals exchange connector, the connector component should subclass also PerpetualTrading, and has to include the following functionality:

Example: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/derivative/binance_perpetual/binance_perpetual_derivative.py

It is expected that all the components mentioned before will have unit tests validating all methods. This is independent from any validation done by QA testing.

All connector unit tests should not depend on active connections to the exchange to perform the validations. Instead, the interactions with the exchange should always be mocked or emulated. That can be done using the aioresponses library for all REST requests, and using the class NetworkMockingAssistant for websocket interactions.

Examples for their use can be found in both Binance and Binance Perpetual connectors' unit tests.

Binance connector tests: https://github.com/hummingbot/hummingbot/tree/master/test/hummingbot/connector/exchange/binance

Binance Perpetual connector tests: https://github.com/hummingbot/hummingbot/tree/master/test/hummingbot/connector/derivative

When an exchange does not provide a websocket endpoint for balance updates, the connector has to be configured to estimate balances based on the connector activity.

As an example, please refer to the Bybit connector: https://github.com/hummingbot/hummingbot/blob/master/hummingbot/connector/derivative/bybit_perpetual/bybit_perpetual_derivative.py

**Examples:**

Example 1 (unknown):
```unknown
self._in_flight_orders_snapshot = {k: copy.copy(v) for k, v in self._in_flight_orders.items()}
self._in_flight_orders_snapshot_timestamp = self.current_timestamp
```
