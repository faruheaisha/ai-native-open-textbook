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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/llms-full.md"
sourceRel: "i18n/zh/skills/coingecko/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/llms-full.md"
sourceSha256: "a3cd0a16407a7e6b85ceb3cc714181ec1aecb3fdb5043afd1a82ec9cfdea8ec8"
pageSha256: "b8ba4747d487de6272b48c73416e3657e766dcc9733022ca0bff77b54e05af05"
contentMode: "local-full"
zh: ""
---

## CoinGecko Endpoints: NFT

| Endpoint                                                                               | Description                                                                                                                                                                  |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [/nfts/list](https://docs.coingecko.com/reference/nfts-list)                                                     | Query all supported NFTs with ID, contract address, name, asset platform ID and symbol on CoinGecko                                                                          |
| [/nfts/..](https://docs.coingecko.com/reference/nfts-id)                                                         | Query all the NFT data (name, floor price, 24hr volume, ...) based on the NFT collection ID                                                                                  |
| [/nfts/../contract/..](https://docs.coingecko.com/reference/nfts-contract-address)                               | Query all the NFT data (name, floor price, 24hr volume, ...) based on the NFT collection contract address and respective asset platform                                      |
| 💼 [/nfts/markets](https://docs.coingecko.com/reference/nfts-markets)                                            | Query all the supported NFT collections with floor price, market cap, volume and market related data on CoinGecko                                                            |
| 💼 [/nfts/../market\_chart](https://docs.coingecko.com/reference/nfts-id-market-chart)                           | Query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now                                        |
| 💼 [/nfts/../contract/../market\_chart](https://docs.coingecko.com/reference/nfts-contract-address-market-chart) | Query historical market data of a NFT collection, including floor price, market cap, and 24hr volume, by number of days away from now based on the provided contract address |
| 💼 [/nfts/../tickers](https://docs.coingecko.com/reference/nfts-id-tickers)                                      | Query the latest floor price and 24hr volume of a NFT collection, on each NFT marketplace, e.g. OpenSea and LooksRare                                                        |
