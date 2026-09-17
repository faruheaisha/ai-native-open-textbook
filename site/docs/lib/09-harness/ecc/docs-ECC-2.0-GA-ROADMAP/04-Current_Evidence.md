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
pageSha256: "12d086f6c4d0a9637017201ce7f12a5a36732f8edbe09e19b6e73f5c6d820ba8"
contentMode: "local-full"
zh: ""
---

## Current Evidence

As of 2026-05-20:

- GitHub queues are clean across `affaan-m/ECC`,
  `affaan-m/agentshield`, `affaan-m/JARVIS`, `ECC-Tools/ECC-Tools`, and
  `ECC-Tools/ECC-website`: the latest `platform-audit` sweep found 0 open PRs,
  0 open issues, 0 discussion maintainer-touch gaps, 0 answerable Q&A missing
  accepted answers, and 0 blocking dirty files. The current
  `scripts/work-items.js list --json` output also reports `totalCount: 0`, so
  there are no open or blocked local work items in the SQLite bridge.
- Owner-wide queue cleanup is also inside the requested budget:
  `docs/releases/2.0.0-rc.1/owner-queue-cleanup-2026-05-18.md` records the
  live `gh search` sweep that closed 24 stale dependency-bot PRs and 72 stale
  legacy payments/0EM roadmap issues, then closed the 9 remaining stale,
  generated, conflicting, or test/noise PRs and the 5 remaining legacy,
  outreach, or placeholder issues. The broader `affaan-m` owner namespace is
  now at 0 open PRs and 0 open issues by live `gh search`. Archived repos
  touched during closure were restored to archived state.
- GitHub discussions are current across those tracked repos:
  `affaan-m/ECC` has 60 total discussions and 0 without
  maintainer touch after the May 19 #2003 AURA integration proposal was routed
  as an external-adapter proposal, not core wallet/escrow coupling, and the
  May 20 #2015 setup-location Q&A was answered and accepted; AgentShield,
  JARVIS, ECC Tools, and the ECC Tools website have discussions disabled or 0
  total discussions. `docs/architecture/discussion-response-playbook.md` now
  supplies the ITO-59 response categories, public templates, security-escalation
  path, and readback rules for future discussion batches.
- The current Linear roadmap contains 16 issue lanes (`ITO-44` through
  `ITO-59`) and five milestones: Security and Access Baseline, ECC 2.0 Preview
  and Publication, AgentShield Enterprise Iteration, ECC Tools Next-Level
  Platform, and Legacy Audit and Salvage.
- Linear live sync is current for the May 19 PR #2002 merge and discussion
  batch: the ECC platform project has the post-PR #2002 sync document
  `ecc-may-19-post-pr-2002-sync-64cef8f668e0`, project comment
  `a6411e3a-8c8e-4a58-adba-687e77d4c543`, and issue comments on ITO-44,
  ITO-47, ITO-48, ITO-49, ITO-51, ITO-54, and ITO-56. ITO-47, ITO-48,
  ITO-49, ITO-51, ITO-54, and ITO-56 were moved to In Progress because those
  lanes now have current implementation/evidence and remaining gate/readback
  work. ITO-57 still has the May 18 emergency supply-chain refresh comment
  (`3fe5b2b7-c4fe-401c-a317-b40d72119cb3`). Linear project status updates are
  disabled in this workspace, so project documents and comments are the
  supported external status surface.
