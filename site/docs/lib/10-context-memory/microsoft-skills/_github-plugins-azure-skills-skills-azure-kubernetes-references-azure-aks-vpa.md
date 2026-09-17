---
title: "AKS Vertical Pod Autoscaler (VPA)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-vpa.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-vpa.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/references/azure-aks-vpa.md"
sourceSha256: "3dae1c706ebe394f4964b581bd9537fdb7625c3784a03e76bcce52cd7bb80cb6"
pageSha256: "3dae1c706ebe394f4964b581bd9537fdb7625c3784a03e76bcce52cd7bb80cb6"
contentMode: "local-full"
zh: ""
---

# AKS Vertical Pod Autoscaler (VPA)

Use VPA to get data-driven resource recommendations for rightsizing pods. Always start in recommendation-only mode before considering auto-apply.

## Enable VPA (Recommendation Mode)

```bash
# Enable VPA addon on AKS cluster (if not already enabled)
az aks update --enable-vpa --resource-group <RESOURCE_GROUP> --name <CLUSTER_NAME>

# Create a VPA object in recommendation mode for a deployment
kubectl apply -f - <<EOF
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: <DEPLOYMENT_NAME>-vpa
  namespace: <NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: <DEPLOYMENT_NAME>
  updatePolicy:
    updateMode: "Off"   # Recommendation only — does not modify pods
EOF

# Read recommendations after 24+ hours of data collection
kubectl describe vpa <DEPLOYMENT_NAME>-vpa -n <NAMESPACE>
```

> Risk: Low in "Off" mode. **Do not use `updateMode: Auto` in production** without thorough testing and explicit user confirmation.

## Read VPA Recommendations

```bash
kubectl get vpa <DEPLOYMENT_NAME>-vpa -n <NAMESPACE> -o jsonpath='{.status.recommendation}'
```

The output shows `lowerBound`, `target`, and `upperBound` for CPU and memory. Use the `target` values as rightsized requests.

## Apply Recommendations Manually

After reviewing VPA output, patch the deployment — see [azure-aks-rightsizing.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-kubernetes-references-azure-aks-rightsizing#yaml-patch-format) for the patch format.
