---
title: "Coingecko - Trending"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/trending.md"
sourceRel: "i18n/zh/skills/coingecko/references/trending.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/trending.md"
sourceSha256: "11b4ec179a13c52bb2460a872586d363d87ae0e614b6fa196bad45f354d205ac"
pageSha256: "11b4ec179a13c52bb2460a872586d363d87ae0e614b6fa196bad45f354d205ac"
contentMode: "local-full"
zh: ""
---

# Coingecko - Trending

**Pages:** 2

---

## Trending Pools by Network

**URL:** llms-txt#trending-pools-by-network

Source: https://docs.coingecko.com/v3.0.1/reference/trending-pools-network

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/trending_pools
This endpoint allows you to **query the trending pools based on the provided network**

* You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint (available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers \[Analyst plan or above].)

* If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com/base/pools](https://www.geckoterminal.com/base/pools)

---

## Trending Pools List

**URL:** llms-txt#trending-pools-list

Source: https://docs.coingecko.com/v3.0.1/reference/trending-pools-list

v3.0.1/reference/api-reference/onchain-demo.json get /networks/trending_pools
This endpoint allows you to **query all the trending pools across all networks on GeckoTerminal**

* You may include values such as `page` to specify which page of responses you would like to show.
  * For more flexibility in retrieving an exact list of pools that match your specific needs, consider using the [/pools/megafilter](https://docs.coingecko.com/reference/pools-megafilter) endpoint (available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers \[Analyst plan or above].)

* If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * `page`: Pagination beyond 10 pages is available for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
  * Cache/Update frequency: every 60 seconds.
  * GeckoTerminal equivalent page (example): [https://www.geckoterminal.com](https://www.geckoterminal.com)
