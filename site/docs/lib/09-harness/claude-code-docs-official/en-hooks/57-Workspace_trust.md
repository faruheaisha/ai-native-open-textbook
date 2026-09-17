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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "0c020c6a9188b86f027a94c136720af98d831a2a00eac35be07aa6c4ca3f4d6e"
contentMode: "local-full"
zh: ""
---

### Workspace trust

Claude Code checks workspace trust before it runs any hook from a settings file. What counts as trusted depends on the session type:

* **Interactive session**: Claude Code holds back hooks from every settings file, including your own `~/.claude/settings.json`, until you accept the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for the folder, or for a parent directory whose trust extends to it
* **`-p` or SDK session**: Claude Code never shows the dialog and treats the folder as trusted, so hooks committed in a repository's `.claude/settings.json` run in a folder you've never trusted

Before you script `claude -p` over a repository you didn't write, review its `.claude/` settings files, start with [`--bare`](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode), or [turn hooks off for that run](#disable-or-remove-hooks) with `--settings '\{"disableAllHooks": true\}'`. Frontmatter hooks in a project subagent follow a stricter rule than settings-file hooks. [What runs before you trust a folder](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder) lists each kind of repository content by session type.
