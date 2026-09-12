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
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Agent Systems Handbook（智能体系统手册）

import SupportCTA from "/snippets/support-cta.mdx";

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

- [Agent Memory And Retrieval](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-memory-and-retrieval/README.md): how agents
  separate active state, durable memory, retrieval, and explicit artifacts.
- [Reasoning And Control Patterns](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/reasoning-and-control-patterns/README.md): how
  think-act-observe loops shape control, explainability, and tool use.
- [Planning And Reflection](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/planning-and-reflection/README.md): how plan-first and
  critique-and-refine patterns improve quality on longer tasks.
- [Agent Runtime Building Blocks](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/agent-runtime-building-blocks/README.md): how
  modern runtimes combine sandboxes, tool and protocol boundaries, control
  planes, memory, and adaptive endpoint surfaces.
- [Tool Design For Agent Systems](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/tool-design-for-agent-systems/README.md): how
  explicit schemas, least-privilege boundaries, failure semantics,
  observability, and verifiable outcomes make agent tools safer and more
  reliable.
- [Browser And Computer-Use Patterns](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/browser-and-computer-use-patterns/README.md):
  how UI-grounded agents observe surfaces, act within permissions, and verify
  downstream effects across browsers, apps, and other system boundaries.

## Example starters

- [Agent Memory Retrieval Starter](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/patterns/examples/agent-memory-retrieval-starter/README.md):
  a small code sketch for separating active notes, verifiable RAG retrieval
  inputs, citations, and durable artifacts.
- [Prompt Cache Agent Starter](/lib/08-agents/agent-systems-handbook/patterns-examples-prompt-cache-agent-starter-README):
  a small code sketch for keeping stable prompt prefixes separate from dynamic
  memory and current-turn inputs so agent runtime cost controls stay
  inspectable.
