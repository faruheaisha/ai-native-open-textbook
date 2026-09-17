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
sourceRel: "docs/en/agents-and-tools/tool-use/computer-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/computer-use-tool.md"
sourceSha256: "4de659db5a454a438de8f37a25742b665254c305624f55cfcc5b76491ae62d46"
pageSha256: "96d0fa97b89697c95aeaba435b29f594c75bfae67744f0f40c38624cd56b0df3"
contentMode: "local-full"
zh: ""
---

## Earlier tool versions

Two earlier versions of the computer use tool remain available in beta for existing integrations, for models that don't support the toolset, and on platforms where the toolset isn't currently available. Each requires its [beta header](https://platform.claude.com/docs/en/api/beta-headers) on every request, and their parameters are documented in the [beta Messages API reference](https://platform.claude.com/docs/en/api/beta/messages/create). In the SDKs, pass the header through the `betas` parameter and use the beta namespace; only the computer use tool needs the header, not the bash or text editor tools in the same request.

| Tool version        | Beta header               | Use with                                                                                                                                                                                                                                                                                                                                                                                                                                    | Parameters                                                                    |
| ------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `computer_20251124` | `computer-use-2025-11-24` | Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Opus 5, Claude Sonnet 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 4.6, and Claude Opus 4.5                                                                                                                                                                                                                                             | [API reference](https://platform.claude.com/docs/en/api/beta/messages/create) |
| `computer_20250124` | `computer-use-2025-01-24` | Claude Sonnet 4.5, Claude Haiku 4.5, Claude Opus 4.1 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)), Claude Sonnet 4 ([retired, except on Bedrock and Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)), and Claude Opus 4 ([retired, except on Google Cloud](https://platform.claude.com/docs/en/about-claude/model-deprecations)) | [API reference](https://platform.claude.com/docs/en/api/beta/messages/create) |

***
