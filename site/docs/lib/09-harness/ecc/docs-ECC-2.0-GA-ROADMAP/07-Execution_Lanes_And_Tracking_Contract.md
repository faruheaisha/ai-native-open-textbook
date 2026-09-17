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
pageSha256: "2d2a5dde091c4b902b53bfb7372e9cead02692acbd3f81165f411e48c57a90cf"
contentMode: "local-full"
zh: ""
---

## Execution Lanes And Tracking Contract

Until Linear issue capacity is cleared, this document is the durable execution
ledger and Linear receives project status updates only. The sync contract lives
at `docs/architecture/progress-sync-contract.md`. When capacity is available,
each lane below should become a small set of Linear issues linked back to the
repo evidence and merge commits.

| Lane | Source of truth | Next tracked artifact | Update cadence |
| --- | --- | --- | --- |
| Queue hygiene and salvage | GitHub PR/issue state, salvage ledger | Append ledger entries for any future stale closures | Every cleanup batch |
| Release and publication | rc.1 release docs, publication readiness doc | Naming matrix and plugin submission/contact checklist | Before any tag |
| Harness OS core | Audit, adapter matrix, observability docs, `ecc2/` | HUD/session-control acceptance spec | Weekly until GA |
| Evaluation and RAG | Reference-set validation, harness audit, traces, ECC-Tools corpus | Read-only evaluator/RAG prototype plus stale-salvage, billing-readiness, CI-failure-diagnosis, harness-config-quality, AgentShield policy-exception, skill-quality evidence, deep-analyzer evidence, and RAG/evaluator comparison fixtures; ECC-Tools #68 publishes the corpus as a hosted promotion readiness check-run, #69 scores cached hosted job outputs against the same corpus, #70 emits ranked retrieval candidates plus a model prompt seed, #71 adds a fail-closed hosted model-judge request contract, and #72 executes that judge only when explicitly enabled and backed by hosted retrieval citations; ECC-Tools `16c537f` surfaces policy-promotion Action output values in hosted security comments/checks; ECC-Tools `05d4e82` adds hosted model-judge audit traces with request fingerprints and allowed-citation counts | Marketplace Pro billing-state verification with webhook provenance |
| AgentShield enterprise | AgentShield PR evidence and roadmap notes | Fleet routing landed in #89 after evidence-pack inspect/readback shipped in #88; #90 emits fleet `reviewItems`; #91 exports checksum-backed policy bundles; #92 promotes checksum-verified policies from those bundles into active policy files; #94 adds Zed and VS Code adapter detection, Zed project scan discovery, and `.zed/setup.mjs` persistence IOC coverage; #95 closes the `brace-expansion` Dependabot alert with 0 open alerts after merge; AgentShield `87aec47` adds policy promotion `reviewItems`; `28d08c7` adds package-manager hardening drift detection; `659f569` refreshes workflow action runtime pins; `ee585cd` corrects unsupported npm release-age guidance and keeps enforceable cooldown findings on pnpm/Yarn; `1124535` exposes package-manager hardening Action outputs for CI/hosted routing; `1593925` exposes policy-promotion Action outputs and runtime-smoke job-summary evidence; `840952a` adds fleet review ticket payloads and current Mini Shai-Hulud IOC breadcrumbs; ECC-Tools #76 consumes fleet summaries, #77 surfaces source evidence paths in hosted findings, #78 links fleet routes to harness owners, ECC-Tools `8658951` consumes policy-promotion Action outputs, and ECC-Tools `16c537f` renders operator-visible output values | Deepen live operator approval/readback after Marketplace/payment gates |
| ECC Tools app | ECC-Tools PR evidence, billing audit, risk taxonomy, evaluator/RAG corpus | ECC-Tools #53 published the supply-chain workflow hardening branch, #54 tracks copy-ready PR drafts in the Linear/project backlog, #55 classifies analysis-depth readiness, #56 exposes the hosted execution plan, #57 executes the first hosted CI diagnostics job, #58 executes the hosted security evidence review job, #59 executes the hosted harness compatibility audit, #60 executes the hosted reference-set evaluation, #61 executes the hosted AI routing/cost review, #62 executes hosted team backlog routing, #63 publishes the hosted depth-plan check-run, #64 dispatches hosted jobs from PR comments, #65 persists hosted result history/check-runs, #66 exposes hosted job status from PR comments, #67 makes depth-plan recommendations cache-aware, #68 publishes hosted promotion readiness from the evaluator/RAG corpus, #69 scores cached hosted job outputs against that corpus, #70 emits ranked retrieval candidates plus a model prompt seed, #71 emits the gated `hosted-promotion-judge.v1` contract without live model calls, #72 adds opt-in live model-judge execution behind hosted-evidence and strict JSON/citation gates, #73 adds a fail-closed native-payments `announcementGate` to billing readiness, #74 adds `npm run billing:announcement-gate` for operator verification, #75 tightens the billing announcement gate for live Marketplace readback, #76 routes AgentShield fleet-summary evidence into hosted security findings, #77 adds source evidence paths to hosted finding output, #78 links AgentShield fleet target paths to hosted harness owner findings, `8658951` routes AgentShield policy-promotion Action outputs into hosted security review and promotion readiness, `16c537f` renders policy-promotion status/pack/count/digest values in hosted security comments/checks, `05d4e82` renders hosted promotion judge request fingerprints plus allowed-citation audit traces, `91a441b` adds billing announcement preflight output for required readback inputs, `eb69412` records the initial production readback state, `95d0bec` adds aggregate `billing:kv-readback` evidence, `2859678` requires Marketplace webhook provenance in billing readiness, `42653f9` adds Wrangler OAuth readback with live aggregate production counts, `632e059` adds sanitized target-account billing readback for the exact Marketplace test account, ECC-Tools #89 adds selected-ready-target KV readback, ECC-Tools #90 adds selected-target official announcement gating without raw login input, and ECC-Tools #91 adds `--env-file` support for ignored local billing credentials without printing secrets or logins | Obtain or rotate the local/internal `INTERNAL_API_SECRET` bearer-token path, via exported env or ignored `--env-file`, then run the live selected-target billing announcement gate |
| Linear progress | Linear project status updates, `docs/architecture/progress-sync-contract.md`, generated `operator:dashboard` output, and this mirror | Status update with queue/evidence/missing gates | Every significant merge batch |

The project status update should always include:

1. Current public PR and issue counts.
2. Merged evidence since the previous update.
3. Deferred or blocked items with the reason.
4. The next one or two implementation slices.
5. Any release or publication gate that is still not evidence-backed.
