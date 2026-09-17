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
sourceRel: "en/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/mcp.md"
sourceSha256: "10c37e3b840932b59cb7c7ab34e81595c598b0213bd2f1bb15c8effa1d7bc22b"
pageSha256: "e73c7baf9aa6bf4876378b52c2860b858d45fb30f73bb577b7b8142a1a676b0e"
contentMode: "local-full"
zh: ""
---

## Installing MCP servers

MCP servers can be configured in several ways depending on your needs:

### Option 1: Add a remote HTTP server

HTTP servers are the recommended option for connecting to remote MCP servers. This is the most widely supported transport for cloud-based services.

```bash theme={null}
# Basic syntax
claude mcp add --transport http <name> <url>

# Real example: Connect to Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Example with Bearer token
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

When configuring MCP servers via JSON in `.mcp.json`, `~/.claude.json`, or `claude mcp add-json`, the `type` field accepts `streamable-http` as an alias for `http`. The MCP specification uses the name `streamable-http` for this transport, so configurations copied from server documentation work without modification.

A JSON entry that has a `url` but no `type` is a configuration error, because Claude Code reads an entry with no `type` as a stdio server. Claude Code skips that server and reports `MCP server "<name>" has a "url" but no "type"; add "type": "http" (or "sse" / "ws") to this entry`. Before v2.1.202, Claude Code reported this misconfiguration as `command: expected string, received undefined`.

In `--output-format stream-json` runs, Claude Code also reports a skipped `--mcp-config` entry in the `system/init` event's [`mcp_server_errors` field](https://code.claude.com/docs/en/headless#stream-responses), so scripts can detect that the server never loaded. This requires Claude Code v2.1.219 or later.

### Option 2: Add a remote SSE server

  The SSE (Server-Sent Events) transport is deprecated. Use HTTP servers instead, where available.

Some services still expose only an SSE endpoint. Add these with the same `claude mcp add --transport http <name> <url>` command as [an HTTP server](#option-1-add-a-remote-http-server). Claude Code tries the HTTP transport first and switches to SSE when the server doesn't accept it. The automatic switch requires Claude Code v2.1.265 or later.

On an earlier version, or to connect over SSE directly, pass `--transport sse` instead:

```bash theme={null}
# Basic syntax
claude mcp add --transport sse <name> <url>

# Real example: Connect to Asana
claude mcp add --transport sse asana https://mcp.asana.com/sse

# Example with authentication header
claude mcp add --transport sse private-api https://api.company.com/sse \
  --header "X-API-Key: your-key-here"
```

### Option 3: Add a local stdio server

Stdio servers run as local processes on your machine. They're ideal for tools that need direct system access or custom scripts.

Claude Code sets `CLAUDE_PROJECT_DIR` in the spawned server's environment to the project root, so your server can resolve project-relative paths without depending on the working directory. This is the same directory hooks receive in their `CLAUDE_PROJECT_DIR` variable. Read it from inside your server process, for example `process.env.CLAUDE_PROJECT_DIR` in Node or `os.environ["CLAUDE_PROJECT_DIR"]` in Python.

`CLAUDE_PROJECT_DIR` is the stable project root and doesn't change when you add or remove working directories mid-session. A server that limits its own filesystem access to a set of allowed directories should implement the MCP `roots/list` request instead. Claude Code answers `roots/list` with the session's launch directory plus every [additional working directory](https://code.claude.com/docs/en/permissions#working-directories) you've granted with `--add-dir`, `/add-dir`, or the `additionalDirectories` setting. Claude Code sends `notifications/roots/list_changed` when that set changes. Before v2.1.203, `roots/list` returned only the launch directory and Claude Code didn't send `notifications/roots/list_changed`.

This variable is set in the server's environment, not in Claude Code's own environment, so referencing it via `${VAR}` expansion in the `command` or `args` of a project-scoped `.mcp.json` entry or a local- or user-scoped server entry in `~/.claude.json` requires a default such as `${CLAUDE_PROJECT_DIR:-.\}`. Plugin-provided MCP configurations substitute `$\{CLAUDE_PROJECT_DIR\}` directly and don't need the default.

```bash theme={null}
# Basic syntax
claude mcp add [options] <name> -- <command> [args...]

# Real example: Add Airtable server
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable \
  -- npx -y airtable-mcp-server
