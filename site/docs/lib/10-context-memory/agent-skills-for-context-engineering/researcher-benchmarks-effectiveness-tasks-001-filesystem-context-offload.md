---
title: "001 - Filesystem context offload"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/README.md"
sourceRel: "researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/README.md"
sourceSha256: "4ae1af9564863e50508b70e39965c31ddc034fef59dc887e8655736435f52dd6"
pageSha256: "4ae1af9564863e50508b70e39965c31ddc034fef59dc887e8655736435f52dd6"
contentMode: "local-full"
zh: ""
---

# 001 - Filesystem context offload

## Hypothesis

An agent equipped with the `filesystem-context` skill will:

1. Write the simulated tool output to a file under `scratch/` instead of returning it inline.
2. Use targeted retrieval (grep + read with line ranges) to answer the follow-up question without re-loading the full payload.
3. Use noticeably fewer total tokens than the control condition.

A control agent (no skills) is expected to dump the full payload back into context or otherwise inflate token usage.

## Setup

The `starting/` directory contains:

- `tool_output.txt`: ~5,000 lines of synthetic agent-trace data with one targeted fact buried at line 4321.
- `instructions.md`: brief reminder of what files are present.

The agent receives `task.md` as its prompt.

## Grading

`verify.sh` checks:

1. `scratch/` directory exists (skill behavior expected).
2. At least one file in `scratch/` contains lines copied from `tool_output.txt` (the agent actually offloaded).
3. The agent's final response contains the targeted fact (`API_RATE_LIMIT=8475`).

A run passes when all three checks pass. Token cost and wall time are recorded regardless and reported as effect sizes against the `control` condition.

## Categories of behavior we expect to differentiate

- `control`: agent likely returns the full output inline or fails to find the fact; high tokens.
- `target` (filesystem-context loaded): agent should offload and retrieve targeted; lower tokens, success.
- `negative` (bdi-mental-states loaded, filesystem-context absent): equivalent to control.
- `full` (all skills): success rate should match `target`; tokens may be slightly higher from extra context.
