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
sourceRel: "docs/en/api/beta/sessions/threads/events/list.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/threads/events/list.md"
sourceSha256: "1ee2bf0062fb561237d421d620566c1d51b44f71d4f7409c0873ca172544ad85"
pageSha256: "fd7e5ed6e3e4102f858d2ccaf0b8c1c738a1a5d9b01d5dc1a8a1967aa0e1a736"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/sessions/$SESSION_ID/threads/$THREAD_ID/events \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: managed-agents-2026-04-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "data": [
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
  ],
  "next_page": "next_page"
}
```
