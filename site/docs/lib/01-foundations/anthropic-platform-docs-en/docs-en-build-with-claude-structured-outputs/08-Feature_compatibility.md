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
sourceRel: "docs/en/build-with-claude/structured-outputs.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/structured-outputs.md"
sourceSha256: "4e500fed30c759764ba06bcd96b9df7160ecb8e5e7611aae9bc229086e0b9204"
pageSha256: "bd53467c3a22e8c88c7ed31a43d37b869a90e6af38785d09ff239e098f3d97e5"
contentMode: "local-full"
zh: ""
---

## Feature compatibility

**Works with:**

* **[Batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing):** Process structured outputs at scale with 50% discount
* **[Token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting):** Count tokens without compilation
* **[Streaming](https://platform.claude.com/docs/en/build-with-claude/streaming):** Stream structured outputs like normal responses
* **Combined usage:** Use JSON outputs (`output_config.format`) and strict tool use (`strict: true`) together in the same request

**Incompatible with:**

* **[Citations](https://platform.claude.com/docs/en/build-with-claude/citations):** Citations require interleaving citation blocks with text, which conflicts with strict JSON schema constraints. Returns 400 error if citations enabled with `output_config.format`.
* **Message Prefilling:** Incompatible with JSON outputs

  **Grammar scope:** Grammars apply only to Claude's direct output, not to tool use calls, tool results, or thinking tags (when using [thinking](https://platform.claude.com/docs/en/build-with-claude/thinking)). Grammar state resets between sections, allowing Claude to think freely while still producing structured output in the final response.
