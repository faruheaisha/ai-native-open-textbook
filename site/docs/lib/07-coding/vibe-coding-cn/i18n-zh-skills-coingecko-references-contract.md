---
title: "Coingecko - Contract"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/contract.md"
sourceRel: "i18n/zh/skills/coingecko/references/contract.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/contract.md"
sourceSha256: "aef777478fe41ee807494c9bb96629693239d81ad6d42e1c033d0c6d7db4bc68"
pageSha256: "aef777478fe41ee807494c9bb96629693239d81ad6d42e1c033d0c6d7db4bc68"
contentMode: "local-full"
zh: ""
---

# Coingecko - Contract

**Pages:** 1

---

## NFTs Collection Data by Contract Address

**URL:** llms-txt#nfts-collection-data-by-contract-address

Source: https://docs.coingecko.com/v3.0.1/reference/nfts-contract-address

v3.0.1/reference/api-reference/coingecko-demo.json get /nfts/\{asset_platform_id\}/contract/\{contract_address\}
This endpoint allows you to **query all the NFT data (name, floor price, 24hr volume ...) based on the NFT collection contract address and respective asset platform**

* You may also obtain the asset platform id and contract address through [/nfts/list](https://docs.coingecko.com/v3.0.1/reference/nfts-list) endpoint.

* Solana NFT & Art Blocks are not supported for this endpoint, please use [/nfts/\\{id\}](https://docs.coingecko.com/v3.0.1/reference/nfts-id) endpoint instead.
  * Cache / Update Frequency: every 60 seconds for all the API plans.
