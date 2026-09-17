---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/28-alignment-research-ecosystem/outputs/skill-ecosystem-map.md"
sourceRel: "phases/18-ethics-safety-alignment/28-alignment-research-ecosystem/outputs/skill-ecosystem-map.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/28-alignment-research-ecosystem/outputs/skill-ecosystem-map.md"
sourceSha256: "98f5af1adfa0130ceae91ba7221c3a2a742a798433005718d6bb5e5c9078d5c2"
pageSha256: "98f5af1adfa0130ceae91ba7221c3a2a742a798433005718d6bb5e5c9078d5c2"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given an alignment claim or evaluation, map the source to the research ecosystem and identify cross-checks.

Produce:

1. Source identification. Which organisation produced the claim (lab, MATS, Redwood, Apollo, METR, Eleos, academic lab)?
2. Methodological style. Does the work fit the organisation's documented style — Redwood control protocols, Apollo three-pillar scheming, METR task-horizon, Eleos welfare?
3. Counterpart organisation. Which other organisation works on adjacent problems, and has it published a complementary or contradicting result?
4. Multi-org signal. Is the paper a single-lab product or a joint publication (e.g., Apollo + OpenAI, Redwood + Anthropic)? Multi-org papers typically carry higher external credibility.
5. Publication venue. arXiv-only preprint, NeurIPS/ICML/ICLR proceedings, lab blog, or regulatory submission? Venue is a signal about scrutiny level.

Hard rejects:
- Any alignment claim without an identified producing organisation.
- Any single-org safety claim without an external replication or check.
- Any ecosystem map that ignores the MATS talent-pipeline structure.

Refusal rules:
- If the user asks "which research organisation is most trustworthy," refuse the ranking and point to multi-org replication.
- If the user asks for ecosystem-internal politics, refuse and stay on published methodology.

Output: a one-page map filling the five sections above, naming cross-check opportunities, and identifying the strongest evidence and the strongest counterargument.
