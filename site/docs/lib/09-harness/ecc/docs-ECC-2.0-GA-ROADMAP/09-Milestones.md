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
pageSha256: "ab6fd77782f17e3ccc6c609338db2e7b3f06c4fdc0df4a84047d98efeee40c80"
contentMode: "local-full"
zh: ""
---

## Milestones

### 1. GA Release, Naming, And Plugin Publication Readiness

Target: 2026-05-24

Acceptance:

- Naming matrix covers product name, npm package, Claude plugin, Codex plugin,
  OpenCode package, marketplace metadata, docs, and migration copy.
- GitHub release, npm dist-tag, plugin publication, and announcement gates are
  mapped to fresh command evidence.
- Release notes, migration guide, known issues, quickstart, X thread, LinkedIn
  post, and GitHub release copy are ready but not posted before release URLs
  exist.
- Plugin publication/contact paths for Claude and Codex are documented with
  owner, required artifacts, and submission status.

### 2. Harness Adapter Compliance Matrix And Scorecard Onramp

Target: 2026-05-31

Acceptance:

- Adapter matrix covers Claude Code, Codex, OpenCode, Cursor, Gemini,
  Zed-adjacent surfaces, dmux, Orca, Superset, Ghast, and terminal-only use.
- Each adapter has supported assets, unsupported surfaces, install path,
  verification command, and risk notes.
- Harness audit remains 80/80 and gains a public onramp that explains how teams
  use the scorecard.
- Reference findings are converted into concrete adapter, observability, or
  operator-surface deltas.

### 3. Local Observability, HUD/Status, And Session Control Plane

Target: 2026-06-07

Acceptance:

- Observability readiness remains 21/21 and is backed by JSONL traces, status
  snapshots, risk ledger, and exportable handoff contracts.
- HUD/status model covers context, tool calls, active agents, todos, checks,
  cost, risk, and queue state.
- Worktree/session controls cover create, resume, status, stop, diff, PR,
  merge queue, and conflict queue.
- Linear/GitHub/handoff sync model is explicit enough for real-time progress
  tracking.

### 4. Self-Improving Harness Evaluation Loop

Target: 2026-06-10

Acceptance:

- Scenario specs, verifier contracts, traces, playbooks, and regression gates
  are documented and at least one read-only prototype exists.
- The loop separates observation, proposal, verification, and promotion.
- Team and individual setups can be scored and improved without blindly
  mutating configs.
- RAG/reference-set design covers vetted ECC patterns, team history, CI
  failures, diffs, review outcomes, and harness config quality.

### 5. AgentShield Enterprise Security Platform

Target: 2026-06-14

Acceptance:

- Formal policy schema and evaluation output exist for org baselines,
  exceptions, owners, expiration, severity, audit trails, expiring-soon
  visibility, and expired-exception enforcement.
- SARIF/code-scanning output is implemented and tested.
- GitHub Action policy gates expose organization policy status and violation
  counts for branch-protection and CI evidence.
- Policy packs are defined for OSS, team, enterprise, regulated, high-risk
  hooks/MCP, and CI enforcement.
- Supply-chain intelligence covers MCP package provenance and has an extension
  path for npm/pip reputation, CVEs, typosquats, and dependency risk.
- Prompt-injection corpus and regression benchmark are ready for continuous
  rule hardening with category-level coverage and regression-gate output.
- Enterprise reports include JSON plus self-contained HTML executive output
  with risk posture, priority findings, category exposure, and policy-exception
  lifecycle evidence in terminal/CI summaries.
- Native PDF export is not a GA blocker unless an enterprise/compliance
  workflow requires a generated PDF file instead of the self-contained HTML
  report and browser print-to-PDF path.

### 6. ECC Tools Billing, Deep Analysis, PR Checks, And Linear Sync

Target: 2026-06-21

Acceptance:

- Native GitHub Marketplace billing announcement is backed by verified
  implementation and docs.
- Internal billing readiness audit covers plan limits, seats, entitlement
  mapping, Marketplace plan shape, subscription state, overage hooks, and
  failure modes.
