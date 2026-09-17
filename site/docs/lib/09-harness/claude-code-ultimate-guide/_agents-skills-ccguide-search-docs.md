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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/search-docs.md"
sourceRel: ".agents/skills/ccguide/search-docs.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/search-docs.md"
sourceSha256: "1618ccb8de79d277e9c3b6369669a11cd426b293189b41dd4facab5b29842111"
pageSha256: "1618ccb8de79d277e9c3b6369669a11cd426b293189b41dd4facab5b29842111"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `search_official_docs` MCP tool with query: $ARGUMENTS

If no query is given, ask the user what they want to search for.

Default limit: 5 results.

Present each result with:
- Section title
- Source URL (reproduce verbatim)
- Excerpt showing the relevant content

If no snapshot exists, tell the user to run /ccguide:init-docs first.
