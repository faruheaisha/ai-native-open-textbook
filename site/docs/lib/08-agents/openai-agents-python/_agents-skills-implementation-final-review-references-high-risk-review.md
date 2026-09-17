---
title: "High-risk independent review"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/skills/implementation-final-review/references/high-risk-review.md"
sourceRel: ".agents/skills/implementation-final-review/references/high-risk-review.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/skills/implementation-final-review/references/high-risk-review.md"
sourceSha256: "f1cad81146ec62d7945f5a9a1dabd21bdda0137af21a5766aaa645b1b9194f38"
pageSha256: "f1cad81146ec62d7945f5a9a1dabd21bdda0137af21a5766aaa645b1b9194f38"
contentMode: "local-full"
zh: ""
---

# High-risk independent review

Use this procedure only for the high-risk tier selected in [SKILL.md](/lib/08-agents/openai-agents-python/_agents-skills-implementation-final-review-SKILL). All numbered steps below refer to this document. Resolve command paths such as `scripts/review_state.py` and `scripts/review_protocol.py` from the skill directory, not this references directory.

Treat implementation and final review as separate phases. Reconstruct the change from the original requirement and the complete diff; do not defend the current design merely because it is implemented or tested.

## Non-negotiable guarantees

- Review the exact final task content, including committed, staged, unstaged, and task-owned untracked deliverables. The only exceptions are the narrowly verified final-gate type-erasure and base-advance closures in step 20, which preserve clean credit through explicit identity evidence and still require the complete final verification stack on the resulting fingerprint.
- Use the merge-base three-dot diff for patch ownership and the latest release tag separately for released compatibility.
- Require independent review. A same-context self-review cannot satisfy the clean-review gate.
- Freeze task-owned content while reviewers inspect a fingerprint.
- Treat an exact normalized file path in the task and component manifests as authoritative even when ignore rules match that file. An existing exact file takes literal precedence over Git pathspec metacharacters; use explicit `:(glob)` magic when pattern semantics are intended. A directory or glob pathspec never promotes ignored operational files into the review.
- Require the repository and every initialized submodule index to have no unresolved merge stages before fingerprinting.
- Require every initialized submodule, including nested submodules, to be clean and checked out at the commit recorded by its parent index before freezing review state. Stage reviewable gitlink pointer changes in the parent repository; fail closed on dirty worktrees, hidden index flags, ignored nested changes, and untracked embedded repositories. Reject cyclic or aliased submodule worktree graphs before recursive inspection.
- Require two consecutive identical observations of HEAD, status, diffs, task and repository workspace content, and component workspace content before accepting a review-state snapshot. Fail closed when repository state changes during capture.
- Reject task-owned filesystem entries that Git cannot represent as finite blobs, including FIFOs, sockets, and devices.
- Require packet, ledger, manifest, receipt, reviewer-output, and evidence paths to resolve to finite regular files. Canonicalize each path before opening. Verify the file type after opening and read content from that same descriptor; never authorize a path with `stat` and then reopen it. Reject evidence, receipt, and current-versus-prior ledger aliases by the opened descriptor's device and inode identity. Before accepting reviewer output or a reusable receipt, re-read the packet and current and prior ledgers and require their validated digests to remain unchanged; also re-read the indexed receipt before reporting it reusable. Materialize devices, FIFOs, sockets, or generated streams into regular files before validation.
- Bind every canonical root-owned evidence ID and inventory ID in the ledger with `contract_evidence_sha256` and `inventory_sha256`. Preserve those digest bindings across rounds so an existing ID cannot change content; inventory digests exclude only the ID itself so a renamed copy is not new semantic inventory.
- Count evidence or inventory as new for a canonical root only when its digest is absent from that root's prior ownership. A new root proposal requires an evidence digest absent from every canonical root and every distinct root proposed in the same output; it cannot reuse canonical inventory before implementer promotion. Require every credited receipt to have a unique content digest and exact command.
- Require unique keys and standard finite numbers in every JSON object. Duplicate keys, JavaScript-style `NaN` or infinity constants, and numeric exponents that overflow to infinity are invalid. Convert runtime numeric-size and nesting-limit failures into protocol errors instead of leaking parser exceptions.
- Give the two reviewers distinct normalized primary and high-risk specialties, and require every preflight command to be unique before any receipt can claim it.
- Encode `manifests.dependency_map` as an object that maps every component name to a nonempty array of exact `pathspec` and `reason` records. Reject prose-only claims, missing components, empty dependency sets, duplicate pathspecs, and extra record fields.
- Treat verification receipts, reviewer outputs, findings, root-cause evidence, unchecked-inventory records, and sibling-scenario scans as exact schemas. Reject unknown fields instead of ignoring potentially conflicting evidence.
- Repeat commit-hook inspection, every safe rewriting step, second-pass idempotence, and generated-provenance validation before every fingerprint freeze, including post-fix and delta-review rounds. Record the exact executable inspection and rewriting commands plus their results in packet preflight evidence; a prose label is not an executable command.
- Start independent reviewers without inherited conversation history. Fresh judgment does not require repeatedly replaying the implementer's context.
- Report only concrete, patch-scoped findings supported by requirements, released behavior, a durable boundary, explicit maintainer intent, user reliance, or a baseline regression.
- Never weaken final repository verification. Component-aware review invalidation reduces repeated review, not required build or test gates.
- Keep one task-global round ledger across pauses, compaction, handoff, renaming, resumed work, and post-completion feedback. Enforce a bounded budget for each active review cycle without discarding earlier history.
- Trust the active implementation control plane to record actual reviewer dispatches, waits, outputs, and verification executions. The local protocol helper validates those records but does not replace platform-issued cryptographic execution attestation.

