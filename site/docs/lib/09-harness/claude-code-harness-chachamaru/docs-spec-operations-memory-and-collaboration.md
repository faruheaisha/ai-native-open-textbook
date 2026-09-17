---
title: "Spec Sub-Spec: operations-memory-and-collaboration"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/spec/operations-memory-and-collaboration.md"
sourceRel: "docs/spec/operations-memory-and-collaboration.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/spec/operations-memory-and-collaboration.md"
sourceSha256: "cbe374a3e925ea2475c3f17347ba74f524dee291003c33958cd46bece348b84f"
pageSha256: "cbe374a3e925ea2475c3f17347ba74f524dee291003c33958cd46bece348b84f"
contentMode: "local-full"
zh: ""
---

# Spec Sub-Spec: operations-memory-and-collaboration

This sub-spec is part of the `spec.md` product contract. SSOT order is `spec.md` core > `docs/spec/*` sub-specs > `Plans.md`.

## Supply Chain Alert Contract

Open Dependabot alerts on tracked source, tooling, benchmark, or distribution
lockfiles are repo-health findings, not release noise.

Harness must handle them with evidence:

- enumerate the live GitHub alert set before planning remediation,
- group alerts by manifest path, dependency, severity, and advisory,
- prefer supported upgrades that keep the current tool line moving forward over
  security downgrades suggested only by `npm audit fix`,
- use package-manager-native override mechanisms only when the direct owner
  package has not yet published a patched dependency range,
- verify the affected tool still starts or runs an equivalent smoke command,
- add or update Dependabot configuration and CI/audit checks when a tracked
  manifest can otherwise accumulate alerts without PR automation,
- keep GitHub alert closeout, local `npm audit`, CI, and release gates separate.

Benchmark-only manifests may use focused smoke evidence instead of full
benchmark execution when model keys, Docker, or sandbox services are unavailable,
but the unavailable part must be recorded as a residual risk rather than treated
as success.

## Memory Contract

When a planning or design decision is made, Harness should record why it was
chosen, not only what changed.

Preferred memory targets:

- `harness-mem` project-scoped ingest/search when available.
- `.claude/memory/decisions.md` and `.claude/memory/patterns.md` when present.
- `Plans.md` and spec documents as local, reviewable SSOTs.

If harness-mem is unavailable, the agent must say so and keep the local SSOT
updated instead of pretending memory was written.

## Upstream Tracking Contract

Claude Code and Codex updates must be turned into Harness changes through an
evidence gate, not by copying release notes into docs.

Every non-trivial upstream refresh must:

- compare the local installed versions with the latest official upstream
  versions,
- use official Anthropic, OpenAI, or first-party GitHub release sources,
- record a dated snapshot document with release URLs, local version output, and
  observed gaps,
- classify each relevant item as `A: adopt now`, `C: inherit upstream`,
  `P: plan/spike`, or `Reject`,
- keep `B: explanation only` at zero unless the plan explicitly explains why a
  non-actionable note is still worth preserving,
- connect adopted items to `Plans.md`, tests, docs, CHANGELOG, and review gates,
- avoid support-tier upgrades until host bootstrap, runtime smoke, and release
  gates prove the claim.

The following upstream surfaces are product-affecting and must not be treated as
automatic documentation updates:

- skill or slash-command frontmatter semantics,
- hooks, message display, session start, and plugin marketplace behavior,
- agent, subagent, background-session, worktree, or permission behavior,
- sandbox, approval, profile, or managed policy behavior,
- Codex companion, CLI, SDK, MCP, app-server, or GitHub Action behavior,
- installer, package, release artifact, or supply-chain behavior.

If an upstream product weakens a previous opt-in barrier, such as an auto mode
consent change, Harness must keep its own safety default until a dedicated phase
updates the contract, tests, and release notes. Upstream convenience is evidence
to evaluate, not permission to silently relax Harness guardrails.

## Session Coordination Contract

When multiple local Claude Code sessions work on the same project, Harness may
coordinate them to reduce file conflicts, but only under these rules.

- Coordination state is local-only and never depends on harness-mem. The
  cross-repo boundary in `.claude/rules/cross-repo-handoff.md` stays intact.
- The lease store lives in one shared location resolved from
  `git --git-common-dir`, never under a worktree-local `.claude/`, so parallel
  worktree Workers share a single lease space. Lease keys are the sha256 of the
  repo-relative path, never an absolute path.
- The live-session set used by lease staleness is the union of (a) the shared
