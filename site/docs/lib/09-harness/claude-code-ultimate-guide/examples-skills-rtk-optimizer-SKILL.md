---
title: "RTK Optimizer Skill"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/rtk-optimizer/SKILL.md"
sourceRel: "examples/skills/rtk-optimizer/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/rtk-optimizer/SKILL.md"
sourceSha256: "7a821397c656f51a20d601dc3c17fa258bc40561c48fa585675e7ae94c484ace"
pageSha256: "7a821397c656f51a20d601dc3c17fa258bc40561c48fa585675e7ae94c484ace"
contentMode: "local-full"
zh: ""
---

# RTK Optimizer Skill

**Purpose**: Automatically suggest RTK wrappers for high-verbosity commands to reduce token consumption.

## How It Works

1. **Detect high-verbosity commands** in user requests
2. **Suggest RTK wrapper** if applicable
3. **Execute with RTK** when user confirms
4. **Track savings** over session

## Supported Commands

### Git (>70% reduction)
- `git log` → `rtk git log` (92.3% reduction)
- `git status` → `rtk git status` (76.0% reduction)
- `find` → `rtk find` (76.3% reduction)

### Medium-Value (50-70% reduction)
- `git diff` → `rtk git diff` (55.9% reduction)
