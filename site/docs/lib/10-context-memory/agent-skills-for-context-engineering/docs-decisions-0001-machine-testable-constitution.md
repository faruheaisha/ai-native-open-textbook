---
title: "ADR-0001: Machine-testable, deny-by-default authority"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/docs/decisions/0001-machine-testable-constitution.md"
sourceRel: "docs/decisions/0001-machine-testable-constitution.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/docs/decisions/0001-machine-testable-constitution.md"
sourceSha256: "6c7505ef4c5a64bff21b9e06ae4c3bc270f40c2c6bfca79a908bf6e7ba4a60b7"
pageSha256: "6c7505ef4c5a64bff21b9e06ae4c3bc270f40c2c6bfca79a908bf6e7ba4a60b7"
contentMode: "local-full"
zh: ""
---

# ADR-0001: Machine-testable, deny-by-default authority

- Status: accepted for proposal
- Date: 2026-08-10
- Spec: SPEC-000

## Context

Authority currently exists across `AGENTS.md`, rubrics, runbooks, workflows, and user instructions. That is auditable by a person but cannot produce a deterministic authorization decision for future commands, workers, and repository events.

## Decision

Use a versioned YAML constitution with a small exact-match policy engine. Actors, actions, resource classes, and conditions are enumerated. Missing vocabulary and missing conditions deny. Explicit deny rules override allow rules. Only `human_maintainer` can receive an allow decision for merge or production activation.

The generated Markdown view is derived from the same policy. `effective_commit: "$SELF"` identifies the commit containing the constitution without introducing an impossible self-referential Git hash. Runtime consumers pin the file SHA-256.

## Alternatives considered

- Keep prose as the only authority. Rejected because command-time enforcement and exhaustive tests would be impossible.
- Embed policy in Python conditionals. Rejected because authority changes would be difficult to review as a coherent matrix.
- Adopt a general policy service now. Deferred because the current repository needs deterministic local checks, not a hosted dependency.
- Infer intent from branch names, prompts, or role labels. Rejected because those are claims, not authenticated authority.

## Consequences

- Every future privileged interface must call the policy evaluator or document why it is read-only.
- Policy changes modify a protected surface and require human review and merge.
- The initial engine intentionally supports only exact conditions. New operators require a constitution schema change and tests.
- Identity authentication and external enforcement remain adapter responsibilities; this layer decides authority after a trusted actor class is supplied.
- A later GitHub lifecycle spec must evaluate protected changes under the prior effective policy. A policy PR cannot establish its own external branch protection or satisfy its own human review requirement.
- Policy-decision persistence will use the immutable event journal in SPEC-004. Until that lands, `--decision` provides the normalized record but the pure evaluator performs no hidden write.

## Verification

CI validates the policy, decision fixtures, deny-overrides behavior, digest pinning, path classification, and the full actor/action/resource cross-product. A generated authority table is checked byte-for-byte.
