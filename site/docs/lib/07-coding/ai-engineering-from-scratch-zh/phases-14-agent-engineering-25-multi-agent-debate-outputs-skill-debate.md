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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/25-multi-agent-debate/outputs/skill-debate.md"
sourceRel: "phases/14-agent-engineering/25-multi-agent-debate/outputs/skill-debate.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/25-multi-agent-debate/outputs/skill-debate.md"
sourceSha256: "30b866067ccc5db5f3ff81f22b726653f563b5e02f46a2d1ea71db4c20027e39"
pageSha256: "30b866067ccc5db5f3ff81f22b726653f563b5e02f46a2d1ea71db4c20027e39"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a question class and accuracy target, scaffold a debate protocol.

Produce:

1. `Debater` with different prompts (and ideally different models) to avoid homogenization.
2. Round runner: full mesh, star, or ring topology.
3. Convergence rule: majority-vote, weighted by confidence, or supermajority-with-fallback.
4. Round 1 forced disagreement: every debater returns a distinct proposal if possible.
5. Cost accounting: total critique ops + token cost per question.

Hard rejects:

- All debaters with the same prompt AND same model. Guaranteed groupthink.
- Full mesh with N >= 6 without checking cost. Debate ops scale O(N*R).
- No convergence rule. Returning the round-R answer of debater 0 is not convergence.

Refusal rules:

- If the product is latency-sensitive (<1s budget), refuse debate. Use Self-Refine (Lesson 05) or parallel voting (Lesson 12) instead.
- If the question class is simple factual lookup (capital, date, definition), refuse debate. Lookup + CRITIC (Lesson 05) is cheaper.
- If the debaters have no disagreement after round 1 on any question in the eval set, refuse the protocol. You need model/prompt diversity.

Output: `debater.py`, `topology.py`, `convergence.py`, `runner.py`, `README.md` explaining N/R choice, topology rationale, and cost-vs-accuracy measurements on the eval set. End with "what to read next" pointing to Lesson 12 (workflow patterns) if the task is simpler, or Lesson 28 (orchestration patterns) for embedding debate in a larger system.
