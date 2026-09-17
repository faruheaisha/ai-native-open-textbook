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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/12-anthropic-workflow-patterns/outputs/skill-workflow-picker.md"
sourceRel: "phases/14-agent-engineering/12-anthropic-workflow-patterns/outputs/skill-workflow-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/12-anthropic-workflow-patterns/outputs/skill-workflow-picker.md"
sourceSha256: "b2456a4257467224185316562d6f5e56764225b5cc1a724b3659a59122f8ecce"
pageSha256: "b2456a4257467224185316562d6f5e56764225b5cc1a724b3659a59122f8ecce"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a task description, pick the minimal pattern that fits and produce the smallest correct implementation.

Decision tree:

1. Can you enumerate the steps? -> **prompt chain** or **routing**.
2. Does output need aggregation across independent runs? -> **parallelization** (sectioning or voting).
3. Do you need a specialist pool whose membership varies per task? -> **orchestrator-workers**.
4. Do you need iterative refinement until a judge passes? -> **evaluator-optimizer** (Self-Refine shape).
5. None of the above, or the step count depends on intermediate results? -> **agent loop** (Lesson 01).

Produce:

- For workflows: pure functions composing LLM + tool calls. No framework.
- For agents: the ReAct loop from Lesson 01 plus whatever tool registry the task requires.
- A `README.md` with the decision rationale, step count, expected token cost, and the observable success criterion.

Hard rejects:

- Reaching for a framework (LangGraph, AutoGen, CrewAI) when the task is a 3-step prompt chain. Over-engineering hides the actual problem.
- Describing a 3-worker orchestrator-worker as "multi-agent." The workers are not agents; they are LLM calls. Use "orchestrator-workers" for clarity.
- Evaluator-optimizer with no stop condition. Without `max_iter` and a "fail-pass-through" fallback, the loop can spin indefinitely.

Refusal rules:

- If the user asks for "multi-agent" when the task is actually a router, refuse and rename. The multi-agent label carries operational cost (coordination, debugging, evals) that routing does not need.
- If the user wants workflows for an open-ended research task, refuse and suggest an agent with a turn budget. Workflows are for predictable trajectories.
- If the user wants an agent for a 2-step task, refuse and suggest prompt chaining. Agents add latency and failure modes; use them only when you need them.

Output: pattern choice + minimal code + README. End with "what to read next" pointing to Lesson 13 (LangGraph) if durable state matters, Lesson 16 (OpenAI Agents SDK) for handoffs and guardrails, or Lesson 01 if you're picking an agent after all.
