---
title: "AKS Cluster Autoscaler (CAS)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-autoscaler.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-autoscaler.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-autoscaler.md"
sourceSha256: "715444b6f1fd638c57b0275d822ff9117e99e0f52d6d0dc2d6584fa81c08e967"
pageSha256: "715444b6f1fd638c57b0275d822ff9117e99e0f52d6d0dc2d6584fa81c08e967"
contentMode: "local-full"
zh: ""
---

# AKS Cluster Autoscaler (CAS)

Enable and tune the Cluster Autoscaler to automatically scale down idle nodes.

## Check CAS Status

```bash
az aks show \
  --name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --query "agentPoolProfiles[].{name:name, casEnabled:enableAutoScaling, min:minCount, max:maxCount, count:count}" \
  -o table

az aks show \
  --name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --query "autoScalerProfile" -o json
```

## Check Node Utilization (7 days)

Follow the metrics discovery steps in [azure-aks-rightsizing.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-references-azure-aks-rightsizing#historical-metrics-azure-monitor--use-when-prometheus-or-container-insights-is-enabled) to list available metric definitions and query node CPU utilization. Use metric names such as `node_cpu_usage_percentage` or `cpuUsagePercentage` depending on what's available on the cluster.

## Enable CAS

```bash
# Cluster-level
az aks update \
  --name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --enable-cluster-autoscaler \
  --min-count <MIN_NODES> --max-count <MAX_NODES>

# Specific node pool
az aks nodepool update \
  --cluster-name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --name "<NODEPOOL_NAME>" \
  --enable-cluster-autoscaler \
  --min-count <MIN_NODES> --max-count <MAX_NODES>
```

## Recommended min/max Defaults

| Scenario | min-count | max-count |
|----------|-----------|-----------|
| Dev/test | 1 | current_count |
| Production (web/API) | 2 | current_count * 3 |
| Production (batch) | 0 | current_count * 5 |

> Risk: Low. CAS only scales down when pods can be safely rescheduled. Set min-count >= 2 for production HA.

## Tune CAS Profile

Apply when CAS is already on but idle nodes persist:

> ⚠️ **Warning:** Setting `skip-nodes-with-system-pods=false` allows CAS to evict system pods. Ensure all system pods in `kube-system` have PodDisruptionBudgets before enabling this.

```bash
az aks update \
  --name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --cluster-autoscaler-profile \
    scale-down-delay-after-add=10m \
    scale-down-unneeded-time=10m \
    scale-down-utilization-threshold=0.5 \
    max-graceful-termination-sec=600 \
    skip-nodes-with-system-pods=false
```

To roll back to CAS defaults:

```bash
az aks update \
  --name "<CLUSTER_NAME>" --resource-group "<RESOURCE_GROUP>" \
  --cluster-autoscaler-profile ""
```

## Profile Comparison

| Profile | scale-down-delay-after-add | scale-down-unneeded-time | utilization-threshold | Best For |
|---------|----------------------------|--------------------------|----------------------|----------|
| Default | 10m | 10m | 0.5 | General workloads |
| Cost-Optimized | 5m | 5m | 0.5 | Cost-sensitive, non-critical |
| Conservative | 30m | 30m | 0.7 | Stateful / production |
| Aggressive | 2m | 2m | 0.4 | Dev/test, batch |

> Risk: High for aggressive tuning. Ensure PodDisruptionBudgets (PDBs) are set on critical workloads before tuning. Always confirm with user before applying.
>
> Check existing PDBs before tuning:
> ```bash
> kubectl get pdb --all-namespaces
> ```
