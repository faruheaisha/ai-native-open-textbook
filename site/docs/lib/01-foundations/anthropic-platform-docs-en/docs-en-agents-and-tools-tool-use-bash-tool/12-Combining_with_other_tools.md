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
pageSha256: "c00b97f3bd16ce68803331c438cb5db8b5fe103f2b25657efefb2c6b7416d7d5"
contentMode: "local-full"
zh: ""
---

## Combining with other tools

The bash tool pairs well with the [Text editor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/text-editor-tool): Claude edits a file with one tool and requests the command that runs it with the other.

  If you're also using the [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool), Claude has access to two separate execution environments: your local bash session and Anthropic's sandboxed container. State is not shared between them. See [Using code execution with other execution tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#using-code-execution-with-other-execution-tools) for guidance on prompting Claude to distinguish between environments.
