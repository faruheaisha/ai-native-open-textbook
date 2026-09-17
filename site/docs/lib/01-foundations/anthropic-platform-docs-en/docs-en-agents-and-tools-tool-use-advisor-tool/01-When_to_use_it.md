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
pageSha256: "9dd219ff6dabdaaa88283cd2fb1fe519fbd6f53f43160649a2dc6a13a5bf9486"
contentMode: "local-full"
zh: ""
---

## When to use it

The advisor fits these configurations:

* **You currently use Sonnet on complex tasks:** Add a higher-tier advisor. Opus keeps total cost similar or lower; Claude Fable 5.1 maximizes the quality lift.
* **You currently use Haiku and want a step up in intelligence:** Add an Opus or Fable advisor. Expect higher cost than Haiku alone, but lower than switching the executor to a larger model.

Results are task-dependent. Evaluate on your own workload.

The advisor is a weaker fit for single-turn Q\&A (nothing to plan), pure pass-through model pickers where your users already choose their own cost and quality tradeoff, or workloads where every turn genuinely requires the advisor model's full capability.
