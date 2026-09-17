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
pageSha256: "3cca9301e2d78f7a6ace0f73d56d20609f8af1829cf7761132d3b0933a45d2db"
contentMode: "local-full"
zh: ""
---

## Improved OHLCV endpoint (Onchain/GT)

🗓️ **March 23, 2023**

[/networks//pools//ohlcv/](https://docs.coingecko.com/reference/pool-ohlcv-contract-address) now returns more granularity `day,` `hour`, `minute` and multiple aggregates

  ## Multiple Improvements

🗓️ **February 23, 2023**

We've made some updates to the /coins/categories and /simple/token\_price/id endpoints:

* Market cap and volume data for 'ecosystem' categories in the [/coins/categories](https://docs.coingecko.com/reference/coins-categories) endpoint will now return 'null' until further notice. The CoinGecko team is actively working on improvements to provide more accurate data. If you have any feedback or suggestions, please reach out via [api@coingecko.com](mailto:api@coingecko.com).
  * Previously, the [/simple/token\_price/](https://docs.coingecko.com/reference/simple-token-price) endpoint was unable to return data for some Solana coins. This issue has been resolved, and users can now expect accurate data for Solana coins from this endpoint.
