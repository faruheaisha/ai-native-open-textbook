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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "ebe911779e7c2d922613eccecc7b28ffdd5bdc3d4a53ebc47c02cef12a797d6d"
contentMode: "local-full"
zh: ""
---

## Project allow rules and workspace trust

`permissions.allow` rules and `permissions.additionalDirectories` entries in a project's `.claude/settings.json` grant capability, so Claude Code applies them only after you accept the [workspace trust dialog](https://code.claude.com/docs/en/security#additional-safeguards) for that folder. The dialog lists the rules and directories the folder would grant so you can review them first. `deny` and `ask` rules aren't affected, since they only restrict.

Claude Code keys and stores the trust you accept according to where you start it:

* In a repository, Claude Code keys the trust on the git repository root, so the trust covers the whole repository apart from any git repository nested inside it, such as a submodule. In a [worktree](https://code.claude.com/docs/en/worktrees), it uses the main checkout's root, as it does for [saved rules](#permission-system).
* Outside a repository, Claude Code keys the trust on the directory you started it from, and the trust covers any subdirectory of that directory apart from a git repository nested inside it, such as a clone. Each covered subdirectory then counts as a folder whose parent you trusted.
* When you start in your home directory, Claude Code holds the trust for the current session only and doesn't write it to disk; see the [additional safeguards](https://code.claude.com/docs/en/security#additional-safeguards) note.

Claude Code shows the trust dialog in interactive sessions only. A `claude -p` run or an SDK session never shows it, and trusting a parent folder doesn't count for these rules, so [What runs before you trust a folder](#what-runs-before-you-trust-a-folder) says which repository content Claude Code still uses in each of those two situations.

### When your local settings file needs trust

`.claude/settings.local.json` is normally your own file, so Claude Code applies its allow rules and additional directories without the trust step. When the file is tracked in git, or `.claude` is a symlink, Claude Code treats it as repository-supplied instead and holds its rules until you trust the folder.

Claude Code runs git to tell the two apart, and it runs git only once you've trusted the folder: you accepted the trust dialog for it or for a parent directory whose trust extends to it, or you're in a `-p` or SDK session, which counts as accepted. Until then, where you started Claude Code decides what happens to the file's rules:

* **In your configuration home:** Claude Code applies that folder's `.claude/settings.local.json` right away without running git. Your configuration home is your home directory, or a directory whose `.claude` subdirectory you've set as [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/env-vars#variables). If that `CLAUDE_CONFIG_DIR` directory sits inside a git repository and Claude Code [keeps your local settings at the repository root](https://code.claude.com/docs/en/settings#where-claude-code-looks-for-each-file) instead, it holds the rules like anywhere else.
* **Anywhere else:** Claude Code holds the file's rules like project settings. Once the check has run, Claude Code applies the rules of an untracked file, or of a file in a directory outside any git repository, even though you haven't trusted that exact folder.

  The configuration-home exception skips only the trust step. `~/.claude/settings.local.json` is still [local scope](https://code.claude.com/docs/en/settings#compare-the-scope-of-each-settings-file), so Claude Code reads it only in sessions you start in your home directory itself, not in every project. To apply permission rules across all your projects, add them to your user settings instead: `~/.claude/settings.json`, or `$CLAUDE_CONFIG_DIR/settings.json` when `CLAUDE_CONFIG_DIR` is set.

On versions 2.1.196 through 2.1.199, Claude Code held the file's rules in your configuration home and outside git repositories too, and printed the [`this workspace has not been trusted`](https://code.claude.com/docs/en/errors#workspace-has-not-been-trusted) warning there. Before v2.1.207, Claude Code applied an untracked file's rules before you accepted the dialog.

### What runs before you trust a folder

Each row is one kind of content a repository can supply. The columns are the two situations in which you haven't trusted the folder itself: you trusted only a parent folder, or you ran `claude -p` or the SDK there, which never shows the trust dialog. The parent-folder column doesn't apply inside a [nested repository](#project-allow-rules-and-workspace-trust): in an interactive session Claude Code shows the trust dialog for it, and a `claude -p` or SDK run there follows the `claude -p` column.

| What the repository supplies                                                                                                                                                                                                                                                                                     | You trusted only a parent folder                                                                                                                                               | `claude -p` or the SDK, folder never trusted                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Hooks](https://code.claude.com/docs/en/hooks) in settings files, the [`env`](https://code.claude.com/docs/en/settings-reference#env) block and helper commands such as [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper), and a project skill's [hooks](https://code.claude.com/docs/en/hooks#hooks-in-skills-and-agents) and [`allowed-tools`](https://code.claude.com/docs/en/skills#pre-approve-tools-for-a-skill)       | Used                                                                                                                                                                           | Used. Workspace trust never gates a skill's `allowed-tools` in any session                                                                                                                      |
| `permissions.allow` rules and `additionalDirectories` in `.claude/settings.json`                                                                                                                                                                                                                                 | Not used until you accept the trust dialog, which appears again listing them                                                                                                   | Not used. Claude Code prints a [`this workspace has not been trusted`](https://code.claude.com/docs/en/errors#workspace-has-not-been-trusted) warning to stderr                                                             |
| Frontmatter hooks in a project [subagent](https://code.claude.com/docs/en/sub-agents#hooks-in-subagent-frontmatter), a project [`@skills-dir` plugin](https://code.claude.com/docs/en/plugins-reference#skills-directory-plugins), and [`extraKnownMarketplaces`](https://code.claude.com/docs/en/settings-reference#extraknownmarketplaces) entries from the repository or an `--add-dir` directory | Not used, and no dialog is offered                                                                                                                                             | Not used                                                                                                                                                                                        |
| Inline [`mcpServers`](https://code.claude.com/docs/en/sub-agents#scope-mcp-servers-to-a-subagent) in the frontmatter of a subagent from the repository or an `--add-dir` directory. Before v2.1.238, Claude Code loaded these servers in both situations                                                                                     | Not used, and no dialog is offered                                                                                                                                             | Not used                                                                                                                                                                                        |
| Servers in `.mcp.json`, including ones the repository [approves in its own settings](https://code.claude.com/docs/en/mcp#project-server-approvals-and-workspace-trust)                                                                                                                                                                       | Claude Code asks you before connecting them. The repository's own approvals don't count                                                                                        | Connected without asking, approved or not. The SDK loads them only when `settingSources` includes project settings. `claude mcp list` in the same folder still reports such a server as pending |
| A [`headersHelper`](https://code.claude.com/docs/en/mcp#trust-a-folder-before-its-headershelper-runs) on a server in `.mcp.json`. Before v2.1.238, Claude Code ran the helper in both situations                                                                                                                                             | Not run until you accept the trust dialog, which appears again naming where the helper is declared. Claude Code connects the server with its static `headers` alone until then | Not run. Claude Code connects the server with its static `headers` alone and prints a [`headersHelper not run`](https://code.claude.com/docs/en/errors#headershelper-not-run) line per server to stderr                     |

For the rows that need this exact folder trusted, trust it by hand: set `projects["<path>"].hasTrustDialogAccepted` to `true` in `~/.claude.json`, where `<path>` is the repository root, or the folder itself outside a repository. Claude Code prints the exact key in the debug log line for a skipped subagent hook or inline MCP server, in the stderr warning for skipped allow rules, and in the `headersHelper not run` line for a skipped helper.

Before you run `claude -p` in a repository you didn't write, decide what it may run on your machine:

* Pass `--setting-sources user`, or set the SDK's `settingSources` without project settings, so Claude Code reads neither the project's settings files nor its `.mcp.json`
* Start with [`--bare`](https://code.claude.com/docs/en/headless#start-faster-with-bare-mode) so Claude Code reads no hooks, skills, custom commands, subagents, plugins, or `.mcp.json` servers from the project. The project's `env` block and helpers such as `awsAuthRefresh` in its settings files still apply, and Claude Code reads `apiKeyHelper` only from `--settings`
* Pass `--settings '\{"disableAllHooks": true\}'` to [turn hooks off](https://code.claude.com/docs/en/hooks#disable-or-remove-hooks) for that run. Setting it in your user settings alone isn't enough, because the repository's project settings take precedence over yours and can set it back to `false`
* Add a [`disabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#disabledmcpjsonservers) entry to reject a `.mcp.json` server by name in every session type