- The latest May 18 merge batch on `main` includes PR #1970 workflow-security
  validator bypass fixes, PR #1971 metrics bridge cost-reporting and warning
  de-dup fixes, PR #1972 `uncloud` skill activation structure, PR #1976
  OpenAI/AstraFlow provider response guards, ECC-Tools Wrangler OAuth billing
  readback mirror evidence, the `04d4d819` defensive-deny IOC scanner hardening
  recheck, `7911af4a` release OIDC publishing-scope hardening, `97567a91`
  release workflow line-ending normalization, and release evidence with a
  refreshed operator dashboard.
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-19.md` records the
  current May 19 queue-zero state, canonical ECC identity merge, release video
  suite gate, partner/sponsor/talk outreach pack, owner approval packet
  (`owner-approval-packet-2026-05-19.md`), current preview-pack smoke digest
  `eebb8a66c33e`, local 2568-test suite, PR #2001 merge and GitHub Actions run
  `26102500291` success, PR #2002's owner-approval dashboard gate refresh and
  GitHub Actions run `26103853507`, PR #2004's Linear readiness evidence sync
  and GitHub Actions run `26105012698`, plus PR #2005's post-PR #2004
  evidence refresh and GitHub Actions run `26106321921`, PR #2008's supply-chain
  evidence gate fix and GitHub Actions run `26108473648`, post-PR #2006 main CI
  run `26109953093`, and PR #2009's project-registry hygiene GitHub Actions run
  `26111313938`, post-PR #2009 main CI run `26111946778`, post-PR #2011
  GateGuard main CI run `26113695068`, and post-PR #2013 release-approval-gate
  main CI run `26128749863`. The late May 19 sync target also includes
  ECC-Tools PR #79 billing-announcement redaction hardening and JARVIS PR #15
  / PR #16 queue/deploy repair, with JARVIS main CI, CodeQL, and Deploy green
  after the workflow repair. The Linear external project status surface now has
  both the post-PR #2002 sync document and the late-pass document
  `ecc-may-19-late-queue-zero-and-release-gate-sync-1c26f65e6b3f`, plus project
  comment `d42bf0e2-7a8e-4934-9f3f-e281498ee805`. The supply-chain gate now
  also records the `@types/node@25.7.0` pin and `brace-expansion` lock refresh
  needed for current npm audit/signature verification.
- The May 20 ECC-Tools hosted-platform pass extends that evidence with PR #80
  through PR #88, all merged after green GitHub Verify/Security Audit/Workers
  Builds checks. Local validation for the final depth-plan observability slice
  passed the focused hosted depth-plan route test, the full route suite
  (89/89), typecheck, lint, full ECC-Tools Vitest suite (683/683), and
  `git diff --check`. PR #88 additionally exposes authenticated hosted
  observability readback at `/api/analysis/observability` for operator
  dashboards and production smoke tests; its local verification passed
  typecheck, lint, the full ECC-Tools Vitest suite (686/686), and
  `git diff --check`.
- AgentShield PR #94 adds Zed and VS Code to the first-class adapter registry
  after local verification with typecheck, lint, the focused core scanner/rule
  tests, full `npm test` (1822 tests), `npm run build`, and `git diff --check`.
  GitHub checks passed across GitGuardian, scan suite, self-scan,
  self-scan examples, Node 18/20/22 CI, CodeRabbit, and Cubic after rerunning a
  transient GitHub artifact-upload failure.
- AgentShield PR #95 resolves Dependabot #20 / `GHSA-jxxr-4gwj-5jf2` /
  `CVE-2026-45149` by updating the vulnerable `brace-expansion` 5.x
  transitive lockfile entries to `5.0.6`. Local validation passed
  `npm audit --audit-level=moderate`, typecheck, lint, full `npm test`
  (1822 tests), build, and whitespace checks; GitHub checks passed across
  Verify Node 18/20/22, self-scan, self-scan examples, Test GitHub Action,
  GitGuardian, CodeRabbit, and Cubic.
- `docs/releases/2.0.0-rc.1/operator-readiness-dashboard-2026-05-20.md`
  regenerates the ITO-44 prompt-to-artifact dashboard from live platform audit
  evidence: PR queue, issue queue, discussion queue, local worktree gate,
  dashboard generation, and supply-chain loop are current; the dashboard now
  also tracks the `$1,728/mo` to `$10,000/mo` hypergrowth baseline, release
  video-suite lane, partner/sponsor/talk outbound pack, and owner approval
  packet; publication, plugin, billing, AgentShield, ECC Tools, Linear release
  gate sync, and final outbound approval remain the next work.
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-17.md` records the
  May 17 queue-zero state, Japanese localization merge, Dependabot TypeScript
  and Node type merges, post-merge ja-JP lint repair, Mini Shai-Hulud/TanStack
  local protection recheck, npm audit/signature checks, current operator
  dashboard, and GitHub CI success for `99dd6ac0`.
