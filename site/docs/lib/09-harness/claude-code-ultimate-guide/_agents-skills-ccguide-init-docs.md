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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/init-docs.md"
sourceRel: ".agents/skills/ccguide/init-docs.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/init-docs.md"
sourceSha256: "c69239c4a43d0d1a45a29cf66d957ec6a199e353be087f8552d6aa69970df551"
pageSha256: "c69239c4a43d0d1a45a29cf66d957ec6a199e353be087f8552d6aa69970df551"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `init_official_docs` MCP tool.

This fetches ~1.2MB from Anthropic (takes ~5s) and stores 4 local cache files in ~/.cache/claude-code-guide/.
Both the baseline and current snapshots are set to this version.

After success, tell the user:
- How many sections were found
- The snapshot path
- That they can now run /ccguide:diff-docs after /ccguide:refresh-docs to see what changed
