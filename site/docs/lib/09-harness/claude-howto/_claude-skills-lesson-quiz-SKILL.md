---
title: "Lesson Quiz"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/.claude/skills/lesson-quiz/SKILL.md"
sourceRel: ".claude/skills/lesson-quiz/SKILL.md"
rawUrl: "/raw/09-harness/claude-howto/.claude/skills/lesson-quiz/SKILL.md"
sourceSha256: "faa945958ad50ac3cf31a7f30bc80316b94ae034ed9d8bbec9103eca3413c48d"
pageSha256: "faa945958ad50ac3cf31a7f30bc80316b94ae034ed9d8bbec9103eca3413c48d"
contentMode: "local-full"
zh: ""
---

# Lesson Quiz

Interactive quiz that tests understanding of a specific Claude Code lesson with 8-10 questions, provides per-question feedback, and identifies areas to review.

## Prerequisites

This skill requires:

- The tutorial repo checked out, so the lesson directories `01-slash-commands/` … `10-cli/` and each `README.md` are readable.
- `references/question-bank.md` present in this skill (the source of all questions).

Before starting, confirm the target lesson's `README.md` exists. If it is missing, do not fabricate questions — warn the user and ask them to check the repository structure (see Error Handling).

**Guardrails:**

- **Never invent questions or answers.** Ask only questions drawn from `references/question-bank.md` for the selected lesson; if the bank lacks entries for a lesson, say so rather than making them up.
- **Score accurately.** Track which shuffled position holds the correct answer for every question and validate each response against it — never guess a score.
- **Confirm timing before scoring.** The pre/during/after choice changes how results are framed; do not skip it.

## Instructions

### Step 1: Determine the Lesson

If the user provided a lesson as an argument (e.g., `/lesson-quiz hooks` or `/lesson-quiz 03`), map it to the lesson directory:

**Lesson mapping:**
- `01`, `slash-commands`, `commands` → 01-slash-commands
- `02`, `memory` → 02-memory
- `03`, `skills` → 03-skills
- `04`, `subagents`, `agents` → 04-subagents
- `05`, `mcp` → 05-mcp
- `06`, `hooks` → 06-hooks
- `07`, `plugins` → 07-plugins
- `08`, `checkpoints`, `checkpoint` → 08-checkpoints
- `09`, `advanced`, `advanced-features` → 09-advanced-features
- `10`, `cli` → 10-cli

If no argument was provided, present a selection prompt using AskUserQuestion:

**Question 1** (header: "Lesson"):
"Which lesson do you want to quiz on?"
Options:
1. "Slash Commands (01)" — Custom commands, skills, frontmatter, arguments
2. "Memory (02)" — CLAUDE.md, memory hierarchy, rules, auto memory
3. "Skills (03)" — Progressive disclosure, auto-invocation, SKILL.md
4. "Subagents (04)" — Task delegation, agent config, isolation

**Question 2** (header: "Lesson"):
"Which lesson do you want to quiz on? (continued)"
Options:
1. "MCP (05)" — External integration, transport, servers, tool search
2. "Hooks (06)" — Event automation, PreToolUse, exit codes, JSON I/O
3. "Plugins (07)" — Bundled solutions, marketplace, plugin.json
4. "More lessons..." — Checkpoints, Advanced Features, CLI

If "More lessons..." is selected, present:

**Question 3** (header: "Lesson"):
"Select your lesson:"
Options:
1. "Checkpoints (08)" — Rewind, restore, safe experimentation
2. "Advanced Features (09)" — Planning, permissions, print mode, thinking
3. "CLI Reference (10)" — Flags, output formats, scripting, piping

### Step 2: Read the Lesson Content

Read the lesson README.md file to refresh context:
