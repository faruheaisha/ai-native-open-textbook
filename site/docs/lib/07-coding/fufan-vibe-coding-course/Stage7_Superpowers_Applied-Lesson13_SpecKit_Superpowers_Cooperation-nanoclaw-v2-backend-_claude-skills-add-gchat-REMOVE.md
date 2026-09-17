---
title: "Remove Google Chat Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-gchat/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-gchat/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-gchat/REMOVE.md"
sourceSha256: "ae9a0ae8f086c7b1abc0145a59987742513e6719b59f0c22c6fa96f83bfb2297"
pageSha256: "ae9a0ae8f086c7b1abc0145a59987742513e6719b59f0c22c6fa96f83bfb2297"
contentMode: "local-full"
zh: ""
---

# Remove Google Chat Channel

1. Comment out `import './gchat.js'` in `src/channels/index.ts`
2. Remove `GCHAT_CREDENTIALS` from `.env`
3. `pnpm uninstall @chat-adapter/gchat`
4. Rebuild and restart
