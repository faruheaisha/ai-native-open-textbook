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
pageSha256: "41835fe7f3223ce8e1ea161540c4f9976c9d36b47b1ec6280316ef5a00a932a6"
contentMode: "local-full"
zh: ""
---

## Methods to query Onchain Data

### a. Pool Contract Address

Most of the time, you will need a pool contract address along with Network ID to query the onchain data, especially when using the Pools Endpoints.

Using [/onchain/networks/\\{network\}/pools/\\{address\}](https://docs.coingecko.com/reference/pool-address) as example:

* `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/pools/0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc?x_cg_pro_api_key=YOUR_API_KEY`

There are 2 parameter values required to apply for this endpoint:

* `network`: `eth` (network ID)
* `address`: `0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc` (pool contract address)

**How to obtain the pool contract address? (e.g.`WETH/USDC`)**

* Look for the contract address section of pool page on [GeckoTerminal](https://www.geckoterminal.com/eth/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640):

&lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=a80b0dafe3d5db5a527e02ea18fcc2ad" alt="" data-og-width="3023" width="3023" data-og-height="1708" height="1708" data-path="images/docs/741fbc7-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=aa93c1116c1d08b205703db5012bab40 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=3a880e5a52baccf4ba59ebccbe403e0e 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=3ce6dab28d3f89568ebcb90c06c5b476 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=94b5901e74822c87037922b50b6c4502 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=363a6b4dae6ba819ca437b307847bfca 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/741fbc7-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=094ec22716e968240e77cf49c8a85670 2500w" />

* Get the pool contract address from the project website, white-paper, documentation, or block explorer site:

* [Block Explorer (Etherscan)](https://etherscan.io/address/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640)
  * [DEX (Uniswap)](https://info.uniswap.org/#/pools/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640)

### b. Token Contract Address

Apart from the pool contract address, you also have the option to query onchain data by using the token contract address, using [/onchain/networks/\\{network\}/tokens/\\{token\_address\}/pools](https://docs.coingecko.com/reference/top-pools-contract-address) as example:

* `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48/pools?x_cg_pro_api_key=YOUR_API_KEY`

There are 2 parameter values required to apply for this endpoint:

* `network`: `eth` (network ID)
* `address`: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48` (token contract address)

**How to obtain tokens contract address (e.g. UNI):**

* Look for the contract address section of pool page on GeckoTerminal:

&lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=f889558b4ea90de11cb582a6b7de0abc" alt="" data-og-width="3023" width="3023" data-og-height="1714" height="1714" data-path="images/docs/56f6c15-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=9ce75c1292f0d566078dda3943b1fe7e 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=4516e149c14a8bdac49d99f6e4915363 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=d630847a7ee3c65560f8ebb5ad44ad38 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=7509e70029974a1eab8c270e88190071 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=598fa1be5c51ab303f7c53b707ea1424 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/56f6c15-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=1f47293f6b9d8bddb811001f3ff1f65e 2500w" />

* Get the token contract address from the project website, white-paper, documentation, or block explorer site. For example:

* [Uniswap Documentation](https://docs.uniswap.org/protocol/concepts/governance/overview#uni-address)
  * [DEX (Uniswap)](https://info.uniswap.org/#/tokens/tokens/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)
  * [Block Explorer (Etherscan)](https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984)

**Examples:**

Example 1 (unknown):
```unknown

* Go to [GeckoTerminal](https://www.geckoterminal.com/)

  1. Select or search for a blockchain network.

  2. Copy the slug from the URL:

  <img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=3d58e3708238e2c869afeb50f36ba74a" alt="" data-og-width="3024" width="3024" data-og-height="1964" height="1964" data-path="images/docs/5b9a903-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=4989c53c98cdf6a3b7e313e6a9804ab0 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=d969711a6080bed61c7ea74574f8c9c4 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=00c5bc4b0bddd4b5c2a1db9feccf6cb9 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=fae4d183cc2e8adffa335e7fd646f7d0 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=557a46ebb5da439b2f10be9d31b78618 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=c2a5d9ec2a1c59d2479ee38eb887b103 2500w" />

## DEXs

Some of the pools endpoints require you to provide DEX ID along with Network ID to query the pools on a particular DEX (Decentralized Exchange).

Using [/onchain/networks/\{network}/dexes/\{dex}/pools](/reference/top-pools-dex) as example:

* `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/dexes/uniswap_v3/pools?x_cg_pro_api_key=YOUR_API_KEY`

There are 2 parameter values required to apply for this endpoint:

* `network`: `eth` (network ID)
* `dex`: `uniswap_v3` (DEX ID)

**How to obtain DEX ID?**

* Use [/onchain/networks/\{network}/dexes](/reference/dexes-list) endpoint, example of response:

```
