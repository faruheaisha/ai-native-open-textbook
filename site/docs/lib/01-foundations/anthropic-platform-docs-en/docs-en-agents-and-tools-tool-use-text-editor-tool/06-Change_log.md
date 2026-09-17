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
sourceRel: "docs/en/agents-and-tools/tool-use/text-editor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/text-editor-tool.md"
sourceSha256: "177d2635fdb6362ac4880d096f3046f73bf79cc947c8abb6d8e5036e64835759"
pageSha256: "0b97d1c0e43e18c00974c620962cbec653babc385a93e53e3adc2194927b1593"
contentMode: "local-full"
zh: ""
---

## Change log

| Date             | Version                | Changes                                                                                                                                                                                                                                                                                                                  |
| ---------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| July 28, 2025    | `text_editor_20250728` | Release of an updated text editor tool that fixes some issues and adds an optional `max_characters` parameter. It is otherwise identical to `text_editor_20250429`.                                                                                                                                                      |
| April 29, 2025   | `text_editor_20250429` | Release of the text editor tool for Claude 4. This version removes the `undo_edit` command but maintains all other capabilities. The tool name has been updated to reflect its str\_replace-based architecture.                                                                                                          |
| March 13, 2025   | `text_editor_20250124` | Introduction of standalone text editor tool documentation. This version is optimized for Claude Sonnet 3.7 but has identical capabilities to the previous version.                                                                                                                                                       |
| October 22, 2024 | `text_editor_20241022` | Initial release of the text editor tool with Claude Sonnet 3.5 (retired; see [Model deprecations](https://platform.claude.com/docs/en/about-claude/model-deprecations)). Provides capabilities for viewing, creating, and editing files through the `view`, `create`, `str_replace`, `insert`, and `undo_edit` commands. |
