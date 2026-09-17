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
pageSha256: "408f4a2bc9403c091fe7b4b53830834566ca1f85b0a7236cf66ac16481e39af2"
contentMode: "local-full"
zh: ""
---

## How compaction works

When compaction is enabled, Claude automatically summarizes your conversation when it reaches the configured token threshold. The API:

1. Detects when input tokens reach your specified trigger threshold.
2. Generates a summary of the current conversation.
3. Creates a `compaction` block containing the summary.
4. Continues the response with the compacted context.

On subsequent requests, append the response to your messages. The API automatically drops all content blocks prior to the `compaction` block, continuing the conversation from the summary.

![Compaction flow: when input tokens reach the trigger, Claude writes a summary into a compaction block and continues](https://platform.claude.com/docs/images/compaction-flow.svg)
