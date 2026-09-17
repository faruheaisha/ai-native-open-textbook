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
pageSha256: "1c33dece25e86908797fe8644c3025e5581d8ccf85de3b382e439116fc50e791"
contentMode: "local-full"
zh: ""
---

## Channels

Channels is a Research Preview feature that pushes events from external services into a running Claude Code session via MCP servers. Sources include Telegram, Discord, iMessage, and arbitrary webhooks, allowing Claude to react to real-time notifications without polling.

> **Auth (v2.1.128+)**: `--channels` now works with both Pro/Max OAuth **and** API-key (console) authentication. Earlier releases required OAuth.

### Subscribing to Channels

```bash
# Subscribe to channel plugins at startup
claude --channels discord,telegram

# Subscribe to multiple sources
claude --channels discord,telegram,imessage,webhooks
```

### Supported Integrations

| Integration | Description |
|-------------|-------------|
| **Discord** | Receive and respond to Discord messages in your session |
| **Telegram** | Receive and respond to Telegram messages in your session |
| **iMessage** | Receive iMessage notifications in your session |
| **Webhooks** | Receive events from arbitrary webhook sources |

### Configuration

Configure channels with the `--channels` flag at startup. For enterprise deployments, use the managed setting to control which channel plugins are permitted:

```json
{
  "allowedChannelPlugins": ["discord", "telegram"]
}
```

The `allowedChannelPlugins` managed setting controls which channel plugins are permitted across the organization.

### How It Works

1. MCP servers act as channel plugins that connect to external services
2. Incoming messages and events are pushed into the active Claude Code session
3. Claude can read and respond to messages within the session context
4. Channel plugins must be approved via the `allowedChannelPlugins` managed setting
5. No polling required — events are pushed in real time
