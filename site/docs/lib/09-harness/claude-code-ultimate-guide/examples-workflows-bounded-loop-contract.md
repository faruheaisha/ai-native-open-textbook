---
title: "Bounded Agent Loop Contract"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/bounded-loop-contract.md"
sourceRel: "examples/workflows/bounded-loop-contract.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/workflows/bounded-loop-contract.md"
sourceSha256: "8c8468ba8c5de55f0eebc940fdc3c6d47c5ebb39e2c6fb6153ae7a359de4d1b8"
pageSha256: "8c8468ba8c5de55f0eebc940fdc3c6d47c5ebb39e2c6fb6153ae7a359de4d1b8"
contentMode: "local-full"
zh: ""
---

# Bounded Agent Loop Contract

Use this pattern when one agent can complete the job through repeated action and verification. It keeps the control flow explicit without introducing a workflow framework.

The runnable companion is [`bounded-loop-example.py`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/bounded-loop-example.py).

## Contract

| Field | Required decision |
| --- | --- |
| Goal | What outcome is requested? |
| Action | What may change on each attempt? |
| Observation | What evidence did execution produce? |
| Verifier | Which independent check accepts or rejects the evidence? |
| Budget | How many attempts or how much cost may the loop consume? |
| Stop rule | What exact condition returns an accepted result? |
| Escalation | What happens when the budget expires? |

The example records every transition. A rejected attempt returns to `act`; a verified attempt moves to `accepted`; budget exhaustion moves to `escalated`.

```text
act -> verify -> accepted
 ^        |
 |        v
 +----- rejected

act or verify -> escalated  when the attempt budget is exhausted
```

## Run

```bash
python3 examples/workflows/bounded-loop-example.py
```

Expected result:

```text
accepted after 2 attempts
```

## When to move to a graph

Keep the loop while every rejected result returns to one next action. Introduce an explicit graph when the workflow needs several branches, parallel work, joins, persistent checkpoints, or different authorities for different transitions.

See [Loop & Graph Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-loop-graph-engineering) for the design rules and [Agent Harness Engineering](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index) for the runtime boundary around the loop.
