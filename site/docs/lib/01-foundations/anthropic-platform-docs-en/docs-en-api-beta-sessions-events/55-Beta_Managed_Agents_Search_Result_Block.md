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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "b0ed41cebe51b3ca4c14fe53220d5c7216a171a709efdce62e844de6f93b15a2"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Search Result Block

- `BetaManagedAgentsSearchResultBlock object`

  A block containing a web search result.

  - `type: "search_result"`

  - `citations: BetaManagedAgentsSearchResultCitations`

    Citation settings for a search result.

    - `enabled: boolean`

      Whether citations are enabled for this search result.

  - `content: array of BetaManagedAgentsSearchResultContent`

    Array of text content blocks from the search result.

    - `type: "text"`

    - `text: string`

      The text content.

      minLength: 1

  - `source: string`

    The URL source of the search result.

    minLength: 1

  - `title: string`

    The title of the search result.

    minLength: 1
