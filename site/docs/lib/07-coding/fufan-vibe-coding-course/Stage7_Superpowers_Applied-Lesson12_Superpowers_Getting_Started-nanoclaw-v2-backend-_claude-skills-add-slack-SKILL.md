---
title: "Add Slack Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/SKILL.md"
sourceSha256: "edc072bf9be694274c9202af164d6867c9870219935c090447a9e88d7e6e9851"
pageSha256: "edc072bf9be694274c9202af164d6867c9870219935c090447a9e88d7e6e9851"
contentMode: "local-full"
zh: ""
---

# Add Slack Channel

Adds Slack support via the Chat SDK bridge.

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the Slack adapter in from the `channels` branch.

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/slack.ts` exists
- `src/channels/index.ts` contains `import './slack.js';`
- `@chat-adapter/slack` is listed in `package.json` dependencies

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter

```bash
git show origin/channels:src/channels/slack.ts > src/channels/slack.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './slack.js';
```

### 4. Install the adapter package (pinned)

```bash
pnpm install @chat-adapter/slack@4.27.0
```

### 5. Build

```bash
pnpm run build
```

## Credentials

### Create Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and click **Create New App** > **From scratch**
2. Name it (e.g., "NanoClaw") and select your workspace
3. Go to **OAuth & Permissions** and add Bot Token Scopes:
   - `chat:write`, `im:write`, `channels:history`, `groups:history`, `im:history`, `channels:read`, `groups:read`, `users:read`, `reactions:write`
4. Click **Install to Workspace** and copy the **Bot User OAuth Token** (`xoxb-...`)
5. Go to **Basic Information** and copy the **Signing Secret**

### Enable DMs

6. Go to **App Home** and enable the **Messages Tab**
7. Check **"Allow users to send Slash commands and messages from the messages tab"**

### Event Subscriptions

8. Go to **Event Subscriptions** and toggle **Enable Events**
9. Set the **Request URL** to `https://your-domain/webhook/slack` — Slack will send a verification challenge; it must pass before you can save
10. Under **Subscribe to bot events**, add:
    - `message.channels`, `message.groups`, `message.im`, `app_mention`
11. Click **Save Changes**

### Interactivity

12. Go to **Interactivity & Shortcuts** and toggle **Interactivity** on
13. Set the **Request URL** to the same `https://your-domain/webhook/slack`
14. Click **Save Changes**
15. Slack will show a banner asking you to **reinstall the app** — click it to apply the new settings

### Configure environment

Add to `.env`:

```bash
SLACK_BOT_TOKEN=xoxb-your-bot-token
SLACK_SIGNING_SECRET=your-signing-secret
```

Sync to container: `mkdir -p data/env && cp .env data/env/env`

### Webhook server

The Chat SDK bridge automatically starts a shared webhook server on port 3000 (configurable via `WEBHOOK_PORT` env var). The server handles `/webhook/slack` for Slack and other webhook-based adapters. This port must be publicly reachable from the internet for Slack to deliver events.

If running locally, discuss options for exposing the server — e.g. ngrok (`ngrok http 3000`), Cloudflare Tunnel, or a reverse proxy on a VPS. The resulting public URL becomes the base for `https://your-domain/webhook/slack`.

## Next Steps

If you're in the middle of `/setup`, return to the setup flow now.

Otherwise, run `/manage-channels` to wire this channel to an agent group.

## Channel Info

- **type**: `slack`
- **terminology**: Slack has "workspaces" containing "channels." Channels can be public (#general) or private. The bot can also receive direct messages.
- **platform-id-format**: `slack:\{channelId\}` for channels (e.g., `slack:C0123ABC`), `slack:\{dmId\}` for DMs (e.g., `slack:D0ARWEBLV63`)
- **how-to-find-id**: Right-click a channel name > "View channel details" — the Channel ID is at the bottom (starts with C). For DMs, the ID starts with D. Or copy the channel link — the ID is the last segment of the URL.
- **supports-threads**: yes
- **typical-use**: Interactive chat — team channels or direct messages
- **default-isolation**: Same agent group for channels where you're the primary user. Separate agent group for channels with different teams or sensitive contexts.
