---
title: "Remove Linear Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-linear/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-linear/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-linear/REMOVE.md"
sourceSha256: "36fc974e5b743eb309d25698a6c41479e0ebf493b809b66819b56b122babb7f1"
pageSha256: "36fc974e5b743eb309d25698a6c41479e0ebf493b809b66819b56b122babb7f1"
contentMode: "local-full"
zh: ""
---

# Remove Linear Channel

1. Comment out `import './linear.js'` in `src/channels/index.ts`
2. Remove `LINEAR_API_KEY` and `LINEAR_WEBHOOK_SECRET` from `.env`
3. `pnpm uninstall @chat-adapter/linear`
4. Rebuild and restart
