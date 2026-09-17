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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "414a7f99d66ed919a5e896356266f24fdca024ef17c0dc24a3474d31517173c6"
contentMode: "local-full"
zh: ""
---

## Extended Historical Data for Onchain OHLCV Endpoint

🗓️ **January 15, 2025**

We've improved the [Pool OHLCV Chart by Pool Address](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) endpoint to provide access to a much broader range of historical data.

* **Previous Behavior:** Users could only query data for the past 6 months from today.
  * **New Behavior**: Users can now access data from September 2021 to the present, depending on the pool's tracking start date on GeckoTerminal.
  * Each API request is **limited to a 6-month date range**, but users can query older data by using the before\_timestamp parameter.

Note: access to data beyond the past 6 months is only available to [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan & above).

No changes are required for existing integrations. However, users who need data beyond the past 6 months should adjust their queries to use the `before_timestamp` parameter to fetch additional data.