## Post-completion feedback boundary

An implementation review cycle is complete only after its clean-review gate, mandatory verification, any requested local commit, and final user-facing handoff are complete. Seal that cycle at this boundary. A pause, compaction, context change, agent handoff before completion, or ordinary request to continue unfinished work does not create a new cycle or reset its budget.

A later user message containing concrete actionable review feedback starts a post-completion feedback cycle. The feedback message itself authorizes implementing that feedback and running the repository-mandated focused tests, delta review, verification, and any already-authorized local commit or amendment needed to return the task to a completed state. Feedback does not independently authorize a commit when the task did not already allow one. Do not ask for separate review-budget authorization merely because the sealed implementation cycle exhausted its budget.

Keep the same task identity and ledger, preserve its canonical root-cause history and clean credit for unchanged components, and append a default budget of two fingerprint rounds for the new feedback cycle. Ask the user again only when the feedback materially widens the requested contract, changes a released or durable compatibility boundary, requires authority beyond resolving the feedback, or exhausts the feedback-cycle budget.

## Workflow

Persist the current combined content fingerprint as `ledger.round_fingerprint` and bind it to the packet fingerprint. A same-round retry is valid only when that value and the authorized budget history match the immutable prior ledger snapshot; a changed fingerprint or newly authorized budget advances the round.

1. Finish the initial implementation and focused tests. Apply formatting before review when formatting can rewrite the diff. Inspect the actual final commit-hook configuration and run the exact safe, non-committing equivalent of every hook step that can rewrite task-owned content before freezing the first review fingerprint. Run each rewriting step until a second execution is content-idempotent. Normalize generated files before computing embedded hashes or provenance so the hook cannot invalidate them later. Record any hook step that cannot safely run before review; if that step later changes task content, apply the normal invalidation rules without exception.
2. Re-read the original user request and the current implementation scope contract. If no contract exists, record the required behavior, compatibility requirements, intentionally unsupported cases and failure behavior, and supported alternative or `none`.
3. Resolve the intended target and merge base. If a supplied target or base is not an ancestor of `HEAD`, compute their common merge base and treat `merge-base...HEAD` as the task-owned diff. Use the latest release tag separately when released compatibility is the relevant boundary. Include committed, staged, unstaged, and untracked changes that belong to the task.
4. Read the complete task-owned three-dot diff from the resolved merge base. Never treat target-only commits between the merge base and an advanced or divergent target as deletions or regressions introduced by the patch. Check integration with the current target separately when relevant; report an actual conflict or semantic incompatibility, not mere absence of target-side changes. Do not limit review to the latest fix or files named in prior feedback. Record a complexity delta: runtime lines changed, new state fields, new synchronization or ownership mechanisms, affected subsystems, and test permutations.
5. Run the baseline-reset gate before accepting the current design:
   - Describe the required behavior without referring to branch-local helper types or state.
   - Identify the nearest released/base pipeline that already owns the behavior.
   - Compare patching the current diff with replacing task-owned branch-local machinery by a narrow change from the base implementation.
   - Treat unreleased implementation and tests as disposable. Preserve unrelated or user-owned changes.
   - Choose the narrower design unless concrete contract evidence requires the current machinery.
