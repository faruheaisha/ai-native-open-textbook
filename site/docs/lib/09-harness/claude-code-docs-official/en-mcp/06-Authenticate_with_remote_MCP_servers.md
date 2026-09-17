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
pageSha256: "9ff6a2c1c01f8a83225bd16196623ec7baf6cc198420563a0d04e8e97a08ee85"
contentMode: "local-full"
zh: ""
---

## Authenticate with remote MCP servers

Many cloud-based MCP servers require authentication. Claude Code supports OAuth 2.0 for secure connections.

Claude Code marks a remote server as needing authentication when the server responds with `401 Unauthorized` or `403 Forbidden`. What Claude Code shows depends on the server:

* For a server you haven't signed in to, either status code flags it in `/mcp` so you can complete the OAuth flow.
* For a [claude.ai connector](#use-mcp-servers-from-claude-ai), a `401` caused by claude.ai rejecting your session token doesn't flag the connector, because re-authorizing the connector can't fix your login. Claude Code shows the [session-token-rejected state](https://code.claude.com/docs/en/errors#claude-ai-rejected-the-session-token) instead.
* For a server whose `Authorization` header you configured, in `headers` or through a [`headersHelper`](#use-dynamic-headers-for-custom-authentication), a `401` or `403` while connecting doesn't flag the server, because the credential to fix is the one you configured. Claude Code reports the connection as failed instead.
* For a connector [delivered to a cloud session](#how-connectors-reach-claude-code), Claude Code doesn't run a sign-in flow, because the session's proxy authenticates to the connector with the authorization you granted in claude.ai. When a connector there needs authorizing again, reconnect it at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) rather than from the session.

When a request to an OAuth server you already signed in to returns `401 Unauthorized`, Claude Code refreshes the stored token, reconnects, and retries the request once. It flags the server in `/mcp` only if that retry also fails. Before v2.1.206, a token refresh that failed for a transient reason, such as a network error, flagged an OAuth server as needing authentication for the rest of the session even though its refresh token was still valid.

When the server rejects the stored refresh token, Claude Code immediately shows a notice pointing at `/mcp`. Open `/mcp` and select **Re-authenticate** on the server to sign in again before the next tool call fails.

A custom server that returns a `WWW-Authenticate` header pointing to its authorization server gets the same automatic discovery as any other remote server.

Claude Code also shows a startup notice when one or more configured servers need authentication, so you don't have to open `/mcp` to discover which servers need sign-in. The notice requires Claude Code v2.1.193 or later. It counts only servers you can sign in to from Claude Code. Before v2.1.218, it also counted [claude.ai connectors](#use-mcp-servers-from-claude-ai) that weren't connected in claude.ai, which you can connect only from claude.ai settings.

In non-interactive mode there's no `/mcp` panel, so Claude Code can't run the OAuth flow for you. As of v2.1.196, when a configured server needs authentication during a `claude -p` or Agent SDK run with [tool search](#scale-with-mcp-tool-search) enabled, which is the default, Claude Code tells Claude that the server's tools are unavailable until you authorize it. Claude can then name the server that needs sign-in instead of responding as if the server weren't configured. Complete the sign-in from an interactive session with `/mcp` or `claude mcp login <name>`.

If you configured `headers.Authorization` for the server and the server rejects that header, Claude Code reports the connection as failed instead of falling back to OAuth. Check that the token is valid for the MCP endpoint, or remove the header to use the OAuth flow.

    If you already added the `sentry` server in the [MCP quickstart](https://code.claude.com/docs/en/mcp-quickstart#connect-a-server-that-requires-sign-in), skip this step: running `claude mcp add` again with the same server name at the same scope fails with `MCP server sentry already exists in local config`. Otherwise, run:

    ```bash theme=\{null\}
    claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
    ```

    In Claude Code, use the command:

    ```text wrap theme=\{null\}
    /mcp
    ```

    Then follow the steps in your browser to log in.

  Tips:

  * Authentication tokens are stored securely and refreshed automatically
  * Use "Clear authentication" in the `/mcp` menu to revoke access
  * If your browser doesn't open automatically, copy the provided URL and open it manually
  * If the browser redirect fails with a connection error after authenticating, paste the full callback URL from your browser's address bar into the URL prompt that appears in Claude Code
  * OAuth authentication works with HTTP servers

### Authenticate from the command line

From v2.1.186, `claude mcp login <name>` runs a configured server's OAuth flow directly from your shell, so you don't need to open the `/mcp` panel inside a session.

```bash theme={null}
claude mcp login sentry
```

To clear stored credentials later, run `claude mcp logout <name>`.

As of v2.1.191, the command detects when no local browser is available, such as during an SSH session or on Linux without a display server, and prints the authorization URL instead of trying to open a browser. Open the URL on your local machine, then paste the full redirect URL from your browser's address bar back at the prompt. The command needs an interactive terminal for the paste step, so connect with `ssh -t`. Pass `--no-browser` to force the URL prompt even when a local browser is detected.

```bash theme={null}
claude mcp login sentry --no-browser
```

### Use a fixed OAuth callback port

Some MCP servers require a specific redirect URI registered in advance. By default, Claude Code picks a random available port for the OAuth callback. Use `--callback-port` to fix the port so it matches a pre-registered redirect URI of the form `http://localhost:PORT/callback`. If sign-in on Claude Code v2.1.229 fails with a redirect URI mismatch, see the version note under [Use pre-configured OAuth credentials](#use-pre-configured-oauth-credentials).

You can use `--callback-port` on its own (with dynamic client registration) or together with `--client-id` (with pre-configured credentials).

```bash theme={null}
# Fixed callback port with dynamic client registration
claude mcp add --transport http \
  --callback-port 8080 \
  my-server https://mcp.example.com/mcp
```

### Use pre-configured OAuth credentials

Some MCP servers don't support automatic OAuth setup via Dynamic Client Registration. If you see an error like "Incompatible auth server: does not support dynamic client registration," the server requires pre-configured credentials. Claude Code also supports servers that use a Client ID Metadata Document (CIMD) instead of Dynamic Client Registration, and discovers these automatically. If automatic discovery fails, register an OAuth app through the server's developer portal first, then provide the credentials when adding the server.

    Create an app through the server's developer portal and note your client ID and client secret.

    Many servers also require a redirect URI. If so, choose a port and register a redirect URI in the format `http://localhost:PORT/callback`. Use that same port with `--callback-port` in the next step.

    In v2.1.229, Claude Code sent `http://127.0.0.1:PORT/callback` instead, and servers that exact-match the registered redirect URI rejected the sign-in with a redirect URI mismatch. Claude Code v2.1.231 restored the `localhost` form. To recover on v2.1.229, upgrade Claude Code, or temporarily add the `http://127.0.0.1:PORT/callback` form to the server's registered redirect URIs.

    Choose one of the following methods. The port used for `--callback-port` can be any available port. It needs to match the redirect URI you registered in the previous step.

        Use `--client-id` to pass your app's client ID. The `--client-secret` flag prompts for the secret with masked input:

        ```bash theme=\{null\}
        claude mcp add --transport http \
          --client-id your-client-id --client-secret --callback-port 8080 \
          my-server https://mcp.example.com/mcp
        ```

        Include the `oauth` object in the JSON config and pass `--client-secret` as a separate flag:

        ```bash theme=\{null\}
        claude mcp add-json my-server \
          '\{"type":"http","url":"https://mcp.example.com/mcp","oauth":\{"clientId":"your-client-id","callbackPort":8080&#125;&#125;' \
          --client-secret
        ```

        Use `--callback-port` without a client ID to fix the port while using dynamic client registration:

        ```bash theme=\{null\}
        claude mcp add-json my-server \
          '\{"type":"http","url":"https://mcp.example.com/mcp","oauth":\{"callbackPort":8080&#125;&#125;'
        ```

        Set the secret via environment variable to skip the interactive prompt:

        ```bash theme=\{null\}
        MCP_CLIENT_SECRET=your-secret claude mcp add --transport http \
          --client-id your-client-id --client-secret --callback-port 8080 \
          my-server https://mcp.example.com/mcp
        ```
```
```

    Run `/mcp` in Claude Code and follow the browser login flow.

  Tips:

  * The client secret is stored securely in your system keychain (macOS) or a credentials file, not in your config
  * If the server uses a public OAuth client with no secret, use only `--client-id` without `--client-secret`
  * These flags only apply to HTTP and SSE transports. They have no effect on stdio servers
  * Use `claude mcp get <name>` to verify that OAuth credentials are configured for a server

### Override OAuth metadata discovery

Point Claude Code at a specific OAuth authorization server metadata URL to bypass the default discovery chain. Set `authServerMetadataUrl` when the MCP server's standard endpoints error, or when you want to route discovery through an internal proxy. By default, Claude Code first checks RFC 9728 Protected Resource Metadata at `/.well-known/oauth-protected-resource`, then falls back to RFC 8414 authorization server metadata at `/.well-known/oauth-authorization-server`.

Set `authServerMetadataUrl` in the `oauth` object of your server's config in `.mcp.json`:

```json theme={null}
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

The URL must use `https://`. The metadata URL's `scopes_supported` overrides the scopes the upstream server advertises.

### Restrict OAuth scopes

Set `oauth.scopes` to pin the scopes Claude Code requests during the authorization flow. This is the supported way to restrict an MCP server to a security-team-approved subset when the upstream authorization server advertises more scopes than you want to grant. The value is a single space-separated string, matching the `scope` parameter format in RFC 6749 §3.3.

```json theme={null}
{
  "mcpServers": {
    "slack": {
      "type": "http",
      "url": "https://mcp.slack.com/mcp",
      "oauth": {
        "scopes": "channels:read chat:write search:read"
      }
    }
  }
}
```

`oauth.scopes` takes precedence over both `authServerMetadataUrl` and the scopes the server discovers at `/.well-known`. Leave it unset to let the MCP server determine the requested scope set.

As of v2.1.196, when `oauth.scopes` isn't set, Claude Code requests the scope provided by the server's `WWW-Authenticate` header or its protected resource metadata, and sends no `scope` parameter when neither provides one. It no longer requests the full `scopes_supported` catalog from automatically discovered authorization server metadata. Requesting that catalog made identity providers that advertise admin-only or template scopes reject the authorization request with an `invalid_scope` error. Metadata fetched from a configured `authServerMetadataUrl` still supplies its `scopes_supported` as the requested scopes.

If the authorization server advertises `offline_access` in `scopes_supported`, Claude Code appends it to the pinned scopes so the access token can be refreshed without a new browser sign-in.

If the server later returns a 403 `insufficient_scope` for a tool call, Claude Code re-authenticates with the same pinned scopes. Widen `oauth.scopes` when a tool you need requires a scope outside the pinned set.

### Use dynamic headers for custom authentication

If your MCP server uses an authentication scheme other than OAuth, such as Kerberos, short-lived tokens, or an internal SSO, use `headersHelper` to generate request headers at connection time. Claude Code runs the command and merges its output into the connection headers.

```json theme={null}
{
  "mcpServers": {
    "internal-api": {
      "type": "http",
      "url": "https://mcp.internal.example.com",
      "headersHelper": "/opt/bin/get-mcp-auth-headers.sh"
    }
  }
}
```

The command can also be inline:

```json theme={null}
{
  "mcpServers": {
    "internal-api": {
      "type": "http",
      "url": "https://mcp.internal.example.com",
      "headersHelper": "echo '{\"Authorization\": \"Bearer '\"$(get-token)\"'\"}'"
    }
  }
}
```

**Requirements:**

* The command must write a JSON object of string key-value pairs to stdout
* Claude Code runs the command in a shell and gives up on it after 10 seconds
* Claude Code picks the command's working directory by [where you configured the server](#where-the-helper-runs), so give the script as an absolute path or put it on `PATH`
* Dynamic headers override any static `headers` with the same name

Claude Code runs the helper fresh on each connection, at session start and on reconnect, once the [trust rule for project and local-scope servers](#trust-a-folder-before-its-headershelper-runs) lets it run. It doesn't cache the result, so your script is responsible for any token reuse.

If a tool call returns `401 Unauthorized` or `403 Forbidden`, Claude Code automatically re-runs the helper under the same rule, reconnects with the fresh headers, and retries the call once. Claude Code marks the server as needing authentication in `/mcp` only if that retry also fails.

When the helper's output includes an `Authorization` header, Claude Code uses that credential as the server's authentication and doesn't fall back to OAuth for the server.

If the server rejects the helper's credential while connecting, Claude Code reports the connection as failed rather than marking the server as needing authentication. Fix the credential your helper returns, then reconnect from `/mcp` to re-run the helper.

Claude Code sets these environment variables when executing the helper:

| Variable                      | Value                                                                                                        |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `CLAUDE_CODE_MCP_SERVER_NAME` | the name of the MCP server                                                                                   |
| `CLAUDE_CODE_MCP_SERVER_URL`  | the URL of the MCP server                                                                                    |
| `CLAUDE_PLUGIN_ROOT`          | the plugin's root directory. Set only when a [plugin](https://code.claude.com/docs/en/plugins-reference#mcp-servers) provides the server |

Use these to write a single helper script that serves multiple MCP servers.

A plugin-provided `headersHelper` can't reference the plugin's [`${user_config.*}`](https://code.claude.com/docs/en/plugins-reference#user-configuration) values, because the command runs through a shell. Claude Code reports the server as misconfigured with an [error](https://code.claude.com/docs/en/errors#plugin-command-references-user-config) and doesn't substitute the value. Put `${user_config.KEY\}` in the server's `headers` field instead, which isn't shell-parsed, or have the helper script read the value from a config file. Before v2.1.207, `headersHelper` substituted `$\{user_config.*\}` values.

#### Where the helper runs

Claude Code picks the `headersHelper` command's working directory from the configuration that declares the server. A `cd` that Claude runs in Bash doesn't move it, and [`/cd`](https://code.claude.com/docs/en/permissions#move-the-session-to-another-directory) moves it only for servers that run from the session's primary working directory. Each row below gives the directory that a relative path in your `headersHelper` command resolves against.

| Where you configured the server                                                                                                                                                                              | Working directory                                                                            |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| A [plugin](https://code.claude.com/docs/en/plugins-reference#mcp-servers)                                                                                                                                                                | The plugin's root directory. Requires Claude Code v2.1.195 or later                          |
| A project `.mcp.json` or a [local-scope](#local-scope) server                                                                                                                                                | The project directory the server is declared in                                              |
| An agent file in your project, a server from the SDK's `mcpServers` option or `setMcpServers()` method, or [`--mcp-config`](https://code.claude.com/docs/en/cli-reference)                                                               | The session's [primary working directory](https://code.claude.com/docs/en/permissions#working-directories)               |
| [User scope](#user-scope), [managed MCP](https://code.claude.com/docs/en/managed-mcp), a [claude.ai connector](#use-mcp-servers-from-claude-ai), or an agent file from outside your project, including one from an `--add-dir` directory | Your configuration directory, `~/.claude` unless you set [`CLAUDE_CONFIG_DIR`](https://code.claude.com/docs/en/env-vars) |

Before v2.1.238, Claude Code also ran the helpers of user-scope, managed, and claude.ai connector servers, and of agent files from outside your project, from the directory you started it in.

#### Which variables a helper can read

A `headersHelper` that a repository or plugin supplies is a command you didn't write, so Claude Code runs it without the credential variables from your environment, such as `ANTHROPIC_API_KEY`. Where you configured the server decides whether this applies:

* **Removed**: a server in a project `.mcp.json` or in a plugin, and an inline server in an agent file from your project or from an `--add-dir` directory
* **Not removed**: a server at [user](#user-scope) or [local scope](#local-scope), in [managed MCP](https://code.claude.com/docs/en/managed-mcp), from a [claude.ai connector](#use-mcp-servers-from-claude-ai), or supplied by the SDK or [`--mcp-config`](https://code.claude.com/docs/en/cli-reference), and an inline server in an agent file from `~/.claude/agents/`, from managed settings, or passed with `--agents`

Apart from Git's `GIT_CONFIG_KEY_<n>` variables, Claude Code removes every variable from your environment whose name looks like a credential, such as a name with `TOKEN`, `SECRET`, `PASSWORD`, `KEY`, or `AUTH` in it in either letter case, so `ANTHROPIC_API_KEY` and `MY_REGISTRY_TOKEN` are both removed. Claude Code also removes a fixed list of credential variables whose names don't follow that pattern, such as `ANTHROPIC_CUSTOM_HEADERS`.

When this applies to your helper, have the script read its credential from a file or a credential store. If the server's `url` [expands one of these variables](#environment-variable-expansion-in-mcp-json), the `CLAUDE_CODE_MCP_SERVER_URL` value the helper receives has that part replaced with `REDACTED` as well.

#### Trust a folder before its headersHelper runs

Claude Code executes a `headersHelper` as an arbitrary shell command. For a server in a project `.mcp.json` or at [local scope](#local-scope), it runs the helper only after you accept the [trust dialog](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) for the project directory the server is declared in. Before v2.1.238, a `claude -p` or SDK session ran these helpers without checking trust, and an interactive session ran them once you had trusted a parent folder.

* **Trust that doesn't count**: a parent folder's trust, and the automatic trust a `claude -p` or SDK session gets for [hooks in settings files](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder)
* **Until you trust the folder**: Claude Code connects the server with its static `headers` alone. In a `claude -p` or SDK session it also prints one [`headersHelper not run`](https://code.claude.com/docs/en/errors#headershelper-not-run) line per server to stderr, telling you how to grant the trust.
* **Trust without a dialog**: set `projects["<path>"].hasTrustDialogAccepted` to `true` in `~/.claude.json`. `<path>` is the folder [Project allow rules and workspace trust](https://code.claude.com/docs/en/permissions#project-allow-rules-and-workspace-trust) says Claude Code keys the trust on.

Claude Code applies the same rule to a server declared inline in an [agent file](https://code.claude.com/docs/en/sub-agents#scope-mcp-servers-to-a-subagent), checking where that agent file came from: your project, for a file in its `.claude/agents/` directory, or an `--add-dir` directory. Until you [trust that project or directory itself](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder), Claude Code doesn't load the server at all, so its helper never runs either.
