---
title: "Configure Zone Redundancy — Platform Notes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/configure-zone-redundancy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/configure-zone-redundancy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/configure-zone-redundancy.md"
sourceSha256: "e07930ab95e876dce61e013fa55abd62ec7e292056ac62e6cda6e68910f54f4f"
pageSha256: "e07930ab95e876dce61e013fa55abd62ec7e292056ac62e6cda6e68910f54f4f"
contentMode: "local-full"
zh: ""
---

# Configure Zone Redundancy — Platform Notes

## Storage redundancy is part of the same fix — discover it now, migrate it later

Zone-redundant compute backed by LRS/GRS storage still suffers downtime in a zone failure, so the storage SKU **must** be assessed alongside compute. However, do **not** block the compute fix on a storage migration — they happen in separate steps.

**Required order (matches the parent skill's [Configuration Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-SKILL#configuration-workflow)):**

1. **Discover** the current storage SKU during assessment (Phase 2) so the user sees both gaps in one checklist. Use [storage-redundancy-checks.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-storage-redundancy-checks).
2. **Enable compute ZR first** — fast, in-place property update, no downtime. This is the quick win and runs without any storage prerequisite.
3. **Verify** compute is `zoneRedundant: true`.
4. **Then ask the user** before starting the storage migration (hours-to-days, small cost increase). Commands live in [configure-storage.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-configure-storage).

## Per-service configuration commands

The `az` CLI commands, plan-upgrade paths, blue/green migration steps, and verification commands all live in the per-service references because the syntax differs per service:

| Service | Reference |
|---|---|
| Azure App Service (P1v2+, P0v3+, P0v4+, ASEv3) | [services/app-service/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-app-service-reliability) |
| Azure Functions (FC1, EP1–EP3) | [services/functions/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-functions-reliability) |

## Verification

After enabling zone redundancy on any compute resource, confirm with:

```bash
az graph query -q "
Resources
| where resourceGroup =~ '<rg>'
| where type =~ 'microsoft.web/serverfarms' or type =~ 'microsoft.app/managedenvironments'
| extend zoneRedundant = tobool(properties.zoneRedundant)
| project name, type, zoneRedundant
" --query "data[]" -o json
```

All patched resources should show `zoneRedundant = true`.
