---
title: "Azure Kubernetes Service (AKS)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/aks/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/aks/README.md"
sourceSha256: "4d2f3e7dc1c2302f9b6c6c78bc8a7f2673efc858804e1236235d277007fc3c36"
pageSha256: "4d2f3e7dc1c2302f9b6c6c78bc8a7f2673efc858804e1236235d277007fc3c36"
contentMode: "local-full"
zh: ""
---

# Azure Kubernetes Service (AKS)

Full Kubernetes orchestration for complex containerized workloads.

## When to Use

- Complex microservices requiring Kubernetes orchestration
- Teams with Kubernetes expertise
- Workloads needing fine-grained infrastructure control
- Multi-container pods with sidecars
- Custom networking requirements
- Hybrid/multi-cloud Kubernetes strategies

## Service Type in azure.yaml

```yaml
services:
  my-service:
    host: aks
    project: ./src/my-service
    docker:
      path: ./Dockerfile
    k8s:
      deploymentPath: ./k8s
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| Container Registry | Image storage |
| Log Analytics Workspace | Monitoring |
| Virtual Network | Network isolation (optional) |
| Key Vault | Secrets management |

## Node Pool Types

| Pool | Purpose |
|------|---------|
| System | Cluster infrastructure, 3 nodes minimum |
| User | Application workloads, auto-scaling |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-aks-bicep)
- [K8s Manifests](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-aks-manifests)
- [Add-ons](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-aks-addons)
