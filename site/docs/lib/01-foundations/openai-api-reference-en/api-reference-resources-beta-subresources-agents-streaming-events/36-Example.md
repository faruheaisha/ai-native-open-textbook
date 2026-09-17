---
title: "OpenAI API 参考（字段级）"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/beta/subresources/agents/streaming-events.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/beta/subresources/agents/streaming-events.md"
sourceSha256: "e06665a555636995fe1eb8261151942e9a4dfd0159109c2ca45291045c49af22"
pageSha256: "0fdf750580cbf3cd9b9b6ea5583ba02b1bade29f19bc6de0b3360c8eb86cb83a"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.subagent.created",
  "event_id": "event_id",
  "subagent": {
    "id": "id",
    "object": "agent.session.subagent",
    "session_id": "session_id",
    "name": "name",
    "instructions": [
      {
        "type": "output_text",
        "text": "text"
      }
    ],
    "parent_agent_id": "parent_agent_id",
    "status": "active",
    "opened_at": 0,
    "closed_at": 0
  }
}
```

## agent.session.subagent.active

Emitted when a closed subagent successfully resumes.
