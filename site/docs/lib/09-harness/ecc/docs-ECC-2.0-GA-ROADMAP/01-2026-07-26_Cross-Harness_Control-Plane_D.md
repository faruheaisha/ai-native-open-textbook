---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/ECC-2.0-GA-ROADMAP.md"
sourceRel: "docs/ECC-2.0-GA-ROADMAP.md"
rawUrl: "/raw/09-harness/ecc/docs/ECC-2.0-GA-ROADMAP.md"
sourceSha256: "1d0b211ca4ac4603a61270e0507f5c4c6728189eb718cb77c30e47e0ab2eb34a"
pageSha256: "aef3db363d76d8d23a6883a72fc8534db00da5a768237424fa512cced394cdfb"
contentMode: "local-full"
zh: ""
---

## 2026-07-26 Cross-Harness Control-Plane Delta

The next product layer is composition, not a second harness. ECC already has
session storage, worktree lifecycle helpers, merge-queue state, OTEL export,
skill-run records, learning hooks, and provenance checks. The missing work is
to expose those primitives through governed cross-harness contracts and make
promotion, merge, and policy decisions auditable.

The first cross-harness knowledge-transfer slice is tracked in
[PR #2581](https://github.com/affaan-m/ECC/pull/2581). It adds a file-first
memory vault for Codex, Claude Code, OpenCode, Cursor, and Hermes-style agents,
with Markdown as the portable source of truth and an optional MCP projection.
Every new memory remains unreviewed until a later, explicit promotion system is
implemented. [PR #2582](https://github.com/affaan-m/ECC/pull/2582) addresses
Claude's flat skill-discovery layout, and
[PR #2583](https://github.com/affaan-m/ECC/pull/2583) aligns Claude agent tool
frontmatter with the documented scalar format.

Existing implementation anchors:

- `ecc2/src/session/store.rs` persists sessions, tool logs, decisions, context
  graph edges, queues, and conflict incidents.
- `ecc2/src/main.rs` already exposes session, worktree, merge-queue, daemon,
  and OTEL-export commands.
- `scripts/lib/worktree-lifecycle/` and `scripts/worktree-lifecycle.js`
  classify worktree state and produce conflict and cleanup plans.
- `scripts/lib/skill-evolution/` records skill runs, health, and provenance;
  `skills/continuous-learning-v2/` and `skills/eval-harness/` provide the
  learning and evaluation substrate.
- `skills/security-scan/`, `schemas/provenance.schema.json`, and
  `docs/architecture/agentshield-enterprise-research-roadmap.md` provide the
  current policy and supply-chain substrate.

The execution sequence is deliberately read-only first and promotion-gated:

1. **Distribution and knowledge-transfer correctness.** Land the memory,
   Claude skill-layout, and Claude agent-frontmatter fixes with their complete
   security and cross-platform matrices. Re-evaluate
   [PR #2555](https://github.com/affaan-m/ECC/pull/2555),
   [PR #2490](https://github.com/affaan-m/ECC/pull/2490), and
   [PR #2578](https://github.com/affaan-m/ECC/pull/2578) after those bases are
   stable.
2. **ECC2 MCP read plane.** Add an opt-in MCP server over existing ECC2
   stores with bounded, redacted `list_sessions`, `get_diff`,
   `worktree_status`, and `merge_queue` tools. This slice performs no task,
   merge, approval, or filesystem mutation. Bind caller identity and a
   canonical realpath workspace ID at server startup; expose only records owned
   by that workspace/caller; deny undeclared read capabilities; and rate-limit
   and audit every read without logging returned content. Version every tool's
   request and response schema, validate both at the boundary, and return the
   common `\{success, data, error, pagination\}` envelope. Bounded list and diff
   responses include cursor, `has_more`, and `truncated` metadata. Bind every
   cursor to an immutable session/worktree revision; reject stale cursors and
   require pagination to restart when that revision is no longer available.
3. **ECC2 MCP mutation plane.** Add `create_task`, `merge_task`, and
   `approve_tool` only after the read plane is stable. Require explicit
   capability gates, immutable audit receipts, dry-run previews, and the
   existing risk/profile policy at every mutation boundary. Caller identity,
   workspace ownership, and per-tool authorization fail closed before inputs
   reach the store or filesystem. Mutation tools use the same versioned,
   boundary-validated request and response schemas and common envelope. Apply
   per-caller and per-workspace rate limits before mutation processing and fail
   closed when the limiter is unavailable. Persist the immutable receipt before
   any side effect, or use an atomic transaction/outbox whose reconciliation
   guarantees every successful mutation has a durable receipt.
4. **Worktree lifecycle contract.** Define and schema-validate
   `ecc.worktree.yml`; specify `new`, `split`, `fork`, and `close` state
   transitions; define bounded context seeding and lifecycle hooks without
   copying secrets or raw harness transcripts.
5. **TCAS leases and merge serialization.** Derive touched paths from tool
   activity and normalize each path against the canonical workspace. Persist
   `\{session, branch, touched_paths, heartbeat, owner, epoch\}` leases with
   transactional acquire/renew/release, unique overlap enforcement, and
   compare-and-swap owner/epoch checks. Show overlap before blocking, then add
   queue serialization, bounded lease expiry/recovery after heartbeat loss,
   and human escalation records. Incomplete or uninstrumented touched-path
   coverage blocks mutation unless the caller atomically acquires a
   workspace-wide lease. Revalidate the final touched-path set and lease
   ownership immediately before every mutation and merge.
6. **Consent-gated telemetry schema.** Standardize `ecc.*` span names and
   bounded attributes, define `TRACEPARENT` propagation, and require explicit
   consent, schema validation, and deterministic redaction before any sink.
   Missing or invalid consent fails closed. Prompts, secrets, memory bodies,
   raw diffs, and unbounded error text are forbidden by schema and regression
   tests for both offline and future live output.
7. **Consent-gated OTLP exporter.** Add the opt-in live exporter only after
   the telemetry schema and redaction suite are stable. Existing JSON export
   remains the offline fallback, but it passes through the same consent,
   validation, redaction, and bounded-output gate as the live sink.
8. **Skill-quality and promotion gates.** Stabilize invocation telemetry
   before adding determinism and delta-value measures. Proposed skills live in
   a candidate area and may reach canonical surfaces only through a recorded
   eval result, human approval, append-only transition event, and reversible
   promotion.
9. **AgentShield v2 enforcement.** Introduce a versioned allow/approve/block
   policy contract enforced by ECC2, followed by signed provenance, registry
   locks, and optional dual-engine scanning from
   [issue #2415](https://github.com/affaan-m/ECC/issues/2415).
10. **Distribution interop.** Add provenance-preserving npx-skills and ClawHub
   import/export only after the policy and promotion contracts plus
   AgentShield's signed-provenance and registry-lock verification are stable.
   Import and export deny by default when provenance or lock verification is
   missing, invalid, or unavailable. Before any imported artifact reaches a
   store or filesystem operation, validate its versioned schema, bounded size,
   contained paths, and content policy, and reject malformed or untrusted
   input with bounded errors. Training or inference automation remains deferred
   until telemetry, evaluation, consent, and rollback gates are operational.

Each numbered item is a separate implementation lane. Do not combine the
read-only MCP plane with mutations, the telemetry schema with live export, or
candidate generation with promotion. Each lane requires unit and integration
tests plus end-to-end coverage for its critical operator flow to fail before
implementation begins. After implementation, those tests must pass with at
least 80% line and function coverage, adversarial boundary tests, a
migration/rollback note, and fresh Linux, macOS, and Windows evidence before
the next dependent lane begins.
