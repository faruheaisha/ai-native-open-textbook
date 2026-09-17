---
title: "Mode A — Print in chat"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/print.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/print.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/delivery-options/print.md"
sourceSha256: "8bc3b97602c1de40a639b6e4d323788b4efaa93a086ee405fb888bccc5ea34c6"
pageSha256: "8bc3b97602c1de40a639b6e4d323788b4efaa93a086ee405fb888bccc5ea34c6"
contentMode: "local-full"
zh: ""
---

# Mode A — Print in chat

Default. Render fenced code blocks for each file, in this order:

1. **Bicep:** `main.bicep` + the `az deployment group create` command at the bottom
2. **Terraform:** `main.tf` + `variables.tf` (separate fenced blocks) + the `terraform init && terraform apply` command
3. **bash:** the single script

Append a one-liner reminder: *"Want me to save this to disk or open a PR? Just ask."* — so the user can shift to Mode B/C without restarting.
