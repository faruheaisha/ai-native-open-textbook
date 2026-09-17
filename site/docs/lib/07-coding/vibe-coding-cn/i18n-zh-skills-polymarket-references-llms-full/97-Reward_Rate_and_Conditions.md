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
pageSha256: "f2cef51b18773135a6c628fc49efa2ff1be13d06b518481706c2de3dc2e03655"
contentMode: "local-full"
zh: ""
---

## Reward Rate and Conditions

The current rate is set at 4.00% and applies to all eligible positions. This rate is variable and subject to change at Polymarket's discretion. We also reserve the right to introduce limits to the total amount of rewards paid out at any time. This iteration of rewards is funded through the Polymarket Treasury.

Your total position value is randomly sampled once each hour, and the reward is distributed daily. Your rewards are calculated based on the total position value of your eligible positions at the time of evaluation.

### **Total Position Value Computation**

For each eligible polymarket, we calculate the eligible position in the following way:

**Position Valuation**:

* Based on your current "Yes" and "No" shares and the most recent mid-price for each outcome.

### **Example**

If you hold at time of sample:

* 30,000 “Yes” shares at a price of **\$0.53**
* 10,000 “No” shares at a price of **\$0.45**

**Total Position Value** =

→ `(30000 × 0.53) + (10000 × 0.45)`

→ `$15,900 + $4,500 = $20,400`

**Hourly Holding Reward Calculation** (based on 4.00% Annual Reward):

→ `$20400 × (0.04 / 365 / 24) ≈ $.09315068493`
