---
title: "Add Webex Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-webex/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-webex/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-webex/SKILL.md"
sourceSha256: "695ee399eba28ed0c6fac488c2a738f99bfb173d0d870b30768c9262d930fb75"
pageSha256: "695ee399eba28ed0c6fac488c2a738f99bfb173d0d870b30768c9262d930fb75"
contentMode: "local-full"
zh: ""
---

# Add Webex Channel

Adds Cisco Webex support via the Chat SDK bridge.

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the Webex adapter in from the `channels` branch.

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/webex.ts` exists
- `src/channels/index.ts` contains `import './webex.js';`
- `@bitbasti/chat-adapter-webex` is listed in `package.json` dependencies

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter

```bash
git show origin/channels:src/channels/webex.ts > src/channels/webex.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './webex.js';
```

### 4. Install the adapter package (pinned)

```bash
pnpm install @bitbasti/chat-adapter-webex@0.1.0
```

### 5. Build

```bash
pnpm run build
```

## Credentials

1. Go to [developer.webex.com](https://developer.webex.com/my-apps/new/bot) and create a new bot
2. Copy the **Bot Access Token**
3. Set up a webhook:
   - Use the Webex API or Developer Portal to create a webhook pointing to `https://your-domain/webhook/webex`
   - Set a webhook secret for signature verification

### Configure environment

Add to `.env`:

```bash
WEBEX_BOT_TOKEN=your-bot-token
WEBEX_WEBHOOK_SECRET=your-webhook-secret
```

Sync to container: `mkdir -p data/env && cp .env data/env/env`

## Next Steps

If you're in the middle of `/setup`, return to the setup flow now.

Otherwise, run `/manage-channels` to wire this channel to an agent group.

## Channel Info

- **type**: `webex`
- **terminology**: Webex has "spaces." A space can be a group conversation or a 1:1 direct message with the bot.
- **how-to-find-id**: Open the space in Webex, click the space name > Settings — the Space ID is listed there. Or use the Webex API (`GET /rooms`) to list spaces and their IDs.
- **supports-threads**: yes
- **typical-use**: Interactive chat — team spaces or direct messages
- **default-isolation**: Same agent group for spaces where you're the primary user. Separate agent group for spaces with different teams or sensitive information.
