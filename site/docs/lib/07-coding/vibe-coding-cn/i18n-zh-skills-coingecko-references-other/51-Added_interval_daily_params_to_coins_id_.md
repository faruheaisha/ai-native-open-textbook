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
pageSha256: "0bae3da52a6179ac9a80af0ce6ad4802a726a4ae6c1eeead9a1718b764cb6969"
contentMode: "local-full"
zh: ""
---

## Added interval daily params to /coins/id/ohlc

The [/coins//ohlc](https://docs.coingecko.com/reference/coins-id-ohlc) endpoint now supports the "interval=daily" parameter for Paid Plan Subscribers

Users can use this parameter to retrieve OHLC (Open/High/Low/Close) data on a daily interval for up to 180 days of date range.

  ## Included new fields

🗓️ **April 26, 2023**

We've added  'watchlist\_portfolio\_users' field to [/coins/](https://docs.coingecko.com/reference/coins-id) endpoint responses.

This refers to number of users who added the coin into a watchlist or portfolio.

**Example of responses:**