- `docs/releases/2.0.0-rc.1/publication-evidence-2026-05-16.md` records the
  queue, discussion, Linear roadmap, ECC Tools access, Mini Shai-Hulud/TanStack
  full-campaign follow-up, scheduled supply-chain watch coverage, no-lifecycle
  CI install hardening, GitHub Actions cache purge, AgentShield #85
  registry-signature verification, AgentShield #86 evidence-pack CI provenance,
  AgentShield #87 plugin-cache runtime-confidence classification, AgentShield
  #88 evidence-pack inspect/readback, AgentShield #89 evidence-pack fleet
  routing, AgentShield #90 fleet review items, AgentShield #91
  checksum-backed policy export, AgentShield #92 checksum-verified policy
  promotion, ECC-Tools #75 billing-gate tightening,
  ECC-Tools #76 AgentShield fleet-summary consumption, ECC-Tools #77 hosted
  finding evidence paths, ECC-Tools #78 harness policy-route linking, PR #1947
  supply-chain protection, and May 16 release-evidence
  refresh.
- `npm run harness:audit -- --format json` reports 80/80 on current `main`.
- `npm run observability:ready` reports 21/21 readiness on current `main`,
  including the GitHub/Linear/handoff/roadmap progress-sync contract.
- GitHub CI run `26017368895` completed successfully for
  `04d4d81938b20ac2bac1f0025145ab77d6a59f5f`, including Validate Components,
  Coverage, Lint, Security Scan, and the full Node/package-manager matrix.
- Supply-Chain Watch run `26009825837` completed successfully for
  `3b7e0ba30a027ffd3319c2f145c63076c296d80a`, including no-lifecycle install,
  npm audit/signature verification, scanner fixtures, advisory-source
  fixtures, IOC/advisory artifact generation, and workflow-security validation.
- PR #1846 merged as `797f283036904128bb1b348ae62019eb9f08cf39` and made
  npm registry signature verification a durable workflow-security gate:
  workflows that run `npm audit` now need `npm audit signatures`.
- PR #1848 merged as `cbecf5689d8d1bd5915e7031697a1d56aac538f2` and added
  `docs/security/supply-chain-incident-response.md`, plus a workflow-security
  validator rule blocking `pull_request_target` workflows from restoring or
  saving shared dependency caches.
- PR #1940 merged as `6951b8d5d29d13cac6b89b461104ad03838553de` and added a
  scheduled supply-chain watch workflow that emits a durable IOC report.
- PR #1941 merged as `f7035b5644ffc857879b71c39353b2141f17c3f0` and hardened
  CI dependency installs against lifecycle-hook compromise by disabling package
  manager lifecycle scripts, removing Actions dependency cache use, and adding
  validator coverage so those patterns cannot be reintroduced silently.
- PR #1850 merged as `248673271455e9dc85b8add2a6ab76107b718639` and removed
  shell access from read-only analyzer agents and zh-CN copies, reducing
  AgentShield high findings on that surface without changing operator agents.
- PR #1851 merged as `209abd403b7eaa968c6d4fa67be82e04b55706d6` and made
  `persist-credentials: false` mandatory for `actions/checkout` in workflows
  with write permissions.
- PR #1860 merged as `c2762dd5691a33aaa7f84a0a4901a5bab7980fc8` and closed
  #1859 by adding the Ruby/Rails language pack surface, install aliases,
  selective-install components, and focused install-manifest executor tests.
- AgentShield PR #78 merged as `1b19a985d6ae1346244089a78806a7d5eaaf270e`
  and hardened the release workflow with `persist-credentials: false` plus
  `npm ci --ignore-scripts` in the write/id-token release path.
- AgentShield PR #79 merged as `86a823c5f2c35ee97e6ecf6f99e9ac301d54119a`
  and moved baseline/watch/remediation fingerprints to a shared hashed
  evidence fingerprint helper. New baselines omit raw finding evidence while
  older raw-evidence baselines remain comparable.
- AgentShield PR #80 merged as `8ed379d1de067b25640ac6273aa4d9f8e6735d43`
  and added prioritized corpus accuracy recommendations to failed corpus gates,
  mapping misses by category, missing rule, and config ID so enterprise
  scanner-regression work has an actionable improvement plan.
- AgentShield PR #81 merged as `6583884e74ba2e896942113e1ce3146230e6fb76`
  and added ordered remediation workflow phases to remediation plans, routing
  safe auto-fixes, manual review, and verification through stable finding
  fingerprints without copying raw evidence.
