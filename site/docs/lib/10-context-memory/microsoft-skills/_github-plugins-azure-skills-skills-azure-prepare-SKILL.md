---
title: "Azure Prepare"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/SKILL.md"
sourceSha256: "84e2b406aedeafa611bcd229b97053f1f1088c1db880ea8dbb26032d186c3709"
pageSha256: "84e2b406aedeafa611bcd229b97053f1f1088c1db880ea8dbb26032d186c3709"
contentMode: "local-full"
zh: ""
---

# Azure Prepare

> **AUTHORITATIVE GUIDANCE — MANDATORY COMPLIANCE**
>
> This document is the **official, canonical source** for preparing applications for Azure deployment. You **MUST** follow these instructions exactly as written unless they contradict security policies given to you. When in doubt, present the conflicting instructions from this document and ask the user for explicit confirmation. Do not improvise, infer, or substitute steps.

---

## Triggers

Activate this skill when user wants to:
- Create a new application
- Add services or components to an existing app
- Make updates or changes to existing application
- Modernize or migrate an application
- Set up Azure infrastructure
- Deploy to Azure or host on Azure
- Create and deploy to Azure (including Terraform-based deployment requests)

## Rules

1. **Plan first — MANDATORY** — You MUST physically write an initial `.azure/deployment-plan.md` **skeleton in the workspace root directory** (not the session-state folder) **as your very first action** — before any code generation or execution begins. Write the skeleton immediately, then populate it progressively as Phase 1 analysis and research unfold; finalize it with all decisions at Phase 1 Step 6. This file must exist on disk throughout. azure-validate and azure-deploy depend on it and will fail without it. Do not skip or defer this step.
2. **Get approval** — Present plan to user before execution
3. **Research before generating** — Load references and invoke related skills
4. **Update plan progressively** — Mark steps complete as you go
5. **Validate before deploy** — Invoke azure-validate before azure-deploy
6. **Confirm Azure context** — Use `ask_user` for subscription and location per [Azure Context](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-azure-context)
7. ❌ **Destructive actions require `ask_user`** — [Global Rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-global-rules)
8. ⛔ **NEVER delete user project or workspace directories** — When adding features to an existing project, MODIFY existing files. `azd init -t <template>` is for NEW projects only; do NOT run `azd init -t` in an existing workspace. Plain `azd init` (without a template argument) may be used in existing workspaces when appropriate. File deletions within a project (e.g., removing build artifacts or temp files) are permitted when appropriate, but NEVER delete the user's project or workspace directory itself. See [Global Rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-global-rules).
9. **Scope: preparation only** — This skill generates infrastructure code and configuration files. Deployment execution (`azd up`, `azd deploy`, `terraform apply`) is handled by the **azure-deploy** skill, which provides built-in error recovery and deployment verification.
10. ⛔ **SQL Server Bicep: NEVER generate `administratorLogin` or `administratorLoginPassword`** — not in direct properties, not in conditional/ternary branches, not anywhere in the file. Always use Entra-only authentication (`azureADOnlyAuthentication: true`) unconditionally. See [references/services/sql-database/bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-bicep).
11. **Remove stale template IaC after conversion** — If you converted Bicep templates from the selected `azd` template into Terraform templates, remove the Bicep templates that were introduced by that `azd` template and are now fully replaced by Terraform equivalents. Do not remove user-authored Bicep files. Only remove those template-provided Bicep files after the Terraform IaC is complete and Terraform has been selected as the deployment path. Before handing off to azure-validate skill, keep only the IaC templates required by the chosen deployment path.

---

## ❌ PLAN-FIRST WORKFLOW — MANDATORY

> **YOU MUST CREATE A PLAN BEFORE DOING ANY WORK**
>
> 1. **STOP** — Do not generate any code, infrastructure, or configuration yet
> 2. **CREATE SKELETON** - Write an initial `.azure/deployment-plan.md` skeleton to disk **immediately** (before any code generation or execution begins), then populate it progressively as Phase 1 steps 1-5 reveal details; finalize it at Step 6
> 3. **CONFIRM** — Present the completed plan to the user and get approval
> 4. **EXECUTE** — Only after approval, execute the plan step by step
>
> The `.azure/deployment-plan.md` file is the **source of truth** for this workflow and for azure-validate and azure-deploy skills. Without it, those skills will fail.
>
