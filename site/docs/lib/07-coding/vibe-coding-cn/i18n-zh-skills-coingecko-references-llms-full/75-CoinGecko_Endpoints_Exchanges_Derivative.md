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
pageSha256: "06c6df48932416e6be92144a2f014520063c0d2d75c8f2dd87d302882e45421f"
contentMode: "local-full"
zh: ""
---

## CoinGecko Endpoints: Exchanges & Derivatives

| Endpoint                                                                              | Description                                                                                                                   |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [/exchanges](https://docs.coingecko.com/reference/exchanges)                                                    | Query all the supported exchanges with exchanges' data (ID, name, country, ...) that have active trading volumes on CoinGecko |
| [/exchanges/list](https://docs.coingecko.com/reference/exchanges-list)                                          | Query all the exchanges with ID and name                                                                                      |
| [/exchanges/\\{id\}](https://docs.coingecko.com/reference/exchanges-id)                                           | Query exchange's data (name, year established, country, ...), exchange volume in BTC and tickers based on exchange's ID       |
| [/exchanges/\\{id\}/tickers](https://docs.coingecko.com/reference/exchanges-id-tickers)                           | Query exchange's tickers based on exchange's ID                                                                               |
| [/exchanges/\\{id\}/volume\_chart](https://docs.coingecko.com/reference/exchanges-id-volume-chart)                | Query the historical volume chart data with time in UNIX and trading volume data in BTC based on exchange's ID                |
| 💼 [/exchanges/\\{id\}/volume\_chart/range](https://docs.coingecko.com/reference/exchanges-id-volume-chart-range) | Query the historical volume chart data in BTC by specifying date range in UNIX based on exchange's ID                         |
| [/derivatives](https://docs.coingecko.com/reference/derivatives-tickers)                                        | Query all the tickers from derivatives exchanges on CoinGecko                                                                 |
| [/derivatives/exchanges](https://docs.coingecko.com/reference/derivatives-exchanges)                            | Query all the derivatives exchanges with related data (ID, name, open interest, ...) on CoinGecko                             |
| [/derivatives/exchanges/\\{id\}](https://docs.coingecko.com/reference/derivatives-exchanges-id)                   | Query the derivatives exchange's related data (ID, name, open interest, ...) based on the exchanges' ID                       |
| [/derivatives/exchanges/list](https://docs.coingecko.com/reference/derivatives-exchanges-list)                  | Query all the derivatives exchanges with ID and name on CoinGecko                                                             |
