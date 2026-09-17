---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/latest-model/gpt-5.4.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/latest-model/gpt-5.4.md"
sourceSha256: "bbf8fc52c2fd49a6a367f4e1a04491b281f706c5c1b608e99868136bbc73e71a"
pageSha256: "15e8d08f09828d3c827120638f1fa1f58594e6037f68b5a84f730ca0c597cfc2"
contentMode: "local-full"
zh: ""
---

## What's new

Compared with the previous GPT-5.2 model, GPT-5.4 shows improvements in:

- Coding, document understanding, tool use, and instruction following
- Image perception and multimodal tasks
- Long-running task execution and multi-step agent workflows
- Token efficiency and end-to-end performance on tool-heavy workloads
- Web search and multi-source synthesis for hard-to-locate information
- Document-heavy and spreadsheet-heavy business workflows in customer service, analytics, and finance

GPT-5.4 brings the coding capabilities of GPT-5.3-Codex to our flagship frontier model. Developers can generate production-quality code, build polished front-end UI, follow repo-specific patterns, and handle multi-file changes with fewer retries. It also has a strong out-of-the-box coding personality, so teams spend less time on prompt tuning.

For agentic workloads, GPT-5.4 reduces end-to-end time across multi-step trajectories and often completes tasks with fewer tokens and tool calls. This makes agents more responsive and lowers the cost of operating complex workflows at scale in the API and Codex.

### New features in GPT-5.4

Like earlier GPT-5 models, GPT-5.4 supports custom tools, parameters to control verbosity and reasoning, and an allowed tools list. GPT-5.4 also introduces several capabilities that make it easier to build powerful agent systems, operate over larger bodies of information, and run more reliable automated workflows:

- **`tool_search` in the API:** GPT-5.4 improves tool search for larger tool ecosystems by using deferred tool loading. This makes tools searchable, loads only the relevant definitions, reduces token usage, and improves tool selection accuracy in real deployments. Learn more in the [tool search guide](https://developers.openai.com/api/docs/guides/tools-tool-search).
- **1M token context window:** GPT-5.4 supports up to a 1M token context window, making it easier to analyze entire codebases, long document collections, or extended agent trajectories in a single request. Read more in the [1M context window](#1m-context-window) section.
- **Built-in computer use:** GPT-5.4 is the first mainline model with built-in computer-use capabilities, enabling agents to interact directly with software to complete, verify, and fix tasks in a build-run-verify-fix loop. Learn more in the [computer use guide](https://developers.openai.com/api/docs/guides/tools-computer-use).
- **Native compaction support:** GPT-5.4 is the first mainline model trained to support compaction, enabling longer agent trajectories while preserving key context.
