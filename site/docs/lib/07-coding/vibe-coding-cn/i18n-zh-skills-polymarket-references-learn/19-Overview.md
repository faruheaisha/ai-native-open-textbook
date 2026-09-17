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
pageSha256: "bf2fed381702472776d9eaba417bea4fd55590afde5fdddf693bc1fcd91293a7"
contentMode: "local-full"
zh: ""
---

## Overview

**URL:** llms-txt#overview

**Contents:**
- Augmented Negative Risk
  - Original Outcomes
  - Placeholder Outcomes
  - Explicit Other

Source: https://docs.polymarket.com/developers/neg-risk/overview

Certain events which meet the criteria of being "winner-take-all" may be deployed as **"negative risk"** events/markets. The Gamma API includes a boolean field on events, `negRisk`, which indicates whether the event is negative risk.

Negative risk allows for increased capital efficiency by relating all markets within events via a convert action. More explicitly, a NO share in any market can be converted into 1 YES share in all other markets. Converts can be exercised via the [Negative Adapter](https://polygonscan.com/address/0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296). You can read more about negative risk [here](https://github.com/Polymarket/neg-risk-ctf-adapter).
