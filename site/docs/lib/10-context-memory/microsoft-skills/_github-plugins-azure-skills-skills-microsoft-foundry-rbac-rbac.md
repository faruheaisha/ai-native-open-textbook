---
title: "Microsoft Foundry RBAC Management"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/rbac/rbac.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/rbac/rbac.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/rbac/rbac.md"
sourceSha256: "1fb39251c178ec8b3bb586bfceba793631faf7ab7de5037f4bdd01df9e6fb647"
pageSha256: "1fb39251c178ec8b3bb586bfceba793631faf7ab7de5037f4bdd01df9e6fb647"
contentMode: "local-full"
zh: ""
---

# Microsoft Foundry RBAC Management

Reference for managing RBAC for Microsoft Foundry resources: user permissions, managed identity configuration, and service principal setup for CI/CD.

## Quick Reference

| Property | Value |
|----------|-------|
| **CLI Extension** | `az role assignment`, `az ad sp` |
| **Resource Type** | `Microsoft.CognitiveServices/accounts` |
| **Best For** | Permission management, access auditing, CI/CD setup |

## When to Use

- Grant user access to Foundry resources or projects
- Set up developer permissions (Project Manager, Owner roles)
- Audit role assignments or validate permissions
- Configure managed identity roles for connected resources
- Create service principals for CI/CD pipeline automation
- Troubleshoot permission errors

## Foundry Built-in Roles

| Role | Create Projects | Data Actions | Role Assignments |
|------|-----------------|--------------|------------------|
| Foundry Agent Consumer | No | Invoke agents only | No |
| Foundry User | No | Yes | No |
| Foundry Project Manager | Yes | Yes | Yes (Foundry User only) |
| Foundry Account Owner | Yes | No | Yes (Foundry User only) |
| Foundry Owner | Yes | Yes | Yes |

> ⚠️ **Warning:** Foundry User is auto-assigned via Portal but NOT via SDK/CLI. Automation must explicitly assign roles.

## Workflows
