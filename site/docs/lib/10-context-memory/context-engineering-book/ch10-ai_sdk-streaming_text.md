---
title: "Streaming text with the AI SDK"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/ai_sdk/streaming_text/README.md"
sourceRel: "ch10/ai_sdk/streaming_text/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/ai_sdk/streaming_text/README.md"
sourceSha256: "787c4ff26b55f19a6782fa16e349c56d127d803504ae083a7966410631bf0330"
pageSha256: "787c4ff26b55f19a6782fa16e349c56d127d803504ae083a7966410631bf0330"
contentMode: "local-full"
zh: ""
---

# Streaming text with the AI SDK

This example uses `streamText()` with `MockLanguageModelV3` and `simulateReadableStream()` so it runs locally without an API key.

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

The script streams `Hello, world!` to the terminal.
