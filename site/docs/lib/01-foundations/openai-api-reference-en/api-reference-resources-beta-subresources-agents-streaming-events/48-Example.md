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
pageSha256: "07435b3a0885ac79ad0d86df27d6b16cce104c7de81d1a98a77e37896b8538a3"
contentMode: "local-full"
zh: ""
---

### Example

```json
{
  "type": "agent.session.turn.output_text.delta",
  "event_id": "event_id",
  "session_id": "session_id",
  "turn_id": "turn_id",
  "item_id": "item_id",
  "output_index": 0,
  "content_index": 0,
  "delta": "delta"
}
```

## agent.session.turn.output_text.done

Emitted when an output text content part is complete.
