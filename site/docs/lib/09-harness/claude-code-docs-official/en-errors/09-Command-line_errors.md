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
pageSha256: "37527bf54d7f3a7ea84ae7100d74974750c41fd4d09e3b187799ef23b829ab82"
contentMode: "local-full"
zh: ""
---

## Command-line errors

These errors come from the `claude` command line and its subcommands, from a command name you submit at the prompt, and from commands such as `/security-review` that gather context by running shell commands before their prompt runs. So do errors from `/tui`, which relaunches the CLI.

### Conflict between --bg and --print

This message requires Claude Code v2.1.198 or later. You combined `--bg` with `-p` or `--print` in the same `claude` invocation. `--bg` starts a [background session](https://code.claude.com/docs/en/agent-view#from-your-shell) that you later attach to with `claude agents`, while `--print` runs [non-interactively](https://code.claude.com/docs/en/headless) and never starts the interactive session that `claude agents` attaches to. Before v2.1.198 this combination silently created a background job that could never be attached to.

```text theme={null}
--bg and --print conflict: --print never starts the interactive session that `claude agents` attaches to, so the job would be unattachable. The prompt is the positional — drop --print: `claude --bg '<task>'`.
```

**What to do:**

* Drop `-p` or `--print`. `--bg` takes the prompt as its positional argument, so `claude --bg "<task>"` is the complete command. See [Dispatch new agents from your shell](https://code.claude.com/docs/en/agent-view#from-your-shell).
* To run the prompt non-interactively and print the result instead of creating a background session, drop `--bg` and run `claude -p "<task>"`

<h3 id="invalid-agents-configuration">
  Invalid --agents configuration
</h3>

The value you passed to `--agents` is invalid, so `claude` exits with code 1 instead of starting the session. When you pass `--safe-mode`, `--resume`, or `--continue`, or set [`CLAUDE_CODE_SAFE_MODE`](https://code.claude.com/docs/en/env-vars#variables), Claude Code doesn't check the value and starts the session. Before v2.1.242, Claude Code started the session anyway and left out the definitions it couldn't load.

```text theme={null}
Error: Invalid --agents configuration:
<what failed>
```

What follows the first line depends on how the value failed. Claude Code runs these checks in order and stops at the first one that fails. If your value has two kinds of problem, you see the second only after you fix the first:

1. When the value doesn't parse as JSON, Claude Code prints one `invalid JSON:` line carrying the JSON parser's own message
2. When it parses but an agent definition doesn't match the schema for [CLI-defined subagents](https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope), Claude Code prints one line per problem
3. When an agent name starts with `-`, Claude Code prints `<name>: agent names must not start with '-'`

When there are more than 20 problem lines, Claude Code prints the first 20 and replaces the rest with `…and N more`.

**What to do:**

* Fix each problem the message lists, then run the command again. See [the fields a CLI-defined subagent takes](https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope).

<h3 id="cloud-sessions-cannot-be-created-from-a-restricted-session">
  Cloud sessions cannot be created from a --restricted session
</h3>

When you start a session with [`--restricted`](https://code.claude.com/docs/en/cli-reference#cli-flags), Claude Code refuses to create [cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web#from-terminal-to-web) from it, because the new session would run outside the restricted process and wouldn't enforce restricted mode. Claude Code refuses on the client, before contacting the server, so no cloud session is created:

```text theme={null}
Cloud sessions cannot be created from a --restricted session: they would not enforce it.
```

**What to do:**

* Run the task locally in the restricted session
* If you control how the session was launched, start a new `claude` session without `--restricted` and create the cloud session from there

Before v2.1.248, Claude Code had no `--restricted` flag; earlier versions reject the flag itself with an unknown-option error.

### The --json-schema value is not a valid JSON Schema

The schema you passed to [`--json-schema`](https://code.claude.com/docs/en/cli-reference#cli-flags) in [non-interactive mode](https://code.claude.com/docs/en/headless#get-structured-output) failed JSON Schema compilation, so `claude` exits with code 1 instead of running the prompt. Before v2.1.205, an invalid schema produced unstructured output with no error, and any schema that used the `format` keyword was treated as invalid.

```text theme={null}
Error: --json-schema is not a valid JSON Schema: data/type must be equal to one of the allowed values
```

The text after the second colon is the validator's diagnostic and names the keyword or location that failed. Schemas that use the `format` keyword, such as `"format": "email"`, are valid: Claude Code accepts `format` as an annotation and doesn't enforce it.

Claude Code runs two checks before schema compilation: it rejects a value that isn't parseable JSON with `Error: --json-schema is not valid JSON`, and valid JSON that isn't an object with `Error: --json-schema must be a JSON object`.

**What to do:**

* Fix the part of the schema the diagnostic names, then rerun the command
* If the diagnostic is `schema too large`, reduce the schema's nesting and `$ref` reuse
* See [Get structured output](https://code.claude.com/docs/en/headless#get-structured-output) for a working schema and command

### Settings file exceeds the 2MiB limit

The file you passed to [`--settings`](https://code.claude.com/docs/en/cli-reference#cli-flags) is larger than 2 MiB, so `claude` exits with code 1 at startup instead of loading it. A settings file is a small JSON document, so a file this large usually means the path points at the wrong file. Before v2.1.214, Claude Code read the file with no size check, and a multi-gigabyte file or a device file such as `/dev/zero` grew memory without bound.

```text theme={null}
Error: Settings file exceeds the 2MiB limit: /path/to/settings.json
```

Claude Code rejects a `--settings` path that isn't a regular file the same way: a device, FIFO, or socket reports `Error: Cannot use settings file (Not a regular file (device, FIFO, or socket))` followed by the path, and a directory reports an `EISDIR` reason.

**What to do:**

* Point `--settings` at a regular JSON settings file under 2 MiB. See [Settings](https://code.claude.com/docs/en/settings) for the format.

### The current directory no longer exists

You started `claude` from a directory that was deleted or moved after your shell entered it, for example a worktree or temp directory another shell removed. Claude Code can't read its working directory, so it exits with code 1 before starting the session, in interactive and [non-interactive](https://code.claude.com/docs/en/headless) mode alike. Before v2.1.239, Claude Code crashed with minified bundle source and a raw `ENOENT ... uv_cwd` stack on stderr instead of this message.

```text theme={null}
The current directory no longer exists (it was deleted or moved). Start Claude Code from an existing directory.
error: The current working directory was deleted, so that command didn't work. Please cd into a different directory and try again.
```

The cause and the fix are the same for both forms.

When Claude Code can't read the working directory for a different reason, such as a permissions change, the message names the error code instead: `Can't read the current directory (EACCES). Start Claude Code from a different directory.`

**What to do:**

* Change to a directory that exists, such as your home or project directory, then run `claude` again
* If the directory was recreated at the same path, your shell still holds the deleted one. Run `cd "$PWD"` or leave and re-enter the directory, then run `claude` again

<h3 id="directory-couldnt-be-resolved-to-a-real-location">
  Directory couldn't be resolved to a real location
</h3>

You ran `/add-dir` for a subdirectory of your working directory, and Claude Code couldn't resolve the directory to its real location.

You already have file access to a subdirectory of the working directory, so `/add-dir` only loads its skills, commands, and agents. Before loading them, Claude Code checks that the directory's real location, with any symlinks resolved, is inside the working directory. When Claude Code can't resolve that location, it loads nothing and shows this message:

```text theme={null}
packages/app couldn't be resolved to a real location, so its skills, commands, and agents weren't loaded. Check that it is a directory inside the working directory and try again.
```

**What to do:**

* Check that the path names a real directory inside the working directory, then run `/add-dir` again
* The message doesn't change your file access; it only reports that the directory's `.claude/` content wasn't loaded

Before v2.1.261, this message also appeared for every `/add-dir <subdirectory>` when the working directory was on a `/net/<host>` automount, where Claude Code declines to resolve paths by design; the directory was fine and retrying couldn't help.

### Workspace not trusted when starting Remote Control

You started [Remote Control](https://code.claude.com/docs/en/remote-control) server mode with `claude remote-control` or its `claude rc` alias in a directory you haven't trusted. The command doesn't show the workspace trust dialog itself, so it exits with code 1 and names the fix:

```text theme={null}
Error: Workspace not trusted. Please run `claude` in /Users/you/project first to review and accept the workspace trust dialog.
```

In your home directory the message is different, because the workspace trust dialog never saves trust for the home directory, so accepting it there can't satisfy this check. Before v2.1.214, the home directory showed the message above, whose advice can't succeed there.

```text theme={null}
Error: Workspace not trusted. /Users/you is your home directory, and for security home-directory trust is never saved, so running `claude` here first won't help. Run `claude rc` from a project directory instead (run `claude` there once to accept the trust dialog).
```

**What to do:**

* Run `claude` in the directory, accept the [workspace trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust), then run `claude remote-control` again
* In your home directory, change to a project directory and start Remote Control there

<h3 id="not-carried-over-to-the-sessions-remote-control-starts">
  Not carried over to the sessions Remote Control starts
</h3>

You started [Remote Control](https://code.claude.com/docs/en/remote-control) with a global `claude` flag before the `remote-control` verb, one that would restrict or configure the sessions Remote Control starts, such as `--settings`, `--setting-sources`, `--permission-mode`, `--disallowed-tools`, or `--mcp-config`. A flag placed before the verb never reaches those sessions. Claude Code refuses to start instead, naming the flag:

```text theme={null}
Error: `--settings` before `remote-control` is not carried over to the sessions Remote Control starts, so Remote Control refuses to start rather than drop it — remove it, and give Remote Control's own options after the verb (see `claude remote-control --help`).
```

Claude Code doesn't refuse global flags that are harmless to drop, such as `--verbose`, `--model`, or a wrapper-injected `--session-id` or `--plugin-dir`: it ignores them and Remote Control starts.

Claude Code also refuses to start for a global flag it doesn't yet recognize as harmless, so a flag added in a newer release can appear in this message until a later release marks it harmless.

**What to do:**

* Remove the flag from before the verb and pass [Remote Control's own options](https://code.claude.com/docs/en/remote-control#start-a-remote-control-session) after it; `claude remote-control --help` lists them
* When the refused flag is `--permission-mode`, run `claude remote-control --permission-mode <mode>` to set the permission mode for the sessions Remote Control starts

Before v2.1.248, `claude remote-control` didn't accept its own flags when a global flag came first, and the command failed with an `unknown option` error.

### claude import is not yet available in this build

You ran [`claude import`](https://code.claude.com/docs/en/cli-reference#cli-commands), and Claude Code found the import flow turned off, so the command exits with code 1 instead of starting the import. Before v2.1.222, a build with the import flow off treated `import` as a prompt and started an interactive session instead of printing this message.

```text theme={null}
`claude import` is not yet available in this build. Run `claude` and use /mcp or edit ~/.claude/settings.json directly.
```

Claude Code turns `claude import` on through a feature flag it fetches from Anthropic and caches on disk. This message means the cached value is off. The cause is usually one of the following:

* You haven't started a session since installing, so Claude Code hasn't fetched the flag yet. The first `claude import` can print this even when the feature is available to you.
* You use Claude Code through Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or Claude Platform on AWS. Claude Code doesn't fetch feature flags on these providers, so `claude import` stays unavailable.
* You set `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, `DISABLE_GROWTHBOOK`, or [`CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC`](https://code.claude.com/docs/en/env-vars), which turn off feature-flag fetching, so `claude import` stays unavailable.

**What to do:**

* On a fresh installation, start `claude`, wait for the session to load, exit, and run `claude import` again
* Where feature-flag fetching stays off, set the configuration up yourself: add MCP servers with [`claude mcp add`](https://code.claude.com/docs/en/mcp#installing-mcp-servers), and create the [`CLAUDE.md` files](https://code.claude.com/docs/en/memory#how-claude-md-files-load), [skills and commands](https://code.claude.com/docs/en/skills#where-skills-live), and [subagents](https://code.claude.com/docs/en/sub-agents#choose-the-subagent-scope) you want to carry over. The message also names `~/.claude/settings.json`. Of the configuration `claude import` carries, that file holds only the [permission mode](https://code.claude.com/docs/en/settings-reference#permission-settings); Claude Code doesn't read MCP servers from it.

### Could not read Claude Code config

You ran [`claude import`](https://code.claude.com/docs/en/cli-reference#cli-commands) while Claude Code couldn't parse `~/.claude.json`, the file where it stores your login and per-project state. The subcommand reads that file to check availability but doesn't show the recovery dialog the interactive session shows, so it exits with code 1. Before v2.1.222, `claude import` with an unreadable config file started an interactive session, whose recovery dialog handled the file.

```text theme={null}
Could not read Claude Code config — run `claude` with no arguments to recover it.
```

**What to do:**

* Run `claude` with no arguments. Claude Code detects the invalid file and offers to reset it. Then run `claude import` again.
* To keep manual edits you've made, fix the JSON syntax in `~/.claude.json` in an editor instead, then rerun `claude import`

### Could not import a server from Claude Desktop

Claude Code couldn't add one of the servers you selected in `claude mcp add-from-claude-desktop`. The command still imports the other selected servers and prints one line per server it couldn't add. Before v2.1.205, the first server that failed stopped the import and none of the selected servers were added.

```text theme={null}
Could not import my server: Invalid name my server. Names can only contain letters, numbers, hyphens, and underscores.
```

The text after the server name is the reason. The most common one is the name check: Claude Desktop allows characters in server names, such as spaces and periods, that `claude mcp` restricts to letters, numbers, hyphens, and underscores. Other reasons include a server configuration that fails validation and a server blocked by your organization's [MCP policy](https://code.claude.com/docs/en/managed-mcp).

**What to do:**

* Rename the server in `claude_desktop_config.json` to use only letters, numbers, hyphens, and underscores, then run `claude mcp add-from-claude-desktop` again
* Add that server directly with `claude mcp add` or `claude mcp add-json` under a valid name. See [Import MCP servers from Claude Desktop](https://code.claude.com/docs/en/mcp#import-mcp-servers-from-claude-desktop).

### Cannot add MCP server to the managed scope

You ran `claude mcp add` or `claude mcp add-json` with `--scope managed`. That scope holds the servers your organization provides through the [`managedMcpServers`](https://code.claude.com/docs/en/settings-reference#managedmcpservers) managed setting. Claude Code reads them from managed settings only, so the command can't write a server to that scope.

```text theme={null}
Cannot add MCP server to scope: managed
```

**What to do:**

* Add the server to a scope you can write: `local`, `user`, or `project`. Without `--scope`, the command uses `local`. See [MCP installation scopes](https://code.claude.com/docs/en/mcp#mcp-installation-scopes)
* To provide the server to every user in your organization, add it to [`managedMcpServers`](https://code.claude.com/docs/en/settings-reference#managedmcpservers) in the managed settings you deploy

<h3 id="cant-read-mcp-json">
  Can't read .mcp.json
</h3>

A command that reads the project's [`.mcp.json`](https://code.claude.com/docs/en/mcp#project-scope), such as `claude mcp add` or `claude mcp add-json` with `--scope project`, or `claude mcp remove`, found that the file in your current directory isn't a regular file or is larger than 2 MiB, so it exits with this error instead of reading the file.

```text theme={null}
Can't read .mcp.json: it isn't a regular file or is larger than 2097152 bytes. Fix or remove it, then run the command again.
```

Before v2.1.257, a FIFO at `.mcp.json` left the command waiting forever with no output, and a symlink to a device file such as `/dev/zero` grew memory until the process was killed.

**What to do:**

* Check what sits at `.mcp.json` in your current directory. Replace it with an ordinary JSON file in the [project-scope format](https://code.claude.com/docs/en/mcp#project-scope), or delete it, then run the command again.

<h3 id="anthropic-hosted-and-doesnt-support-local-oauth">
  Server is Anthropic-hosted and doesn't support local OAuth
</h3>

You started a sign-in for an MCP server whose URL points at an Anthropic-hosted connector host that authenticates through a third-party identity provider. These hosts include `microsoft365.mcp.claude.com`, `gmail.mcp.claude.com`, and `gcal.mcp.claude.com`. Claude Code refuses to start its local OAuth flow for these hosts from both the `/mcp` panel and `claude mcp login`, because [their sign-in works only through claude.ai](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai).

```text theme={null}
"gmail" is Anthropic-hosted and doesn't support local OAuth. Connect it via Settings → Connectors on claude.ai (requires `claude login`), then it'll be available here automatically.
```

Claude Code matches these hosts by URL, so the message appears when a server you added with `claude mcp add` or in `.mcp.json` points at one of them.

**What to do:**

* Remove your entry with `claude mcp remove <name>`, so it can't hide the claude.ai connector at the same URL
* After removing it, connect the service at [claude.ai/customize/connectors](https://claude.ai/customize/connectors), while signed in to the account you use in Claude Code. Once connected, [the connector appears in Claude Code automatically](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) if your active authentication method is a claude.ai subscription login

<h3 id="server-rejected-the-authorization-header-minted-by-the-configured-headershelper">
  Server rejected the Authorization header minted by the configured headersHelper
</h3>

An MCP server whose [`headersHelper`](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication) supplies the `Authorization` header answered the connection with HTTP 401 or 403, so Claude Code reports the connection as failed. Because the helper supplies the `Authorization` header, Claude Code [doesn't fall back to OAuth](https://code.claude.com/docs/en/mcp#authenticate-with-remote-mcp-servers) for the server:

```text theme={null}
Server rejected the Authorization header minted by the configured headersHelper (HTTP 401). Check that the helper command returns a valid credential for this MCP endpoint — OAuth fallback is disabled when the helper supplies Authorization.
```

Claude Code re-runs the helper on each connection attempt, so a retry after a transient rejection, such as a token-rotation race, can succeed with a fresh credential.

**What to do:**

* Run the `headersHelper` command yourself the way Claude Code runs it: from the [directory Claude Code runs it in](https://code.claude.com/docs/en/mcp#where-the-helper-runs), with the [environment variables Claude Code sets for it](https://code.claude.com/docs/en/mcp#use-dynamic-headers-for-custom-authentication), and without the [credential variables Claude Code removes](https://code.claude.com/docs/en/mcp#which-variables-a-helper-can-read) for a server from a project `.mcp.json`, a plugin, or a project agent file. Check that it prints an `Authorization` value the server's endpoint accepts
* After fixing the helper or its credential source, select the server in `/mcp` and choose **Reconnect**

Before v2.1.248, Claude Code ran OAuth discovery for a server whose helper supplied the `Authorization` header. That discovery could fail with `Incompatible auth server: does not support dynamic client registration` instead of reporting the rejected credential.

### MCP permission prompt tool not found

The tool you passed to [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags) wasn't among the connected MCP tools when the run first needed a permission decision, either because its server never connected or because no connected server exposes a tool by that name. Claude Code still sends your prompt: the [non-interactive](https://code.claude.com/docs/en/headless) run exits with this error, and exit code 1, on the first tool call that needs approval, so it produces no answer even though the request was made. Before the first prompt, Claude Code waits up to the per-server connection timeout of 30 seconds set by [`MCP_TIMEOUT`](https://code.claude.com/docs/en/env-vars) for that server to connect. Before v2.1.206, startup didn't wait for the server to finish connecting, so a slow-starting but healthy server produced this error too.

```text theme={null}
Error: MCP tool mcp__permissions__approve (passed via --permission-prompt-tool) not found. Available MCP tools: none
```

The list after `Available MCP tools:` names the MCP tools that were connected when the wait ended.

**What to do:**

* Check that the server starts and stays connected: run `claude mcp list` in the same directory and confirm the server is listed as connected
* Confirm the tool name matches the `mcp__<server>__<tool>` name the server exposes
* If the server needs longer than 30 seconds to start, raise [`MCP_TIMEOUT`](https://code.claude.com/docs/en/env-vars)

### OAuth callback port is already in use

When you sign in to a remote MCP server with OAuth, Claude Code starts a local listener to receive the sign-in callback. If the port that listener needs is held by another process, the sign-in fails with this message. This mostly happens with a [fixed callback port](https://code.claude.com/docs/en/mcp#use-a-fixed-oauth-callback-port) set through the [`MCP_OAUTH_CALLBACK_PORT`](https://code.claude.com/docs/en/env-vars) variable or `--callback-port`, since without one Claude Code picks an available port.

```text theme={null}
OAuth callback port <port> is already in use — another process may be holding it. Run `lsof -ti:<port> -sTCP:LISTEN` to find it.
```

On Windows, the suggested command is `netstat -ano | findstr :<port>` instead.

**What to do:**

* Run the command from the message to find the process holding the port, and stop it or wait for it to finish
* If another program needs that port permanently, register a different redirect URI with the server and set its port with `MCP_OAUTH_CALLBACK_PORT` or `--callback-port`, whichever you use
* Then start the sign-in again, for example by selecting the server in `/mcp`

<h3 id="security-review-fails-without-origin-head">
  /security-review fails without origin/HEAD
</h3>

[`/security-review`](https://code.claude.com/docs/en/commands#all-commands) builds its review context by diffing your branch against `origin/HEAD`, the local ref that records which branch is the default on your `origin` remote. When that ref doesn't exist, the git commands that gather the diff fail and the review stops before it starts.

```text theme={null}
Error: Shell command failed for pattern "!`git diff --name-only origin/HEAD...`": [stderr]
fatal: ambiguous argument 'origin/HEAD...': unknown revision or path not in the working tree.
Use '--' to separate paths from revisions, like this:
'git <command> [<revision>...] -- [<file>...]'
```

The quoted command varies between runs: the review starts several `git` commands against `origin/HEAD` at once and reports whichever fails first, so you may see `git log` or a different `git diff` in its place. Git creates the ref only when the remote's default branch is both advertised by the remote and covered by your fetch refspec. A full `git clone` of a remote with commits meets both conditions. Single-branch and CI checkouts fetch too narrow a refspec, a server-side HEAD left pointing at a branch nobody pushed advertises no default, and a repository with no `origin` remote, or one you never fetched, provides neither.

Claude Code shows the same error for any skill that [injects dynamic context](https://code.claude.com/docs/en/skills#when-an-injected-command-fails). A failed injected command aborts that skill's invocation. Two sibling strings fire before the command runs at all:

* `Shell command permission check failed for pattern "..."`: the command's permission check returned something other than allow. Injected commands never prompt, so the invocation aborts without asking you. Pre-approve commands that no rule matches with [`allowed-tools`](https://code.claude.com/docs/en/skills#pre-approve-tools-for-a-skill). A matching ask or deny rule still aborts the invocation regardless of `allowed-tools`
* ``Skill &lt;name> requires bash (`shell: bash` in frontmatter) but Git Bash was not found``: the skill's frontmatter demands bash on a machine without it. Install Git for Windows or change the frontmatter to `shell: powershell`. See [How injected commands run](https://code.claude.com/docs/en/skills#how-injected-commands-run)

**What to do:**
