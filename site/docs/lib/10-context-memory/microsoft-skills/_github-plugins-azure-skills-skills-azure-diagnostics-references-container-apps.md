---
title: "Container Apps Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/references/container-apps/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/references/container-apps/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/references/container-apps/README.md"
sourceSha256: "0ecf9c4f923e0ce7aca9c493b2391c2c339c2ff3b8659e6a778dedbedf465ad4"
pageSha256: "0ecf9c4f923e0ce7aca9c493b2391c2c339c2ff3b8659e6a778dedbedf465ad4"
contentMode: "local-full"
zh: ""
---

# Container Apps Troubleshooting

### Common Issues Matrix

| Symptom | Likely Cause | Quick Fix |
|---------|--------------|-----------|
| Image pull failure | ACR credentials missing | `az containerapp registry set --identity system` |
| ACR build fails | ACR Tasks disabled (free sub) | Build locally with Docker |
| Cold start timeout | min-replicas=0 | `az containerapp update --min-replicas 1` |
| Port mismatch | Wrong target port | Check Dockerfile EXPOSE matches ingress |
| App keeps restarting | Health probe failing | Verify `/health` endpoint |

### Image Pull Failures

**Diagnose:**
```bash
# Check registry configuration
az containerapp show --name APP -g RG --query "properties.configuration.registries"

# Check revision status
az containerapp revision list --name APP -g RG --output table
```

**Fix:**
```bash
az containerapp registry set \
  --name APP -g RG \
  --server ACR.azurecr.io \
  --identity system
```

### ACR Tasks Disabled (Free Subscriptions)

**Symptom:** `az acr build` fails with "ACR Tasks is not supported"

**Fix: Build locally instead:**
```bash
docker build -t ACR.azurecr.io/myapp:v1 .
az acr login --name ACR
docker push ACR.azurecr.io/myapp:v1
```

### Cold Start Issues

**Symptom:** First request very slow or times out

**Fix:**
```bash
az containerapp update --name APP -g RG --min-replicas 1
```

### Health Probe Failures

**Symptom:** Container keeps restarting

**Check:**
```bash
# View health probe config
az containerapp show --name APP -g RG --query "properties.configuration.ingress"

# Check if /health endpoint responds
curl https://APP.REGION.azurecontainerapps.io/health
```

**Fix:** Ensure app has health endpoint returning 200:
```javascript
app.get('/health', (req, res) => res.sendStatus(200));
```

### Port Mismatch

**Symptom:** App starts but returns 502/503

**Check:**
```bash
az containerapp show --name APP -g RG --query "properties.configuration.ingress.targetPort"
```

**Verify:** App must listen on this exact port. Check:
- Dockerfile `EXPOSE` statement
- `process.env.PORT` or hardcoded port in app

### View Logs

```bash
# Stream logs (wait for replicas if scale-to-zero)
az containerapp logs show --name APP -g RG --follow

# Recent logs
az containerapp logs show --name APP -g RG --tail 100

# System logs (startup issues)
az containerapp logs show --name APP -g RG --type system
```

### Get All Diagnostic Info

Use the [`containerapp-diagnostics`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/containerapp-diagnostics.sh) script
([PowerShell](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/containerapp-diagnostics.ps1)) to collect everything in one
call. It prints clearly labeled sections — revisions, registry config, ingress config, and
recent logs — and a summary line describing what it collected. Interpreting the output
remains your job.

```powershell
..\..\scripts\containerapp-diagnostics.ps1 -Name <app> -ResourceGroup <rg>
```
```bash
../../scripts/containerapp-diagnostics.sh --name <app> --resource-group <rg>
```
