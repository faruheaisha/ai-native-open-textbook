---
title: "Self-Healing Loop — Error Classification & Auto-Fix"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/self-healing.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/self-healing.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/self-healing.md"
sourceSha256: "98972ac08d5e98bde81c40d5ed6e8d9cf2cfabd5df053c33cff3aeff61653bab"
pageSha256: "98972ac08d5e98bde81c40d5ed6e8d9cf2cfabd5df053c33cff3aeff61653bab"
contentMode: "local-full"
zh: ""
---

# Self-Healing Loop — Error Classification & Auto-Fix

Step 11 runs validation against the generated IaC via CLI commands (`az bicep build` + `az deployment sub what-if`). On failure, classify each error and apply the strategy below. Max 3 attempts before pausing to present a diagnosis (explain pattern → propose fix → ask user). After user approves, 5 more attempts before asking again — then every 5 thereafter. See scaffold SKILL.md § Self-Healing Loop for the full escalation protocol.

| Error Type | Class | Auto-Fix Strategy |
|------------|-------|-------------------|
| Invalid property name | FIXABLE | Replace with correct property from schema summary |
| Syntax error (HCL/Bicep) | FIXABLE | Re-generate affected module from reference patterns |
| Missing required property | FIXABLE | Add with default value from MCP best practices |
| Wrong API version | FIXABLE | Update to version from schema result |
| Provider version conflict | FIXABLE | Update `required_providers` block |
| Undeclared variable | FIXABLE | Add declaration to `variables.tf` |
| Policy-blocked SKU | FIXABLE | Substitute with next-best from `rejectedAlternatives[]` |
| Circular dependency | FIXABLE | Refactor module references — break cycle |
| Permission/RBAC insufficient | BLOCKING | Surface required role + `az role assignment create` command |
| State backend inaccessible | BLOCKING | Surface `az storage account create` instructions |
| Region unsupported for resource | BLOCKING | Suggest alternate regions — requires user decision |
| Quota exhaustion (ALL tiers in ALL regions) | PLAN_LEVEL_CHANGE | ⛔ Service type pivot required — see scaffold SKILL.md § Self-Healing Loop. Update `prepare-plan.json` → present re-approval gate → regenerate IaC. Counts as 1 healing attempt |
| Quota exhaustion (single region) | PLAN_LEVEL_CHANGE | ⛔ Region pivot required — read `prepare-plan.json.quotaValidation.checkedRegions` and `failedResources` to skip already-failed regions. After checking new regions, append results back to these fields. See scaffold SKILL.md § Self-Healing Loop. Update plan region → present re-approval → regenerate IaC |
| Policy blocks planned service entirely | PLAN_LEVEL_CHANGE | ⛔ Alternative service required — see scaffold SKILL.md § Self-Healing Loop. Map to next-best from `rejectedAlternatives[]` → present re-approval → regenerate IaC |
