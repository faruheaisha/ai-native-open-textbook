---
title: "Remove Telegram"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-telegram/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-telegram/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-telegram/REMOVE.md"
sourceSha256: "fc8145fce7dd0a80b6f7b57a881aebc1ffc7e5ffbe5db5d61cdda94387fcf648"
pageSha256: "fc8145fce7dd0a80b6f7b57a881aebc1ffc7e5ffbe5db5d61cdda94387fcf648"
contentMode: "local-full"
zh: ""
---

# Remove Telegram

1. Comment out `import './telegram.js'` in `src/channels/index.ts`
2. Remove `TELEGRAM_BOT_TOKEN` from `.env`
3. `pnpm uninstall @chat-adapter/telegram`
4. Rebuild and restart