- AgentShield PR #82 merged as `51336ba074ad5e9fed2c0aa3237422be22147e76`
  and expanded the built-in attack corpus with an env proxy hijack scenario
  covering proxy/runtime mutation, env-token exfiltration, DNS exfiltration,
  credential-store access, and clipboard access.
- AgentShield PR #87 merged as `26bb44650663816d07180e0d20c1895e431a326c`
  and added installed Claude plugin-cache runtime confidence. Cached plugin
  findings now emit `runtimeConfidence: plugin-cache`, non-secret score impact
  stays at the intended `0.5x`, repository-local non-Claude `plugins/cache`
  paths are not downgraded, and cached hook implementations no longer appear as
  active top-level `hook-code`.
- AgentShield PR #88 merged as `65ed6e2a87545dc99d962b58413f49096a4d70ec`
  and added `agentshield evidence-pack inspect` for downstream consumers.
  Evidence-pack bundles now have compact JSON/text readback for report score,
  finding counts, runtime confidence, policy, baseline, supply-chain, CI
  context, remediation phases, and malformed artifact errors without manually
  opening every bundle file.
- AgentShield PR #89 merged as `521ada9091bb6d818511ab8589ae675b920c106a`
  and added `agentshield evidence-pack fleet <dirs...> [--json]` for
  downstream fleet routing. Multiple verified evidence packs now aggregate into
  ready, security-blocker, policy-review, baseline-regression,
  supply-chain-review, and invalid routes with finding, policy, baseline,
  supply-chain, and remediation totals.
- JARVIS PR #13 merged as `127efabbfb5033ae53d7a53e1546aa3c33d6f962`
  and hardened CI/deploy workflows with npm registry signature verification,
  disabled persisted checkout credentials in write-permission jobs, and pinned
  the Vercel CLI install instead of using `latest`.
- ECC-Tools PR #53 merged as `99018e943d03f024de8c9d278c91f66393d4f1ee`
  and added npm registry signature verification before the existing production
  dependency audit in CI.
- ECC-Tools PR #54 merged as `05df89721f49c1e19d8502c545e26f5694806998`
  and made `/ecc-tools followups sync-linear` track copy-ready PR drafts in
  the Linear/project backlog when `open-pr-drafts` is not used, preserving
  useful stale-PR salvage work without opening extra PR shells.
- ECC-Tools PR #55 merged as `5d8c112cce4794cfa089d5b0ea661ba87a178be1`
  and added analysis-depth readiness to `/ecc-tools analyze` comments,
  separating commit-history-only repos from evidence-backed and deep-ready repos
  using CI/CD, security, harness, reference/eval, AI routing/cost-control, and
  team handoff evidence.
- ECC-Tools PR #56 merged as `5b729c88641eafe80f65364bab3fc74d0270f57b`
  and added the authenticated `/api/analysis/depth-plan` contract that maps
  analysis-depth readiness into concrete hosted jobs for CI diagnostics,
  security evidence review, harness compatibility, reference-set evaluation,
  AI routing/cost review, and team backlog routing.
- ECC-Tools PR #57 merged as `4cc61112a4cc9feec7b07af09321f360e34af6a4`
  and added the first executable hosted analysis job:
  `/api/analysis/jobs/ci-diagnostics` now gates on CI/CD readiness, inspects
  workflow/test-runner/failure-evidence artifacts, returns CI hardening
  findings and next actions, and charges usage only after successful execution.
- ECC-Tools PR #58 merged as `ce09dd8d9b46f65c6b88dc4f48cfb6b6227ae0bf`
  and added the second executable hosted analysis job:
  `/api/analysis/jobs/security-evidence-review` now gates on security-evidence
  readiness, inspects capped AgentShield evidence-pack, policy, baseline,
  SBOM, SARIF, and security-scan artifacts, returns supply-chain evidence
  findings and next actions, and charges usage only after successful execution.
- ECC-Tools PR #59 merged as `505b372dbd8f75f996d9e2ed079effd30cec5ba5`
  and added the third executable hosted analysis job:
  `/api/analysis/jobs/harness-compatibility-audit` now gates on harness-config
  readiness, inspects capped Claude, Codex, OpenCode, MCP, plugin, and
  cross-harness documentation artifacts, excludes local secret-bearing config
  paths from fetches, returns portability findings and next actions, and
  charges usage only after successful execution.
