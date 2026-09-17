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
sourceRel: "docs/en/build-with-claude/compaction.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/compaction.md"
sourceSha256: "ef6ae7f3db36c52dbf64d94eb4e299753f9fbfa31984a8699ff31a69f9de801b"
pageSha256: "ff2b03990f2e6a0152afc157ee150a2edfdad2c9deeb46e6d2bb34082b3ec0a6"
contentMode: "local-full"
zh: ""
---

## Current limitations

* **Same model for summarization:** The model specified in your request is used for summarization. There is no option to use a different (for example, cheaper) model for the summary.

* **Compaction might fail when tools are defined:** When your request includes `tools`, the model occasionally calls a tool during the internal summarization step instead of writing a summary. When this occurs, the response contains a `compaction` block with `content: null`. To prevent this, set [`instructions`](https://platform.claude.com/docs/en/build-with-claude/compaction#custom-summarization-instructions) to a prompt that explicitly tells the model not to call tools, for example:

  ```text wrap
  Summarize the transcript inside <summary></summary> tags. Include relevant information in the summary for continuing the task in the next context window. Do not call any tools while writing this summary; respond with text only.
  ```
