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
sourceRel: "docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/programmatic-tool-calling.md"
sourceSha256: "5256f453318138b7eb03910688ec74c8df7cbe541509c6528bbd721e702f7df1"
pageSha256: "92d7ac05a560e25b2ac7afb7728d6fdfb6e51ff12e984c7581f76e8008bb4710"
contentMode: "local-full"
zh: ""
---

## Compatibility
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): not eligible
- Supported models: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-opus-5`, `claude-opus-4-8`, `claude-opus-4-7`, `claude-opus-4-6`, `claude-opus-4-5-20251101`, `claude-sonnet-5`, `claude-sonnet-4-6`, `claude-sonnet-4-5-20250929`
- Platforms: Claude API, Claude Platform on AWS, Microsoft Foundry [1]; not available on Amazon Bedrock, Google Cloud
- Programmatic tool calling requires the code execution tool with the `code_execution_20260120` or later [tool version](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#tool-versions).
- Claude Haiku 4.5 accepts the `code_execution_20260120` and later tool versions but doesn't support programmatic tool calling.
1. On [Microsoft Foundry](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry), programmatic tool calling requires a [Hosted on Anthropic deployment](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#additional-features-not-supported-when-hosted-on-azure).

Programmatic tool calling allows Claude to write code that calls your tools programmatically within a [code execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) container, rather than requiring round trips through the model for each tool invocation. This reduces latency for multi-tool workflows and decreases token consumption by allowing Claude to filter or process data before it reaches the model's context window. On agentic search benchmarks like [BrowseComp](https://arxiv.org/abs/2504.12516) and [DeepSearchQA](https://github.com/google-deepmind/deepsearchqa), which test multistep web research and complex information retrieval, adding programmatic tool calling on top of basic search tools improved performance by an average of 11% while using 24% fewer input tokens (see [Improved web search with dynamic filtering](https://claude.com/blog/improved-web-search-with-dynamic-filtering)).

Consider checking budget compliance across 20 employees: the traditional approach requires 20 separate model round-trips, pulling thousands of expense line items into the context along the way. With programmatic tool calling, a single script runs all 20 lookups, filters the results, and returns only the employees who exceeded their limits, shrinking what Claude needs to reason over from hundreds of kilobytes down to a handful of lines.

  For a deeper look at the inference and context costs that programmatic tool calling addresses, see [Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use).

Programmatic tool calling requires the [code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) with tool version `code_execution_20260120` or later.
