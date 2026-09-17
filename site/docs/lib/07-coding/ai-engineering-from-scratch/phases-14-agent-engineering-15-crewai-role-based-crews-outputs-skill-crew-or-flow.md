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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/15-crewai-role-based-crews/outputs/skill-crew-or-flow.md"
sourceRel: "phases/14-agent-engineering/15-crewai-role-based-crews/outputs/skill-crew-or-flow.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/15-crewai-role-based-crews/outputs/skill-crew-or-flow.md"
sourceSha256: "64af007589e23b508d4f9bf772046d293651c65c03b5cd02d3ac78c2065070af"
pageSha256: "64af007589e23b508d4f9bf772046d293651c65c03b5cd02d3ac78c2065070af"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task description, pick Crew (autonomous) or Flow (deterministic), then scaffold.

Decision:

1. Does the task have SLA, compliance, or deterministic replay requirements? -> Flow.
2. Is the task exploratory (research, first draft, brainstorm)? -> Crew.
3. Does the task have 4+ specialists with LLM-picked ordering? -> Hierarchical Crew.
4. Does the task have <=3 specialists in a fixed order? -> Sequential Crew or Flow — prefer Flow.

For Crews, produce:

1. Agent definitions: role, goal, backstory (tight, <=200 words), tools.
2. Task definitions: description, expected_output, agent.
3. Crew with the right Process (Sequential | Hierarchical).
4. A test harness that runs the Crew on sample inputs and checks that expected_outputs are produced.

For Flows, produce:

1. `@start` entry function.
2. `@listen(topic)` steps forming a DAG.
3. Explicit event topics; no magical broadcast.
4. A replay harness: given a kickoff payload, rerun deterministically.

Hard rejects:

- Crews without backstories. Backstories are load-bearing.
- Flows without explicit topic names. "Implicit chaining" defeats the audit purpose.
- Hierarchical Crews with 2 specialists. The manager overhead is not earning cost.

Refusal rules:

- If the user asks for a Crew on a prod-only compliance task, refuse and migrate to Flow.
- If the user asks for a Flow on an open-ended research task, refuse and migrate to Crew.
- If the backstory exceeds 200 words, refuse and require a trim. Context budget is finite.

Output: `agents.py`, `tasks.py`, `crew.py` or `flow.py`, plus `README.md` with the decision rationale. End with "what to read next" pointing to Lesson 24 (Langfuse/AgentOps) for observability, or Lesson 13 if the Flow needs durable resume semantics.
