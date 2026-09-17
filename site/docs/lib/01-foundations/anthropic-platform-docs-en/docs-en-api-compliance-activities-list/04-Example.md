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
sourceRel: "docs/en/api/compliance/activities/list.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/activities/list.md"
sourceSha256: "9c78502341091e48f5187d6b7a8a18a2e31a355c159a501d78178c7278329ed8"
pageSha256: "8e33ad8cd7df49115104d8497beca8633f75c4810ebe33cb1d2aa0a0dc03b777"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/compliance/activities \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

### Response (200)

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
