---
title: "Glossary"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "551658a0e9af327fe10af66619f7a3f22b6ac017ceec879696299fc89110d530"
contentMode: "local-full"
zh: ""
---

# Glossary
Source: https://docs.polymarket.com/quickstart/introduction/definitions

| Term                         | Definition                                                                                                                                                                                                                                                                                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Token**                    | A token represents a stake in a specific Yes/No outcome in a Market. The price of a token can fluctuate between $0 - $1 based on the market belief in the outcome. When a market resolves, the token associated with the correct prediction can be redeemed for \$1 USDC. This is also sometimes called an *Asset Id*                                             |
| **Market**                   | A single event outcome. Corresponds to a pair of CLOB token IDs(Yes/No), a market address, a question ID and a condition ID.                                                                                                                                                                                                                                      |
| **Event**                    | A collection of related markets grouped under a common topic or theme.                                                                                                                                                                                                                                                                                            |
| **SLUG**                     | A human readable identification for a market or event. Can be found in the URL of any Polymarket Market or Event. You can use this slug to find more detailed information about a market or event by using it as a parameter in the [Get Events](https://docs.polymarket.com/developers/gamma-markets-api/get-events) or [Get Markets](https://docs.polymarket.com/developers/gamma-markets-api/get-markets) endpoints. |
| **Negative Risk (negrisk)**  | A group of Markets(Event) in which only one Market can resolve as yes. For more detail see [Negrisk Details](https://docs.polymarket.com/developers/neg-risk/overview)                                                                                                                                                                                            |
| **Central Limit Order Book** | The off-chain order matching system. This is where you place resting orders and market orders are matched with existing orders before being sent on-chain.                                                                                                                                                                                                        |
| **Polygon Network**          | A scalable, multi-chain blockchain platform used by Polymarket to facilitate on-chain activities(contract creation, token transfers, etc)                                                                                                                                                                                                                         |

# Developer Quickstart
Source: https://docs.polymarket.com/quickstart/introduction/main

This section of the documentation will provide all the essential resources to help you perform basic trading actions on the Polymarket platform. If you're just getting started, you're in the right place.

Everything you need to start building with the Polymarket API is right here. Let’s get started.

[Not sure what to build next? Get inspired by checking out real examples from other developers using the API.](https://docs.polymarket.com/quickstart/introduction/showcase)

# API Rate Limits
Source: https://docs.polymarket.com/quickstart/introduction/rate-limits
