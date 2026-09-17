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
pageSha256: "787e230eea6a2e5d51e04c47f2e725cb37dc33371b1306a6ee9e862f7199b7f1"
contentMode: "local-full"
zh: ""
---

## Index - Hummingbot

**URL:** https://hummingbot.org/v2-strategies/examples/

**Contents:**
- Index
- Running V2 Strategies¶
- Directional Strategies¶
  - Bollinger V1¶
  - MACD-BB¶
  - Trend Follower¶
- Market Making Strategies¶
  - DmanV1¶
  - DmanV2¶
  - DmanV3¶

The main logic in a V2 strategy is contained in the Controller, which inherits from a base class like Directional or Market Making, that orchestrates various smart components like Candles and Executors to implement the strategy logic.

For users, their primary interface is the V2 Script, a file that defines the configuration parameters and serves as the bridge between the user and the strategy.

To generate a configuration file for a script, run:

The auto-complete for [SCRIPT_FILE] will only display the scripts in the local /scripts directory that are configurable.

You will be prompted to define the strategy parameters, which are saved in a YAML file in the conf/scripts directory. Afterwards, you can run the script by specifying this config file:

The auto-complete for [SCRIPT_CONFIG_FILE] will display config files in the local /conf/scripts directory.

Directional strategies inherit from the DirectionalTrading strategy base class.

In their controller's get_processed_data function, a directional strategy uses technical indicators derived from Candles to define thresholds which trigger long and short conditions using the signal parameter:

Here are the current V2 directional strategies:

A simple directional strategy using Bollinger Band Percent (BBP). BBP measures an asset's price relative to its upper and lower Bollinger Bands, and this strategy uses the current BBP to construct long/short signals.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

In addition, the script may define other parameters that don't have the prompt_on_new flag.

The screenshot below show what is displayed when the status command is run:

A directional strategy that combines MACD and Bollinger Bands to generate long/short signals. This strategy uses MACD for trend identification and Bollinger Bands for volatility and price level analysis.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

In addition, the script may define other parameters that don't have the prompt_on_new flag.

The screenshot below show what is displayed when the status command is run:

A simple trend-following strategy that uses Simple Moving Average (SMA) and Bollinger Bands to construct long/short signals.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

Market making strategies create and manage a set of Position Executors that place orders around a fixed mid price. They inherit from the MarketMaking strategy base class.

Customized market-making script which uses the DMAN v1 controller

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

A simple market making strategy that uses Natural Average True Range (NATR) to set spreads dynamically.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

Mean reversion strategy with Grid execution using Bollinger Bands indicator to make spreads dynamic and shift the mid-price.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

In addition, the script may define other advanced parameters that don't have the prompt_on_new flag.

Directional Market Making Strategy utilizing the NATR indicator to dynamically set spreads and shift the mid-price, enhanced with various advanced configurations for more nuanced control.

Creating a Config File:

User Defined Parameters

Below are the user-defined parameters when the create command is run:

In addition, the script may define other advanced parameters that don't have the prompt_on_new flag.

**Examples:**

Example 1 (unknown):
```unknown
create --script-config [SCRIPT_FILE]
```

Example 2 (unknown):
```unknown
start --script [SCRIPT_FILE] --conf [SCRIPT_CONFIG_FILE]
```

Example 3 (unknown):
```unknown
create --script-config v2_bollinger_v1_config
```

Example 4 (unknown):
```unknown
start --script v2_bollinger_v1_config.py --conf [SCRIPT_CONFIG_FILE]
```
