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
pageSha256: "b1bc4785cf0771bde28b6196eb0a97fa339c58dcd4e9a5d0ecafd81a82ec61ac"
contentMode: "local-full"
zh: ""
---

## Script Walkthrough - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/walkthrough/

**Contents:**
- Script Walkthrough
- What we'll cover¶
- Create script config¶
- Run the script¶
- Check status and performance¶
- Next steps¶

Below, we provide a walkthrough to illustrate the StrategyV2 framework, which we recommend for new users who want to understand how the framework works.

In this example, we'll show you how to configure and run a simple directional trading strategy using the v2_directional_rsi.py starter script.

This strategy executes trades on a spot or perpetual exchange based on the RSI signals from the Market Data Provider, creating buy actions when the RSI is below a low threshold (indicating oversold conditions) and sell actions when the RSI is above a high threshold (indicating overbought conditions).

After each trade, the strategy utilizes the Position Executor component, which uses a triple barrier configuration to manage the P&L of the position or filled order.

First, let's create a script config file that defines the key strategy parameters.

Launch Hummingbot and execute the command below to generate your script configuration:

This command auto-completes with the subset of configurable scripts from the local /scripts directory.

You'll be prompted to specify the strategy parameters, which are then saved in a YAML file within the conf/scripts directory:

Execute the command below to start the script:

The strategy makes a series of market checks and initializes the market data provider. Afterwards, it should start placing orders for both pairs.

Run the Status command to see the status (asset balances, active orders and positions) of the running strategy:

After there have been trades, you can use the History to see your bot's performance.

We encourage you check out Dashboard, the new entry point for Hummingbot users that will be officially launched at the Hummingbot 2.0 launch event.

Also, see Walkthrough - Controller to learn how to run scripts that deploy strategies as Controllers.

**Examples:**

Example 1 (unknown):
```unknown
create --script-config v2_directional_rsi
```

Example 2 (unknown):
```unknown
Exchange where the bot will trade >> hyperliquid_perpetual
Trading pair where the bot will trade >> ETH-USD
Candles exchange used to calculate RSI >> binance_perpetual
Candles trading pair used to calculate RSI >> ETH-USDT
Candle interval (e.g. 1m for 1 minute) >> 1m
Number of candles used to calculate RSI (e.g. 60) >> 60
RSI lower bound to enter long position (e.g. 30) >> 30
RSI upper bound to enter short position (e.g. 70) >> 70
Order amount in quote asset >> 30
Leverage (e.g. 10 for 10x) >> 10
Position mode (HEDGE/ONEWAY) >> ONEWAY
Enter a new file name for your configuration >> conf_v2_directional_rsi_1.yml
```

Example 3 (unknown):
```unknown
start --script v2_directional_rsi.py --conf conf_v2_directional_rsi_1.yml
```
