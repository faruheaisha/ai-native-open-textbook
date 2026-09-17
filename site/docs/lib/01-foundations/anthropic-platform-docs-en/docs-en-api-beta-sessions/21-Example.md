---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "5917f0e6b6b3d64199c29ac0a1d5115c147a13be7197debfd3b74639f6fde3a0"
contentMode: "local-full"
zh: ""
---

### Example

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

#### Response (200)

```json
{
  "id": "sesn_011CZkZAtmR3yMPDzynEDxu7",
  "type": "session_deleted"
}
```

## Archive Session

**POST** `/v1/sessions/\{session_id\}/archive`

Archive Session
