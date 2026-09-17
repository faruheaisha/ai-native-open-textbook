---
title: "Better Harness（QoderAI）"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/developer-experience-system.md"
sourceRel: "docs/adrs/developer-experience-system.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/developer-experience-system.md"
sourceSha256: "9b9c3c71dc8a49c147885497857e99bfe5eae866c09b264ca76e9decb808950f"
pageSha256: "b11347046268659644965bb5f423dc9c33c72d9ee49f6da7314dfbd6211ca9b9"
contentMode: "local-full"
zh: ""
---

## Migration Plan

### Phase 0: Record the current baseline

Entry: this ADR identifies the controlling current edit routes and the phase has
a dated, docs-only implementation spec.

- Inventory current product routes, command surfaces, host lists, support claims,
  issue forms, documentation tables, release claims, and evidence sources.
- Record current journey timings only where observable; leave the rest
  unobserved.
- Add report-only drift checks before changing an owner.
- Require a dated spec for every later phase.

Exit gate: a reviewer can identify every current duplicate fact and its existing
owner without changing runtime behavior.

Rollback: remove the report-only inventory; no owner, projection, command, or
public claim has changed.

### Phase 1: Establish contract and conformance foundations

Entry: Phase 0's inventory is reviewed, and each contract/conformance slice has
an accepted dated spec and representative current violations.

- Define the minimal shared command, diagnostic, host-support, and evidence
  receipt schemas only when each has two real consumers.
- Add leaf-command help, strict-option, side-effect, workspace, and machine
  output conformance tests.
- Add architecture import-boundary checks and migrate existing private
  cross-capability imports through public surfaces.
- Activate `scripts/dx-contracts/` only after its target-directory gate passes;
  then create the ledger from the controlling baseline with every unmigrated
  target in `planned`. Creating the ledger changes no fact authority.
- Keep all checks advisory until current violations are enumerated and owned.

Exit gate: no new command or cross-capability dependency can add an unclassified
violation.

Rollback: disable advisory validators and keep existing public parsers and
owners; do not delete compatibility evidence gathered by the inventory.

### Phase 2: Federate host and command declarations

Entry: the relevant v1 schemas, conformance checks, and report-only activation
ledger are active, with all existing owners recorded.

- Move host facts into the host-support owner one slice at a time.
- Export typed command contracts from capability owners and make the root
  registry an index rather than a second description.
- Compile projections to a temporary directory and compare them with current
  README, site, issue, help, test, and changelog facts.
- Keep hand-authored surfaces canonical during dual-run.
- Move a target owner binding from `planned` to `shadow` only after its owner and
  schema exist. A reviewed cutover changes that binding to `authoritative` and
  the prior authoritative binding to `compatibility` or `retired` in the same
  ledger revision.

Exit gate: consecutive changed-scope and full runs report no unexplained drift
before any generated projection becomes authoritative.

Rollback: restore the recorded prior binding to `authoritative`, move the target
binding to `shadow`, disable its projection consumer, and retain both changes in
one reviewed ledger revision.

### Phase 3: Correct product-route and recovery semantics

Entry: capability-owned command contracts and their compatibility tests are
active for every command changed in this phase.

- Separate report production from evidence probe or preparation behavior.
- Introduce strict input validation, common diagnostics, and explicit partial
  outcomes.
- Add the read-only diagnostic journey.
- Preserve renamed commands as compatibility aliases for at least one declared
  compatibility window and emit structured deprecation guidance.

Exit gate: every workflow command completes its named outcome or states a
bounded partial/failure result with a safe next action.

Rollback: restore the prior command implementation behind the tested alias,
retain structured deprecation only when accurate, and revert route projections
through the ledger.

### Phase 4: Complete documentation, Preview, and contribution journeys

Entry: product-route and command outcomes are authoritative enough to project,
and every affected surface has a dated content/Preview/accessibility spec.

- Apply the common Quickstart template to every public host.
- Project structured facts while preserving curated prose and locale ownership.
- Add the documentation production build to pull-request validation.
- Provide self-contained Preview, diagnosis, fixture variants, browser checks,
  and screenshots.
- Publish progressively disclosed first-contribution paths and focused tasks.

Exit gate: a clean environment can complete `DX-J2`, `DX-J3`, and `DX-J6`
without an undocumented local dependency.

Rollback: return a structured fact block to its prior curated source, disable
only the affected Preview adapter or generated projection, and preserve working
manual URLs and contribution commands.

### Phase 5: Bind support claims to native evidence and release

Entry: the shared evidence contract, trust/index policy, host predicates,
privacy/support/security routes, and isolated producer are active for each claim
in scope.

- Backfill sanitized receipts for public support claims; unsupported or missing
  observations remain explicit.
- Run native smoke in isolated homes, initially advisory.
- Add freshness-aware support projections.
- Introduce release plan/apply, protected tag-driven publishing, artifact
  installation smoke, provenance, GitHub Release, and post-publish receipts.

Exit gate: every public support and release claim can be traced to a current
declaration, deterministic validation, and the evidence class it actually
requires.

Rollback: demote an unstable native gate to advisory, mark affected live claims
stale or withdrawn, stop release apply, and preserve immutable historical
receipts and manifests.

### Phase 6: Reinforce through measured improvement

Entry: at least one journey has a reviewed metric definition, privacy boundary,
population, denominator, baseline, and decision owner.

- Establish journey baselines before setting targets.
- Review journey by pillar, not only project-wide averages.
- Convert the highest-confidence friction into small dated specs.
- Revisit stale metrics, evidence policies, and support profiles on a declared
  cadence.

Exit gate: at least one improvement cycle demonstrates a measured task outcome,
an implemented change, and a post-change result without collecting default
remote telemetry.

Rollback: stop the affected collection or target, retain the bounded historical
evidence and its sampling caveat, and return prioritization to qualitative
journey review.