- ECC-Tools PR #60 merged as `b75e0a49ba5672b1ec9a2a4880ddcfa2d07dc557`
  and added the fourth executable hosted analysis job:
  `/api/analysis/jobs/reference-set-evaluation` now gates on reference-evidence
  readiness, evaluates analyzer corpus, RAG/evaluator, PR salvage/review,
  harness, security, and CI failure-mode evidence, excludes obvious
  secret-bearing fixture paths from fetches, returns reference coverage
  findings and next actions, and charges usage only after successful execution.
- ECC-Tools PR #61 merged as `7b01b67cae0b80774b311cb515b7eca0aa038c65`
  and added the fifth executable hosted analysis job:
  `/api/analysis/jobs/ai-routing-cost-review` now gates on AI routing/cost
  readiness, evaluates model routing, token budget, usage-limit, rate-limit,
  billing/entitlement, cost-regression, and cost-policy evidence, excludes
  obvious secret-bearing paths from fetches, returns cost-control findings and
  next actions, and charges usage only after successful execution.
- ECC-Tools PR #62 merged as `781d6733e56f7556edb43fb96bdfb00b1f0a3aa6`
  and added the sixth executable hosted analysis job:
  `/api/analysis/jobs/team-backlog-routing` now gates on team handoff/project
  tracking readiness, evaluates roadmap, runbook, handoff, release-plan,
  issue-template, ownership, project-tracker, backlog, and follow-up evidence,
  excludes obvious secret-bearing paths from fetches, returns team-routing
  findings and next actions, and charges usage only after successful execution.
- ECC-Tools PR #63 merged as `fb9e4c5ceb9ccde50da74c7a69c3fa4bd321fc07`
  and made the hosted execution plan operator-visible on queued PR analysis:
  the queue now publishes a non-blocking `ECC Tools / Hosted Depth Plan`
  check-run on the PR head SHA with ready/blocked hosted executor commands
  and next action text, while keeping check-run publication best-effort so
  bundle generation and analysis comments are not blocked.
- ECC-Tools PR #64 merged as `72020ef94db94840812977ea7ac37e9344036668`
  and added PR-facing hosted job dispatch controls:
  `/ecc-tools analyze --job ...` comments now queue hosted jobs against the
  PR head SHA, execute them through the existing hosted readiness/evidence
  gates, post artifacts/findings/next actions back to the PR, and scope
  idempotency keys by job id so hosted jobs do not collide with bundle
  analysis.
- ECC-Tools PR #65 merged as `bacd4adf6a3a629e8d403865456d15f127baaf4e`
  and added hosted job result history/check-run summaries:
  queued hosted jobs now cache both the latest result and immutable run records
  for completed or blocked runs, then publish a non-blocking per-job check-run
  on the PR head SHA with artifacts, findings, readiness blockers, and next
  actions.
- ECC-Tools PR #66 merged as `4e1db48252d068ea5dcf4308b0bc11b0dfe0c9ce`
  and added a read-only hosted status command:
  `/ecc-tools analyze --job status` now reads the #65 latest-result cache for
  the current PR head and posts a compact completed/blocked/not-run table with
  the next hosted job command, without queueing work or billing usage.
- ECC-Tools PR #67 merged as `f20e6bec2b0bf49e4cc36e08b7285c795973b73d`
  and made the hosted depth-plan check-run status-aware:
  queued PR analysis now reads the #65/#66 latest-result cache when publishing
  `ECC Tools / Hosted Depth Plan`, includes the latest hosted run status in
  the plan table, and recommends the next unrun ready job before reruns.
- ECC-Tools PR #68 merged as `2cde524b5ef8f34ab7bb1af973248fe4be4359f8`
  and added deterministic hosted promotion readiness:
  opened/synchronized PRs now publish a non-blocking
  `ECC Tools / Hosted Promotion Readiness` check-run that compares changed
  files against the checked-in evaluator/RAG corpus, warns on missing
  hosted-job promotion evidence, and can be disabled with
  `PR_HOSTED_PROMOTION_READINESS_CHECK_MODE=off`.
