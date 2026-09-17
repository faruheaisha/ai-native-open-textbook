---
title: "Deployment Summary Template"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/templates/mermaid/summary-dashboard.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/templates/mermaid/summary-dashboard.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/templates/mermaid/summary-dashboard.md"
sourceSha256: "026641bacf96fdb18ec3c071b9789ab055a610e2c56116fd951bfde7c9b645c2"
pageSha256: "026641bacf96fdb18ec3c071b9789ab055a610e2c56116fd951bfde7c9b645c2"
contentMode: "local-full"
zh: ""
---

# Deployment Summary Template

After successful deployment, render this summary in the terminal.

## Template

```
╔══════════════════════════════════════════════════════╗
║  DEPLOYMENT SUCCESSFUL                               ║
║  {{APP_NAME}} is live at {{APP_URL}}                 ║
║  Deployed: {{DEPLOY_TIMESTAMP}}                      ║
╚══════════════════════════════════════════════════════╝
```

### Azure Resources

| Resource | Type | Name | Portal Link |
|----------|------|------|-------------|
| Resource Group | resourceGroups | &#123;&#123;RG_NAME&#125;&#125; | `https://portal.azure.com/...` |
| AKS Cluster | managedClusters | &#123;&#123;AKS_NAME&#125;&#125; | `https://portal.azure.com/...` |
| Container Registry | registries | &#123;&#123;ACR_NAME&#125;&#125; | `https://portal.azure.com/...` |
| &#123;&#123;BACKING_SERVICE&#125;&#125; | &#123;&#123;TYPE&#125;&#125; | &#123;&#123;NAME&#125;&#125; | `https://portal.azure.com/...` |

Replace each portal link with the full URL using the subscription ID, resource group, and resource name.

### Files Created / Modified

List all files generated during the workflow with `+` for created and `~` for modified.

### Monthly Cost Estimate

List each Azure resource with its SKU/tier and approximate monthly cost.

### Next Steps

1. **Custom Domain** — Point DNS to external IP, update Gateway/Ingress
2. **TLS Certificate** — Enable HTTPS via cert-manager or Azure-managed TLS
3. **Monitoring Dashboard** — Set up Azure Monitor / Prometheus + Grafana
4. **Scaling** — Tune HPA min/max replicas and resource requests/limits
5. **CI/CD Trigger** — Push to default branch to trigger pipeline
