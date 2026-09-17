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
pageSha256: "b4c1ca0bb7962466cfd41d3163cc459978eed937e1ffaf77780337c0c5c8acab"
contentMode: "local-full"
zh: ""
---

## Most Recently Updated Tokens List

**URL:** llms-txt#most-recently-updated-tokens-list

Source: https://docs.coingecko.com/v3.0.1/reference/tokens-info-recent-updated

v3.0.1/reference/api-reference/onchain-demo.json get /tokens/info_recently_updated
This endpoint allows you to **query 100 most recently updated tokens info of a specific network or across all networks on GeckoTerminal**

* You may add values such as network in the include param to include network along with the updated tokens list.

* Attributes specified in the `include` param will be returned under the top-level "included" key.
  * Cache/Update frequency: every 60 seconds.
