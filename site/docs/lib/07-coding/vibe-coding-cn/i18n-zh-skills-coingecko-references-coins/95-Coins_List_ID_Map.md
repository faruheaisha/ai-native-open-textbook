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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/coins.md"
sourceRel: "i18n/zh/skills/coingecko/references/coins.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/coins.md"
sourceSha256: "fb2cd6385ac7d21732c4716db3c685f6c264d3d3a3fe9b8efd0973eb2605d330"
pageSha256: "8924e929f3b35170fdb37882a0b356a3ee4fed62ad0371f4ffdff3b746d4181c"
contentMode: "local-full"
zh: ""
---

## Coins List (ID Map)

**URL:** llms-txt#coins-list-(id-map)

Source: https://docs.coingecko.com/v3.0.1/reference/coins-list

v3.0.1/reference/api-reference/coingecko-demo.json get /coins/list
This endpoint allows you to **query all the supported coins on CoinGecko with coins ID, name and symbol**

* You may use this endpoint to query the list of coins with coin ID for other endpoints that contain params like `id` or `ids` (coin ID).

* There is no pagination required for this endpoint.
  * Access to inactive coins via the Public API (Demo plan) is restricted. To access them, please subscribe to one of our paid plans to obtain a Pro-API key.
  * Cache/Update Frequency:
    * Every 30 minutes for Public API.
    * Every 5 minutes for Pro API (Analyst, Lite, Pro, Enterprise).