- ECC-Tools PR #69 merged as `d0112dac7cef807ae27def41f057682ef0772cce`
  and extended hosted promotion readiness with deterministic output scoring:
  the check now reads cached completed hosted job results for the current PR
  head, scores their artifacts and findings against evaluator/RAG corpus
  expectations, and treats matching hosted artifacts as promotion evidence
  before reporting a gap.
- ECC-Tools PR #70 merged as `7001d805ac981fe220b4575159f469fbea9dbb76`
  and added retrieval planning for hosted promotion:
  the check now emits ranked retrieval candidates from cached hosted artifacts,
  hosted findings, expected evidence paths, and changed source paths, plus a
  model prompt seed that tells the later hosted judge not to promote from
  changed paths alone.
- ECC-Tools PR #71 merged as `d41e59ff00fe1bd0b0c96386e56bc5269d7b9c15`
  and added the first model-backed hosted promotion judge contract:
  the check now emits a provider-neutral `hosted-promotion-judge.v1` request
  contract and fails closed unless hosted retrieval evidence, entitlement,
  remaining budget, and provider configuration are present. It still does not
  make live model calls.
- ECC-Tools PR #72 merged as `973bc51e5436dd279ae5a890cce9811485eef0b5`
  and executes the hosted promotion model judge behind explicit gates:
  `PR_HOSTED_PROMOTION_MODEL_JUDGE_MODE=execute` now calls the configured
  provider only after hosted retrieval evidence, entitlement, budget, provider,
  and executor gates pass; the check remains non-blocking, strict-JSON-only,
  and rejects uncited or non-hosted model output without echoing raw responses.
- ECC-Tools commit `05d4e8296e37ba72e471beaa23ea4c81eb2aa31f`
  adds operator-readable audit traces to hosted promotion model judging:
  check-runs now render a deterministic request fingerprint and
  allowed-citation count alongside the accepted decision, without exposing raw
  provider output.
- ECC-Tools PR #73 merged as `7d0538c9354e18adbfc72ef00d858949a817fa48`
  and added a fail-closed native-payments announcement gate to
  `/api/billing/readiness`: public payment claims now require
  `announcementGate.ready === true` from a Marketplace-managed test account
  before launch copy can move past release review.
- ECC-Tools commit `91a441b92342b842832ac28b018ee46f0c4a906f`
  adds `npm run billing:announcement-gate -- --preflight` so operators can
  verify the Marketplace test account, internal API token presence, and
  billing-readiness endpoint before making the privileged readback call.
- ECC-Tools commit `eb6941290b2fa70db01a51084e9e79a160238468`
  recorded the first live production readback state: Cloudflare Worker secret
  names include `INTERNAL_API_SECRET`, but no Marketplace-managed account could
  pass the announcement gate yet.
- ECC-Tools commit `95d0bec69dbcf364ed084e983a40d0a94d443d16`
  adds repeatable aggregate production KV readback with
  `npm run billing:kv-readback`: the latest API-authenticated run found 253
  `account-billing:*` records and 253 `billing-state:*` records, but 0
  Marketplace-managed Pro `billing-state:*` records, so native-payments copy
  remains blocked until `--require-ready` and the official internal
  announcement gate pass.
- ECC-Tools commit `285967807ea7b5eb3146bc984fb2229db67d4290`
  requires GitHub Marketplace webhook provenance on Pro billing-state records
  before native-payments announcement readiness can pass. The CI run
  `26013559229` succeeded for the pushed head.
- ECC-Tools commit `42653f9140c232961280d961ed76a6142433cfa1`
  adds `npm run billing:kv-readback -- --wrangler` so operators can run the
  aggregate production KV readback through an authenticated Wrangler OAuth
  session instead of requiring a separate Cloudflare API token/global key. CI
  run `26016223013` succeeded, and the latest live readback found 253
  `account-billing:*` records and 253 `billing-state:*` records with 194
  marketplace/free states, 59 Stripe/pro states, 0 Marketplace Pro states, 0
  ready-like Marketplace Pro states, and 0 parse failures. Native-payments
  copy remains blocked until a real Marketplace-managed Pro webhook creates
  billing-state provenance and `--require-ready` plus the official internal
  announcement gate pass.
- ECC-Tools commit `632e059e51b6e1297ba118807c8b5b2adbac74ce`
