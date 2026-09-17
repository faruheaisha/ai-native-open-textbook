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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "f7acb28fd40c66ea11da88245335aae50fdba463f20f145ab2aebb137b874a20"
contentMode: "local-full"
zh: ""
---

## Methodology

Polymarket liquidity providers will be rewarded based on a formula that rewards participation in markets (complementary consideration!), boosts two-sided depth (single-sided orders still score), and spread (vs. mid-market, adjusted for the size cutoff!). Each market still configure a max spread and min size cutoff within which orders are considered the average of rewards earned is determined by the relative share of each participant's Q<sub>n</sub> in market m.

| Variable       | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| \$             | order position scoring function                                  |
| v              | max spread from midpoint (in cents)                              |
| s              | spread from size-cutoff-adjusted midpoint                        |
| b              | in-game multiplier                                               |
| m              | market                                                           |
| m'             | market complement (i.e NO if m = YES)                            |
| n              | trader index                                                     |
| u              | sample index                                                     |
| c              | scaling factor (currently 3.0 on all markets)                    |
| Q<sub>ne</sub> | point total for book one for a sample                            |
| Q<sub>no</sub> | point total for book two for a sample                            |
| Spread%        | distance from midpoint (bps or relative) for order n in market m |
| BidSize        | share-denominated quantity of bid                                |
| AskSize        | share-denominated quantity of ask                                |
