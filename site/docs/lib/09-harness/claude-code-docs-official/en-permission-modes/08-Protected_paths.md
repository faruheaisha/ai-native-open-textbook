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
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "0d165de05cb3fdadd1935529c71420191e504eba3772536c90e4eff4457fe2eb"
contentMode: "local-full"
zh: ""
---

## Protected paths

Writes to a small set of paths are never auto-approved, except in `bypassPermissions` mode and in planning sessions with [bypass permissions](#skip-all-checks-with-bypasspermissions-mode) available. This prevents accidental corruption of repository state and Claude's own configuration.

| Mode                     | Protected-path writes                                                                                                                                                                                                                                   |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `default`, `acceptEdits` | Prompted                                                                                                                                                                                                                                                |
| `plan`                   | Allowed in sessions with [bypass permissions](#skip-all-checks-with-bypasspermissions-mode) available. Otherwise, routed to the classifier when [auto mode](#eliminate-prompts-with-auto-mode) is available during planning, and prompted when it isn't |
| `auto`                   | Routed to the classifier                                                                                                                                                                                                                                |
| `dontAsk`                | Denied                                                                                                                                                                                                                                                  |
| `bypassPermissions`      | Allowed                                                                                                                                                                                                                                                 |

In a session started with [`--restricted`](https://code.claude.com/docs/en/cli-reference#cli-flags), which requires Claude Code v2.1.248 or later, the classifier can't approve protected-path writes.

[`permissions.allow`](https://code.claude.com/docs/en/permissions#manage-permissions) rules in settings files do not pre-approve protected-path writes. The safety check runs before Claude Code evaluates allow rules from settings, so an entry such as `Edit(.claude/**)` in `~/.claude/settings.json` or `.claude/settings.json` does not change the per-mode outcome in the table above. In modes that prompt, the prompt for a `.claude/` write offers **Yes, and allow Claude to edit its own settings for this session**, which approves later `.claude/` writes in that session without prompting again.

Protected directories:

* `.git`
* `.config/git`
* `.vscode`
* `.idea`
* `.husky`
* `.cargo`
* `.devcontainer`
* `.yarn`
* `.mvn`
* `.claude`, except for `.claude/worktrees` where Claude stores its own git worktrees

Protected files:

* `.gitconfig`, `.gitmodules`
* `.bashrc`, `.bash_profile`, `.bash_login`, `.bash_aliases`, `.bash_logout`, `.zshrc`, `.zprofile`, `.zshenv`, `.zlogin`, `.zlogout`, `.profile`, `.envrc`
* `.npmrc`, `.yarnrc`, `.yarnrc.yml`, `.pnp.cjs`, `.pnp.loader.mjs`, `.pnpmfile.cjs`, `bunfig.toml`, `.bunfig.toml`
* `.bazelrc`, `.bazelversion`, `.bazeliskrc`
* `.pre-commit-config.yaml`, `lefthook.yml`, `lefthook.yaml`, `.lefthook.yml`, `.lefthook.yaml`
* `gradle-wrapper.properties`, `maven-wrapper.properties`
* `.devcontainer.json`
* `.ripgreprc`, `pyrightconfig.json`
* `.mcp.json`, `.claude.json`
