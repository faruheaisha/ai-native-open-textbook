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
pageSha256: "d71184696f2610420c32dc44936b4e26b50012b7a0fd64c8043884a13791cdc8"
contentMode: "local-full"
zh: ""
---

## How to Test-Drive the Shortlist

Test two or three candidates on 8 to 12 representative tasks from the same repositories. Use the same model, repository instructions, tool permissions, and resource budget where the products allow it. Repeat critical tasks because one successful run does not establish reliability. Give each run an isolated worktree and write pass criteria before execution.

Record the following measurements for every task:

| Measurement | What to record |
|---|---|
| Human verdict | Accepted, accepted after correction, or rejected |
| Interventions | Approval prompts, redirects, manual edits, and restarts |
| Plan drift | Work outside the requested files, contract, or acceptance criteria |
| Wall time | Time from task start to reviewed result |
| Accepted-task cost | Total model and platform cost divided by accepted tasks |
| Recovery | Whether the run resumes after a controlled interruption without repeating or losing work |
| Setup friction | Time and specialist work needed to reproduce the environment |
| Turns to accepted completion | Model or agent turns required before the reviewed result passes; Patrick Debois proposes [turn count as an enablement signal](https://www.youtube.com/watch?v=I9RWrW32QEw&t=700s) |
| Requirement coverage | Passed, failed, and unresolved acceptance criteria, each linked to its evidence |
| Proof artifacts | Commands, outputs, tests, screenshots, traces, or runtime captures needed to reproduce acceptance |
| Tail latency | Per-run distribution and slow cases, not only the mean; see Amit Kushwaha's [distribution-aware benchmark argument](https://www.youtube.com/watch?v=guhTp2Q8VX0&t=810s) |
| Model-harness pair | Exact model, version, reasoning mode, harness version, and configuration used for the result |
| Repeated-run reliability | Success consistency, perturbation tolerance, predictable resource use, and bounded failure severity; see [Towards a Science of AI Agent Reliability](https://arxiv.org/abs/2602.16666) |

Review the produced diff and tests, not the agent's self-report. A green test suite is necessary but may not cover every requirement. Simon Willison's [captured command-and-output workflow](https://www.youtube.com/watch?v=owmJyKVu5f8&t=461s) is one way to preserve a human-reviewable proof artifact, while Shachar Azriel's [executable-spec pattern](https://www.youtube.com/watch?v=aWrGSM5vVyc&t=861s) maps verification to individual requirements. Keep consequential actions behind a human or policy gate during the trial. Use the [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation) framework to define acceptance evidence, [Observability](/lib/09-harness/claude-code-ultimate-guide/guide-ops-observability) to capture traces and interventions, and [Security Hardening](/lib/09-harness/claude-code-ultimate-guide/guide-security-security-hardening/index) to test the execution boundary rather than trusting a product label. Apply the [Agentic Benchmark Checklist](https://arxiv.org/abs/2507.02825) before treating a score change as a product result: task setup and grader defects can exceed the claimed improvement.
