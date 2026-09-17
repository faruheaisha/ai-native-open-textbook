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
pageSha256: "028e816b4a7225f5eb8f1e6d254cf9948cc11b803546d50617183307a4a8fe5b"
contentMode: "local-full"
zh: ""
---

## Best practices

### For tool-based search (Method 1)

* **Dynamic content:** Use for real-time searches and dynamic RAG applications
* **Error handling:** Return appropriate messages when searches fail
* **Result limits:** Return only the most relevant results to avoid context overflow

### For top-level search (Method 2)

* **Pre-fetched content:** Use when you already have search results
* **Batch processing:** Ideal for processing multiple search results at once
* **Testing:** Great for testing citation behavior with known content

### General best practices

1. **Structure results effectively:**

   * Use clear, permanent source URLs
   * Provide descriptive titles
   * Break long content into logical text blocks to give Claude finer citation boundaries

2. **Maintain consistency:**

   * Use consistent source formats across your application
   * Ensure titles accurately reflect content
   * Keep formatting consistent

3. **Handle errors gracefully:** when a search fails or returns nothing, return a plain text block describing the outcome (for example, `\{"type": "text", "text": "No results found."\}`) instead of raising an error: Claude explains the empty result to the user, and the conversation continues.
