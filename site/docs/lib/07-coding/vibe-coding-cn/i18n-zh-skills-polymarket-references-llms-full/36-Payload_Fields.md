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
pageSha256: "b3ec9d32b041ae63be2761fd185cf4610670dbf9d86c00ed2ee5e8f2c9941248"
contentMode: "local-full"
zh: ""
---

## Payload Fields

| Field              | Type   | Description                                                               |
| ------------------ | ------ | ------------------------------------------------------------------------- |
| `body`             | string | The text content of the comment                                           |
| `createdAt`        | string | ISO 8601 timestamp when the comment was created                           |
| `id`               | string | Unique identifier for this comment                                        |
| `parentCommentID`  | string | ID of the parent comment if this is a reply (null for top-level comments) |
| `parentEntityID`   | number | ID of the parent entity (event, market, etc.)                             |
| `parentEntityType` | string | Type of parent entity (e.g., "Event", "Market")                           |
| `profile`          | object | Profile information of the user who created the comment                   |
| `reactionCount`    | number | Current number of reactions on this comment                               |
| `replyAddress`     | string | Polygon address for replies (may be different from userAddress)           |
| `reportCount`      | number | Current number of reports on this comment                                 |
| `userAddress`      | string | Polygon address of the user who created the comment                       |

### Profile Object Fields

| Field                   | Type    | Description                                       |
| ----------------------- | ------- | ------------------------------------------------- |
| `baseAddress`           | string  | User profile address                              |
| `displayUsernamePublic` | boolean | Whether the username should be displayed publicly |
| `name`                  | string  | User's display name                               |
| `proxyWallet`           | string  | Proxy wallet address used for transactions        |
| `pseudonym`             | string  | Generated pseudonym for the user                  |
