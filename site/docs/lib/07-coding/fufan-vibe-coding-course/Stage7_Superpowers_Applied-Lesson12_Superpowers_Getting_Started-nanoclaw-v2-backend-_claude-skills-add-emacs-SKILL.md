---
title: "Add Emacs Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-emacs/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-emacs/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-emacs/SKILL.md"
sourceSha256: "a732126294b9735aadf59e5ddb60a59b1b85f66e52be9223e2464bbd30cbf663"
pageSha256: "a732126294b9735aadf59e5ddb60a59b1b85f66e52be9223e2464bbd30cbf663"
contentMode: "local-full"
zh: ""
---

# Add Emacs Channel

Adds Emacs support via a local HTTP bridge. Works with Doom Emacs, Spacemacs, and vanilla Emacs 27.1+.

## What you can do with this

- **Ask while coding** — open the chat buffer (`C-c n c` / `SPC N c`), ask about a function or error without leaving Emacs
- **Code review** — select a region and send it with `nanoclaw-org-send`; the response appears as a child heading inline in your org file
- **Meeting notes** — send an org agenda entry; get a summary or action item list back as a child node
- **Draft writing** — send org prose; receive revisions or continuations in place
- **Research capture** — ask a question directly in your org notes; the answer lands exactly where you need it

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the Emacs adapter and the Lisp client in from the `channels` branch. Native HTTP bridge — no Chat SDK, no adapter package.

### Pre-flight (idempotent)

Skip to **Enable** if all of these are already in place:

- `src/channels/emacs.ts` exists
- `emacs/nanoclaw.el` exists
- `src/channels/index.ts` contains `import './emacs.js';`

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter and Lisp client

```bash
mkdir -p emacs
git show origin/channels:src/channels/emacs.ts      > src/channels/emacs.ts
git show origin/channels:src/channels/emacs.test.ts > src/channels/emacs.test.ts
git show origin/channels:emacs/nanoclaw.el          > emacs/nanoclaw.el
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if the line is already present):

```typescript
import './emacs.js';
```

### 4. Build

```bash
pnpm run build
```

No npm package to install — the adapter uses only Node builtins (`http`).

## Enable

The adapter is gated by `EMACS_ENABLED` so the HTTP port isn't opened on hosts that aren't running Emacs. Add to `.env`:

```bash
EMACS_ENABLED=true
EMACS_CHANNEL_PORT=8766       # optional — change only if 8766 is taken
EMACS_AUTH_TOKEN=             # optional — set to a random string to lock the endpoint
EMACS_PLATFORM_ID=default     # optional — only change if you want a non-default chat id
```

Generate an auth token (recommended even on single-user machines — prevents other local processes from poking the endpoint):

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

## Wire the channel

Emacs is a single-user, single-chat channel. One host = one messaging group with `platform_id = "default"`.

### If this is your first agent group

Run `/init-first-agent` — pick **Emacs** as the channel, use any short handle as the "user id" (e.g. your OS username), and the skill will create the agent group, wire the channel, and write a welcome message that the agent delivers back to your Emacs buffer.

### Otherwise — wire to an existing agent group

Run the `register` step directly. The `EMACS_PLATFORM_ID` (default `default`) becomes the messaging group's platform id:

```bash
pnpm exec tsx setup/index.ts --step register -- \
  --platform-id "default" --name "Emacs" \
