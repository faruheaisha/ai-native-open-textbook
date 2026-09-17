---
title: "az CLI adapter"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/az-cli.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/az-cli.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/output-adapters/az-cli.md"
sourceSha256: "c46fa551183cfcd513fb16a4afa4f4e4c652e4bb0ed3a775dd552cb213990415"
pageSha256: "c46fa551183cfcd513fb16a4afa4f4e4c652e4bb0ed3a775dd552cb213990415"
contentMode: "local-full"
zh: ""
---

# az CLI adapter

Fast, portable, scriptable. Works anywhere `az` is installed and logged in.

## VM template

```bash
#!/usr/bin/env bash
set -euo pipefail

# {plan-card-summary}

az group create --name "{resourceGroup}" --location "{location}"

az vm create \
  --resource-group "{resourceGroup}" \
  --name "{vmName}" \
  --location "{location}" \
  --image "{image}" \
  --size "{vmSize}" \
  --admin-username "{adminUsername}" \
  --ssh-key-values @{sshKeyPath} \
  --vnet-name "{vnetName}" \
  --subnet "{subnetName}" \
  --nsg "{nsgName}" \
  --public-ip-address "{publicIpName}" \
  --zone {zone} \
  --os-disk-size-gb {osDiskSizeGb} \
  --storage-sku {osDiskType} \
  --tags {tagsKv}
```

## VMSS template

Replace `az vm create` with `az vmss create`, swap `--size` for `--vm-sku`, add `--instance-count \{n\}`, `--orchestration-mode Flexible`, `--upgrade-policy-mode Manual|Automatic|Rolling`.

## Filled example — dev Linux VM in eastus

```bash
#!/usr/bin/env bash
set -euo pipefail

# dev-vm | eastus | Ubuntu2404 | Standard_D2s_v5 | new VNet | est. $70/mo

az group create --name dev-vm-rg --location eastus

az vm create \
  --resource-group dev-vm-rg \
  --name dev-vm \
  --location eastus \
  --image Ubuntu2404 \
  --size Standard_D2s_v5 \
  --admin-username azureuser \
  --ssh-key-values @~/.ssh/id_rsa.pub \
  --vnet-name dev-vm-vnet \
  --subnet default \
  --nsg dev-vm-nsg \
  --public-ip-address dev-vm-ip \
  --os-disk-size-gb 30 \
  --storage-sku Premium_LRS \
  --tags env=dev owner=team-name
```

## Notes
- Windows VMs: swap `--ssh-key-values @...` for `--admin-password '\{password\}'`.
- Linux: prefer SSH keys (`~/.ssh/id_rsa.pub` or `~/.ssh/id_ed25519.pub`). Never paste private keys.
- `--zone` is optional; omit the flag entirely (don't pass empty) for regional VMs.
- `--tags` uses space-separated `k=v` pairs.
- Pre-check quota: `compute_vm_check-quota` (or `az vm list-usage --location \{location\} -o table`).
