---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "243e953e0fad8a022a1882aa30a43f5a1abe25fdf120851f162c7e5951922eac"
contentMode: "local-full"
zh: ""
---

#### Approach B: SessionEnd hook (automatic, AI-generated)

A `SessionEnd` hook reads the session's JSONL file directly from `~/.claude/projects/`, extracts the first few user messages as context, and calls `claude -p --model claude-haiku-4-5-20251001` to generate a 4-6 word descriptive title. If Haiku is unavailable, it falls back to a sanitized version of the first message.

The hook updates both `sessions-index.jsonl` (for custom session browsers) and the slug field in the JSONL file (for native `/resume` compatibility).

```json
// .claude/settings.json
{
  "hooks": {
    "SessionEnd": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/auto-rename-session.sh"
          }
        ]
      }
    ]
  }
}
```

Requirements: `claude` CLI on PATH, `python3` for JSON parsing. Set `SESSION_AUTORENAME=0` to disable for a specific session.

After the session ends, the `/resume` picker shows `"fix auth middleware"` instead of `"2026-03-04T14:23..."`.
