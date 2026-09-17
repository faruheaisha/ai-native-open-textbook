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
sourceRel: "docs/en/api/beta/messages/batches/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/batches/create.md"
sourceSha256: "da62b28389b2f21923ff51e824b7ac52a5e83a561a2283532341184bbd31df6e"
pageSha256: "ebe423a0d786be63baae701268525f426b38b0f37baff737340d2b8df16eda57"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/messages/batches \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: message-batches-2024-09-24' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "requests": [
            {
              "custom_id": "my-custom-id-1",
              "params": {
                "max_tokens": 1024,
                "messages": [
                  {
                    "content": "Hello, world",
                    "role": "user"
                  }
                ],
                "model": "claude-opus-5"
              }
            }
          ]
        }'
```

### Response (200)

```json
{
  "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
  "archived_at": "2024-08-20T18:37:24.100435Z",
  "cancel_initiated_at": "2024-08-20T18:37:24.100435Z",
  "created_at": "2024-08-20T18:37:24.100435Z",
  "ended_at": "2024-08-20T18:37:24.100435Z",
  "expires_at": "2024-08-20T18:37:24.100435Z",
  "processing_status": "in_progress",
  "request_counts": {
    "canceled": 10,
    "errored": 30,
    "expired": 10,
    "processing": 100,
    "succeeded": 50
  },
  "results_url": "https://api.anthropic.com/v1/messages/batches/msgbatch_013Zva2CMHLNnXjNJJKqJ2EF/results",
  "type": "message_batch"
}
```
