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
pageSha256: "b6495495656d4dd081a2b30495cbe03cdc30b79ba7532e67c1666fad78d13b3e"
contentMode: "local-full"
zh: ""
---

## 🔥 Megafilter for Pools

**URL:** llms-txt#🔥-megafilter-for-pools

Source: https://docs.coingecko.com/reference/pools-megafilter

reference/api-reference/onchain-pro.json get /pools/megafilter
This endpoint allows you to **query pools based on various filters across all networks on GeckoTerminal**

* Using `checks` param to filter pools based on various checks:
    * `checks=no_honeypot` — Filter out Honeypot pools, using GoPlus Token Security and De.Fi Scanner.
    * `checks=good_gt_score` — Show only pools with a GT Score of at least 75.
    * `checks=on_coingecko` — Show only pools with tokens that are listed on CoinGecko.
    * `checks=has_social` — Show only pools with their social links and token information updated.
  * You may include values such as `page` to specify which page of responses you would like to show.

* Trending rankings are determined by a combination of factors:
    * User engagement on geckoterminal.com
    * Market activity, such as trading volume and transactions
    * Pool security and credibility, including liquidity and honeypot checks
  * `dexes` param can only be used when **only 1`networks`** is specified.
  * If the token's market cap is not verified by the team, the API response will return `null` for its market cap value, even though it has a displayed value on GeckoTerminal, which might not be accurate as it often matches the Fully Diluted Valuation (FDV).
  * Attributes specified in the `include` param will be returned under the top-level "included" key.
  * This endpoint returns up to 20 pools per page. Use the `page` param to navigate more results.
  * Setting `include_unknown_honeypot_tokens=true` will include tokens with an 'unknown' honeypot status.
    * Please note that this param only takes effect when `checks=no_honeypot` is specified.
  * Cache/Update frequency: every 30 seconds.
  * 💼 Exclusive for [Paid Plan](https://www.coingecko.com/en/api/pricing) subscribers (Analyst plan or above).
