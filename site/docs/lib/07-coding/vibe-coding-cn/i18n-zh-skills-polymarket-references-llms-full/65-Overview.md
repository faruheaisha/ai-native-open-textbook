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
pageSha256: "e18efaa738fb6cc202df20cb4de40917b752be3aab2ad76c47ecffc87850c557"
contentMode: "local-full"
zh: ""
---

## Overview

Polymarket leverages UMA's Optimistic Oracle (OO) to resolve arbitrary questions, permissionlessly. From [UMA's docs](https://docs.uma.xyz/protocol-overview/how-does-umas-oracle-work):

"UMA's Optimistic Oracle allows contracts to quickly request and receive data information ... The Optimistic Oracle acts as a generalized escalation game between contracts that initiate a price request and UMA's dispute resolution system known as the Data Verification Mechanism (DVM). Prices proposed by the Optimistic Oracle will not be sent to the DVM unless it is disputed. If a dispute is raised, a request is sent to the DVM. All contracts built on UMA use the DVM as a backstop to resolve disputes. Disputes sent to the DVM will be resolved within a few days -- after UMA tokenholders vote on what the correct outcome should have been."

To allow CTF markets to be resolved via the OO, Polymarket developed a custom adapter contract called `UmaCtfAdapter` that provides a way for the two contract systems to interface.
