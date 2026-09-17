---
title: "Remove Signal"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-signal/REMOVE.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-signal/REMOVE.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson13_SpecKit_Superpowers_Cooperation/nanoclaw-v2-backend/.claude/skills/add-signal/REMOVE.md"
sourceSha256: "6a10b5524d81c6fd8b9effc8b15808a67d8880e0918d118505369137bb3d101e"
pageSha256: "6a10b5524d81c6fd8b9effc8b15808a67d8880e0918d118505369137bb3d101e"
contentMode: "local-full"
zh: ""
---

# Remove Signal

1. Comment out `import './signal.js'` in `src/channels/index.ts`
2. Remove `SIGNAL_ACCOUNT` (and any other `SIGNAL_*` vars) from `.env`
3. Rebuild and restart

If you also want to unlink the Signal account from `signal-cli`:

```bash
signal-cli -a +1YOURNUMBER removeDevice --deviceId <id>
```

(Find the device id with `signal-cli -a +1YOURNUMBER listDevices`.)
