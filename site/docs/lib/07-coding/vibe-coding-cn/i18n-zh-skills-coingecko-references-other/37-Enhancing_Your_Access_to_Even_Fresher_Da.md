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
pageSha256: "ec275fc4ce4384c51a1ae9723e252061d98c87493aa20bc5ff12acc03383c664"
contentMode: "local-full"
zh: ""
---

## Enhancing Your Access to Even Fresher Data!

🗓️ **December 16, 2024**

\[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

**Dear CoinGecko API paid plan subscribers,**

We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, January 13, 2025**, the edge cache duration for the following endpoints will be reduced to 20-30s, allowing you to retrieve updated data more frequently.

| Endpoints                                                                                                 | Current Update Frequency | New Update Frequency |
  | :-------------------------------------------------------------------------------------------------------- | :----------------------- | :------------------- |
  | CoinGecko [/simple/price](https://docs.coingecko.com/reference/simple-price)                              | 30s                      | 20s                  |
  | CoinGecko [/simple/token\_price](https://docs.coingecko.com/reference/simple-token-price)                 | 30s                      | 20s                  |
  | Onchain [/simple/networks/../token\_price](https://docs.coingecko.com/reference/onchain-simple-price)     | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../trades](https://docs.coingecko.com/reference/pool-trades-contract-address) | 60s                      | 30s                  |
  | Onchain [/networks/../pools/..](https://docs.coingecko.com/reference/pool-address)                        | 60s                      | 30s                  |
  | Onchain [/networks/../pools/multi/..](https://docs.coingecko.com/reference/pools-addresses)               | 60s                      | 30s                  |

**What This Means for You:**

* **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 20-30 seconds for endpoints above), there will be no additional credits charged—just like before.

**Things to Keep in Mind:**

* If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer fresher data without extra credits, consider keeping your request interval at 30 seconds or more to align with the new cache duration.

We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

**CoinGecko API Team**
