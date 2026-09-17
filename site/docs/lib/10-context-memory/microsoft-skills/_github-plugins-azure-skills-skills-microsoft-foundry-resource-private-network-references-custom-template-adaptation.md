---
title: "Custom Template Adaptation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/custom-template-adaptation.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/custom-template-adaptation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/custom-template-adaptation.md"
sourceSha256: "8e884ab722f214774163034821e42a424855cfd157d754f72b167ed68b868fec"
pageSha256: "8e884ab722f214774163034821e42a424855cfd157d754f72b167ed68b868fec"
contentMode: "local-full"
zh: ""
---

# Custom Template Adaptation

For the EXTEND path — when the user has existing Bicep or Terraform templates.

## Instructions

1. **Read** the user's existing template files. Understand the resource graph: what's defined, how resources reference each other, what naming conventions are used.

2. **Analyze** the template against the user's requirements (from [intake.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-intake)) and the Foundry private networking documentation validated in the intake step. Identify:
   - Resources already present and correctly configured
   - Resources present but misconfigured (wrong settings, missing properties)
   - Resources missing entirely
   - Dependency or wiring issues (e.g., PEs referencing wrong subnet, DNS zones not linked)

3. **Present** findings to the user as a gap analysis table: resource, status (✅ present / ⚠️ misconfigured / ❌ missing), and what needs to change. Include any issues found.

4. **Propose** an end-to-end plan to address all gaps — ordered by dependency. Explain what will be added, what will be modified, and why. Never overwrite existing modules — add alongside and reference existing resources.

5. **Wait** for user approval before making any changes.

6. **Implement** the approved changes. After implementation, the flow continues to Step 4 (Pre-Deployment Validation) in the main workflow.

## Retry Safety

> ⚠️ If a deployment fails after the capability host step starts, Azure Container Apps leaves a `legionservicelink` service association on the agent subnet that **cannot be removed**. On retry, use a **new subnet or new VNet** — never reuse the same agent subnet.
