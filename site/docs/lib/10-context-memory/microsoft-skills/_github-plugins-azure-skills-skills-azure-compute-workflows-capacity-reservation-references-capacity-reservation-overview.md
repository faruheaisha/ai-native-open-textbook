---
title: "Capacity Reservation Overview"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/capacity-reservation-overview.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/capacity-reservation-overview.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/references/capacity-reservation-overview.md"
sourceSha256: "7d0b2db6aa1d2abfec64bc2c5353f10f000232c4dcda6ac9db11bfccae0c32e3"
pageSha256: "7d0b2db6aa1d2abfec64bc2c5353f10f000232c4dcda6ac9db11bfccae0c32e3"
contentMode: "local-full"
zh: ""
---

# Capacity Reservation Overview

Reference material for Azure Capacity Reservation Groups and Capacity Reservations.

## What Is a Capacity Reservation Group?

A Capacity Reservation Group (CRG) is a logical container for one or more capacity reservations. It acts as the association point for VMs and VMSS — you associate a VM or scale set with the **group**, and Azure matches the VM to a suitable reservation within that group.

## Constraints

| Constraint                     | Detail                                                                                                     |
|--------------------------------|------------------------------------------------------------------------------------------------------------|
| **Region-scoped**              | A CRG and all its reservations must be in the same Azure region                                            |
| **Zone-specific**              | Each reservation targets a specific Availability Zone (or is non-zonal)                                    |
| **Subscription-scoped**        | A CRG lives in a single subscription but can be shared with other subscriptions via the `sharing` property |
| **VM size per reservation**    | Each capacity reservation covers exactly one VM size                                                       |
| **Billing starts immediately** | You are charged for reserved capacity whether or not VMs are running against it                            |

## Association and Disassociation

See [association-disassociation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-capacity-reservation-references-association-disassociation) for how to associate and disassociate VMs/VMSS with a CRG.

## Common CLI Commands

| Action                      | Command                                                                                                     |
|-----------------------------|-------------------------------------------------------------------------------------------------------------|
| List CRGs                   | `az capacity reservation group list`                                                                        |
| Show CRG                    | `az capacity reservation group show -g <rg> -n <crg> --instance-view`                                       |
| Delete CRG                  | `az capacity reservation group delete -g <rg> -n <crg>`                                                     |
| List reservations           | `az capacity reservation list -g <rg> --capacity-reservation-group <crg>`                                   |
