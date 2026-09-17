---
title: "source-command-ccguide-refresh-docs"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/source-command-ccguide-refresh-docs/SKILL.md"
sourceRel: ".agents/skills/source-command-ccguide-refresh-docs/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/source-command-ccguide-refresh-docs/SKILL.md"
sourceSha256: "4547bde335f710cc0774fad2f698c0693ad354d216c11d1038de8b6eb8888eb2"
pageSha256: "4547bde335f710cc0774fad2f698c0693ad354d216c11d1038de8b6eb8888eb2"
contentMode: "local-full"
zh: ""
---

# source-command-ccguide-refresh-docs

Use this skill when the user asks to run the migrated source command `ccguide-refresh-docs`.

## Command Template

Use the `refresh_official_docs` MCP tool.

This fetches ~1.2MB from Anthropic (takes ~5s) and updates only the "current" snapshot.
The baseline (set by init_official_docs) is never touched.

After success, show the quick diff preview against the baseline that the tool returns.
Remind the user to run /ccguide:diff-docs for the full detailed diff.
