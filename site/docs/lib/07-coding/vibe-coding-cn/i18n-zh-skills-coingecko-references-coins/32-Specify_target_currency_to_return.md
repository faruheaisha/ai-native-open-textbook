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
pageSha256: "25ad22e86066beee08f22d8ae0b05e2982ce7094efbe5166f7be6812b39e2a14"
contentMode: "local-full"
zh: ""
---

## Specify target currency to return

In the 2 examples above, both queries for Coin ID and Contract Address contain `vs_currencies=usd`. Most of the CoinGecko API endpoints will require you to specify the currency.

CoinGecko API data supports all major fiat currencies and some famous crypto currencies like the following:

| Type           | Currency     | vs\_currencies (Param value) |
| -------------- | ------------ | ---------------------------- |
| Fiat           | US Dollar    | `usd`                        |
| Fiat           | Japanese Yen | `jpy`                        |
| Fiat           | Euro         | `eur`                        |
| Cryptocurrency | Bitcoin      | `btc`                        |
| Cryptocurrency | Ether        | `eth`                        |
| Cryptocurrency | Binance Coin | `bnb`                        |

For full list of supported currencies, please go to [/simple/supported\_vs\_currencies](https://docs.coingecko.com/reference/simple-supported-currencies) endpoint