```

  **Important: Separate server arguments with `--`**

  For stdio servers, the `--` (double dash) separates Claude's own options, such as `--transport`, `--env`, and `--scope`, from the command and arguments that run the server. Everything after `--` is passed to the server untouched.

  For example:

  * `claude mcp add --transport stdio myserver -- npx server` → runs `npx server`
  * `claude mcp add --env KEY=value --transport stdio myserver -- python server.py --port 8080` → runs `python server.py --port 8080` with `KEY=value` in environment

  Without `--`, Claude Code would try to parse the server's flags, like `--port` above, as its own options.

  `--env` accepts multiple `KEY=value` pairs. If the server name comes directly after `--env`, the CLI reads the name as another pair and rejects it, so place at least one other option between `--env` and the server name, as in the examples above.

### Option 4: Add a remote WebSocket server

WebSocket servers hold a persistent bidirectional connection, which suits remote MCP servers that push events to Claude unprompted. Use HTTP instead when your server only responds to requests, since HTTP supports OAuth and the `claude mcp add --transport` flag, while WebSocket supports neither.

Configure WebSocket servers in `.mcp.json` or with `claude mcp add-json`:

```bash theme={null}
claude mcp add-json events-server \
  '{"type":"ws","url":"wss://mcp.example.com/socket","headers":{"Authorization":"Bearer YOUR_TOKEN"}}'
```

The `type: "ws"` entry accepts the same `url`, `headers`, `headersHelper`, `timeout`, and `alwaysLoad` fields as `http`. Authentication is header-only, so pass a static token in `headers` or generate one at connect time with [`headersHelper`](#use-dynamic-headers-for-custom-authentication). The `claude mcp add --transport` flag doesn't accept `ws`.

### Add a server from setup instructions written for another client

MCP servers aren't specific to Claude Code, so a server's setup instructions may be written for Claude Desktop, Cursor, or another MCP client and give no `claude mcp add` command. To add the server anyway, look in those instructions for one of these three things:

* **A URL** such as `https://mcp.example.com/mcp`: the server is remote.
* **A launch command** such as `npx -y @example/mcp-server`: the server runs on your machine.
* **An `mcpServers` JSON block**: configuration written for another client's settings file.

