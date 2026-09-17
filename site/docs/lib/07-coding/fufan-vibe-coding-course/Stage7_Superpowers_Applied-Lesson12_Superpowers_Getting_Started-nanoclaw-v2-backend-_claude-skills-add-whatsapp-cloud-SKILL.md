---
title: "Add WhatsApp Cloud API Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/SKILL.md"
sourceSha256: "1237a7d173f18a9572063f2b21c185f20f6caa1d9473bb3c13727ca1a9705c3e"
pageSha256: "1237a7d173f18a9572063f2b21c185f20f6caa1d9473bb3c13727ca1a9705c3e"
contentMode: "local-full"
zh: ""
---

# Add WhatsApp Cloud API Channel

Connect NanoClaw to WhatsApp via the official Meta WhatsApp Business Cloud API.

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the WhatsApp Cloud adapter in from the `channels` branch.

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/whatsapp-cloud.ts` exists
- `src/channels/index.ts` contains `import './whatsapp-cloud.js';`
- `@chat-adapter/whatsapp` is listed in `package.json` dependencies

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter

```bash
git show origin/channels:src/channels/whatsapp-cloud.ts > src/channels/whatsapp-cloud.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './whatsapp-cloud.js';
```

### 4. Install the adapter package (pinned)

```bash
pnpm install @chat-adapter/whatsapp@4.27.0
```

### 5. Build

```bash
pnpm run build
```

## Credentials

1. Go to [Meta for Developers](https://developers.facebook.com/apps/) and create an app (type: Business).
2. Add the **WhatsApp** product.
3. Go to **WhatsApp** > **API Setup**:
   - Note the **Phone Number ID** (not the phone number itself).
   - Generate a **permanent System User access token** with `whatsapp_business_messaging` permission.
4. Go to **WhatsApp** > **Configuration**:
   - Set webhook URL: `https://your-domain/webhook/whatsapp`.
   - Set a **Verify Token** (any random string you choose).
   - Subscribe to webhook fields: `messages`.
5. Copy the **App Secret** from **Settings** > **Basic**.

### Configure environment

Add to `.env`:

```bash
WHATSAPP_ACCESS_TOKEN=your-system-user-access-token
WHATSAPP_PHONE_NUMBER_ID=your-phone-number-id
WHATSAPP_APP_SECRET=your-app-secret
WHATSAPP_VERIFY_TOKEN=your-verify-token
```

Sync to container: `mkdir -p data/env && cp .env data/env/env`

## Next Steps

If you're in the middle of `/setup`, return to the setup flow now.

Otherwise, run `/manage-channels` to wire this channel to an agent group.

## Channel Info

- **type**: `whatsapp-cloud`
- **terminology**: WhatsApp Cloud API supports 1:1 conversations only (no group chats). Each conversation is with a phone number.
- **how-to-find-id**: The platform ID is the Phone Number ID from the Meta Business dashboard (not the phone number itself). Find it under WhatsApp > API Setup.
- **supports-threads**: no
- **typical-use**: Interactive 1:1 chat -- direct messages only
- **default-isolation**: Same agent group if you're the only person messaging the bot. Each additional person who messages gets their own conversation automatically, but they share the agent's workspace and memory -- use a separate agent group if you need information isolation between different contacts.
