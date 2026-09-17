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
pageSha256: "c8cb802aa129837c34c71e32381324828dbec9ad667659e1776995867d676b6f"
contentMode: "local-full"
zh: ""
---

## Market Data Provider - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/data/

**Contents:**
- Market Data Provider
- Price¶
- Volume¶
- Order Book¶
- Candles¶

The Market Data Provider service simplifies access to real-time market data with the following methods.

Any scripts can instantiate the Market Data Provider:

Below are a some methods that it contains. Each method receives the connector name, trading pair, and other arguments that can be defined as config parameters.

Candles are trailing intervals of OHCLV data that can be used to generate custom indicators.

**Examples:**

Example 1 (python):
```python
from hummingbot.data_feed.market_data_provider import MarketDataProvider
```

Example 2 (python):
```python
def get_price_by_type(self, connector_name: str, trading_pair: str, price_type: PriceType):
        """
        Retrieves the price for a trading pair from the specified connector.
        :param connector_name: str
        :param trading_pair: str
        :param price_type: str
        :return: Price instance.
        """
        connector = self.get_connector(connector_name)
        return connector.get_price_by_type(trading_pair, price_type)
```

Example 3 (unknown):
```unknown
price = self.market_data_provider.get_price_by_type('binance', 'BTC-USDT', PriceType.MidPrice)
```

Example 4 (python):
```python
def get_price_for_volume(self, connector_name: str, trading_pair: str, volume: float,
                             is_buy: bool) -> OrderBookQueryResult:
        """
        Gets the price for a specified volume on the order book.

        :param connector_name: The name of the connector.
        :param trading_pair: The trading pair for which to retrieve the data.
        :param volume: The volume for which to find the price.
        :param is_buy: True if buying, False if selling.
        :return: OrderBookQueryResult containing the result of the query.
        """

        order_book = self.get_order_book(connector_name, trading_pair)
        return order_book.get_price_for_volume(is_buy, volume)
```
