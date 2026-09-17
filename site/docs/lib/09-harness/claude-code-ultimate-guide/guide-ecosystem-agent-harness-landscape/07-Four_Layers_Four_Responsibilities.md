---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md"
sourceRel: "guide/ecosystem/agent-harness-landscape.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agent-harness-landscape.md"
sourceSha256: "ac957939ce9efa9622de77b893de044c67ec7891fba95a63115acdad64fa6d55"
pageSha256: "132314c829dfa3b0d58f423d8f1a576a02ce56c4690c0dcd297f5ad63cdc51a4"
contentMode: "local-full"
zh: ""
---

## Four Layers, Four Responsibilities

![A four-layer stack separates the model, repository harness, runtime harness, and orchestrator, with control flowing down and evidence flowing up.](/mirror/03/03cd14819505eabe2d9254a95f13c3e08d932728.webp)

| Layer | Owns | Typical artifacts | Selection question |
|---|---|---|---|
| Model | Generation and reasoning | Weights, API, context window | Which model meets the task, latency, privacy, and cost constraints? |
| Repository harness | Project-specific instructions and controls | `AGENTS.md`, `CLAUDE.md`, skills, hooks, policies | What behavior must remain portable with the repository? |
| Runtime harness | Tool loop, permissions, state, recovery | CLI, IDE agent, desktop or cloud runtime | Who owns plan, act, observe, repeat? |
| Orchestrator | Queues, workspaces, budgets, multiple runs | Scheduler, fleet manager, task board | What must coordinate more than one runtime or agent? |

Frameworks, SDKs, sandboxes, memory systems, evaluation tools, observability platforms, and protocols sit beside or below these layers. LangGraph can help build a runtime; E2B can isolate its execution; Mem0 can persist memory; Langfuse can observe it; MCP can connect tools. None of those roles alone proves ownership of the coding loop.

The term *meta-harness* has two incompatible uses. Optimizer research uses it for a system that changes one or more harness layers under evaluation. Products such as Omnigent use it for a common interface that dispatches tasks to existing harnesses. Keep the roles separate: this guide classifies a dispatcher as an orchestrator or control plane, while a harness optimizer changes the system that will perform future runs. The generated directory below preserves each pinned source's wording, so Omnigent's row retains its upstream *meta-harness* label even though the guide layer is orchestration. See the [Databricks cost-management resource evaluation](/lib/09-harness/claude-code-ultimate-guide/docs-resource-evaluations-databricks-managing-ai-coding-costs-scale) for the terminology boundary.
