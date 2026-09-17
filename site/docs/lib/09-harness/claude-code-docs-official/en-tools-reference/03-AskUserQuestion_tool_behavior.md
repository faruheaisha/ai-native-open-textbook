---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "1a1dbbbba15ba2348aab8e84ccca438ebeb7e0d8e6a85f1b9c629b3cca31d163"
contentMode: "local-full"
zh: ""
---

## AskUserQuestion tool behavior

Claude uses `AskUserQuestion` to ask you multiple-choice questions when it needs a decision or a clarification. Answer by picking an option, or type your own text through the `Other` row or the notes field.

When you answer by typing your own text, Claude Code relays the answer with neutral wording so Claude follows what you wrote, including a request to wait or explain first.

### Question auto-continue timeout

Questions stay open until you answer them. If you want a question you leave unanswered to eventually close and let Claude continue without you, set the [`askUserQuestionTimeout`](https://code.claude.com/docs/en/settings-reference#askuserquestiontimeout) setting to `60s`, `5m`, or `10m`, either in your user `settings.json` or from the **Question auto-continue timeout** row in `/config`.

After a question sits that long with no input, the dialog closes on its own: it submits any options you'd already selected and tells Claude you may be away from your keyboard, so Claude proceeds on its own judgment and can re-ask later. You see a countdown for the last 20 seconds. Press any key to restart the timer; on terminals that report focus, switching to the window restarts it too.

The timeout applies only to `AskUserQuestion`'s multiple-choice questions; permission prompts, including plan approval, never auto-resolve on idle.
