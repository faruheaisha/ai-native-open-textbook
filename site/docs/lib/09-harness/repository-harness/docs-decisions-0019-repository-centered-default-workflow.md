---
title: "0019 Repository-Centered Default Workflow"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/decisions/0019-repository-centered-default-workflow.md"
sourceRel: "docs/decisions/0019-repository-centered-default-workflow.md"
rawUrl: "/raw/09-harness/repository-harness/docs/decisions/0019-repository-centered-default-workflow.md"
sourceSha256: "934104e62e67205933f356cf8c16253f77082d9a00a6d7c7139e45ca7752e497"
pageSha256: "934104e62e67205933f356cf8c16253f77082d9a00a6d7c7139e45ca7752e497"
contentMode: "local-full"
zh: ""
---

# 0019 Repository-Centered Default Workflow

Date: 2026-07-21

## Status

Accepted and active.

## Context

Earlier Harness versions made workflow bookkeeping compete with the repository
for authority. That added ceremony to bounded changes, encouraged self-reported
completion, and made current work harder to retrieve from ordinary code review.

Complex work still needs durable memory, and consequential product choices still
need explicit human authority. Those needs do not require a parallel task
control plane.

## Decision

1. Product documents, architecture, decisions, plans, code, tests, CI, runtime
   signals, and Git history are the system of record.
2. `AGENTS.md` remains a small stable entrypoint and points to
   `docs/WORKFLOW.md`.
3. Read-only work inspects only what the answer needs and makes no mutation.
4. Bounded changes use an ephemeral plan, local authority, and relevant proof.
5. Work that spans sessions, coordinates contributors, has meaningful
   dependencies, or requires recovery uses one file under
   `docs/plans/active/`.
6. Materially different externally observable choices stop before editing.
   Configurable defaults are not authority.
7. Completion requires executable or observable evidence appropriate to the
   behavior.
8. Lasting decisions are indexed Git-native documents. Task-local choices stay
   in the execution plan.

## Alternatives Considered

1. **Require one lifecycle for every task.** Rejected because work shape, not a
   global process ladder, determines the memory and proof required.
2. **Remove durable planning.** Rejected because coordinated and recoverable
   work must survive session boundaries.
3. **Treat all sensitive terminology as an approval gate.** Rejected because
   authority depends on an actual unresolved choice, not keywords.

## Consequences

- Small work stays cheap and directly reviewable.
- Complex work remains resumable without duplicate task truth.
- Weak product tests and runtime guidance become visible instead of being
  masked by workflow metadata.
- Maintainers must resist adding replacement ceremony without representative
  evidence.
