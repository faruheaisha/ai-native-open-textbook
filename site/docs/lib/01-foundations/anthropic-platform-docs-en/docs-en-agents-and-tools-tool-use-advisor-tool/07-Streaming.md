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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "041b4b813c335d4221022111bdc989460ff21dd4ff091c045815245983217ac7"
contentMode: "local-full"
zh: ""
---

## Streaming

The advisor sub-inference does not stream. The executor's stream pauses while the advisor runs; then the full result arrives in a single event.

The `server_tool_use` block with `name: "advisor"` signals that an advisor call is starting. The pause begins when that block closes (`content_block_stop`). During the pause, the stream is quiet except for standard SSE `ping` keepalives emitted roughly every 30 seconds. Short advisor calls might show no pings.

When the advisor finishes, the `advisor_tool_result` arrives fully formed in a single `content_block_start` event (no deltas). Executor output then resumes streaming.

A `message_delta` event follows with the updated `usage.iterations` array reflecting the advisor's token counts.
