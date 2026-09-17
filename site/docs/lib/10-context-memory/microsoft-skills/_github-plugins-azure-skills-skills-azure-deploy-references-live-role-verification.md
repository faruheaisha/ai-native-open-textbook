---
title: "Live Role Verification"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/live-role-verification.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/live-role-verification.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/live-role-verification.md"
sourceSha256: "db545be4373ea6a5dec0e14a7283ee12ba3464ec4750a868bdcb33112dac1bdc"
pageSha256: "db545be4373ea6a5dec0e14a7283ee12ba3464ec4750a868bdcb33112dac1bdc"
contentMode: "local-full"
zh: ""
---

# Live Role Verification

Query Azure to confirm that provisioned RBAC role assignments are correct and sufficient for the application to function. This complements the static role check in azure-validate by validating **live Azure state**.

## How It Differs from azure-validate's Role Check

| Check | Skill | What It Verifies |
|-------|-------|-----------------|
| **Static** | azure-validate | Generated Bicep/Terraform has correct role assignments in code |
| **Live** | azure-deploy (this) | Provisioned Azure resources actually have the right roles assigned |

Both checks are needed because:
- Bicep may be correct but provisioning could fail silently for roles
- Manual changes or policy enforcement may alter role assignments
- Previous deployments may have stale or conflicting roles

## When to Run

After deployment verification (step 7). Resources are now provisioned, so live role assignments can be queried.

## Verification Steps

### 1. Identify App Identities

Read `.azure/deployment-plan.md` to find all services with managed identities. Then query Azure for their principal IDs:

```bash
# App Service
