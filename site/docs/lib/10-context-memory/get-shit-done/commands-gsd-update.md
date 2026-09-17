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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/update.md"
sourceRel: "commands/gsd/update.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/update.md"
sourceSha256: "370083b914c0a90b4322a9096773035c8a7da108addb60f656ec3e175e746637"
pageSha256: "370083b914c0a90b4322a9096773035c8a7da108addb60f656ec3e175e746637"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Check for GSD updates, install if available, and display what changed.

Routes to the update workflow which handles:
- Version detection (local vs global installation)
- npm version checking
- Changelog fetching and display
- User confirmation with clean install warning
- Update execution and cache clearing
- Restart reminder
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/update.md
&lt;/execution_context>

&lt;flags>
- **--sync**: Sync managed GSD skills across runtime roots so multi-runtime users stay aligned after an update. Runs the sync-skills workflow (--from, --to, --dry-run, --apply flags supported).
- **--reapply**: Reapply local modifications after a GSD update. Uses three-way comparison (pristine baseline, user-modified backup, newly installed version) to merge user customizations back. Runs the reapply-patches workflow.
- **(no flag)**: Standard update — check for new version, show changelog, install.
&lt;/flags>

&lt;process>
Parse the first token of $ARGUMENTS:
- If it is `--sync`: strip the flag, execute the sync-skills workflow (passing remaining args for --from/--to/--dry-run/--apply).
- If it is `--reapply`: strip the flag, execute the reapply-patches workflow.
- Otherwise: execute the update workflow end-to-end.

&lt;/process>

&lt;execution_context_extended>
@~/.claude/get-shit-done/workflows/sync-skills.md
@~/.claude/get-shit-done/workflows/reapply-patches.md
&lt;/execution_context_extended>
