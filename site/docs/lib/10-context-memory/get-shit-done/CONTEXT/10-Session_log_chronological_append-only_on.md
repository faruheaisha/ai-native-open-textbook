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
pageSha256: "2b9e69e59c94ffb407632e2cc35f53a1d8830c75ad235beeef6d3cf7464dc8c5"
contentMode: "local-full"
zh: ""
---

## Session log (chronological, append-only, one line per session)

> **Discipline**: new operational lessons go into a predicate above. Each
> dated entry below is a one-line pointer at the predicates derived from
> that session — NOT a prose narrative. If you can't compress a session's
> lesson into a predicate, the lesson isn't sharp enough yet — keep
> grinding.

`SESSION.2026-05-05=[PRED.k320..k331 introduced; DEFECT.SOURCE-GREP-IN-NEW-TESTS, DEFECT.CHANGESET-PR-FIELD-DRIFT, DEFECT.PHASE-DIR-PREFIX-DRIFT, DEFECT.PROMPT-INJECTION-SCAN-COLLISION; ADR-0002 thin-wrapper pattern findings folded into RULESET.WORKFLOW_*]`
`SESSION.2026-05-05.sdk-bridge=PR #3158 SDK Runtime Bridge — observability isolation rule; strict-mode dispatchMode reporting invariant; transport decision ordering (guard before event emission); folded into Dispatch Policy Module glossary`
`SESSION.2026-05-09=[8-PR triage wave, 7 merged + 1 subsumed; META.RULE.* introduced; WAVE.LESSON.* captured; k320/k322/k323/k326/k331 evidence; AI Ops Memory predicate format established]`
`SESSION.2026-05-10=[ai-ops memory consolidation; release-notes standard taxonomy + templates; RELEASE-NOTES.* predicates introduced]`
`SESSION.2026-05-13=[Shell Command Projection Module expansion (#3465-#3468); ADR-0009 superseded; new exports for subprocess dispatch and platform file I/O; phase-gated migration plan; PR #3464 three-gate invariant CI+CR+unresolved=0; PR #3470 stash-include-untracked rebase pattern]`
`SESSION.2026-05-14=[#3095/PR #3490 EXEC.CLASSIFY.* introduced (Anthropic/Copilot/Codex/Gemini cross-runtime rate-limit sentinel coverage); #3489/PR #3499 DEFECT.STATE-TRAMPLE.idempotency-oracle (STATE.md current_phase field is oracle for state.complete-phase); #3488/PR #3501 DAG resolver same-phase short-form depends_on (shortFormToId index added to sdk/src/query/phase.ts); #3491/PR #3502 DEFECT.NESTED-GIT-INIT (gitWorktreeInfoInternal helper); #3493/PR #3500 extractCurrentMilestone generic Phase Details continuation past planned-milestone siblings; #3503/PR #3504 DEFECT.PATH-SUBSTRING-CHECK (trailing-slash anchor for homedir checks); #3346/PR #3505 codex AoT TOML leaf-key via extractFlatHookEventName; #3506/PR #3507 label-scoped stale-bot sub-job pattern; multi-PR triage operational lessons folded into PROC.TRIAGE.*; #3508 DEFECT.AGENT-ISOLATION-SILENT-FAIL; gsd-test image-missing auto-build (locally-built image via embedded heredoc Dockerfile); refined PRED.k322 threshold to 3 PRs/<10min]`
`SESSION.2026-05-15=[#3537/PR #3538 DEFECT.PHASE-REGEX-FANOUT — phaseMarkdownRegexSource promoted to core.cjs and wired to 7 sites; parity-style regression test established as DEFECT.GENERATIVE-FIX exemplar; trek-e/gsd-test-runner#1 filed for DEFECT.GSD-TEST-MIRROR-POISONED — chown-back-before-exec legacy gap (poisoned holodeck mirror unstuck via authorized docker chown to remote 1000:1000); RULESET.PR-FLOW.* codified from project CLAUDE.md load-bearing rule; first dispatch under run-tests-before-create held cleanly (PR #3520 worker stopped on Docker exit 12 infra failure, orchestrator opened PR after unblock); CONTEXT.md refactored from 882 lines of mixed prose+predicates into ~500 lines of pure-predicate format with chronological session log]`
`SESSION.2026-05-15.parallel-fix-dispatch=[#3542/PR #3546 prohibit git stash family in executor agents (shared refs/stash across worktrees); #3541/PR #3547 non-TTY resolution for installer prompt-user actions (default remove for SDK build artifacts, keep for skills/gsd-*/SKILL.md); #3545 filed for gsd-test-summary concurrent /tmp output collision; new predicates DEFECT.HOOK-OVER-ENFORCEMENT.read-tool-tracking, DEFECT.GSD-TEST-CONCURRENT-OUTPUT-COLLISION, DEFECT.SUBAGENT-LONG-RUNNING-BG-STALL, DEFECT.AGENT-RETIRED-SLASH-SYNTAX-DRIFT, PROC.PARALLEL-FIX-DISPATCH; agent-trust-but-verify caught /gsd-update retired-syntax comment slip in #3541 implementation before PR open]`
`SESSION.2026-05-16=[multi-PR triage wave (#3577/3581/3640/3641/3642/3648/3649/3637/3639). Established global PreToolUse hook ~/.claude/hooks/test-memory-guard.sh denying new node/test spawns when sum(RSS of node|vitest|jest|...) >= 4 GiB on the 24 GB Mac OR when a same-runner process is already in argv[0] — hard deny via hookSpecificOutput.permissionDecision=deny. PR #3577 fix: revert config-ensure-section dispatch to CJS cmdConfigEnsureSection (SDK author wrote single-section semantics under a name whose legacy callers expect full-default config init); plus 3 SDK parity carve-outs (configNewProject defaults align with sdk/shared/config-defaults.manifest.json, return relative .planning/config.json path, drop quotes from Unknown config key, lead malformed-JSON error with "Failed to read config.json:"). PR #3649 fix: chunk node --test spawn at 28K argv ceiling (Windows CreateProcess lpCommandLine cap 32,767 was instantly aborting unchunked spawn of 546 paths). Chunking fix surfaced 14 pre-existing Windows-only test bugs (4010 pass / 14 fail; vs 0/0 before — entire suite was un-runnable on Windows). PRs #3639 + #3637 confirmed unable to stand alone (legitimately depend on Phase 6 scaffolding only present on feat/3575-enforcement-hardening) — user decision: cherry-pick into #3577 and close. Five other PRs each had ≤1 unresolved CR thread of the changeset-pr-number / null-vs-throw / implicit-Claude-runtime / docs-stale-guidance / hardcoded-tests-path family — all quick wins. New predicates: DEFECT.SDK-PORT-NAME-COLLISION, DEFECT.WINDOWS-ARGV-OVERFLOW, DEFECT.STACKED-PR-CANNOT-STAND-ALONE, DEFECT.CANARY-VERSION-LEAK, DEFECT.GSD-TEST-HOST-MID-RUN-DEATH, RULESET.HARNESS.test-memory-guard, RULESET.PR-FLOW.docker-before-push, RULESET.PR-FLOW.templates-mandatory]`

