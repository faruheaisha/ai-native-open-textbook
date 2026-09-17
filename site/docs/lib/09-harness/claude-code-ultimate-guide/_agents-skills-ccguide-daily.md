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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.agents/skills/ccguide/daily.md"
sourceRel: ".agents/skills/ccguide/daily.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.agents/skills/ccguide/daily.md"
sourceSha256: "ad62e225825a46a280a4c93845e437ee345970e24af77817ac1d28df5efb9845"
pageSha256: "ad62e225825a46a280a4c93845e437ee345970e24af77817ac1d28df5efb9845"
contentMode: "local-full"
zh: ""
---

# Claude Code Ultimate Guide

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
# Daily Claude Code Update — {today's date}

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
