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
pageSha256: "895e779b12fc1762548ff3d4d32a327875bd4d781afbc086b74a3e0722415250"
contentMode: "local-full"
zh: ""
---

## Methods to query price & market data of coins

Using [/simple/price](https://docs.coingecko.com/reference/simple-price) endpoint as example:

* `https://pro-api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_pro_api_key=YOUR_API_KEY`

* The provided endpoint URL includes parameters such as `ids=bitcoin` and `vs_currencies=usd`, indicating that the intention to retrieve the current price of Bitcoin in US Dollars.

**How to obtain Coin ID aka API ID?** There are 3 options:

* Use [/coins/list](https://docs.coingecko.com/reference/coins-list) endpoint, example of responses:

    

* View the full list of coins with API ID, symbol and name using this [Google Sheet](https://docs.google.com/spreadsheets/d/1wTTuxXt8n9q7C4NDXqQpI3wpKu1_5bGVmP9Xz0XGSyU/edit?usp=sharing).

* Look for the "API ID“ by visiting the info section of a coin page on CoinGecko:

    &lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=ca1093ad1577a2160c53ee6ea3c9de8c" data-og-width="2122" width="2122" data-og-height="1256" height="1256" data-path="images/docs/7bf604e-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=58b6818eb39f1cc1cb13bfb1b827e9ef 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=debd856f53bd0349a94586da15246140 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=4995bc412246ed062435c7700fce33b0 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=54503566448e1f70bfd6e3938ff18830 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=45f0c1afb1803886ff058fe7682a3a2a 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/7bf604e-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=f3d3d13f19af39c3c2918e06f9552bd6 2500w" />

### b. Contract Address

Other than using Coin ID, you may also query price & market data of a coin using contract address, using [/simple/token\_price/\\{id](https://docs.coingecko.com/reference/simple-token-price)\} endpoint as example:

* `https://pro-api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&vs_currencies=usd&x_cg_pro_api_key=YOUR_API_KEY`

There are 3 parameters values required to apply for this endpoint:

* `id`: `Ethereum` (Asset Platform ID)
* `contract_addresses`: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (Contract Address)
* `vs_currencies`: `usd` (Target Currencies)

**How to obtain Coins/Tokens Contract Address**

* Use [/coins/list](https://docs.coingecko.com/reference/coins-list) endpoint (`include_platform=true`), example of responses:
    
* Look for the "Contract“ by visiting the info section of a coin page on CoinGecko.

* Not all coins will have a contract address listed on the CoinGecko site.
  * If an address is not shown on the CoinGecko page, you will not be able to query the coin by its contract address via the API.
  * The contract addresses are curated by the CoinGecko team, if you find out any missing contract address, feel free to [share](https://support.coingecko.com/hc/en-us/requests/new) with us to review.

  &lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=d16b2cfd819ece1c689f6595081edcad" data-og-width="2096" width="2096" data-og-height="1484" height="1484" data-path="images/docs/576675c-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=2e16c3e076d1cd3f43af7fb949d2382a 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=e46ee9cc8a1f9be560c3ea1940695a02 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=c19faccaebd60eeeb79e8305ca20c609 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=68ad652fdbc4fc6739daaf8f0121a548 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=330f42772de72f72af2759e0c417db30 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/576675c-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=d9a988b003d06757a4f9886a9e047d58 2500w" />

* Get the token contract address from project website, white-paper, documentation, or block explorer site:

* [Uniswap Documentation](https://docs.uniswap.org/protocol/concepts/governance/overview#uni-address)
  * [Block Explorer (Etherscan)](https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)
