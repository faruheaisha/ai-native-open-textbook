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
pageSha256: "4ca6bdd6299004566befa4d79b6266150ed45a934ad8aee262999259dfb4d59c"
contentMode: "local-full"
zh: ""
---

## Harness Optimizers and Meta-Harnesses

Harness optimizers are adjacent to the strict runtime map. They do not primarily execute user tasks or coordinate a fleet. They change a target harness, evaluate candidates, and decide which version should govern later runs. Most entries below are research systems, not production products.

| System | Optimizes | Evidence | Maturity and main limit |
|---|---|---|---|
| [ADAS](https://proceedings.iclr.cc/paper_files/paper/2025/hash/36b7acf6f6010652b3f2a433774a66fe-Abstract-Conference.html) | Code-defined prompts, tools, and workflows | ICLR 2025 experiments across coding, science, and math | Peer-reviewed, but headline comparisons are system-level rather than pure fixed-model ablations |
| [AFlow](https://arxiv.org/abs/2410.10762) | Workflow topology represented as code | 5.7% average improvement across six benchmarks | ICLR 2025; heterogeneous baselines |
| [ACE](https://arxiv.org/abs/2510.04618) | Context and memory playbooks | +10.6% on agents and +8.6% on finance tasks | ICLR 2026; narrower than whole-harness optimization |
| [GEPA](https://arxiv.org/abs/2507.19457) | Prompts using reflected trajectories | 6% average gain over GRPO across six tasks; up to 35 times fewer rollouts | ICLR 2026 Oral; prompt-level optimizer |
| [Meta-Harness](https://arxiv.org/abs/2603.28052) | End-to-end harness code | Classification, math, and TerminalBench-2 improvements | 2026 preprint; coding search and final evaluation reuse the same 89 tasks |
| [Agentic Harness Engineering](https://arxiv.org/abs/2604.25850) | Prompt, tools, middleware, skills, subagents, and memory | Terminal-Bench 2 pass@1 from 69.7% to 77.0% over ten iterations | 2026 preprint focused on coding benchmarks |
| [HarnessOpt-Bench](https://arxiv.org/abs/2608.06301) | Evaluates the optimizer, not one target harness | Five optimizer models, four downstream tasks, 111 scored runs | 2026 benchmark preprint; early protocol awaiting broader reproduction |

Do not fold these systems into the 42-runtime count. A runtime owns the task loop. An optimizer owns a search loop over candidate harnesses. [Agent Harness Engineering §11](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index#11-harness-optimizers-and-meta-harnesses) documents the evidence and the minimum evaluation protocol.
