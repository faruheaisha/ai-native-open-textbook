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
pageSha256: "2f28e04c8d1328fa29df685243e55046e4f93be537cf97bb75d75ed0bc9a9f39"
contentMode: "local-full"
zh: ""
---

## Token efficiency

Programmatic tool calling reduces token consumption in three ways:

* **Tool results from programmatic calls are not added to Claude's context** - only the final code output is
* **Intermediate processing happens in code** - filtering, aggregation, and other transformations don't consume model tokens
* **Multiple tool calls in one code execution** - reduces overhead compared to separate model turns

For example, calling 10 tools directly uses \~10x the tokens of calling them programmatically and returning a summary.

In Anthropic's internal evaluations on a production Claude model:

* On a 75-tool project-management agent benchmark, enabling programmatic tool calling reduced billed input tokens by roughly 38% with no change in task accuracy.
* On [τ²-bench](https://arxiv.org/abs/2506.07982) (airline, retail, and telecom domains), where each turn makes one or two sequential tool calls, programmatic tool calling left scores unchanged and cost roughly 8% more. Sequential single-call workflows do not benefit.
* Across production API traffic, requests whose `tools` array contains 10 to 49 tool definitions see typical token savings of 20% to 40% with programmatic tool calling enabled.

Actual savings vary with workload shape. See [When to use programmatic calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling#when-to-use-programmatic-calling).
