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
pageSha256: "be65849ba46a66e73e7dd204c9b49238636b541e59ac358005c89e25cadf304b"
contentMode: "local-full"
zh: ""
---

## How programmatic tool calling works

When you configure a tool to be callable from code execution and Claude determines that tool is needed:

1. Claude writes Python code that invokes the tool as a function, potentially including multiple tool calls and pre/post-processing logic
2. Claude runs this code in a sandboxed container through code execution
3. When a tool function is called, code execution pauses and the API returns a `tool_use` block
4. You provide the tool result, and code execution continues (intermediate results are not loaded into Claude's context window)
5. Once all code execution completes, Claude receives the final output and continues working on the task

This approach is particularly useful for:

* **Large data processing:** Filter or aggregate tool results before they reach Claude's context
* **Multistep workflows:** Save tokens and latency by calling tools serially or in a loop without sampling Claude in-between tool calls
* **Conditional logic:** Make decisions based on intermediate tool results

  Tools that allow a code execution caller are exposed to Claude's code as async Python functions, so Claude can run them in parallel with `asyncio.gather`. Each function takes a single dict of arguments and returns a string: the text of the `tool_result` you send back. Claude's code awaits these functions with top-level `await` and parses results that it needs as structured data, for example `rows = json.loads(await query_database(\{"sql": "<sql>"\}))`.
