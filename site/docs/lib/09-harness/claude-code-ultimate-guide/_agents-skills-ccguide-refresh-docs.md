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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/refresh-docs.md"
sourceRel: ".agents/skills/ccguide/refresh-docs.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/refresh-docs.md"
sourceSha256: "826597f28c709a46a0861c0cf22ab40e19eee0ee35f2916283d68954bb3bf93f"
pageSha256: "826597f28c709a46a0861c0cf22ab40e19eee0ee35f2916283d68954bb3bf93f"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

Use the `refresh_official_docs` MCP tool.

This fetches ~1.2MB from Anthropic (takes ~5s) and updates only the "current" snapshot.
The baseline (set by init_official_docs) is never touched.

After success, show the quick diff preview against the baseline that the tool returns.
Remind the user to run /ccguide:diff-docs for the full detailed diff.
