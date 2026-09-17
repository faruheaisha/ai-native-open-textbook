---
title: "Hand-off to vm-creator"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/handoff-to-creator.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/handoff-to-creator.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-recommender/references/handoff-to-creator.md"
sourceSha256: "faf843cffa7ad5770998940e953930fc88b67447a7b6e50047e3e2ac5ce24688"
pageSha256: "faf843cffa7ad5770998940e953930fc88b67447a7b6e50047e3e2ac5ce24688"
contentMode: "local-full"
zh: ""
---

# Hand-off to vm-creator

When the user wants to **provision** the recommended option (not just compare), hand off to [vm-creator](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-vm-creator). Don't skip directly to an output adapter — the user must see and approve the Plan Card first.

## Required before hand-off

Render the [Plan Card](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-plan-card) markdown table **in chat** with the chosen SKU, region, instance count, pricing, and quota status pre-filled from the recommender's work. The user is approving the Plan Card, not the artifact.

## Routing signals

| User says | Action |
|---|---|
| "let's create it" / "spin one up" / "deploy this" | Render Plan Card → route to `vm-creator` Step 5 with selected SKU + region pre-filled |
| "give me the az CLI / Bicep / Terraform" | Render Plan Card → route to `vm-creator` Step 6 (Output Choice) |
| "just compare prices" / "I'm still deciding" | Stay in `vm-recommender`; offer to revisit |

## Example hand-off message

> *"Want me to generate the create command? I can output az CLI, Bicep, Terraform, or apply it via Azure MCP — I'll carry over the SKU, region, and pricing we just landed on."*

## What carries over

| Recommender output | Plan Card row |
|---|---|
| Hosting Model (VM vs VMSS) | `Hosting model` |
| VM Size (ARM SKU) | `Size` |
| Region | `Region` |
| Instance Count (or `min–max`) | `Instance count` (VMSS only) |
| Estimated $/hr | `Estimated cost` |
| Quota Status (✅/⚠️/❌) | `Quota` |

`vm-creator` Steps 2–4 (Depth Probe, Adaptive Gather, Validate) still run after hand-off to fill in OS, auth, networking, and tagging — they're additive on top of the recommender's spec choice.
