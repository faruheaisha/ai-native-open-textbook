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
pageSha256: "1d3d1d049db83a71d018f18f0d2e9a7988d719e562dcd5bac66bb6eb81513451"
contentMode: "local-full"
zh: ""
---

## Paper Trade - Hummingbot

**URL:** https://hummingbot.org/global-configs/paper-trade

**Contents:**
- Paper Trade
- Adding Exchanges¶
- Enabling and Disabling¶
- Adding Paper Trade Balance¶

This feature allows users to test Hummingbot and simulate trading strategies without risking any actual assets.

Exchange APIs are not required to run the bot on paper_trade for Pure Market making, Cross Exchange Market Making and Avellaneda Market Making.

Users can now add paper exchanges by adding the exchange of choice in conf_client.yml. Previously, it was only available for AscendEX, Binance, Gate io, and Kucoin. Users can find conf_client.yml in hummingbot/conf/conf_client.yml

Add the paper trade exchange, for example kraken, to conf_client.yml:

In the Hummingbot client, kraken_paper_trade should now be available when you select an exchange:

Enter your maker spot connector >>> kraken_paper_trade

Paper trading can be enabled when creating a strategy and choosing an exchange when prompted Enter your maker spot connector during the creation of the strategy.

Alternatively, you can enable paper trading by inputting config exchange then choose the exchange that supports paper trade.

To choose a different connector and go live, simply choose the exchange name without the paper_trade suffix then do the command stop and start so the changes will reflect on your configuration.

By default, the paper trade account has the following tokens and balances which you can see when you run the balance paper command.

When adding balances, specify the asset and balance you want by running this command balance paper [asset] [amount].

For example, we want to add 0.5 BTC and check our paper account balance to confirm.

**Examples:**

Example 1 (unknown):
```unknown
paper_trade:
  paper_trade_exchange:
    - binance
    - kucoin
    - ascend_ex
    - gate_io
    - kraken
```

Example 2 (unknown):
```unknown
>>>  balance paper
Paper account balances:
    Asset    Balance
      DAI  1000.0000
      ETH    10.0000
      ONE  1000.0000
     TUSD  1000.0000
     USDC  1000.0000
     USDQ  1000.0000
     USDT  1000.0000
     WETH    10.0000
      ZRX  1000.0000
```

Example 3 (unknown):
```unknown
>>>  balance paper BTC 0.5
Paper balance for BTC token set to 0.5

>>>  balance paper
Paper account balances:
    Asset    Balance
      BTC     0.5000
      DAI  1000.0000
      ETH    10.0000
      ONE  1000.0000
     TUSD  1000.0000
     USDC  1000.0000
     USDQ  1000.0000
     USDT  1000.0000
     WETH    10.0000
      ZRX  1000.0000
```
