---
title: "Azure VM Recommender"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/vm-recommender.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/vm-recommender.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/vm-recommender.md"
sourceSha256: "65609d5a1d6adaf6758964ffcec14d9619942fc38845bddffd5d8599de130aa5"
pageSha256: "65609d5a1d6adaf6758964ffcec14d9619942fc38845bddffd5d8599de130aa5"
contentMode: "local-full"
zh: ""
---

# Azure VM Recommender

Recommend Azure VM sizes, VM Scale Sets (VMSS), and configurations by analyzing workload type, performance requirements, scaling needs, and budget. No Azure subscription required — data comes from public Microsoft documentation and the unauthenticated Retail Prices API.

## When to Use This Skill

- User asks which Azure VM or VMSS to choose for a workload
- User wants to compare VM families, sizes, or pricing tiers
- User asks about trade-offs (cost vs performance, single VM vs scale set, orchestration modes)
- User needs a cost estimate without an Azure subscription
- User asks "Needs autoscaling?" or wants to decide between a single VM and a scale set

## Workflow

> Use reference files for initial filtering. Then **verify with live documentation** via `web_fetch` before final recommendations. If `web_fetch` fails, fall back to the reference files and surface the staleness warning from [web-fetch-policy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-recommender-references-web-fetch-policy).

### Step 1: Gather Requirements

Ask the user (infer when possible):

| Requirement | Examples |
|---|---|
| Workload type | Web server, relational DB, ML training, batch, dev/test |
| vCPU / RAM needs | "4 cores, 16 GB" or "lightweight" / "heavy" |
| GPU needed? | Yes → GPU families; No → general / compute / memory |
| Storage needs | High IOPS, large temp disk, premium SSD |
| Budget priority | Cost-sensitive, performance-first, balanced |
| OS | Linux or Windows (affects pricing) |
| Region | Affects availability and price |
| Instance count | Single, fixed count, or variable |
| Scaling needs | None, manual, autoscale (metrics / schedule) |
| Availability needs | Best-effort, fault-domain, cross-zone HA |
| Load balancing | None, Azure Load Balancer (L4), Application Gateway (L7) |

### Step 2: Determine VM vs VMSS

Review [VMSS Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-references-vmss-guide). Decision shortcut — start by asking **Needs autoscaling?** then walk the table:

| Signal | Pick |
|---|---|
| Autoscale on CPU, memory, or schedule | **VMSS** |
| Stateless web/API tier behind a load balancer | **VMSS** |
| Batch / parallel processing across many nodes | **VMSS** |
| Mixed VM sizes in one group | **VMSS (Flexible)** |
| Single long-lived server (jumpbox, AD DC) | **VM** |
| Unique per-instance config | **VM** |
| Stateful, tightly-coupled cluster | **VM** (or VMSS case-by-case) |

If recommending VMSS, verify with `web_fetch` per [web-fetch-policy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-recommender-references-web-fetch-policy). When in doubt, default to a single **VM**.

### Step 3: Select VM Family

Review [VM Family Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-references-vm-families) and pick 2–3 candidate families. Verify each candidate's specs with `web_fetch` against:

```
