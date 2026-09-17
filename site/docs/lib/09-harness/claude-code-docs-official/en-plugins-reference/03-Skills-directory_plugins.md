---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "557b87693b318cc3d65a1a6324f28c6d005d365cc8616ff696e3c47bbe3bf198"
contentMode: "local-full"
zh: ""
---

## Skills-directory plugins

Any folder under a skills directory that contains a `.claude-plugin/plugin.json` manifest is loaded as a plugin named `<name>@skills-dir` on the next session, with no marketplace and no install step. Scaffold one with [`plugin init`](#plugin-init). Unlike a copied marketplace install, the plugin is discovered in place rather than copied into the plugin cache.

A skills directory tree supports three distinct things:

| What you have                                 | What it is                                                                          |
| :-------------------------------------------- | :---------------------------------------------------------------------------------- |
