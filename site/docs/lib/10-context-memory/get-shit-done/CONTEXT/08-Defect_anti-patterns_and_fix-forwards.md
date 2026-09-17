---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CONTEXT.md"
sourceRel: "CONTEXT.md"
rawUrl: "/raw/10-context-memory/get-shit-done/CONTEXT.md"
sourceSha256: "5339f8a1f2c77cfdd65b419f1126cfd9d409f8ad3b5dbe31a8b51a34aff5d7d5"
pageSha256: "ff3a3d91080075b49f8a62bb866d6bf12095e743d918d6a7bde859ebd78099ac"
contentMode: "local-full"
zh: ""
---

## Defect anti-patterns and fix-forwards

`DEFECT.SCOPE.window=PRs #3306..#3325 + sibling fixes #3240/#3242/#3245/#3257/#3261/#3267/#3286/#3287`
`DEFECT.FORMAT=class.sub-key=value | classes are greppable; each class carries detect / fix / anchor sub-keys when applicable`

`DEFECT.PORT-DRIFT.cjs-sdk.symptom=SDK port (sdk/src/query/*.ts) cites bin/lib/*.cjs source in docstring; CJS gets a fix or new constant; SDK lags silently`
`DEFECT.PORT-DRIFT.cjs-sdk.examples=#3317 (skills missing from SDK GSD_MANAGED_DIRS), #3240 (extractFrontmatter anchor), #3226 (phase.add --dry-run), #3243 (cjs dotted canonical), #3229 (model catalog source-of-truth)`
`DEFECT.PORT-DRIFT.cjs-sdk.detect=grep canonical constant in CJS, then in SDK; if both present compare values; if only CJS present treat as port-gap until proven intentional`
`DEFECT.PORT-DRIFT.cjs-sdk.fix-forward=add SDK-side behavioral test mirroring the CJS test; or extract shared JSON/TS module if both runtimes can consume it`
`DEFECT.PORT-DRIFT.cjs-sdk.anchor=tests/config-schema-sdk-parity.test.cjs is the canonical pattern — replicate per port-pair`

`DEFECT.REMOVED-BUT-NEEDED.symptom=file/key removed because "scoped under sdk/" or "no longer used" without verifying every consumer (workflows, docs, manifests, npm scripts)`
`DEFECT.REMOVED-BUT-NEEDED.examples=#3316 root package-lock.json (root package.json declares deps; workflows use cache:'npm' + npm ci), e3b52c70 docs referenced removed /gsd-new-workspace`
`DEFECT.REMOVED-BUT-NEEDED.detect=before deletion, grep filename across .github/workflows, get-shit-done/, docs/, package.json scripts, sdk/scripts; if any reference exists removal is incomplete`
`DEFECT.REMOVED-BUT-NEEDED.fix-forward=restore the file or update every consumer in the same commit; do not paper over with --no-package-lock or workflow workarounds that lose reproducibility`

`DEFECT.STATE-TRAMPLE.symptom=state-mutation paths overwrite curated values when body-derived computation is narrower than what's stored in frontmatter`
`DEFECT.STATE-TRAMPLE.examples=#3242 (Last Activity overwrote progress.completed_plans), #3257 (nested plans/ files uncounted), #3261 (buildStateFrontmatter), #3265 (canonical fields), #3286 (record-metric/add-decision sections)`
`DEFECT.STATE-TRAMPLE.detect=any state writer that calls buildStateFrontmatter without preserving existing progress.* keys; any mutation surface that does not honor shouldPreserveExistingProgress`
`DEFECT.STATE-TRAMPLE.fix-forward=route through state-document.cjs/.ts shouldPreserveExistingProgress + normalizeProgressNumbers (extracted in #3316 SDK-first seams)`

`DEFECT.PHASE-DIR-PREFIX-DRIFT.symptom=multiple workflow files independently construct .planning/phases/\{NN\}-\{slug\} paths; project_code prefix or slug normalization missing in some surfaces`
`DEFECT.PHASE-DIR-PREFIX-DRIFT.examples=#3287 (init.phase-op + init.plan-phase first-touch), #3306/PRED.k015 (plan-milestone-gaps + import + add-backlog), #3297/#3298 (sibling reports)`
`DEFECT.PHASE-DIR-PREFIX-DRIFT.detect=grep mkdir/touch/path.join with \{NN\}-\{slug\} or padded_phase + phase_slug; if not consuming expected_phase_dir from init.* JSON it is drifting`
`DEFECT.PHASE-DIR-PREFIX-DRIFT.fix-forward=consume expected_phase_dir from init.phase-op / init.plan-phase output; never re-construct from padded_phase + slug in workflow steps`
`DEFECT.PHASE-DIR-PREFIX-DRIFT.anchor=tests/bug-3298-phase-dir-prefix-drift-in-workflows.test.cjs (broad regression across workflow surfaces)`

`DEFECT.STACKED-PR-AUTO-RETARGET.symptom=PR #N is stacked on branch B; branch B merges to main and is deleted; GitHub does not reliably auto-retarget #N to main; PR shows DIRTY/CONFLICTING with phantom conflicts`
`DEFECT.STACKED-PR-AUTO-RETARGET.examples=#3311 base fix/3255-add-json-errors-mode-gsd-tools deleted after #3304 merged`
`DEFECT.STACKED-PR-AUTO-RETARGET.detect=ls-remote shows base ref absent; PR base still points at the deleted ref; mergeable=CONFLICTING with no real diff conflicts`
`DEFECT.STACKED-PR-AUTO-RETARGET.fix-forward=PATCH /repos/\{owner\}/\{repo\}/pulls/\{N\} -f base=main; rebase head onto current main; resolve carry-over commits (parent commits will auto-drop as patch contents already upstream)`

`DEFECT.BOT-BRANCH-STALE-BASE.symptom=auto-branch.yml creates fix/\{N\}-\{slug\} when issue is filed; branch is anchored to issue-creation main; by the time work begins, main has moved`
`DEFECT.BOT-BRANCH-STALE-BASE.examples=#3309 fix/3309-checkpoint-type-human-verify-burns-token (was at e14ef535; main at 2e87c60a)`
