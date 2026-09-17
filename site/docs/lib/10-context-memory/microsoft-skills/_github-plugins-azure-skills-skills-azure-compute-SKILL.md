---
title: "Azure Compute Skill"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/SKILL.md"
sourceSha256: "a628ba7b4ed8aee7eb7a559b99f776a909bd6d7cac0f6a3fc19053a42d5ee60f"
pageSha256: "a628ba7b4ed8aee7eb7a559b99f776a909bd6d7cac0f6a3fc19053a42d5ee60f"
contentMode: "local-full"
zh: ""
---

# Azure Compute Skill

Routes Azure VM and Virtual Machine Scale Set (VMSS) requests to the right workflow.

## When to Use This Skill

- User wants to **recommend, compare, or price** a VM or VMSS
- User wants to **create, provision, or deploy** a VM or VMSS
- User asks about **Capacity Reservation Groups** (CRG) — reserve, guarantee capacity, pre-provision
- User asks about **Essential Machine Management** (EMM) — machine enrollment, monitor

**Disambiguate with `azure-prepare`:** if the user wants to deploy an **application** (Docker service, web app, API, serverless workload), route to `azure-prepare`. `vm-creator` is for **bare VM/VMSS infrastructure** only.

## Routing

**Mandatory workflow-first routing:** never route directly to `references/*` files. First classify the user intent below, open the matched workflow file, then load only the reference files that workflow requests. Reference files are supporting material, not entry points. If the intent is unclear, ask a clarifying question to disambiguate between the workflows.

| Workflow | File | Use when |
|---|---|---|
| **VM Recommender** | [vm-recommender.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-recommender-vm-recommender) | User asks which VM/VMSS to choose, whether to use VMSS/autoscaling, wants pricing, or wants to compare options |
| **VM Creator** | [vm-creator.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-vm-creator) | User wants to create, provision, or deploy a bare VM or VMSS (not an app deployment) |
| **Capacity Reservation** | [capacity-reservation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-capacity-reservation-capacity-reservation) | User needs to reserve / guarantee VM capacity (CRG create / associate / disassociate) |
| **Essential Machine Management** | [essential-machine-management.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-essential-machine-management-essential-machine-management) | User asks about EMM / machine enrollment / monitor |
