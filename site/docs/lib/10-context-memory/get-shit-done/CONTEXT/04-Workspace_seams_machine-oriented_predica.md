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
pageSha256: "d740b9e60ff890710801028a95777125f945af2f52245dce145fe50238c39773"
contentMode: "local-full"
zh: ""
---

## Workspace seams (machine-oriented predicates)

`RULESET.GH.AUTH.DEFAULT=source .envrc GITHUB_TOKEN before gh; exception=ambient allowed only when user explicitly says machine-only fallback`
`RULESET.CODERABBIT.GUARD.OPEN_PRS=gh pr list --repo gsd-build/get-shit-done --author @me --state open; repeat near end because open PR set can change mid-run`
`RULESET.CODERABBIT.GUARD.COMPLETE=required_checks_green && coderabbit_check_pass && graphQL(reviewThreads.unresolved_count)==0`
<code v-pre>RULESET.CODERABBIT.GUARD.GRAPHQL=reviewThreads(first:100)\{nodes\{id isResolved comments\{nodes\{author body path line originalLine url}}}}; use unresolved threads as authoritative, not badge text alone</code>
`RULESET.CODERABBIT.GUARD.RERUN=after every push wait for CodeRabbit completion, then re-query unresolved threads; CodeRabbit can add new findings after earlier threads were resolved`
`RULESET.CODERABBIT.GUARD.RESOLVE=fix validated finding -> focused tests -> commit/push -> resolveReviewThread(threadId) -> wait CI/CodeRabbit -> final unresolved_count query`
`RULESET.CODERABBIT.GUARD.SCOPE=if a new @me open PR appears during final list, include it in the same guard pass before declaring all-open-PRs complete`
`RULESET.TESTS.CODERABBIT_FIX=prefer exported-function behavioral tests over source-grep; lint-no-source-grep rejects readFileSync source assertions without allow-test-rule`
`RULESET.WORKFLOW_MARKDOWN.FENCES=when editing shell snippets inside workflow markdown, preserve the opening language fence; malformed fence can create fresh CodeRabbit threads`
`RULESET.WORKFLOW_SIZE_BUDGET=workflow-size-budget can fail otherwise-valid review fixes; keep XL workflows <=1800 lines or trim prose in same PR before final checks`
`RULESET.GEMINI.TOOLS.ask_user=Gemini CLI has no ask_user tool; filter both AskUserQuestion and lowercase ask_user from tools frontmatter and neutralize both names in Gemini body text`
`RULESET.GEMINI.TEST_SENTINEL=convertClaudeToGeminiAgent regression should assert tools excludes ask_user, body excludes AskUserQuestion/ask_user, and Read still maps to read_file`

`CI.GATE.issue-link-required=hard-fail if PR body lacks closes/fixes/resolves #<issue>`
`CI.GATE.changeset-lint=hard-fail for user-facing code diffs unless .changeset/* or PR has no-changelog label`
`CI.GATE.repair-sequence(PR)=create issue -> apply approval label -> edit PR body w/ closing keyword -> apply no-changelog if appropriate -> re-run checks`

`PR.3267.POSTMORTEM.root-cause=[missing issue link, missing changeset/no-changelog]`
`PR.3267.POSTMORTEM.recovery=[issue#3270 created, label approved-enhancement applied, PR reopened, body includes "Closes #3270", label no-changelog applied]`

`WORKTREE.SEAM.current=Worktree Safety Policy Module`
`WORKTREE.SEAM.files=[get-shit-done/bin/lib/worktree-safety.cjs, get-shit-done/bin/lib/core.cjs]`
`WORKTREE.SEAM.interface=[resolveWorktreeContext, parseWorktreePorcelain, planWorktreePrune, executeWorktreePrunePlan]`
`WORKTREE.SEAM.default-prune-policy=metadata_prune_only (non-destructive)`
`WORKTREE.SEAM.decision-1=retain non-destructive default; destructive path only as explicit future opt-in scaffold`

`WORKSTREAM.INVARIANT.migrate-name=must normalize through canonical slug policy`
`WORKSTREAM.INVARIANT.slug-contract=all .planning/workstreams/<name> must be addressable by set/get/status/complete`
`WORKSTREAM.REGRESSION.test-anchor=tests/workstream.test.cjs::normalizes --migrate-name to a valid workstream slug`

`ARCH.SKILL.improve-codebase.next-candidates=[Workstream Name Policy Module, Workstream Progress Projection Module, Active Workstream Pointer Store Module]`

`WORKTREE.SEAM.test-policy=cover all decision branches in policy module before changing prune behavior`
`WORKTREE.SEAM.test-anchors=[resolveWorktreeContext:has_local_planning|linked_worktree|not_git_repo|main_worktree, planWorktreePrune:git_list_failed|worktrees_present|no_worktrees|parser_throw_fallback, executeWorktreePrunePlan:missing_plan|skip_passthrough|unsupported_action|metadata_prune_only]`
`WORKTREE.SEAM.invariant=parser failure must degrade to metadata_prune_only and never escalate to destructive removal`
`WORKTREE.SEAM.execution-rule=prefer node --test tests/worktree-safety-policy.test.cjs for fast seam validation; avoid full npm test loop for seam-only changes`
`WORKTREE.SEAM.inventory-interface=[listLinkedWorktreePaths, inspectWorktreeHealth]`
`WORKTREE.SEAM.caller-rule=verify.cjs must consume inspectWorktreeHealth for W017 classification; no ad-hoc porcelain parsing in callers`
`WORKTREE.SEAM.test-anchor-w017=tests/orphan-worktree-detection.test.cjs + tests/worktree-safety-policy.test.cjs`
`WORKTREE.SEAM.inventory-snapshot=snapshotWorktreeInventory(repoRoot,\{staleAfterMs,nowMs\}) is canonical linked-worktree health snapshot for callers`
`PLANNING.PATH.PARITY.sdk-project-scope=.planning/<project> (never .planning/projects/<project>); mirror planning-workspace.cjs planningDir()`
`PLANNING.PATH.SEAM.sdk=helpers.planningPaths delegates to workspacePlanningPaths + resolveWorkspaceContext; precedence explicit-ws > env-ws > env-project > root`
`PLANNING.PATH.SEAM.init-handlers=[initExecutePhase, initPlanPhase, initPhaseOp, initMilestoneOp] consume helpers.planningPaths().planning (no direct relPlanningPath join)`
`WORKSTREAM.NAME.POLICY.cjs-module=get-shit-done/bin/lib/workstream-name-policy.cjs owns toWorkstreamSlug + active-name/path-segment validation`
`WORKSTREAM.POINTER.SEAM.sdk-module=sdk/src/query/active-workstream-store.ts owns read/write self-heal for .planning/active-workstream`
`CONFIG.SEAM.loadConfig-context=loadConfig(cwd,\{workstream\}) replaces env-mutation fallback; no temporary process.env GSD_WORKSTREAM rewrites`
