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
pageSha256: "15b9fec61ee09aa6a61b167ed5f265730be2b44829a002049d43cbd9894960e3"
contentMode: "local-full"
zh: ""
---

## Message Format

When subscribed to comments, you'll receive messages with the following structure:

```json  theme={null}
{
  "topic": "comments",
  "type": "comment_created",
  "timestamp": 1753454975808,
  "payload": {
    "body": "do you know what the term encircle means? it means to surround from all sides, Russia has present on only 1 side, that's the opposite of an encirclement",
    "createdAt": "2025-07-25T14:49:35.801298Z",
    "id": "1763355",
    "parentCommentID": "1763325",
    "parentEntityID": 18396,
    "parentEntityType": "Event",
    "profile": {
      "baseAddress": "0xce533188d53a16ed580fd5121dedf166d3482677",
      "displayUsernamePublic": true,
      "name": "salted.caramel",
      "proxyWallet": "0x4ca749dcfa93c87e5ee23e2d21ff4422c7a4c1ee",
      "pseudonym": "Adored-Disparity"
    },
    "reactionCount": 0,
    "replyAddress": "0x0bda5d16f76cd1d3485bcc7a44bc6fa7db004cdd",
    "reportCount": 0,
    "userAddress": "0xce533188d53a16ed580fd5121dedf166d3482677"
  }
}
```
