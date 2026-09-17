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
pageSha256: "29ef64b4c117a41a6631bf1f355f41309f4676f301d034474dcba5b78669bafa"
contentMode: "local-full"
zh: ""
---

## Removal of Unsupported Categories

🗓️ **January 23, 2025**

### Upcoming Removal of Unsupported Categories from CoinGecko and CoinGecko API

We are announcing the removal of certain categories from CoinGecko and CoinGecko API. These categories will no longer be supported across all API endpoints starting **February 12, 2025**.

| No | Category Name          | Category ID         |
  | :- | :--------------------- | :------------------ |
  | 1  | US Election 2020       | us-election-2020    |
  | 2  | Governance             | governance          |
  | 3  | Cryptocurrency         | cryptocurrency      |
  | 4  | Technology and Science | technology-science  |
  | 5  | Presale Meme           | presale-meme-coins  |
  | 6  | Business Platform      | business-platform   |
  | 7  | Number                 | number              |
  | 8  | Structured Product     | structured-products |
  | 9  | Investment             | investment          |
  | 10 | Niftex Shards          | niftex-shards       |
  | 11 | Ethereum POW IOU       | ethereum-pow-iou    |
  | 12 | Mirrored Assets        | mirrored-assets     |
  | 13 | Remittance             | remittance          |
  | 14 | Protocol               | protocol            |
  | 15 | Unicly Ecosystem       | utokens             |
  | 16 | Finance and Banking    | finance-banking     |
  | 17 | Eth 2.0 Staking        | eth-2-0-staking     |

#### Reason for Removal

Many of these categories no longer have associated coins. Some categories are outdated and no longer relevant in the crypto space. The changes align with updated category topology standards to maintain data accuracy and relevance.

API responses for the `/coins/markets` [endpoint](https://docs.coingecko.com/reference/coins-markets) will no longer support data of the categories above. Any requests specifying these categories will return an error.

Ensure applications using the `/coins/markets` [endpoint](https://docs.coingecko.com/reference/coins-markets) are not querying these removed categories. Please update any code or documentation referencing these categories to prevent errors.
