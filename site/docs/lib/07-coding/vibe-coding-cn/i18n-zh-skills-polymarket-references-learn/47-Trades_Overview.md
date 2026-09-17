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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/learn.md"
sourceRel: "i18n/zh/skills/polymarket/references/learn.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/learn.md"
sourceSha256: "7c4ec0ea55ae27ce367a9d1986e4f0bc407b2b03ed70d46936adcee4ea22bde2"
pageSha256: "68f0151162a1d98ee47988c01d740c25c015acffb4dfc73918497ba8ee9cdd5b"
contentMode: "local-full"
zh: ""
---

## Trades Overview

**URL:** llms-txt#trades-overview

**Contents:**
- Overview
- Statuses

Source: https://docs.polymarket.com/developers/CLOB/trades/trades-overview

All historical trades can be fetched via the Polymarket CLOB REST API. A trade is initiated by a "taker" who creates a marketable limit order. This limit order can be matched against one or more resting limit orders on the associated book. A trade can be in various states as described below. Note: in some cases (due to gas limitations) the execution of a "trade" must be broken into multiple transactions which case separate trade entities will be returned. To associate trade entities, there is a bucket\_index field and a match\_time field. Trades that have been broken into multiple trade objects can be reconciled by combining trade objects with the same market\_order\_id, match\_time and incrementing bucket\_index's into a top level "trade" client side.

| Status    | Terminal? | Description                                                                                                                                               |
| --------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MATCHED   | no        | trade has been matched and sent to the executor service by the operator, the executor service submits the trade as a transaction to the Exchange contract |
| MINED     | no        | trade is observed to be mined into the chain, no finality threshold established                                                                           |
| CONFIRMED | yes       | trade has achieved strong probabilistic finality and was successful                                                                                       |
| RETRYING  | no        | trade transaction has failed (revert or reorg) and is being retried/resubmitted by the operator                                                           |
| FAILED    | yes       | trade has failed and is not being retried                                                                                                                 |
