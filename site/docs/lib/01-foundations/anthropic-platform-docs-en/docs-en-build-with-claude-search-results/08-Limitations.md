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
pageSha256: "56f4d6a3638c1a49e7442382be44462e807cef15b5c9c9eaad9d23a113d4ca4b"
contentMode: "local-full"
zh: ""
---

## Limitations

* Search result content blocks are available on Claude API, Amazon Bedrock, and Google Cloud.
* Only text content is supported within search results (no images or other media).
* `search_result` blocks can only appear in user messages (including inside tool results). Assistant messages with search results are rejected.
* When the [web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) is enabled in the same request, citations must be enabled on all `search_result` blocks.
