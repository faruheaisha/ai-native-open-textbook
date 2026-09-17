---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "d1cf23ee439cab90bedaf571c5f4f87a43187feab310dd166701d94cdc04ff2e"
contentMode: "local-full"
zh: ""
---

## Remote Control

Remote Control lets you continue a locally running Claude Code session from your phone, tablet, or any browser. Your local session keeps running on your machine — nothing moves to the cloud. Available on Pro, Max, Team, and Enterprise plans (v2.1.51+).

Remote Control is **no longer a research preview** — the label was dropped in week 34 of 2026. Any machine running `claude remote-control` now shows up as a **device card** in the Code tab of the Claude app, so you can start a session on that machine straight from your phone rather than having to start one on the machine first and then connect to it.

### Starting Remote Control

**From the CLI**:

```bash
# Start with default session name
claude remote-control

# Start with a custom name
claude remote-control --name "Auth Refactor"
```

**From within a session**:

```
/remote-control
/remote-control "Auth Refactor"
```

**Available flags**:

| Flag | Description |
|------|-------------|
| `--name "title"` | Custom session title for easy identification |
| `--verbose` | Show detailed connection logs |
| `--sandbox` | Enable filesystem and network isolation |
| `--no-sandbox` | Disable sandboxing (default) |

### Connecting to a session

Three ways to connect from another device:

1. **Session URL** — Printed to the terminal when the session starts; open in any browser
2. **QR code** — Press `spacebar` after starting to display a scannable QR code
3. **Find by name** — Browse your sessions at claude.ai/code or in the Claude mobile app (iOS/Android)

### Security

- **No inbound ports** opened on your machine
- **Outbound HTTPS only** over TLS
- **Scoped credentials** — multiple short-lived, narrowly scoped tokens
- **Session isolation** — each remote session is independent

### Remote Control vs Claude Code on the web

| Aspect | Remote Control | Claude Code on Web |
|--------|---------------|-------------------|
| **Execution** | Runs on your machine | Runs on Anthropic cloud |
| **Local tools** | Full access to local MCP servers, files, and CLI | No local dependencies |
| **Use case** | Continue local work from another device | Start fresh from any browser |

### Limitations

- One remote session per Claude Code instance
- Terminal must stay open on the host machine
- Session times out after ~10 minutes if the network is unreachable

### Use cases

- Control Claude Code from a mobile device or tablet while away from your desk
- Use the richer claude.ai UI while maintaining local tool execution
- Quick code reviews on the go with your full local development environment

### Push Notifications (v2.1.110)

When Remote Control is active and "Push when Claude decides" is enabled in `/config`, Claude can send mobile push notifications to your phone — for example, when a long task completes or needs your input.

To enable:
1. Activate Remote Control: `/remote-control` or `claude --rc`
2. Open `/config` and enable **Push when Claude decides**

Push notifications require a Claude subscription and the Claude mobile app.

### Disabling Remote Control (`disableRemoteControl`, v2.1.128+)

Admins on Team or Enterprise plans can block Remote Control entirely with the `disableRemoteControl` setting. When `true`, both `claude remote-control` and `/remote-control` refuse to start.

```json
{
  "disableRemoteControl": true
}
```

The setting is honored at the **managed/policy** scope (e.g., `/Library/Application Support/ClaudeCode/managed-settings.json` on macOS) so it cannot be overridden by individual users. Useful when local-only execution must be enforced organization-wide.

> **When Remote Control is auto-disabled by API-key tiers (v2.1.139)**: Remote Control is **silently disabled** whenever any of these are set, even if you are simultaneously logged in with claude.ai:
>
> - `ANTHROPIC_API_KEY`
> - `ANTHROPIC_AUTH_TOKEN`
> - `apiKeyHelper` (settings.json)
>
> The same condition disables [`/schedule`](#scheduled-tasks), claude.ai MCP connectors, and notification preferences — all four claude.ai-bridged surfaces are gated on the OAuth login being the active credential. Unset the API key (or run on a Pro/Max OAuth tier) to use these features.
