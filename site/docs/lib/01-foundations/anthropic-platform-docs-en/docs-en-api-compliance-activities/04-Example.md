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
sourceRel: "docs/en/api/compliance/activities.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/activities.md"
sourceSha256: "54df0e629af9239c60bf181dd73f0045c42b4b988c0f4e4f858ef502b9552cdb"
pageSha256: "1a0b74ef47f8332d3436a179312a4af2ae6d89e2bbeafebb81da65755bf080fc"
contentMode: "local-full"
zh: ""
---

### Example

```bash
curl https://api.anthropic.com/v1/compliance/activities \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

#### Response (200)

```json
{
  "data": [
    {
      "actor": {
        "api_key_id": "api_key_id",
        "ip_address": "ip_address",
        "user_agent": "user_agent",
        "type": "api_actor"
      },
      "decision": "blocked",
      "id": "id",
      "abuse_session_id": "abuse_session_id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "organization_id": "organization_id",
      "organization_uuid": "organization_uuid",
      "type": "abuse_decision_received"
    }
  ],
  "first_id": "first_id",
  "has_more": true,
  "last_id": "last_id"
}
```

## Domain types
