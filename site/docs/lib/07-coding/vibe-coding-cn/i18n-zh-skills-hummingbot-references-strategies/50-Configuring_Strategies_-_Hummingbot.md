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
pageSha256: "8282389729f667ee40740066cd2e5e9e81d753cc4e80ff9917e432fce87fe7df"
contentMode: "local-full"
zh: ""
---

## Configuring Strategies - Hummingbot

**URL:** https://hummingbot.org/dashboard/config/

**Contents:**
- Config Generator¶
- PMM Simple¶
- PMM Dynamic¶
- D-Man Maker V2¶
- Bollinger V1¶
- MACD BB V1¶
- SuperTrend V1¶
- XEMM Controller¶

Here's a detailed explanation of the different controllers available for configuration in the Hummingbot Dashboard:

The PMM Simple controller in Hummingbot Dashboard implements a basic Pure Market Making strategy. It allows users to provide liquidity by placing both buy and sell orders around the mid-market price. Key features include:

The PMM Dynamic controller in Hummingbot Dashboard implements a superset of the A+S strategy. Features include:

The D-Man Maker V2 controller is designed for more advanced market making strategies, integrating various technical indicators and risk management tools. Key features include:

The Bollinger V1 controller utilizes Bollinger Bands for its trading strategy. Bollinger Bands are a type of statistical chart characterizing the prices and volatility over time of a financial instrument. Key features include:

The MACD BB V1 controller combines the Moving Average Convergence Divergence (MACD) indicator with Bollinger Bands. This strategy aims to leverage the strengths of both indicators for more robust trading signals. Key features include:

The SuperTrend V1 controller uses the SuperTrend indicator to guide its trading decisions. The SuperTrend indicator is a trend-following tool that helps identify the prevailing direction of the market. Key features include:

The XEMM Controller (Cross-Exchange Market Making) in Hummingbot Dashboard is designed to exploit price discrepancies across different exchanges. Key features include:
