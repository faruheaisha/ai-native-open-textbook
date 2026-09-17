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
pageSha256: "bba08ae82eaa5cffecc0f9ddc7d64b0c51f7ce2eec465d01a04431f7e3a4423f"
contentMode: "local-full"
zh: ""
---

## Repo-rule reinforcement — k320..k331

`META.RULE.canonical-source-precedence=CONTRIBUTING.md > docs/adr/* > CONTEXT.md > agent memory`
`META.RULE.read-contributing-first=read CONTRIBUTING.md sections "Pull Request Guidelines" + "CHANGELOG Entries" before EVERY agent dispatch`
`META.RULE.brief-must-cite-doc=agent prompts MUST quote the canonical doc line being applied; paraphrasing from predicate memory drifts and produces violations`
`META.RULE.brief-no-paraphrase=writing "k040 — never leave changelog box unchecked" caused 5 of 8 agents to edit CHANGELOG.md in violation of CONTRIBUTING.md L110`

`PRED.k320.signal=changelog-direct-edit-forbidden`
`PRED.k320.canonical-source=CONTRIBUTING.md L110-123`
`PRED.k320.rule=do not edit CHANGELOG.md in feature/fix/enhancement PRs`
`PRED.k320.cure=drop .changeset/<adj>-<noun>-<noun>.md fragment ONLY`
`PRED.k320.tool=npm run changeset -- --type <T> --pr <NNN> --body "..."`
`PRED.k320.types=Added|Changed|Deprecated|Removed|Fixed|Security`
`PRED.k320.opt-out-label=no-changelog`
`PRED.k320.ci-enforcement=scripts/changeset/lint.cjs`
`PRED.k320.ci-paths-monitored=bin/ get-shit-done/ agents/ commands/ hooks/ sdk/src/`
`PRED.k320.recovery=open Removed-typed cleanup PR deleting only the redundant row`
`PRED.k320.evidence=PR #3302 merge-conflict against #3308 CHANGELOG.md row 2026-05-09`

`PRED.k321.signal=cr-outside-diff-range-finding`
`PRED.k321.shape=CR posts "[!CAUTION] outside the diff" findings in review BODY, not in reviewThreads`
`PRED.k321.poll-shape=parse pulls/<n>/reviews body AND graphql reviewThreads`
`PRED.k321.resolution=address in code; no GraphQL resolveReviewThread needed for body-only findings`
`PRED.k321.evidence=PRs #3304/#3305 (2026-05-09): real Minor/Major findings in body, 0 threads`

`PRED.k322.signal=cr-sustained-throttle`
`PRED.k322.distinct-from=k080`
`PRED.k322.shape=ack posted, real review never lands within [5s, 410s] cooldown after burst of N PRs <15min`
`PRED.k322.cure-1=2nd retrigger ~10min after first ack`
`PRED.k322.cure-2=if silent at 50min, treat as silent-pass with maintainer flag in merge-commit body`
`PRED.k322.merge-gate-impact=k070 real_coderabbit_review_present unsatisfied; requires maintainer judgment`
`PRED.k322.evidence=PR #3306 (2026-05-09): 0 reviews after 50min + 2 retriggers`

`PRED.k323.signal=sibling-audit-cross-pr-overlap`
`PRED.k323.shape=2+ open issues touch same canonical bug site; each fix's sibling-audit produces overlapping diff`
`PRED.k323.cure-pre-dispatch=brief one agent canonical-owner; brief others to EXCLUDE shared site`
`PRED.k323.cure-alt=consolidate into single PR when 2+ issues share root cause`
`PRED.k323.recovery=close smaller PR as "subsumed by #N" or rebase second to drop overlap hunk`
`PRED.k323.evidence=#3300 (#3297) overlapped #3306 (#3298) on add-backlog.md hunks 2026-05-09`

`PRED.k324.signal=agent-terminates-mid-monitor`
`PRED.k324.k095-restatement=k095 confirmed shape: agent reports "waiting for monitor" / "tests still running" then terminates`
`PRED.k324.cure=verify via gh api on every agent-completion notification; never trust narrative`
`PRED.k324.poll-shape=gh pr view <n> --json mergeStateStatus,statusCheckRollup + pulls/<n>/reviews + graphql reviewThreads + issues/<n>/comments tail`
`PRED.k324.evidence=2026-05-09 session: 5+ mid-monitor terminations across PRs #3232/#3271/#3251/#3255/#3262`

`PRED.k325.signal=worktree-branch-lock-on-force-push`
