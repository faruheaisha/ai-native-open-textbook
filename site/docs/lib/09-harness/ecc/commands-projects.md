---
title: "Projects Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/projects.md"
sourceRel: "commands/projects.md"
rawUrl: "/raw/09-harness/ecc/commands/projects.md"
sourceSha256: "dc939242028d24119b985e6ad4fee3d6c8185f6bd19c716535384149bc9876f3"
pageSha256: "dc939242028d24119b985e6ad4fee3d6c8185f6bd19c716535384149bc9876f3"
contentMode: "local-full"
zh: ""
---

# Projects Command

List project registry entries and per-project instinct/observation counts for continuous-learning-v2.

## Implementation

Run the instinct CLI using the plugin root path:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/skills/continuous-learning-v2/scripts/instinct-cli.py" projects
```

Or if `CLAUDE_PLUGIN_ROOT` is not set (manual installation):

```bash
python3 ~/.claude/skills/continuous-learning-v2/scripts/instinct-cli.py projects
```

## Usage

```bash
/projects
```

## What to Do

1. Read `~/.claude/homunculus/projects.json`
2. For each project, display:
   - Project name, id, root, remote
   - Personal and inherited instinct counts
   - Observation event count
   - Last seen timestamp
3. Also display global instinct totals
