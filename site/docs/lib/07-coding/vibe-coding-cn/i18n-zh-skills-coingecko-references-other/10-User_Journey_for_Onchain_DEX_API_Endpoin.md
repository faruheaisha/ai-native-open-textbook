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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/coingecko/references/other.md"
sourceRel: "i18n/zh/skills/coingecko/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/coingecko/references/other.md"
sourceSha256: "0475f27bdec749a3923243511fa9995a6b979ed924a086b9b9a02c5e9a1741a5"
pageSha256: "9718b5ab5ef72eba2a11eff1e667537963d92f80fbc066813cb7c7787766bee7"
contentMode: "local-full"
zh: ""
---

## User Journey for Onchain DEX API Endpoints (GeckoTerminal data)

&lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=011c5c6d5cb8ff880eb957e528c57891" alt="" data-og-width="1328" width="1328" data-og-height="544" height="544" data-path="images/docs/fc38fa8-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=5ec52efdba31f801866c7c7bd041eafd 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=fd4e8526d2c0eb8347aa54eca4ed4289 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=6f2af440ec46cd89576b60c00f532ea1 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=c8e9cb77c67cf34a1cbb3ad7d99dbe84 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=5e7bcc911db7af9296a5782886417ddf 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/fc38fa8-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=62e234622a2ec45e8575c14c0532c6f4 2500w" />

### "Discovery/Navigational Endpoints"

* [/onchain/trending\_pools](https://docs.coingecko.com/reference/trending-pools-list) - can be used to query trending pools across all networks on GeckoTerminal.
* [/onchain/search/pools](https://docs.coingecko.com/reference/search-pools) - can be used to search for any pools on GeckoTerminal.

### "Supporting Endpoints"

* [/onchain/networks-list](https://docs.coingecko.com/reference/networks-list) - can be used to query all the supported networks on GeckoTerminal.
* [/onchain/networks/\\{network\}/dexes](https://docs.coingecko.com/reference/dexes-list) - can be used to query all the supported decentralized exchanges (DEXs/`dexes`) on GeckoTerminal based on network id that can be obtained from the endpoint mentioned above.

* [/onchain/simple/networks/\\{network\}/token\_price/\\{addresses\}](https://docs.coingecko.com/reference/onchain-simple-price) - can be used to query any token price using the token address and network id that can be obtained from the "Discovery/Navigational Endpoints" and "Supporting Endpoints" mentioned above.
* [/onchain/networks/\\{network\}/pools/\\{address\}](https://docs.coingecko.com/reference/pool-address) - can be used to query the data of a specific pool based on the pool address and network id that can be obtained from the "Discovery/Navigational Endpoints" and "Supporting Endpoints" mentioned above.
