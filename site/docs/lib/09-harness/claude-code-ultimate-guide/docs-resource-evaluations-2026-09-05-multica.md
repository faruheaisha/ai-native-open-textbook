---
title: "Multica: issue-driven control plane for coding agents"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/2026-09-05-multica.md"
sourceRel: "docs/resource-evaluations/2026-09-05-multica.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/docs/resource-evaluations/2026-09-05-multica.md"
sourceSha256: "326eecb43d548dbc0e886f935d6f7d5b7a2816ea6d247a15bf19411393c86f8a"
pageSha256: "326eecb43d548dbc0e886f935d6f7d5b7a2816ea6d247a15bf19411393c86f8a"
contentMode: "local-full"
zh: ""
---

# Multica: issue-driven control plane for coding agents

## Evaluation metadata

| Field | Value |
|---|---|
| Resource | [multica-ai/multica](https://github.com/multica-ai/multica) |
| Evidence snapshot | Commit [`7a438bd`](https://github.com/multica-ai/multica/tree/7a438bd5b8bf39afd54259a7eb0971390e50a8ef) |
| Current metadata check | 2026-09-09: 49,348 stars, 6,375 forks, release [`v0.4.41`](https://github.com/multica-ai/multica/releases/tag/v0.4.41) published 2026-09-07 |
| Resource type | Source-available multi-agent control plane |
| Decision | Integrate |
| Score | 3/5, moderate value |

## Verdict

Multica fills a real documentation gap between terminal multiplexers and coding-agent runtimes. It gives people and agents a shared issue, chat, schedule, and run-management layer while connected computers execute existing coding-agent CLIs. It belongs in the guide as an adjacent control plane, not as a runtime harness that owns the model-tool loop.

The integration should remain evidence-bounded. The source review confirms the architecture and important permission boundaries, but this evaluation did not run the application or complete a real agent task. GitHub popularity shows reach, not reliability or output quality.

## Observed architecture

```text
Web, desktop, or mobile client
            |
            v
Multica server + PostgreSQL
issues, chat, agents, schedules, run records
            |
      WebSocket queue
            |
            v
Daemon on a connected computer
            |
worktree or working directory
            |
            v
Claude Code, Codex, Cursor, OpenCode, or another agent CLI
```

The server coordinates work and persists product state. The daemon discovers installed runtimes, receives queued work, prepares a repository directory or worktree, invokes the selected external CLI, and reports logs, progress, cost, and results. The audited source advertises 25 runtime protocol families plus the OMP identity, for 26 integrations. See the pinned [architecture guide](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/apps/docs/content/docs/how-multica-works.mdx) and [runtime reference](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/apps/docs/content/docs/daemon-runtimes.mdx).

## Claim and evidence ledger

| Claim | Evidence | Assessment |
|---|---|---|
| Coordination can use a hosted or self-hosted server | [Pinned README](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/README.md) and deployment files | Confirmed structurally |
| Agent execution happens through a daemon on a connected computer | [How Multica works](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/apps/docs/content/docs/how-multica-works.mdx) and daemon source | Confirmed structurally |
| Offline work queues and daemon reconnection support recovery | Server queue and daemon reconnection paths in the pinned source | Confirmed structurally, not exercised |
| The audited commit passed upstream CI | [GitHub Actions run 33954745978](https://github.com/multica-ai/multica/actions/runs/33954745978) | Confirmed for upstream checks, not an end-to-end product test |
| Multica improves coding-agent output quality or team throughput | No independent comparative benchmark found in the reviewed scope | Unknown |

## Data, permissions, and Git boundaries

Local repositories and local credential files are not automatically uploaded wholesale by the architecture reviewed. That does not make the coordination tier data-free: issues, comments, agent configuration, schedules, run context, records, logs, costs, and results can be stored server-side. Custom environment and MCP configuration can also become server-managed data. Teams should classify that content before choosing the hosted topology.

The daemon runs with the permissions of its operating-system account. The audited Claude path uses `bypassPermissions`, and the Codex path uses `danger-full-access` except for a documented Windows native-sandbox option. Multica does not add a general filesystem sandbox around those CLIs. Its [security model](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/docs/guide/security-model.mdx) should therefore be read as an execution-account boundary, not as proof of repository isolation.

The product's `in_review` state is workflow metadata. It does not configure Git-host branch protection, mandatory review, or merge policy. An agent can use Git credentials available to the daemon account. Repository-side rules remain the enforcement point.
