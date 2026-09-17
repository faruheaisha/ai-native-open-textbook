---
title: "Verify DeltaChat"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/VERIFY.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/VERIFY.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-deltachat/VERIFY.md"
sourceSha256: "ba790110344fca3927369768d61da4c6927e059ff506fbe883c36a567895e934"
pageSha256: "ba790110344fca3927369768d61da4c6927e059ff506fbe883c36a567895e934"
contentMode: "local-full"
zh: ""
---

# Verify DeltaChat

## 1. Check the adapter started

```bash
grep "Channel adapter started.*deltachat" logs/nanoclaw.log | tail -1
```

Expected: `Channel adapter started \{ channel: 'deltachat', type: 'deltachat' \}`

## 2. Check IMAP/SMTP connectivity

Replace with your provider's hostnames from `.env`:

```bash
DC_IMAP=$(grep '^DC_IMAP_HOST=' .env | cut -d= -f2)
DC_SMTP=$(grep '^DC_SMTP_HOST=' .env | cut -d= -f2)

bash -c "echo >/dev/tcp/$DC_IMAP/993" && echo "IMAP open" || echo "IMAP blocked"
bash -c "echo >/dev/tcp/$DC_SMTP/587" && echo "SMTP open" || echo "SMTP blocked"
```

## 3. End-to-end message test

1. Open DeltaChat on your device
2. Add the bot email address as a contact
3. Send a message
4. The bot should respond within a few seconds

If nothing arrives, check:

```bash
grep "DeltaChat" logs/nanoclaw.log | tail -20
grep "DeltaChat" logs/nanoclaw.error.log | tail -10
```

## 4. Check messaging group was created

```bash
pnpm exec tsx scripts/q.ts data/v2.db \
  "SELECT id, platform_id, name FROM messaging_groups WHERE channel_type='deltachat' ORDER BY created_at DESC LIMIT 5"
```

If a row appears, the inbound routing is working. If not, the adapter isn't receiving the message — check logs for `DeltaChat: error handling incoming message`.

## 5. Verify user access

If the message arrived but the agent didn't respond, the sender may not have access:

```bash
pnpm exec tsx scripts/q.ts data/v2.db "SELECT id, display_name FROM users WHERE id LIKE 'deltachat:%'"
```

Grant access as shown in the SKILL.md "Grant user access" section.
