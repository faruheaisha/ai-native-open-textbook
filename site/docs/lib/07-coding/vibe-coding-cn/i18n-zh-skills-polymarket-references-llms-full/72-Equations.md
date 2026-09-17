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
pageSha256: "eb13bda62a1316c45f2e95776ab7f46141ef585d0d6cb0f0a75259d0e062ce3b"
contentMode: "local-full"
zh: ""
---

## Equations

**Equation 1:**

$S(v,s)= (\frac{v-s}{v})^2 \cdot b$

**Equation 2:**

$Q_{one}= S(v,Spread_{m_1}) \cdot BidSize_{m_1} + S(v,Spread_{m_2}) \cdot BidSize_{m_2} + \dots $
$ + S(v, Spread_{m^\prime_1}) \cdot AskSize_{m^\prime_1} + S(v, Spread_{m^\prime_2}) \cdot AskSize_{m^\prime_2}$

**Equation 3:**

$Q_{two}= S(v,Spread_{m_1}) \cdot AskSize_{m_1} + S(v,Spread_{m_2}) \cdot AskSize_{m_2} + \dots $
$ + S(v, Spread_{m^\prime_1}) \cdot BidSize_{m^\prime_1} + S(v, Spread_{m^\prime_2}) \cdot BidSize_{m^\prime_2}$

**Equation 4:**

**Equation 4a:**

If midpoint is in range \[0.10,0.90] allow single sided liq to score:

$Q_{\min} = \max(\min({Q_{one}, Q_{two}}), \max(Q_{one}/c, Q_{two}/c))$

**Equation 4b:**

If midpoint is in either range \[0,0.10) or (.90,1.0] require liq to be double sided to score:

$Q_{\min} = \min({Q_{one}, Q_{two}})$

**Equation 5:**

$Q_{normal} = \frac{Q_{min}}{\sum_{n=1}^{N}{(Q_{min})_n}}$

**Equation 6:**

$Q_{epoch} = \sum_{u=1}^{10,080}{(Q_{normal})_u}$

**Equation 7:**

$Q_{final}=\frac{Q_{epoch}}{\sum_{n=1}^{N}{(Q_{epoch})_n}}$
