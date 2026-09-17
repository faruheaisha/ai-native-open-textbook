---
title: "Health Probe & Monitoring — Platform-Level Checks"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/health-probe-checks.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/health-probe-checks.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/health-probe-checks.md"
sourceSha256: "7a84e9d5120e51b5c10d74d21421b5224dcbea95bfd7ae38bd0966deff971b61"
pageSha256: "7a84e9d5120e51b5c10d74d21421b5224dcbea95bfd7ae38bd0966deff971b61"
contentMode: "local-full"
zh: ""
---

# Health Probe & Monitoring — Platform-Level Checks

## Overview

Health probes enable automated failover and recovery. Without them, load balancers and platform services cannot detect failures automatically.

This file covers **global / platform-level** probe checks (Azure Front Door, Traffic Manager, Application Insights connectivity). For service-specific health-probe checks, configuration commands, and IaC patches, see:

| Service | Reference |
|---|---|
| Azure Functions | [services/functions/reliability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-reliability-references-services-functions-reliability) |

> Azure App Service and Azure Container Apps per-service references are planned but not yet shipped in this skill version.

> **⚠️ Output format:** Use `--query "data[]" -o json` for `az graph query`. Standard `az afd` / `az network traffic-manager` commands work fine with `-o table`.

## Check Front Door Health Probe Configuration

```bash
az afd origin-group list \
