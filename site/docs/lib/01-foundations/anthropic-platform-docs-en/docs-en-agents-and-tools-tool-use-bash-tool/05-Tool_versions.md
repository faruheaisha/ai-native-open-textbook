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
pageSha256: "1eca44f84fbddf3d7faab5623d8a069c3efafb7ef47e26421d93b2dd5982b707"
contentMode: "local-full"
zh: ""
---

## Tool versions

`bash_20250124` is the current version of the tool, and it requires no beta header. Every model from Claude Sonnet 3.7 ([retired](https://platform.claude.com/docs/en/about-claude/model-deprecations)) onward accepts it, including all current Claude models.

The original `bash_20241022` version works only with the October 2024 Claude Sonnet 3.5 model ([retired](https://platform.claude.com/docs/en/about-claude/model-deprecations)). Requests that use it need the `anthropic-beta: computer-use-2024-10-22` header, and the SDKs expose it only in their beta namespaces. New integrations should use `bash_20250124`.
