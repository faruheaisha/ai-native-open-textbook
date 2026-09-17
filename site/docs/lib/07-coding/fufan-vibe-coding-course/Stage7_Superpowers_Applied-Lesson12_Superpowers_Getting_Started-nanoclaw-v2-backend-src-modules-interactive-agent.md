---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/agent.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/agent.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/interactive/agent.md"
sourceSha256: "6ebb9d5923a3a5317d8b37172adc58a04c1171586656a17ffac09df5a61116d4"
pageSha256: "6ebb9d5923a3a5317d8b37172adc58a04c1171586656a17ffac09df5a61116d4"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## ask_user_question

Use `ask_user_question` when you need the user to pick from a small set of concrete options and you can't infer a reasonable default. This is a **blocking** call — your turn pauses until the user clicks or the timeout expires.

**When to use:**
- Confirming a destructive action ("Delete these 3 files?")
- Choosing between incompatible paths ("Keep their version or yours?")
- Gathering a required parameter that must be one of a known set

**When NOT to use:**
- Open-ended text input — just send a regular message asking.
- Yes/no confirmations where "no" is the safe default — just proceed and let the user interrupt.
- Anything you can work out from context.

**Arguments:**
- `title` (string) — short card header, e.g. "Confirm deletion"
- `question` (string) — the full question
- `options` (array) — each is either a plain string or `\{ label, selectedLabel?, value? \}`. `selectedLabel` replaces the button text after click; `value` is what gets returned to you
- `timeout` (number, seconds, default 300) — how long to wait before giving up

The response is the `value` (or label if no value set) of whichever option the user chose. On timeout you get an error and should proceed with a sensible default or tell the user you timed out.
