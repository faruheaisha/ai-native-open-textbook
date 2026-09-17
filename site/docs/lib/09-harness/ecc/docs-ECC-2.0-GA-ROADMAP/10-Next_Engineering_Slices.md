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
pageSha256: "0d359d0828c025337e046ff8cd694248cf3158ceeee30657e422217017e5e7c7"
contentMode: "local-full"
zh: ""
---

## Next Engineering Slices

1. Continue the AgentShield enterprise control-plane sequence from
   `docs/architecture/agentshield-enterprise-research-roadmap.md`: PR #63
   shipped GitHub Action baseline outputs and job-summary evidence; PR #64
   shipped first-class baseline snapshot creation through
   `agentshield baseline write`; PR #67 shipped the evidence-pack bundle; PR
   #68 hardened evidence-pack redaction; PR #69 shipped the multi-harness
   adapter registry; PR #78 hardened the release workflow for the current
   supply-chain incident class; PR #79 moved baseline/watch/remediation
   fingerprints to hashed evidence and stopped writing raw evidence into new
   baselines; PR #80 added prioritized corpus accuracy recommendations for
   failed regression gates; PR #81 added ordered remediation workflow phases;
   PR #82 expanded corpus coverage for env proxy hijacks and out-of-band
   exfiltration; PRs #83-#85 hardened Mini Shai-Hulud IOC coverage and
   release-path supply-chain verification; PR #86 added whitelisted
   `ci-context.json` workflow, commit, run, and runtime provenance to evidence
   packs; PR #87 classified installed Claude plugin caches separately from
   active top-level runtime config, including cached hook implementations; PR
   #88 added `agentshield evidence-pack inspect` JSON/text readback for
   downstream consumers; PR #89 added `agentshield evidence-pack fleet`
   summary/routing across multiple inspected bundles; ECC-Tools PRs #42/#43 now
   route and recognize evidence packs; ECC-Tools PR #76 consumes fleet
   summaries in hosted security review; ECC-Tools PR #77 surfaces source
   evidence paths in hosted PR comments and check-runs; ECC-Tools PR #78
   links AgentShield fleet target paths into hosted harness owner findings; and
   AgentShield PR #90 emits fleet `reviewItems` with source evidence paths and
   owner-ready recommendations; AgentShield PR #91 exports checksum-backed
   policy bundles for branch-protection review and downstream policy
   promotion; AgentShield PR #92 promotes checksum-verified policy bundles
   into active policy files with dry-run JSON review; AgentShield commit
   `87aec47` adds policy promotion `reviewItems` for digest evidence,
   owner-review, protected-rollout PR handoff, and runtime smoke testing;
   AgentShield commit `28d08c7` adds package-manager hardening drift detection;
   AgentShield commit `659f569` clears the action-runtime deprecation warnings
   with current SHA-pinned v6 actions; AgentShield commit `ee585cd` corrects
   npm release-age guidance so unsupported npm age keys are findings while
   enforceable cooldown findings stay on pnpm/Yarn; AgentShield commit
   `1124535` exposes package-manager hardening Action outputs for registry
   credentials, lifecycle-script drift, and release-age gate drift; and
   AgentShield commit `1593925` exposes policy-promotion Action outputs for
   owner approval, protected rollout, digest evidence, and runtime-smoke
   review items, ECC-Tools commit `8658951` consumes those outputs in hosted
   security review and Hosted Promotion Readiness scoring, and ECC-Tools
   commit `16c537f` renders promotion status, pack, review item count,
   remaining action count, and digest in hosted security comments/check-runs.
   AgentShield commit `840952a` adds Linear/operator-ready fleet review ticket
   payloads and expands current Mini Shai-Hulud IOC breadcrumbs, with green
   local and remote CI. AgentShield commit `4e36aab` hardens CI package installs
   after the expanded Mini Shai-Hulud refresh, with CI, Test GitHub Action,
   Self-Scan, and Dependabot Update workflows green.
   ECC-Tools commit `05d4e82` adds hosted promotion judge audit traces with
   deterministic request fingerprints and allowed-citation counts, without
   exposing raw provider output.
   ECC-Tools commit `91a441b` adds a billing announcement preflight command
   for checking Marketplace readback inputs before privileged API calls.
   ECC-Tools commit `2859678` requires Marketplace webhook provenance in
   billing-state before native-payments announcement readiness can pass.
   ECC-Tools commit `42653f9` adds Wrangler OAuth KV readback and confirms the
   current blocker is not Cloudflare read access; it is the absence of a
   ready-like Marketplace Pro billing-state record with webhook provenance.
   ECC-Tools commit `632e059` adds sanitized target-account readback, and PRs
   #89/#90/#91 move the final operator path to selected-target readback,
   selected-target announcement gating, and ignored env-file credential loading
   without printing account logins or raw KV key names.
   ECC-Tools PR #79 redacts the billing announcement gate account output;
   PR #80 requires failure reasons in runtime receipts; PRs #81/#82 preserve
   and render AgentShield fleet approval IDs; PR #83 makes Linear follow-up
   sync idempotent by external ID; PR #84 syncs hosted AgentShield
   remediation items into Linear; PR #85 emits hosted job observability events
   including budget-blocked outcomes; PRs #86/#87 read those events back into
   hosted status comments and hosted depth-plan check-runs; and PR #88 exposes
   authenticated hosted observability API readback for operator dashboards.
2. Run `npm run billing:announcement-gate -- --preflight
   --select-ready-target`, adding `--env-file /path/to/ecc-tools.env` when the
   local bearer token is stored in an ignored operator file, then run the same
   command without `--preflight` and require `announcementGate.ready === true`
   before any native GitHub payments announcement.
3. Enable/configure the merged Linear backlog sync path after workspace issue
   capacity clears or the Linear workspace is upgraded, then verify PR-draft
   salvage items land in the expected project.
4. Use the ECC-Tools evaluator/RAG corpus as the promotion gate before adding
   deeper hosted retrieval, vector storage, or automated check-run promotion.
