---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/agent-teams/.claude/skills/time-fetcher/SKILL.md"
sourceRel: "agent-teams/.claude/skills/time-fetcher/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/agent-teams/.claude/skills/time-fetcher/SKILL.md"
sourceSha256: "ebb2b8cbd17d976ff7e4768d03b055adf67aaa9c1b5fb2467e4584ffaeb44cac"
pageSha256: "ebb2b8cbd17d976ff7e4768d03b055adf67aaa9c1b5fb2467e4584ffaeb44cac"
contentMode: "local-full"
zh: ""
---

# Claude Code Best Practice

## Dubai Time Fetcher

### Command

```bash
TZ='Asia/Dubai' date '+%Y-%m-%d %H:%M:%S %Z'
```

### Expected Output Format

`YYYY-MM-DD HH:MM:SS +04` (Gulf Standard Time)

### Timezone Details

- Timezone: Asia/Dubai
- Offset: UTC+4
- Abbreviation: GST (Gulf Standard Time)
- Dubai does not observe daylight saving time

### Return Format

Provide the following fields:
- `time`: Just the time portion (HH:MM:SS)
- `timezone`: "GST (UTC+4)"
- `formatted`: The full output string from the command
