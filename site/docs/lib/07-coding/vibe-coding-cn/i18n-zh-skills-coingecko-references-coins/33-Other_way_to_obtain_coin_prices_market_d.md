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
pageSha256: "1d62be4b4b9ffae3c1a82a4403e299ad9dd17f170d8830298439d778ea7b059d"
contentMode: "local-full"
zh: ""
---

## Other way to obtain coin prices & market data

Using [/coins/market ](https://docs.coingecko.com/reference/coins-markets) endpoint as example to query prices and market data of coins in bulk

* `https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&x_cg_pro_api_key=YOUR_API_KEY`

There are 4 parameters values applied for this endpoint:

* `vs_currency`: `usd`
* `order`: `market_cap_desc` — The endpoint response will be sorted in descending order, from the coins with the largest market cap to those with the smallest.
* `per_page`: `100` — The results of coins per page are set at 100 in this case (maximum is 250).
* `page`: `1` — The page number of the results is determined by the parameter `per_page`. In the case of `per_page=100` and `page=2`, the responses will include coins ranked 101 to 200 on CoinGecko, sorted by market cap, as per the specified endpoint.

**Examples:**

Example 1 (unknown):
```unknown

* View the full list of coins with API ID, symbol and name using this [Google Sheet](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

* Look for the "API ID“ by visiting the info section of a coin page on CoinGecko:

    <img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=ca1093ad1577a2160c53ee6ea3c9de8c" data-og-width="2122" width="2122" data-og-height="1256" height="1256" data-path="images/docs/7bf604e-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=58b6818eb39f1cc1cb13bfb1b827e9ef 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=debd856f53bd0349a94586da15246140 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=4995bc412246ed062435c7700fce33b0 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=54503566448e1f70bfd6e3938ff18830 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=45f0c1afb1803886ff058fe7682a3a2a 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=f3d3d13f19af39c3c2918e06f9552bd6 2500w" />

### b. Contract Address

Other than using Coin ID, you may also query price & market data of a coin using contract address, using [/simple/token\_price/\{id](/reference/simple-token-price)} endpoint as example:

* `https://pro-api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&vs_currencies=usd&x_cg_pro_api_key=YOUR_API_KEY`

There are 3 parameters values required to apply for this endpoint:

* `id`: `Ethereum` (Asset Platform ID)
* `contract_addresses`: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (Contract Address)
* `vs_currencies`: `usd` (Target Currencies)

**How to obtain Coins/Tokens Contract Address**

* Use [/coins/list](/reference/coins-list) endpoint (`include_platform=true`), example of responses:
```
