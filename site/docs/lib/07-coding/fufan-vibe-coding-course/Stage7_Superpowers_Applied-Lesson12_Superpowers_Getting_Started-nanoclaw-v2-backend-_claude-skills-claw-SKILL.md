---
title: "claw — NanoClaw CLI"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/claw/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/claw/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/claw/SKILL.md"
sourceSha256: "edbf557a070727526487ca3087ea8935fd1b873eec0d338a3d13fffd9bd7e98d"
pageSha256: "edbf557a070727526487ca3087ea8935fd1b873eec0d338a3d13fffd9bd7e98d"
contentMode: "local-full"
zh: ""
---

# claw — NanoClaw CLI

`claw` is a Python CLI that sends prompts directly to a NanoClaw agent container from the terminal. It reads registered groups from the NanoClaw database, picks up secrets from `.env`, and pipes a JSON payload into a container run — no chat app required.

## What it does

- Send a prompt to any registered group by name, folder, or JID
- Default target is the main group (no `-g` needed for most use)