- Deep analyzer covers diff patterns, CI/CD workflows, dependency/security
  surface, PR review behavior, failure history, harness config, skill quality,
  dedicated analyzer corpus evidence, co-located analyzer reference sets,
  PR review/stale-salvage evidence, RAG/evaluator comparison, and reference-set
  validation.
- PR check suite taxonomy includes Security Evidence, Harness Drift, Install
  Manifest Integrity, CI/CD Recommendation, Cost/Token Risk, Reference Set
  Validation, Deep Analyzer Evidence, RAG/Evaluator Evidence,
  PR Review/Salvage Evidence, Skill Quality, and Agent Config Review.
- Evaluator/RAG billing readiness fixture
  `examples/evaluator-rag-prototype/billing-marketplace-readiness/` records the
  read-only claim-verification path for Marketplace, App, subscription, seat,
  entitlement, and plan language before launch copy can treat those claims as
  live.
- Cost/token-risk predictive follow-ups flag AI routing, model-call, usage,
  quota, and budget changes when budget evidence is missing.
- Reference-set validation follow-ups flag analyzer, skill, agent, command, and
  harness-guidance changes that lack eval, golden trace, benchmark, or
  maintained reference-set evidence.
- Deep-analyzer follow-ups flag repository, commit, architecture, pattern, and
  analysis-pipeline changes that lack analyzer corpus, snapshot, fixture, or
  benchmark evidence.
- Analyzer corpus evidence includes maintained fixtures and tests for current
  architecture and commit analyzer outputs, plus co-located
  `src/analyzers/\{fixtures,goldens,reference-sets,benchmarks,evals\}/` evidence
  paths.
- RAG/evaluator follow-ups flag retrieval, embedding, ranking, and evaluator
  changes that lack reference-set comparison, golden trace, benchmark, fixture,
  or eval-run evidence.
- Evaluator/RAG corpus contract mirrors the local prototype scenarios into
  ECC-Tools fixtures and tests for stale-PR salvage, billing readiness,
  CI failure diagnosis, harness config quality, AgentShield policy exceptions,
  skill-quality evidence, deep-analyzer evidence, and RAG/evaluator comparison.
- PR review/stale-salvage follow-ups flag review, triage, stale-closure, and
  pull-request automation changes that lack stale-salvage fixtures,
  reviewer-thread cases, or reopen-flow reference evidence.
- PR analysis comments summarize review follow-up signals for requested
  changes, unresolved or outdated review threads, and missing approvals.
- CI failure-mode predictive follow-ups flag workflow and test-runner changes
  that lack failure fixtures, captured logs, troubleshooting notes, dry-run
  evidence, or regression coverage.
- Harness-config quality predictive follow-ups flag MCP, plugin, agent, hook,
  command, and harness config changes that lack audit, adapter matrix,
  cross-harness doc, or compatibility regression evidence.
- Linear sync maps deferred backlog findings to Linear issues without flooding
  GitHub, creates or reuses exact-title Linear issues when configured, and
  reports skipped sync when credentials or team configuration are absent.
- Linear/project backlog sync includes copy-ready PR drafts when
  `/ecc-tools followups sync-linear` is used without `open-pr-drafts`, so
  stale-PR salvage work remains tracked without opening extra PR shells.
- Follow-up generation caps automatic GitHub object creation and keeps overflow
  findings in a copy-ready project sync backlog.

### 7. Legacy Audit And Stale-Work Salvage Closure

Target: 2026-06-15

Acceptance:

- Legacy directories and orphaned handoffs are inventoried.
- Each useful artifact is marked landed, Linear/project-tracked, salvage
  branch, or archive/no-action.
- Workspace-level legacy repos are mined only through sanitized maintainer
  branches; raw context, secrets, personal paths, local settings, and private
  drafts are never imported wholesale.
- Stale PR salvage policy stays in force: close stale/conflicted PRs first,
  record a salvage ledger item, then port useful compatible content on
  maintainer branches with attribution.
- #1687 localization leftovers are handled only by translator/manual review,
  not blind cherry-pick.
