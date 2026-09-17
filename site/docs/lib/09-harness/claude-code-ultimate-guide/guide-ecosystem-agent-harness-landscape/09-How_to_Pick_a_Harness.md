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
pageSha256: "794a02aea481997a2cb04aeb9bae0bedbca01d0f23a34cbd29f9852ce1901708"
contentMode: "local-full"
zh: ""
---

## How to Pick a Harness

![A five-step selection flow defines the job, checks loop ownership, verifies evidence, pilots 8 to 12 real tasks, and ends in adopt, adjacent layer, or reject.](/mirror/89/891ebe5f89db64641b6f80149ee4ee2b399f2550.webp)

Start at the lowest layer that solves the problem. A new framework, runtime, and orchestrator introduced together create three independent failure surfaces before the team has measured one.

1. **Job:** What must the agent do: generate an answer, edit a repository, run commands, or coordinate several workers?
2. **Adoption surface:** Can the team support a CLI, IDE extension, local service, container, or managed cloud environment?
3. **Autonomy:** Which actions need approval, and what can run without a person present?
4. **Recovery:** What must survive a failed command, process restart, exhausted context window, or interrupted network call?
5. **Usage and cost:** Is the workload interactive, bursty, continuous, or parallel? Compare accepted-task cost, not token price alone.
6. **Exit:** Can prompts, repository instructions, state, tools, and audit data move to another runtime?

Feature count and GitHub popularity cannot answer those questions for a specific codebase.
