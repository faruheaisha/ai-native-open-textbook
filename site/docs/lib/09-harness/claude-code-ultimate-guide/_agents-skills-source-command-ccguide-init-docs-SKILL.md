---
title: "source-command-ccguide-init-docs"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/source-command-ccguide-init-docs/SKILL.md"
sourceRel: ".agents/skills/source-command-ccguide-init-docs/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/source-command-ccguide-init-docs/SKILL.md"
sourceSha256: "fb5f5c16a4dca34d7af412c8a29db6aa929db0e03a340e6886b29edca3ba2db3"
pageSha256: "fb5f5c16a4dca34d7af412c8a29db6aa929db0e03a340e6886b29edca3ba2db3"
contentMode: "local-full"
zh: ""
---

# source-command-ccguide-init-docs

Use this skill when the user asks to run the migrated source command `ccguide-init-docs`.

## Command Template

Use the `init_official_docs` MCP tool.

This fetches ~1.2MB from Anthropic (takes ~5s) and stores 4 local cache files in ~/.cache/Codex-guide/.
Both the baseline and current snapshots are set to this version.

After success, tell the user:
- How many sections were found
- The snapshot path
- That they can now run /ccguide:diff-docs after /ccguide:refresh-docs to see what changed
