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
pageSha256: "4a0c2ed4f0fd2a872b2351f3667a84851af3e6c5f20d4a22e485b20c81505b8c"
contentMode: "local-full"
zh: ""
---

To learn how zero data retention (ZDR) applies to this feature, see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention).

The bash tool is a [client tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/how-tool-use-works): Claude doesn't run commands itself. When you include the tool in a request, Claude replies with a `tool_use` block that names the command to run. Your application runs that command in a bash session it owns and returns the output in a `tool_result` block.

Your application keeps one bash process alive across tool calls, so state persists between commands. The working directory, environment variables, and any files a command creates are still there for the next command.

The current version of the tool is `bash_20250124`. For model support, beta headers, and the earlier version, see [Tool versions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/bash-tool#tool-versions). For all Anthropic-provided tools, see the [Tool reference](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference).

## 本篇目录

- [Use cases](https://platform.claude.com/docs)
- [Quick start](https://platform.claude.com/docs)
- [How it works](https://platform.claude.com/docs)
- [Parameters](https://platform.claude.com/docs)
- [Tool versions](https://platform.claude.com/docs)
- [Example: Multistep automation](https://platform.claude.com/docs)
- [Implement the bash tool](https://platform.claude.com/docs)
- [Security](https://platform.claude.com/docs)
- [Pricing](https://platform.claude.com/docs)
- [Common patterns](https://platform.claude.com/docs)
- [Limitations](https://platform.claude.com/docs)
- [Combining with other tools](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
