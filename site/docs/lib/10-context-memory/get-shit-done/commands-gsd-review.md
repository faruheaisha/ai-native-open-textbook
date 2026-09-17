---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/review.md"
sourceRel: "commands/gsd/review.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/review.md"
sourceSha256: "6b46a87be7d432bb5c94ff8b9e089651d026dcc6bd8131ac02d14e81a32425ec"
pageSha256: "6b46a87be7d432bb5c94ff8b9e089651d026dcc6bd8131ac02d14e81a32425ec"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Invoke external AI CLIs (Gemini, Claude, Codex, OpenCode, Qwen Code, Cursor) to independently review phase plans.
Produces a structured REVIEWS.md with per-reviewer feedback that can be fed back into
planning via /gsd:plan-phase --reviews.

**Flow:** Detect CLIs → Build review prompt → Invoke each CLI → Collect responses → Write REVIEWS.md
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/review.md
&lt;/execution_context>

&lt;context>
Phase number: extracted from $ARGUMENTS (required)

**Flags:**
- `--gemini` — Include Gemini CLI review
- `--claude` — Include Claude CLI review (uses separate session)
- `--codex` — Include Codex CLI review
- `--opencode` — Include OpenCode review (uses model from user's OpenCode config)
- `--qwen` — Include Qwen Code review (Alibaba Qwen models)
- `--cursor` — Include Cursor agent review
- `--all` — Include all available CLIs
&lt;/context>

&lt;process>
Execute end-to-end.
&lt;/process>
