---
title: "{vm-name} — Bicep"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/examples/bicep/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/examples/bicep/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/examples/bicep/README.md"
sourceSha256: "61a52989ee67dfe4ee30aeb88a06bd15460d3d61d9f1101f3d0d58c19d1e4852"
pageSha256: "61a52989ee67dfe4ee30aeb88a06bd15460d3d61d9f1101f3d0d58c19d1e4852"
contentMode: "local-full"
zh: ""
---

# \{vm-name\} — Bicep

Deploys a single Linux VM with VNet, subnet, NSG (SSH allow), public IP, and NIC.

## Prerequisites
- Azure CLI (`az login`)
- An existing resource group
- SSH public key at `~/.ssh/id_rsa.pub`

## Quickstart

```bash
az deployment group what-if \
  --resource-group {resourceGroup} \
  --template-file main.bicep \
  --parameters vmName={vmName} adminUsername={adminUsername} adminPublicKey="$(cat ~/.ssh/id_rsa.pub)"

az deployment group create \
  --resource-group {resourceGroup} \
  --template-file main.bicep \
  --parameters vmName={vmName} adminUsername={adminUsername} adminPublicKey="$(cat ~/.ssh/id_rsa.pub)"
```

## Parameters

| Name | Required | Default | Notes |
|---|---|---|---|
| `vmName` | * | — | VM resource name |
| `adminUsername` | * | — | Linux admin user |
| `adminPublicKey` | * | — | Contents of `id_rsa.pub` (secure) |
| `location` | | resourceGroup location | Azure region |
| `vmSize` | | `Standard_D2s_v5` | Verify availability with `compute_vm_list-skus` |
| `osDiskSizeGb` | | `30` | |
| `osDiskType` | | `Premium_LRS` | |
| `zone` | | `''` | `1`/`2`/`3`, or empty for regional |
| `tags` | | `\{\}` | |

## Outputs
- `vmId` — full ARM resource ID
- `publicIpAddress` — connect with `ssh \{adminUsername\}@\{publicIpAddress\}`

## VMSS variant
Swap `Microsoft.Compute/virtualMachines` for `Microsoft.Compute/virtualMachineScaleSets@2024-07-01`, add `sku: \{ name: vmSize, capacity: instanceCount \}`, `properties.orchestrationMode: 'Flexible'`, and move `osProfile`/`storageProfile`/`networkProfile` inside `properties.virtualMachineProfile`.

## Cleanup
```bash
az group delete --name {resourceGroup} --yes --no-wait
```