`DEFECT.SDK-PORT-NAME-COLLISION.symptom=SDK author writes new handler with same canonical name as legacy CJS command but different positional-arg shape; Phase-N router migration silently rebinds CLI dispatch to the new SDK function and every legacy no-arg / wrong-arg caller errors out at the handler's own validation throw`
`DEFECT.SDK-PORT-NAME-COLLISION.examples=#3577 config-ensure-section (legacy CJS = no-arg full-default init via ensureConfigFile→buildNewProjectConfig; new SDK configEnsureSection = single-section ensure requiring args[0]; all CLI callers pass no args; SDK throws "Usage: config-ensure-section ")`
`DEFECT.SDK-PORT-NAME-COLLISION.detect=grep new-handler name in sdk/src/query/command-static-catalog-foundation.ts catalog → trace every CLI/test caller of the canonical name → if any caller's argv shape differs from the new SDK handler's args[0] expectation, the migration broke the legacy contract`
`DEFECT.SDK-PORT-NAME-COLLISION.fix-forward=either (a) bind the catalog entry to a SDK handler whose body mirrors legacy semantics (e.g. configNewProject when no args), or (b) keep the dispatch case calling the CJS handler directly and remove the SDK-bridge attempt (precedent: 7d5dfa9d codex runtime carve-out). Whichever path, add a behavioral test that round-trips the legacy invocation shape to lock the contract`
`DEFECT.SDK-PORT-NAME-COLLISION.generative-tie=instance of DEFECT.GENERATIVE-PRIORITY — parity assertion at the test layer between CJS handler shape and SDK handler shape would have failed at PR open`

`DEFECT.WINDOWS-ARGV-OVERFLOW.symptom=execFileSync(node, ['--test', ...N paths]) succeeds on Linux/macOS, instantly exits with code 1 and no test output on Windows when N×avg(path_len) exceeds 32,767 chars (CreateProcess lpCommandLine cap)`
`DEFECT.WINDOWS-ARGV-OVERFLOW.examples=#3649 scripts/run-tests.cjs spawning 546 paths (~85 chars each ≈ 46 KB); Linux ARG_MAX 2 MB allows it, Windows aborts in ~70 ms with zero test output making the failure look like the runner itself crashed`
`DEFECT.WINDOWS-ARGV-OVERFLOW.detect=Windows CI job at "Run unit tests" exits with code 1 within seconds of starting, no node:test output between "run-tests: suite=… files=N: …" line and "Process completed with exit code 1"; same job on Linux/macOS runs full duration`
`DEFECT.WINDOWS-ARGV-OVERFLOW.fix-forward=chunk argv into batches whose total length stays under 28,000 chars (headroom under the 32,767 ceiling); run each chunk sequentially; aggregate exit codes (first non-zero wins). Expose RUN_TESTS_MAX_CMDLINE_CHARS env override so cross-platform regression tests can force chunking with short tmp paths`
`DEFECT.WINDOWS-ARGV-OVERFLOW.test-anchor=tests/run-tests-harness.test.cjs "Windows argv-overflow chunking (issue #3597)" — 30 long-named fixture files + RUN_TESTS_MAX_CMDLINE_CHARS=2000 → asserts run-tests: chunk N/M marker in stderr; pattern works on every platform`

`DEFECT.STACKED-PR-CANNOT-STAND-ALONE.symptom=patch PR was authored against scaffolding (handler files, lint scripts, generated modules) that exists only on an unmerged upstream feature branch; the PR's "base" on GitHub is the feature branch, not main; merging requires the upstream PR to land first`
`DEFECT.STACKED-PR-CANNOT-STAND-ALONE.examples=#3639 + #3637 both targeted base=feat/3575-enforcement-hardening (the Phase 6 PR #3577); #3639 modifies SDK-bridge calls in 6 family-router files that on main do NOT have any SDK-bridge call yet; #3637 patches scripts/lint-shared-module-handsync.cjs which does not exist on main at all`
