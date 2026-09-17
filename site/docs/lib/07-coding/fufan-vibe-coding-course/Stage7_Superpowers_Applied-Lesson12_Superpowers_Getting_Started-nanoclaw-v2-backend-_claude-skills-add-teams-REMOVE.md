---
title: "Remove Microsoft Teams Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-teams/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-teams/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-teams/REMOVE.md"
sourceSha256: "d15083adb2fc3dae8b19470ab36285d23e0b140ff0fd1c7810bd5ed8605c4bef"
pageSha256: "d15083adb2fc3dae8b19470ab36285d23e0b140ff0fd1c7810bd5ed8605c4bef"
contentMode: "local-full"
zh: ""
---

# Remove Microsoft Teams Channel

1. Comment out `import './teams.js'` in `src/channels/index.ts`
2. Remove `TEAMS_APP_ID` and `TEAMS_APP_PASSWORD` from `.env`
3. `pnpm uninstall @chat-adapter/teams`
4. Rebuild and restart
