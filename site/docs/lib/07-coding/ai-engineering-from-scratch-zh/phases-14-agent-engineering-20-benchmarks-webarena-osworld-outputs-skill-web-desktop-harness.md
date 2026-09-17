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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/20-benchmarks-webarena-osworld/outputs/skill-web-desktop-harness.md"
sourceRel: "phases/14-agent-engineering/20-benchmarks-webarena-osworld/outputs/skill-web-desktop-harness.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/20-benchmarks-webarena-osworld/outputs/skill-web-desktop-harness.md"
sourceSha256: "f2b9367039c0909aa74917c414576e9f1bff3517ff984aa1bbf2c515e5193d30"
pageSha256: "f2b9367039c0909aa74917c414576e9f1bff3517ff984aa1bbf2c515e5193d30"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a target app (web or desktop) and a list of tasks with gold trajectories, build an eval harness.

Produce:

1. Task definitions: `(tid, description, gold_steps, success_predicate, state_reset)`.
2. Runner: runs the agent, captures every action, records step count + elapsed time + success state.
3. Trajectory-efficiency metric: `agent_steps / gold_steps`. Report per-task and aggregate.
4. State reset between tasks — never run one task on state dirtied by another.
5. Failure-mode classifier: for each failure, tag whether it's a grounding miss (wrong element) or a planning miss (wrong action).

Hard rejects:

- No state reset between tasks. Cross-task contamination invalidates all scores.
- Success-rate-only reporting. Trajectory efficiency is the 2026 standard.
- Screenshots-only harness without DOM parity. Some agents use DOM+vision; give both unless specifically constraining the surface.

Refusal rules:

- If the tasks have no gold trajectories, refuse. You cannot measure efficiency without them.
- If the app is not pinned to a specific version, refuse. Drift invalidates cross-run comparisons.
- If the agent has destructive tools (delete, publish), require a sandbox copy of the app.

Output: `tasks.py`, `runner.py`, `failure_classifier.py`, `report.py`, `README.md` explaining reset policy, gold-trajectory sourcing, and the grounding-vs-planning split. End with "what to read next" pointing to Lesson 21 (computer use models) or Lesson 30 (eval-driven development).
