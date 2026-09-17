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
pageSha256: "4b6f4b4ec41db6a659f458055208180c68c31d07ae3dc2031d31093a37260c3f"
contentMode: "local-full"
zh: ""
---

## Rate Oracle - Hummingbot

**URL:** https://hummingbot.org/strategy-configs/rate-oracle/

**Contents:**
- Rate Oracle
- Parameters¶
  - rate_oracle_source¶
  - global_token.global_token_name¶
  - global_token.global_token.global_token_symbol¶
- How it works¶

This new feature provides real time, most up-to-date exchange rate on any given token or currency from a reliable and trustworthy data source.

Use rate oracle with the cross exchange market making and arbitrage strategies.

The source where you want to pull data from, it can either be Binance, Coingecko, Kucoin or Ascendex. Please take note that using Coingecko will have a 30-second delay due to their API rate limit.

This is a token which you can display other tokens' value in. Set the global_token.global_token_name according to your preferred token value.

The symbol for the global token.

If you happen to start the bot and produce the error Oracle rate is not available, or ff the rate_oracle_source fails to show any price reference on your pair, you may change the oracle_source by running config rate_oracle_source and switch between Binance, Coingecko, Kucoin or Ascendex.

If you need to view the rate oracle conversion after the balance, pnl, open_orders, trades, and status command, set it manually in the conf_client.yml.

In past versions of Hummingbot (1.5.0 and below), the conf_client.yml file is named conf_global.yml

To set the parameters for rate_oracle_source, global_token.global_token_name and global_token.global_token_symbol, run the config command.

Refer to the example below:

Change the default setting in conf_client.yml to GBP (Great Britain Pound). The conversion will show up when you run balance command.

The conversion also shows up during the status command for the liquidity_mining strategy. Under the Miner section.

The conversion shows up when using the pnl command.

The conversion also shows up when running the trades command.

The conversion also works with the open_orders command.

**Examples:**

Example 1 (unknown):
```unknown
What source do you want rate oracle to pull data from? (binance, coingecko, kucoin, ascend_ex)"
>>>
```

Example 2 (unknown):
```unknown
What is your default display token? (e.g. USDT,USD,EUR)
>>>
```

Example 3 (unknown):
```unknown
What is your default display token symbol? (e.g. $, €)
>>>
```
