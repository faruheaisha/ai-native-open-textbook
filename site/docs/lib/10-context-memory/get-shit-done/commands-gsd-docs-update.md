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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/docs-update.md"
sourceRel: "commands/gsd/docs-update.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/docs-update.md"
sourceSha256: "a8bfb73a0ca719e838212a918d88533744b47ddc2bd7705fea4e26cbec0f46cd"
pageSha256: "a8bfb73a0ca719e838212a918d88533744b47ddc2bd7705fea4e26cbec0f46cd"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Generate and update up to 9 documentation files for the current project. Each doc type is written by a gsd-doc-writer subagent that explores the codebase directly — no hallucinated paths, phantom endpoints, or stale signatures.

Flag handling rule:
- The optional flags documented below are available behaviors, not implied active behaviors
- A flag is active only when its literal token appears in `$ARGUMENTS`
- If a documented flag is absent from `$ARGUMENTS`, treat it as inactive
- `--force`: skip preservation prompts, regenerate all docs regardless of existing content or GSD markers
- `--verify-only`: check existing docs for accuracy against codebase, no generation (full verification requires Phase 4 verifier)
- If `--force` and `--verify-only` both appear in `$ARGUMENTS`, `--force` takes precedence
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/docs-update.md
&lt;/execution_context>

&lt;context>
Arguments: $ARGUMENTS

**Available optional flags (documentation only — not automatically active):**
- `--force` — Regenerate all docs. Overwrites hand-written and GSD docs alike. No preservation prompts.
- `--verify-only` — Check existing docs for accuracy against the codebase. No files are written. Reports VERIFY marker count. Full codebase fact-checking requires the gsd-doc-verifier agent (Phase 4).

**Active flags must be derived from `$ARGUMENTS`:**
- `--force` is active only if the literal `--force` token is present in `$ARGUMENTS`
- `--verify-only` is active only if the literal `--verify-only` token is present in `$ARGUMENTS`
- If neither token appears, run the standard full-phase generation flow
- Do not infer that a flag is active just because it is documented in this prompt
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (preservation_check, flag handling, wave execution, monorepo dispatch, commit, reporting).
&lt;/process>
