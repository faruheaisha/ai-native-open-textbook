---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/planning-and-reflection.mdx"
sourceRel: "patterns/planning-and-reflection.mdx"
rawUrl: "/raw/08-agents/agent-systems-handbook/patterns/planning-and-reflection.mdx"
sourceSha256: "d029d86d5e244da4e639db673e46af880961daf045249ddd5ae2fb58485952f7"
pageSha256: "d029d86d5e244da4e639db673e46af880961daf045249ddd5ae2fb58485952f7"
contentMode: "local-full"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

Planning and reflection patterns add structure around an agent loop. Planning
breaks a task into an explicit execution path. Reflection evaluates a draft or
trajectory and decides what to improve.

## Why It Matters

Pure step-by-step control is often not enough for longer or more structured
tasks. The agent may need to see the whole shape of the work before acting, or
it may need a deliberate review step after producing an initial answer.

Planning and reflection are two ways to improve quality without pretending the
first pass will always be good enough.

## Mental Model

Planning patterns, such as the plan-then-execute style highlighted in the
imported source material, separate work into two phases:

- generate a task plan
- execute against that plan

Reflection patterns add another loop:

- produce an initial answer or artifact
- critique it
- refine it

These patterns are useful for different reasons.

- planning reduces drift on multi-step structured tasks
- reflection improves quality when first drafts are cheap but correctness or
  performance matters

## Architecture Diagram

```mermaid
flowchart TD
  Task["Task"] --> Plan["Plan"]
  Plan --> Execute["Execute step by step"]
  Execute --> Draft["Draft result"]
  Draft --> Review["Reflect and critique"]
  Review --> Refine["Refine or stop"]
  Refine --> Final["Final result"]
```

## Tool Landscape

Planning works well when the task can be decomposed clearly:

- structured research
- multi-step analysis
- code generation with explicit stages

Reflection works well when the system can meaningfully judge and improve its
own output:

- code quality and performance
- report structure and completeness
- task trajectories that need error correction

Both patterns benefit from lightweight memory because plans, critiques, and
prior drafts need to be available without overwhelming the main context.

## Tradeoffs

- Planning improves coherence, but it can lock the system into a weak plan if
  replanning is impossible.
- Reflection improves quality, but it increases latency and model cost.
- Detailed plans help structured work, but they can become overhead for simple
  tasks.
- Strong critique prompts can improve outputs, but they also create another
  place where prompt design can fail.

Useful defaults:

- add planning when the task has more than one meaningful dependency chain
- add reflection when quality matters enough to justify another pass
- stop iterating when additional review no longer changes the decision

## Reading Extensions

- [Reasoning And Control Patterns](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/reasoning-and-control-patterns/README.md)
- [Evaluation And Observability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/evaluation-and-observability/README.md)
- [Patterns Overview](/lib/08-agents/agent-systems-handbook/patterns-2)

## Update Log

- 2026-04-21: Initial repo-native draft based on imported reference material and lab rewrite rules.
