---
title: "Time SVG Creator Skill"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/agent-teams/.claude/skills/time-svg-creator/SKILL.md"
sourceRel: "agent-teams/.claude/skills/time-svg-creator/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/agent-teams/.claude/skills/time-svg-creator/SKILL.md"
sourceSha256: "c5464a3aeb2b7a2cef37c05329c9db88fa14495cd5c13303aecf41ac9e1a42fb"
pageSha256: "c5464a3aeb2b7a2cef37c05329c9db88fa14495cd5c13303aecf41ac9e1a42fb"
contentMode: "local-full"
zh: ""
---

# Time SVG Creator Skill

Creates a visual SVG time card for Dubai, UAE and writes the output files.

## Task

You will receive three fields from the calling context: `time`, `timezone`, and `formatted`. Create an SVG time card and write both the SVG and a markdown summary.

## Instructions

1. **Create SVG** — Use the SVG template from [reference.md](/lib/09-harness/claude-code-best-practice/agent-teams-_claude-skills-time-svg-creator-reference), replacing placeholders with actual values
2. **Write SVG file** — Write to `agent-teams/output/dubai-time.svg`
3. **Write summary** — Write to `agent-teams/output/output.md` using the markdown template from [reference.md](/lib/09-harness/claude-code-best-practice/agent-teams-_claude-skills-time-svg-creator-reference)

## Rules

- Use the EXACT time values provided — NEVER re-fetch or recalculate
- The SVG must be self-contained and valid
- Both output files go in the `agent-teams/output/` directory

## Additional resources

- For SVG template, output template, and design specs, see [reference.md](/lib/09-harness/claude-code-best-practice/agent-teams-_claude-skills-time-svg-creator-reference)
- For example input/output pairs, see [examples.md](/lib/09-harness/claude-code-best-practice/agent-teams-_claude-skills-time-svg-creator-examples)
