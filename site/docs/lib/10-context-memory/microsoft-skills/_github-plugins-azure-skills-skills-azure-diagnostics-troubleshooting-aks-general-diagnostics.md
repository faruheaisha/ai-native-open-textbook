---
title: "General AKS Investigation & Diagnostics"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/general-diagnostics.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/general-diagnostics.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/general-diagnostics.md"
sourceSha256: "8acf6259604ef912d6ac763d75552a65925e76ab2020da56168ca879c389ef56"
pageSha256: "8acf6259604ef912d6ac763d75552a65925e76ab2020da56168ca879c389ef56"
contentMode: "local-full"
zh: ""
---

# General AKS Investigation & Diagnostics

## "What happened in my cluster?"

When a user asks a broad question like "what happened in my AKS cluster?" or "check my AKS status", follow this systematic flow:

1. Cluster health
2. Recent events
3. Node status
4. Unhealthy pods
5. All pods overview
6. System pods health
7. Activity log

Run the **[`aks-baseline`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/aks-baseline.sh)** script instead of issuing these commands one by one. It performs the entire read-only sweep above and prints a single labeled digest (provisioning state, node pool summary, recent activity log, node readiness, unhealthy pods, kube-system health, and recent warning events), so you get one summarized result instead of seven raw dumps.

```bash
# bash
./scripts/aks-baseline.sh -g <rg> -n <cluster> [--namespace <ns>]
```

```powershell
# PowerShell
.\scripts\aks-baseline.ps1 -ResourceGroup <rg> -Cluster <cluster> [-Namespace <ns>]
```

After reviewing the digest, deep-dive into a specific pod with `kubectl describe` / `kubectl logs`.

---

## AKS CLI Tools

```bash
# Get cluster credentials (required before kubectl commands)
az aks get-credentials -g <rg> -n <cluster>

# View node pools
az aks nodepool list -g <rg> --cluster-name <cluster> -o table
```

### AppLens (MCP) for AKS

For AI-powered diagnostics:

```text
mcp_azure_mcp_applens
  intent: "diagnose AKS cluster issues"
  command: "diagnose"
  parameters:
    resourceId: "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.ContainerService/managedClusters/<cluster>"
```

> 💡 **Tip:** AppLens automatically detects common issues and provides remediation recommendations using the cluster resource ID.

---

## Best Practices

1. **Start with kubectl get/describe** - Always check basic status first
2. **Check events** - `kubectl get events -A` reveals recent issues
3. **Use systematic isolation** - Pod -> Node -> Cluster -> Network
4. **Document changes** - Note what you tried and what worked
5. **Escalate when needed** - For control plane issues, contact Azure support
