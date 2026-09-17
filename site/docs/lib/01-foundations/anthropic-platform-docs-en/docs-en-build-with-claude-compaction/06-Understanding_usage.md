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
sourceRel: "docs/en/build-with-claude/compaction.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/compaction.md"
sourceSha256: "ef6ae7f3db36c52dbf64d94eb4e299753f9fbfa31984a8699ff31a69f9de801b"
pageSha256: "47e35d9dd08d914a73c70f713fa7db25deba265ff913bfb0aeaa979de928f55c"
contentMode: "local-full"
zh: ""
---

## Understanding usage

Compaction requires an additional sampling step, which contributes to rate limits and billing. The API returns detailed usage information in the response:

```json Output
{
  "usage": {
    "input_tokens": 23000,
    "output_tokens": 1000,
    "iterations": [
      {
        "type": "compaction",
        "input_tokens": 180000,
        "output_tokens": 3500
      },
      {
        "type": "message",
        "input_tokens": 23000,
        "output_tokens": 1000
      }
    ]
  }
}
```

The `iterations` array shows usage for each sampling iteration. When compaction occurs, you'll see a `compaction` iteration followed by the main `message` iteration. The top-level `input_tokens` and `output_tokens` match the `message` iteration exactly in this example because there is only one non-compaction iteration. The final iteration's token counts reflect the effective context size after compaction.

  The top-level `input_tokens` and `output_tokens` do not include compaction iteration usage. They reflect the sum of all non-compaction iterations. To calculate total tokens consumed and billed for a request, sum across all entries in the `usage.iterations` array.

  If you previously relied on `usage.input_tokens` and `usage.output_tokens` for cost tracking or auditing, you'll need to update your tracking logic to aggregate across `usage.iterations` when compaction is enabled. With the compaction beta enabled, every response includes `usage.iterations`, even if no compaction occurred. A `compaction` entry appears only when a new compaction is triggered during the request. Re-applying a previous `compaction` block incurs no additional compaction cost, and the top-level usage fields remain accurate in that case.
