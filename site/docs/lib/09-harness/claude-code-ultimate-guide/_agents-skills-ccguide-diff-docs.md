---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/diff-docs.md"
sourceRel: ".agents/skills/ccguide/diff-docs.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/diff-docs.md"
sourceSha256: "51c18db2abfeca46a4d2f2901b83311bf17d4362c6b9a48e3dee8d22bf388269"
pageSha256: "51c18db2abfeca46a4d2f2901b83311bf17d4362c6b9a48e3dee8d22bf388269"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `diff_official_docs` MCP tool.

No network call — reads local index files only (~50KB each). Instant.

Present the results clearly:
- Added sections (new pages in the official docs)
- Removed sections
- Modified sections with line delta and first changed line
- Unchanged count

If no baseline exists, tell the user to run /ccguide:init-docs first.
If no current snapshot exists, tell the user to run /ccguide:refresh-docs first.
If no changes, confirm everything is in sync and suggest running /ccguide:refresh-docs to update.
