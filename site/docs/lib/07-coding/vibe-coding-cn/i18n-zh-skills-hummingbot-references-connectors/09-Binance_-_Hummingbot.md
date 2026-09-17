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
pageSha256: "ffb5107fb9007dc9e686221c8c922e414b1415aa2a1140660df5335a6b382e16"
contentMode: "local-full"
zh: ""
---

## 🔥 Binance - Hummingbot

**URL:** https://hummingbot.org/exchanges/binance

**Contents:**
- 🔥 Binance
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
- 🔀 Spot Connector¶
  - Order Types¶
  - Paper Trading¶
- 🔀 Perp Connector¶
  - Usage¶
  - Order Types¶

Binance is an exchange partner of Hummingbot Foundation, so when you use Hummingbot to run bots on Binance, a portion of your fees goes to support the Foundation and our mission to democratize algo trading with open source software. To enable this, create an account using our Binance referral link and enter that account's API keys into Hummingbot and run bots! Thanks for your support! 🙏

See the Binance Connector Guide for details on create API keys on Binance.

From inside the Hummingbot client, run connect binance:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Access the Paper Trade version of this connector by running connect binance_paper_trade instead of connect binance.

If this is not available by default, you can configure Hummingbot to add this paper trade exchange. See Adding Exchanges for more information.

Integration to perpetual futures markets API endpoints

From inside the Hummingbot client, run connect binance_perpetual:

If connection is successful:

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://testnet.binancefuture.com

Afer you create an account and create the API keys, you can enter them by using the connect binance_perpetual_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available perpetual strategies / scripts.

OHLCV candles data collector from spot markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="binance", trading_pair="ETH-USDT", interval="1m", max_records=50)

See candles_example.py for more details.

OHLCV candles data collector from perpetual futures markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="binance_perpetual", trading_pair=trading_pair, interval="3m", max_records=50)

See candles_example.py for more details.

**Examples:**

Example 1 (unknown):
```unknown
>>> connect binance

Enter your binance API key >>>
Enter your binance secret key >>>
```

Example 2 (unknown):
```unknown
You are now connected to binance
```

Example 3 (unknown):
```unknown
>>> connect binance_perpetual

Enter your binance_perpetual API key >>>
Enter your binance_perpetual secret key >>>
```

Example 4 (unknown):
```unknown
You are now connected to binance_perpetual
```
