---
title: "Remove Matrix Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-matrix/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-matrix/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-matrix/REMOVE.md"
sourceSha256: "060eac023ec816c4a3ef97394234da01fb8e6d74dd07a88bab98f6753b6811fd"
pageSha256: "060eac023ec816c4a3ef97394234da01fb8e6d74dd07a88bab98f6753b6811fd"
contentMode: "local-full"
zh: ""
---

# Remove Matrix Channel

1. Comment out `import './matrix.js'` in `src/channels/index.ts`
2. Remove `MATRIX_BASE_URL`, `MATRIX_ACCESS_TOKEN`, `MATRIX_USER_ID`, `MATRIX_BOT_USERNAME` from `.env`
3. `pnpm uninstall @beeper/chat-adapter-matrix`
4. Rebuild and restart
