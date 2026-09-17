---
title: "Published Router Benchmark Results"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/router/results-published/README.md"
sourceRel: "researcher/benchmarks/router/results-published/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/router/results-published/README.md"
sourceSha256: "45f23cb529074a2688afb7b4b04464e3a5b182b8ceff50e1d44fb408fe28d462"
pageSha256: "45f23cb529074a2688afb7b4b04464e3a5b182b8ceff50e1d44fb408fe28d462"
contentMode: "local-full"
zh: ""
---

# Published Router Benchmark Results

Each `<date>.md` file in this directory is a committed snapshot of a router benchmark sweep. Raw per-run JSON outputs live under `researcher/benchmarks/router/results/<date>-<seed>/` and are gitignored; only the curated summary published here is tracked in the repo.

Every report includes:

- Run metadata (timestamp, repo commit, fixture SHA, seed, model list, replications).
- Executive summary calling out the actually meaningful findings.
- Per-model leaderboard with bootstrap 95% CIs.
- Per-skill confusion matrix.
- Hardest-prompts breakdown.
- Reproduction command.

When a benchmark exposes a routing failure, follow up by editing the activation description of the failing skill, rerunning the benchmark, and comparing the new report against the previous one to show the delta.

History across runs is also appended to `researcher/reports/router-history.jsonl` (gitignored) by the runner.
