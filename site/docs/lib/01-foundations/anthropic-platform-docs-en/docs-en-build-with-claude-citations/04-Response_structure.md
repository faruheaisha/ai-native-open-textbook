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
sourceRel: "docs/en/build-with-claude/citations.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/citations.md"
sourceSha256: "e4a8ad0dce824af1bfe9ae8b04d0633d6fcc33360fe8503b50430b8c1e514d88"
pageSha256: "d99bd49d507c15a7d714e9cefa1e636749a6b6e6c54592e171404d453002ac58"
contentMode: "local-full"
zh: ""
---

## Response structure

When citations are enabled, responses include multiple text blocks with citations:

```json
{
  "content": [
    { "type": "text", "text": "According to the document, " },
    {
      "type": "text",
      "text": "the grass is green",
      "citations": [
        {
          "type": "char_location",
          "cited_text": "The grass is green.",
          "document_index": 0,
          "document_title": "Example Document",
          "start_char_index": 0,
          "end_char_index": 20
        }
      ]
    },
    { "type": "text", "text": " and " },
    {
      "type": "text",
      "text": "the sky is blue",
      "citations": [
        {
          "type": "char_location",
          "cited_text": "The sky is blue.",
          "document_index": 0,
          "document_title": "Example Document",
          "start_char_index": 20,
          "end_char_index": 36
        }
      ]
    },
    {
      "type": "text",
      "text": ". Information from page 5 states that "
    },
    {
      "type": "text",
      "text": "water is essential",
      "citations": [
        {
          "type": "page_location",
          "cited_text": "Water is essential for life.",
          "document_index": 1,
          "document_title": "PDF Document",
          "start_page_number": 5,
          "end_page_number": 6
        }
      ]
    },
    {
      "type": "text",
      "text": ". The custom document mentions "
    },
    {
      "type": "text",
      "text": "important findings",
      "citations": [
        {
          "type": "content_block_location",
          "cited_text": "These are important findings.",
          "document_index": 2,
          "document_title": "Custom Content Document",
          "start_block_index": 0,
          "end_block_index": 1
        }
      ]
    }
  ]
}
```

### Streaming support

For streaming responses, citations arrive as a `citations_delta` delta type inside `content_block_delta` events. Each delta contains a single citation to add to the `citations` list on the current `text` content block.

    ```sse
    event: message_start
    data: \{"type": "message_start", ...\}

    event: content_block_start
    data: \{"type": "content_block_start", "index": 0, ...\}

    event: content_block_delta
    data: \{"type": "content_block_delta", "index": 0,
           "delta": \{"type": "text_delta", "text": "According to..."&#125;&#125;

    event: content_block_delta
    data: \{"type": "content_block_delta", "index": 0,
           "delta": \{"type": "citations_delta",
                     "citation": \{
                         "type": "char_location",
                         "cited_text": "...",
                         "document_index": 0,
                         ...
                     &#125;&#125;\}

    event: content_block_stop
    data: \{"type": "content_block_stop", "index": 0\}

    event: message_stop
    data: \{"type": "message_stop"\}
    ```
