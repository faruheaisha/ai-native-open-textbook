---
title: "Remove DeltaChat"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/REMOVE.md"
sourceSha256: "e853b1836706abb4576d5772e0de97b0ee8c2601a3a81b224807d75448f2a9a3"
pageSha256: "e853b1836706abb4576d5772e0de97b0ee8c2601a3a81b224807d75448f2a9a3"
contentMode: "local-full"
zh: ""
---

# Remove DeltaChat

## 1. Disable the adapter

Comment out the import in `src/channels/index.ts`:

```typescript
// import './deltachat.js';
```

## 2. Remove credentials

Remove the `DC_*` lines from `.env`:

```bash
DC_EMAIL
DC_PASSWORD
DC_IMAP_HOST
DC_IMAP_PORT
DC_SMTP_HOST
DC_SMTP_PORT
```

## 3. Rebuild and restart

```bash
pnpm run build

# Linux
systemctl --user restart nanoclaw

# macOS
launchctl kickstart -k gui/$(id -u)/com.nanoclaw
```

## 4. Remove account data (optional)

To fully remove all account data including DeltaChat encryption keys:

```bash
rm -rf dc-account/
```

> **Warning:** This deletes the Autocrypt keys. Contacts who have verified your bot's key will need to re-verify if the same email address is re-used with a new account.

To keep the account for later reinstall, leave `dc-account/` intact.

## 5. Remove the package (optional)

```bash
pnpm remove @deltachat/stdio-rpc-server
```

## Verification

After removal, confirm the adapter is no longer starting:

```bash
grep "deltachat" logs/nanoclaw.log | tail -5
```

Expected: no `Channel adapter started` entry after the last restart.
