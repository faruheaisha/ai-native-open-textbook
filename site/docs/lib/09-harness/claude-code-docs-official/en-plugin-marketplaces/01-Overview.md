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
sourceRel: "en/plugin-marketplaces.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugin-marketplaces.md"
sourceSha256: "7912af9270337aa00dd39e74120a5aad65065f90b4a15c54eed99cec6ff6d960"
pageSha256: "8d35093461ddaee8abf6707825683511c1bd63993c28ab0d16cfa94500990d11"
contentMode: "local-full"
zh: ""
---

## Overview

Creating and distributing a marketplace involves:

1. **Create plugins**: build one or more plugins with skills, agents, hooks, MCP servers, or LSP servers. This guide assumes you already have plugins to distribute; see [Create plugins](https://code.claude.com/docs/en/plugins) for details on how to create them.
2. **Create the marketplace file**: define a `marketplace.json` that lists your plugins and where to find them. See [Create the marketplace file](#create-the-marketplace-file).
3. **Host the marketplace**: push to GitHub, GitLab, or another git host. See [Host and distribute marketplaces](#host-and-distribute-marketplaces).
4. **Share with users**: users add your marketplace with `/plugin marketplace add` and install individual plugins. See [Discover and install plugins](https://code.claude.com/docs/en/discover-plugins).

Once your marketplace is live, you can update it by pushing changes to your repository. Users refresh their local copy with `/plugin marketplace update`.
