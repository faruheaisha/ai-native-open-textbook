---
title: "Fast Inspection Commands"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/skill-review/references/inspection-commands.md"
sourceRel: ".agents/skills/skill-review/references/inspection-commands.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/skill-review/references/inspection-commands.md"
sourceSha256: "a92f989c121cdacc6d26eaba6cdce9878557539f40b6c90381d6b534715b7112"
pageSha256: "a92f989c121cdacc6d26eaba6cdce9878557539f40b6c90381d6b534715b7112"
contentMode: "local-full"
zh: ""
---

# Fast Inspection Commands

Use these as starting points, adapted to the repo:

```bash
rg --files -g 'SKILL.md' -g '*.md' -g '*.mjs' -g '*.ts' -g '*.tsx'
rg -n "TODO|placeholder|subagent|Canvas|qoder/canvas|Moderate|<dimension>"
wc -l path/to/SKILL.md path/to/references/*.md path/to/templates/*.md
