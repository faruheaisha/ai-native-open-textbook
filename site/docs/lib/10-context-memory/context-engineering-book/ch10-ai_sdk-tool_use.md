---
title: "Tool use with the AI SDK"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/ai_sdk/tool_use/README.md"
sourceRel: "ch10/ai_sdk/tool_use/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/ai_sdk/tool_use/README.md"
sourceSha256: "b8745761d6762e57fe4874127d3134b2ed2308bdfff762dea62963a03272bf86"
pageSha256: "b8745761d6762e57fe4874127d3134b2ed2308bdfff762dea62963a03272bf86"
contentMode: "local-full"
zh: ""
---

# Tool use with the AI SDK

This example uses `generateText()`, `tool()`, and `stepCountIs()` with a mock model that emits a tool call first and a final answer second.

## Requirements

* [Node.js](https://nodejs.org/)

## Steps for running this example in the shell

1. Install dependencies:
```bash
npm install
```

2. Run the script:
```bash
npm start
```

## Output

The script prints a tool result and the final answer from the model loop.
