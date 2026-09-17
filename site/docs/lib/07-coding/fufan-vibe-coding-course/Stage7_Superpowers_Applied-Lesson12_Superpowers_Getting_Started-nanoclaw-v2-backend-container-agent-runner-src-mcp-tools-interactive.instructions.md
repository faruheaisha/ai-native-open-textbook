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
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/interactive.instructions.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/interactive.instructions.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/container/agent-runner/src/mcp-tools/interactive.instructions.md"
sourceSha256: "026cc39842332c5efe3d04ded342fb8e97b0db78556e361aa0ebc0c83e0570d9"
pageSha256: "026cc39842332c5efe3d04ded342fb8e97b0db78556e361aa0ebc0c83e0570d9"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Interactive prompts

The two tools here solve different problems: `ask_user_question` forces a decision and waits for it; `send_card` displays structured content and moves on.

### Asking a multiple-choice question (`ask_user_question`)

`mcp__nanoclaw__ask_user_question(\{ title, question, options, timeout? \})` presents the user with a set of choices and **blocks your turn** until they tap one or the timeout expires (default: 300 seconds). Returns their chosen value.

`options` can be plain strings or `\{ label, selectedLabel?, value? \}` objects:
- `label` — the button text shown before selection
- `selectedLabel` — the text shown on the button *after* selection (useful for confirmations, e.g. `"✓ Confirmed"`)
- `value` — the string returned to you when that option is chosen (defaults to `label`)

Use this when you genuinely cannot proceed without a decision. For free-text input, send a normal message and wait for their reply — don't reach for this tool.

### Structured cards (`send_card`)

`mcp__nanoclaw__send_card(\{ card, fallbackText? \})` renders a structured card and **returns immediately** — it does not pause your turn or collect a response.

`card` supports: `title`, `description`, `children` (nested text or content blocks), and `actions` (buttons). `fallbackText` is sent as a plain message on platforms without card support.

Use this for presenting information in a cleaner format than prose: summaries, options the user can read (but you're not waiting on), or results with contextual buttons. If you need the user to actually *choose* something and return a value, use `ask_user_question` instead.
