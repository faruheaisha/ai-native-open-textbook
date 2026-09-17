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
sourceRel: "en/interactive-mode.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/interactive-mode.md"
sourceSha256: "a43f4a145320ecff8da141c321f3220246884acb226285095ad0ff123ceb2b60"
pageSha256: "79efaccf00c69cde9553add0d431c278c98cac49fe78d319c0cac920e01bcda5"
contentMode: "local-full"
zh: ""
---

## Session recap

When you return to the terminal after stepping away, Claude Code shows a one-line recap of what happened in the session so far. The recap generates in the background once at least three minutes have passed since the last completed turn and the terminal is unfocused, so it's ready when you switch back. Recaps only appear once the session has at least three turns, and never twice in a row.

Run `/recap` to generate a summary on demand. Claude Code caps both automatic recaps and `/recap` output at 400 characters. To turn automatic recaps off, open `/config` and turn off **Session recap**.

Session recap is on by default for every plan and provider. The recap is always skipped in non-interactive mode.
