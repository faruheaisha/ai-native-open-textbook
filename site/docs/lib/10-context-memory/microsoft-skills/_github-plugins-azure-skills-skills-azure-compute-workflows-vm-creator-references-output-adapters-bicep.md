---
title: "Bicep adapter"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/bicep.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/bicep.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/bicep.md"
sourceSha256: "ab54837a3cde78093ebb59875c0cb1f471c57ee786d8b7d417f808cf94b56439"
pageSha256: "ab54837a3cde78093ebb59875c0cb1f471c57ee786d8b7d417f808cf94b56439"
contentMode: "local-full"
zh: ""
---

# Bicep adapter

Production IaC, repeatable deployments, supports `az deployment group what-if` preview before commit.

## Template

Emit [`examples/bicep/main.bicep`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/examples/bicep/main.bicep) alongside the README. Single-file template — no modules to wire. Parameters (`vmName`, `adminUsername`, `adminPublicKey` required; others have defaults).

Always emit `examples/bicep/README.md` next to the template so the artifact is self-contained (Plan Card, prereqs, quickstart, parameter table, cleanup).

## Deploy

```bash
az deployment group what-if \
  --resource-group {resourceGroup} \
  --template-file main.bicep \
  --parameters vmName={vmName} adminUsername={adminUsername} \
               adminPublicKey="$(cat ~/.ssh/id_rsa.pub)"

az deployment group create \
  --resource-group {resourceGroup} \
  --template-file main.bicep \
  --parameters vmName={vmName} adminUsername={adminUsername} \
               adminPublicKey="$(cat ~/.ssh/id_rsa.pub)"
```

Always run `what-if` first — it's free and surfaces any quota / role / naming conflict before the change lands.

## VMSS

Swap `Microsoft.Compute/virtualMachines@2024-07-01` for `Microsoft.Compute/virtualMachineScaleSets@2024-07-01`. Add `sku: \{ name: vmSize, capacity: instanceCount \}`, `properties.orchestrationMode: 'Flexible'`, and move `osProfile` / `storageProfile` / `networkProfile` inside `properties.virtualMachineProfile`.

## Notes
- Secure params (`adminPassword`, `adminPublicKey`) are `@secure()`; don't echo them in logs.
- For `zone`, pass `'1'`/`'2'`/`'3'` to pin a zone, or `''` for regional. The template handles both via `empty(zone) ? null : [zone]`.
- For private VMs, set `publicIPAllocationMethod` to nothing and drop the `publicIPAddress` block from the NIC.
