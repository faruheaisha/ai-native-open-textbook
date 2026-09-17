---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/16-multi-agent-and-swarms/07-society-of-mind-debate/outputs/skill-debate-configurator.md"
sourceRel: "phases/16-multi-agent-and-swarms/07-society-of-mind-debate/outputs/skill-debate-configurator.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/16-multi-agent-and-swarms/07-society-of-mind-debate/outputs/skill-debate-configurator.md"
sourceSha256: "719e6a856cd36b45506cc106d390533cc62e8937c0d18879666e3c37581c4958"
pageSha256: "719e6a856cd36b45506cc106d390533cc62e8937c0d18879666e3c37581c4958"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a question or task, produce a debate configuration ready to run on any agent framework (LangGraph, AutoGen, custom loop).

Produce:

1. **Task-fit check.** Is this task consensus-improvable? Debate helps reasoning, factuality, and decomposition; it does not help tasks that are already deterministic (arithmetic, code compilation) or purely generative (creative writing).
2. **Agent count.** 3, 4, or 5. Default 3; 4+ only if cost-insensitive and task needs more diverse views.
3. **Round count.** 2 or 3. Default 3; rarely more. Cite the Du et al. plateau.
4. **Heterogeneity.** Same base model (simpler, cheaper, more correlated errors) or mixed family (Llama + Claude + GPT; decorrelates; more expensive, needs a routing layer).
5. **Role assignment.** Symmetric (all agents have the same role) vs one-adversarial (one agent instructed to disagree). Adversarial slot is cheap insurance against sycophancy cascades.
6. **Aggregation method.** Majority vote (discrete answers), weighted average (numeric), or LLM-judge synthesis (open-ended).
7. **Cost estimate.** N agents × R rounds × median tokens per turn. State the dollar estimate given current provider pricing.

Hard rejects:

- Any config with more than 5 agents or more than 3 rounds without a concrete cost-justification.
- Symmetric-only debates on tasks with known sycophancy risk.
- Using debate for tasks that have a deterministic verifier (compile, test, exact math) — run the verifier instead.

Refusal rules:

- If the task is simple factual lookup, refuse and recommend retrieval-augmented single-agent.
- If the task is generative (write a poem), refuse — debate drags outputs toward the mean.
- If the user has not set a token/dollar budget, refuse and ask for one. Debate is 5-15× the cost of single-agent.

Output: one-page config brief. Start with the task-fit check, close with the total cost estimate.
