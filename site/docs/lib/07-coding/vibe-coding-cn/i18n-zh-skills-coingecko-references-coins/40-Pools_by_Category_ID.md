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
pageSha256: "3f53ba1c56ed529d7a234c8980033fac53f05094904aab8b702adb111a3585cc"
contentMode: "local-full"
zh: ""
---

## 💼 Pools by Category ID

**URL:** llms-txt#💼-pools-by-category-id

Source: https://docs.coingecko.com/reference/pools-category

reference/api-reference/onchain-pro.json get /categories/\{category_id\}/pools
This endpoint allows you to **query all the pools based on the provided category ID**

* You can retrieve full list of categories id via this endpoint: [Categories List](https://docs.coingecko.com/reference/categories-list).
  * You can retrieve tokens of a specific category, by flagging `include=base_token`.
  * GeckoTerminal categories are different from [CoinGecko categories](https://docs.coingecko.com/reference/coins-categories-list).

* Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * GeckoTerminal equivalent page example: [https://www.geckoterminal.com/category/pump-fun](https://www.geckoterminal.com/category/pump-fun)
  * Cache/Update frequency: every 30 seconds.
  * Exclusive for all Paid Plan Subscribers (Analyst, Lite, Pro and Enterprise).
