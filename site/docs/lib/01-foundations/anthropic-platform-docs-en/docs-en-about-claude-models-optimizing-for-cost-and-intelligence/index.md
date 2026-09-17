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
sourceRel: "docs/en/about-claude/models/optimizing-for-cost-and-intelligence.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/about-claude/models/optimizing-for-cost-and-intelligence.md"
sourceSha256: "02a2c9604100c24f7a4e7265a73c9be80f789384e8402709656d21737957e59e"
pageSha256: "0237deba085b1a6a12026f449ee1142f53f177a0aa12afaee2bf0402328289e4"
contentMode: "local-full"
zh: ""
---

When a workload moves from prototype to production, cost becomes a first-class design constraint. The most capable model can be too expensive at scale, and the least expensive model can fall short on quality. Managing cost well means understanding how each cost lever affects output quality, because some levers trade against quality and some don't. The Claude Platform gives you direct control over that tradeoff. You choose the model, the effort level, and the architecture for each request, which lets you place a workload almost anywhere on the cost-to-intelligence frontier.

Cost and intelligence are usually pictured as a frontier where one buys the other. The first group of levers on this page moves a workload toward that frontier by cutting cost without touching quality; only the second group moves along it:

![Schematic of the cost-to-intelligence frontier: one arrow cuts spend at the same quality, the other trades quality for cost](https://platform.claude.com/docs/images/cost-intel-frontier.png)

The levers come in two kinds:

* **Free wins** cut spend without touching quality: prompt caching, token hygiene, a prompt audit against the model you are running, [batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing) at 50% off for work that can wait up to 24 hours, and [workspace spend limits](https://platform.claude.com/docs/en/api/rate-limits#setting-lower-limits-for-workspaces) as the backstop.
* **Tradeoffs** exchange cost for intelligence: model choice, effort, output caps and task budgets, and multi-model architectures.

Each lever comes with measured results and the rule for when it pays. In Anthropic's measurements, prompt caching was the largest lever by a wide margin: it cut agent-loop cost by a factor of 2.7 to 5.3 on this guide's benchmarks and cut a small triage agent's bill by 83%, or 88% with input trimming added. The multi-model levers are narrower; a second model paid off in two shapes, an advisor and an orchestrator.

## 本篇目录

- [Start here](https://platform.claude.com/docs)
- [Cut spend without losing quality](https://platform.claude.com/docs)
- [Trade cost against intelligence](https://platform.claude.com/docs)
- [Combine models](https://platform.claude.com/docs)
- [Measure on your own workload](https://platform.claude.com/docs)
- [Benchmarks referenced](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
