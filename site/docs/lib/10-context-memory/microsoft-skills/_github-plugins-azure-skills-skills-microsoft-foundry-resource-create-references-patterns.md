---
title: "Common Patterns: Create Foundry Resource"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/patterns.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/patterns.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/create/references/patterns.md"
sourceSha256: "b318d57456501d49d2f6aa86db2df11c579c61e2288591a4d9fdcad999b33df0"
pageSha256: "b318d57456501d49d2f6aa86db2df11c579c61e2288591a4d9fdcad999b33df0"
contentMode: "local-full"
zh: ""
---

# Common Patterns: Create Foundry Resource

**Table of Contents:** [Pattern A: Quick Setup](#pattern-a-quick-setup) · [Pattern B: Multi-Region Setup](#pattern-b-multi-region-setup) · [Quick Commands Reference](#quick-commands-reference)

## Pattern A: Quick Setup

Complete setup in one go:

```bash
# Ask user: "Use existing resource group or create new?"

# ==== If user chooses "Use existing" ====
# Count and list existing resource groups
TOTAL_RG_COUNT=$(az group list --query "length([])" -o tsv)
az group list --query "[-5:].{Name:name, Location:location}" --out table

# Based on count: show appropriate list and options
# User selects resource group
