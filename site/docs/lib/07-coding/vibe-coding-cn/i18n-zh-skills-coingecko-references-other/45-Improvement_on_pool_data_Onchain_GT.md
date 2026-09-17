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
pageSha256: "0d1d784f06780b471d1e627f782aa57d882e2b872b3de7c76f34fbbc39cf603c"
contentMode: "local-full"
zh: ""
---

## Improvement on pool data (Onchain/GT)

🗓️ **December 03, 2023**

Pool data now returns transaction stats for the last 1 hour. Unique buyers and sellers in the last 1 hour and 24 hours are now returned in the response

  ## Multiple Improvements

🗓️ **November 21, 2023**

The web\_slug data is now available in the following endpoints.

* [/coins/](https://docs.coingecko.com/reference/coins-id)
  * [/coins//contract/](https://docs.coingecko.com/reference/coins-contract-address)

This addition allows users to accurately link to a CoinGecko coin page using [www.coingecko.com/en/](http://www.coingecko.com/en/\\{web_slug\}).

**Example of responses:**

For the [/asset\_platforms](https://docs.coingecko.com/reference/asset-platforms-list) endpoint, we've introduced the native\_coin\_id data. This enables users to obtain the coin ID of different blockchain networks or asset platforms that may not have a contract address to look up

**Example of responses:**
