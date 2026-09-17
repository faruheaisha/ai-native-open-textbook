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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/release.md"
sourceRel: ".agents/skills/ccguide/release.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/release.md"
sourceSha256: "677dfae2d09159866d178c5a62c2dfba77076b1cd2deacfbd775072cbb3cda97"
pageSha256: "677dfae2d09159866d178c5a62c2dfba77076b1cd2deacfbd775072cbb3cda97"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `get_release` MCP tool.

<% if (typeof $ARGUMENTS !== 'undefined' && $ARGUMENTS.trim()) \{ %>
Version: $ARGUMENTS
<% \} else \{ %>
Show the latest release and last 5.
<% \} %>
