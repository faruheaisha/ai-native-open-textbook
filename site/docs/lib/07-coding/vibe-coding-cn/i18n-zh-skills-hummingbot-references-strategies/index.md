---
title: "Hummingbot - Strategies"
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
pageSha256: "8c7cfa1a97788190fb33d4c8b20ce712682408f3b0319dd2856bd99be9367a92"
contentMode: "local-full"
zh: ""
---

# Hummingbot - Strategies

**Pages:** 73

---

## 本篇目录

- [1.20.0 - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/01-1.20.0_-_Hummingbot.md)
- [Controllers - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/02-Controllers_-_Hummingbot.md)
- [Cross-Exchange Market Making (XEMM) - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/03-Cross-Exchange_Market_Making_XEMM_-_Humm.md)
- [Strategies - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/04-Strategies_-_Hummingbot.md)
- [Index - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/05-Index_-_Hummingbot.md)
- [Liquidity Mining - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/06-Liquidity_Mining_-_Hummingbot.md)
- [Key concepts - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/07-Key_concepts_-_Hummingbot.md)
- [Command Line Autostart - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/08-Command_Line_Autostart_-_Hummingbot.md)
- [1.24.0 - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/09-1.24.0_-_Hummingbot.md)
- [Strategies & Snippets - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/10-Strategies_Snippets_-_Hummingbot.md)
- [Candles - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/11-Candles_-_Hummingbot.md)
- [Quants Lab - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/12-Quants_Lab_-_Hummingbot.md)
- [Arbitrage Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/13-Arbitrage_Executor_-_Hummingbot.md)
- [Architecture - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/14-Architecture_-_Hummingbot.md)
- [Hanging Orders - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/15-Hanging_Orders_-_Hummingbot.md)
- [Market Data Provider - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/16-Market_Data_Provider_-_Hummingbot.md)
- [Scripts Cheatsheat - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/17-Scripts_Cheatsheat_-_Hummingbot.md)
- [Command Line Autostart - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/18-Command_Line_Autostart_-_Hummingbot.md)
- [Position Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/19-Position_Executor_-_Hummingbot.md)
- [Check Bot/Market Status - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/20-Check_Bot_Market_Status_-_Hummingbot.md)
- [AMM Arbitrage - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/21-AMM_Arbitrage_-_Hummingbot.md)
- [Spot Perpetual Arbitrage - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/22-Spot_Perpetual_Arbitrage_-_Hummingbot.md)
- [Cross-Exchange Mining - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/23-Cross-Exchange_Mining_-_Hummingbot.md)
- [TWAP Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/24-TWAP_Executor_-_Hummingbot.md)
- [Max Order Age - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/25-Max_Order_Age_-_Hummingbot.md)
- [AMM Arbitrage - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/26-AMM_Arbitrage_-_Hummingbot.md)
- [Executors - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/27-Executors_-_Hummingbot.md)
- [Pure Market Making (PMM) - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/28-Pure_Market_Making_PMM_-_Hummingbot.md)
- [Strategies - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/29-Strategies_-_Hummingbot.md)
- [Start Strategies and Scripts - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/30-Start_Strategies_and_Scripts_-_Hummingbo.md)
- [Architecture - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/31-Architecture_-_Hummingbot.md)
- [Scripts - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/32-Scripts_-_Hummingbot.md)
- [Strategies & Snippets - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/33-Strategies_Snippets_-_Hummingbot.md)
- [XEMM Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/34-XEMM_Executor_-_Hummingbot.md)
- [DCA Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/35-DCA_Executor_-_Hummingbot.md)
- [1.26.0 - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/36-1.26.0_-_Hummingbot.md)
- [Tutorial - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/37-Tutorial_-_Hummingbot.md)
- [Hedge - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/38-Hedge_-_Hummingbot.md)
- [Candles - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/39-Candles_-_Hummingbot.md)
- [Index - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/40-Index_-_Hummingbot.md)
- [Cross-Exchange Market Making (XEMM) - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/41-Cross-Exchange_Market_Making_XEMM_-_Humm.md)
- [Backtesting Strategies - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/42-Backtesting_Strategies_-_Hummingbot.md)
- [Cross-Exchange Mining - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/43-Cross-Exchange_Mining_-_Hummingbot.md)
- [Clock Tick Size - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/44-Clock_Tick_Size_-_Hummingbot.md)
- [Controllers - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/45-Controllers_-_Hummingbot.md)
- [Index - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/46-Index_-_Hummingbot.md)
- [Rate Oracle - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/47-Rate_Oracle_-_Hummingbot.md)
- [Index - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/48-Index_-_Hummingbot.md)
- [Spot Perpetual Arbitrage - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/49-Spot_Perpetual_Arbitrage_-_Hummingbot.md)
- [Configuring Strategies - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/50-Configuring_Strategies_-_Hummingbot.md)
- [Start Strategies and Scripts - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/51-Start_Strategies_and_Scripts_-_Hummingbo.md)
- [Strategies V1 - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/52-Strategies_V1_-_Hummingbot.md)
- [TWAP - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/53-TWAP_-_Hummingbot.md)
- [Strategies V1 - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/54-Strategies_V1_-_Hummingbot.md)
- [Perpetual Market Making - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/55-Perpetual_Market_Making_-_Hummingbot.md)
- [Script Walkthrough - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/56-Script_Walkthrough_-_Hummingbot.md)
- [Scripts - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/57-Scripts_-_Hummingbot.md)
- [Walkthrough controller - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/58-Walkthrough_controller_-_Hummingbot.md)
- [Avellaneda Market Making - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/59-Avellaneda_Market_Making_-_Hummingbot.md)
- [Tutorial - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/60-Tutorial_-_Hummingbot.md)
- [Position Executor - Hummingbot](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/hummingbot/references/61-Position_Executor_-_Hummingbot.md)
