---
title: "Add Linear Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-linear/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-linear/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-linear/SKILL.md"
sourceSha256: "e3798b67cadea5bc8667099d5cf21392bff3aafe2168635c2c077f60d810408b"
pageSha256: "e3798b67cadea5bc8667099d5cf21392bff3aafe2168635c2c077f60d810408b"
contentMode: "local-full"
zh: ""
---

# Add Linear Channel

Adds Linear support via the Chat SDK bridge. The agent participates in issue comment threads. Every comment on a Linear issue triggers the agent — no @-mention needed.

## Prerequisites

**Recommended:** Create a Linear **OAuth application** so the agent posts as an app identity, not as you. This prevents the adapter from filtering your own comments as self-messages.

1. Go to [Linear Settings > API > OAuth Applications](https://linear.app/settings/api/applications/new)
2. Create an app (e.g. "NanoClaw Bot")
   - Developer URL: your repo URL (e.g. `https://github.com/your-org/nanoclaw`)
   - Callback URL: `http://localhost`
3. After creating, click the app and enable **Client credentials** under grant types
4. Copy the **Client ID** and **Client Secret**

**Alternative:** Use a Personal API Key (`LINEAR_API_KEY`) for simpler setup. The agent will post as you, and your own comments will be filtered (other team members' comments still work).

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the Linear adapter in from the `channels` branch and patches the Chat SDK bridge to support catch-all message forwarding (Linear OAuth apps can't be @-mentioned).

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/linear.ts` exists
- `src/channels/index.ts` contains `import './linear.js';`
- `@chat-adapter/linear` is listed in `package.json` dependencies
- `src/channels/chat-sdk-bridge.ts` contains `catchAll`

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter

```bash
git show origin/channels:src/channels/linear.ts > src/channels/linear.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './linear.js';
```

### 4. Patch the Chat SDK bridge for catch-all message forwarding

Linear OAuth apps can't be @-mentioned, so the bridge's `onNewMention` handler never fires. Add `catchAll` support to `src/channels/chat-sdk-bridge.ts`:

**4a.** Add `catchAll?: boolean` to the `ChatSdkBridgeConfig` interface:

```typescript
  /**
   * Forward ALL messages in unsubscribed threads, not just @-mentions.
   * Use for platforms where the bot identity can't be @-mentioned (e.g.
   * Linear OAuth apps). The thread is auto-subscribed on first message.
   */
  catchAll?: boolean;
```

**4b.** Add this handler block right after the `chat.onNewMention(...)` block (before the DMs block):

```typescript
      // Catch-all for platforms where @-mention isn't possible (e.g. Linear
      // OAuth apps). Forward every unsubscribed message and auto-subscribe.
      if (config.catchAll) {
        chat.onNewMessage(/.*/, async (thread, message) => {
          const channelId = adapter.channelIdFromThreadId(thread.id);
          await setupConfig.onInbound(channelId, thread.id, await messageToInbound(message));
          await thread.subscribe();
        });
      }
```

### 5. Install the adapter package (pinned)

```bash
pnpm install @chat-adapter/linear@4.27.0
```

### 6. Build

```bash
pnpm run build
```

## Credentials

### 1. Set up a webhook

1. Go to **Linear Settings** > **API** > **Webhooks** > **New webhook**
2. Label: `NanoClaw`
3. URL: `https://your-domain/webhook/linear` (the shared webhook server, default port 3000)
4. Team: select the team you want to monitor
5. Events: check **Comment**
6. Save — copy the **signing secret**

Note: Linear webhook delivery may be delayed 1-5 minutes for new webhooks. This is normal.

### 2. Configure environment

Add to `.env`:

```bash
# OAuth app (recommended)
LINEAR_CLIENT_ID=your-client-id
LINEAR_CLIENT_SECRET=your-client-secret

# OR Personal API key (simpler, but agent posts as you)
# LINEAR_API_KEY=lin_api_...

LINEAR_WEBHOOK_SECRET=your-webhook-signing-secret
LINEAR_BOT_USERNAME=NanoClaw Bot
LINEAR_TEAM_KEY=ENG
```

- `LINEAR_BOT_USERNAME`: display name for the bot (used for self-message detection when using a Personal API Key)
- `LINEAR_TEAM_KEY`: the Linear team key (e.g. `ENG`, `NAN`). Find it in Linear under Settings > Teams. All issues in this team route to one messaging group.

Sync to container: `mkdir -p data/env && cp .env data/env/env`

## Wiring

Ask the user: **Is this a private or public Linear workspace?**

- **Private workspace** — use `unknown_sender_policy: 'public'`. Only workspace members can comment.
- **Public workspace** — use `unknown_sender_policy: 'strict'` and add trusted members (see GitHub skill for member registration example).

Run `/manage-channels` to wire the Linear channel to an agent group, or insert manually:

```sql
-- Create messaging group (one per team)
INSERT INTO messaging_groups (id, channel_type, platform_id, name, is_group, unknown_sender_policy, created_at)
VALUES ('mg-linear-eng', 'linear', 'linear:ENG', 'Engineering', 1, 'public', datetime('now'));

-- Wire to agent group
INSERT INTO messaging_group_agents (id, messaging_group_id, agent_group_id, trigger_rules, response_scope, session_mode, priority, created_at)
