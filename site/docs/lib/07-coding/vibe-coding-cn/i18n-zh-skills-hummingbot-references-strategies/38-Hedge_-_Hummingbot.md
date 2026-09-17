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
pageSha256: "baf3507d3404917d33455e7f3090bd235412b2e19d606fefe4f53269eee7a854"
contentMode: "local-full"
zh: ""
---

## Hedge - Hummingbot

**URL:** https://hummingbot.org/strategies/hedge

**Contents:**
- hedge¶
- 📁 Strategy Info¶
- 📝 Summary¶
- 🏦 Exchanges supported¶
- 🛠️ Strategy configs¶
- 📓 Description¶
- ℹ️ More Resources¶

This strategy allows you to hedge a market making strategy by automatically opening an opposite positions on another perp exchange or spot exchange. Configs like hedge_ratio allow you to customize how much to hedge. Users are expected to run this strategy alongside another market making strategy.

This strategy was the winning submission in the dYdX hackathon.

The description below is a general approximation of this strategy. Please inspect the strategy code in Trading Logic above to understand exactly how it works.

By leastchaos - see original pull request

This strategy contains 2 mode of hedging.

The strategy will hedge by amount by calculating the amount to hedge by each asset. The amount of asset to hedge is calculated by the following formula: for each asset in the hedge market pair, amount_to_hedge = sum of asset amount with the same base asset * hedge_ratio + hedge asset amount The amount of asset to hedge must be greater than the minimum trade size to be traded.

The strategy will hedge by value by calculating the amount of asset to hedge. The amount of asset to hedge is calculated by the following formula: amount_to_hedge = sum of asset value of all market pairs * hedge_ratio + hedge asset value The amount of asset to hedge must be greater than the minimum trade size to be traded.

On every hedge_interval seconds,

Sample Use Case Examples

For E.g, there might be some correlation for some basket of tokens (FEAR, ODDZ, DAFI (random examples only)) with ETH prices. So you can choose to hedge the value of this basket token you hold with a short position on ETH to reduce the inventory risk on the basket of tokens. So when you are market making with this position, it will help you to automatically short a defined ratio on the perpetual market so that if the overall market goes down, part of the loss can be mitigated by the short position in ETH.

You can set a fixed offset value/amount and the bot will maintain the amount of asset/position you hold at the offset level at every interval.

The videos below may be obsolete since they are based on the v0.45.0 version of the strategy

Hedge in Market Making | Trader Strategies | Part 01

Hedge & Risk Management | Trader Strategies | Part 02

Hedge in Market Making using dYdX Perpetuals | Trader Strategies | Part 03
