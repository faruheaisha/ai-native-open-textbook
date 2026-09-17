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
pageSha256: "7e7c2d3272a08a66a795657cbb7db4110cb62f16f6561c2908360d18dddf4745"
contentMode: "local-full"
zh: ""
---

## 👑 Circulating Supply Chart within Time Range by ID

**URL:** llms-txt#👑-circulating-supply-chart-within-time-range-by-id

Source: https://docs.coingecko.com/reference/coins-id-circulating-supply-chart-range

reference/api-reference/coingecko-pro.json get /coins/\{id\}/circulating_supply_chart/range
This endpoint allows you to **query historical circulating supply of a coin, within a range of timestamp based on the provided coin ID**

* Supports ISO date strings (`YYYY-MM-DD` or\
    `YYYY-MM-DDTHH:MM`, recommended for best compatibility) or UNIX timestamps.

* You may leave the interval params as empty for automatic granularity:
    * date range is 1 day from now = **5-minutely** data
    * date range is within 2-90 days from now = **hourly** data
    * date range is 91 days & above from now = **daily** data (00:00 UTC)
  * Data Availability: from 22 June 2019.
  * Cache/Update Frequency: 5 minutes.
  * The last completed UTC day (00:00) is available 35 minutes after midnight on the next UTC day (00:35).
  * Exclusive for Enterprise Plan Subscribers only.
