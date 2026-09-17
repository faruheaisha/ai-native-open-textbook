---
title: "GSD SDK query migration (summary blurb)"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/gsd-sdk-query-migration-blurb.md"
sourceRel: "docs/gsd-sdk-query-migration-blurb.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/gsd-sdk-query-migration-blurb.md"
sourceSha256: "cd9813be6372b281181fdee44fbbee6454cb50d2d8e6bb2930e29e080b4b610b"
pageSha256: "cd9813be6372b281181fdee44fbbee6454cb50d2d8e6bb2930e29e080b4b610b"
contentMode: "local-full"
zh: ""
---

# GSD SDK query migration (summary blurb)

Copy-paste friendly for Discord and GitHub comments.

---

**@gsd-build/sdk** replaces the untyped, monolithic `gsd-tools.cjs` subprocess with a typed, tested, registry-based query system and **`gsd-sdk query`**, giving GSD structured results, classified errors (`GSDError` with `ErrorClassification`), and golden-verified parity with the old CLI. That gives the framework one stable contract instead of a fragile, very large CLI that every workflow had to spawn and parse by hand.

**What users can expect**

- Same GSD commands and workflows they already use.
- Snappier runs (less Node startup on chained tool calls).
- Fewer mysterious mid-workflow failures and safer upgrades, because behavior is covered by tests and a single stable contract.
- Stronger predictability: outputs and failure modes are consistent and explicit.

**Cost and tokens**

The SDK does not automatically reduce LLM tokens per model call. Savings show up indirectly: fewer ambiguous tool results and fewer retry or recovery loops, which often lowers real-world session cost and wall time.

**Agents then vs now**

Agents always followed workflow instructions. What improved is the surface those steps run on. Before, workflows effectively said to shell out to `gsd-tools.cjs` and interpret stdout or JSON with brittle assumptions. Now they point at **`gsd-sdk query`** and typed handlers that return the shapes prompts expect, with clearer error reasons when something must stop or be fixed, so instruction following holds end to end with less thrash from bad parses or silent output drift.
