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
pageSha256: "b35eacc3c9ecf59262ac7be2b8406dbf3d1d69168ddef72904ce5deb944478cd"
contentMode: "local-full"
zh: ""
---

## User Journey for CoinGecko API Endpoints

&lt;img src="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=509cde2f1085a0102c86f391db0837b1" alt="" data-og-width="1328" width="1328" data-og-height="710" height="710" data-path="images/docs/60fecdf-image.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=280&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=5ea5fec3760a2bfb5c33277e3511479f 280w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=560&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=5f926c131c7bb67afb13f89d3ec5e942 560w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=840&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=574e6d149e5fa962e8f7a3bfe0f5371b 840w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=1100&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=7a78b8790c86a92040eabf432a6cd64b 1100w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=1650&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=885633eb663ed8e54827a45a74e67ab8 1650w, https://mintcdn.com/coingecko/a7cplMjqO5fc2v5e/images/docs/60fecdf-image.png?w=2500&fit=max&auto=format&n=a7cplMjqO5fc2v5e&q=85&s=f3051a393bcc6c0ff6a3dee44ec89ac7 2500w" />

### "Discovery/Navigational Endpoints"

**Examples:**

* [/coins/list](https://docs.coingecko.com/reference/coins-list) — can be used to query all the supported coins on CoinGecko with names, symbols and coin IDs that can be used in other endpoints.
* [/search/trending](https://docs.coingecko.com/reference/trending-search) — can be used to query trending search coins, categories and NFTs on CoinGecko.

### "Supporting Endpoints"

**Examples:**

* [/simple/supported\_vs\_currencies](https://docs.coingecko.com/reference/simple-supported-currencies) — can be used to query the list of currencies for other endpoints that include parameters like `vs_currencies`, allowing to obtain the corresponding data for those currencies.
* [/asset\_platforms](https://docs.coingecko.com/reference/asset-platforms-list) — can be used to query the list of asset platforms for other endpoints that contain parameters like `id` or `ids` (asset platforms), allowing the retrieval of corresponding data for these asset platforms.

### "Data Endpoints"

**Examples:**

* [/simple/price](https://docs.coingecko.com/reference/simple-price) — can be used to query the prices of coins using the unique coin IDs that can be obtained from the "Discovery/Navigational Endpoints" mentioned above.
* [/coins/\\{id\}](https://docs.coingecko.com/reference/coins-id) — can be used to query the coin data using the unique coin IDs that can be obtained from the "Discovery/Navigational Endpoints" mentioned above.
