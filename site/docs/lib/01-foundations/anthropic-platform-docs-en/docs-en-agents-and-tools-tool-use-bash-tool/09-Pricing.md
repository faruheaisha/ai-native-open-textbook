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
sourceRel: "docs/en/agents-and-tools/tool-use/bash-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/bash-tool.md"
sourceSha256: "d63bfc6cf76c6d6dd8a08c8fa3617a2fba9c13f554b11f823fc3892abe8b93e2"
pageSha256: "dc324829a234d3993d5d45f58e54188823ed16ac5fa8c6ecc4c0cd63564d90d5"
contentMode: "local-full"
zh: ""
---

## Pricing

The bash tool definition adds the following input tokens to your request. This is in addition to the per-model [tool use system prompt](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview#pricing) that applies whenever any tool is present.

| Model                                               | Additional input tokens |
| --------------------------------------------------- | ----------------------- |
| Claude Opus 5, Claude Opus 4.8, and Claude Opus 4.7 | 325 tokens              |
| Claude Opus 4.6, Claude Sonnet 4.6, and earlier     | 244 tokens              |

Additional tokens are consumed by:

* Command outputs (stdout/stderr)
* Error messages
* Large file contents

See [tool use pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview#pricing) for complete pricing details.
