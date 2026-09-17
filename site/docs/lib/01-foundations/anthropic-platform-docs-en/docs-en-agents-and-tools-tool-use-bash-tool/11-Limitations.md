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
pageSha256: "b8a7e68e75da2942c1f06c945ad03863a592c59968e9682818b19539a99e2872"
contentMode: "local-full"
zh: ""
---

## Limitations

* **No interactive commands:** The session can't run `vim`, `less`, password prompts, or any command that waits for input on stdin.
* **No GUI applications:** The session is command-line only.
* **Session scope:** Bash session state is client-side. Your application is responsible for maintaining the shell session between turns.
* **Output limits:** The API doesn't truncate tool results (an oversized request is rejected). Truncate large outputs in your application before returning them to Claude.
* **No streaming:** Output reaches Claude only when your application returns the `tool_result` in the next request.
