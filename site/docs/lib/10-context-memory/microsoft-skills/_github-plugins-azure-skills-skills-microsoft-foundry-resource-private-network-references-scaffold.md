---
title: "Scaffold & Parameterize"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/scaffold.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/scaffold.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/scaffold.md"
sourceSha256: "a2be45b33b3fa5b7728bc23dbfcd2d4dbea01adbf614308faf8601bb25905589"
pageSha256: "a2be45b33b3fa5b7728bc23dbfcd2d4dbea01adbf614308faf8601bb25905589"
contentMode: "local-full"
zh: ""
---

# Scaffold & Parameterize

Use this reference to fetch the confirmed template and wire up parameters.

## Path A — OFFICIAL / ADAPT

If the user has no GitHub access, the template must already be present in the workspace. Do NOT attempt to fetch from GitHub.

Fetch the template from the GitHub URL in [template-index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-template-). Choose **Bicep or Terraform** based on the user's preference or existing workspace files. Fetch the **entire template folder** including subdirectories. Create the files in the user's workspace (e.g., `infra/` folder).

For ADAPT: after fetching, modify the template to match the user's requirements before parameterizing.

## Path B — EXTEND

If the user has existing Bicep or Terraform templates they want to extend, load [custom-template-adaptation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-custom-template-adaptation). Follow the gap analysis there: read the user's template, identify what's present, add only the missing mandatory resources.

Set parameter values using the answers collected in [intake.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-intake):

| Parameter | Source |
|-----------|--------|
| Location | Region (or inferred from existing VNet) |
| VNet name / resource ID | VNet answer (new or existing) |
| VNet address space | Address space from requirements (default `192.168.0.0/16`) |
| Subnet CIDRs | Subnet answers (agent `/24`, PE `/24`, MCP `/24` if needed) |
| Existing Cosmos DB / Storage / AI Search IDs | BYO resource IDs (only if reusing) |
| Isolation mode (T18 only) | Managed VNet outbound mode (`AllowOnlyApprovedOutbound` or `AllowInternetOutbound`) |
| Model name, version, format | Model selection from requirements |
| `disableLocalAuth` | Set `true` if Azure Policy requires it |

> Do NOT run `az deployment group create` yet — validate first (next step).
