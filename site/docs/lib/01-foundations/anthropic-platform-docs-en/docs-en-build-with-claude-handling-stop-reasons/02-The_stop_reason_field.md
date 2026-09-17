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
sourceRel: "docs/en/build-with-claude/handling-stop-reasons.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/handling-stop-reasons.md"
sourceSha256: "efd90d3307adede99c65ae6faf26c590849b8ab2bf63e365825480e91855cdfd"
pageSha256: "c9c833ffe25ed729c8737fe5e3141b166825c9a8257654ae5d17d5d11f1599d6"
contentMode: "local-full"
zh: ""
---

## The stop\_reason field

The `stop_reason` field is part of every successful Messages API response. Unlike errors, which indicate failures in processing your request, `stop_reason` tells you why Claude completed its response generation.

```json Example response
{
  "id": "msg_01234",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Here's the answer to your question..."
    }
  ],
  "stop_reason": "end_turn",
  "stop_sequence": null,
  "stop_details": null,
  "usage": {
    "input_tokens": 100,
    "output_tokens": 50
  }
}
```
