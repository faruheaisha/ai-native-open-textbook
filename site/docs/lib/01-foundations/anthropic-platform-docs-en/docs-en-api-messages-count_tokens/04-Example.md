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
sourceRel: "docs/en/api/messages/count_tokens.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/messages/count_tokens.md"
sourceSha256: "6228afea7fe69ebc746b592492d77a1413ff376ba3a26a8134f9f3e9f01f718d"
pageSha256: "0390eed66494c1037e75ae94167c2f1097551588e33d114f531db1db6721a327"
contentMode: "local-full"
zh: ""
---

## Example

```bash
curl https://api.anthropic.com/v1/messages/count_tokens \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "messages": [
            {
              "content": "Hello, world",
              "role": "user"
            }
          ],
          "model": "claude-opus-5",
          "system": [
            {
              "text": "Today'\''s date is 2024-06-01.",
              "type": "text"
            }
          ],
          "thinking": {
            "type": "adaptive"
          },
          "tools": [
            {
              "input_schema": {
                "type": "object",
                "properties": {
                  "location": "bar",
                  "unit": "bar"
                },
                "required": [
                  "location"
                ]
              },
              "name": "name"
            }
          ]
        }'
```

### Response (200)

```json
{
  "input_tokens": 2095
}
```
