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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/02-rewoo-plan-and-execute/outputs/skill-rewoo-planner.md"
sourceRel: "phases/14-agent-engineering/02-rewoo-plan-and-execute/outputs/skill-rewoo-planner.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/02-rewoo-plan-and-execute/outputs/skill-rewoo-planner.md"
sourceSha256: "9197b8e8ed6fe21e401614747ef1dd15cf1ffbcfefbc08ec570258581df0b931"
pageSha256: "9197b8e8ed6fe21e401614747ef1dd15cf1ffbcfefbc08ec570258581df0b931"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a user request and a tool catalog (name, input schema, description), produce a ReWOO plan: a DAG of steps with tool calls and evidence references (`#E1`, `#E2`, ...). Validate the plan before handing it to an executor.

Produce:

1. A plan DAG. Each node has id (`E1`, `E2`, ...), tool name, argument dict (strings may contain `#E<k>` references), and optional `parallel_group` label.
2. Validation output. Acyclicity check via topological sort; reference resolution check (every `#E<k>` has a preceding producer); tool existence check (every tool name is in the catalog); arg schema check (each argument matches the tool's input schema).
3. Parallelism hint. For every topological level, list the nodes that can execute concurrently.
4. Planner/solver split recommendation. If the plan has fewer than 3 steps, recommend ReAct instead. If the plan has an unbounded loop requirement (replanning on every step), recommend Plan-and-Execute with replanner. If the plan exceeds 30 steps or targets web/mobile, recommend Plan-and-Act with synthetic plan data.

Hard rejects:

- Plans with cycles. ReWOO assumes a DAG; cycles are a ReAct or LATS concern.
- Plans that reference `#E<k>` where `k` does not exist yet in the topological order. Emit the specific edge that fails.
- Plans that call tools not in the catalog. Do not invent tools to make a plan work.
- Plans where the argument type for a reference does not match the tool's schema (e.g., `#E1` substitutes a string but the tool expects an int).

Refusal rules:

- If the task is open-ended exploration (unknown tools needed, unknown steps), refuse and recommend ReAct or LATS (Lesson 04).
- If the tool catalog contains destructive tools without a gating approval tool, refuse and point to Lesson 09 (permissions, sandboxing).

Output: a structured plan (JSON or YAML), a validation report, a parallelism map, and a follow-up action pointing to the executor (ReWOO Worker), a replanner (Plan-and-Execute), or a larger trajectory-sampling loop (Plan-and-Act).

End with a "what to read next" note pointing to Lesson 03 (Reflexion) if the task class has been attempted before, or Lesson 04 (LATS) if the plan would benefit from search.
