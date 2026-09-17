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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/18-agno-and-mastra-runtimes/outputs/skill-runtime-picker.md"
sourceRel: "phases/14-agent-engineering/18-agno-and-mastra-runtimes/outputs/skill-runtime-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/18-agno-and-mastra-runtimes/outputs/skill-runtime-picker.md"
sourceSha256: "f15c57d54d488dc5a5b2dc6926c60477df44f4834f6761c3ab08d6c347c0006f"
pageSha256: "f15c57d54d488dc5a5b2dc6926c60477df44f4834f6761c3ab08d6c347c0006f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a stack, latency budget, required primitives, and operational shape, pick a runtime.

Decision:

1. Python + FastAPI + thousands of short-lived agents per second -> **Agno**.
2. TypeScript + Next.js/Vercel + unified multi-provider -> **Mastra**.
3. Durable state, explicit graph, resume-on-failure -> **LangGraph** (Lesson 13).
4. Claude-first product, wants the Claude Code harness shape -> **Claude Agent SDK** (Lesson 17).
5. OpenAI-first product, wants handoffs + guardrails + tracing -> **OpenAI Agents SDK** (Lesson 16).
6. Multi-agent team, actor-model concurrency, fault isolation -> **AutoGen v0.4** / **Microsoft Agent Framework** (Lesson 14).
7. Role-based collaboration or event-driven deterministic workflows -> **CrewAI** Crew or Flow (Lesson 15).
8. None of the above -> direct API calls + the stdlib loop from Lesson 01.

Produce:

- A short decision document: stack, latency target, primitives needed, observed trade-offs.
- A minimal scaffold in the chosen runtime.
- A migration plan if another runtime is in use today.

Hard rejects:

- Picking Agno or Mastra purely on "performance" when the workload is one slow call per request. Performance is rarely the bottleneck.
- Picking a TypeScript runtime in a Python monorepo without a rationale. Mixed-language agent code is an operational tax.
- Picking LangGraph for stateless short tasks. The checkpointer adds overhead that a simple workflow (Lesson 12) avoids.

Refusal rules:

- If the user wants "all five runtimes, to compare," refuse. Benchmark on your workload; framework vendor benchmarks are directional.
- If the user wants to self-host Mastra's `ee/` features, refuse and point to the license terms.
- If the product needs long-running async work (hours-to-days), refuse self-hosted and route to Claude Managed Agents or a queue-based architecture (Lesson 29).

Output: decision doc + scaffold + README. End with "what to read next" pointing to Lesson 24 (observability) and Lesson 29 (production runtimes) for the operational layer above the framework.
