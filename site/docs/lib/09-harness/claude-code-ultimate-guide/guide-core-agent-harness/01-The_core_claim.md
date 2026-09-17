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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md"
sourceRel: "guide/core/agent-harness.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/agent-harness.md"
sourceSha256: "3ebee5bd31662cb0c785ab8945cd9b5d2fb509e0b81587839d600e81843813c1"
pageSha256: "05deb29a612c37184760b46a0c78628cb2a8d2035fed9a7aa3f2fcd33db5b1f8"
contentMode: "local-full"
zh: ""
---

## The core claim

A raw LLM is not an agent. It becomes one when connected to a harness. The useful unit of evaluation is therefore the **model-harness pair**, not either component in isolation.

The 2026 [Agent System and Harness Design survey](https://arxiv.org/abs/2606.20683) decomposes an execution harness into observation, context, control, action, state, and verification. [Code as Agent Harness](https://arxiv.org/abs/2605.18747) adds a code-centric view: code is not only an output but the executable substrate for tools, memory, control, coordination, and verification. These are useful taxonomies, not performance proofs.

Controlled evidence supports a narrower claim. In [The Scaffold Effect in Coding Agents](https://arxiv.org/abs/2607.22585), two fixed models were tested across three harnesses on 50 Terminal-Bench Pro tasks. Harness choice changed tokens per solved task by up to 40 times, while paired pass-rate differences stayed within 0 to 8 percentage points and were mostly not statistically significant. The harness can dominate cost and failure behavior without dominating task accuracy. Conversely, model quality or model-harness compatibility can remain the binding constraint. Report the pair, the task set, and the budget.

This page uses **agent harness** in its runtime sense: the system that owns the agent loop, tools, context, state, and permissions. A repository can also provide a **repository harness** around that runtime: its instructions, setup, task state, and verification gates. The distinction matters because a project can improve its repository harness without replacing Claude Code, and a team can switch runtime harnesses without discarding every project practice.

This page covers what is inside the runtime. For the repository layer, see [Repository Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#925-harness-engineering). For feedback loops, executable workflow graphs, stopping rules, and judgment boundaries, use [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering). For a dated comparison of specific products across CLI, IDE, and cloud, see the [Agent Harness Landscape](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index).

![A user goal moves through six harness stages: context building, LLM reasoning, policy gating, guarded tool execution, verification, and an accepted result. Observability spans every stage, constraints govern policy and runtime, and feedback returns accepted results to the context builder.](/mirror/b9/b9517aa7a28c64061f239efdfefb97c0f3523596.webp)

*The LLM is one stage in the reliability loop. Context, policy, guarded execution, verification, observability, constraints, and feedback determine whether the model's proposal becomes an accepted result.*

### Choose the right entry point

| Question | Canonical page |
|---|---|
| What does a runtime harness contain, and how do its controls work? | This [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) page |
| How should loops, workflow graphs, state transitions, stopping rules, and judgment be designed? | [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) |
| How should independent Claude Code sessions exchange evidence without spreading drift? | [Cross-Session Messaging: Coordination safety](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging#coordination-safety-correlated-drift-and-false-consensus) |
| Which runtime, orchestrator, framework, or adjacent project should I compare? | [Agent Harness Landscape](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) |
| What does a specific coding-agent product support? | [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) |
| What distinguishes a runtime, repository, evaluation harness, and orchestrator? | [Glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) |
| Which Claude Code release introduced a behavior? | [Claude Code Releases](/lib/09-harness/claude-code-ultimate-guide/guide-core-claude-code-releases/index) and its [machine-readable history](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/machine-readable/claude-code-releases.yaml) |

The pages remain separate on purpose. Engineering concepts change more slowly than product inventories, licences, feature evidence, and popularity signals. Combining both would make the architectural reference inherit the catalog's dated snapshot and maintenance cycle.
