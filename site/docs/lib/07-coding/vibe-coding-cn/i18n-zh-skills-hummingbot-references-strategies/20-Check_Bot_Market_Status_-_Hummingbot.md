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
pageSha256: "16f673b16ba9fb396196e45aea096651cd00ddec3b4718daafca17e4dfb55fe6"
contentMode: "local-full"
zh: ""
---

## Check Bot/Market Status - Hummingbot

**URL:** https://hummingbot.org/client/status/

**Contents:**
- Check Bot and Market Status¶
- Check bot status¶
- Get live bot status¶
- View market order book¶
- View market ticker prices¶
- status¶

Run status command or CTRL+S to show the bot's current status. The output may differ depending on the running strategy, but generally, it shows the following information:

The status --live command displays the real-time status of the bot.

Currently, this feature works on all strategies except liquidity mining strategy.

By default, the order_book command displays the top 5 bid/ask prices and volume of the current market, similar to how they're displayed in the exchange's order book.

Run order_book --live --lines 20 to show the top 20 bid/ask and volume in real-time.

The ticker command displays the market prices, specifically the best bid, best ask, mid price, and last trade price.

Get the market status of the current bot.

**Examples:**

Example 1 (unknown):
```unknown
>>>  status

  Markets:
    Exchange  Market  Best Bid Price  Best Ask Price  Mid Price
     binance  ETHBTC        0.025521        0.025527   0.025524

  Assets:
                            ETH    BTC
     Total Balance       4.3725 0.1274
     Available Balance   3.3725 0.1021
     Current Value (BTC) 0.1116 0.1274
     Current %            46.7%  53.3%

  Orders:
     Level  Type      Price Spread  Amount (Orig)  Amount (Adj)       Age Hang
         1  sell  0.0257747  0.98%              1             1  00:00:02   no
         1   buy 0.02526431  1.02%              1             1  00:00:02   no

**Optional arguments**

| Command Argument            | Description                                                  |
| --------------------------- | ------------------------------------------------------------ |
| `-live`                     | Displays status in real time.                                |
```
