---
title: "Remove Slack"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-slack/REMOVE.md"
sourceSha256: "5f52d9db9b917ba484fc2a0a263faee10df5eae8a966a9bacc32c75f0f08ad35"
pageSha256: "5f52d9db9b917ba484fc2a0a263faee10df5eae8a966a9bacc32c75f0f08ad35"
contentMode: "local-full"
zh: ""
---

# Remove Slack

1. Comment out `import './slack.js'` in `src/channels/index.ts`
2. Remove `SLACK_BOT_TOKEN` and `SLACK_SIGNING_SECRET` from `.env`
3. `pnpm uninstall @chat-adapter/slack`
4. Rebuild and restart
