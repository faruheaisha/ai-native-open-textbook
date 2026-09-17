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
pageSha256: "cc6b35ceb4eb1d28351adc1457a4e2dcdb52dd85cb0331d63bada837caf43b2f"
contentMode: "local-full"
zh: ""
---

## DEXs

Some of the pools endpoints require you to provide DEX ID along with Network ID to query the pools on a particular DEX (Decentralized Exchange).

Using [/onchain/networks/\\{network\}/dexes/\\{dex\}/pools](https://docs.coingecko.com/reference/top-pools-dex) as example:

* `https://pro-api.coingecko.com/api/v3/onchain/networks/eth/dexes/uniswap_v3/pools?x_cg_pro_api_key=YOUR_API_KEY`

There are 2 parameter values required to apply for this endpoint:

* `network`: `eth` (network ID)
* `dex`: `uniswap_v3` (DEX ID)

**How to obtain DEX ID?**

* Use [/onchain/networks/\\{network\}/dexes](https://docs.coingecko.com/reference/dexes-list) endpoint, example of response:

    ```json JSON theme=\{null\}
    \{
      "data": [
        \{
          "id": "uniswap_v2", 👈 DEX ID
          "type": "dex",
          "attributes": \{
            "name": "Uniswap V2"
          \}
        \},
      ......
      ]
    \}
    ```

* Go to [GeckoTerminal](https://www.geckoterminal.com/)

  1. Select or search for a blockchain network.

  2. Choose the DEX from the DEXs List on the top (e.g. Uniswap V3).

  3. Copy the slug from the URL:

  &lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=58ed481ea98687173a3cbf9493c73669" alt="" data-og-width="3024" width="3024" data-og-height="1964" height="1964" data-path="images/docs/f68325c-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=c65139982268e19bca411599181dc636 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=643f58b710957517ea5bf1f44719c865 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=caf2849ed3d33c014ad8f9ebeb4e5335 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=053455ede8148791a44e985dfaf9b7ca 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=174ed6ec00474abb69e58b1955992896 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/f68325c-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=ece2e33e95afc4a26ce9632aee91ab09 2500w" />
