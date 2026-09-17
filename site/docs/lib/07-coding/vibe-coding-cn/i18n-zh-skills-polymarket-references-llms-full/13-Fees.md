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
pageSha256: "6da6e319f5546ca4bf540c74217543ab3e395e9c1083b72911a966838f7d9be5"
contentMode: "local-full"
zh: ""
---

## Fees

### Schedule

> Subject to change

| Volume Level | Maker Fee Base Rate (bps) | Taker Fee Base Rate (bps) |
| ------------ | ------------------------- | ------------------------- |
| >0 USDC      | 0                         | 0                         |

### Overview

Fees apply symmetrically in output assets (proceeds). This symmetry ensures fairness and market integrity. Fees are calculated differently depending on whether you are buying or selling:

* **Selling outcome tokens (base) for collateral (quote):**

$$
feeQuote = baseRate \times \min(price, 1 - price) \times size
$$

* **Buying outcome tokens (base) with collateral (quote):**

$$
feeBase = baseRate \times \min(price, 1 - price) \times \frac{size}{price}
$$
