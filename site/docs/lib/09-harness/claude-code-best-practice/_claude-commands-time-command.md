---
title: "Time Command"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/.claude/commands/time-command.md"
sourceRel: ".claude/commands/time-command.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/.claude/commands/time-command.md"
sourceSha256: "803df4e451d79a56827376f6161387206c92f9fdb924d0926c9adb7c3050cfb7"
pageSha256: "803df4e451d79a56827376f6161387206c92f9fdb924d0926c9adb7c3050cfb7"
contentMode: "local-full"
zh: ""
---

# Time Command

Display the current date and time in Pakistan Standard Time (PKT, UTC+5).

## Instructions

1. Run the following bash command to get the current time in PKT:
   ```
   TZ='Asia/Karachi' date '+%Y-%m-%d %H:%M:%S %Z'
   ```

2. Display the result to the user in this format:
   ```
   Current Time in Pakistan (PKT): YYYY-MM-DD HH:MM:SS PKT
   ```

## Requirements

- Always use the `Asia/Karachi` timezone (UTC+5)
- Use 24-hour format
- Include the date alongside the time
- Keep the output concise
