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
sourceRel: "docs/en/build-with-claude/search-results.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/search-results.md"
sourceSha256: "dc7713539336cf72f67e59117447455d1af5cdf5c287359cfc75eaf9f88df906"
pageSha256: "80b3a0c13ed2f07bbd86ea099af2893d22ff7e162fc53de573ab2babb0433c4f"
contentMode: "local-full"
zh: ""
---

## How it works

Search results can be provided in two ways:

1. **From tool calls:** Your custom tools return search results, enabling dynamic RAG applications
2. **As top-level content:** You provide search results directly in user messages for pre-fetched or cached content

In both cases, Claude cites the search results automatically when citations are enabled. No special prompting is needed: ask your question, and citations appear on the text blocks that draw on your content.

### Search result schema

Search results use the following structure:

```json
{
  "type": "search_result",
  "source": "https://example.com/article", // Required: Source URL or identifier
  "title": "Article Title", // Required: Title of the result
  "content": [
    // Required: Array of text blocks
    {
      "type": "text",
      "text": "The actual content of the search result..."
    }
  ],
  "citations": {
    // Optional: Citation configuration
    "enabled": true // Enable/disable citations for this result
  }
}
```

### Required fields

| Field     | Type   | Description                                                                                                      |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| `type`    | string | Must be `"search_result"`                                                                                        |
| `source`  | string | The source of the content. Any stable string works: a URL, or an internal identifier such as `kb://article-1234` |
| `title`   | string | A descriptive title for the search result                                                                        |
| `content` | array  | An array of text blocks containing the actual content                                                            |

### Optional fields

| Field           | Type   | Description                                                                                                                                                                                                                                                                                                                     |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `citations`     | object | Citation configuration with `enabled` Boolean field. Citations are disabled by default; every example on this page sets `"enabled": true` explicitly. All search results in a request must use the same setting (see [Citation control](https://platform.claude.com/docs/en/build-with-claude/search-results#citation-control)) |
| `cache_control` | object | Cache control settings (for example, `\{"type": "ephemeral"\}`)                                                                                                                                                                                                                                                                   |

Each item in the `content` array must be a text block with:

* `type`: Must be `"text"`
* `text`: The actual text content (non-empty string)

Search results hold text only. Images and other media are not supported inside the `content` array.
