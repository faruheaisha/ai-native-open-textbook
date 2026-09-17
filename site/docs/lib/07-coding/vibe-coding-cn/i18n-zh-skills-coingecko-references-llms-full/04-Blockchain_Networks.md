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
pageSha256: "9876977bed297f13b3d1f8ef4d5361ee137843c4b32c8ae397af5d044a696283"
contentMode: "local-full"
zh: ""
---

## Blockchain Networks

  ### Notes

  * Please do not use CoinGecko Asset Platform ID as the Network ID in Onchain DEX API Endpoints (CoinGecko Asset Platform ID ≠ GT Network ID)

  * Example:

    * Asset Platform on CoinGecko: `ethereum`
    * Onchain Network ID: `eth`

**How to obtain Network ID?**

* Use [/onchain/networks](https://docs.coingecko.com/reference/networks-list) endpoint, example of response:

    ```json JSON theme=\{null\}
    \{
      "data": [
        \{
          "id": "eth",  👈 Network ID
          "type": "network",
          "attributes": \{
            "name": "Ethereum",
            "coingecko_asset_platform_id": "ethereum" 👈 CoinGecko Asset Platform ID
          \}
        \},
       ......
      ]
    \}
    ```

* Go to [GeckoTerminal](https://www.geckoterminal.com/)

  1. Select or search for a blockchain network.

  2. Copy the slug from the URL:

  &lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=3d58e3708238e2c869afeb50f36ba74a" alt="" data-og-width="3024" width="3024" data-og-height="1964" height="1964" data-path="images/docs/5b9a903-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=4989c53c98cdf6a3b7e313e6a9804ab0 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=d969711a6080bed61c7ea74574f8c9c4 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=00c5bc4b0bddd4b5c2a1db9feccf6cb9 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=fae4d183cc2e8adffa335e7fd646f7d0 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=557a46ebb5da439b2f10be9d31b78618 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/5b9a903-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=c2a5d9ec2a1c59d2479ee38eb887b103 2500w" />
