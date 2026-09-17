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
sourceRel: "docs/en/agents-and-tools/tool-use/tool-runner.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/tool-runner.md"
sourceSha256: "db04c59098955d6f262f3c64053a341690a96faba7b419527d86c750bca4b45f"
pageSha256: "8133244868f34edccb84fbc1b031f8a97eb3fa4f4dbe35c0949bdec638b526b9"
contentMode: "local-full"
zh: ""
---

The tool runner handles the agentic loop, error wrapping, and type safety so you don't have to. When you need human-in-the-loop approval, custom logging, or conditional execution, use the [manual loop](https://platform.claude.com/docs/en/agents-and-tools/tool-use/handle-tool-calls) instead.

Instead of manually handling tool calls, tool results, and conversation management, the tool runner automatically:

* Runs tools when Claude calls them
* Handles the request/response cycle
* Manages conversation state
* Provides type safety and validation

  The tool runner is in beta and available in the [Python SDK](https://github.com/anthropics/anthropic-sdk-python/blob/main/tools.md), [TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript/blob/main/helpers.md#tool-helpers), [C# SDK](https://github.com/anthropics/anthropic-sdk-csharp/blob/main/examples/ToolRunnerExample/Program.cs), [Go SDK](https://github.com/anthropics/anthropic-sdk-go/blob/main/tools.md), [Java SDK](https://github.com/anthropics/anthropic-sdk-java/blob/main/anthropic-java-example/src/main/java/com/anthropic/example/BetaToolRunnerExample.java), [PHP SDK](https://github.com/anthropics/anthropic-sdk-php/blob/main/examples/beta/beta_tool_runner.php), and [Ruby SDK](https://github.com/anthropics/anthropic-sdk-ruby/blob/main/helpers.md#3-auto-looping-tool-runner-beta).

## 本篇目录

- [Basic usage](https://platform.claude.com/docs)
- [Iterating over the tool runner](https://platform.claude.com/docs)
- [Advanced usage](https://platform.claude.com/docs)
- [Streaming](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
