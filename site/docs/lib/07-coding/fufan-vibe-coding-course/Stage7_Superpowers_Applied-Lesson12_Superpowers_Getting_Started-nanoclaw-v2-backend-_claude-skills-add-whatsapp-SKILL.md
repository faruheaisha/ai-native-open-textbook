---
title: "Add WhatsApp Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp/SKILL.md"
sourceSha256: "f723c31efa61f34c344ce835e0102b07b296c7aa1efc8608ec7b67be6aaf8929"
pageSha256: "f723c31efa61f34c344ce835e0102b07b296c7aa1efc8608ec7b67be6aaf8929"
contentMode: "local-full"
zh: ""
---

# Add WhatsApp Channel

Adds WhatsApp support via the native Baileys adapter (no Chat SDK bridge).

## Install

NanoClaw doesn't ship channels in trunk. This skill copies the native WhatsApp (Baileys) adapter and its `whatsapp-auth` setup step in from the `channels` branch. No Chat SDK bridge.

### Pre-flight (idempotent)

Skip to **Credentials** if all of these are already in place:

- `src/channels/whatsapp.ts` exists
- `src/channels/index.ts` contains `import './whatsapp.js';`
- `setup/whatsapp-auth.ts` and `setup/groups.ts` both exist
- `setup/index.ts`'s `STEPS` map contains both `'whatsapp-auth':` and `groups:`
- `@whiskeysockets/baileys`, `qrcode`, `pino` are listed in `package.json` dependencies

Otherwise continue. Every step below is safe to re-run.

### 1. Fetch the channels branch

```bash
git fetch origin channels
```

### 2. Copy the adapter and setup steps

```bash
git show origin/channels:src/channels/whatsapp.ts > src/channels/whatsapp.ts
git show origin/channels:setup/whatsapp-auth.ts   > setup/whatsapp-auth.ts
git show origin/channels:setup/groups.ts          > setup/groups.ts
```

### 3. Append the self-registration import

Append to `src/channels/index.ts` (skip if already present):

```typescript
import './whatsapp.js';
```

### 4. Register the setup steps

In `setup/index.ts`, add these entries to the `STEPS` map (skip lines already present):

```typescript
groups: () => import('./groups.js'),
'whatsapp-auth': () => import('./whatsapp-auth.js'),
```

### 5. Install the adapter packages (pinned)

```bash
pnpm install @whiskeysockets/baileys@7.0.0-rc.9 qrcode@1.5.4 @types/qrcode@1.5.6 pino@9.6.0
```

### 6. Build

```bash
pnpm run build
```

## Credentials

WhatsApp uses linked-device authentication — no API key, just a one-time pairing from your phone.

### Check current state

Check if WhatsApp is already authenticated. If `store/auth/creds.json` exists, skip to "Shared vs dedicated number".

```bash
test -f store/auth/creds.json && echo "WhatsApp auth exists" || echo "No WhatsApp auth"
```

### Detect environment

Check whether the environment is headless (no display server):

```bash
[[ -z "$DISPLAY" && -z "$WAYLAND_DISPLAY" && "$OSTYPE" != darwin* ]] && echo "IS_HEADLESS=true" || echo "IS_HEADLESS=false"
```

### Ask the user

Use `AskUserQuestion` to collect configuration. **Adapt auth options based on environment:**

If IS_HEADLESS=true AND not WSL → AskUserQuestion: How do you want to authenticate WhatsApp?
- **Pairing code** (Recommended) - Enter a numeric code on your phone (no camera needed, requires phone number)
- **QR code in terminal** - Displays QR code in the terminal (can be too small on some displays)

Otherwise (macOS, desktop Linux, or WSL) → AskUserQuestion: How do you want to authenticate WhatsApp?
- **QR code in browser** (Recommended) - Opens a browser window with a large, scannable QR code
- **Pairing code** - Enter a numeric code on your phone (no camera needed, requires phone number)
- **QR code in terminal** - Displays QR code in the terminal (can be too small on some displays)

If they chose pairing code:

AskUserQuestion: What is your phone number? (Digits only — country code followed by your 10-digit number, no + prefix, spaces, or dashes. Example: 14155551234 where 1 is the US country code and 4155551234 is the phone number.)

### Clean previous auth state (if re-authenticating)

```bash
rm -rf store/auth/
```

### Run WhatsApp authentication

For QR code in browser (recommended):

```bash
pnpm exec tsx setup/index.ts --step whatsapp-auth -- --method qr-browser
```

(Bash timeout: 150000ms)

Tell the user:

> A browser window will open with a QR code.
>
> 1. Open WhatsApp > **Settings** > **Linked Devices** > **Link a Device**
> 2. Scan the QR code in the browser
> 3. The page will show "Authenticated!" when done

For QR code in terminal:

```bash
pnpm exec tsx setup/index.ts --step whatsapp-auth -- --method qr-terminal
```

(Bash timeout: 150000ms)

Tell the user:

> 1. Open WhatsApp > **Settings** > **Linked Devices** > **Link a Device**
> 2. Scan the QR code displayed in the terminal

For pairing code:

Tell the user to have WhatsApp open on **Settings > Linked Devices > Link a Device**, ready to tap **"Link with phone number instead"** — the code expires in ~60 seconds and must be entered immediately.

Run the auth process in the background and poll `store/pairing-code.txt` for the code:

```bash
