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
pageSha256: "46c5bef13a60515d42c27d5e5a632b876b35fa9298f87ab3901717e350bbd10a"
contentMode: "local-full"
zh: ""
---

## Multiple Improvements

We've made enhancements to the /search/trending and /coins/asset\_platform\_id/contract/contract\_address endpoints:

* Top 5 trending NFT data (based on high trading volume in the last 24 hours) is now included in the [/search/trending](https://docs.coingecko.com/reference/trending-search) endpoint
  * Near Protocol contract address (e.g. wrap.near) is now supported for [/coins//contract/ ](https://docs.coingecko.com/reference/coins-contract-address) endpoint

  ## Multiple Improvements (Onchain/GT)

* Token metadata such as name, symbol, and CoinGecko ID are now returned in the responses for pools endpoints. Users will need to pass in this attribute include=base\_token, quote\_token
  * CoinGecko asset platform ID added to the response for [/networks](https://docs.coingecko.com/reference/networks-list) endpoint
