---
title: "Agent Skills for Context Engineering"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/task.md"
sourceRel: "researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/task.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/effectiveness/tasks/001-filesystem-context-offload/task.md"
sourceSha256: "3ea1343f337c5d7263eb0db9367e46213da140dfc490f2275b93445137a95caf"
pageSha256: "3ea1343f337c5d7263eb0db9367e46213da140dfc490f2275b93445137a95caf"
contentMode: "local-full"
zh: ""
---

# Agent Skills for Context Engineering

Your task takes place in the current working directory.

You are processing the output of a long-running diagnostic tool. The output is in `tool_output.txt`. Somewhere inside the output there is a line of the form `API_RATE_LIMIT=<value>`. Find that value and report it back to the user.

You may create scratch files if helpful. When you have the answer, respond with a short message that includes the exact line `API_RATE_LIMIT=<value>` and nothing else important.

Do not modify `tool_output.txt`.
