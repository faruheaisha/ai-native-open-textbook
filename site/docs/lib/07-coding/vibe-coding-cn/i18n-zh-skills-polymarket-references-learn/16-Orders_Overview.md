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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/learn.md"
sourceRel: "i18n/zh/skills/polymarket/references/learn.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/learn.md"
sourceSha256: "7c4ec0ea55ae27ce367a9d1986e4f0bc407b2b03ed70d46936adcee4ea22bde2"
pageSha256: "bcf133d2112057f2cfd839e5e2e40ab7a83adfdd198a3fff297ffa50eb7fb7f0"
contentMode: "local-full"
zh: ""
---

## Orders Overview

**URL:** llms-txt#orders-overview

**Contents:**
- Allowances
- Signature Types
- Validity Checks

Source: https://docs.polymarket.com/developers/CLOB/orders/orders

Detailed instructions for creating, placing, and managing orders using Polymarket's CLOB API.

All orders are expressed as limit orders (can be marketable). The underlying order primitive must be in the form expected and executable by the on-chain binary limit order protocol contract. Preparing such an order is quite involved (structuring, hashing, signing), thus Polymarket suggests using the open source typescript, python and golang libraries.

To place an order, allowances must be set by the funder address for the specified `maker` asset for the Exchange contract. When buying, this means the funder must have set a USDC allowance greater than or equal to the spending amount. When selling, the funder must have set an allowance for the conditional token that is greater than or equal to the selling amount. This allows the Exchange contract to execute settlement according to the signed order instructions created by a user and matched by the operator.

Polymarket’s CLOB supports 3 signature types. Orders must identify what signature type they use. The available typescript and python clients abstract the complexity of signing and preparing orders with the following signature types by allowing a funder address and signer type to be specified on initialization. The supported signature types are:

| Type               | ID | Description                                                                                |
| ------------------ | -- | ------------------------------------------------------------------------------------------ |
| EOA                | 0  | EIP712 signature signed by an EOA                                                          |
| POLY\_PROXY        | 1  | EIP712 signatures signed by a signer associated with funding Polymarket proxy wallet       |
| POLY\_GNOSIS\_SAFE | 2  | EIP712 signatures signed by a signer associated with funding Polymarket gnosis safe wallet |

Orders are continually monitored to make sure they remain valid. Specifically, this includes continually tracking underlying balances, allowances and on-chain order cancellations. Any maker that is caught intentionally abusing these checks (which are essentially real time) will be blacklisted.

Additionally, there are rails on order placement in a market. Specifically, you can only place orders that sum to less than or equal to your available balance for each market. For example if you have 500 USDC in your funding wallet, you can place one order to buy 1000 YES in marketA @ \$.50, then any additional buy orders to that market will be rejected since your entire balance is reserved for the first (and only) buy order. More explicitly the max size you can place for an order is:

$$
\text\{maxOrderSize\} = \text\{underlyingAssetBalance\} - \sum(\text\{orderSize\} - \text\{orderFillAmount\})
$$
