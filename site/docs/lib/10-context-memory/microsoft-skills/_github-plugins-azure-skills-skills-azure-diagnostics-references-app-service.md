---
title: "App Service Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/references/app-service/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/references/app-service/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/references/app-service/README.md"
sourceSha256: "0b9d3cf3c3413d0279d2636c24be20d2dff84ae920a3cc3aa9f97fa5202edcb1"
pageSha256: "0b9d3cf3c3413d0279d2636c24be20d2dff84ae920a3cc3aa9f97fa5202edcb1"
contentMode: "local-full"
zh: ""
---

# App Service Troubleshooting

## Common Issues Matrix

| Symptom | Likely Cause | Action |
|---------|--------------|-----------|
| High CPU / memory | Runaway process, inefficient code | Use Process Explorer via Kudu, scale up |
| Deployment failure | Build error, locked files, quota | Check Kudu logs at `https://APP.scm.azurewebsites.net/api/deployments` to look for details on build errors, locked files or lack of storage quota |
| App crash / restart | Unhandled exception, OOM kill | Review Event Log and STDERR in Diagnose & Solve |
| Slow responses | Downstream dependency, no caching | Enable request tracing, check dependency calls |
| 502 / 503 errors | App not starting, port conflict | Check STDERR logs, verify startup command |
| TLS / domain errors | Certificate expired, DNS mismatch | `az webapp config ssl list`, verify CNAME |
| Health check failure | Endpoint not returning 200 | Verify health check path responds within 2 min |

---

## High CPU / Memory Diagnosis

**Diagnose:**
```bash
# Check app metrics
az monitor metrics list --resource APP_RESOURCE_ID \
  --metric "CpuPercentage,MemoryPercentage" --interval PT1M --output table

# View running processes via ARM Processes API (Entra ID auth)
az rest --method get \
