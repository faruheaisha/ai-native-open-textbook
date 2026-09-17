---
title: "Remove WhatsApp Cloud API Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-whatsapp-cloud/REMOVE.md"
sourceSha256: "364777c461b351f5742eccc82ef3fd9b8fe0f59c692cd85914a426ef7fbaaae2"
pageSha256: "364777c461b351f5742eccc82ef3fd9b8fe0f59c692cd85914a426ef7fbaaae2"
contentMode: "local-full"
zh: ""
---

# Remove WhatsApp Cloud API Channel

1. Comment out `import './whatsapp-cloud.js'` in `src/channels/index.ts`
2. Remove `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_APP_SECRET`, `WHATSAPP_VERIFY_TOKEN` from `.env`
3. `pnpm uninstall @chat-adapter/whatsapp`
4. Rebuild and restart
