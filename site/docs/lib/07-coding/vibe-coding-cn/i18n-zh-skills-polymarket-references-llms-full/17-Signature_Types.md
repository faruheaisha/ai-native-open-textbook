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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/polymarket/references/llms-full.md"
sourceRel: "i18n/zh/skills/polymarket/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/polymarket/references/llms-full.md"
sourceSha256: "f2977ee42f8298e33bc8c8a0ee646bdd5f4e91e39de2641b8e15138a3174bd62"
pageSha256: "2491111340236991d4109e9b7ef7e5206019c962e68a2d32927e25f83fd262e9"
contentMode: "local-full"
zh: ""
---

## Signature Types

Polymarket’s CLOB supports 3 signature types. Orders must identify what signature type they use. The available typescript and python clients abstract the complexity of signing and preparing orders with the following signature types by allowing a funder address and signer type to be specified on initialization. The supported signature types are:

| Type               | ID | Description                                                                                |
| ------------------ | -- | ------------------------------------------------------------------------------------------ |
| EOA                | 0  | EIP712 signature signed by an EOA                                                          |
| POLY\_PROXY        | 1  | EIP712 signatures signed by a signer associated with funding Polymarket proxy wallet       |
| POLY\_GNOSIS\_SAFE | 2  | EIP712 signatures signed by a signer associated with funding Polymarket gnosis safe wallet |
