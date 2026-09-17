---
title: "Time Skill"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/skills/time-skill/SKILL.md"
sourceRel: ".claude/skills/time-skill/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/skills/time-skill/SKILL.md"
sourceSha256: "57ce908855a6c6ecfe22420e966bf863d1cf6b0684e951cb6c4c8bfaf68b2466"
pageSha256: "57ce908855a6c6ecfe22420e966bf863d1cf6b0684e951cb6c4c8bfaf68b2466"
contentMode: "local-full"
zh: ""
---

# Time Skill

This skill displays the current date and time in Pakistan Standard Time (PKT).

## Task

Display the current date and time in Pakistan Standard Time (UTC+5).

## Instructions

1. **Get Current Time**: Run the following bash command:
   ```
   TZ='Asia/Karachi' date '+%Y-%m-%d %H:%M:%S %Z'
   ```

2. **Display Result**: Show the time in this format:
   ```
   Current Time in Pakistan (PKT): YYYY-MM-DD HH:MM:SS PKT
   ```

## Requirements

- Always use the `Asia/Karachi` timezone (UTC+5)
- Use 24-hour format
- Include the date alongside the time
- Keep the output concise — no extra commentary
