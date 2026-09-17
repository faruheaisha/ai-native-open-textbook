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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "661b91eb99848fda6aa858ba17aec2dc5b4ccd52b1bc1d72a02b9d89fa4c3302"
contentMode: "local-full"
zh: ""
---

## Configuration warnings

Claude Code writes most of these messages to stderr, not into the conversation, and writes most of them at startup. An entry says so when its message appears somewhere else, such as in the debug log or as a startup notice in the conversation view, or at another time, such as the [unrecognized-model diagnostic line](#unrecognized-model-id-on-a-request) at request time.

<h3 id="fullscreen-failed-start-notice">
  Fullscreen renderer didn't finish starting
</h3>

A previous [fullscreen](https://code.claude.com/docs/en/fullscreen) session on this machine exited before it finished starting, so Claude Code starts this session on the classic renderer and prints one of these notices:

```text theme={null}
Claude Code's fullscreen renderer didn't finish starting last time on this machine, so this launch is using the classic renderer. It will try fullscreen again next launch; /tui default keeps the classic renderer.

Claude Code's fullscreen renderer has repeatedly failed to start on this machine, so it has been turned off here. Run /tui fullscreen to try it again (this also resets after an update).
```

**What to do:**

* Follow [Fullscreen rendering](https://code.claude.com/docs/en/fullscreen#fullscreen-renderer-didnt-finish-starting). It says which notice you get, what Claude Code does in later sessions, and how to try fullscreen again or keep the classic renderer.
* If the session that died printed an exit message, see [Claude Code exited after an unrecoverable interface error](#exited-after-an-unrecoverable-interface-error) for what it names.

Before v2.1.236, Claude Code printed no notice and kept starting sessions in fullscreen rendering after a failed start.

<h3 id="exited-after-an-unrecoverable-interface-error">
  Claude Code exited after an unrecoverable interface error
</h3>

Claude Code prints this message when it exits because its terminal interface hit an error it can't recover from, in either renderer. The second sentence appears only when the error happened while the [fullscreen](https://code.claude.com/docs/en/fullscreen) renderer was starting:

```text theme={null}
Claude Code exited after an unrecoverable interface error (<error>). It happened while the fullscreen renderer was starting, so the next launch will use the classic renderer (CLAUDE_CODE_DISABLE_ALTERNATE_SCREEN=1 forces that any time).
```

**What to do:**

* Start Claude Code again. To pick the conversation back up, run `claude --resume` in the same directory.
* If the message names the fullscreen renderer, [Fullscreen rendering](https://code.claude.com/docs/en/fullscreen#fullscreen-renderer-didnt-finish-starting) says what the next launch does, which depends on how you turned fullscreen on, and how to try fullscreen again or keep the classic renderer.

Before v2.1.236, Claude Code exited without printing a message after this kind of error.

<h3 id="agent-descriptions-are-over-the-15000-token-limit">
  Agent descriptions are over the 15.0k-token limit
</h3>

Claude Code shows this warning as a startup notice in the conversation view rather than on stderr. The combined descriptions of your [subagents](https://code.claude.com/docs/en/sub-agents), except the built-in ones, exceed 15,000 tokens as Claude Code estimates them. Each agent counts its name plus its `description` frontmatter. Claude Code loads every agent whether or not the total is over the limit, so the warning doesn't change what loads.

```text theme={null}
Agent descriptions are over the 15.0k-token limit (~16.2k tokens) · ask Claude to trim agent descriptions in .claude/agents/
```

**What to do:**

* Shorten the `description` frontmatter of your agent files, or ask Claude to trim them for you.
* Remove agent files you no longer use.

### Workspace has not been trusted

Claude Code found `permissions.allow` rules or `permissions.additionalDirectories` entries in the project's `.claude/settings.json` or `.claude/settings.local.json` and didn't apply them, because [allow rules from project settings require workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust). The count, the setting name, and the file named in the message vary with your configuration. `deny` and `ask` rules aren't affected.

```text theme={null}
Ignoring 2 permissions.allow entries from .claude/settings.local.json: this workspace has not been trusted. Run Claude Code interactively here once and accept the trust dialog, or set projects["/Users/you/project"].hasTrustDialogAccepted: true in /Users/you/.claude.json.
```

**What to do:**

* Run `claude` in the directory and accept the trust dialog. [Project allow rules and workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) says which folder that acceptance covers.
* In [non-interactive mode](https://code.claude.com/docs/en/headless) with `-p` no dialog is shown. Set the `hasTrustDialogAccepted` entry in `~/.claude.json` using the exact `projects` key the message prints.
* If the message names `.claude/settings.local.json` and you started Claude Code outside a git repository or in your home directory, update to v2.1.200 or later. Versions 2.1.196 through 2.1.199 treated your own `.claude/settings.local.json` as repository-supplied in those workspaces. On v2.1.207 and later, updating isn't enough outside a git repository if you haven't trusted the folder: determining that a folder isn't inside a repository runs git, and Claude Code runs that check only after you accept the trust dialog, so use the first step. Your home directory and any other [configuration home](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) are exempt and don't wait for the dialog. See [Project allow rules and workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust).

### Working directory is a network path

Claude Code doesn't add network paths as working directories. Looking up a network path can contact the host it names, and on Windows that contact can send the host your credentials, so Claude Code refuses the path without looking it up. You see this message when you run `/add-dir` with such a path, or as a warning at startup. When it appears at startup, Claude Code starts without that directory.

```text theme={null}
\\server\share is a network path, which cannot be added as a working directory. On Windows, map the share to a drive letter and pass it at launch with --add-dir (a drive letter added mid-session does not yet carry remote-read trust).
```

Paths that Claude Code refuses this way include:

* UNC shares such as `\\server\share`
* Automount paths such as `/net/<host>`, unless you launched Claude Code from a directory under that host's automount
* Local paths that reach a network location through a symbolic link or junction

Mapped drive letters and `\\wsl$` paths don't count as network paths.

**What to do:**

* On Windows, map the share to a drive letter, for example with `net use Z: \\server\share`, and pass the drive at launch with `claude --add-dir Z:\`.
* On macOS or Linux, mount the share at a local path and add that path instead.
* If the path is in `permissions.additionalDirectories`, remove it from the settings file that lists it.

Before v2.1.257, Claude Code accepted a reachable network path as a working directory.

<h3 id="remote-managed-settings-failed-to-load">
  Remote managed settings failed to load
</h3>

Your session is eligible for [server-managed settings](https://code.claude.com/docs/en/server-managed-settings), but Claude Code couldn't fetch them, so it shows this warning in interactive sessions. The parenthesized cause names what failed, such as `network error`, `request timed out`, or `authentication rejected (401)`, and the rest of the line says which policy the session runs on:

* **Settings cached from an earlier successful fetch**: Claude Code runs the session on that cached policy, except the [withheld environment variables](https://code.claude.com/docs/en/server-managed-settings#fetch-and-caching-behavior), and the line reads `using cached policy`.
* **No cache**: Claude Code runs the session without server-managed settings, and the line reads `no remote policy applied`.

**What to do:**

* Act on the cause the message names: for a network cause, check that this machine can reach `api.anthropic.com`; for an authentication cause, check your sign-in with `/status`
* Run `/status` or `claude doctor` for the full diagnostic

Before v2.1.248, Claude Code reported a failed settings fetch only in the debug log.

<h3 id="managed-settings-were-not-approved">
  Managed settings were not approved
</h3>

Your organization's [server-managed settings](https://code.claude.com/docs/en/server-managed-settings) include settings that need your approval, and you declined the [security approval dialog](https://code.claude.com/docs/en/server-managed-settings#security-approval-dialogs), so Claude Code exits without applying them:

```text theme={null}
Managed settings were not approved; exiting without applying them.
```

**What to do:**

* Start Claude Code again and approve the dialog to continue under your organization's settings. A declined dialog isn't remembered, so it appears again at the next start.
* If you're unsure about a setting the dialog lists, ask whoever maintains your organization's managed settings before approving

<h3 id="mcp-server-is-blocked-by-enterprise-managed-policy">
  MCP server is blocked by enterprise managed policy
</h3>

You selected **Reconnect** on a server in `/mcp`, or turned a disabled server back on there, and a setting that [restricts MCP servers](https://code.claude.com/docs/en/managed-mcp) blocks that server. Claude Code refuses to connect it and shows:

```text theme={null}
MCP server <name> is blocked by enterprise managed policy
```

Any of these settings can produce the message:

* A [`deniedMcpServers`](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists) entry that matches the server, including one in your own `~/.claude/settings.json` or the project's `.claude/settings.json`
* An [`allowedMcpServers`](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists) list that the server doesn't match
* [`strictPluginOnlyCustomization`](https://code.claude.com/docs/en/settings-reference#strictpluginonlycustomization) with `mcp` locked, which blocks servers configured in `~/.claude.json` and `.mcp.json`
* [`disableClaudeAiConnectors`](https://code.claude.com/docs/en/mcp#disable-claude-ai-connectors), when the server is a claude.ai connector

**What to do:**

* Check your own user and project settings files for one of these settings and change or remove it
* If none of your own settings explains the block, ask your administrator which managed setting blocks the server

Before v2.1.257, **Reconnect** and re-enable in `/mcp` could connect a server that a mid-session policy update blocked.

<h3 id="managed-settings-document-could-not-be-parsed">
  Managed settings document could not be parsed
</h3>

Your organization deploys [managed settings](https://code.claude.com/docs/en/managed-settings), and one of the deployed documents is present but can't be parsed as a JSON object, so Claude Code exits with code 1 at startup instead of running without the policy the document carries. The line names the failed source before the message:

```text theme={null}
/Library/Application Support/ClaudeCode/managed-settings.json: Managed settings document could not be parsed as a JSON object; none of its settings are in effect. Fix or remove it.
```

The source is one of:

* The path of the `managed-settings.json` file or a drop-in file under `managed-settings.d`
* The macOS managed preferences profile, `per-user managed preferences` or `device-level managed preferences`
* The Windows registry value, `Registry: HKLM\SOFTWARE\Policies\ClaudeCode\Settings`

[Find entries Claude Code dropped](https://code.claude.com/docs/en/managed-settings#find-entries-claude-code-dropped) lists what makes each source unparseable.

Claude Code refuses to start even when another admin source delivers a valid policy. You see this error in interactive sessions, `claude -p`, Agent SDK sessions, [background sessions](https://code.claude.com/docs/en/agent-view), and most subcommands, `claude doctor` included. The refusal fails closed on purpose: settings in a document Claude Code can't parse can't be enforced, and starting anyway would run sessions without the organization's controls.

A schema problem in a parseable document doesn't produce this error. [Find entries Claude Code dropped](https://code.claude.com/docs/en/managed-settings#find-entries-claude-code-dropped) covers what Claude Code does with one.

When a `managed-settings.d/` directory exists but can't be listed, Claude Code reports `Managed settings drop-in directory could not be read:` followed by the underlying error instead. [Find entries Claude Code dropped](https://code.claude.com/docs/en/managed-settings#find-entries-claude-code-dropped) covers when a read failure exits at startup.

**What to do:**

* If you administer the machine, fix the named document so it parses as a JSON object, or remove the file, profile, or registry value. An empty `managed-settings.json` counts as `\{\}` and doesn't block launch.
* If you don't, ask your administrator to fix the deployed document. Nothing in your own settings files causes or clears this error.

### headersHelper not run

Claude Code connected an MCP server with its static `headers` alone and skipped the server's [`headersHelper`](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication), because the helper is a shell command and the folder has no saved trust. A folder gets saved trust when you set its entry in `~/.claude.json` by hand or, outside your home directory, when you accept the trust dialog for it in an interactive session. See [Trust a folder before its headersHelper runs](https://code.claude.com/docs/en/mcp#trust-a-folder-before-its-headershelper-runs) for which servers this check applies to.

Claude Code writes this line in [non-interactive mode](https://code.claude.com/docs/en/headless) only, once per server. In an interactive session it writes the same refusal to the debug log instead.

```text theme={null}
MCP server 'internal-api': headersHelper not run — this workspace has no persisted trust; accept the trust dialog here once interactively, or set projects["/Users/you/project"].hasTrustDialogAccepted in /Users/you/.claude.json.
```

The `projects` key the message prints is the folder [Project allow rules and workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) says Claude Code keys the trust on. Accepting the trust dialog for a parent folder doesn't satisfy the check, and a `-p` or SDK session doesn't satisfy it either.

**What to do:**

* Run `claude` in the folder the message names, accept the trust dialog, then run your `-p` or SDK command again
* Set the `hasTrustDialogAccepted` entry in `~/.claude.json` yourself, using the exact `projects` key the message prints
* If you started the session in your home directory, work from a project directory you have trusted. When you accept the trust dialog in your home directory, Claude Code holds that trust for the current session only.

<h3 id="malformed-tool-content-rule">
  Malformed Tool(content) rule
</h3>

A [permission rule](https://code.claude.com/docs/en/permissions#permission-rule-syntax) in one of your settings files doesn't have the shape `Tool` or `Tool(content)`, for example because text follows the closing parenthesis or one of the parentheses is missing. Claude Code skips the rule and lists it in the invalid-settings dialog when an interactive session starts, and in [`claude doctor`](https://code.claude.com/docs/en/debug-your-config#check-resolved-settings) output:

```text theme={null}
Invalid permission rule "Bash(ls) x" was skipped: Malformed Tool(content) rule. Rules take the form Tool or Tool(content) and must end at the closing ")"; parentheses inside the content are literal
```

**What to do:**

* In the settings file listed with the message, rewrite the rule so it ends at its closing parenthesis, for example `Bash(ls *)` in place of `Bash(ls) x`
* Leave parentheses inside the content as they are. They're literal, so a rule such as `Edit(./Finance (2024)/**)` is valid without escaping

Before v2.1.260, Claude Code reported a rule with unmatched parentheses as `Mismatched parentheses`.

### Is not matched by file permission checks

Claude Code found a `Write`, `NotebookEdit`, `MultiEdit`, or `Glob` [permission rule](https://code.claude.com/docs/en/permissions#read-and-edit) with a path in one of your [settings files](https://code.claude.com/docs/en/settings#where-settings-live), in [managed settings](https://code.claude.com/docs/en/managed-settings), or in a `--allowedTools`, `--disallowedTools`, or `--settings` flag value. It checks file permissions against `Edit` and `Read` rules only, so it never consults a path rule that names one of the other file tools. It keeps the rule and changes nothing else; the warning names the rule, its source in parentheses, and the replacement to write:

```text theme={null}
Permission deny rule (.claude/settings.json): Write(docs/**) is not matched by file permission checks — only Edit(path) rules are. Use Edit(docs/**) instead (Edit rules cover all file-editing tools).
```

**What to do:**

* Replace `Write(path)`, `NotebookEdit(path)`, and legacy `MultiEdit(path)` rules with `Edit(path)`. `Edit` rules cover all file-editing tools.
* Except in `--allowedTools`, where Claude Code accepts a `Glob` rule without warning, replace `Glob(path)` rules with `Read(path)`.
* Fix the rule at the source the warning names in parentheses: a settings file path, or the flag itself for `--allowed-tools` and `--disallowed-tools`. A `claude-settings-<hash>.json` path that doesn't exist on disk stands for an inline `--settings` value. Fix the JSON you pass to that flag.
* Leave bare tool-name rules such as `Write` or `Glob` alone. Claude Code matches them at the [tool level](https://code.claude.com/docs/en/permissions#match-all-uses-of-a-tool) and doesn't warn about them.
* If the source reads `managed policy settings`, forward the warning to whoever maintains your managed settings, since you can't clear it yourself.
