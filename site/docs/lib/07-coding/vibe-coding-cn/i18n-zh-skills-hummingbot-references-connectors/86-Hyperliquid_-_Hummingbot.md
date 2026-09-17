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
pageSha256: "8f0e0fce19249b2b9cd13cc2aeda7be4b9107d75d93a23f316f5308cde6d10ff"
contentMode: "local-full"
zh: ""
---

## 🔥 Hyperliquid - Hummingbot

**URL:** https://hummingbot.org/exchanges/hyperliquid/

**Contents:**
- 🔥 Hyperliquid
- 🛠 Connector Info¶
- ℹ️ Exchange Info¶
- 🔑 How to Connect¶
  - Add Keys to Hummingbot¶
- 🔀 Spot Connector¶
  - Order Types¶
- 🔀 Perp Connector¶
  - Usage¶
  - Order Types¶

Hyperliquid is a sponsor of Hummingbot Foundation, so when you use Hummingbot to run bots on Hyperliquid, you're supporting the Foundation and our mission to democratize algo trading with open source software.

See the Hyperliquid Vault Guide for more details on how to use Hyperliquid VauLts.

From inside the Hummingbot client, run connect hyperliquid in Hummingbot in order to connect your wallet:

If connection is successful:

Integration to spot markets API endpoints

This connector supports the following OrderType constants:

Integration to perpetual futures markets API endpoints

From inside the Hummingbot client, run connect hyperliquid_perpetual:

If connection is successful:

This connector supports the following OrderType constants:

This connector supports the following position modes:

This perp exchange offers a paper trading mode: https://app.hyperliquid-testnet.xyz/trade

Afer you create an account and create the API keys, you can enter them by using the connect hyperliquid_perpetual_testnet command within the Hummingbot client. Once connected, you should be able to use the testnet with the available perpetual strategies / scripts.

OHLCV candles data collector from spot markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="hyperliquid", trading_pair="ETH-USDC", interval="1m", max_records=50)

OHLCV candles data collector from perpetual futures markets

In a Hummingbot script, import CandlesFactory to create the candles that you want: from hummingbot.data_feed.candles_feed.candles_factory import CandlesFactory candles = CandlesFactory.get_candle(connector="hyperliquid_perpetual", trading_pair=trading_pair, interval="3m", max_records=50)

**Examples:**

Example 1 (javascript):
```javascript
Enter your Arbitrum wallet address >>>
Enter your Arbitrum wallet private key >>>
```

Example 2 (unknown):
```unknown
You are now connected to hyperliquid.
```

Example 3 (unknown):
```unknown
>>> connect hyperliquid_perpetual
```

Example 4 (javascript):
```javascript
Enter your Arbitrum wallet address >>>
Enter your Arbitrum wallet private key >>>
```
