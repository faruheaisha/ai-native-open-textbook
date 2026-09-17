---
title: "Associating and Disassociating VMs/VMSS with a Capacity Reservation Group"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/association-disassociation.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/association-disassociation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/association-disassociation.md"
sourceSha256: "a4a66d61870b13b91be7e008161f6a293509692aa3f8695ea1f19b9b6b73505d"
pageSha256: "a4a66d61870b13b91be7e008161f6a293509692aa3f8695ea1f19b9b6b73505d"
contentMode: "local-full"
zh: ""
---

# Associating and Disassociating VMs/VMSS with a Capacity Reservation Group

## Association Model

```text
Capacity Reservation Group (CRG)
├── Capacity Reservation: Standard_D4s_v5 × 5 (Zone 1)
├── Capacity Reservation: Standard_D4s_v5 × 3 (Zone 2)
└── Capacity Reservation: Standard_E8s_v5 × 2 (Zone 1)

VM / VMSS
└── capacityReservationGroup.id = <CRG resource ID>
    └── Azure auto-matches to a reservation with the right VM size + zone
```

### Associating VMs

Set the `capacityReservationGroup` property when creating or updating a VM.

#### New VM

```bash
az vm create \
  -g <rg> \
