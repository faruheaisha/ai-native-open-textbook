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
pageSha256: "19a035cb60ce9979b7907ddcd21c97d952bcd53c17992dc198b89d629aa03dab"
contentMode: "local-full"
zh: ""
---

## Best practices

### Tool design

* **Provide detailed output descriptions:** Because Claude deserializes tool results in code, document the format (JSON structure and field types)
* **Return structured data:** JSON or other machine-readable formats work best for programmatic processing
* **Keep responses concise:** Return only necessary data to minimize processing overhead

### When to use programmatic calling

Programmatic tool calling trades a small fixed overhead (container startup, script generation) for large savings on tool-result tokens and model round-trips. Whether that trade pays off depends on workload shape.

**Strong fit:**

* Fan-out or parallel operations across many items (for example, checking 50 endpoints or looking up 20 records)
* Large tool results that can be filtered, aggregated, or summarized before reaching Claude's context
* Agentic search and retrieval, where iterative querying and result filtering dominate the workflow

**Weak fit:**

* Strictly sequential workflows where each call depends on Claude reasoning over the previous result, because the script cannot skip the model round-trip in that case
* A small number of tool calls with small responses, especially on the first turn of a conversation, where container and script overhead can exceed the savings
* Tools that require immediate user feedback between calls

If you are unsure, measure billed input tokens with and without `allowed_callers` on a representative sample of your traffic before enabling it broadly.

### Performance optimization

* **Reuse containers** when making multiple related requests to maintain state
* **Batch similar operations** in a single code execution when possible
