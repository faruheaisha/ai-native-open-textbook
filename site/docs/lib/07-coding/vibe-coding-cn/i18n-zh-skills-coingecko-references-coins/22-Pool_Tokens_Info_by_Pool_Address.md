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
pageSha256: "52601cbee8c3788aa5671711845f05f86a1435fa18d991a1b71e7d2cd3552ff5"
contentMode: "local-full"
zh: ""
---

## Pool Tokens Info by Pool Address

**URL:** llms-txt#pool-tokens-info-by-pool-address

Source: https://docs.coingecko.com/v3.0.1/reference/pool-token-info-contract-address

v3.0.1/reference/api-reference/onchain-demo.json get /networks/\{network\}/pools/\{pool_address\}/info
This endpoint allows you to **query pool metadata (base and quote token details, image, socials, websites, description, contract address, etc.) based on a provided pool contract address on a network**

* If you would like to query pool data such as price, transactions, volume and etc. You can go to this endpoint [`/networks/\{network\}/pools/\{address\}`](https://docs.coingecko.com/v3.0.1/reference/pool-address) instead.
  * Cache/Update frequency: every 60 seconds.
  * Learn more about GT score [here](https://support.coingecko.com/hc/en-us/articles/38381394237593-What-is-GT-Score-How-is-GT-Score-calculated).
  * Metadata (image, websites, description, socials) may be sourced on-chain and is not vetted by the CoinGecko team. If you wish to get metadata reviewed by CoinGecko team, you may use the following endpoints:
    * [Coin Data by ID](https://docs.coingecko.com/v3.0.1/reference/coins-id)
    * [Coin Data by Token Address](https://docs.coingecko.com/v3.0.1/reference/coins-contract-address)

* `holders` data is currently in Beta, with ongoing improvements to data quality, coverage, and update frequency.
    * Supported chains include: Solana, EVM (Ethereum, Polygon, BNB, Arbitrum, Optimism, Base), Sui, TON, and Ronin.
    * `distribution_percentage` coverage:
      * Solana: `top_10`, `11_20`, `21_40`, `rest`
      * Other chains: `top_10`, `11_30`, `31_50`, `rest`
  * For tokens on a bonding curve (i.e. non-graduated tokens from launchpads), the response will include a `launchpad_details` object containing their graduation status and details.
