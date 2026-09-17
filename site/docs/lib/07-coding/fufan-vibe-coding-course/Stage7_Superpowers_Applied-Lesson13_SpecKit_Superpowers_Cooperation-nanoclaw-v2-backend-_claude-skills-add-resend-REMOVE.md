---
title: "Remove Resend Email Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-resend/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-resend/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-resend/REMOVE.md"
sourceSha256: "8ea7c0c478ad4acdd57fb2c23281113ef44e7358a1496ff51c9fb355a83760d3"
pageSha256: "8ea7c0c478ad4acdd57fb2c23281113ef44e7358a1496ff51c9fb355a83760d3"
contentMode: "local-full"
zh: ""
---

# Remove Resend Email Channel

1. Comment out `import './resend.js'` in `src/channels/index.ts`
2. Remove `RESEND_API_KEY`, `RESEND_FROM_ADDRESS`, `RESEND_FROM_NAME`, `RESEND_WEBHOOK_SECRET` from `.env`
3. `pnpm uninstall @resend/chat-sdk-adapter`
4. Rebuild and restart
