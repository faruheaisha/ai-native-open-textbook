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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/16-multi-agent-and-swarms/10-group-chat-speaker-selection/outputs/skill-groupchat-selector.md"
sourceRel: "phases/16-multi-agent-and-swarms/10-group-chat-speaker-selection/outputs/skill-groupchat-selector.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/16-multi-agent-and-swarms/10-group-chat-speaker-selection/outputs/skill-groupchat-selector.md"
sourceSha256: "c9a40ff93109cce3166127ed4b2ae21d69a63c1bdd69a00544e93de66c2bab6c"
pageSha256: "c9a40ff93109cce3166127ed4b2ae21d69a63c1bdd69a00544e93de66c2bab6c"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task and an agent roster, produce a GroupChat configuration: selector choice, selector inputs, termination rules, and guardrails.

Produce:

1. **Selector variant.** Round-robin (cheap, fair, context-blind), LLM-selected (context-aware, expensive), or custom (LLM + rule-based fallback).
2. **Selector inputs.** If LLM-selected: recent N messages, agent specialties, turn counts. If custom: explicit rules.
3. **Termination rules.** Max rounds, TERMINATE token, goal-reached verifier, or combination.
4. **Hot-speaker mitigation.** Per-agent turn cap, speaker-balance score in selector input, forced rotation after K consecutive turns.
5. **Context bloat mitigation.** Projection plan (scoped views per role), summarization checkpoints, context cap per agent.
6. **Observability.** Log selector's input, selector's choice, per-turn agent latency.

Hard rejects:

- Any LLM-selected config without logging of selector's input/output. Debugging becomes impossible.
- Configs without a max_rounds cap.
- Symmetric chats (no specialization) on reasoning tasks — use debate (Lesson 07) instead.

Refusal rules:

- If the task has a known DAG structure, refuse GroupChat and recommend LangGraph static graph for determinism.
- If the task requires strict audit trails, refuse GroupChat; recommend LangGraph with checkpointer.
- If the agents number more than 5-6, refuse flat GroupChat and recommend nested groups or hierarchical pattern.

Output: a one-page GroupChat config brief. Close with the cost estimate (LLM-selected incurs one selector call per turn).
