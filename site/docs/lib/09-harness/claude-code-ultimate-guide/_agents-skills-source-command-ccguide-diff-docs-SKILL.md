---
title: "source-command-ccguide-diff-docs"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/source-command-ccguide-diff-docs/SKILL.md"
sourceRel: ".agents/skills/source-command-ccguide-diff-docs/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/source-command-ccguide-diff-docs/SKILL.md"
sourceSha256: "01b9eb375edde19e6c8f000b216afa6c394d976a092dafdf8e2d25c2699258fa"
pageSha256: "01b9eb375edde19e6c8f000b216afa6c394d976a092dafdf8e2d25c2699258fa"
contentMode: "local-full"
zh: ""
---

# source-command-ccguide-diff-docs

Use this skill when the user asks to run the migrated source command `ccguide-diff-docs`.

## Command Template

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
