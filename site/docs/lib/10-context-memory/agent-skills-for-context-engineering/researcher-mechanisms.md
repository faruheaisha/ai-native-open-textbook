---
title: "Mechanism Registry"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/mechanisms/README.md"
sourceRel: "researcher/mechanisms/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/mechanisms/README.md"
sourceSha256: "82dc19534c117bf794134a8f3f8a3167747165b984b1f7a6a41b36f00510a055"
pageSha256: "82dc19534c117bf794134a8f3f8a3167747165b984b1f7a6a41b36f00510a055"
contentMode: "local-full"
zh: ""
---

# Mechanism Registry

The mechanism registry is the durable index of accepted patterns that can update skills. It exists so novelty checks compare proposed behavior changes, not broad keyword overlap.

Each line in `registry.jsonl` is one accepted mechanism with:

- `mechanism_id`: stable kebab-case identifier
- `owning_skill`: published skill that owns the pattern
- `activation_scenario`: situation where the mechanism applies
- `behavior_change`: what a future agent should do differently
- `evidence`: source URLs or repo artifacts supporting the mechanism
- `failure_modes`: failures the mechanism prevents
- `status`: `accepted`, `candidate`, `deprecated`, or `rejected`

Only `accepted` and `candidate` mechanisms participate in novelty checks. Rejected mechanisms should remain in run logs or rejected proposal files unless they are useful enough to prevent repeated rediscovery.

## Promotion Flow

Runs propose mechanisms in `proposals/mechanism-proposal.jsonl`. Promotion is gated:

1. The run must pass run-readiness validation for `accepted` or `candidate` mechanisms.
2. A human reviewer must be recorded.
3. Accepted and candidate mechanisms append to `registry.jsonl`.
4. Every promotion appends an event to `ledgers/accepted.jsonl`.
5. Rejected mechanisms append to `ledgers/rejected.jsonl` so future agents do not rediscover them.
