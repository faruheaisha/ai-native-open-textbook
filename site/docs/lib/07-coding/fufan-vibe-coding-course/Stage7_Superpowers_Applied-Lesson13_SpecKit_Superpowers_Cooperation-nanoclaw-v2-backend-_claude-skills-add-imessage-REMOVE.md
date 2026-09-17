---
title: "Remove iMessage Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-imessage/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-imessage/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-imessage/REMOVE.md"
sourceSha256: "a6c850b3492ab2a8581ddb72289421597e93357163d4bd8cee78c6cd9ee307cf"
pageSha256: "a6c850b3492ab2a8581ddb72289421597e93357163d4bd8cee78c6cd9ee307cf"
contentMode: "local-full"
zh: ""
---

# Remove iMessage Channel

1. Comment out `import './imessage.js'` in `src/channels/index.ts`
2. Remove iMessage env vars (`IMESSAGE_ENABLED`, `IMESSAGE_LOCAL`, `IMESSAGE_SERVER_URL`, `IMESSAGE_API_KEY`) from `.env`
3. `pnpm uninstall chat-adapter-imessage`
4. Rebuild and restart