6. Select the relevant review dimensions below from the affected runtime boundaries and repository architecture references. Complete every selected dimension even after finding a blocker; the goal is a complete final review, not the first valid comment. The entrypoint has already classified this change as high risk; preserve that classification throughout this procedure. Encode this classification as `task.risk_tier: "elevated"` in the machine-readable packet, using the existing protocol value. Run the cheapest affected-boundary preflight broad enough to catch likely late fallout from a dependency, package surface, generated artifact, or cross-cutting runtime change. Prefer focused tests plus a narrowly targeted import, generated-surface, or static check. Run a targeted type check only when the change directly affects a typing boundary and the command is materially narrower than repository-wide `make typecheck`. Do not run repository-wide lint, typecheck, builds, integration suites, `make tests-review`, or `make tests` merely to enter or iterate through the review gate. Run the focused preflight once for a semantic state and rerun only affected checks after fixes.
7. Build the pre-dispatch evidence required by the changed boundary:
   - For every changed public symbol, configuration field, event, serialized field, wire value, or documented caller-visible behavior, create a contract-surface inventory: producers and constructors; every consumer, forwarding branch, and adapter; default, missing, and invalid-value behavior; package exports and generated public surfaces when applicable; adjacent docs and examples; and caller-visible tests. Search adjacent contract surfaces even when they are absent from the diff. A required example, export, adapter, or generated-surface update is a missing task deliverable, not out of scope merely because it is not yet in the manifest. A required `docs/` update is also a missing task deliverable unless the repository's Documentation Release Timing policy intentionally defers it. When that policy applies, record the documentation need and timing as evidence of separately timed work; do not add it to the current task manifest, report it as a current-pull-request finding, or let it block clean review.
   - For concurrency, cancellation, reentrancy, shared lifecycle state, or a check followed by an await before a side effect, create an await-boundary matrix. For each relevant operation, record the state snapshot, blocking or await point, events and operations that may run while suspended, durable or monotonic evidence retained, revalidation before each side effect, and resulting cancel, feedback, persistence, or cleanup action. Include source completion, a newer operation active with known and unknown identity, a newer operation that starts and completes while suspended, and failure or cancellation of the awaited action when those states are supported. If correctness depends on whether something ever happened, current active state is insufficient unless serialization proves it cannot be lost; require monotonic identity, generation, tombstone, or equivalent durable evidence.
   - For protocol, persistence, or security changes, create the analogous authority/data-flow inventory from input through validation, storage, retry or replay, output, exceptions, logs, telemetry, and cleanup. Treat these as mechanical coverage artifacts, not implementation conclusions. The implementer must fill them from code and contract evidence before review; reviewers validate them independently against the complete diff and surrounding source.
8. Produce only concrete, patch-scoped findings that are reproducible from code, contract, documentation, or a focused probe. Do not report hypothetical extensibility or unrelated cleanup. Before concluding, account for every row in the contract-surface, await-boundary, and authority/data-flow inventories and every new or modified source of shared state. For a scenario outside the required behavior, run a differential check against the merge base or latest release and identify support evidence. Reachability through a public method, concurrent call, repeated call, host-language protocol, or third-party behavior is not by itself a supported contract.
9. Classify every finding before editing:
   - required-behavior defect;
   - released compatibility or durable-boundary defect;
   - missing failure-path or adversarial coverage;
   - unsupported neighboring case that should fail earlier;
   - unnecessary machinery or duplicated source of truth;
   - unrelated or unsupported suggestion to reject. Record the support basis for every actionable finding: original requirement, released documentation/example/typing/test, durable boundary, concrete maintainer intent or user reliance, or a regression where the same supported scenario succeeds at the baseline and fails in the patch. If none applies, do not fix or block on it; mark it unsupported/deferred.
