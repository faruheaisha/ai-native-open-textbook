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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "8f7bc5adac278daf001df1ea3ca0627d07ebacfb805b592e8a336600f1facaa7"
contentMode: "local-full"
zh: ""
---

## Usage and billing

Advisor calls run as a separate sub-inference billed at the advisor model's rates. Usage is reported in the `usage.iterations[]` array:

```json
{
  "usage": {
    "input_tokens": 1760,
    "cache_read_input_tokens": 412,
    "cache_creation_input_tokens": 0,
    "output_tokens": 531,
    "iterations": [
      {
        "type": "message",
        "input_tokens": 412,
        "cache_read_input_tokens": 0,
        "cache_creation_input_tokens": 0,
        "output_tokens": 89
      },
      {
        "type": "advisor_message",
        "model": "claude-opus-5",
        "input_tokens": 823,
        "cache_read_input_tokens": 0,
        "cache_creation_input_tokens": 0,
        "output_tokens": 1612
      },
      {
        "type": "message",
        "input_tokens": 1348,
        "cache_read_input_tokens": 412,
        "cache_creation_input_tokens": 0,
        "output_tokens": 442
      }
    ]
  }
}
```

Top-level `usage` fields reflect executor tokens only. Advisor tokens are not rolled into the top-level totals because they are billed at a different rate. Iterations with `type: "advisor_message"` are billed at the advisor model's rates, and iterations with `type: "message"` are billed at the executor model's rates.

Every top-level `usage` field is the sum of that field across all executor iterations, including `input_tokens`, `output_tokens`, and `cache_read_input_tokens`. Because each executor iteration re-sends the growing conversation, later iterations' inputs include earlier iterations' output, so summed `input_tokens` exceeds the size of any single prompt. Use `usage.iterations` for a full per-iteration breakdown when building cost-tracking logic.

Advisor output is typically 400 to 700 text tokens, or 1,400 to 1,800 tokens total including thinking. The cost savings come from the advisor not generating your full final output. The executor does that at its lower rate.

The top-level `max_tokens` applies to executor output only. It does not bound advisor sub-inference tokens. To cap advisor output directly, set [`max_tokens` on the tool definition](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#capping-advisor-output). The advisor's tokens also do not draw from any [task budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets) applied to the executor.

[Priority Tier](https://platform.claude.com/docs/en/api/service-tiers) applies to each model independently. A Priority Tier commitment on the executor model does not extend to the advisor. Advisor calls run at Priority Tier only if your organization also holds a commitment on the advisor model.
