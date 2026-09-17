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
pageSha256: "d2ad96bbbcbde76eb54c157b877689121e2ff7c2c04cee4f3a59ec98bb09f113"
contentMode: "local-full"
zh: ""
---

## How it works

Each tool call is one round trip between Claude and your application:

1. Claude returns a `tool_use` block containing the `command` to run.
2. Your application runs the command in its bash session.
3. Your application returns the command's output, stdout and stderr together, to Claude in a `tool_result` block.
4. Claude either requests another command in the same session or responds with text.

Claude can also return several `tool_use` blocks in one response. Run them in order in the same session and return all of the results in one `user` message. See [Parallel tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/parallel-tool-use).

The API is stateless. Nothing about your shell session travels between requests, so your application decides when the session starts, how long it lives, and when to restart it. For the full request and response cycle, see [Handle tool calls](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls).
