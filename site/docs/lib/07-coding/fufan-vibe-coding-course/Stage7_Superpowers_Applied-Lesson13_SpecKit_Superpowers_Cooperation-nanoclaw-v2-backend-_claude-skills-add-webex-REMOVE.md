---
title: "Remove Webex Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-webex/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-webex/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-webex/REMOVE.md"
sourceSha256: "3d8877dcca3fbcb2c31701ba7e98707c836addb7a1748720e6abb48220915d57"
pageSha256: "3d8877dcca3fbcb2c31701ba7e98707c836addb7a1748720e6abb48220915d57"
contentMode: "local-full"
zh: ""
---

# Remove Webex Channel

1. Comment out `import './webex.js'` in `src/channels/index.ts`
2. Remove `WEBEX_BOT_TOKEN` and `WEBEX_WEBHOOK_SECRET` from `.env`
3. `pnpm uninstall @bitbasti/chat-adapter-webex`
4. Rebuild and restart
