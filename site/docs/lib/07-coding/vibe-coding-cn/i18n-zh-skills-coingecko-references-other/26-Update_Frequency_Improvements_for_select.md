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
pageSha256: "9ff3964eea5cb08b8e31f1b095a7114a647f4ed8a3f11a1fd3372cada2d994e0"
contentMode: "local-full"
zh: ""
---

## Update Frequency Improvements for selected Pro-API endpoints (March 2025)

🗓️ **March 14, 2025**

\[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

Dear CoinGecko API paid plan subscribers,

We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, March 25, 2025**, the edge cache duration for the following endpoints will be reduced from 60s to 30s, allowing you to retrieve updated data more frequently.

1. Effective from 02:00 UTC, March 25, 2025:
     1. [Trending Pools List](https://docs.coingecko.com/reference/trending-pools-list)
     2. [Trending Pools by Network](https://docs.coingecko.com/reference/trending-pools-network)
     3. [Top Pools by Network](https://docs.coingecko.com/reference/top-pools-network)
     4. [Top Pools by Dex](https://docs.coingecko.com/reference/top-pools-dex)
  2. Effective from 02:00 UTC, March 26, 2025:
     1. [New Pools by Network](https://docs.coingecko.com/reference/latest-pools-network)
     2. [New Pools List](https://docs.coingecko.com/reference/latest-pools-list)
     3. [ Megafilter for Pools](https://docs.coingecko.com/reference/pools-megafilter)
     4. [Search Pools](https://docs.coingecko.com/reference/search-pools)
  3. Effective from 02:00 UTC, March 27, 2025:
     1. [Top Pools by Token Address](https://docs.coingecko.com/reference/top-pools-contract-address)
     2. [Most Recently Updated Tokens List](https://docs.coingecko.com/reference/tokens-info-recent-updated)
     3. [Pools by Category ID](https://docs.coingecko.com/reference/pools-category)

**What This Means for You:**

* **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 30 seconds for endpoints above), there will be no additional credits charged—just like before.

**Things to Keep in Mind:**

* If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer to obtain data without extra credits, consider keeping your request interval at 60 seconds or more to align with the new cache duration.

We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

**CoinGecko API Team**
