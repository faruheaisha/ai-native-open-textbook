---
title: "Independent Reviewer Brief"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/skills/implementation-final-review/references/reviewer-brief.md"
sourceRel: ".agents/skills/implementation-final-review/references/reviewer-brief.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/skills/implementation-final-review/references/reviewer-brief.md"
sourceSha256: "eac902e6fac43f11d5ef0253b86a352abab386a89a74de3ac9b873be468b14ae"
pageSha256: "eac902e6fac43f11d5ef0253b86a352abab386a89a74de3ac9b873be468b14ae"
contentMode: "local-full"
zh: ""
---

# Independent Reviewer Brief

The ledger contains a `round_fingerprint` equal to the packet's combined content fingerprint. A same-round retry must preserve the immutable prior snapshot's `round_fingerprint` and authorized budget history; a changed fingerprint or newly authorized budget requires advancing exactly one round.

Every packet, ledger, manifest, receipt, reviewer-output, and evidence path must resolve to a finite regular file. Canonicalize each path before opening. Verify the file type after opening and read content from that same descriptor; a path-level `stat` must not authorize a later reopen. Evidence artifacts and credited receipts must have unique opened-file device and inode identities, and current and prior ledgers must have distinct identities. Before accepting reviewer output or a reusable receipt, the validator re-reads the packet and current and prior ledgers and requires their validated digests to remain unchanged; it also re-reads the indexed receipt before reporting it reusable. Materialize devices, FIFOs, sockets, or generated streams before validation.

An evidence or inventory ID is new for a canonical root only when its content digest is absent from that root's prior ownership. The ledger binds every canonical root-owned evidence ID in `contract_evidence_sha256` and every inventory ID in `inventory_sha256`; prior bindings are immutable. Inventory digests exclude only the ID itself, so renaming a copied row does not make it new. A new root proposal requires an evidence digest absent from every canonical root and every distinct root proposed in the same output; it cannot reuse canonical inventory before implementer promotion. Credited receipt content digests and exact commands must be unique.

Every JSON object must use unique keys and standard finite numbers. Duplicate keys, JavaScript-style `NaN`, `Infinity`, and `-Infinity` constants, and numeric exponents that overflow to infinity are invalid. Runtime numeric-size and nesting-limit failures are protocol errors rather than raw parser exceptions.

Generate review state only from two consecutive identical repository observations. A changed HEAD, status, diff, task or repository workspace, or component workspace invalidates the capture. Task-owned FIFOs, sockets, devices, and other entries that Git cannot represent as finite blobs are invalid.

Use this template to prepare one self-contained, factual snapshot packet per fingerprint round. Fill every field or mark it explicitly `none` or `not applicable`; do not dispatch an incomplete packet. Fill it once, reuse the shared body byte-for-byte for every reviewer, and vary only the final specialty assignment. Keep this control-plane brief near 12 KB when practical. Store larger evidence in indexed files and reference each file by exact path and SHA-256 digest. Do not omit decision-relevant evidence merely to meet the soft size target. Do not include implementer conclusions, suspected bugs, prior findings, or intended fixes.

The verified final-gate type-erasure and base-advance closures defined in [high-risk-review.md](/lib/08-agents/openai-agents-python/_agents-skills-implementation-final-review-references-high-risk-review) step 20 do not create a fingerprint round, reviewer packet, or reviewer assignment. For a type-erasure closure, record its exact delta, before and after fingerprints, final-gate failure, runtime-identity basis, and focused verification in the task-global ledger and final verification evidence. For a base-advance closure, record the old and new base, head, fingerprints, byte-identical task and component workspace evidence, identical tracked-diff digest, complete upstream changed-path list and diff digest, exact dependency-input pathspecs, and focused integration checks. If every condition for the applicable exception is not mechanically established, prepare the normal delta-review packet instead.

## Shared evidence

- Original requirement:
- Implementation scope contract:
  - Required behavior:
  - Compatibility requirements:
  - Intentionally unsupported cases and failure behavior:
  - Supported alternative or `none`:
- Intended target:
- Resolved merge base:
- HEAD:
- Latest release boundary when relevant:
- Risk tier and reason (high risk; encode `task.risk_tier` as `"elevated"`):
- Task-global ledger path, task identity, current round, and remaining authorized budget:
- Canonical root-cause ledger (`ID | open/closed | inventory IDs | contract evidence IDs`):
- Canonical task manifest (an exact normalized file entry remains authoritative when ignored; directory and glob entries do not promote ignored files):
- Component manifests:
- Semantic component dependency map (`component | exact base pathspecs | invalidation reason`):
- Combined, component, and repository fingerprints:
- Exact fingerprint revalidation command:
- Unfiltered repository-status artifact and explicit exclusions outside the task manifest:
- Complete three-dot diff command using `review_state.py --complete-diff-output` so task-owned untracked files are included:
- Indexed evidence manifest (`ID | role | exact path | SHA-256 | purpose`):
- Focused preflight commands and results, including idempotent commit-hook parity with the exact executable hook-inspection commands plus second-pass results for every content-rewriting step before this fingerprint freeze:
- Same-fingerprint verification already credited, or `none`:
- Verification receipt path and SHA-256 descriptors for credited checks, or `none`:
- Eligible concurrent final-gate commands: `none` (required because broad final gates start only after clean review):
- Broad final gates deferred until clean review:
- Selected architecture references or exact relevant excerpts:

## Machine-readable preflight

Store the shared packet index as one JSON object and validate it before dispatch:
