---
title: "source-command-ccguide-daily"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/source-command-ccguide-daily/SKILL.md"
sourceRel: ".agents/skills/source-command-ccguide-daily/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/source-command-ccguide-daily/SKILL.md"
sourceSha256: "6b22eebacbb3d489e865107831560ba5be5daa48d103da38e85bb7539a1cb408"
pageSha256: "6b22eebacbb3d489e865107831560ba5be5daa48d103da38e85bb7539a1cb408"
contentMode: "local-full"
zh: ""
---

# source-command-ccguide-daily

Use this skill when the user asks to run the migrated source command `ccguide-daily`.

## Command Template

Run this sequence in order. Present results as one consolidated report.

## Step 1 — Refresh official docs

Call `refresh_official_docs` MCP tool to fetch the latest Anthropic docs and update the current snapshot.

If it fails (no baseline), tell the user to run /ccguide:init-docs once first, then stop.

## Step 2 — Diff official docs

Call `diff_official_docs` MCP tool to compare baseline vs refreshed current.

## Step 3 — Guide + CC releases digest

Call `get_digest` MCP tool with period: "day"

---

## Output format

Present everything as a single daily briefing:

```
# Daily Codex Update — {today's date}

## Official Anthropic Docs
{diff results — added/removed/modified sections, or "No changes"}

## Guide + CC CLI
{digest results — guide CHANGELOG entries + CC releases from last 24h, or "No changes"}

---
Docs snapshot: {baseline date} → {current date}
```

Rules:
- If no changes anywhere: say so clearly in one line, no padding
- Reproduce ALL URLs verbatim (source URLs, GitHub links)
- If official docs unchanged AND no guide/CC updates: "Nothing changed in the last 24h."
- Keep it dense — this is a daily briefing, not a report
