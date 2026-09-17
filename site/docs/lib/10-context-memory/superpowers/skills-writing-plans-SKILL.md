---
title: "Writing Plans"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/skills/writing-plans/SKILL.md"
sourceRel: "skills/writing-plans/SKILL.md"
rawUrl: "/raw/10-context-memory/superpowers/skills/writing-plans/SKILL.md"
sourceSha256: "48508f44bbfd7d24b029fbf3a314f3cd14c9615599059366e922f47b8dc08cf2"
pageSha256: "48508f44bbfd7d24b029fbf3a314f3cd14c9615599059366e922f47b8dc08cf2"
contentMode: "local-full"
zh: ""
---

# Writing Plans

## Overview

Write comprehensive implementation plans assuming the engineer has zero context for our codebase and questionable taste. Document everything they need to know: which files to touch for each task, code, testing, docs they might need to check, how to test it. Give them the whole plan as bite-sized tasks. DRY. YAGNI. TDD. Frequent commits.

Assume they are a skilled developer, but know almost nothing about our toolset or problem domain. Assume they don't know good test design very well.

**Announce at start:** "I'm using the writing-plans skill to create the implementation plan."

**Context:** If working in an isolated worktree, it should have been created via the `superpowers:using-git-worktrees` skill at execution time.
