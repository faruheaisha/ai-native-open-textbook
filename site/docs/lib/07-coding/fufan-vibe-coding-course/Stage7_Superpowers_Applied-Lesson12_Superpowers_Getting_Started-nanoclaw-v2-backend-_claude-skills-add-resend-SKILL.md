---
title: "Add Resend Email Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-resend/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-resend/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-resend/SKILL.md"
sourceSha256: "ef324143df2b495e0ea039895ec882abc85371a09976a5b9075c1ffb4b28dad2"
pageSha256: "ef324143df2b495e0ea039895ec882abc85371a09976a5b9075c1ffb4b28dad2"
contentMode: "local-full"
zh: ""
---

# Add Resend Email Channel

Connect NanoClaw to email via Resend for async email conversations.

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the Resend adapter in from the `channels` branch.

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/resend.ts` exists
- `src/channels/index.ts` contains `import './resend.js';`
- `@resend/chat-sdk-adapter` is listed in `package.json` dependencies

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter

```bash
git show origin/channels:src/channels/resend.ts > src/channels/resend.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './resend.js';
```

### 4. Install the adapter package (pinned)

```bash
pnpm install @resend/chat-sdk-adapter@0.1.1
```

### 5. Build

```bash
pnpm run build
```

## Credentials

1. Go to [resend.com](https://resend.com) and create an account.
2. Add and verify your sending domain.
3. Go to **API Keys** and create a new key.
4. Set up a webhook:
   - Go to **Webhooks** > **Add webhook**.
   - URL: `https://your-domain/webhook/resend`.
   - Events: select **email.received**.
   - Copy the signing secret.

### Configure environment

Add to `.env`:

```bash
RESEND_API_KEY=re_...
RESEND_FROM_ADDRESS=bot@yourdomain.com
RESEND_FROM_NAME=NanoClaw
RESEND_WEBHOOK_SECRET=your-webhook-secret
```

Sync to container: `mkdir -p data/env && cp .env data/env/env`

## Next Steps

If you're in the middle of `/setup`, return to the setup flow now.

Otherwise, run `/manage-channels` to wire this channel to an agent group.

## Channel Info

- **type**: `resend`
- **terminology**: Resend handles email. Each email thread (identified by subject/In-Reply-To headers) is a separate conversation. The "from address" is the bot's identity.
- **how-to-find-id**: The platform ID is the from email address (e.g. `bot@yourdomain.com`). Each sender's email thread becomes its own conversation.
- **supports-threads**: yes (via email threading headers -- replies to the same thread stay together)
- **typical-use**: Async communication -- email conversations with longer response expectations
- **default-isolation**: Same agent group if you want your agent to handle email alongside other channels. Separate agent group if email contains sensitive correspondence that shouldn't be accessible from other channels.
