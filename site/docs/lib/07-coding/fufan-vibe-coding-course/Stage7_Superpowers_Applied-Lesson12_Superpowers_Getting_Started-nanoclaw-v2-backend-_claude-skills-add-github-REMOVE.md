---
title: "Remove GitHub Channel"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-github/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-github/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-github/REMOVE.md"
sourceSha256: "059adc6a8a15b4ebc0e9455d2c71543ae064245eeb1157251081ee9688c4fc34"
pageSha256: "059adc6a8a15b4ebc0e9455d2c71543ae064245eeb1157251081ee9688c4fc34"
contentMode: "local-full"
zh: ""
---

# Remove GitHub Channel

1. Comment out `import './github.js'` in `src/channels/index.ts`
2. Remove `GITHUB_TOKEN` and `GITHUB_WEBHOOK_SECRET` from `.env`
3. `pnpm uninstall @chat-adapter/github`
4. Rebuild and restart
