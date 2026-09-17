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
pageSha256: "d97289ff514b62a0b30e828203dd03ad64fd56dad6ef74b451ef0d5935bd9dae"
contentMode: "local-full"
zh: ""
---

## Initial Price

* When a market is created, there are initially zero shares and no pre-defined prices or odds.

* Market makers (a fancy term for traders placing limit orders) interested in buying YES or NO shares can place [Limit Orders](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/trading/limit-orders/README.md) at the price they're willing to pay

* When offers for the YES and NO side equal \$1.00, the order is "matched" and that \$1.00 is converted into 1 YES and 1 NO share, each going to their respective buyers.

For example, if you place a limit order at \$0.60 for YES, that order is matched when someone places a NO order at \$0.40. *This becomes the initial market price.*

&lt;Important>Polymarket is not a "bookie" and does not set prices / odds. Prices are set by what Polymarket users are currently willling to buy/sell shares at. All trades are peer-to-peer.&lt;/Important>
