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
pageSha256: "7d972f06632d23b907a34789097f9d81662427210c75da6c6073e808816aa013"
contentMode: "local-full"
zh: ""
---

## Why programmatic tool calling works

Claude is trained on large amounts of code, so presenting tools as callable Python functions lets it use that strength:

* **Tool composition:** Chained calls, loops, and conditionals are ordinary Python control flow instead of a series of model round trips
* **Result processing:** Claude's code filters and aggregates large tool outputs, or writes them to files, and only the final output enters the context window
* **Latency:** The model is not re-sampled between the tool calls inside one code execution
