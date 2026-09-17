---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/container-apps.md"
sourceRel: ".github/plugins/azure-skills/skills/appinsights-instrumentation/references/container-apps.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/appinsights-instrumentation/references/container-apps.md"
sourceSha256: "66a7eaa29c8257abb33c7637ce2500356515f434f0f0262b3764409c08e69aae"
pageSha256: "66a7eaa29c8257abb33c7637ce2500356515f434f0f0262b3764409c08e69aae"
contentMode: "local-full"
zh: ""
---

# Microsoft Agent Skills

## Container Apps Observability

Observability guide for apps running in Azure Container Apps.

## Environment-Level Log Analytics

By default, Container Apps environments use a Log Analytics workspace. Configure it at environment creation (`--logs-workspace-id` expects the workspace **Customer ID** (GUID), not the ARM resource ID):

```bash
WORKSPACE_ID=$(az monitor log-analytics workspace show \
