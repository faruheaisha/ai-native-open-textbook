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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/cheatsheet.md"
sourceRel: ".agents/skills/ccguide/cheatsheet.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/cheatsheet.md"
sourceSha256: "99f957d01e5a17db51502cccc246cbee075a9a4547709774ac1396507ebccc54"
pageSha256: "99f957d01e5a17db51502cccc246cbee075a9a4547709774ac1396507ebccc54"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `get_cheatsheet` MCP tool.

<% if (typeof $ARGUMENTS !== 'undefined' && $ARGUMENTS.trim()) \{ %>
Filter to section: $ARGUMENTS
<% \} else \{ %>
Return the full cheatsheet.
<% \} %>
