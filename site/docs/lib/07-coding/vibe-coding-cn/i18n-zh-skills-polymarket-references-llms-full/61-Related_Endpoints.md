---
title: "Gamma Structure"
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
pageSha256: "e0f5b347137133a4ffe9acdc0d0efb5f3d72d9ac89af2e74570c936a04a3b2fa"
contentMode: "local-full"
zh: ""
---

# Gamma Structure
Source: https://docs.polymarket.com/developers/gamma-markets-api/gamma-structure

Gamma provides some organizational models. These include events, and markets. The most fundamental element is always markets and the other models simply provide additional organization.

# Detail

1. **Market**
   1. Contains data related to a market that is traded on. Maps onto a pair of clob token ids, a market address, a question id and a condition id

2. **Event**
   1. Contains a set of markets
   2. Variants:
      1. Event with 1 market (i.e., resulting in an SMP)
      2. Event with 2 or more markets (i.e., resulting in an GMP)

# Example

* **\[Event]** Where will Barron Trump attend College?
  * **\[Market]** Will Barron attend Georgetown?
  * **\[Market]** Will Barron attend NYU?
  * **\[Market]** Will Barron attend UPenn?
  * **\[Market]** Will Barron attend Harvard?
  * **\[Market]** Will Barron attend another college?

# null
Source: https://docs.polymarket.com/developers/gamma-markets-api/overview

All market data necessary for market resolution is available on-chain (ie ancillaryData in UMA 00 request), but Polymarket also provides a hosted service, Gamma, that indexes this data and provides additional market metadata (ie categorization, indexed volume, etc). This service is made available through a REST API. For public users, this resource read only and can be used to fetch useful information about markets for things like non-profit research projects, alternative trading interfaces, automated trading systems etc.

# Endpoint

[https://gamma-api.polymarket.com](https://gamma-api.polymarket.com)

# Overview
Source: https://docs.polymarket.com/developers/neg-risk/overview

Certain events which meet the criteria of being "winner-take-all" may be deployed as **"negative risk"** events/markets. The Gamma API includes a boolean field on events, `negRisk`, which indicates whether the event is negative risk.

Negative risk allows for increased capital efficiency by relating all markets within events via a convert action. More explicitly, a NO share in any market can be converted into 1 YES share in all other markets. Converts can be exercised via the [Negative Adapter](https://polygonscan.com/address/0xd91E80cF2E7be2e162c6513ceD06f1dD0dA35296). You can read more about negative risk [here](https://github.com/Polymarket/neg-risk-ctf-adapter).

***
