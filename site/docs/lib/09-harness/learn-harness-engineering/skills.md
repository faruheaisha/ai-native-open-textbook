---
title: "Skills"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/skills/README.md"
sourceRel: "skills/README.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/skills/README.md"
sourceSha256: "3ca0ffe918cdeadef70cd652f5ceec670478784dae4e1161ca349a25630a9039"
pageSha256: "3ca0ffe918cdeadef70cd652f5ceec670478784dae4e1161ca349a25630a9039"
contentMode: "local-full"
zh: ""
---

# Skills

This directory contains reusable AI agent skills for the Learn Harness Engineering project. Each skill is a self-contained prompt template that can be loaded by AI coding agents (Claude Code, Codex, Cursor, Windsurf, etc.) to perform specialized tasks.

## Available Skills

### harness-creator

Production harness engineering skill for AI coding agents. Helps create, assess, and improve agent harness files (AGENTS.md, feature lists, verification workflows, session continuity mechanisms).

- **7 reference patterns**: Memory Persistence, Skill Runtime, Context Engineering, Tool Registry, Multi-Agent Coordination, Lifecycle & Bootstrap, Gotchas
- **Templates**: AGENTS.md/CLAUDE.md, feature-list.json, init.sh, progress.md, session-handoff.md
- **Scripts**: scaffold, validate, render HTML assessment, run structural benchmark
- **10 built-in eval test cases**

See [harness-creator/README.md](/lib/09-harness/learn-harness-engineering/skills-harness-creator) for full documentation.

## How harness-creator Was Built

The `harness-creator` skill was developed using the **skill-creator** methodology — Anthropic's official meta-skill for creating, testing, and iterating on agent skills. The skill-creator provides a structured workflow (draft → test → evaluate → iterate) with built-in eval runners, graders, and a benchmark viewer.

- **skill-creator source**: [anthropics/skills — skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- **Anthropic Claude Code skills docs**: [anthropics/claude-code — plugin-dev/skills](https://github.com/anthropics/claude-code/tree/main/plugins/plugin-dev/skills)

## Directory Structure

```
skills/
├── README.md                    # This file
├── README-CN.md                 # Chinese version
├── README-ZH-TW.md              # Traditional Chinese version
├── README-JA.md                 # Japanese version
├── README-ES.md                 # Spanish version
├── README-FR.md                 # French version
├── README-AR.md                 # Arabic version
├── README-VI.md                 # Vietnamese version
├── README-DE.md                 # German version
├── README-TR.md                 # Turkish version
├── README-PT-BR.md              # Portuguese (Brazil) version
├── README-UK.md                 # Ukrainian version
└── harness-creator/             # Harness engineering skill
    ├── SKILL.md                 # Main skill definition
    ├── SKILL.md.en              # English-only version
    ├── README.md                # Detailed documentation
    ├── metadata.json            # Skill metadata & triggers
    ├── agents/                  # Skill UI metadata
    ├── scripts/                 # Scaffold, validate, benchmark helpers
    ├── evals/                   # Test cases
    ├── templates/               # Scaffold templates
    └── references/              # Deep-dive pattern docs
```

## How Skills Work

Each skill follows a standard structure:

1. **SKILL.md** — The entry point. Contains YAML frontmatter (name, description for triggering) and Markdown instructions for the agent.
2. **references/** — Additional docs loaded into context as needed.
3. **templates/** — Starting templates that the skill can generate for users.

Skills use progressive disclosure — the agent first sees only the name + description, then loads the full SKILL.md body when triggered, and reads bundled resources only when needed.

## Security Audit

All files in this directory have been audited for security:

- No backdoors, hidden URLs, or encoded payloads
- No data exfiltration or hardcoded credentials
- No command injection vulnerabilities
- Scripts use only Node.js built-in modules
- Generated `init.sh` runs detected project verification commands
