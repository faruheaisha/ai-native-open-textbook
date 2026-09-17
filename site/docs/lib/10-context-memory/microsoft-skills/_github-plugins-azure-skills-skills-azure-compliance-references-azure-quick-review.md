---
title: "Azure Quick Review Compliance Assessment"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/azure-quick-review.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/azure-quick-review.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/azure-quick-review.md"
sourceSha256: "abf2578f34b6bafa53d32794e71b09980a8223cbfe535f1e6d06bb0f3b8a0f63"
pageSha256: "abf2578f34b6bafa53d32794e71b09980a8223cbfe535f1e6d06bb0f3b8a0f63"
contentMode: "local-full"
zh: ""
---

# Azure Quick Review Compliance Assessment

This skill enables comprehensive Azure compliance assessments using Azure Quick Review (azqr), analyzing findings against Azure best practices, and providing actionable remediation guidance.

## Prerequisites

- **Azure authentication** - Logged in via Azure CLI (`az login`) or using Service Principal/Managed Identity
- **Reader permissions** - Minimum Reader role on target subscription or management group

## Assessment Workflow

### Step 1: Determine Scan Scope

Ask the user or detect from context:

| Scope | Use Case | Required Info |
|-------|----------|---------------|
| Subscription | Full subscription assessment | Subscription ID |
| Resource Group | Targeted assessment | Subscription ID + Resource Group name |
| Management Group | Enterprise-wide assessment | Management Group ID |
| Specific Service | Deep-dive on one resource type | Subscription ID + Service abbreviation |

### Step 2: Run Compliance Scan

Use the Azure MCP tool to run the scan:

```
mcp_azure_mcp_extension_azqr
