---
title: "Decisions"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/decisions/README.md"
sourceRel: "docs/decisions/README.md"
rawUrl: "/raw/09-harness/repository-harness/docs/decisions/README.md"
sourceSha256: "a073220e7b989e207d7849d77ab0ea3624ac9e927e660f6f831f6ce7e4d04a5c"
pageSha256: "a073220e7b989e207d7849d77ab0ea3624ac9e927e660f6f831f6ce7e4d04a5c"
contentMode: "local-full"
zh: ""
---

# Decisions

Decision records preserve lasting product, architecture, compatibility,
security, data-ownership, and validation choices.

Use `docs/templates/decision.md`. Task-local choices stay in the active plan.

## Current Upstream Decisions

| Decision | Title |
| --- | --- |
| 0019 | Repository-Centered Default Workflow |
| 0020 | Installation Profiles And Knowledge Boundaries |
| 0024 | Rust Harness Core Maintenance CLI |
| 0025 | Latest-Release Self-Update And Human-Directed Conflicts |
| 0026 | Explicit Onboarding Skills In Default Core |
| 0027 | End Protocol V1 And Focus The Repository Protocol |
| 0028 | Authoritative Invariant Encoding |

These decisions describe upstream Harness. Installed consumers begin with an
empty decision index and add only real consumer choices.

## History

Superseded database lifecycle, story, trace, orchestration, and migration
decisions remain available through Git history. They are absent from the
current index so agents do not confuse historical authority with current
product behavior.

## Add A Decision When

- a lasting product or architecture choice changes;
- public compatibility or data ownership changes;
- security or recovery policy changes;
- validation is materially added, removed, or weakened; or
- the source-of-truth hierarchy changes.
