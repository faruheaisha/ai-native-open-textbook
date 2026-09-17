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
pageSha256: "064aa8382cd441d6c0c369d0a295ab76dfe4f1f864c002abe079a4c00f920360"
contentMode: "local-full"
zh: ""
---

## Update Frequency Improvements for selected Pro-API endpoints

🗓️ **February 14, 2025**

\[Changes below are applicable to Analyst/Lite/Pro/Enterprise [plan subscribers](https://www.coingecko.com/en/api/pricing) only.]

Dear CoinGecko API paid plan subscribers,

We're excited to announce an improvement to our API, aimed at providing you with even faster access to real-time data! Starting **02:00 UTC, February 24, 2025**, the edge cache duration for the following endpoints will be reduced to 30s, allowing you to retrieve updated data more frequently.

| Endpoints                                                                                                 | Effective Date & Time                                            | Current Update Frequency | New Update Frequency |
  | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- | :----------------------- | :------------------- |
  | Onchain [/networks/../tokens/](https://docs.coingecko.com/reference/token-data-contract-address)          | 02:00 UTC, February 24, 2025                                     | 60s                      | 30s                  |
  | Onchain [/networks/../tokens/multi/](https://docs.coingecko.com/reference/tokens-data-contract-addresses) | 06:00 UTC, February 24, 2025                                     | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../ohlcv](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)   | 02:00 UTC, February 25, 2025 - Enterprise plan subscribers only  | 60s                      | 30s                  |
  | Onchain [/networks/../pools/../ohlcv](https://docs.coingecko.com/reference/pool-ohlcv-contract-address)   | 02:00 UTC, February 26, 2025 - Analyst/Lite/Pro plan subscribers | 60s                      | 30s                  |

**What This Means for You:**

* **Fresher Data, Quicker**: With a reduced cache time, you'll now have the option to access more up-to-date data, closer to real-time!
  * **No Extra Credits for Cached Data**: If your request hits the cache (now updated every 30 seconds for endpoints above), there will be no additional credits charged—just like before.

**Things to Keep in Mind:**

* If your request hits our origin server instead of the cache to retrieve the latest data, there may be additional credits used.
  * To balance cost and real-time data needs, we recommend reviewing your request frequency. For those who prefer to obtain data without extra credits, consider keeping your request interval at 60 seconds or more to align with the new cache duration.

We're committed to continuously improving your experience and ensuring you get the data you need, as efficiently as possible. If you have any questions or need assistance, feel free to reach out to [soonaik@coingecko.com](mailto:soonaik@coingecko.com) .

**CoinGecko API Team**
