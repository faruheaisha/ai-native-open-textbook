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
pageSha256: "36ce2d96bf665ad649c41bf2811e3d8f28c911dd26dff6e7cb9c29dc01e5d490"
contentMode: "local-full"
zh: ""
---

## Backtesting Strategies - Hummingbot

**URL:** https://hummingbot.org/dashboard/backtest/

**Contents:**
- Backtesting Strategies¶
- Strategy Configuration¶
- Run Backtesting¶
- Upload Config to Backend API¶

The Backtesting section in the Hummingbot Dashboard is a powerful tool available on all controller pages, allowing users to evaluate the performance of their trading strategies using historical market data.

This feature provides crucial insights into how a strategy would have performed in the past, helping users refine and optimize their configurations before deploying them in a live trading environment.

Select Connector: Choose the exchange (e.g., Binance).

Select Trading Pair: Specify the pair to trade (e.g., BTC-USDT).

Set Parameters: Configure leverage, total quote amount, position mode, and other relevant parameters.

Order Settings: Define buy and sell order levels, spread, and amount distribution.

Graphical Representation:

PNL Quote Chart: Shows the profit and loss over time.

You can return to the configuration page to make adjustments and re-run the backtesting as needed. Once satisfied with the results, you can upload the configuration for deployment.

Create a name for the current config

The Config Tag is similar to a version number which allows you to track changes made to the strategy config later on.

Click the Upload button to save the configuration. This makes it available on the Deploy V2 page, where you can create instances based on the saved configuration.

---

## 

**URL:** https://hummingbot.org/v2-strategies/examples/status-trend-follower.png
