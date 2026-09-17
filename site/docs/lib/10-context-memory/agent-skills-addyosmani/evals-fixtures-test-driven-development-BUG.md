---
title: "Bug report: cents lost on three-way splits"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/test-driven-development/BUG.md"
sourceRel: "evals/fixtures/test-driven-development/BUG.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/test-driven-development/BUG.md"
sourceSha256: "d2ec9665dfe84bdd68c14b2226075351d650672c6a0b7cac7efe7dd8a130f112"
pageSha256: "d2ec9665dfe84bdd68c14b2226075351d650672c6a0b7cac7efe7dd8a130f112"
contentMode: "local-full"
zh: ""
---

# Bug report: cents lost on three-way splits

From finance reconciliation (ticket FIN-482):

> Splitting $100.00 three ways returns `[3333, 3333, 3333]`. That sums to
> $99.99, one cent short. Reconciliation flags every three-way invoice we
> processed this month.

Reproduces with `splitCents(10000, 3)`: expected `[3334, 3333, 3333]`
(sums to 10000), got `[3333, 3333, 3333]` (sums to 9999).
