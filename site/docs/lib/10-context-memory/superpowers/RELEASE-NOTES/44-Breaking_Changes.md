---
title: "Superpowers（Claude Code 技能库）"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/RELEASE-NOTES.md"
sourceRel: "RELEASE-NOTES.md"
rawUrl: "/raw/10-context-memory/superpowers/RELEASE-NOTES.md"
sourceSha256: "7c69947152d72dde3b24e2f251afdc82b1d5f8e3a4c9dde21f65e3229f281d11"
pageSha256: "92858135c20ed87985f0c83088cb498cb46d4084b4d8887129910bc4b7772a00"
contentMode: "local-full"
zh: ""
---

## Breaking Changes

### Skills Repository Separation

**The biggest change:** Skills no longer live in the plugin. They've been moved to a separate repository at [obra/superpowers-skills](https://github.com/obra/superpowers-skills).

**What this means for you:**

- **First install:** Plugin automatically clones skills to `~/.config/superpowers/skills/`
- **Forking:** During setup, you'll be offered the option to fork the skills repo (if `gh` is installed)
- **Updates:** Skills auto-update on session start (fast-forward when possible)
- **Contributing:** Work on branches, commit locally, submit PRs to upstream
- **No more shadowing:** Old two-tier system (personal/core) replaced with single-repo branch workflow

**Migration:**

If you have an existing installation:
1. Your old `~/.config/superpowers/.git` will be backed up to `~/.config/superpowers/.git.bak`
2. Old skills will be backed up to `~/.config/superpowers/skills.bak`
3. Fresh clone of obra/superpowers-skills will be created at `~/.config/superpowers/skills/`

### Removed Features

- **Personal superpowers overlay system** - Replaced with git branch workflow
- **setup-personal-superpowers hook** - Replaced by initialize-skills.sh
