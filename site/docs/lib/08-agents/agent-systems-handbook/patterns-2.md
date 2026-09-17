---
title: "Patterns"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/README.md"
sourceRel: "patterns/README.md"
rawUrl: "/raw/08-agents/agent-systems-handbook/patterns/README.md"
sourceSha256: "d2cc194b7a98a0ff2ce0ce5209fd24fb977136d59d3d8f4dcab5665062bbb090"
pageSha256: "d2cc194b7a98a0ff2ce0ce5209fd24fb977136d59d3d8f4dcab5665062bbb090"
contentMode: "local-full"
zh: ""
---

# Patterns

This lane captures reusable design patterns that show up across agent
implementations, independent of framework choice.

## What belongs here

- Tool use
- Planning and task decomposition
- Reflection and repair loops
- Short-term and long-term memory patterns
- Subagents and delegation
- Browser and computer-use patterns
- Human-in-the-loop workflows
- Long-running task design
- Deep research patterns

## Editorial intent

Pages in this lane should explain mechanism, tradeoffs, and failure modes.
They should stay useful even as individual frameworks rise or fall.

## Current pages

- [Agent Memory And Retrieval](/lib/08-agents/agent-systems-handbook/patterns-agent-memory-and-retrieval): how agents
  separate active state, durable memory, retrieval, and explicit artifacts.
- [Reasoning And Control Patterns](/lib/08-agents/agent-systems-handbook/patterns-reasoning-and-control-patterns): how
  think-act-observe loops shape control, explainability, and tool use.
- [Planning And Reflection](/lib/08-agents/agent-systems-handbook/patterns-planning-and-reflection): how plan-first and
  critique-and-refine patterns improve quality on longer tasks.
- [Agent Runtime Building Blocks](/lib/08-agents/agent-systems-handbook/patterns-agent-runtime-building-blocks): how
  modern runtimes combine sandboxes, tool and protocol boundaries, control
  planes, memory, and adaptive endpoint surfaces.

## Example starters

- [Agent Memory Retrieval Starter](/lib/08-agents/agent-systems-handbook/patterns-examples-agent-memory-retrieval-starter):
  a small code sketch for separating active notes, verifiable RAG retrieval
  inputs, citations, and durable artifacts.
