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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/profile-user.md"
sourceRel: "commands/gsd/profile-user.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/profile-user.md"
sourceSha256: "dd0a27a046ea6413748d6c26ae2f758383534979e797054250bacc36bd7c47be"
pageSha256: "dd0a27a046ea6413748d6c26ae2f758383534979e797054250bacc36bd7c47be"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Generate a developer behavioral profile from session analysis (or questionnaire) and produce artifacts (USER-PROFILE.md, `gsd-dev-preferences` skill config, CLAUDE.md section) that personalize Claude's responses.

Routes to the profile-user workflow which orchestrates the full flow: consent gate, session analysis or questionnaire fallback, profile generation, result display, and artifact selection.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/profile-user.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
Flags from $ARGUMENTS:
- `--questionnaire` -- Skip session analysis entirely, use questionnaire-only path
- `--refresh` -- Rebuild profile even when one exists, backup old profile, show dimension diff
&lt;/context>

&lt;process>
Execute the profile-user workflow end-to-end.

The workflow handles all logic including:
1. Initialization and existing profile detection
2. Consent gate before session analysis
3. Session scanning and data sufficiency checks
4. Session analysis (profiler agent) or questionnaire fallback
5. Cross-project split resolution
6. Profile writing to USER-PROFILE.md
7. Result display with report card and highlights
8. Artifact selection (dev-preferences, CLAUDE.md sections)
9. Sequential artifact generation
10. Summary with refresh diff (if applicable)
&lt;/process>
