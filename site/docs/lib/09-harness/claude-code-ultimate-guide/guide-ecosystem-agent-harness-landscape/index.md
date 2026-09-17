---
title: "Agent Harness Landscape"
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
pageSha256: "f2c61db106afafc2a08875f22f22319c78a8e607f3cf4cf48732995d6b8f9e9a"
contentMode: "local-full"
zh: ""
---

# Agent Harness Landscape

Use this map to separate four questions that product lists often merge: which model generates, which runtime owns the tool loop, which repository configuration controls local behavior, and which orchestrator coordinates multiple runs. A project can be valuable without being a runtime harness.

The broad directory below normalizes the 160 projects and 12 categories in [Best of Agent Harnesses](https://ryanalberts.github.io/best-of-Agent-Harnesses/), then adds 33 guide supplements discovered through direct project research. It uses the upstream snapshot at commit [`ece3146`](https://github.com/RyanAlberts/best-of-Agent-Harnesses/tree/ece314654d2c23fe7bd69fc6ef7088f093207e49), dated 2026-08-23. The strict map applies an additional test: does the product own the cycle that plans, acts through tools, observes results, and decides what happens next?

An **agent harness** is the runtime around a model that assembles context, exposes tools, applies permissions, executes the action loop, records state, and handles failure. Simon Willison's concise definition, ["models using tools in a loop"](https://simonwillison.net/2025/May/22/tools-in-a-loop/), identifies the behavioral boundary. The 2026 [Agent System and Harness Design survey](https://arxiv.org/abs/2606.20683) expands that runtime into six responsibilities: observation, context, control, action, state, and verification. The [SWE-agent paper](https://papers.neurips.cc/paper_files/paper/2024/file/5a7c947568c1b1328ccc5230172e1e7c-Paper-Conference.pdf) names the coding-specific interface between the model and computer the **agent-computer interface**.

Comparison requires a second boundary: every outcome belongs to a **model-harness pair** under a disclosed task set and budget. In a controlled 300-run study across two models and three harnesses, [The Scaffold Effect](https://arxiv.org/abs/2607.22585) found up to a 40-times difference in tokens per solved task, while pass-rate differences stayed within 0 to 8 percentage points and were mostly not statistically significant. A harness can strongly affect cost and failure behavior without being the main accuracy bottleneck.

This page answers *which layer and which project*. [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) documents the components inside a runtime harness. [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) covers feedback, topology, state transitions, stopping rules, and judgment boundaries. [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) provides deeper product profiles. The [glossary](/lib/09-harness/claude-code-ultimate-guide/guide-core-glossary) separates runtime harnesses from repository harnesses and evaluation harnesses.

### Choose the right entry point

| Question | Canonical page |
|---|---|
| How does the loop, context, tool, hook, permission, and recovery machinery work? | [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) |
| How should a loop or executable workflow graph be designed and bounded? | [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) |
| Which runtime or adjacent project fits a particular job? | This [Agent Harness Landscape](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index) page |
| What does a named coding-agent product support in practice? | [Agent Tools: Beyond Claude Code](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index) |
| How should a repository prepare instructions, setup, state, and verification for any runtime? | [Repository Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#925-harness-engineering) |
| How should a shortlist be evaluated and instrumented? | [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation) and [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability) |
| Which systems optimize a harness rather than run tasks directly? | [Harness Optimizers and Meta-Harnesses](#harness-optimizers-and-meta-harnesses) |

These pages are linked but deliberately not merged. The engineering reference explains stable mechanisms. This map is a dated evidence snapshot whose projects, licences, features, and GitHub signals need a separate refresh cycle.

## 本篇目录

- [Interface, Execution, and Loop Ownership Are Separate](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/01-Interface_Execution_and_Loop_Ownership_A.md)
- [160 Projects Does Not Mean 160 Runtime Harnesses](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/02-160_Projects_Does_Not_Mean_160_Runtime_H.md)
- [The Twelve-Category Map](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/03-The_Twelve-Category_Map.md)
- [Core Coding Harnesses](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/04-Core_Coding_Harnesses.md)
- [Orchestrators: Products Above the Runtime](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/05-Orchestrators_Products_Above_the_Runtime.md)
- [Harness Optimizers and Meta-Harnesses](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/06-Harness_Optimizers_and_Meta-Harnesses.md)
- [Four Layers, Four Responsibilities](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/07-Four_Layers_Four_Responsibilities.md)
- [Complete Project Directory](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/08-Complete_Project_Directory.md)
- [How to Pick a Harness](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/09-How_to_Pick_a_Harness.md)
- [How to Test-Drive the Shortlist](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/10-How_to_Test-Drive_the_Shortlist.md)
- [Machine-Readable Access](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/11-Machine-Readable_Access.md)
- [Related Reading](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/12-Related_Reading.md)
- [Limits of This Map](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/13-Limits_of_This_Map.md)
