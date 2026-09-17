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
pageSha256: "d935cc8a5d29cde067f6b094eebe4e7ca5d02b48cd3d60fc9b626ea860c4d062"
contentMode: "local-full"
zh: ""
---

## Use MCP servers from claude.ai

If you've logged into Claude Code with a [claude.ai](https://claude.ai) account, MCP servers you've added in claude.ai, known as [connectors](https://claude.com/docs/connectors), are automatically available in Claude Code:

    Add servers at [claude.ai/customize/connectors](https://claude.ai/customize/connectors). On Team and Enterprise plans, only admins can add servers.

    Complete any required authentication steps in claude.ai.

    In Claude Code, use the command:

    ```text wrap theme=\{null\}
    /mcp
    ```

    Servers from claude.ai appear in the list with indicators showing they come from claude.ai.

Claude Code marks a connector `managed` in `/mcp` and in the [`/plugin`](https://code.claude.com/docs/en/plugins) manager when your organization manages its authentication in claude.ai. Managed status doesn't change how Claude Code connects to the connector or applies your organization's [tool controls](#organization-controls-on-connector-tools).

Connectors you have never signed in to are collapsed behind a `Show unused connectors` row at the end of the claude.ai section, so an organization-provisioned list doesn't fill the panel. Select the row to expand them. A connector you signed in to before stays visible even when it currently needs re-authentication.

Connectors from claude.ai are fetched only when your active [authentication method](https://code.claude.com/docs/en/authentication#authentication-precedence) is a claude.ai subscription login. They aren't loaded, even if you previously ran `/login`, when:

* `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or `apiKeyHelper` is active
* A third-party provider such as Amazon Bedrock or Google Cloud's Agent Platform is active
* `ANTHROPIC_PROFILE`, the federation variables, or an active [Anthropic profile](https://code.claude.com/docs/en/authentication#anthropic-profiles-and-federation-credentials) supplies the credential
* `CLAUDE_CODE_OAUTH_TOKEN` holds a token from [`claude setup-token`](https://code.claude.com/docs/en/authentication#generate-a-long-lived-token), which can only make model requests

If `/mcp` doesn't list a connector you added, run `/status` to confirm which authentication method is active. Unset that environment variable, remove the `apiKeyHelper` setting, or [switch off the profile](https://code.claude.com/docs/en/authentication#anthropic-profiles-and-federation-credentials), then run `/login` to select your claude.ai account.

If a temporary network problem keeps the connector list from loading when your session starts, Claude Code retries the fetch up to three times in the background, and the connectors appear once a retry succeeds. If they still haven't appeared, restart Claude Code to fetch the list again.

If `/mcp` shows a connector as `connected · session token rejected`, or its detail view shows [`claude.ai rejected the session token`](https://code.claude.com/docs/en/errors#claude-ai-rejected-the-session-token), claude.ai rejected the token from your Claude Code login, usually because the login expired and couldn't be refreshed. Authorizing the connector again doesn't clear this state, because the connector's own authorization in claude.ai isn't what was rejected. To clear it:

1. Run `/login` to sign in again.
2. Reconnect the connector from `/mcp`.

Before v2.1.222, Claude Code marked connectors as needing authentication instead, and authorizing them didn't resolve it.

A server you've added in Claude Code takes [precedence](#scope-hierarchy-and-precedence) over a claude.ai connector that points at the same URL. When this happens, `/mcp` lists the connector as hidden and shows how to remove the duplicate if you'd rather use the connector.

Some Anthropic-hosted connectors, such as Microsoft 365, Gmail, and Google Calendar, don't support local OAuth from Claude Code because the upstream identity provider only accepts the redirect URL that claude.ai registered. When a server you added with `claude mcp add` or in `.mcp.json` points at one of these hosts and you sign in to it from `/mcp` or with `claude mcp login`, Claude Code shows [`is Anthropic-hosted and doesn't support local OAuth`](https://code.claude.com/docs/en/errors#anthropic-hosted-and-doesnt-support-local-oauth), directing you to connect the service at [claude.ai/customize/connectors](https://claude.ai/customize/connectors) instead.

After you remove your entry with `claude mcp remove <name>` and connect the service on claude.ai, the connector appears in Claude Code automatically.

### How connectors reach Claude Code

Which settings govern a claude.ai connector depends on where your session runs, because only some sessions fetch connectors from claude.ai themselves. Each row below names how connectors arrive in one kind of session and what controls them there. The desktop app's [WSL sessions](https://code.claude.com/docs/en/desktop-wsl#what-works-in-a-wsl-session) have no row because connectors aren't available in them yet.

| Where the session runs                                                                                                     | How connectors arrive                    | What governs them                                                                                                                                                                                                               |
| :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Terminal, [VS Code](https://code.claude.com/docs/en/vs-code), [JetBrains](https://code.claude.com/docs/en/jetbrains), and [Agent SDK](https://code.claude.com/docs/en/agent-sdk/claude-code-features) sessions | Claude Code fetches them from claude.ai  | The settings in this section and [managed MCP configuration](https://code.claude.com/docs/en/managed-mcp)                                                                                                                                                   |
| [Cloud sessions](https://code.claude.com/docs/en/claude-code-on-the-web)                                                                               | The remote host passes them in           | Your claude.ai organization settings, plus the [allowlist and denylist](https://code.claude.com/docs/en/managed-mcp#policy-based-control-with-allowlists-and-denylists) settings that reach the session and any `managed-mcp.json` on the host that runs it |
| The [desktop app](https://code.claude.com/docs/en/desktop)'s local and SSH sessions                                                                    | The desktop app delivers them in-process | `blocked` entries in your organization's [connector tool controls](#organization-controls-on-connector-tools)                                                                                                                   |

[`disableClaudeAiConnectors`](#disable-claude-ai-connectors), `ENABLE_CLAUDEAI_MCP_SERVERS`, and [`allowAllClaudeAiMcps`](https://code.claude.com/docs/en/settings-reference#allowallclaudeaimcps) act only on the first row, the connectors Claude Code fetches itself. The other two rows differ from it in these ways:

* **Cloud sessions**: `allowedMcpServers` and `deniedMcpServers` entries that reach the session, for example through [server-managed settings](https://code.claude.com/docs/en/server-managed-settings), filter the delivered connectors too. The session's proxy rewrites each connector's URL, so a `serverUrl` pattern written for the connector's own URL doesn't match it. To admit delivered connectors alongside a URL allowlist in a self-hosted environment, add the `serverUrl` entries listed under [Connector traffic leaves your network](https://code.claude.com/docs/en/self-hosted-environments-deploy#connector-traffic-leaves-your-network). Claude Code drops the delivered connectors when a `managed-mcp.json` is present on the host that runs the session, such as a [self-hosted runner host](https://code.claude.com/docs/en/self-hosted-environments-configuration#mcp-servers), whether or not you set `allowAllClaudeAiMcps`.
* **Desktop app local and SSH sessions**: the desktop app registers the connectors as in-process `type: "sdk"` servers, and no MCP setting or `managed-mcp.json` reaches them. A user keeps a connector out of their own sessions by disconnecting it at [claude.ai/customize/connectors](https://claude.ai/customize/connectors). An organization blocks a connector's [tools](#organization-controls-on-connector-tools) or turns off [Claude Code in the desktop app](https://code.claude.com/docs/en/desktop#admin-console-controls) entirely.

### Organization controls on connector tools

Your organization can set per-tool controls on [claude.ai connectors](https://claude.com/docs/connectors). Claude Code reads these settings at startup and enforces them locally, except in the desktop app's [local and SSH sessions](#how-connectors-reach-claude-code). There, the desktop app withholds `blocked` tools before it delivers a connector, and the `ask` setting doesn't reach Claude Code, so it applies the session's ordinary [permission rules](https://code.claude.com/docs/en/permissions) to those tools instead of prompting on every call. In sessions where Claude Code fetches connectors itself, run `/mcp` to see which setting applies to each tool on a connector.

* **Tool set to `ask`**: Claude Code prompts on every call with the reason `Your organization requires approval for this tool`. The prompt appears even in `acceptEdits`, `auto`, and `bypassPermissions` [permission modes](https://code.claude.com/docs/en/permissions#permission-modes), and never offers an option to remember your choice. [Allow rules](https://code.claude.com/docs/en/permissions) that match the tool don't skip the prompt either. In `dontAsk` mode, which never prompts, Claude Code denies the call instead.
* **Tool set to `blocked`**: Claude Code filters the tool out before Claude sees it, so it never appears in the tool list. The desktop app and claude.ai chat apply the same `blocked` setting, so Claude can't use the tool there either, and you can't withhold a tool from the desktop app's sessions while keeping it available in chat. The desktop app skips a connector whose tools are all blocked.

### Disable claude.ai connectors

Claude Code applies [`disableClaudeAiConnectors`](https://code.claude.com/docs/en/settings-reference#disableclaudeaiconnectors) only to the connectors it [fetches itself](#how-connectors-reach-claude-code), not to the connectors a cloud host or the desktop app delivers. To turn off the connectors it fetches, set the setting to `true` in any settings scope:

```json theme={null}
{
  "disableClaudeAiConnectors": true
}
```

This setting uses any-source-true semantics: `true` in any settings source takes precedence. A checked-in project `.claude/settings.json` can opt a repository out of the connectors Claude Code fetches itself, but a project-level `false` can't re-enable connectors that a user- or policy-level `true` has disabled. Servers passed explicitly via `--mcp-config` are unaffected.

You can also set the `ENABLE_CLAUDEAI_MCP_SERVERS` environment variable to `false`, which has the same effect for the current shell session:

```bash theme={null}
ENABLE_CLAUDEAI_MCP_SERVERS=false claude
```

To block individual claude.ai connectors instead of all of them, add them to [`deniedMcpServers`](https://code.claude.com/docs/en/managed-mcp) by name or by URL pattern. For example, a `serverName` entry of `"claude.ai Slack"` blocks the Slack connector. You can also run `/mcp` to toggle any connector Claude Code fetches on or off for the current project only.