Each is one of the inputs the four options in [Installing MCP servers](#installing-mcp-servers) take. Find the shape you have below to turn it into the command Claude Code accepts. Each command writes to [local scope](#local-scope) unless you add `--scope project` or `--scope user`.

#### From a URL

A URL means the server is remote. For an `https://` endpoint, add it with `--transport http`, or follow [Option 2](#option-2-add-a-remote-sse-server) when the instructions say the endpoint uses SSE. For a `wss://` endpoint, use [Option 4](#option-4-add-a-remote-websocket-server) instead, since `--transport` doesn't accept `ws`:

```bash theme={null}
claude mcp add --transport http example https://mcp.example.com/mcp
```

If the instructions also give an API key or token header, pass it with `--header` as shown in [Option 1](#option-1-add-a-remote-http-server).

#### From an `npx`, `uvx`, or binary command

A launch command means the server runs as a local stdio process. Put the whole command after `--`, so Claude Code passes flags such as `-y` to the command that starts the server instead of reading them as its own options. Pass any environment variables the instructions ask for with `--env`, after the server name and before `--`:

```bash theme={null}
claude mcp add example --env API_KEY=your-key -- npx -y @example/mcp-server
```

[Option 3](#option-3-add-a-local-stdio-server) covers the `--` separator in full.

#### From an `mcpServers` JSON block

An `mcpServers` block written for another MCP client, such as Claude Desktop, uses the wrapper key and entry shape Claude Code reads. Pass `claude mcp add-json` the object inside `mcpServers`, not the wrapper. Two entries need a repair first:

* **A `url` with no `type`**: add `"type": "http"`, `"type": "sse"`, or `"type": "ws"` to match the endpoint. Claude Code reads an entry with no `type` as a stdio server, so a `url` entry without a `type` fails.
* **A key with characters other than letters, numbers, hyphens, and underscores**: pick a server name that uses only those characters. Otherwise the key is the server name.

For example, this block:

```json theme={null}
{
  "mcpServers": {
    "example": {
      "command": "npx",
      "args": ["-y", "@example/mcp-server"]
    }
  }
}
```

becomes this command:

```bash theme={null}
claude mcp add-json example '{"command":"npx","args":["-y","@example/mcp-server"]}'
```

[Add MCP servers from JSON configuration](#add-mcp-servers-from-json-configuration) covers shell escaping and the `--scope` flag for `add-json`. To share the server with your team instead, add `--scope project`, or add the entry under `mcpServers` in `.mcp.json` at your project root and commit it. [Project scope](#project-scope) covers how Claude Code loads and approves that file.

Each `claude mcp add` and `claude mcp add-json` command prints an `Added ...` line. To check that Claude Code connected, run `claude mcp get <name>`; [Server status](#server-status) covers the statuses it shows and the approval step for `.mcp.json` servers.

### Managing your servers

Once configured, you can manage your MCP servers with these commands:

```bash theme={null}
# List all configured servers
claude mcp list

# Get details for a specific server
claude mcp get notion

# Remove a server
claude mcp remove notion

# (within Claude Code) Check server status
/mcp
```

When you remove a remote server, Claude Code also deletes the OAuth tokens and client registration it stored for that server.

#### Server status

`claude mcp add` confirms a successful add by printing an `Added ...` line, which means the configuration was written. `claude mcp list` then shows a health status next to each server it lists, such as `✔ Connected`, `! Needs authentication`, or `✘ Failed to connect`. A failure status means Claude Code couldn't connect to that server, not that the list command failed.

The statuses in this list report a configuration decision rather than a connection attempt, so Claude Code prints them without connecting to the server:

* ``⏸ Pending approval (run `claude` to approve)``: a project-scoped server from `.mcp.json` that you haven't approved yet. Claude Code shows it in both `claude mcp list` and `claude mcp get <name>`. Run `claude` interactively to review and approve it.
* `✘ Rejected (see disabledMcpjsonServers in settings)`: a `.mcp.json` server that a [`disabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#disabledmcpjsonservers) entry rejects. Claude Code shows it only in `claude mcp get <name>`.
* `⊘ Disabled for this project (re-enable via /mcp)`: a server that the project's [`disabledMcpServers`](#disable-a-server-without-removing-it) list names. Claude Code shows it in both `claude mcp list` and `claude mcp get <name>`. Turn the server back on from the `/mcp` panel. Before v2.1.238, both commands connected to a disabled server to health-check it and reported the connection result.

WebSocket servers don't appear in `claude mcp list` output. Use `claude mcp get <name>` or the `/mcp` panel to check them.

#### Project server approvals and workspace trust

As of v2.1.196, `claude mcp list` and `claude mcp get` read `.mcp.json` approvals only from settings files that aren't checked into the repository until you trust the workspace by running `claude` in it and accepting the workspace trust dialog. A cloned repository can't approve its own servers: [`enableAllProjectMcpServers`](https://code.claude.com/docs/en/settings-reference#enableallprojectmcpservers) or [`enabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#enabledmcpjsonservers) committed to the project's `.claude/settings.json` is ignored in an untrusted folder, and the server stays at `⏸ Pending approval` instead of being connected and health-checked.

Approvals from these sources still apply in an untrusted folder:

* your user `~/.claude/settings.json`
* managed settings
* settings passed with `--settings`

Claude Code also applies approvals from an untracked `.claude/settings.local.json`, but it runs git to check whether the file is tracked, and it runs that check only in a [trusted folder](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust). In a folder you've never trusted, Claude Code waits for the trust dialog before applying the file's approvals, unless the folder is your own configuration home: your home directory, or a directory whose `.claude` you've set as [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/env-vars). Before v2.1.207, Claude Code applied approvals from an untracked `.claude/settings.local.json` even in a folder you'd never trusted.

A `disabledMcpjsonServers` entry in any settings file still rejects the server.

#### Server status detail

In `/mcp`, including a server's menu there, and in the [`/plugin`](https://code.claude.com/docs/en/plugins) manager, a remote HTTP or SSE server you've used before can show a `cached` status such as `cached 2h ago · connects on first use · 5 tools`. Claude Code loaded the server's tool list from its discovery cache, saved in a previous session, instead of connecting at startup, and Claude Code connects the server the first time Claude calls one of the server's tools. The tools are available from your first message, so you don't need to do anything. The discovery cache and its `cached` status require Claude Code v2.1.221 or later.

The discovery cache is off by default unless a gradual rollout has enabled it for your account. Set [`MCP_DISCOVERY_CACHE=1`](https://code.claude.com/docs/en/env-vars) to turn it on, or `0` to keep it off even when the rollout has enabled it. Before v2.1.238, the cache was on by default.

Two actions in a server's menu in `/mcp` also affect that server's cache entry:

* **Reconnect**: on a `cached` server, Claude Code connects it now rather than on its first tool call and keeps the entry. On a connected or failed server, Claude Code reconnects it and also discards the entry.
* **Clear authentication**: Claude Code revokes the server's authentication and also discards the entry.

After discarding the entry, Claude Code fetches the server's tool list from the server instead of from the cache.

When a server's status is `✘ Failed to connect`, `claude mcp list` appends the failure detail to that status line, and `claude mcp get <name>` shows it on an `Issue:` line: the HTTP status or error code, plus any error text the server returned. The server's detail view in `/mcp` includes the same server-reported text in its `Issue:` row. Claude Code redacts credential-like text from this detail and never includes the expanded server URL, which can carry secrets. Claude Code appends no detail to a `✘ Connection error` status, because the exception text it would print there can embed that URL. Before v2.1.219, both commands showed only the bare failure status, without the status code or the server's error text.

When you complete authentication from `/mcp` and the connection still fails with an HTTP status or a transport error code, Claude Code adds that code and the origin of the server's URL to the message it prints after the attempt. The origin is the scheme and host, plus the port when the URL names one, such as `https://mcp.example.com`.

* The path and query never appear in that message.
* For a server in the local, project, or user [scope](#mcp-installation-scopes) or in managed MCP configuration, the origin shows the host as written in that configuration, so a `${VAR}` reference in the host isn't expanded in the message.
* For a failure with no status or error code, Claude Code shows the error text without the origin.

A remote server whose configuration has an empty `url` shows as `not configured` in `/mcp`, in `claude mcp list`, and in the [`/plugin`](https://code.claude.com/docs/en/plugins) manager, and Claude Code doesn't attempt to connect to it. A plugin can include a placeholder entry like this for a connector you configure later, so Claude Code doesn't report it as an error or a setup issue. The server's detail view in `/mcp` reads `No URL configured for this server`; set the entry's `url` to connect it. Before v2.1.208, Claude Code reported an empty `url` as a configuration issue with a prompt to reconnect.

#### Configuration warnings

Claude Code warns about the configuration problems below. Each entry says what Claude Code checks and how to clear the warning:

* **Hidden whitespace**: Claude Code warns when an MCP config value carries hidden leading or trailing whitespace, which often comes from pasting a token with a trailing newline. Claude Code checks `command`, `url`, each `args` entry, and the values and key names under `env` and `headers`. Claude Code shows the warning in `claude mcp list` output and in `/mcp`, naming the affected fields without echoing their values, for example `Leading or trailing whitespace in: headers.Authorization`. Claude Code doesn't trim the whitespace and uses the values exactly as written, so edit the configuration to remove it.
* **Same name in more than one scope**: if you define the same server name in more than one [scope](#mcp-installation-scopes) with different endpoints, Claude Code warns about the conflict in `claude mcp list` output and in `/mcp`. Claude Code stores OAuth sign-ins per endpoint, so when you authenticate the definition that loads in one project, you still need to sign in separately in a project where a different definition loads. Keep the endpoint you want and remove the others with `claude mcp remove <name> --scope <scope>`. In the warning, Claude Code quotes each scope's endpoint as written in your configuration, with [`${VAR\}` references](#environment-variable-expansion-in-mcp-json) unexpanded, so it never shows a resolved value such as an API key.
* **Reserved names**: Claude Code reserves the names of its built-in servers, including `workspace`, `claude-in-chrome`, `computer-use`, `Claude Preview`, and `Claude Browser`. If your configuration defines a server with a reserved name, Claude Code skips it at load time and shows a warning asking you to rename it. `claude mcp add` rejects a reserved name with an error. `Claude Preview` and `Claude Browser` both name the built-in server that the [Claude Code desktop app's preview pane](https://code.claude.com/docs/en/desktop#preview-your-app) uses. Before v2.1.205, `Claude Browser` wasn't reserved, so a user-configured server could register under that name.
* **Missing environment variable**: if a [`${VAR}` reference](#environment-variable-expansion-in-mcp-json) in a server's configuration names a variable that isn't set and has no `:-default`, Claude Code warns in `claude mcp list` output and in `/mcp`, naming the variable, and still loads the server with the `${VAR\}` text unexpanded. Set the variable or add a `$\{VAR:-default\}` fallback.

#### Tool availability

The `/mcp` panel shows the tool count next to each connected server and flags servers that advertise the tools capability but expose no tools.

If your request needs tools from a server that is still connecting in the background, Claude waits for that server before continuing. How the wait happens depends on your configuration:

* **With [tool search](#scale-with-mcp-tool-search), the default**: the wait happens inside the `ToolSearch` call.
* **Without tool search**: Claude uses the `WaitForMcpServers` tool instead. Configurations without tool search include a custom `ANTHROPIC_BASE_URL`, `ENABLE_TOOL_SEARCH=false`, and a model earlier than the Claude 4.5 generation on Google Cloud's Agent Platform.
* **On a Microsoft Foundry [deployment hosted on Azure](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options)**: Claude starts on the tool-search path rather than with `WaitForMcpServers`, since Claude Code discovers the deployment's server-side rejection only from the API. After Claude Code switches that deployment to [upfront loading](#scale-with-mcp-tool-search), tools from a server that finishes connecting become available on Claude's next request.

With tool search enabled, when a server finishes connecting while Claude is working, Claude Code lists the server's tool names to Claude on its next request in the same turn. Claude can then search for and call those tools without waiting for your next message.

### Disable a server without removing it

Toggle a server off in the `/mcp` panel to stop Claude Code from connecting to it without losing its configuration. Claude Code still lists the server in `/mcp`, marked as disabled.

When you toggle a server, Claude Code records your choice per project in `~/.claude.json`, in one of two lists that cover disjoint sets of servers:

* `disabledMcpServers`: an opt-out list for user-configured servers, plugin servers, servers your organization [provides through managed settings](https://code.claude.com/docs/en/managed-mcp#provide-servers-through-managed-settings), the claude.ai connectors Claude Code [fetches itself](#how-connectors-reach-claude-code), and built-in servers that default to on. Claude Code doesn't connect to a server you list here. When you disable a claude.ai connector with the per-project `/mcp` toggle described in [Disable claude.ai connectors](#disable-claude-ai-connectors), Claude Code writes it to this list under its display name, for example `claude.ai Slack`.
* `enabledMcpServers`: an opt-in list for built-in servers that default to off, such as `computer-use`. Claude Code connects to a default-off server only when you list it here.

Claude Code consults exactly one of the two lists for each server, so neither list overrides the other. If you add a regular server to `enabledMcpServers`, or a default-off built-in server to `disabledMcpServers`, Claude Code ignores the entry.

`disabledMcpServers` and `enabledMcpServers` are unrelated to [`enabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#enabledmcpjsonservers) and [`disabledMcpjsonServers`](https://code.claude.com/docs/en/settings-reference#disabledmcpjsonservers), which control approval of servers defined in a project's `.mcp.json` file.

### MCP client runtimes

Claude Code connects to MCP servers through one of two client runtimes. The v1 runtime is built on MCP TypeScript SDK 1.x. The v2 runtime is the same code on [MCP TypeScript SDK 2.0](https://ts.sdk.modelcontextprotocol.io/v2/), which adds MCP protocol revision 2026-07-28. The rest of this page applies to both runtimes, except where a section names the v2 runtime.

On Claude Code v2.1.232 or later, Claude Code uses the v2 runtime. It picks a runtime each time you start it and keeps it until you exit. It uses v1 when you run it:

* On Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry, unless a host platform that embeds Claude Code sets [`CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST`](https://code.claude.com/docs/en/env-vars)
* Signed in through a [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway)
* With [feature-flag fetching off](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching)

On v2, Claude Code also:

* Asks HTTP and claude.ai connector servers whether they support the newer revision, and uses it with those that do. It asks stdio servers only if you set [`MCP_PROTOCOL_NEGOTIATION`](https://code.claude.com/docs/en/env-vars) to `auto`, and connects to every other server as v1 does.
* Receives `list_changed` notifications from servers on the newer revision over a [stream it holds open](#notification-streams-on-the-v2-runtime).
* Doesn't register a [channel](#push-messages-with-channels) server that connects on the newer revision, because that revision can't carry channel messages.
* Fails an [MCP OAuth sign-in](#authenticate-with-remote-mcp-servers) whose authorization response names an unexpected issuer.

Anthropic can keep a specific server on the earlier protocol, or off that stream, with a feature flag Claude Code fetches.

To pick the runtime yourself, set [`MCP_SDK_GENERATION`](https://code.claude.com/docs/en/env-vars) to `v1` or `v2`. To decide whether Claude Code asks, set [`MCP_PROTOCOL_NEGOTIATION`](https://code.claude.com/docs/en/env-vars) to `auto` or `legacy`. Where Claude Code uses v1 by default, pinning `v2` doesn't make it ask, so set `auto` too.

### Dynamic tool updates

Claude Code supports MCP `list_changed` notifications, allowing MCP servers to dynamically update their available tools, prompts, and resources without requiring you to disconnect and reconnect. When an MCP server sends a `list_changed` notification, Claude Code automatically refreshes the available capabilities from that server.

If a refresh request fails, Claude Code keeps the server's previously discovered tools, prompts, and resources until a later refresh succeeds. Before v2.1.214, a transient error during the refresh replaced the server's tools, prompts, and resources with an empty list.

#### Notification streams on the v2 runtime

On the [v2 runtime](#mcp-client-runtimes), Claude Code receives `list_changed` notifications from a server on the newer protocol revision over a stream it holds open. When the stream closes, Claude Code reopens it, with two limits:

* **The stream closes again within 10 seconds**: Claude Code reopens it up to three times, then stops for that connection.
* **The stream stays open longer than 10 seconds, then closes**, as streams to serverless hosts commonly do: after five reopens in an hour, Claude Code waits about six hours before the next one.

Until the stream reopens, you keep the server's last fetched tools, prompts, and resources. To pick up its changes sooner, reconnect the server from `/mcp`.

### Automatic reconnection

Claude Code reconnects a remote server that drops mid-session and retries an HTTP or SSE server's first connection after a transient error. Stdio servers are local processes, and Claude Code doesn't reconnect them automatically.

#### Mid-session drops of a remote server

Claude Code reconnects a dropped remote server with exponential backoff: up to five attempts, starting at a one-second delay and doubling it each time. What you see depends on how you're running Claude Code:

* **In an interactive session**: `/mcp` shows the server as pending while Claude Code reconnects. After five failed attempts, Claude Code marks the server as failed, or as needing authentication when the server needs authorizing again. You can retry manually from `/mcp`.
* **In [`claude -p`](https://code.claude.com/docs/en/headless) runs and [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) sessions**: Claude Code reconnects on the same schedule, with no `/mcp` panel to show the attempts.

#### Failed first connections

When an HTTP or SSE server's first connection fails with a transient error, such as a 5xx response, a connection refused, or a timeout, Claude Code retries up to three times. If the connection still fails, Claude Code marks the server as failed. Claude Code retries this way at startup and when a server is added mid-session. That includes a server Claude Code adds to a [cloud session](https://code.claude.com/docs/en/claude-code-on-the-web) from its configuration and a server you add with the Agent SDK's [`setMcpServers()`](https://code.claude.com/docs/en/agent-sdk/typescript).

Claude Code doesn't retry in these cases:

* A WebSocket server's first connection
* An authentication or not-found error, because it requires a configuration change to resolve. When a [`headersHelper`](#use-dynamic-headers-for-custom-authentication) is the server's only source of the `Authorization` header, Claude Code retries an authentication error anyway, because it re-runs the helper on each attempt and can pick up a fresh credential

#### Failed discovery requests

After a server connects, Claude Code sends it capability discovery requests such as `tools/list`, `prompts/list`, and `resources/list`. Claude Code retries those requests up to three times with short backoff after a transient network or server error. It doesn't retry authentication errors, 4xx responses, or request timeouts.

#### How Claude learns that a server failed

Whether Claude Code tells Claude about a configured server that failed to connect depends on [tool search](#scale-with-mcp-tool-search), which is on by default:

* With tool search, Claude Code tells Claude which server failed and its connection error, so Claude reports the connection failure in its response. Claude Code includes the same information in `ToolSearch` results that find no matching tool.
* In any [configuration without tool search](#configure-tool-search), Claude Code doesn't report failed server connections to Claude.

### Push messages with channels

An MCP server can also push messages directly into your session so Claude can react to external events like CI results, monitoring alerts, or chat messages. To enable this, your server declares the `claude/channel` capability and you opt it in with the `--channels` flag at startup. See [Channels](https://code.claude.com/docs/en/channels) to use an officially supported channel, or [Channels reference](https://code.claude.com/docs/en/channels-reference) to build your own.

On the [v2 runtime](#mcp-client-runtimes), if you set [`MCP_PROTOCOL_NEGOTIATION`](https://code.claude.com/docs/en/env-vars) to `auto` and a channel server negotiates MCP protocol revision 2026-07-28, it can't deliver channel messages, so Claude Code doesn't register it as a channel. Leaving the variable unset, or setting it to `legacy`, keeps stdio servers on the earlier handshake.

  Tips:

  * Use the `-s` or `--scope` flag to specify where the configuration is stored:
    * `local` (default): available only to you in the current project
    * `project`: shared with everyone in the project via the `.mcp.json` file
    * `user`: available to you across all projects
  * Set environment variables with `-e` or `--env` flags (for example, `-e KEY=value`)
  * The `--transport` and `--header` flags also accept `-t` and `-H` short forms
  * Configure MCP server startup timeout using the `MCP_TIMEOUT` environment variable (for example, `MCP_TIMEOUT=10000 claude` sets a 10-second timeout)
  * Set a per-server tool execution timeout by adding a `timeout` field in milliseconds to that server's `.mcp.json` entry, for example `"timeout": 600000` for ten minutes. This overrides the `MCP_TOOL_TIMEOUT` environment variable for that server only
  * Claude Code displays a warning when MCP tool output exceeds 10,000 tokens and limits output to 25,000 tokens by default. To raise the limit, set the `MAX_MCP_OUTPUT_TOKENS` environment variable (for example, `MAX_MCP_OUTPUT_TOKENS=50000`); the warning threshold is fixed. See [MCP output limits and warnings](#mcp-output-limits-and-warnings)
  * Use `/mcp` to authenticate with remote servers that require OAuth 2.0 authentication

The per-server `timeout` is a hard wall-clock limit per tool call, and progress notifications from the server don't extend it. Values below 1000 are ignored and fall through to `MCP_TOOL_TIMEOUT`, or to its default of about 28 hours when that variable is unset. For an HTTP, SSE, or [claude.ai connector](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) server there is also a second, per-request timer that covers each request through to the server's first response byte. Claude Code sets that timer to the greatest of three values: 60 seconds, the tool timeout that applies to the server, and `MCP_TIMEOUT`. The 28-hour default of an unset `MCP_TOOL_TIMEOUT` doesn't enter that comparison, and a value below 60 seconds doesn't shorten the timer. Stdio and WebSocket servers have no per-request timer.

A per-server `timeout` of at least 1000 also acts as a floor on the idle timeout described below: Claude Code never aborts that server's tool calls for idleness sooner than the per-server `timeout`. Requires Claude Code v2.1.203 or later.

A tool call to an MCP server that sends no response and no progress notification for the idle window aborts with an error instead of waiting for the wall-clock limit. The idle timeout requires Claude Code v2.1.187 or later. It applies to every server type except IDE servers and SDK in-process servers. The idle window defaults to five minutes for HTTP, SSE, WebSocket, and [claude.ai connector](#use-mcp-servers-from-claude-ai) servers, and to 30 minutes for stdio servers. Before v2.1.203, stdio servers were exempt from the idle timeout.

Set the [`CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`](https://code.claude.com/docs/en/env-vars) environment variable in milliseconds to change the idle window, or set it to `0` to disable the check.

These timeouts bound how long a call can run, not always how long it blocks the session: a main-conversation call that runs past two minutes moves to a background task first. See [Automatic backgrounding of long tool calls](#automatic-backgrounding-of-long-tool-calls).

### Automatic backgrounding of long tool calls

An MCP tool call in the main conversation that is still running after two minutes moves to a background task instead of blocking the session. Claude receives the task ID immediately and keeps working, and the result arrives as a task notification when the call settles. Automatic backgrounding requires Claude Code v2.1.212 or later.

The task appears in [`/tasks`](https://code.claude.com/docs/en/commands#all-commands), where you can also stop it, and it doesn't survive exiting the session. The per-call limits still apply while the call runs in the background: the wall-clock limit set by the per-server `timeout` or [`MCP_TOOL_TIMEOUT`](https://code.claude.com/docs/en/env-vars), and the idle timeout set by [`CLAUDE_CODE_MCP_TOOL_IDLE_TIMEOUT`](https://code.claude.com/docs/en/env-vars).

Set the [`CLAUDE_CODE_MCP_AUTO_BACKGROUND_MS`](https://code.claude.com/docs/en/env-vars) environment variable in milliseconds to change the threshold, or set it to `0` to turn automatic backgrounding off. Setting `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` to `1` also turns it off, along with all other background task features.

Some calls never move to the background:

* Calls from [subagents](https://code.claude.com/docs/en/sub-agents); Claude Code backgrounds only main-conversation calls
* Calls to IDE servers
* Calls in [non-interactive mode](https://code.claude.com/docs/en/headless), unless `CLAUDE_AUTO_BACKGROUND_TASKS` is set to `1`, since a one-shot run can end before the result arrives

A call waiting on an open [elicitation dialog](#respond-to-mcp-elicitation-requests) isn't backgrounded while the dialog is open; the server is blocked on your input, not slow, so Claude Code defers the move until the dialog closes.

### Plugin-provided MCP servers

[Plugins](https://code.claude.com/docs/en/plugins) can bundle MCP servers that provide tools and integrations when you enable the plugin. Plugin MCP servers work identically to user-configured servers.

**How plugin MCP servers work**:

* Plugins define MCP servers in `.mcp.json` at the plugin root or inline in `plugin.json`
* When you enable a plugin, Claude Code starts its MCP servers automatically
* Claude Code offers plugin MCP tools alongside manually configured MCP tools
* You add and remove plugin servers by installing or uninstalling the plugin, not with `/mcp` commands. You can still [toggle an installed plugin server off](#disable-a-server-without-removing-it) in `/mcp`, which stops Claude Code from connecting to it without removing the plugin

**Example plugin MCP configuration**:

In `.mcp.json` at plugin root:

```json theme={null}
{
  "mcpServers": {
    "database-tools": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_URL": "${DB_URL}"
      }
    }
  }
}
```

Or inline in `plugin.json`:

```json theme={null}
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

**Plugin MCP features**:

* **Automatic lifecycle**: servers connect and disconnect at these points:
  * At session startup, Claude Code connects the servers for enabled plugins automatically. In `/mcp`, a remote (HTTP or SSE) plugin server you've used before can show the [`cached` status](#server-status-detail) instead; Claude Code connects it when Claude first calls one of its tools
  * If you enable or disable a plugin during a session, Claude Code connects or disconnects its MCP servers when the change applies. [Apply plugin changes without restarting](https://code.claude.com/docs/en/discover-plugins#apply-plugin-changes-without-restarting) describes when that is. In a session without an interactive terminal, `/reload-plugins` doesn't connect or disconnect plugin MCP servers; those changes take effect in your next session
  * When you reload, Claude Code keeps the live connections of plugin servers whose configuration is unchanged, and does the same when you [replace the session's MCP server list](https://code.claude.com/docs/en/agent-sdk/typescript#mcpsetserversresult) from the Agent SDK without naming them
  * When you [move the session with `/cd`](https://code.claude.com/docs/en/permissions#move-the-session-to-another-directory) on v2.1.246 or later, Claude Code connects the servers of plugins the new directory's settings enable and disconnects the servers of plugins that are no longer enabled, so you don't need to run `/reload-plugins` after the move
  * In [web sessions](https://code.claude.com/docs/en/claude-code-on-the-web), an MCP call to a plugin server that isn't connected yet, such as right after an idle session wakes, starts the server on demand and waits for it to connect
* **Path placeholders**: `${CLAUDE_PLUGIN_ROOT}` resolves to the plugin's installation directory, `${CLAUDE_PLUGIN_DATA\}` to its [persistent state](https://code.claude.com/docs/en/plugins-reference#persistent-data-directory) directory, and `$\{CLAUDE_PROJECT_DIR\}` to the stable project root. Substitution applies to:
  * `stdio` servers: `command`, `args`, `env`
  * `http`, `sse`, and `ws` servers: `url`, `headers`, and `headersHelper`. Before v2.1.195, `headersHelper` passed the placeholder through as a literal string
* **User environment access**: access to the same environment variables as manually configured servers
* **Multiple transport types**: support for stdio, SSE, HTTP, and WebSocket transports, though transport support may vary by server

Plugin servers appear in `/mcp` with indicators showing they come from plugins.

**Plugin MCP tool names**:
