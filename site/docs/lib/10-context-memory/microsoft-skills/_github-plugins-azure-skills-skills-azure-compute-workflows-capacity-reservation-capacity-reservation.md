---
title: "Azure Capacity Reservation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/capacity-reservation.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/capacity-reservation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/capacity-reservation/capacity-reservation.md"
sourceSha256: "22a5796f73e302c86e72c5c03fe361f29083943700b00b709778976e0a8d23bf"
pageSha256: "22a5796f73e302c86e72c5c03fe361f29083943700b00b709778976e0a8d23bf"
contentMode: "local-full"
zh: ""
---

# Azure Capacity Reservation

Helps users create and configure Azure Capacity Reservation Groups (CRGs) to guarantee VM compute capacity in a specific region without deploying VMs.

## Reference Files

Read these before responding to the user:

| Signal                                           | Reference                                                                    |
|--------------------------------------------------|------------------------------------------------------------------------------|
| General CRG concepts, CLI commands, finding CRGs | [Capacity Reservation Overview](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-capacity-reservation-references-capacity-reservation-overview) |
| Associate/disassociate VM or VMSS with a CRG     | [Association & Disassociation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-capacity-reservation-references-association-disassociation)     |

## When to Use This Workflow

Activate this workflow when the user explicitly asks about Capacity Reservation Groups (CRGs) or capacity reservations.

Also **proactively suggest** CRG when the user's scenario matches any of these patterns:

- **Deployment failure is unacceptable** — disaster recovery, customer-facing services, or mission-critical workloads where capacity unavailability would cause an outage
- **Known scale-out events** — product launches, seasonal traffic spikes, or planned migrations where capacity must be guaranteed ahead of time
- **In-demand SKUs** — GPU, high-memory, or new/popular VM sizes that are frequently capacity-constrained
- **Specific SKU + zone + region required** — the workload cannot fall back to a different size, zone, or region
- **Centralized capacity pooling** — capacity is being managed centrally across multiple subscriptions (CRGs support cross-subscription sharing)

> **Note:** CRGs are typically used for critical workloads only, not all deployments. They are SLA-backed but billed at pay-as-you-go rates whether capacity is consumed or not.

## Key Concepts

| Concept                           | Description                                                                                                      |
|-----------------------------------|------------------------------------------------------------------------------------------------------------------|
| **Capacity Reservation Group**    | A logical container that holds one or more capacity reservations; must be associated with VMs at deployment time |
| **Capacity Reservation**          | A reservation for a specific VM size and quantity in a specific Availability Zone                                |
| **Scope**                         | CRGs are scoped to a single Azure region and subscription                                                        |
| **Billing**                       | Charges begin as soon as the reservation is created, whether or not VMs are deployed against it                  |

## Workflow

### Step 1: Gather Requirements

Ask the user for (infer when possible, except where noted):

| Requirement              | Required | Notes                                                                                                                                                                                                  |
|--------------------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Region**               | Yes      | Infer from context if possible (e.g., eastus, westeurope)                                                                                                                                              |
| **VM size(s)**           | Yes      | e.g., Standard_D4s_v5, Standard_E8s_v5                                                                                                                                                                 |
| **Quantity**             | Yes      | **Always ask — do not infer.**                                                                                                                                                                         |
| **Availability Zone(s)** | No       | CRGs can be created without zones. Only include zones if the user explicitly requests a zonal reservation. **Do not pick a zone on the user's behalf** unless they explicitly ask for any/random zone  |
| **Resource group**       | Yes      | Existing or new resource group name                                                                                                                                                                    |

### Step 2: Create Capacity Reservation Group and Reservation

> ⚠️ **PowerShell users:** Replace `\` line continuations with backticks (`` ` ``) or collapse commands to a single line.

```bash
# Create the CRG
# Zonal (specify one or more zones the group will support):
az capacity reservation group create \
