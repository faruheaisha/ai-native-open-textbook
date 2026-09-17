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
sourceRel: "docs/en/api/beta/sessions/threads/events/stream.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/threads/events/stream.md"
sourceSha256: "80908123b9262a3ca527ba9c6acdddb3f64fdbef199c7a758732dbb340d7fd6b"
pageSha256: "d16a81b52b3a1bc12f621cb12f32701fdb9d3c7b5ad9cf879d7809f1f4a2aadc"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID/threads/$THREAD_ID/stream \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "sevt_011CZkZGOp0iBcp4kaQSihUmy",
  "content": [
    {
      "text": "Where is my order #1234?",
      "type": "text"
    }
  ],
  "type": "user.message",
  "processed_at": "2026-03-15T10:00:00Z"
}
```
