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
sourceRel: "docs/en/api/beta/messages/count_tokens.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/count_tokens.md"
sourceSha256: "647ab0f66c46fa5edc201b4db022f9fd7b559ce944f6440a44855731f4a90de9"
pageSha256: "b8cff47cef9b5141ed5bbe35aadb33e5a409ae212b512e2438fd23bbbaee24cc"
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
  "context_management": {
    "original_input_tokens": 0
  },
  "input_tokens": 2095
}
```
