---
title: "Skill Creator"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/skill-creator/SKILL.md"
sourceRel: "examples/skills/skill-creator/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/skill-creator/SKILL.md"
sourceSha256: "0f66ac6982ee11ef3d0cf2e8c0508e6d47e4240ade9d7fb12707bcc03c0817f2"
pageSha256: "0f66ac6982ee11ef3d0cf2e8c0508e6d47e4240ade9d7fb12707bcc03c0817f2"
contentMode: "local-full"
zh: ""
---

# Skill Creator

Generate new Claude Code skills with correct directory structure, YAML frontmatter, and optional bundled resources.

## When to Use

- Creating a new custom skill for a project
- Standardizing skill structure across a team
- Generating skill templates with scripts, references, and assets
- Packaging skills for distribution

## Skill Directory Structure

```
skill-name/
├── SKILL.md          # Required: Main skill file with YAML frontmatter
├── scripts/          # Optional: Executable code for deterministic tasks
├── references/       # Optional: Documentation loaded contextually
└── assets/           # Optional: Templates, images, boilerplate (not loaded into context)
```

## Workflow

### 1. Create the Skill

```
Create a new skill called "my-skill-name" in ~/.claude/skills/
```

Or with a specific purpose:

```
Create a skill for generating release notes from git commits,
with templates for CHANGELOG.md and Slack announcements
```

Or via the initialization script:

```bash
